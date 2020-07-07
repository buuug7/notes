# javascript 操作数组的常用方法

### Array.from(arrayLike[, mapFn[, thisArg]])

从一个类数组或者可迭代对象中创建一个新的数组实例

```javascript
Array.from('abc'); // ["a", "b", "c"]
Array.from(new Set([1, 2, 3])); // [1, 2, 3]
Array.from(new Map([[1, 2], [2, 4], [4, 8]])); // ([1,2],[2,4],[4,8])
// 数组去除重复
Array.from(new Set([1, 2, 3, 3, 4, 4])); // [1, 2, 3, 4]
```

### Array.isArray(obj)

用来判断 obj 否是一个 Array

```javascript
Array.isArray(1); // false
Array.isArray([1, 2, 3]); // true
```

### Array.of(element0[, ...[, elementN]])

创建一个具有可变数量参数的新数组实例,而不考虑参数的数量跟类型

```javascript
Array.of(7); // [7]
Array.of(1, 2, 3); // [1, 2, 3]
Array(7); // [, , , , , ,]
```

### Array.prototype.concat()

将两个或者多个数组合并成为一个新数组,语法`oldArray.concat(value[, ...[, valueN]])`

```javascript
[1, 2].concat([3, 4]); // [1, 2, 3, 4]
[1, 2].concat([3, 4], [5, 6]); // [1, 2, 3, 4, 5, 6]
[1, 2].concat([3, 4], [5, 6], 7); // [1, 2, 3, 4, 5, 6, 7]
```

### Array.prototype.copyWithin()

浅复制数组的一部分到同一个数组的另一个位置, 会改变原数组的元素, 但是并不会改变原数组的长度

```javascript
[1, 2, 3].copyWithin(0); // [1, 2, 3]
[1, 2, 3].copyWithin(0, 1, 2); // [2, 2, 3]
[1, 2, 3].copyWithin(1, 2); // [1,3,3]
```

### Array.prototype.every()

测试数组的所有元素是否通过了指定函数的测试, 语法`arr.every(callback[, thisArg])`

```javascript
[1, 2, 3].every((element, index, arr) => element < 10); //true
```

### Array.prototype.some()

测试数组中的某些元素是否能通过提供函数的测试,语法`arr.some(callback[, thisArg])

```javascript
[1, 2, 3].some((element, index, arr) => element >= 2); // true
```

### Array.prototype.map()

返回一个由原数组中的每个元素调用一个指定方法后的返回值组成的新数组,语法`arr.map(callback[, thisArg])`

```javascript
[1, 2, 3].map((element, index, array) => element * 2); // [2, 4, 6]
```

### Array.prototype.reduce()

接收一个函数作为累加器(accumulator),数组中的每个值(从左到右)开始合并,最终为一个值,语法`arr.reduce(callback[, initialValue])`

```javascript
// callback执行数组中的每个值的函数,四个参数:
// 参数: previousValue上次调用回调返回的值,或者提供的初始值
// 参数: currentValue数组中当前被处理的值,
// 参数: index当前元素在数组中的索引
// 参数: array调用reduce()的数组
[1, 2, 3].reduce(
  (previousValue, currentValue, index, array) => previousValue + currentValue
); // 6
```

### Array.prototype.reduceRight()

接受一个函数作为累加器,数组的每个值(从右到左)将其减少为单个值,语法`arr.reduceRight(callback[, initialValue])`,callback 函数接受的参数跟 reduce()方法 callback 一致

```javascript
// reduce跟reduceRight区别
['a', 'b', 'c'].reduce((pre, cur, index, array) => pre + cur); // "abc"
['a', 'b', 'c'].reduceRight((pre, cur, index, array) => pre + cur);
('cba');
```

### Array.prototype.reverse()

颠倒数组中元素的位置,第一个元素会成为最后一个,最后一个会成为第一个.语法`arr.reverse()`.

```javascript
[1, 2, 3].reverse(); // [3, 2, 1]
```

### Array.prototype.fill()

用一个固定值从起始索引到终止索引来填充索引内的全部元素,语法`arr.fill(value[, start[, end]])`

```javascript
[1, 2, 3].fill(0); // [0, 0, 0]
[1, 2, 3].fill(0, 1); // [1, 0, 0]
[1, 2, 3].fill(0, 1); // [1, 0, 3]
```

### Array.prototype.filter()

返回一个新的通过测试的元素集合的数组,如果没有通过则返回空数组,语法`arr.filter(callback(element[, index[, array]])[, thisArg])`

```javascript
[1, 2, 3].filter(function(element, index, arr) {
  return element < 3;
}); // [1, 2]
```

### Array.prototype.find()

返回数组中满足提供的测试函数的第一个元素的值,否则返回`undefined`,语法`arr.find(callback[, thisArg])`

```javascript
[1, 2, 3].find((element, index, arr) => element > 2); // 3
```

### Array.prototype.findIndex()

返回数组中满足测试函数的第一个元素的索引,否则返回-1. 语法`arr.findIndex(callback[, thisArg])`

```javascript
[1, 2, 3].findIndex((element, index, arr) => element > 2); // 2
```

### Array.prototype.forEach()

该方法让数组的每一项都执行给定的函数,语法`arr.forEach(callback[, thisArg])

