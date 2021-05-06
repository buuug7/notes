# ES6 新特性和一些陌生的知识

## 集合 Set

集合 Set 对象允许你存储任意类型的唯一值(不能重复),无论它是原始值或者是对象引用.

```javascript
// 参数iterable 一个可迭代对象，其中的所有元素都会被加入到 Set 中。null被视作 undefined 。
new Set([iterable]);

// 实例
const mySet = new Set();
mySet.add(1);
mySet.add(2);
mySet.add(3);
mySet.add("buuug7");

console.log(mySet); // Set { 1,2,3,'buuug7' }
console.log(mySet.has(5)); //false
console.log(mySet.size); // 3
console.log(mySet.delete(2)); // true
console.log(mySet.delete(88)); // false

console.log("..............................");
// 迭代set
for (let item of mySet.keys()) {
  console.log(item);
}

// 与 Array互换
const arr = [...mySet];
console.log(arr); // [ 1, 3, 'buuug7' ]
```

## Map 集合

Map 对象就是简单的键值映射,其中键和值可以是任意值(对象或者原始值)  
Map 对象会按元素插入的顺序遍历— for...of 循环每次遍历都会返回一个 [key, value] 数组。

```javascript
// Iterable 可以是一个数组或者其他 iterable 对象，其元素或为键值对，或为两个元素的数组。
// 每个键值对都会添加到新的 Map。null 会被当做 undefined。
new Map([iterable]);
```

Objects 和 maps 的比较  
Object 和 Map 类似的一点是,它们都允许你按键存取一个值,都可以删除键,还可以检测一个键是否绑定了值.因此,一直以来,我们都把对象当成 Map 来使用,不过,现在有了 Map,下面的区别解释了为什么使用 Map 更好点.

- 一个对象通常都有自己的原型,所以一个对象总有一个"prototype"键。不过，从 ES5 开始可以使用 map = Object.create(null)来创建一个没有原型的对象。
- 一个对象的键只能是字符串或者 Symbols，但一个 Map 的键可以是任意值。
- 你可以通过 size 属性很容易地得到一个 Map 的键值对个数，而对象的键值对个数只能手动确认。

```javascript
// 示例
const myMap = new Map();
const keyObj = {},
  keyFun = function () {},
  keyString = "a string";

myMap.set(keyObj, "some value related to keyObj");
myMap.set(keyFun, "some value related to KeyFun");
myMap.set(keyString, "some value related to keyString");

console.log(myMap.size); // 3
console.log(myMap.get(keyObj)); // some value related to keyObj
console.log(myMap.get(keyFun)); // some value related to KeyFun
console.log(myMap.get(keyString)); // some value related to keyString
console.log(myMap.get("a string")); // some value related to keyString

console.log(myMap.get({})); // undefined , 因为keyObj !== {}
console.log(myMap.get(function () {})); // undefined ,因为keyFunc !== function () {}

// 用for...of 方法迭代
for (let item of myMap) {
  console.log(item);
}

for (let item of myMap.keys()) {
  console.log(item);
}

for (let item of myMap.values()) {
  console.log(item);
}

for (let [k, v] of myMap.entries()) {
  console.log(k + "<==>" + v);
}

// 用forEach()方法迭代
myMap.forEach((v, k) => console.log(k + "<==>" + v));

// 与数组的关系
const arr = [
  ["k1", "v1"],
  ["k2", "v2"],
  ["k3", "v3"],
];
// 二位数组转换成Map
const arrToMap = new Map(arr);
console.log(arrToMap); //Map { 'k1' => 'v1', 'k2' => 'v2', 'k3' => 'v3' }
// Map转换成二维数组
const mapToArr = [...arrToMap];
console.log(mapToArr); // [ [ 'k1', 'v1' ], [ 'k2', 'v2' ], [ 'k3', 'v3' ] ]
```

#### TypedArray

一个 TypedArray 对象描述一个表示底层的二进制数据缓存区的类似数组(array-like)视图.没有名为 TypedArray 的全局属性,也没有直接可见的 TypedArray 构造函数.

