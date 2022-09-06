let rangeSlider = document.getElementById("rangeSlider");
let rangeNumber = document.getElementById("rangeNumber");
let passwordOutput = document.getElementById("passwordOutput");
let copyPassword = document.getElementById("copyPassword");
let copiedText = document.querySelector(".copied-text");
let errorMessage = document.querySelector(".error");
let strengthLevel = document.getElementById("strengthLevel");
let scaleBar = document.querySelectorAll(".scale-bar");
let checkBoxes = document.querySelectorAll(".check");

let rangeLength = rangeSlider.value;

rangeNumber.innerText = rangeSlider.value;
rangeSlider.oninput = function () {
    rangeNumber.textContent = this.value;
    rangeLength = this.value;
}

const includeUppercase = document.getElementById('upperCase');
const includeLowercase = document.getElementById('lowerCase');
const includeNumbers = document.getElementById('numbers');
const includeSymbols = document.getElementById('symbols');

function getRandomUpperCase() {
    let result = "";
    for(let i = 0; i < rangeLength; i++) {
        result += String.fromCharCode(Math.floor(Math.random() * 26 ) + 65);
    }
    return result;
}

function getRandomLowerCase() {
    let result = "";
    for(let i = 0; i < rangeLength; i++) {
        result += String.fromCharCode(Math.floor(Math.random() * 26 ) + 97);
    }
    return result;
}

function getRandomNumbers() {
    let result = "";
    for(let i = 0; i < rangeLength; i++) {
        result += String.fromCharCode(Math.floor(Math.random() * 10 ) + 48);
    }
    return result;
}

function getRandomSymbol() {
    const symbolsChar = "!@#$%^&*()_+=-/*+{}|\][~`,.<>?/;".split('')
    let result = "";
    for(let i = 0; i < rangeLength; i++) {
        result += symbolsChar[Math.floor(Math.random() * symbolsChar.length)];
    }
    return result;
}

const upper = includeUppercase.checked;
const lower = includeLowercase.checked;
const numbers = includeNumbers.checked;
const symbols = includeSymbols.checked;

// Generate Password Function
function generatePassword() {
    const upper = includeUppercase.checked;
    const lower = includeLowercase.checked;
    const numbers = includeNumbers.checked;
    const symbols = includeSymbols.checked;

    let generatedPassword = [];

    if(upper) {
        generatedPassword += getRandomUpperCase();
    }

    if(lower) {
        generatedPassword += getRandomLowerCase();
    }

    if(numbers) {
        generatedPassword += getRandomNumbers();
    }

    if(symbols) {
        generatedPassword += getRandomSymbol();
    }
    // console.log(generatedPassword)

    let finalPassword = [];
    for(let i = 0; i < rangeLength; i++) {
        finalPassword += generatedPassword[Math.floor(Math.random() * generatedPassword.length)];
    }

    passwordOutput.textContent = finalPassword;
    // console.log(finalPassword)
    // console.log(rangeLength)

    if(upper + lower + numbers + symbols === 0) {
        errorMessage.style.display = 'block';
        passwordOutput.innerText = 'P4$5W0rD';
    }

    // Set timeout for the errorMessage (Message dissapears after 3.5s)
    setTimeout(() => {
        errorMessage.style.display = 'none';
    }, 3500)
}

// Generate Button
let generateBtn = document.getElementById('generateBtn');
generateBtn.addEventListener('click', () => {
    generatePassword()
    passwordStrength()
});

// Copy to cliboard
function passwordCopy() {
    let copyText = passwordOutput.textContent;
    navigator.clipboard.writeText(copyText).then(() => {
        copiedText.style.display = 'block';
    }).catch(() => {
        alert("Error")
    });
    
    // Set timeout for the copiedText (Message dissapears after 2s)
    setTimeout(() => {
        copiedText.style.display = 'none';
    }, 2000)
}
copyPassword.addEventListener('click', passwordCopy)

// Password Strength 
function passwordStrength() {
    if((rangeLength > 14)) {
        strengthLevel.textContent = "Strong"
        scaleBar.item(0).style.backgroundColor = 'hsl(127, 100%, 82%)';
        scaleBar.item(1).style.backgroundColor = 'hsl(127, 100%, 82%)';
        scaleBar.item(2).style.backgroundColor = 'hsl(127, 100%, 82%)';
        scaleBar.item(3).style.backgroundColor = 'hsl(127, 100%, 82%)';
    } else if ((rangeLength > 10 && rangeLength <= 14)) {
        strengthLevel.textContent = "Medium"
        scaleBar.item(0).style.backgroundColor = 'hsl(42, 91%, 68%)';
        scaleBar.item(1).style.backgroundColor = 'hsl(42, 91%, 68%)';
        scaleBar.item(2).style.backgroundColor = 'hsl(42, 91%, 68%)';
        scaleBar.item(3).style.backgroundColor = 'transparent';
    } else if ((rangeLength > 7 && rangeLength <= 10)) {
        strengthLevel.textContent = "Weak"
        scaleBar.item(0).style.backgroundColor = 'hsl(13, 51%, 66%)';
        scaleBar.item(1).style.backgroundColor = 'hsl(13, 51%, 66%)';
        scaleBar.item(2).style.backgroundColor = 'transparent';
        scaleBar.item(3).style.backgroundColor = 'transparent';
    } else if ((rangeLength <= 7)) {
        strengthLevel.textContent = "Too Weak"
        scaleBar.item(0).style.backgroundColor = 'hsl(0, 91%, 63%)';
        scaleBar.item(1).style.backgroundColor = 'transparent';
        scaleBar.item(2).style.backgroundColor = 'transparent';
        scaleBar.item(3).style.backgroundColor = 'transparent';
    } else if(!upper + !lower + !numbers + !symbols) {
        strengthLevel.textContent = ""
        scaleBar.item(0).style.backgroundColor = 'transparent';
        scaleBar.item(1).style.backgroundColor = 'transparent';
        scaleBar.item(2).style.backgroundColor = 'transparent';
        scaleBar.item(3).style.backgroundColor = 'transparent';
    }
}