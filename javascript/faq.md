# javascript FAQ

## 变量提升(hoisting)

变量提升（hoisting）是用于解释代码中变量声明行为的术语。使用 var 关键字声明或初始化的变量，会将声明语句“提升”到当前作用域的顶部。 但是，只有声明才会触发提升，赋值语句（如果有的话）将保持原样。函数声明会使函数体提升，但函数表达式（以声明变量的形式书写）只有变量声明会被提升。

## DOM 事件流

dom 事件以流的形式传递，先从最外层元素向最内层元素流过，此过程称为捕获，到达最内层元素后又重新向最外层元素流动，此过程称为冒泡。通过 addEventListener 绑定事件，默认是在冒泡阶段触发事件，如果 useCapture 设置为 true，则事件是在捕获阶段触发。一个事件只会触发一次，要么冒泡阶段，要么捕获阶段。

额外的一些解释：

- 事件冒泡(event bubbling)
- 事件捕获(event capturing)

DOM2 级事件规定事件流包括三个阶段,事件捕获阶段,处于目标阶段和事件冒泡阶段.首先发生的是事件捕获,为截获事件提供了机会,然后是实际目标接收到事件,最后一个阶段是冒泡阶段,可以在这个阶段对事件作出响应.

## === 跟 == 区别

`==`运算符是在进行必要的类型转换后，再比较。`===`运算符不会进行类型转换，所以如果两个值不是相同的类型，会直接返回 false。

## JS 运行机制

JS 执行是单线程的，它是基于事件循环的。事件循环大致分为以下几个步骤:

1. 所有同步任务都在主线程上执行，形成一个执行栈（execution context stack）。
2. 主线程之外，还存在一个"任务队列"（task queue）。只要异步任务有了运行结果，就在"任务队列"之中放置一个事件。
3. 一旦"执行栈"中的所有同步任务执行完毕，系统就会读取"任务队列"，看看里面有哪些事件。那些对应的异步任务，于是结束等待状态，进入执行栈，开始执行。
4. 主线程不断重复上面的第三步。

## 活动对象

变量对象包含了活动对象，活动对象就是作用域链上正在被执行和引用的变量对象。我们从活动对象的名称中也能看出 “执行、运行、激活” 等意味。你可以这样理解，整个代码的运行总有一个起始的对象吧，不管这个起始是变量还是函数，总要有一个称呼，虽然我们把执行环境中的变量和函数的总称叫做变量对象，但这不能反映代码的动态性，为了区别于普通的变量对象，我们创造了活动对象的概念。

## 高阶函数

高阶函数是指至少满足下列条件之一的函数

- 函数可以作为参数被传递
- 函数可以作为返回值输出

## `__proto__`, prototype, constructor

- `__proto__`和 constructor 属性是对象所独有的；
- prototype 属性是函数所独有的，因为函数也是一种对象，所以函数也拥有`__proto__`和 constructor 属性。
- `__proto__`属性的作用就是当访问一个对象的属性时，如果该对象内部不存在这个属性，那么就会去它的`__proto__`属性所指向的那个对象（父对象）里找，一直找，直到`__proto__`属性的终点 null，再往上找就相当于在 null 上取值，会报错。通过`__proto__`属性将对象连接起来的这条链路即我们所谓的原型链。
- prototype 属性的作用就是让该函数所实例化的对象们都可以找到公用的属性和方法，即 f1.`__proto__` === Foo.prototype。
- constructor 属性的含义就是指向该对象的构造函数，所有函数（此时看成对象了）最终的构造函数都指向 Function。

## 创建自定义事件

