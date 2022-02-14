const checkLength = function(string) {
    let result = string.length;
    if (string.includes('.')) result--;
    if (string.includes('-')) result--;
    return result;
}

const betterResult = function(result) {
    result = +(result.toFixed(9));
    if (checkLength(result.toString())>10) return result.toPrecision(6);
    return result;
}

const add = function(a,b) {
    let result = a + b;
    return betterResult(result);    
}

const subtract = function(a,b) {
    let result = a-b;
    return betterResult(result);         
}

const multiply = function(a,b) {
    let result = a*b;
    return betterResult(result);           
}

const divide = function(a,b) {
    let result
    if (b != 0) {
        result = a/b;
        return betterResult(result);           
    }       
    return 'ERROR';                
}

const toPower = function(a,b) {
    let result = a**b;
    return betterResult(result);         
}

const changeSign = function(a) {
    result = -a
    return betterResult(result);          
}

const operate = function(num1, num2, operator) {
    switch (operator) {
        case '+': return add(Number(num1),Number(num2));
        case '-': return subtract(Number(num1),Number(num2));
        case '*': return multiply(Number(num1),Number(num2));
        case '/': 
            let result = divide(Number(num1),Number(num2));
            if (result == 'ERROR') return null
                else return result; 
        case '**': return toPower(Number(num1),Number(num2));        
    }
}

const checkButton = function(e) {
    let result = document.querySelector(`button[value="${(e).key}"]`);
    if (result == null) result = Calc;
    return result;
}

const findButton = function(e) {
    if (e.key != 'Enter') {
        return checkButton(e);
    } else return document.querySelector(`button[value="="]`);    
}

window.addEventListener('keydown', e => {    
    console.log(e.key);
    if (findButton(e).value != '=') findButton(e).click();
    findButton(e).focus();    
}); 
window.addEventListener('keyup', e => {
    findButton(e).blur();
}); 
window.addEventListener('mousedown', e => {
    e.target.focus();    
}); 
window.addEventListener('mouseup', e => {
    e.target.blur();
}); 

const Calc = document.querySelector('.button-container');
const mainScreen = document.querySelector('.main-screen');
const upperScreen = document.querySelector('.upper-screen');
const buttons = document.querySelectorAll('.calc-button');
let currentTyping = '';
let isTyping = true;
let firstNumber = null;
let secondNumber = null;
let lastOperator = '';

for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('mouseleave', event => event.target.blur());

    if (buttons[i].classList.contains('number')) {
        buttons[i].addEventListener('click', event => {
            if (isTyping) {
                if (mainScreen.textContent == '0') mainScreen.textContent = '';
                if (checkLength(mainScreen.textContent) < 10) {
                    mainScreen.textContent += event.target.value;  
                }
            } else {
                isTyping = true;
                mainScreen.textContent = event.target.value;
            }    
        });      
    } else

    if (buttons[i].classList.contains('sign')) {
        buttons[i].addEventListener('click', event => {
            if (isTyping) {
                mainScreen.textContent = -Number(mainScreen.textContent);                
            } else {
                mainScreen.textContent = -Number(mainScreen.textContent);
                secondNumber = Number(mainScreen.textContent);
            }    
        });
    } else

    if (buttons[i].classList.contains('dot')) {
        buttons[i].addEventListener('click', event => {
            if (isTyping) {
                if (!mainScreen.textContent.includes('.')) mainScreen.textContent += '.';                
            }  else {
                isTyping = true;
                mainScreen.textContent = '0.';
            }
        });
    } else

    if (buttons[i].classList.contains('backspace')) {
        buttons[i].addEventListener('click', event => {
            const mainText = document.querySelector('.main-screen').textContent;
            if (isTyping) {
                if (checkLength(mainText) > 1) mainScreen.textContent = mainText.slice(0,mainText.length-1);
                else mainScreen.textContent = '0';
            } else {
                mainScreen.textContent = '0';
            }               
        });
    } else

    if (buttons[i].classList.contains('clear')) {
        buttons[i].addEventListener('click', event => {
            mainScreen.textContent = '0';
            upperScreen.textContent = '';
            currentTyping = '';
            isTyping = true;
            firstNumber = null;
            secondNumber = null;
            lastOperator = '';
        });
    } else

    if (buttons[i].classList.contains('operator')) {
        buttons[i].addEventListener('click', event => {
            const mainText = document.querySelector('.main-screen').textContent;
            const upperText = document.querySelector('.upper-screen').textContent;
            if (firstNumber == null) {
                firstNumber = Number(mainText);
                lastOperator = event.target.value;
                console.log(lastOperator);
                upperScreen.textContent = `${firstNumber} ${lastOperator}`;
                isTyping = false; 
            } else if (secondNumber == null) {                
                if (!isTyping) {
                    lastOperator = event.target.value;
                    upperScreen.textContent = `${firstNumber} ${lastOperator}`; 
                } else {
                    secondNumber = Number(mainText);
                    let result = operate(firstNumber,secondNumber,lastOperator);
                    lastOperator = event.target.value;
                    firstNumber = result;
                    secondNumber = null;                    
                    upperScreen.textContent = `${result} ${lastOperator}`;
                    isTyping = false;
                }                
            } else {
                if (!isTyping) {
                    let result = operate(firstNumber,secondNumber,lastOperator);
                    lastOperator = event.target.value;
                    firstNumber = result;
                    secondNumber = null;                    
                    upperScreen.textContent = `${result} ${lastOperator}`;
                    isTyping = false;
                } else {
                    secondNumber = Number(mainText);
                    let result = operate(firstNumber,secondNumber,lastOperator);
                    lastOperator = event.target.value;
                    firstNumber = result;
                    secondNumber = null;                    
                    upperScreen.textContent = `${result} ${lastOperator}`;
                    isTyping = false;                    
                }
            }                   
        });
    } else

    if (buttons[i].classList.contains('evaluate')) {
        buttons[i].addEventListener('click', event => {
            if (firstNumber != null) {
                secondNumber = Number(mainScreen.textContent);
                let result = operate(firstNumber,secondNumber,lastOperator);
                firstNumber = null;
                secondNumber = null;
                lastOperator = ''                    
                upperScreen.textContent = ``;
                mainScreen.textContent = result;
                isTyping = false;    
            } else mainScreen.textContent = Number(mainScreen.textContent);            
            
        });
    }
}

