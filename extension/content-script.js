const api = "http://localhost:3000/get";
const get = "get";

let data = {};
let input = document.getElementsByTagName('input');
let counter = 0;

const passwordField = document.querySelector('input[type="password"]');
passwordField.addEventListener('click', () => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', api);
    xhr.onload = () => {
        if (xhr.status === 200) {
            data = JSON.parse(xhr.responseText);
        } else {
            console.log("ERROR");
        }
    };  
    xhr.send();
    let suggestions = [];
    for (let i = 0; i < data.length; i++) {
        suggestions.push(data[i]);
    }

    showPasswordSuggestions(passwordField, suggestions);
    
});

function showPasswordSuggestions(input, suggestions) {
    if (counter < 2) {
        counter++;
        let suggestionList = document.createElement("ul");
        suggestionList.style.cssText = "position:absolute;z-index:9999;padding:0;margin:0;background-color:#fff;border:1px solid #ccc;list-style:none;max-height:200px;overflow-y:auto;";
        suggestions.forEach(function(password) {
            let suggestionItem = document.createElement("li");
            suggestionItem.style.cssText = "padding:5px;cursor:pointer;";
            suggestionItem.textContent = password.Username + " (" + password.Id + ")";
            suggestionItem.addEventListener("click", function() {
                input.value = password.Id;
                suggestionList.parentNode.removeChild(suggestionList);
                counter--;
            });
        suggestionList.appendChild(suggestionItem);
        });

        input.parentNode.appendChild(suggestionList);
        suggestionList.style.top = input.offsetTop + input.offsetHeight + "px";
        suggestionList.style.left = input.offsetLeft + "px";
    }
}