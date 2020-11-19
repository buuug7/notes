# Map

Map 对象保存键值对，并且能够记住键的原始插入顺序。任何值(对象或者原始值) 都可以作为一个键或一个值。

## 键的相等(Key equality)

- 键的比较是基于 sameValueZero 算法：
- NaN 是与 NaN 相等的（虽然 NaN !== NaN），剩下所有其它的值是根据 === 运算符的结果判断是否相等。
- 在目前的 ECMAScript 规范中，-0 和+0 被认为是相等的，尽管这在早期的草案中并不是这样。

## 基本用法

```javascript
const myMap = new Map();

// 设置Map对象中键的值。返回该Map对象
myMap.set("name", "string as key");
myMap.set({}, "some object as key");
myMap.set(NaN, "NaN as key");

// size: 3
myMap.size;

// 返回键对应的值，如果不存在，则返回undefined。
// string as key
myMap.get("name");

// 返回一个布尔值，表示Map实例是否包含键对应的值。
// true
myMap.has("name");

// 移除Map对象的所有键/值对 。
myMap.clear();

// 如果 Map 对象中存在该元素，则移除它并返回 true；否则如果该元素不存在则返回 false。
myMap.delete("name");

// for..of 迭代 Map
for (let [key, value] of myMap) {
  console.log(`key=${key},value=${value}`);
}

// 返回一个新的 Iterator对象， 它按插入顺序包含了Map对象中每个元素的键 。
myMap.keys();

// 返回一个新的Iterator对象，它按插入顺序包含了Map对象中每个元素的值 。
myMap.values();

// 返回一个新的 Iterator 对象，它按插入顺序包含了Map对象中每个元素的 [key, value] 数组。
myMap.entries();

// Map也可以通过forEach()方法迭代
myMap.forEach((value, key) => {
  console.log(key + " = " + value);
});
```

## Map 与数组的关系

```javascript
const arr = [
  ["name", "fuck"],
  ["age", 22],
];

// 将一个二维键值对数组转换成一个Map对象
const myMap = new Map(arr);

// 使用Array.from函数可以将一个Map对象转换成一个二维键值对数组
// [ [ 'name', 'fuck' ], [ 'age', 22 ] ]
const arr2 = Array.from(myMap);

// 更简洁的方法来做如上同样的事情，使用展开运算符
// [ [ 'name', 'fuck' ], [ 'age', 22 ] ]
console.log([...myMap]);
```

## 复制合并 Map

```javascript
const first = new Map([
  ["name", "twice"],
  ["age", 22],
]);
const second = new Map([["name", "twice2"]]);

// 复制 Map
const firstClone = new Map(first);

// 合并
// Map(2) { 'name' => 'twice2', 'age' => 22 }
const merged = new Map([...first, ...second]);
```
