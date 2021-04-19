// GET ELEMENT
const main = document.querySelector('main');

printStartPage();

// EVT-LISTENER
document.addEventListener("click", (evt) => {
    printLogInPage(evt.target.id);
    addNewUser(evt.target.id);
    checkLogIn(evt.target.id);
});

// FUNCTION - PRINT START PAGE
function printStartPage() {
    const startPageContainer = document.createElement('section');
    main.appendChild(startPageContainer);
    startPageContainer.id = "startPageContainer";
    startPageContainer.setAttribute("class", "startpage-container");

    startPageContainer.insertAdjacentHTML("beforeend", `  
    <h2>Skapa konto</h2>
    <article id="newUserContainer" class="new-user-container">
        <div>
            <input type="text" placeholder="Användarnamn" id="newUserName"><br>
            <input type="email" placeholder="E-post" id="newUserEmail"><br>
            <input type="password" placeholder="Lösenord" id="newPassWord">
            <p class="mail-checkbox-p">Prenumerera på veckobrev?<input type="checkbox" id="mailCheckbox" class="mail-checkbox"></p>
        <button id="newUserBtn" class="new-user-btn">Skapa konto</button>
        </div>
        <p id="errorNewUserMsg" class="error-new-user-msg"></p>

    </article>

    <article id="existingUserContainer" class="existing-user-container">
        <h4>Har du redan ett konto?</h4>
        <button id="startPageLogInBtn">Logga in</button>
    </article>
    `)
};

// FUNCTION - PRINT LOGIN PAGE
function printLogInPage(id) {
    if (id == "startPageLogInBtn") {
        main.innerHTML = "";
        const logInPageContainer = document.createElement('section');
        main.appendChild(logInPageContainer);
        logInPageContainer.id = "logInPageContainer";
        logInPageContainer.setAttribute("class", "login-page-container");

        logInPageContainer.insertAdjacentHTML("beforeend", `
        <h2>Logga in</h2>
        <article id="existingUserContainer" class="existing-user-container">
                <input type="text" placeholder="Användarnamn" id="existingUserName"><br>
                <input type="text" placeholder="Lösenord" id="existingUserPassWord">
                <p id="errorLogInMsg" class"error-login-msg></p>
                <button type="submit" id="logInBtn" class="login-btn">Logga in</button>
        </article>
        `);
    };
};

// FUNCTION - ADD NEW USER
function addNewUser(id) {
    if (id == "newUserBtn") {
        let uName = document.getElementById('newUserName').value;
        let uEmail = document.getElementById('newUserEmail').value;
        let pWord = document.getElementById('newPassWord').value;
        let mailCheckbox = document.getElementById('mailCheckbox');
        let subscribe;

        if (uName == "" && uEmail == "") {
            console.log("Empty fields");
            return;
        } else {
            if (mailCheckbox.checked) {
                console.log("Prenumerera");
                subscribe = true;
            } else {
                console.log("Ej prenumerera");
                subscribe = false;
            };
    
            let newUser = {userName: uName, passWord: pWord, uEmail: uEmail, newsLetter: subscribe};
            console.log(newUser);
    
            fetch("http://localhost:3000/users/", {method: "post", headers: {"Content-type": "application/json"}, body: JSON.stringify(newUser)})
            .then(resp => resp.json())
            .then(data => {
                console.log(data);
            });
        };
    };
};

// FUNCTION - CHECK USER LOGIN
function checkLogIn(id) {
    if (id == "logInBtn") {
        exUserName = document.getElementById('existingUserName').value;
        exPassWord = document.getElementById('existingUserPassWord').value;

        user = {"userName": exUserName, "passWord": exPassWord};

        fetch('http://localhost:3000/users/login', {method: "post", headers: {"Content-type": "application/json"}, body: JSON.stringify(user)})
        .then(resp => resp.json())
        .then(answer => {

            let userInfo = answer;
            console.log(userInfo);
            localStorage.setItem("User", userInfo.key);
            printLoggedInPage(userInfo.userName, userInfo.newsLetter);
        });
        console.log("Fel inlogg");
    };
};

// // FUNCTION - LOG IN USER
// function logInUser(userKey) {
//     fetch("http://localhost:3000/users/"+ userKey)
//     .then(resp => resp.json())
//     .then(data => {
//         console.log(data);
//         console.log("Printa logginsida");
//     });
// };

// FUNCTION - PRINT LOGGED IN PAGE
function printLoggedInPage(userName, newsLetter) {
    main.innerHTML = "";
    const loggedInPageContainer = document.createElement('section');
    main.appendChild(loggedInPageContainer);
    loggedInPageContainer.id = "loggedInPageContainer";
    loggedInPageContainer.setAttribute("class", "loggedin-page-container");

    let userNewsLetter;
    let subscribe;

    if (newsLetter == true) {
        userNewsLetter = "Du prenumererar på vårat nyhetsbrev!";
        subscribe = `<a href="#" id="subscribe">Avregistrera här</a>`;
        console.log("nyhetsbrev");
    } else {
        userNewsLetter = "Du prenumererar inte på vårat nyhetsbrev!";
        subscribe = `<a href="#" id="subscribe">Registrera dig här!</a>`;
        console.log("ej nyhetsbrev");
    };

    loggedInPageContainer.insertAdjacentHTML("beforeend", `
    <h3>Välkommen ${userName}</h3>
    <div>
        <h4>${userNewsLetter}</h4>
        <p>${subscribe}</p>
    </div>
    `);

    document.getElementById('subscribe').addEventListener('click', () => {
        if (newsLetter == true) {
            console.log("vill asregistrera");
            let changeSubscribe = {newsLetter: false};
            fetch("http://localhost:3000/users/subscribe", {method: "post", headers: {"Content-type": "application/json"}, body: JSON.stringify(changeSubscribe)})
            .then(resp => resp.json())
            .then(data => {
            });
        } else {
            console.log("vill registrera");
        };
    });
};