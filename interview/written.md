# The written questions

## 使用递归计算 100 以内数字的总和

```javascript
function sum(n) {
  if (n <= 1) {
    return 1;
  }

  return n + sum(n - 1);
}
```

## 使用 JS 返回当前时间戳

```javascript
const timestamp = Date.parse(new Date());
```

## 遍历对象

```javascript
const obj = {
  x: 1,
  y: {
    a: 2,
    b: {
      c: 3,
      d: 4,
    },
  },
};

function fn(obj) {
  Object.keys(obj).forEach((key) => {
    const value = obj[key];
    if (typeof value === "object") {
      fn(value);
    } else {
      // do something
      console.log(key, value);
    }
  });
}

// 或者使用forEach

function fn(obj) {
  Object.keys(obj).forEach((key) => {
    const item = obj[key];
    if (typeof item === "object") {
      fn(item);
    } else {
      // do something
      console.log(key, item);
    }
  });
}
```

## 正则判断 QQ

5-10 位数字

```javascript
const reg = /^\d{5,10}$/;
```

## 判断一个字符串中出现次数最多的字符，统计这个次数

```javascript
const str = "asdfssaaasasasasaa";
const result = {};

for (let i = 0; i < str.length; i++) {
  if (!result[str.charAt(i)]) {
    result[str.charAt(i)] = 1;
  } else {
    result[str.charAt(i)] += 1;
  }
}

let max = 0;

for (let item in result) {
  if (result[item] > max) {
    max = result[item];
  }
  console.log("item", item);
}

console.log(result);
console.log("max=", max);
```

### 解析 URL 参数为对象

```javascript
function parseParam(url) {
  const reg = /.+\?(.+)$/;
  const arr = reg.exec(url)[1].split("&");
  const result = {};
  arr.forEach((item) => {
    let [k, v] = item.split("=");
    if (result.hasOwnProperty(k)) {
      result[k] = [...result[k], v];
    } else {
      result[k] = v;
    }
  });
  return result;
}

const url = "https://github.com/buuug7/your-resume?a=1&a=2&b=2&c=";
console.log(parseParam(url)); // { a: [ '1', '2' ], b: '2', c: '' }
```

## 字符串模板

```javascript
function render(template, data) {
  const reg = /\{\{(\w+)\}\}/;
  if (reg.test(template)) {
    const name = reg.exec(template)[1];
    template = template.replace(reg, data[name]);
    return render(template, data); // 递归调用
  }
  return template;
}

const template = "my name is {{name}} and age {{age}}.";
render(template, { name: "tom", age: 22 }); // my name is tom and age 22.
```

##

```javascript
const imgList = [...document.querySelectorAll("img")];
let length = imgList.length;

const imgLazyLoad = function () {
  console.log("img lazy load");
  let count = 0;
  let deletedIndex = [];
  imgList.forEach((item, index) => {
    let rect = item.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      item.src = item.dataset.src;
      deletedIndex.push(index);
      count++;
      // 图片全部加载完成后移除事件监听
      if (count === length) {
        document.removeEventListener("scroll", imgLazyLoad);
      }
    }
  });
};

document.addEventListener("scroll", imgLazyLoad);
```

## 对象 copy

// 普通实现，只考虑普通对象属性，不考虑内置对象和函数。

```javascript
function deepCopy(obj) {
  if (typeof obj !== "object") {
    return;
  }

  let newObj = obj instanceof Array ? [] : {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] =
        typeof obj[key] === "object" ? deepCopy(obj[key]) : obj[key];
    }
  }

  return newObj;
}

const p1 = { name: "tom", age: 22 };
const p2 = deepCopy(p1);

console.log(p1 === p2); // false
```

使用 `object.assign`

```javascript
// 对象浅拷贝， 复制所有可枚举属性
const obj1 = { a: 1 };
const obj2 = { b: 2 };
// copy obj1 and obj2 to a new obj;
Object.assign({}, obj1, obj2);
```

使用扩展运算符进行浅 copy

```javascript
const obj1 = { a: 1, b: 2 };
// obj2 equal obj1
const obj2 = { ...obj1 };
```

在对象的拷贝方法中比较困扰的就是深层拷贝，此方法为深层拷贝；

```javascript
function deepCopy(data) {
  return JSON.parse(JSON.stringify(data));
}
```

## 数组扁平化

数组扁平化就是将 [1, [2, [3]]] 这种多层的数组拍平成一层 [1, 2, 3]。使用 Array.prototype.flat 可以直接将多层数组拍平成一层。

```javascript
[1, [2, [3]]].flat(2); // [1, 2, 3]
```

```javascript
// 实现flat
function flat(arr) {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      result = result.concat(flat(arr));
    } else {
      result.push(arr[i]);
    }
  }
  return result;
}
```

---

## 原型链继承

通过申明一个构造函数，然后在该构造函数的原型上添加属性和方法，然后子类调用父类构造函数来达到继承的目的。

