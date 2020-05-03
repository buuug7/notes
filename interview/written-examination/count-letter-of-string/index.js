// 统计字符串"aaaabbbcccdef"中各字符出现的次数
let str = "aaaabbbcccdef";
let result = [];
for (let i = 0; i < str.length; i++) {
  if (result[str[i]]) {
    result[str[i]] += 1;
  } else {
    result[str[i]] = 1;
  }
}

console.log(result);
