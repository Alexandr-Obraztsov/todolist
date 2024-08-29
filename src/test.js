function calc(str){
    if(str[1] !== ("/")) return eval(str);

    if(str[2]) return Math.floor(str[0]/str[2]);
    return 0;
}

function compare(str, func){
    if (func && func.length === 2) return calc(str + func);
    return str + (func ? func : "");
}

function zero(func) {
    return compare("0", func)
}

function one(func) {
    return compare("1", func);
}
function two(func) {
    return compare("2", func);
}
function three(func) {
    return compare("3", func);
}
function four(func) {
    return compare("4", func);
}
function five(func) {
    return compare("5", func);
}
function six(func) {
    return compare("6", func);
}
function seven(func) {
    return compare("7", func);
}
function eight(func) {
    return compare("8", func);
}
function nine(func) {
    return compare("9", func);
}

function plus(func) {
    return "+" + func;
}
function minus(func) {
    return "-" + func;
}
function times(func) {
    return "*" + func;
}
function dividedBy(func) {
    return "/" + func;
}