const api = "http://localhost:3000/get";
const get = "get";

let emailField;
let userInfo = [];
let input = document.getElementsByTagName('input');
let counter = 0;

const nameOrEmailFields = document.querySelectorAll('input[type="email"], input[type="text"], input[name*="name"], input[name*="email"], input[name="log"], input[name="email-form"], input[name="username"]');
for (let field of nameOrEmailFields) {
    if(field.name) {
        emailField = field;
        break;
    }
}

const passwordField = document.querySelector('input[type="password"]');
if (passwordField != null) {
    passwordField.addEventListener('click', () => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', api);
        xhr.onload = () => {
            if (xhr.status === 200) {
                userInfo = JSON.parse(xhr.responseText);
            } else {
                console.log("ERROR");
            }
        };  
        xhr.send();

        showPasswordSuggestions(emailField, passwordField, userInfo);
        
    });

    emailField.addEventListener('click', () => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', api);
        xhr.onload = () => {
            if (xhr.status === 200) {
                userInfo = JSON.parse(xhr.responseText);
            } else {
                console.log("ERROR");
            }
        };  
        xhr.send();

        showEmailSuggestions(emailField, passwordField, userInfo);
        
    });
}

function showEmailSuggestions(emailField, passwordField, userInfo) {
    if (counter < 2) {
        counter++;
        let suggestionList = document.createElement("ul");
        suggestionList.style.cssText = "position:absolute;z-index:9999;padding:0;margin:0;background-color:#fff;border:1px solid #ccc;list-style:none;max-height:200px;overflow-y:auto;";
        userInfo.forEach(function(credentials) {
            let suggestionItem = document.createElement("li");
            suggestionItem.style.cssText = "padding:5px;cursor:pointer;";
            suggestionItem.textContent = credentials.EmailInDomain;
            suggestionItem.addEventListener("click", function() {
                emailField.value = credentials.EmailInDomain;
                passwordField.value = credentials.Password;
                suggestionList.parentNode.removeChild(suggestionList);
                counter--;
            });
            suggestionList.appendChild(suggestionItem);
        });

        emailField.parentNode.appendChild(suggestionList);
        suggestionList.style.top = emailField.offsetTop + emailField.offsetHeight + "px";
        suggestionList.style.left = emailField.offsetLeft + "px";
    }
}

function showPasswordSuggestions(emailField, passwordField, userInfo) {
    if (counter < 2) {
        counter++;
        let suggestionList = document.createElement("ul");
        suggestionList.style.cssText = "position:absolute;z-index:9999;padding:0;margin:0;background-color:#fff;border:1px solid #ccc;list-style:none;max-height:200px;overflow-y:auto;";
        userInfo.forEach(function(credentials) {
            let suggestionItem = document.createElement("li");
            suggestionItem.style.cssText = "padding:5px;cursor:pointer;";
            suggestionItem.textContent = "Use password for ".concat(credentials.EmailInDomain);
            suggestionItem.addEventListener("click", function() {
                emailField.value = credentials.EmailInDomain;
                passwordField.value = credentials.Password;
                suggestionList.parentNode.removeChild(suggestionList);
                counter--;
            });
            suggestionList.appendChild(suggestionItem);
        });

        passwordField.parentNode.appendChild(suggestionList);
        suggestionList.style.top = passwordField.offsetTop + passwordField.offsetHeight + "px";
        suggestionList.style.left = passwordField.offsetLeft + "px";
    }
}