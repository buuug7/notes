# javascript 数组大全

## 创建数组

```javascript
let arr = new Array(); // 创建一个数组
let arr2 = new Array(1, 2, 3); // 创建一个数组并赋值
let arr3 = []; // 字面量创建数组
let arr4 = Array.of('a', 'b', 'c'); // 将一组值转换为数组
```

#### Array.from()

将伪数组变成数组，只要有 length 的属性就可以转成为数组

```javascript
let name = 'alex';
let arr = Array.from(name); // [ 'a', 'l', 'e', 'x' ]
```

#### Array.of()

将一组值转换成数组，类似于声明数组

```javascript
let arr = Array.of(1, 2, 3); // [ 1, 2, 3 ]
```

## 栈方法

#### push()

可以接受任意数量的参数，把他们逐个添加到数组末端，并返回修改后数组长度

```javascript
let arr = [1, 2];
arr.push(3, 4); // [ 1, 2, 3, 4 ]
```

#### pop()

从数组末端移除最后一项，减少数组的 length 值，然后返回移除项

```javascript
let arr = [1, 2];
arr.pop(); // 2
```

## 队列方法

#### shift()

移除数组中第一个项并返回该项，同时数组的长度减一

```javascript
let arr = [1, 2];
arr.shift(); // 1
```

#### unshift()

在数组前端添加任意个项并返回新数组的长度

```javascript
let arr = [3, 4];
arr.unshift(1, 2); // 4
```

## 排序方法

## reverse()

反转数组项的顺序

```javascript
let arr = [1, 2];
arr.reverse(); // [2, 1]
```

## sort()

从小到大排序，但它的排序方法是根据数组转换字符串来排序的

```javascript
let arr = [1, 3, 2, 5, 4];
arr.sort(); // [ 1, 2, 3, 4, 5 ]

// 指定排序函数
arr.sort((a, b) => {
  if (a > b) {
    return 1;
  } else if (a < b) {
    return -1;
  } else {
    return 0;
  }
});
```

## 操作方法

#### concat()

基于当前数组中的所有项创建一个新数组，不会影响原来数组的值

```javascript
let arr = [1, 2];
arr.concat([3, 4]); // [ 1, 2, 3, 4 ]
```

#### slice()

基于当前数组中的一个或者多个项创建一个新数组

- slice 方法可以接受一个或者两个参数，即要返回项的起始位置和结束位置
- 在只有一个参数的时候，slice 方法返回的是从该参数指定位置到数组末尾的所有项
- 如果有两个参数，会返回起始跟结束位置之间的项--不包括结束位置项
- slice 方法不会影响原来数组

```javascript
let arr = [1, 2, 3, 4];
arr.slice(0, 1); // [ 1 ]
arr.slice(1); // [ 2, 3, 4 ]
arr.slice(1, 3); // [ 2, 3 ]
```

#### splice()

###### 删除

可以删除任意数量的项，只需要指定 2 个参数：要删除的第一项位置和要删除的项数。返回删除项。

```javascript
let arr = [1, 2, 3, 4];
arr.splice(0, 1); // [ 1 ]
```

###### 插入

可以向指定位置插入任意数量的项，只需要提供三个参数：起始位置，0（要删除的项数）和要插入的项。如果要插入多个项，可以再传入第四，第五，以至任意多个项。

```javascript
let arr = [1, 2, 3, 4];
arr.splice(1, 0, 9, 8, 7); // []
console.log(arr); // [ 1, 9, 8, 7, 2, 3, 4 ]
```

###### 替换

可以向指定位置插入任意数量的项，且同时删除任意数量的项，只需要指定三个参数：起始位置，要删除的项数和要插入的任意数量的项数。插入的项数不必跟删除的项数相等。

```javascript
let arr = [1, 2, 3, 4];
arr.splice(1, 3, 9, 8, 7); // [ 2, 3, 4 ]
console.log(arr); // [ 1, 9, 8, 7 ]
```

#### arr.fill(target, start, end)

使用给定的值，填充一个数组，填充后会改变原数组

