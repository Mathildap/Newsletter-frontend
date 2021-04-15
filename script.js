// GET ELEMENT
const main = document.querySelector('main');

printStartPage();

// EVT-LISTENER ON STARTPAGE
document.getElementById('startPageLogInBtn').addEventListener("click", () => {
    printLogInPage();
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
        <form>
            <input type="text" placeholder="Användarnamn" id="newUserName"><br>
            <input type="password" placeholder="Lösenord" id="newPassWord">
            <p class="mail-checkbox-p">Prenumerera på veckobrev?<input type="checkbox" id="mailCheckbox" class="mail-checkbox"></p>
            <button type="submit" id="newUserBtn" class="new-user-btn">Skapa konto</button>
        </form>

        <p id="errorNewUserMsg" class="error-new-user-msg"></p>

    </article>

    <article id="existingUserContainer" class="existing-user-container">
        <h4>Har du redan ett konto?</h4>
        <button id="startPageLogInBtn">Logga in</button>
    </article>
    `)
};

// FUNCTION - PRINT LOGIN PAGE
function printLogInPage() {
    main.innerHTML = "";
    const logInPageContainer = document.createElement('section');
    main.appendChild(logInPageContainer);
    logInPageContainer.id = "logInPageContainer";
    logInPageContainer.setAttribute("class", "login-page-container");

    logInPageContainer.insertAdjacentHTML("beforeend", `
    <h2>Logga in</h2>
    <article id="existingUserContainer" class="existing-user-container">
        <form>
            <input type="text" placeholder="Användarnamn" id="existingUserName"><br>
            <input type="password" placeholder="Lösenord" id="existingUserPassWord">
            <p id="errorLogInMsg" class"error-login-msg></p>
            <button type="submit" id="logInBtn" class="login-btn">Skapa konto</button>
        </form>
    </article>
    `);
};