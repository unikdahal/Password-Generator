const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");

const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';


let password="";
let passwordLength =10;
let checkcount=1;
setIndicator("#ccc");

// setpasswordLength

function handleSlider(){
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
}

function setIndicator(color){
    indicator.style.backgroundColor = color;
}

function getRandomInt(min,max){
    return Math.floor(Math.random()*(max-min)+min);
}

function getRandomNumber(){
    return getRandomInt(0,9);
}

function generateLowercase(){
    return String.fromCharCode(getRandomInt(97,123));
}

function generateUppercase(){
    return String.fromCharCode(getRandomInt(65,91));
}

function generateSymbol(){
    return symbols[getRandomInt(0,symbols.length)];
}

function calcStrength(){
    let hasUpper =false;
    let hasLower =false;
    let hasNumber =false;
    let hasSymbol =false;

    if(uppercaseCheck.checked){
        hasUpper = true;
    }
    if(lowercaseCheck.checked){
        hasLower = true;
    }
    if(numbersCheck.checked){
        hasNumber = true;
    }
    if(symbolsCheck.checked){
        hasSymbol = true;
    }

    if(hasUpper && hasLower && (hasNumber || hasSymbol) && passwordLength >= 8){
        setIndicator("#0f0");

    }else if((hasUpper || hasLower) && (hasNumber || hasSymbol) && passwordLength >= 6){
        setIndicator("#ff0");
    }else{
        setIndicator("#f00");
    }   

}

async function copyContent(){
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "Copied!";
    }
    catch(e){
        copyMsg.innerText = "Failed to copy";
    }

    copyMsg.classList.add("active");
    setTimeout(()=>{
        copyMsg.classList.remove("active");
        },2000);
}

inputSlider.addEventListener('input',(e)=>{
    passwordLength = e.target.value;
    handleSlider();
});


copyBtn.addEventListener('click',()=>{
    if(passwordDisplay.value !== ""){
        copyContent();
    }
})

function handleCheckBoxChange(){
    checkcount=0;
    allCheckBox.forEach((checkbox)=>{
        if(checkbox.checked){
            checkcount++;
        }
    })
}

allCheckBox.forEach((checkbox)=>{
    checkbox.addEventListener('change',handleCheckBoxChange)
})

function shufflePassword(){
    let passwordArray = password.split("");
    for(let i=passwordArray.length-1;i>0;i--){
        let j = Math.floor(Math.random()*(i+1));
        let temp = passwordArray[i];
        passwordArray[i] = passwordArray[j];
        passwordArray[j] = temp;
    }
    return passwordArray.join("");
}
 
generateBtn.addEventListener('click',()=>{
    password="";
    handleCheckBoxChange();
    if(checkcount === 0){
        alert("Please select atleast one option");
        return;
    }

    if(passwordLength< checkcount){
        passwordLength = checkcount;
        handleSlider();
    }

    let funcArray = [];

    if(uppercaseCheck.checked){
        funcArray.push(generateUppercase);
    }
    if(lowercaseCheck.checked){
        funcArray.push(generateLowercase);
    }
    if(numbersCheck.checked){
        funcArray.push(getRandomNumber);
    }
    if(symbolsCheck.checked){
        funcArray.push(generateSymbol);
    }

    for(let i=0;i<funcArray.length;i++){
        password += funcArray[i]();
    }

    for(let i=0;i<passwordLength-funcArray.length;i++){
        let randomIndex = getRandomInt(0,funcArray.length);
        password += funcArray[randomIndex]();
    }

    password= shufflePassword();



   

    
    passwordDisplay.value = password;
    passwordDisplay.style.color= "#00F0FF";
    calcStrength();
}
)


