const checkLength = function(string) {
    let result = string.length;
    if (string.includes('.')) result--;
    if (string.includes('-')) result--;
    
    return result;
}

const add = function(a,b) {
    let result = a + b;
    result = +(result.toFixed(9));
    if (checkLength(result.toString())>10) return result.toPrecision(10);
    return result;    
}

const subtract = function(a,b) {
    let result = a-b;
    result = +(result.toFixed(9));
    if (checkLength(result.toString())>10) return result.toPrecision(10);
    return result;         
}

const multiply = function(a,b) {
    let result = a*b;
    result = +(result.toFixed(9));
    if (checkLength(result.toString())>10) return result.toPrecision(10);
    return result;          
}

const divide = function(a,b) {
    let result
    if (b != 0) {
        result = a/b;
        result = +(result.toFixed(9));
        if (checkLength(result.toString())>10) return result.toPrecision(10);
        return result;          
    }
    return 'ERROR';        
}

const toPower = function(a,b) {
    let result = a**b;
    result = +(result.toFixed(9));
    if (checkLength(result.toString())>10) return result.toPrecision(10);
    return result;        
}

const changeSign = function(a) {
    result = -a
    result = +(result.toFixed(9));
    if (checkLength(result.toString())>10) return result.toPrecision(10);
    return result;         
}