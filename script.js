// GET ELEMENT
const main = document.querySelector('main');

printStartPage();
checkLS();

// EVT-LISTENER
document.addEventListener("click", (evt) => {
    printLogInPage(evt.target.id);
    addNewUser(evt.target.id);
    checkLogIn(evt.target.id);
    logOut(evt.target.id);
});

//LOCAL STORAGE
function checkLS() {
    if (localStorage.getItem("User")) {
        let getUser = localStorage.getItem("User");
        let savedUser = {getUser};

        fetch("http://localhost:3000/users/localstorage", {method: "post", headers: {"Content-type": "application/json"}, body: JSON.stringify(savedUser)})
        .then(resp => resp.json())
        .then(answer => {
            console.log(answer);
            let userInfo = answer;
            printLoggedInPage(userInfo.key, userInfo.userName, userInfo.newsLetter);
        });
    };
};

// FUNCTION - PRINT START PAGE
function printStartPage() {
    const startPageContainer = document.createElement('section');
    main.appendChild(startPageContainer);
    startPageContainer.id = "startPageContainer";
    startPageContainer.setAttribute("class", "startpage-container");

    startPageContainer.insertAdjacentHTML("beforeend", `  
    <article id="newUserContainer" class="new-user-container">
        <h2>Skapa konto</h2>
        <div>
            <input type="text" placeholder="Användarnamn" id="newUserName">
            <input type="email" placeholder="E-post" id="newUserEmail">
            <input type="password" placeholder="Lösenord" id="newPassWord">
            <p class="mail-checkbox-p">Prenumerera på veckobrev?<input type="checkbox" id="mailCheckbox" class="mail-checkbox"></p>
        <p id="errorNewUserMsg" class="error-new-user-msg"></p>
        <button id="newUserBtn" class="new-user-btn">Skicka</button>
        </div>

    </article>
    <article class="start-page-divider"></article>
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
            document.getElementById('errorNewUserMsg').innerText = "Fyll i alla fälten";
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
            document.getElementById('errorNewUserMsg').innerText = "Konto är skapat, nu kan du logga in!";
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
            printLoggedInPage(userInfo.key, userInfo.userName, userInfo.newsLetter);
        });
        document.getElementById('errorLogInMsg').innerText = "Fel användarnamn eller lösenord, försök igen!";
    };
};

// FUNCTION - PRINT LOGGED IN PAGE
function printLoggedInPage(userKey, userName, newsLetter) {
    main.innerHTML = "";
    const loggedInPageContainer = document.createElement('section');
    main.appendChild(loggedInPageContainer);
    loggedInPageContainer.id = "loggedInPageContainer";
    loggedInPageContainer.setAttribute("class", "loggedin-page-container");

    let newsLetterText;
    let subscribeText;

    if (newsLetter == true) {
        newsLetterText = "Du prenumererar på vårat nyhetsbrev!";
        subscribeText = `<a href="#" id="subscribeBtn">Avregistrera här</a>`;
    } else {
        newsLetterText = "Du prenumererar inte på vårat nyhetsbrev!";
        subscribeText = `<a href="#" id="subscribeBtn">Registrera dig här!</a>`;
    };

    printLoggedInText(userName, newsLetterText, subscribeText);

    document.getElementById('subscribeBtn').addEventListener('click', () => {
        subscription(userKey, newsLetter);
    });
};

// FUNCTION - PRINT CORRECT LOGGED-IN-TEXT
function printLoggedInText(userName, newsLetterText, subscribeText) {
    loggedInPageContainer.insertAdjacentHTML("beforeend", `
        <h3>Välkommen ${userName}</h3>
        <div>
            <h4>${newsLetterText}</h4>
            <p>${subscribeText}</p>
        </div>
        <div><button id="logOutBtn">Logga ut</button></div>
    `);
};

// FUNCTION - CHANGE SUBSCRIPTION
function subscription(userKey, newsLetter) {
    let changeSubscription;

    if (newsLetter == true) {
        console.log("Wants to unsubscribe");
        changeSubscription = {key: userKey, newsLetter: false};

    } else if (newsLetter == false) {
        console.log("Wants to subscribe");
        changeSubscription = {key: userKey, newsLetter: true};
    };

    fetch("http://localhost:3000/users/subscribe", {method: "post", headers: {"Content-type": "application/json"}, body: JSON.stringify(changeSubscription)})
    .then(resp => resp.json())
    .then(answer => {
        console.log(answer);
        let userInfo = answer;
        printLoggedInPage(userInfo.key, userInfo.userName, userInfo.newsLetter);
    });
};

// FUNCTION - LOG OUT
function logOut(id) {
    if (id == "logOutBtn") {
        location.reload();
        localStorage.removeItem("User");
    };
};