```javascript
new TypedArray(length);
new TypedArray(typedArray);
new TypedArray(object);
new TypedArray(buffer [, byteOffset [, length]]);

以下皆是 TypedArray() :

Int8Array();
Uint8Array();
Uint8ClampedArray();
Int16Array();
Uint16Array();
Int32Array();
Uint32Array();
Float32Array();
Float64Array();
```

参数:

- length :当传入 length 参数时,一个内部数组缓冲区被创建,该缓存区的大小是传入的 length 乘以数组中每个元素的字节数,每个元素的值都为 0.(译者注:每个元素的字节数是由具体的构造函数决定的,比如 Int16Array 的每个元素的字节数为 2,Int32Array 的每个元素的字节数为 4)
- typedArray :当传入一个包含任意类型元素的任意类型化数组对象(typedArray) (比如 Int32Array)作为参数时,typeArray 被复制到一个新的类型数组。typeArray 中的每个值会在复制到新的数组之前根据构造器进行转化.新的生成的类型化数组对象将会有跟传入的数组相同的 length(译者注:比如原来的 typeArray.length==2,那么新生成的数组的 length 也是 2,只是数组中的每一项进行了转化)
- object :当传入一个 object 作为参数时，如同通过 TypedArray.from() 方法一样创建一个新的类型数组。
- buffer, byteOffset, length :当传入 arrayBuffer 和可选参数 byteOffset,可选参数 length 时,一个新的类型化数组视图将会被创建,该类型化数组视图用于呈现传入的 ArrayBuffer 实例。byteOffset 和 length 指定类型化数组视图暴露的内存范围,如果两者都未传入,那么整个 buffer 都会被呈现,如果仅仅忽略 length,那么 buffer 中偏移(byteOffset)后剩下的 buffer 将会被呈现.

```javascript
// 属性访问
const int16 = new Int16Array(3);
int16[0] = 2;
int16[1] = 54;
console.log(int16); // Int16Array [ 2, 54, 0 ]
console.log(int16[1]); // 54

// 用 for...of来遍历TypedArray
for (let item of int16) {
  console.log(item);
}
```

#### const, let

const 声明创建一个只读的常量。这不意味着常量指向的值不可变，而是变量标识符的值只能赋值一次。(译者注：JavaScript 中的常量和 Java，C++中的常量一个意思。注意区分常量的值和常量指向的值的不同)

```javascript
const name1 = value1 [,name2 = value2 [,...[,nameN = valueN]]];
```

let 语句声明一个块级作用域的本地变量，并且可选的赋予初始值。  
let 允许你声明一个作用域被限制在块级中的变量、语句或者表达式。与 var 关键字不同的是，var 声明的变量只能是全局或者整个函数块的。

```javascript
let var1 [= value1] [, var2 [= value2]] [, ..., varN [= valueN]];
```

#### 默认参数(default parameter)

如果一个形参没有被传入对应的实参或者传入了 undefined，则该形参会被赋予一个默认值

```javascript
function f(a, b = 1) {
  return a * b;
}
f(5); // 1
f(5, 2); // 10
```

#### 剩余参数(rest parameter)

允许长度不确定的实参表示为一个数组,如果一个函数的最后一个形参是以 ... 为前缀的，则在函数被调用时,该形参会成为一个数组,数组中的元素都是传递给该函数的多出来的实参的值。

```javascript
function f(a, b, ...args) {
  return args;
}

f(1, 2); // []
f(1, 2, 3, 4, 5); // [3,4,5]
```

#### 展开操作符(spread operator)

扩展语法允许在需要多个参数（用于函数调用）或多个元素（用于数组文本）或多个变量（用于解构分配）的位置扩展表达式。

```javascript
// 用于函数
myFunction(...iterableOjb);
// 用于数组字面量
[...iterableObj, 4, 5, 6];

// 例子
function myFunction(x, y, z) {}
var args = [0, 1, 2];
myFunction(...args);
```

