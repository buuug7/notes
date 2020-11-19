# Set

Set 对象是值的集合，你可以按照插入的顺序迭代它的元素。 Set 中的元素只会出现一次，即 Set 中的元素是唯一的。

## 值的相等

因为 Set 中的值总是唯一的，所以需要判断两个值是否相等。+0 和-0 是相等的。另外，NaN 和 undefined 都可以被存储在 Set 中， NaN 之间被视为相同的值（NaN 被认为是相同的，尽管 NaN !== NaN）。

```javascript
const mySet = new Set();

// 在Set对象尾部添加一个元素。返回该Set对象。
mySet.add(1);
mySet.add(2);
mySet.add(3);

// 返回 Set 对象中的值的个数
mySet.size;

// 移除Set对象内的所有元素
mySet.clear();

// 移除Set中与这个值相等的元素，返回Set.prototype.has(value)在这个操作前会返回的值
mySet.delete(3);

// 返回一个布尔值，表示该值在Set中存在与否。
mySet.has(2);

// 与 keys()方法相同，返回一个新的迭代器对象，该对象包含Set对象中的按插入顺序排列的所有元素的值。
mySet.keys();
// 与 values()方法相同
mySet.values();

// 返回一个新的迭代器对象，该对象包含Set对象中的按插入顺序排列的所有元素的值的[value, value]数组。
// 为了使这个方法和Map对象保持相似， 每个值的键和值相等。
// [Set Entries] { [ 1, 1 ], [ 2, 2 ], [ 3, 3 ] }
mySet.entries();

// 迭代
for (let item of mySet) {
  console.log(item);
}

// forEach迭代
// 按照插入顺序，为Set对象中的每一个值调用一次callBackFn。
// 如果提供了thisArg参数，回调中的this会是这个参数。
mySet.forEach((value, value2) => {
  console.log(`value=${value}, value2=${value2}`);
});
```

## 与 Array 互相操作

```javascript
const arr = ["v1", "v2", "v3"];
// Array 转换为 Set
const mySet = new Set(arr);

// Set 转换为 Array
console.log([...mySet]);
```

## Array 去重

```javascript
const arr = [1, 1, 2, 3, 3, 5];
// [ 1, 2, 3, 5 ]
const arrNoRepeat = [...new Set(arr)];
```

## 与 String 相关

```javascript
const str = "USA";
// Set(3) { 'U', 'S', 'A' }
const setFromStr = new Set(str);
```