> [CustomEvent](https://developer.mozilla.org/zh-CN/docs/Web/API/CustomEvent)

```javascript
let customEvent = new CustomEvent("myEvt", {
  detail: { someKey: "some value" },
});

// 捕获事件
document.addEventListener("myEvt", function (e) {
  console.log(e.detail);
});

// 触发时间
document.dispatchEvent(customEvent);
```

## for, forEach, for..in, for..of 区别

在 JavaScript 中有 4 中主要的方式用来遍历数组：

- `for (let i = 0; i < arr.length; ++i)`
- `arr.forEach((v, i) => { /_ ... _/ })`
- `for (let i in arr)`
- `for (const v of arr)`

for 和 for..in 循环结构使您可以访问数组中的索引，而不是实际的元素。而 forEach 和 for..of，您可以访问数组元素本身。

针对非数值属性（Non-Numeric Properties），for..in 会遍历非数值属性，而其他几种遍历则不会。

针对数组中的空元素，for..in 和 forEach 会跳过空元素, 但是 for 和 for..of 不会.

如果你想迭代一个对象的属性，你可以用 for-in 循环（这也是它的本职工作）或内建的 Object.keys()方法。

总结：

通常，for..of 是迭代 JavaScript 中数组的最可靠方法。它比常规的 for 循环更简洁，并且没有 for..in 和 forEach 那样多的边缘情况。 for..of 的主要缺点是您需要做一些额外的工作才能访问索引，并且无法像 forEach 那样进行链接。 forEach 在使用的时候有一些限制(比如在在 forEach 中不能使用 await, yield），但是在许多情况下，它使代码更简洁。

```javascript
// To access the current array index in a for/of loop, you can use the Array#entries() function.
for (const [i, v] of arr.entries()) {
  console.log(i, v); // Prints "0 a", "1 b", "2 c"
}
```

## Node.textContent 属性可以表示一个节点及其后代节点的文本内容

```javascript
var text = element.textContent;
element.textContent = "this is some sample text";

// 给定如下HTML:
// <div id="divA">This is <span>some</span> text</div>

// 获得文本内容:
var text = document.getElementById("divA").textContent;
// |text| is set to "This is some text".

// 设置文本内容:
document.getElementById("divA").textContent = "This is some text";
// divA的HTML现在是这样的:
// <div id="divA">This is some text</div>
```

## 什么是弱类型的

Loose typing means that variables are declared without a type.
弱类型指的是在申明变量的时候不指定变量的类型

```JavaScript
// JavaScript Example(loose typing)
var a = 13; // Number declaration
var b = "thirteen"; // String declaration
```

```java
// Java Example(Strong typing)
int a = 13; // int declaration
string b = "thirteen"; // String declaration
```

## 什么叫纯函数

一个函数的返回结果只依赖于它的参数，并且在执行过程里面没有副作用，我们就把这个函数叫做纯函数。

## 什么叫 shim

shim 垫片的意思，指把一个库引入另一个旧的浏览器，然后用旧的 API 来实现一些新的 API 功能。

## DOM 的操作

```javascript
// DOM查找
let ul = document.querySelector("ul");
let firstChild = document.querySelector("ul li:first-child");

// DOM创建 Element
// element = document.createElement(tagName[, options]);
let newLi = document.createElement("li");
newLi.textContent = "some text";

// DOM 创建 textNode
let textNode = document.createTextNode("some text");
document.body.appendChild(textNode);

// DOM 添加
// element.appendChild(aChild);
ul.appendChild(newLi);

// DOM 替换
// 返回的是被移除的DOM
// replacedNode = parentNode.replaceChild(newChild, oldChild);
let replacedNode = ul.replaceChild(newLi, firstChild);

// DOM 移除
// 移除第二个li
// oldChild = node.removeChild(child);
// or node.removeChild(child);
ul.removeChild(ul.children[1]);

// 插入
// insertedNode = parentNode.insertBefore(newNode, referenceNode);
ul.insertBefore(newLi, ul.lastElementChild);

// dupNode = node.cloneNode([deep]);
// deep=true|false
let cloneUl = ul.cloneNode(true);
document.body.appendChild(cloneUl);
```

## 闭包

理解闭包，首先必须理解变量作用域。JavaScript 有两种作用域：全局作用域和函数作用域。函数内部可以直接读取全局变量。如果出于种种原因，需要得到函数内的局部变量。正常情况下，这是办不到的，只有通过变通方法才能实现。那就是在函数的内部，再定义一个函数。

```javascript
function f1() {
  var n = 999;
  function f2() {
    console.log(n);
  }
  return f2;
}

var result = f1();
result(); // 999
```

闭包就是一个函数能够读取其他函数内部变量的函数。由于在 JavaScript 语言中，只有函数内部的子函数才能读取内部变量，因此可以把闭包简单理解成“定义在一个函数内部的函数”。闭包最大的特点，就是它可以“记住”诞生的环境，比如 f2 记住了它诞生的环境 f1，所以从 f2 可以得到 f1 的内部变量。

闭包的最大用处有两个：

- 一个是可以读取函数内部的变量，另一个就是让这些变量始终保持在内存中，即闭包可以使得它诞生环境一直存在。
- 闭包的另一个用处，是封装对象的私有属性和私有方法。

性能考量：

注意，外层函数每次运行，都会生成一个新的闭包，而这个闭包又会保留外层函数的内部变量，所以内存消耗很大。因此不能滥用闭包，否则会造成性能问题。如果不是因为某些特殊任务而需要闭包, 在没有必要的情况下, 在其它函数中创建函数是不明智的, 因为闭包对脚本性能具有负面影响, 包括处理速度和内存消耗.

## 用闭包模拟私有属性方法

诸如 Java 在内的一些语言支持将方法声明为私有的, 即它们只能被同一个类中的其它方法所调用. 对此, JavaScript 并不提供原生的支持, 但是可以使用闭包模拟私有方法. 私有方法不仅仅有利于限制对代码的访问：还提供了管理全局命名空间的强大能力, 避免非核心的方法污染了代码的公共接口部分.

下面的示例展现了如何使用闭包来定义公共函数, 且其可以访问私有函数和变量. 这个方式也称为 模块模式（module pattern）：

```JavaScript
var makeCounter = function(){
  var privateCounter=0;
  function changeBy(v){
    privateCounter+=v;
  }
  return {
    increment:function(){
      changeBy(1);
    },
    decrement:function(){
      changeBy(-1);
    },
    value:function(){
      return privateCounter;
   }
  };
}

var counter1=makeCounter();
counter1.increment(); // 1
counter1.increment(); // 2
counter1.decrement(); // 1
console.log(counter1.value()); //1

var counter2=makeCounter();
counter2.increment(); // 1
counter2.decrement(); // 0
console.log(counter2.value()); // 0
```

请注意两个计数器是如何维护它们各自的独立性的. 每次调用 makeCounter() 函数期间, 其环境是不同的. 每次调用中, privateCounter 中含有不同的实例. 这种形式的闭包提供了许多通常由面向对象编程所享有的益处, 尤其是数据隐藏和封装.