#### 解析赋值 (destructuring assignment)

解构赋值（destructuring assignment）语法是一个 Javascript 表达式，它使得从数组或者对象中提取数据赋值给不同的变量成为可能。

```javascript
var a, b, rest;
[a, b] = [1, 2];
console.log(a); // 1
console.log(b); // 2

[a, b, ...rest] = [1, 2, 3, 4, 5, 6];
console.log(a); // 1
console.log(b); // 2
console.log(rest); // [3,4,5,6]

({ a, b } = { a: 1, b: 2 });
console.log(a); // 1
console.log(b); // 2
```

#### `function*` 声明

`function*`声明定义一个 generator(生成器)函数，返回一个 generator 对象,生成器是一种可以从中退出并在之后重新进入的函数，生成器的环境会在每次执行后被保存，下次进入时可以继续使用。

调用一个生成器函数并不马上执行它的主体，而是返回一个这个生成器函数的迭代器(iterator)对象，当这个迭代器的 next()方法被调用时,生成器函数的主体会被执行直至第一个 yield 表达式.该表达式定义了迭代器返回的值，或者，被 yield\*委派至另一个生成器函数。next()方法返回一个对象，该对象有一个 value 属性，表示产出的值，和一个 done 属性，表示生成器是否已经产出了它最后的值。

```javascript
function* idMaker() {
  var index = 0;
  while (index < 3) {
    yield index++;
  }
}
var gen = idMaker();
console.log(gen.next().value); // 0
console.log(gen.next().value); // 1
console.log(gen.next().value); // 2
console.log(gen.next().value); // undefined
```

#### yield

yield 关键字用来暂停和继续一个生成器函数(function\*),yield 关键字使生成器函数暂停执行，并返回跟在它后面的表达式的当前值. 可以把它想成是 return 关键字的一个基于生成器的版本.

```javascript
function* foo() {
  var index = 0;
  while (index < 3) {
    yield index++;
  }
}
var iterator = foo();
console.log(iterator.next()); // { value:0, done:false }
console.log(iterator.next()); // { value:1, done:false }
console.log(iterator.next()); // { value:2, done:false }
console.log(iterator.next()); // { value:undefined, done:true }
```

#### 箭头函数

箭头函数就是简写形式的函数表达式,并且它拥有词法作用域的 this 值(即不会产生自己作用域下的 this,arguments,super...),箭头函数总是匿名的.

```javascript
(param1,param2,...,paramN) => { statements }
(param1,param2,...,paramN) => expression
// 如果只有一个参数,圆括号是可选的
(singleParam) => { statements }
singleParam => { statements }
// 无参数的函数
() => { statements }

// 返回对象字面量时应当用圆括号括起来
param => ({ foo:bar })
```

#### class 类

是 es2015 中引入的基于原型的继承的语法糖.并不是 javascript 里加入新的面向对象的继承模型.javascript 中的类知识能让我们用更加简洁明了的语法创建对象以及处理相关继承.

```javascript
// 定义方式: 类声明,类表达式
// 类声明,类声明不存在变量提升,必须先声明后使用
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}

// 类表达式是定义类的另一种方式,在类表达式中,类名是可有可无
// 匿名
var Person = class {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
};

// 命名的
var Person = class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
};

// 原型方法
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  get info() {
    console.log(`Person Info: name(${this.name}) age(${this.age})`);
  }

  walk() {
    console.log("i am walking");
  }
}
const p = new Person("b7", 22);
p.info; // The Info: name(b7) age(22)

// 静态方法
// static 关键字用来定义类的静态方法。静态方法是指那些不需要对类进行实例化，使用类名就可以直接访问的方法，
// 需要注意的是静态方法不能被实例化的对象调用。静态方法经常用来作为工具函数。
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  get info() {
    console.log(`Person Info: name(${this.name}) age(${this.age})`);
  }

  walk() {
    console.log("i am walking");
  }

  static sleep() {
    console.log(`i am sleeping`);
  }
}
Person.sleep(); // i am sleeping

// extends 关键字可以用在类声明或者类表达式中来创建一个继承了某个类的子类。
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  get info() {
    console.log(`Person Info: name(${this.name}) age(${this.age})`);
  }

  walk() {
    console.log("i am walking");
  }
}

class Child extends Person {
  walk() {
    console.log("child walking");
  }
}

const c = new Child("bob", "8");
c.walk();

// super 关键字可以用来调用其父类的构造器或者类方法
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  get info() {
    console.log(`Person Info: name(${this.name}) age(${this.age})`);
  }

  walk() {
    console.log("i am walking");
  }
}

class Child extends Person {
  walk() {
    super.walk();
    console.log("child walking");
  }
}

const c = new Child("bob", "8");
c.walk();
```

