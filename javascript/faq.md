# javascript FAQ

## restful

REST 是英文 representational state transfer(表象性状态转变)或者表述性状态转移。Rest 是 web 服务的一种架构风格，使用 HTTP，URI，XML，JSON，HTML 等广泛流行的标准和协议。轻量级，跨平台，跨语言的架构设计。它是一种设计风格，不是一种标准，是一种思想。

restful 对应的中文是 rest 式的。Restful web service 是一种常见的 rest 的应用，是遵守了 rest 风格的 web 服务。rest 式的 web 服务是一种 ROA(The Resource-Oriented Architecture)(面向资源的架构)。

### Rest 架构的主要原则

- 网络上的所有事物都被抽象为资源
- 每个资源都有一个唯一的资源标识符
- 同一个资源具有多种表现形式(xml,json 等)
- 对资源的各种操作不会改变资源标识符
- 所有的操作都是无状态的
- 符合 REST 原则的架构方式即可称为 RESTful

### 为什么会出现 Restful

在 Restful 之前的操作：

- GET /photos/query/{photo} 获取特定 photo
- POST /photos/create 创建 photo
- POST /photos/update/{photo} 更新特定 photo
- GET/POST /photos/delete/{photo} 删除特定 photo

RESTful 用法：

| Verb      | URI             | Description     |
| --------- | --------------- | --------------- |
| GET       | /photos         | 获取所有 photos |
| POST      | /photos         | 创建 photo      |
| GET       | /photos/{photo} | 获取特定 photo  |
| PUT/PATCH | /photos/{photo} | 更新特定 photo  |
| DELETE    | /photos/{photo} | 删除特定 photo  |

之前的操作是没有问题的，大神认为是有问题的，有什么问题呢？你每次请求的接口或者地址，都在做描述。例如查询的时候用了 query，新增的时候用了 create，其实完全没有这个必要，我使用了 get 请求，就是查询。使用 post 请求，就是新增的请求，我的意图很明显，完全没有必要做描述，这就是为什么有了 restful。

### 如何使用

| http 方法 | 资源操作 |
| --------- | -------- |
| GET       | SELECT   |
| POST      | INSERT   |
| PUT       | UPDATE   |
| DELETE    | DELETE   |

安全性：对 REST 接口的访问，不会使服务器端资源的状态发生变化

## OSI

