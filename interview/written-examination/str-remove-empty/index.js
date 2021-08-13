let str = " a bc ";

let noEmpty = str.replace(/(^\s*)|(\s*$)/g, "");

console.log(noEmpty);

// 或者使用 String.prototype.trim()
console.log(str.trim());

