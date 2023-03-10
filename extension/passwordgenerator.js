const Cryptr = require('cryptr');

const digit_array =  ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const lowercase_letters_array = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const uppercase_letter_array = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
const special_symbol_array = ['@', '#', '$', '%', '=', ':', '?', '.', '/', '|', '~', '>', '*', '(', ')', '<'];

const all_symbol_array = digit_array.concat(lowercase_letters_array.concat(uppercase_letter_array.concat(special_symbol_array)));

String.prototype.shuffle = function () {
    var a = this.split(""),
        n = a.length;

    for(var i = n - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
    }
    return a.join("");
}

function generate_password(password_length = 15) {
    let generated_password = "";

    for (let i = 0; i < 2; i++) {
        let random_digit = digit_array[Math.floor(Math.random() * digit_array.length)];
        let random_lowercase_letter = lowercase_letters_array[Math.floor(Math.random() * lowercase_letters_array.length)];
        let random_uppercase_letter = uppercase_letter_array[Math.floor(Math.random() * uppercase_letter_array.length)];
        let random_special_symbol = special_symbol_array[Math.floor(Math.random() * special_symbol_array.length)];

        generated_password = generated_password + random_digit + random_lowercase_letter + random_uppercase_letter + random_special_symbol;
    }

    for (let i = 0; i < password_length - 8; i++) {
        generated_password += all_symbol_array[Math.floor(Math.random() * all_symbol_array.length)];
    }

    generated_password = generated_password.split('').sort(function(){return 0.5-Math.random()}).join('');

    return generated_password;
}

function encrypt_password(password, key) {
    const cryptr = new Cryptr(key);

    return cryptr.encrypt(password);
}

function decrypt_password(password, key) {
    const cryptr = new Cryptr(key);

    return cryptr.decrypt(password);
}

function CBC(password, key, vector) {
    let x_ored = "";

    for(let i = 0; i < password.length; ++i) {
        x_ored += String.fromCharCode(password[i].charCodeAt(0) ^ vector[i % vector.length].charCodeAt(0));
    }

    let encrypted_password = encrypt_password(x_ored, key);
    
    vector = encrypted_password;

    return [encrypted_password, vector];
}

function deCBC(password, key, vector) {
    let decrypted_password = decrypt_password(password, key);

    let x_ored = "";

    for(let i = 0; i < decrypted_password.length; ++i) {
        x_ored += String.fromCharCode(decrypted_password[i].charCodeAt(0) ^ vector[i % vector.length].charCodeAt(0));
    }

    return [x_ored, vector];
}

export {CBC, deCBC};


let generated_password = generate_password();
let vector = generate_password();
let de_vector = vector;
const key = "placeKeyHere";

console.log(generated_password, " + ", vector);

let array = CBC(generated_password, key, vector);
generated_password = array[0];
vector = array[1];
console.log(generated_password, " + ", vector);

array = deCBC(generated_password, key, de_vector);
generated_password = array[0];
de_vector = array[1];
console.log(generated_password, " + ", de_vector);