```javascript
function Animal() {
  this.color = "red";
}

Animal.prototype.say = function () {
  return "I am a animal";
};

function Dog() {}

Dog.prototype = new Animal();

const dog1 = new Dog();
dog1.say(); // I am a animal
```

## 借用构造函数实现继承

```javascript
function Animal(name) {
  this.name = name;
  this.getName = function () {
    return this.name;
  };
}

function Dog(name) {
  Animal.call(this, name);
}

Dog.prototype = new Animal();
```

借用构造函数实现继承解决了原型链继承的 2 个问题：引用类型共享问题以及传参问题。但是由于方法必须定义在构造函数中，所以会导致每次创建子类实例都会创建一遍方法。

## 组合继承

组合继承结合了原型链和借用构造函数，将两者的优点集中了起来。基本的思路是使用原型链继承原型上的属性和方法，而通过借用构造函数继承实例属性。这样既可以把方法定义在原型上以实现重用，又可以让每个实例都有自己的属性。

```javascript
function Animal(name) {
  this.name = name;
  this.colors = ["red", "green"];
}

Animal.prototype.getName = function () {
  return this.name;
};

function Dog(name, age) {
  Animal.call(this, name);
  this.age = age;
}

Dog.prototype = new Animal();
Dog.prototype.constructor = Dog;

const dog1 = new Dog("dog1", 1);
dog1.colors.push("blue");
const dog2 = new Dog("dog2", 2);
dog2.colors.push("black");
console.log(dog1); // Dog { name: 'dog1', colors: [ 'red', 'green', 'blue' ], age: 1 }
console.log(dog2); // Dog { name: 'dog2', colors: [ 'red', 'green', 'black' ], age: 2 }
```

## class 实现继承

```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }
}

class Dog extends Animal {
  constructor(name, age) {
    super(name);
    this.age = age;
  }
}
```

---

## javascript 设置 cookie

```javascript
// 设置cookie
const now = new Date();
now.setTime(now.getTime() + 24 * 60 * 60 * 1000);
document.cookie = `key=value;expires=${now.toUTCString()};path=/;domain=localhost`;

// 读取cookie
const cookies = document.cooke;
```

## 简单版深拷贝

```javascript
function deepClone(obj) {
  if (typeof obj !== "object") {
    return;
  }
  let newObj = obj instanceof Array ? [] : {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj["key"] =
        typeof obj[key] === "object" ? deepClone(obj["key"]) : obj[key];
    }
  }
  return newObj;
}
```

## 解析 URL 参数

```javascript
function parseUrlParam(url) {
  const paramStr = /.+\?(.+)$/.exec(url)[1];
  const arr = paramStr.split("&");
  let obj = {};

  arr.forEach((item) => {
    let [k, v] = item.split("=");
    if (obj.hasOwnProperty(k)) {
      obj[k] = [...obj["key"], v];
    } else {
      obj[k] = v;
    }
  });

  return arr;
}
```

## 数组扁平化

```javascript
function flat(arr) {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      result = [...result, ...flat(arr[i])];
    } else {
      result.push(arr[i]);
    }
  }
  return result;
}

console.log(flat([1, [2, [3]]])); // [ 1, 2, 3 ]
```

## 数组去重

```javascript
// first
function unique(arr) {
  return arr.filter((item, index, array) => {
    return array.indexOf(item) === index;
  });
}

// another
const arr = [1, 1, 2, 3, 3, 5];

// [ 1, 2, 3, 5 ]
const arrNoRepeat = [...new Set(arr)];
```

## 对象数组去重

```javascript
let arr = [
  { id: 1, name: "tom1" },
  { id: 1, name: "tom1" },
  { id: 2, name: "tom2" },
];

arr = arr.filter(
  (value, index, self) => index === self.findIndex((it) => it.id === value.id)
);

// or

arr.reduce((_arr, item) => {
  if (!_arr.some((it) => it.id === item.id)) {
    _arr.push(item);
  }
  return _arr;
}, []);
```

## 检查数据类型

```javascript
function checkType(obj) {
  const r1 = Object.prototype.toString.call(obj);
  const r2 = r1.substr(1, r1.length - 2);
  return r2.split(" ")[1].toLowerCase();
}
```

## 原型链继承

```javascript
function Animal(name) {
  this.name = name;
}

Animal.prototype.getName();
{
  return this.name;
}

function Dog() {}

Dog.prototype = new Animal();
```

## 组合继承

使用原型链继承原型上的属性和方法，而通过盗用构造函数继承实例属性。

```javascript
function Animal(name) {
  this.name = name;
}

Animal.prototype.getName();
{
  return this.name;
}

function Dog(name) {
  Animal.call(this, name);
}

Dog.prototype = new Animal();
```

## 订阅发布模式