OSI（Open System Interconnect），即开放式系统互联。 一般都叫 OSI 参考模型，OSI 定义了网络互连的七层框架（物理层、数据链路层、网络层、传输层、会话层、表示层、应用层）。
![OSI](.//resource/osi.png)

## HTTP

超文本传输协议（英文：HyperText Transfer Protocol，缩写：HTTP）是一种用于分布式、协作式和超媒体信息系统的应用层协议。HTTP 是万维网的数据通信的基础。设计 HTTP 最初的目的是为了提供一种发布和接收 HTML 页面的方法。通过 HTTP 或者 HTTPS 协议请求的资源由统一资源标识符（Uniform Resource Identifiers，URI）来标识。

HTTP（HyperText Transport Protocol）是超文本传输协议的缩写，它是一个**应用层**协议，它用于传送 WWW 方式的数据。HTTP 协议采用了请求/响应模型。客户端向服务器发送一个请求，请求头包含请求的方法、URL、协议版本、以及包含请求修饰符、客户信息和内容的类似于 MIME 的消息结构。服务器以一个状态行作为响应，响应的内容包括消息协议的版本，成功或者错误编码加上包含服务器信息、实体元信息以及可能的实体内容。

## TCP

传输控制协议（英语：Transmission Control Protocol，缩写为 TCP）是一种面向连接的、可靠的、基于字节流的**传输层**通信协议。在简化的计算机网络 OSI 模型中，它完成第四层传输层所指定的功能，用户数据包协议（UDP）是同一层内另一个重要的传输协议。

在因特网协议族（Internet protocol suite）中，TCP 层是位于 IP 层之上，应用层之下的中间层。不同主机的应用层之间经常需要可靠的、像管道一样的连接，但是 IP 层不提供这样的流机制，而是提供不可靠的包交换。

应用层向 TCP 层发送用于网间传输的、用 8 位字节表示的数据流，然后 TCP 把数据流分区成适当长度的报文段（通常受该计算机连接的网络的数据链路层的最大传输单元（MTU）的限制）。之后 TCP 把结果包传给 IP 层，由它来通过网络将包传送给接收端实体的 TCP 层。TCP 为
了保证不发生丢包，就给每个包一个序号，同时序号也保证了传送到接收端实体的包的按序接收。然后接收端实体对已成功收到的包发回一个相应的确认（ACK）；如果发送端实体在合理的往返时延（RTT）内未收到确认，那么对应的数据包就被假设为已丢失将会被进行重传。TCP 用一个校验和函数来检验数据是否有错误；在发送和接收时都要计算校验和。

## IP

网际协议（英语：Internet Protocol，缩写为 IP），又译互联网协议，是用于分组交换数据网络的一种协议。

IP 是在 TCP/IP 协议族中**网络层**的主要协议，任务是仅仅根据源主机和目的主机的地址传送数据。为此目的，IP 定义了寻址方法和数据报的封装结构。第一个架构的主要版本，现在称为 IPv4，仍然是最主要的互联网协议，尽管世界各地正在积极部署 IPv6。

## 宿主对象 host objects 和原生对象 native object 的区别

原生对象是由 ECMAScript 规范定义的 JavaScript 内置对象，比如 String、Math、RegExp、Object、Function 等等。

宿主对象是由运行时环境（浏览器或 Node）提供，比如 window、XMLHTTPRequest 等。

## 匿名函数的典型应用场景

- 匿名函数可以在 IIFE 中使用，来封装局部作用域内的代码，以便其声明的变量不会暴露到全局作用域。
- 匿名函数可以作为只用一次，不需要在其他地方使用的回调函数。当处理函数在调用它们的程序内部被定义时，代码具有更好地自闭性和可读性，可以省去寻找该处理函数的函数体位置的麻烦。

## options 请求

在有很多情况下,当我们在 js 里面调用一次 ajax 请求时,在浏览器那边却会查询到两次请求,第一次的 Request Method 参数是 OPTIONS,还有一次就是我们真正的请求,比如 get 或是 post 请求方式

查阅相关的资料之后发现,这是浏览器对复杂跨域请求的一种处理方式,在真正发送请求之前,会先进行一次预请求,就是我们刚刚说到的参数为 OPTIONS 的第一次请求,他的作用是用于试探性的服务器响应是否正确,即是否能接受真正的请求,如果在 options 请求之后获取到的响应是拒绝性质的,例如 500 等 http 状态,那么它就会停止第二次的真正请求的访问

大致说明一下,有三种方式会导致这种现象:

1. 请求的方法不是 GET/HEAD/POST
2. POST 请求的 Content-Type 并非 application/x-www-form-urlencoded, multipart/form-data, 或 text/plain
3. 请求设置了自定义的 header 字段

比如我的 Content-Type 设置为“application/json;charset=utf-8”并且自定义了 header 选项导致了这种情况。

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

## javascript 设置 cookie

```javascript
// 设置cookie
const now = new Date();
now.setTime(now.getTime() + 24 * 60 * 60 * 1000);
document.cookie = `key=value;expires=${now.toUTCString()};path=/;domain=localhost`;

// 读取cookie
const cookies = document.cooke;
```

## 你对 MVVM 的理解

它是将“数据模型数据双向绑定”的思想作为核心，因此在 View 和 Model 之间没有联系，通过 ViewModel 进行交互，而且 Model 和 ViewModel 之间的交互是双向的，因此视图的数据的变化会同时修改数据源，而数据源数据的变化也会立即反应在 view 层。

优点是在表单交互较多的场景下，会简化大量与业务无关的代码。缺点就是无法追踪局部状态的变化，增加了出错时 debug 的难度

## 常见的 web 页面优化的手段有哪些

- 合并多个文件为单个文件，减少 http 请求
- 压缩资源代码，以减少体积
- 图片懒加载

## 说下客户端缓存有哪些以及区别

- cookie
- sessionStorage
- localStorage

## 经常使用的 ES6 中的特性有哪些

- let ,const
- 箭头函数
- 数组对象的结构析构
- 字符串模板
- set,map
- class
- promise

## 解释原型继承 prototypal inheritance 的工作原理

所有 JS 对象都有一个`__proto__`属性，指向它的原型对象。当试图访问一个对象的属性时，如果没有在该对象上找到，它还会搜寻该对象的原型，以及该对象的原型的原型，依次层层向上搜索，直到找到一个名字匹配的属性或到达原型链的末尾。这种行为是在模拟经典的继承。

## 作用域链 Scope Chain

javascript 有两种作用域类型，局部作用域跟全局作用域，作用域决定了变量的可见性。函数内部申明的变量为局部变量，函数之外申明的变量为全局变量。内部函数可以访问外部函数变量以及全局变量的这种机制，用链式查找决定哪些数据能被内部函数访问。

每一个函数运行的时候会拥有一个自己的执行环境，每个执行环境都拥有一个位置来存储这个环境里面定义的变量和函数，当这个执行环境的所有代码执行完了之后，该环境被销毁，保存在其中的所有变量和函数定义也被销毁掉了，我们可以把这一个执行环境称为一个作用域。

全局 window/global 是最大的作用域，全局里声明的函数是次一级的作用域，在次一级函数里面可以访问到全局申明的变量和函数，但在全局中访问不到次一级函数里面申明的函数和变量。同样在次一级函数里面申明的函数可以访问外面函数申明的变量和函数，这样一层一层的递进，就成了一个链条，也就是作用域链。

## 跨域

浏览器的同源策略会导致跨域，这里同源策略又分为以下两种：

- DOM 同源策略：禁止对不同源页面 DOM 进行操作。这里主要场景是 iframe 跨域的情况，不同域名的 iframe 是限制互相访问的。
- XmlHttpRequest 同源策略：禁止使用 XHR 对象向不同源的服务器地址发起 HTTP 请求。

只要**协议、域名、端口**有任何一个不同，都被当作是不同的域，之间的请求就是跨域操作。为什么要有跨域的限制，跨域限制主要是为了安全考虑。

跨域的解决方式:

1. 跨域资源共享

CORS 是一个 W3C 标准，全称是”跨域资源共享”（Cross-origin resource sharing），同源安全策略默认阻止获取跨域资源访问。但 CORS 给 web 服务器提供了允许跨域资源访问资源的能力。,对于服务器端，需要在 response header 中设置如下两个字段:

```
Access-Control-Allow-Origin:*
Access-Control-Allow-Methods:*
Access-Control-Allow-Headers:*
Access-Control-Allow-Credentials: true
```

2. jsonp 实现跨域

基本原理就是通过动态创建 script 标签,然后利用 src 属性进行跨域。

3. 服务端代理

基本原理时使用 nginx 做一层中专来负责代理原来的接口，然后在响应头中增加跨资源共享标识。

## 内存释放

内存释放有两种情况：

- 引用类型是在没有引用之后, 通过 v8 的 GC 自动回收
- 值类型如果是处于闭包的情况下, 要等闭包没有引用才会被 GC 回收, 非闭包的情况下等待 v8 的新生代 (new space) 切换的时候回收.

## 引用传递

It's always pass by value, but for objects the value of the variable is a reference. Because of this, when you pass an object and change its members, those changes persist outside of the function. This makes it look like pass by reference. But if you actually change the value of the object variable you will see that the change does not persist, proving it's really pass by value.

JavaScript 始终是以值传递的，只是对对象来说传递的变量的值是引用而已。正因为如此，当你传递一个对象并修改其成员，这些改变会在函数执行完毕后在外部被保存下来。这样看上去给人的感觉好像是传递的是引用。但是如果你完全改变一个对象的值，那么在函数执行完毕后这个改变不会被保存下来，就证明了确实是值传递。

stackoverflow 详细讨论 [is-javascript-a-pass-by-reference-or-pass-by-value-language](https://stackoverflow.com/questions/518000/is-javascript-a-pass-by-reference-or-pass-by-value-language)

```javascript
function changeObject(x) {
  x = { member: "bar" };
  console.log("in changeObject: " + x.member);
}

function changeMember(x) {
  x.member = "bar";
  console.log("in changeMember: " + x.member);
}

var x = { member: "foo" };

console.log("before changeObject: " + x.member);
changeObject(x);
console.log("after changeObject: " + x.member); /* change did not persist */

console.log("before changeMember: " + x.member);
changeMember(x);
console.log("after changeMember: " + x.member); /* change did not persist */
```

## 事件委托 event delegation

事件委托是将事件监听器添加到父元素，而不是每个子元素单独设置事件监听器。当触发子元素时，事件会冒泡到父元素，监听器就会触发。这种技术的好处是：

- 内存占用减少，因为只需要一个父元素的事件处理程序，而不必为每个后代都添加事件处理程序。
- 无需从已删除的元素中移除事件监听器，在添加新的子元素时也无需将处理程序绑定到新元素上。

## IIFE 立即调用函数表达式

IIFE(Immediately Invoked Function Expression)（ 立即调用函数表达式）是一个在定义时就会立即执行的 JavaScript 函数。

```javascript
(function () {
  // statements;
})();
```

## 请描述事件冒泡

当一个事件在 DOM 元素上触发时，如果有事件监听器，它将尝试处理该事件，然后事件冒泡到其父级元素，并发生同样的事情。最后直到事件到达祖先元素（HTML 根元素）。事件冒泡是实现事件委托的原理（event delegation）。

## 变量提升 hoisting

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
