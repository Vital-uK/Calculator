const checkLength = function(string) {
    let result = string.length;
    if (string.includes('.')) result--;
    if (string.includes('-')) result--;
    return result;
}

const betterResult = function(result) {
    result = +(result.toFixed(9));
    if (checkLength(result.toString())>10) return result.toPrecision(10);
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

const findButton = function(e) {
    if (e.key != 'Enter') {
        return document.querySelector(`button[value="${(e).key}"]`);
    } else return document.querySelector(`button[value="="]`);
    
}

window.addEventListener('keydown', e => {    
    console.log(e.key);
    findButton(e).click();
    findButton(e).focus();    
}); 
window.addEventListener('keyup', e => {findButton(e).blur()}); 
window.addEventListener('mousedown', e => {
    e.target.click();
    e.target.focus();    
}); 
window.addEventListener('mouseup', e => {e.target.blur()}); 

const mainScreen = document.querySelector('.main-screen');
const upperScreen = document.querySelector('.upper-screen');
const buttons = document.querySelectorAll('.calc-button');
for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', event => {
        mainScreen.textContent = event.target.value;        
    });
}