```javascript
class EventEmitter {
  constructor() {
    this.cache = {};
  }

  on(name, fn) {
    this.cache[name] ? this.cache[name].push(fn) : (this.cache[name] = [fn]);
  }

  off(name, fn) {
    const tasks = this.cache[name];
    if (tasks) {
      this.cache[name] = tasks.filter((f) => f !== fn);
    }
  }

  emit(name, ...arg) {
    if (this.cache[name]) {
      let tasks = this.cache[name];
      for (let fn of tasks) {
        fn(...arg);
      }
    }
  }
}

const event = new EventEmitter();

const f1 = (e) => console.log("f1:", e);
const f2 = (e) => console.log("f2:", e);

event.on("a", f1);
event.on("a", f2);

// 取消f1监听a
event.off("a", f1);

event.emit("a", "a1");
event.emit("a", "a2");

// result
// f2: a1
// f2: a2
```

## 图片懒加载

```javascript
function imgLazyLoad() {
  let imgList = [...document.querySelectorAll("img")];
  imgList.forEach((item, index) => {
    let rect = item.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      item.src = item.dataset.src;
    }
  });
}

document.addEventListener("scroll", imgLazyLoad);
```

## 防抖

在事件被触发 n 秒后再执行回调，如果在这 n 秒内又被触发，则重新计时。

```javascript
function debounce(fn, wait) {
  let time = null;
  return function () {
    if (time) {
      clearInterval(time);
    }

    const arg = arguments;
    time = setTimeout(() => {
      fn.apply(this, arg);
    }, wait);
  };
}
```

## 节流

规定在一个单位时间内，只能触发一次函数。如果这个单位时间内触发多次函数，只有一次生效。

```javascript
function throttle(fn, wait) {
  let time = null;
  return function () {
    const arg = arguments;
    if (!time) {
      time = setTimeout(() => {
        fn.apply(this, arg);
      }, wait);
    }
  };
}
```

## 手动写个 XMLHttpRequest 请求数据的方法

```javascript
function getJson(url) {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      xhr.status === 200
        ? console.log(xhr.responseText)
        : console.error("error");
    }
  };
  xhr.open("GET", url);
  xhr.send();
}
```

## 实现 forEach

```javascript
Array.prototype.forEach2 = function (cb, thisArg) {
  const array = this;
  for (let i = 0; i < array.length; i++) {
    cb.call(thisArg, array[i], i, array);
  }
};
```

## 实现 map

```javascript
Array.prototype.map2 = function (cb, thisArg) {
  const array = this;
  const result = [];
  for (let i = 0; i < array.length; i++) {
    result[i] = cb.call(thisArg, array[i], i, array);
  }
  return result;
};
```

## 实现 filter

```javascript
Array.prototype.filter2 = function (cb, thisArg) {
  const array = this;
  const result = [];
  for (let i = 0; i < array.length; i++) {
    if (cb.call(thisArg, array[i], i, array)) {
      result.push(array[i]);
    }
  }
  return result;
};
```

## Quick sort 快速排序

简单实现

```javascript
function quickSort(arr) {
  const _arr = [...arr];
  if (_arr.length < 2) {
    return _arr;
  }

  const pivot = _arr.shift();
  const less = _arr.filter((item) => item < pivot);
  const greater = _arr.filter((item) => item > pivot);
  return [...quickSort(less), pivot, ...quickSort(greater)];
}
```

## 选择排序

简单实现

```javascript
function selectSort(arr) {
  const _arr = [...arr];

  for (let i = 0; i < _arr.length - 1; i++) {
    let minIndex = i;

    for (let j = i + 1; j < _arr.length; j++) {
      if (_arr[j] < _arr[minIndex]) {
        minIndex = j;
      }
    }

    if (minIndex !== i) {
      [_arr[i], _arr[minIndex]] = [_arr[minIndex], _arr[i]];
    }
  }
  return _arr;
}
```

## 二分查找

```javascript
function binarySearch(arr, v) {
  let startIndex = 0;
  let endIndex = arr.length - 1;

  while (startIndex <= endIndex) {
    const midIndex = Math.floor((endIndex - startIndex) / 2) + startIndex;
    if (arr[midIndex] === v) {
      return midIndex;
    }

    if (arr[midIndex] > v) {
      endIndex = midIndex - 1;
    } else {
      startIndex = midIndex + 1;
    }
  }

  return -1;
}
```

## 比较第一个数组跟第二个数组(或者更多数据)的差异元素并返回

Create an array with values that are present in the first input array but not additional ones

```javascript
function arrDiff(arr, ...rest) {
  // 合并除了第一个数组之外的其他数组
  const concatRest = [].concat.apply([], rest);
  // 返回存在第一个数组中,但是不存在其他数组中的元素
  return arr.filter((item) => concatRest.indexOf(item) === -1);
}

const a1 = [1, 2, 3];
const a2 = [2, 3, 4];

arrDiff(a1, a2); // 1
```