```javascript
[1, 2, 3].forEach((element, index, array) => {
  console.log(element);
}); // 1 2 3
```

### Array.prototype.includes()

用来判断一个数组是否包含一个指定的值,返回 true 或者 false,语法`arr.includes(searchElement[, fromIndex])

```javascript
[1, 2, 3].includes(2); // true
[1, 2, 3].includes(2, 2); // false
[1, 2, 3].includes(4); // false
```

### Array.prototype.indexOf()

该方法返回给定元素在数组中能找到的第一个索引值,否则返回-1,语法`arr.indexOf(searchElement[, fromIndex=0])`

```javascript
[1, 2, 3].indexOf(2); // 1
[1, 2, 3].indexOf(2, 2); // -1
```

#### Array.prototype.lastIndexOf()

返回指定元素在数组中的最后一个索引,不存在则返回-1,从数组的后面向前面查找,语法`arr.lastIndexOf(searchElement[, fromIndex=arr.length-1])`

```javascript
[1, 2, 3, 2, 5].lastIndexOf(2); // 3
[1, 2, 3, 2, 5].lastIndexOf(2, 4); // 3
[1, 2, 3, 2, 5].lastIndexOf(2, 3); // 3
[1, 2, 3, 2, 5].lastIndexOf(2, 2); // 1
```

### Array.prototype.join()

该方法将数组中的所有元素连接成一个字符串,语法`arr.join([separator=','])`

```javascript
['a', 'b', 'c'].join(); // "a,b,c"
['a', 'b', 'c'].join('-'); // "a-b-c"
```

### Array.prototype.keys()

返回一个新的 Array 迭代器,包含数组中的每个索引的键,语法`arr.keys()`,可以用 for...of 来遍历结果

```javascript
let iterator = [1, 2, 3].keys();
iterator.next().value; // 0
iterator.next().value; // 1
iterator.next().value; // 2
iterator.next().value; // undefined
```

### Array.prototype.values()

返回一个新的 Array 迭代器,该对象包含了数组每个索引的值,语法`arr.values()`,可以用 for...of 来遍历结果

```javascript
var iterator = [1, 2, 3].values();
iterator.next().value; // 1
iterator.next().value; // 2
iterator.next().value; // 3
iterator.next().value; // undefined
```

### Array.prototype.entries()

返回一个新的 Array Iterator 对象,该对象包含数组中每个索引的键值对,语法`arr.entries()`,可以用 for...of 来遍历结果

```javascript
let iterator = ['a', 'b', 'c'].entries();
iterator.next().value; // [0, "a"]
iterator.next().value; // [0, "b"]
```

#### Array.prototype.pop()

删除一个数组中的最后的一个元素，并且返回这个元素,语法`arr.pop()`

```javascript
let arr = [1, 2, 3];
arr.pop(); // 3
arr; // [1,2]
```

#### Array.prototype.push()

添加一个或多个元素到数组的末尾，并返回数组新的长度(length 属性值),语法,`arr.push(element1[, ...[, elementN]])`

```javascript
let arr = [1, 2, 3];
arr.push(4); // 4
arr; // [1, 2, 3, 4]
```

#### Array.prototype.shift()

删除数组的第一个元素,并返回这个元素,该方法会改变数组的长度,语法`arr.shift()`

```javascript
let arr = [1, 2, 3];
arr.shift(); // 1
arr; // [2,3]
```

#### Array.prototype.unshift()

数组的开头添加一个或者多个元素,并返回数组新的 length 值,语法`arr.unshift(element1[, ...[, elementN]])

