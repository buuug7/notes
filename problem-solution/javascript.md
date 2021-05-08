# javascript related

## fetch 下载的例子

```javascript
fetch(url, myInit).then((res) => {
  const contentType = res.headers.get("Content-Type");
  // 根据返回contentType, 处理是json, 还是下载文件
  if (contentType.toLowerCase() == "application/json;charset=utf-8") {
    res.json().then((data) => {
      alert(data.success);
    });
  } else if (
    contentType.toLowerCase() ==
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  ) {
    res.blob().then((blob) => {
      // 创建一个a标签, 用于下载
      var a = document.createElement("a");
      var url = window.URL.createObjectURL(blob);
      var fileName = "被下载的文件.txt";
      a.href = url;
      a.download = fileName;
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }
});
```

## 为什么有些函数前面有个`+function(){}`或者`!function(){}`

参考[stackoverflow](https://stackoverflow.com/questions/5827290/javascript-function-leading-bang-syntax)

## javascript 弹出一个窗口

```javascript
window.open(
  url,
  "Share",
  "width=550,height=400,toolbar=0,scrollbars=1,location=0,statusbar=0,menubar=0,resizable=0"
);
```

## Javascript 获取时间

```javascript
var tick = new Date();
var month = (tick.getMonth() + 1).toString().replace(/^(\d)$/, "0$1");
var day = tick
  .getDate()
  .toString()
  .replace(/^(\d)$/, "0$1");
var h = tick
  .getHours()
  .toString()
  .replace(/^(\d)$/, "0$1");
var m = tick
  .getMinutes()
  .toString()
  .replace(/^(\d)$/, "0$1");
document.write(month + "-" + day + " " + h + ":" + m);
```

## 罗马数字跟阿拉伯数字相互转换

```javascript
function romanize(num) {
  if (!+num) return false;
  var digits = String(+num).split(""),
    key = [
      "",
      "C",
      "CC",
      "CCC",
      "CD",
      "D",
      "DC",
      "DCC",
      "DCCC",
      "CM",
      "",
      "X",
      "XX",
      "XXX",
      "XL",
      "L",
      "LX",
      "LXX",
      "LXXX",
      "XC",
      "",
      "I",
      "II",
      "III",
      "IV",
      "V",
      "VI",
      "VII",
      "VIII",
      "IX",
    ],
    roman = "",
    i = 3;
  while (i--) roman = (key[+digits.pop() + i * 10] || "") + roman;
  return Array(+digits.join("") + 1).join("M") + roman;
}

function deromanize(str) {
  var str = str.toUpperCase(),
    validator = /^M*(?:D?C{0,3}|C[MD])(?:L?X{0,3}|X[CL])(?:V?I{0,3}|I[XV])$/,
    token = /[MDLV]|C[MD]?|X[CL]?|I[XV]?/g,
    key = {
      M: 1000,
      CM: 900,
      D: 500,
      CD: 400,
      C: 100,
      XC: 90,
      L: 50,
      XL: 40,
      X: 10,
      IX: 9,
      V: 5,
      IV: 4,
      I: 1,
    },
    num = 0,
    m;
  if (!(str && validator.test(str))) return false;
  while ((m = token.exec(str))) num += key[m[0]];
  return num;
}
```