#### 对象字面量 object literals

对象字面量时封闭在花括号对({})中的一个对象的零个或者多个"属性名--值"对的列表,

```javascript
var car = {
  name: "jeep",
  color: "red",
  move: function () {
    console.log(`${this.name} moving`);
  },
};
car.move(); // jeep moving

// ES2015 增强的对象字面量
var obj = {
  // __proto__
  __proto__: theProtoObj,
  // Shorthand for ‘handler: handler’
  handler,
  // Methods
  toString() {
    // Super calls
    return "d " + super.toString();
  },
  // Computed (dynamic) property names
  ["prop_" + (() => 42)()]: 42,
};
```

#### 模板字面量(Template literals)

模板字面量(Template literals)是允许嵌入表达式的字符串字面量。并且支持多行字符串和字符串插补特性。在 ES2015 / ES6 规范中，其被称之为模板字符串(template strings)。 模板字符串使用反引号 (````) 来代替普通字符串中的用双引号和单引号。模板字符串可以包含特定语法`${expression}`的占位符。

```javascript
`string text``string text line 1
 string text line 2``string text ${expression} string text`;
```

#### for...of 语句

for...of 语句在可迭代对象(包括 Array,Map,Set,String,TypedArray,arguments 对象等等)上创建一个迭代循环,对每个不同属性值,调用一个自定义的有执行语句的迭代挂钩.

```javascript
for (variable of object) {
  statement;
}
```

for...of 可以遍历:

- Array
- String
- TypedArray
- Map
- Set
- 遍历 DOM 集合,遍历 Dom 元素集合,比如一个 NodeList 对象: 下面的例子演示给每一个 article 标签的 p 子标签添加一个 "read" class.

```javascript
let articleParagraphs = document.querySelectorAll("article > p");

for (let paragraph of articleParagraphs) {
  paragraph.classList.add("read");
}
```

- 遍历生成器

```javascript
// 注意: Firefox目前还不支持 "function*".
// 删除该*号可以让下面的代码在Firefox 13中正常运行.

function* fibonacci() {
  // 一个生成器函数
  let [prev, curr] = [0, 1];
  for (;;) {
    [prev, curr] = [curr, prev + curr];
    yield curr;
  }
}

for (let n of fibonacci()) {
  // 当n大于1000时跳出循环
  if (n > 1000) break;
  console.log(n);
}
```

- 遍历另外的可遍历对象,您也可以遍历一个已经明确的可遍历（可迭代）协议

```javascript
var iterable = {
  [Symbol.iterator]() {
    return {
      i: 0,
      next() {
        if (this.i < 3) {
          return { value: this.i++, done: false };
        }
        return { value: undefined, done: true };
      },
    };
  },
};

for (var value of iterable) {
  console.log(value);
}
// 0
// 1
// 2
```

for...of 与 for...in 的区别
for...in 循环会遍历一个 Object 所有的可枚举属性  
for...of 语法是为各种 Collection 对象专门定制的,并不适用于 object,它会以这种方式迭代出任何拥有[Symbol.iterator] 属性的 collection 对象的每个元素。

