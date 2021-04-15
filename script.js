// GET ELEMENT
const main = document.querySelector('main');

printStartPage();

// EVT-LISTENER
document.addEventListener("click", (evt) => {
    printLogInPage(evt.target.id);
    newUser(evt.target.id);
    checkLogIn(evt.target.id);
    // printLoggedInPage(evt.target.id);
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
            <input type="password" placeholder="Lösenord" id="newPassWord">
            <p class="mail-checkbox-p">Prenumerera på veckobrev?<input type="checkbox" id="mailCheckbox" class="mail-checkbox"></p>
        <button type="submit" id="newUserBtn" class="new-user-btn">Skapa konto</button>
        </div>
        <p id="errorNewUserMsg" class="error-new-user-msg"></p>

    </article>

    <article id="existingUserContainer" class="existing-user-container">
        <h4>Har du redan ett konto?</h4>
        <button id="startPageLogInBtn">Logga in</button>
    </article>
    `)
};

//SKAPA EN INLOGGAD-SIDA

function newUser(id) {
    if (id == "newUserBtn") {
        let uName = document.getElementById('newUserName').value;
        let pWord = document.getElementById('newPassWord').value;
        let mailCheckbox = document.getElementById('mailCheckbox');
        let subscribe;
        
        if (mailCheckbox.checked) {
            console.log("Prenumerera");
            subscribe = true;
        } else {
            console.log("Ej prenumerera");
            subscribe = false;
        };

        newUser = {userName: uName, passWord: pWord, newsLetter: subscribe};
        console.log(newUser);

        fetch('http://localhost:3000/users/', {method: "post", headers: {"Content-type": "application/json"}, body: JSON.stringify(newUser)})
        .then(resp => resp.json())
        .then(data => {
            console.log(data);
            console.log("Inloggningsförsök");
        });
    };
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
                <input type="password" placeholder="Lösenord" id="existingUserPassWord">
                <p id="errorLogInMsg" class"error-login-msg></p>
                <button type="submit" id="logInBtn" class="login-btn">Logga in</button>
        </article>
        `);
    };
};

function checkLogIn(id) {
    if (id == "logInBtn") {
        exUserName = document.getElementById('existingUserName').value;
        exPassWord = document.getElementById('existingUserPassWord').value;

        user = {"userName": exUserName, "passWord": exPassWord};

        fetch('http://localhost:3000/users/login', {method: "post", headers: {"Content-type": "application/json"}, body: JSON.stringify(user)})
        .then(resp => resp.json())
        .then(data => {
            console.log(data);
        });
    };
};

// FUNCTION - PRINT LOGGED IN PAGE
function printLoggedInPage(id) {
    if (id == "logInBtn") {
        main.innerHTML = "";
        const loggedInPageContainer = document.createElement('section');
        main.appendChild(loggedInPageContainer);
        loggedInPageContainer.id = "loggedInPageContainer";
        loggedInPageContainer.setAttribute("class", "loggedin-page-container");

        loggedInPageContainer.insertAdjacentHTML("beforeend", `
        <h3>Användarnamn</h3>
        <div>
            <h4>- Prenumererar på veckobrev</h5>
            <p>Avregistera här</p>
        </div>
        `);
    };
};