- target 待填充的元素
- start 开始填充的位置-索引
- end 终止填充的位置-索引（不包括该位置）

```javascript
let arr = [1, 2, 3, 4];
arr.fill(99, 1, 3); // [ 1, 99, 99, 4 ]
arr.fill(100); // [ 100, 100, 100, 100 ]
```

#### Array.isArray(arr)

判断传入的值是否为数组

```javascript
Array.isArray({}); // false
Array.isArray([]); // true
```

#### copyWithin(target, start, end)

在当前数组内部，将指定位置的数组复制到其他位置，会覆盖原数组项，返回当前数组

- target，必选，索引从该位置开始替换数组项
- start，可选，索引从该位置开始读取数组项，默认为 0，如果为负值，则从右往左读
- end，可选，索引到该位置停止读取的数组项，默认是数组长度，如果负值，表示倒数

```javascript
let arr = [1, 2, 3, 4];
arr.copyWithin(2, 0, 4); // [1, 2, 1, 2]
arr.copyWithin(2, 1, 2); // [1, 2, 2, 4]
```

#### indexOf, lastIndexOf

两个方法都接受两个参数，要查找的项和表示查找起点位置的索引，indexOf 从数组开头开始查找，lastIndexOf 从数组末尾开始查找

```javascript
let arr = [1, 2, 3, 4, 3];
arr.indexOf(3); // 2
arr.lastIndexOf(3); // 4
```

#### find()

数组实例的 find 方法，用于找出第一个符合条件的数组成员，参数是一个回调函数，所有的数组成员依次执行该回调函数，知道找出第一个返回 true 的成员，然后返回该成员，如果没有符合条件的成员，则返回 undefined

```javascript
let arr = [1, 2, 3, 4, 3];
arr.find(item => item === 3); // 3
```

#### findIndex()

与 find 方法类似，只是返回成员的位置索引，如果都不符合条件，则返回-1

```javascript
let arr = [1, 2, 3, 4, 3];
arr.findIndex(item => item === 3); // 2
```

#### includes()

返回布尔值，表示某个数组是否包含给定的值，与字符串的 includes 方法类似

```javascript
let arr = [1, 2, 3, 4];
arr.includes(3); // true
```

## 迭代方法

#### every()

对数组的每一项运行给定的函数，如果该函数对每一项都返回 true，则返回 true。

```javascript
let arr = [1, 2, 3, 4];
arr.every(item => item > 0); // true
arr.every(item => item > 2); // false
```

#### filter()

对数组中的每一项运行给定的函数，返回该函数会返回 true 的项组成的数组

```javascript
let arr = [1, 2, 3, 4];
arr.filter(item => item > 2); // [ 3, 4 ]
```

#### forEach()

对数组中的每一项运行给定的函数，该方法没有返回值

```javascript
[1, 2, 3].forEach(item => console.log(item));
```

#### map()

对数组中的每一项运行给定函数，返回该函数运行结果组成的数组

```javascript
[1, 2, 3].map(item => item * 2); // [ 2, 4, 6 ]
```

#### some()

对数组中的每一项运行给定函数，如果该函数对任意一项返回 true，则返回 true

```javascript
[1, 2, 3].some(item => item > 2); // true
```

#### reduce, reduceRight

两个方法都会迭代数组的所有项，然后构建一个最终返回值。其中，reduce 方法从数组的第一项开始，逐个开始遍历到最后，而 reduceRight 则从最后一项开始，项前遍历到第一项。

```javascript
[1, 2, 3].reduce((pre, current) => {
  return pre + current;
}); // 6
```

#### entries(), keys(), values()

都会返回一个遍历器对象，可以用 for...of 循环进行遍历，唯一的区别是 keys 是对键名的遍历，values 是对键值的遍历，entries 是对键值对的遍历。

```javascript
let arr = [1, 2, 3];

for (let val of arr.entries()) {
  console.log(val);
}
// [ 0, 1 ]
// [ 1, 2 ]
// [ 2, 3 ]
// [ 3, 4 ]

for (let val of arr.keys()) {
  console.log(val);
}
// 0
// 1
// 2
// 3
```