```javascript
let arr = [3, 4, 5];
arr.unshift(2); // 4
arr; // [2,3,4,5]
arr.unshift(0, 1); // 6
arr; // [0, 1, 2, 3, 4, 5]
```

### Array.prototype.sort()

对数组的元素做原地的排序,并返回这个数组,语法`arr.sort([compareFunction])`

```javascript
[1, 2, 3].sort(); // [1,2,3]
['a', 'b', 'c'].sort(); // ["a", "b", "c"]
```

### Array.prototype.slice()

把数组中的一部分复制存入一个新的数组中,并返回新的数组,语法`arr.slice([begin[, end]])`

- slice 方法可以接受一个或者两个参数，即要返回项的起始位置和结束位置
- 在只有一个参数的时候，slice 方法返回的是从该参数指定位置到数组末尾的所有项
- 如果有两个参数，会返回起始跟结束位置之间的项--不包括结束位置项
- slice 方法不会影响原来数组

```javascript
[1, 2, 3].slice(); // [1, 2, 3]
[1, 2, 3].slice(0, 0); // []
[1, 2, 3].slice(0, 1); // [1]
[1, 2, 3].slice(1, 2); // [2]
```

### Array.prototype.splice()

用新元素替换旧元素,以此修改数组的内容,语法`arr.splice(start,deleteCount[, item1[,...[, itemN]]])`

```javascript
// 参数: start从数组的哪一位开始修改
// 参数: deleteCount删除的个数,为0表示不删除,这种情况下至少添加一个元素
// 参数: itemN要添加的元素,如果不指定,则为删除
// 返回值: 由被删除的元素组成的一个数组
let arr1 = [1, 2, 3];
arr1.splice(0, 1); // [1]
arr1; // [2, 3]

let arr2 = [1, 2, 3];
arr2.splice(0, 0, 0); // []
arr2; // [0, 1, 2, 3]
```

### Array.prototype.toString()

返回数组的字符串表示形式,语法`arr.toString()`

```javascript
[1, 2, 3].toString(); // "1,2,3"
```

### Array.prototype.toLocaleString()

返回特定于语言的数组字符串表示形式,语法`arr.toLocaleString([locales[, options]])`

```javascript
[1, 'a', new Date()].toLocaleString(); // "1,a,7/29/2018, 10:13:51 PM"
```

### `Array.prototype[@@iterator]()`

数组的 iterator 方法,默认情况下与`values()`返回值一样

```javascript
let iterator = [1, 2, 3][Symbol.iterator]();
iterator.next().value; // 1
iterator.next().value; // 2
iterator.next().value; // 3
iterator.next().value; // undefined
```

### Array.prototype.toSource()

返回一个字符串,表示该数组的源代码,语法`arr.toSource()`,经常用来调试代码,很多浏览器不支持

### get Array[@@species]

TODO
