# JavaScript Useful Hacks

## 生成介于两个数之间的随机数

```javascript
function random(max, min) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
```

## 使用!!操作符转换布尔值

有时候我们需要对一个变量查检其是否存在或者检查值是否有一个有效值，如果存在就返回 true 值。为了做这样的验证，我们可以使用!!操作符来实现是非常的方便与简单。对于变量可以使用!!variable 做检测，只要变量的值为:0、null、" "、undefined 或者 NaN 都将返回的是 false，反之返回的是 true。比如下面的示例：

```JavaScript
// false
const v1 = !!null;
// false
const v2 = !!NaN;
```

## 使用`+`将字符串转换成数字

```JavaScript
function toNumber(strNumber) {
    return +strNumber;
}

// 123
console.log(toNumber("123"));

// NaN
console.log(toNumber("ACB"));

// 这个也适用于Date，在本例中，它将返回的是时间戳数字：
// 1461288164385
+new Date() //
```

## 使用`||`运算符

在 ES6 中有默认参数这一特性。为了在老版本的浏览器中模拟这一特性，可以使用`||`操作符，并且将将默认值当做第二个参数传入。如果第一个参数返回的值为 false，那么第二个值将会认为是一个默认值。如下面这个示例：

```JavaScript
function User(name, age) {
    this.name = name || "default name";
    this.age = age || 27;
}
const user1 = new User();

// default name
user1.name;

// 27
user1.age;

const user2 = new User("Barry Allen", 25);
// Barry Allen
user2.name;
// 25
user2.age;
```

## 在循环中缓存 array.length

这个技巧很简单，这个在处理一个很大的数组循环时，对性能影响将是非常大的。基本上，大家都会写一个这样的同步迭代的数组：

```JavaScript
for(let i = 0; i < array.length; i++) {
    console.log(array[i]);
}
```

如果是一个小型数组，这样做很好，如果你要处理的是一个大的数组，这段代码在每次迭代都将会重新计算数组的大小，这将会导致一些延误。为了避免这种现象出现，可以将 array.length 做一个缓存：

```JavaScript
const length = array.length;
for(let i = 0; i < length; i++) {
    console.log(array[i]);
}
```

你也可以写在这样：

```JavaScript
for(let i = 0, length = array.length; i < length; i++) {
    console.log(array[i]);
}
```

## 获取数组中最后一个元素

Array.prototype.slice(begin,end)用来获取 begin 和 end 之间的数组元素。如果你不设置 end 参数，将会将数组的默认长度值当作 end 值。但有些同学可能不知道这个函数还可以接受负值作为参数。如果你设置一个负值作为 begin 的值，那么你可以获取数组的最后一个元素。如：

```JavaScript
const arr = [1, 2, 3, 4, 5, 6];
// [6]
arr.slice(-1);
// [5,6]
arr.slice(-2);
```

## 数组截断

这个小技巧主要用来锁定数组的大小，如果用于删除数组中的一些元素来说，是非常有用的。例如，你的数组有 10 个元素，但你只想只要前五个元素，那么你可以通过 array.length=5 来截断数组。如下面这个示例：

```JavaScript
const arr = [1, 2, 3, 4, 5, 6];
// 6
arr.length;
arr.length = 3;
// 3
arr.length;
// [1,2,3]
console.log(arr);
```

## 替换所有

String.replace()函数允许你使用字符串或正则表达式来替换字符串，本身这个函数只替换第一次出现的字符串，不过你可以使用正则表达多中的/g 来模拟 replaceAll()函数功能：

```JavaScript
const str = "twice third";

// twIce third
const str1 = str.replace(/i/, "I");
// twIce thIrd
const str2 = str.replace(/i/g, 'I');
```

## 数组元素的洗牌

对于数组元素的洗牌，不需要使用任何外部的库，比如 Lodash，只要这样做：

```JavaScript
const list = [1, 2, 3]

list.sort(() => Math.random() - 0.5);

// [ 3, 2, 1 ]
console.log(list);
```

## 将 NodeList 转换成数组

如果你运行 document.querySelectorAll(“p”)函数时，它可能返回 DOM 元素的数组，也就是 NodeList 对象。但这个对象不具有数组的函数功能，比如 sort()、reduce()、map()、filter()等。为了让这些原生的数组函数功能也能用于其上面，需要将节点列表转换成数组。可以使用[].slice.call(elements)来实现：

```JavaScript
// elements is NodeList
const elements = document.querySelectorAll("p");

// Now the NodeList is an array
const arr1 = [].slice.call(elements);

// This is another way of converting NodeList to Array
const arr2 = Array.from(elements);
```