```javascript
// for...in 遍历每一个属性名称,而 for...of遍历每一个属性值

Object.prototype.objCustom = function () {};
Array.prototype.arrCustom = function () {};

let iterable = [3, 5, 7];
iterable.foo = "hello";

for (let i in iterable) {
  console.log(i); // logs 0, 1, 2, "foo", "arrCustom", "objCustom"
}

for (let i of iterable) {
  console.log(i); // logs 3, 5, 7
}
```

#### import

import 语句用于导入从外部模块，另一个脚本等导出的函数，对象或原语。

```javascript
import defaultMember from "module-name";
import * as name from "module-name";
import { member } from "module-name";
import { member as alias } from "module-name";
import { member1 , member2 } from "module-name";
import { member1 , member2 as alias2 , [...] } from "module-name";
import defaultMember, { member [ , [...] ] } from "module-name";
import defaultMember, * as name from "module-name";
import "module-name";


//name 参数是将引用导出成员的名称。member参数指定独立成员，而name参数导入所有成员。如果模块导出单个默认参数，而不是一系列成员，name也可以是函数。
//下面提供一些示例说明语法。

//导入整个模块的内容。以下代码将myModule添加到当前作用域，其中包括所有导出绑定。
import  * as myModule from "my-module";

//导入模块的单个成员。以下代码将myMember添加到当前作用域。
import {myMember} from "my-module";

//导入模块的多个成员。以下代码会将foo和bar都添加到当前作用域。
import {foo, bar} from "my-module";

//导入整个模块的内容，其中一些被显式命名。
//以下代码将myModule，foo，bar插入到当前作用域。注意，foo和myModule.foo是完全相同的，bar和myModule.bar也是如此。
import MyModule, {foo, bar} from "my-module";

//导入成员并指定一个方便的别名。以下代码将shortName添加到当前作用域。
import {reallyReallyLongModuleMemberName as shortName} from "my-module";

//导入整个模块 使用模块副作用，不导入任何绑定。
import "my-module";

//使用别名导入模块的多个成员。
import {reallyReallyLongModuleMemberName as shortName, anotherLongModuleName as short} from "my-module";
```

#### export

export 语句用于从给定的文件 (或模块) 中导出函数，对象或原语。

```javascript
export { name1, name2, …, nameN };
export { variable1 as name1, variable2 as name2, …, nameN };
export let name1, name2, …, nameN; // also var
export let name1 = …, name2 = …, …, nameN; // also var, const

export default expression;
export default function (…) { … } // also class, function*
export default function name1(…) { … } // also class, function*
export { name1 as default, … };

export * from …;
export { name1, name2, …, nameN } from …;
export { import1 as name1, import2 as name2, …, nameN } from …;


//有两种不同的导出方式，每种方式对应于上述的一种语法：
//命名导出：
export { myFunction }; // 导出一个函数声明
export const foo = Math.sqrt(2); // 导出一个常量
//默认导出 (每个脚本只能有一个)：
export default myFunctionOrClass // 或者 'export default class {}'
// 这里没有分号
// 对于只导出一部分值来说，命名导出的方式很有用。在导入时候，可以使用相同的名称来引用对应导出的值。
//关于默认导出方式，每个模块只有一个默认导出。一个默认导出可以是一个函数，一个类，一个对象等。
//当最简单导入的时候，这个值是将被认为是”入口”导出值。


// 示例
//命名导出
//在这个模块里，我们可以这么导出：
// module "my-module.js"
export function cube(x) {
  return x * x * x;
}
const foo = Math.PI + Math.SQRT2;
export { foo };

//这样的话，在其它脚本 (cf. import)，我们可以这样使用：
import { cube, foo } from 'my-module.js';
console.log(cube(3)); // 27
console.log(foo);    // 4.555806215962888

// 默认导出
//如果我们只想导出一个简单的值或者想在模块中保留一个候选值，就可以使用默认导出：
// module "my-module.js"
export default function cube(x) {
  return x * x * x;
}
//然后，在另一个脚本中，默认的导出值就可以被简单直接的导入：
// module "my-module.js"
import cube from 'my-module';
console.log(cube(3)); // 27​​​​​
```
