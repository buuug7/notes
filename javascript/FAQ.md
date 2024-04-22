# javascript 杂项

## Object.is()

Object.is() 和 === 之间的唯一区别在于它们处理带符号的 0 和 NaN 值的时候。

```javascript
+0 === -0; // true
NaN === NaN; // false

Object.is(+0, -0); // false
Object.is(NaN, NaN); // true
```

=== 运算符（和 == 运算符）将数值 -0 和 +0 视为相等，但是会将 NaN 视为彼此不相等。

## 使用代理来检测对象的变动

您可以使用称为代理的 JavaScript 功能来定义如何读取和设置对象的属性。 代理接受一个目标（代理正在包装的对象）和一个处理程序（定义代理应如何操作）。

```javascript
const sourceObject = {};

const handler = {
  get: (target, key) => {
    if (typeof target[key] === "object" && target[key] !== null) {
      return new Proxy(target[key], handler);
    }
    console.log("property is read!");
    return target[key];
  },
  set: (target, prop, value) => {
    target[prop] = value;
    console.log("A change was made!");
    return true;
  },
};

const object = new Proxy(sourceObject, handler);
```

## javascript 判断屏幕方向

```javascript
screen.orientation.onchange = function () {
  // logs 'portrait' or 'landscape'
  console.log(screen.orientation.type.match(/\w+/)[0]);
};
```

## fetch 下载的例子

```javascript
fetch(url, myInit).then((res) => {
  res.blob().then((blob) => {
    const link = document.createElement("a");
    const url = window.URL.createObjectURL(blob);
    const fileName = "fileName.txt";
    link.href = url;
    link.download = fileName;
    link.click();
    window.URL.revokeObjectURL(url);
  });
});
```

## fetch 上传文件

```javascript
const api = "http://localhost: 3000/api/upload;
const formData = new FormData();
formData.append("img", file);

fetch(api, {
  method: "post",
  body: formData,
}). then((res) => {
  //
});
```

## 保存 base64 文件

```javascript
/**
 * Creates an anchor element `<a></a>` with
 * the base64 pdf source and a filename with the
 * HTML5 `download` attribute then clicks on it.
 * @param  {string} pdf base64
 * @return {void}
 */
function downloadPDF(pdf) {
  const linkSource = `data:application/pdf;base64,${pdf}`;
  const downloadLink = document.createElement("a");
  const fileName = "my-pdf.pdf";

  downloadLink.href = linkSource;
  downloadLink.download = fileName;
  downloadLink.click();
}
```

## React and Vue are MVVM architecture ?

MVVM 是一种架构思想, 不是指具体技术, 首先他们都不是 MVVM, 仅仅是 MVVM 的一部分.

对于 React

MVVM 最重要的一个特征就是数据双向绑定, 而 React 是单向数据流, 状态驱动视图, 它没有纯粹意义上的 VM, 它有的只是用属性和状态去映射视图, 很明显不是 MVVM. 顶多也就是 MVVM 中的 V 层.

对于 Vue

从技术上讲, Vue.js 主要关注 MVVM 模式的 ViewModel 层, 它通过双向数据绑定连接视图和模型, 它更像是 MVVM 但并未完全按照 MVVM 去实现, 只是借鉴了 MVVM 中的一些思想.

## javascript 监听动画完成

```javascript
dom.addEventListener("transitionend", (e) => {
  // do something
});
```

## `$(document). ready` equivalent without jQuery

```javascript
document.addEventListener("DOMContentLoaded", function (event) {
  //do work
});
```

## 原型, 构造函数和实例的关系

每个构造函数都有一个原型对象, 原型对象包含了一个指向构造函数的指针, 而实例中包含了指向原型对象的内部指针.

## 理解原型

只要创建一个新函数, 就会为该函数创建一个 prototype 属性, 这个属性指向函数的**原型对象**, 所有原型对象都会自动获得一个 constructor 属性, 这个属性指向了其构造函数.

比如 Person.prototype.constructor 指向 Person 函数.

```javascript
function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.sayName = function () {
  console.log(this.name);
};

const p1 = new Person("Tom", 22);
Person.prototype.constructor == Person; // true
p1.__proto__ === Person.prototype; // true
```

## 调用构造函数经历的过程 (new 一个对象的过程)

1. 创建一个新对象
2. 将构造函数的作用域赋给新对象(因此 this 就指向了这个新对象)
3. 执行构造函数中的代码(为这个新对象添加属性)
4. 返回新对象

## javascript standard build in error

- EvalError 代表了一个关于 eval 函数的错误
- RangeError 当一个值不在其所允许的范围或者集合中
- ReferenceError 代表当一个不存在的变量被引用时发生的错误
- SyntaxError 当引擎在解析代码时遇到不符合语法的标记
- TypeError 当操作无法执行或者一个值不是期望的类型
  - 传递给函数的参数或者操作符跟所期望的类型不兼容
  - 尝试修改一个无法修改的值
  - 当试图以不恰当的方式使用一个值时
- URIError 表示以一种错误的方式使用 URI 处理函数(decodeURIComponent, decodeURI)而产生的错误
- AggregateError 将多个错误包裹成一个单独的错误

## encodeURI encodeURIComponent

encodeURI 转义除了如下字符串外的所有字符串

```
A-Z a-z 0-9 - _ . ! ~ * ' ( ); , / ? : @ & = + $ #
```

encodeURIComponent 转义除了如下字符串外的所有字符串

```
A-Z a-z 0-9 - _ . ! ~ * ' ( )
```

也就是 encodeURIComponent 会转义更多的字符串, 建议使用 encodeURIComponent 编码你的 URI

## 宏任务 微任务

宏任务(macro task), 又称为 task, 包括:

- script 代码块
- I/O
- xhr
- setTimeout
- setInterval
- setImmediate
- UI 交互事件
- postMessage

浏览器为了能够使得 JS 引擎跟 UI 引擎有序配合执行, 会在每一个 macro task 执行结束后, 在下一个 macro task 执行前, 对页面进行重新渲染. 执行流程为:

```
macro task(JS 引擎) -> render(UI引擎) ->macro task(JS 引擎). ..
```

微任务(micro task), 包括:

- Promise.then
- await
- process.nextTick
- MutationObserver

执行流程为:

```
micro task -> micro task -> ...
```

注意:

- 微任务总是在宏任务执行过程中产生的任务, 它不能单独存在(微任务实际是宏任务的一个步骤), 可以理解为宏任务是微任务寄生的环境
- 在同一层级的任务中, 微任务执行优先级别高于宏任务, 如果不考虑同一层级, 那么比较微任务跟宏任务优先级别是毫无意义
- 在宏任务执行过程中产生的微任务, 会在该宏任务结束前一次性执行完毕
- 微任务实际是宏任务的一个步骤, 所有微任务会在下一个宏任务之前会全部执行完毕.
- 在微任务执行过程中产生的微任务会直接添加到微任务队列末端, 并在下一个宏任务执行之前全部执行掉.
- 如果在微任务执行过程中产生的宏任务, 则会进入到宏任务队列末尾, 按照宏任务顺序在后面的事件循环中执行.
- process.nextTick 会在当前执行栈的末尾, 下一次 Event loop 之前触发回调函数, 也就是说, 它指定的任务总是发生在所有异步任务之前.

## process.nextTick 跟 setImmediate 区别

Use setImmediate if you want to queue the function behind whatever I/O event callbacks that are already in the event queue. Use process.nextTick to effectively queue the function at the head of the event queue so that it executes immediately after the current function completes.

可以把 process.nextTick 理解为往已经存在的事件队列头部插入任务, 而 setImmediate 可以理解为把任务添加到已经存在事件队列的末端.

```javascript
A();
B();
C();
```

```
| 正在执行 | 等待队列 |
| A() B() C() | task1 task2 task3 ... |
```

```javascript
A();
process.nextTick(B);
C();
```

```
| 正在执行 | 等待队列 |
| A() C() | B() task1 task2 task3 ... |
```

```javascript
A();
setImmediate(B);
C();
```

```
| 正在执行 | 等待队列 |
| A() C() | task1 task2 task3 ... B() |
```

## setTimeout()

单线程运行机制, 同一时间只能做一件事. 无论怎样, 都是要等主线线程的流程执行完毕后才会进行, 且按照 setTimeout 设置的顺序进行排队执行. 该函数指定的任务为宏任务, 优先级别低于 `process.nextTick()`.

## process.nextTick()

nodeJs 的一个异步执行函数, 优先级别比 `setTimeout` 更高, 执行顺序要早于 setTimeout, 在主逻辑的末尾, 任务队列调用之前执行.

## setInterval()

setInterval() 定时器函数, 按照指定的周期不断调用函数. 等待主线程执行完毕后调用. timeout 时间一致时, 按照 setInterval 设置的顺序来执行.

## package.json 中版本依赖通配符

NPM 仓库中的包都是遵守语义化版本格式, 也就是: `主版本号.次版本号.修订号`, 详情参考[语义化版本 2.0.0](https://semver.org/lang/zh-CN/). 在 package.json 中指定版本号的方式有下面三种:

- 指定具体版本号`3.1.2`.
- 使用 `~` 通配符, 该通配符只改变修订号, 也就是最后一位, `~3.1.2`表示版本号大于等于`3.1.2`, 小于`3.2.0`
- 使用 `^` 通配符, 该通配符只改变次版本号, 也就是中间一位, `^3.1.2`表示版本号大于等于`3.1.2`, 小于`4.0.0`

## javascript 弹出一个窗口

```javascript
window.open(url, "Share", "width=550, height=400, toolbar=0, scrollbars=1, location=0, statusbar=0, menubar=0, resizable=0");
```

## 为什么有些函数前面有个`+function(){}()`或者`!function(){}()`

他们都是 IIFE( 立即调用函数表达式)的简写形式, 使用一元操作符来简化, 现在不建议在你的代码中这样书写. `+function(){}()`或者`! function(){}()` 等同于 `(function(){})()`.

参考[stackoverflow](https://stackoverflow.com/questions/5827290/javascript-function-leading-bang-syntax)

## Javascript 获取时间

```javascript
const now = new Date();
const month = (now.getMonth() + 1).toString().replace(/^(\d)$/, "0$1");
const day = now
  .getDate()
  .toString()
  .replace(/^(\d)$/, "0$1");
const hour = now
  .getHours()
  .toString()
  .replace(/^(\d)$/, "0$1");
const minutes = now
  .getMinutes()
  .toString()
  .replace(/^(\d)$/, "0$1");
```

## js 中, 0.1 + 0.2 === 0.3 是否为 true ? 在不知道浮点数位数时应该怎样判断两个浮点数之和与第三数是否相等?

0.1+0.2 === 0.30000000000000004(17 位小数), 返回为 false, 所以不相等.

在不知道浮点数位数时应该怎样判断两个浮点数之和与第三数是否相等? 可以使用 toFixed()对计算结果进行精度缩小来处理.

```javascript
const a = 0.1;
const b = 0.2;
const c = 0.3;

const sum = (a + b).toFixed(1);
console.log(sum === c.toString()); // true
```

## 如何解决不同浏览器的样式兼容性问题?

- 在确定问题原因和有问题的浏览器后, 使用单独的样式表, 仅供出现问题的浏览器加载.
- 使用已经处理好此类问题的库, 比如 Bootstrap.
- 使用 autoprefixer 自动生成 CSS 属性前缀.
- 使用 Reset CSS 或 Normalize.css.

## 如何为功能受限的浏览器提供页面? 使用什么样的技术和流程?

- 优雅的降级: 优先为现代浏览器构建应用, 同时确保在不支持新特性的旧浏览器上通过降级处理来确保用户能够完成最基本的操作.
- 渐进式增强: 构建基于用户体验的应用, 只有在浏览器支持时添加新增功能.
- 利用 caniuse.com 检查特性支持.
- 使用 autoprefixer 自动生成 CSS 属性前缀.
- 使用 Modernizr 进行特性检测.

## 响应式设计与自适应设计有何不同?

响应式设计和自适应设计都以提高不同设备间的用户体验为目标, 根据视窗大小, 分辨率, 使用环境等参数进行优化调整.

响应式设计的适应性原则: 网站应该凭借一份代码, 在各种设备上都有良好的显示和使用效果. 响应式网站通过使用媒体查询, 自适应栅格和响应式图片, 基于多种因素进行变化, 创造出优良的用户体验. 就像一个球通过膨胀和收缩, 来适应不同大小的篮圈.

自适应设计更像是渐进式增强的现代解释. 与响应式设计单一地去适配不同, 自适应设计通过检测设备和其他特征, 从早已定义好的一系列样式中, 选出最恰当的一份样式代码. 与使用一个球去穿过各种的篮筐不同, 自适应设计允许使用多个球, 然后根据不同的篮筐大小, 去选择最合适的一个.

## 请简述 JavaScript 中的 this.

JavaScript 中的 this 是一个相对复杂的概念, 不是简单几句能解释清楚的. 粗略地讲, 函数的调用方式决定了 this 的值. this 取值符合以下规则:

- 在调用函数时使用 new 关键字, 函数内的 this 是一个全新的对象.
- 如果 apply, call 或 bind 方法用于调用, 会创建一个新函数, 函数内的 this 就是当前调用方法传入的 this.
- 当函数作为对象里的方法被调用时, 函数内的 this 是调用该函数的对象. 比如当 obj.method()被调用时, 函数内的 this 将绑定到 obj 对象.
- 如果调用函数不符合上述规则, 那么 this 的值指向全局对象(global). 浏览器环境下 this 的值指向 window 对象, 但是在严格模式下('use strict'), this 的值为 undefined.
- 如果符合上述多个规则, 则较高的规则(1 号最高, 4 号最低)将决定 this 的值.
- 如果该函数是 ES2015 中的箭头函数, 将忽略上面的所有规则, this 被设置为它被创建时的上下文.

## 请解释原型继承(prototypal inheritance)的工作原理.

这是一个非常常见的 JavaScript 问题. 所有 JS 对象都有一个`__proto__`属性, 指向它的原型对象. 当试图访问一个对象的属性时, 如果没有在该对象上找到, 它还会搜寻该对象的原型, 以及该对象的原型的原型, 依次层层向上搜索直到原型链的末尾. 这种行为是在模拟经典的继承.

## null, undefined 和未声明变量之间有什么区别? 如何检查判断这些状态值?

当没有提前使用 var, let 或 const 声明变量, 就为一个变量赋值时, 则会成为全局作用域下定义的变量. 在严格模式下, 给未声明的变量赋值, 会抛出 ReferenceError 错误.

当一个变量已经声明, 但没有赋值时, 该变量的值是 undefined. 如果一个函数的执行结果被赋值给一个变量, 但是这个函数却没有返回任何值, 那么该变量的值是 undefined. 可以使用 `typeof` 或者 `===` 去检测一个值是否是 undefined.

null 只能被显式赋值给变量. 它表示空值, 与被显式赋值 undefined 的意义不同. 要检查判断 null 值, 需要使用严格相等运算符.

## 使用 Ajax 的优缺点分别是什么?

优点:

- 交互性更好. 来自服务器的新内容可以动态更改, 无需重新加载整个页面.
- 减少与服务器的连接, 因为脚本和样式只需要被请求一次.
- 状态可以维护在一个页面上. JavaScript 变量和 DOM 状态将得到保持, 因为主容器页面未被重新加载.
- 基本上包括大部分 SPA 的优点.

缺点:

- 动态网页很难收藏.
- 如果 JavaScript 已在浏览器中被禁用, 则不起作用.
- 有些网络爬虫不执行 JavaScript, 也不会看到 JavaScript 加载的内容.
- 基本上包括大部分 SPA 的缺点

## 什么是"use strict"; ? 使用它有什么优缺点?

`use strict`是用于对整个脚本或单个函数启用严格模式的语句. 严格模式是可选择的一个限制 JavaScript 的变体一种方式 .

优点:

- 无法再意外创建全局变量.
- 会使引起静默失败(silently fail, 即: 不报错也没有任何效果)的赋值操抛出异常.
- 试图删除不可删除的属性时会抛出异常(之前这种操作不会产生任何效果).
- 要求函数的参数名唯一.
- 全局作用域下, this 的值为 undefined.
- 捕获了一些常见的编码错误, 并抛出异常.
- 禁用令人困惑或欠佳的功能.

缺点:

- 无法访问 function.caller 和 function.arguments.
- 以不同严格模式编写的脚本合并后可能导致问题.

总的来说, 我认为利大于弊, 我从来不使用严格模式禁用的功能, 因此我推荐使用严格模式.

存在的问题:

- 子类在实例化的时候不能给父类构造函数传参
- 原型中包含的引用类型属性将被所有实例共享

## HTML5 有什么优势

- 语义: 能够让你更恰当地描述你的内容是什么
- 连通性: 能够让你跟服务器之间通过新技术进行通讯
- 离线&储存: 能够让网页在客户端本地存储数据以高效地离线运行
- 多媒体: 使 audio 和 video 成为 web 中的一等公民
- 2D/3D 绘图效果: 提供了一个更加分化范围的呈现选择
- 性能&集成 :提供了非常显著的性能优化和更有效的计算机硬件使用
- 设备访问 Device Access: 能够处理各种输入和输出设备
- 样式设计: 让作者来创作更加复杂的主题吧

## Pure Functions 纯函数

一个函数的返回结果只依赖于它的参数, 并且在执行过程里面没有副作用(side effects), 我们就把这个函数叫做纯函数. 优点有:

- 容易可测试(testable)
- 因为相同的输入必定是相同的输出, 因此结果可以缓存(cacheable)
- 因为不用担心有副作用(side-effects), 因此可以更好地工作

## DOCTYPE 有什么用?

由于遗留原因, 需要 doctype. 省略时, 浏览器倾向于使用与某些规范不兼容的不同呈现模式. 在文档中包含 DOCTYPE 可确保浏览器尽最大努力遵循相关规范.

## 解释 Ajax

AJAX 的全称是 Asynchronous JavaScript and XML, 是一种利用 Javascript 请求服务器数据的技术, 在不需要重新加载整个网页的情况下, 实现从服务端获取数据, 动态更新网页部分内容.

## javascript 的数据类型

- `number`
- `string`
- `boolean`
- `undefined`
- `null`
- `object`
  - `object` 狭义的对象
  - `array`
  - `function`
- `symbol` ES6 新增的

## javascript 数据类型判断

typeof 可以正确识别: Undefined, Boolean, Number, String, Symbol, Function 等类型的数据, 但是对于其他的都会认为是 object. 但是可以使用`Object.prototype.toString`去做详细判定.

```javascript
const rs = Object.prototype.toString.call(new Date()); // [object Date]
const ty = rs
  .split(" ")[1]
  .substring(0, rs.length - 1)
  .toLowerCase(); // date
```

## document 中的 load 事件和 DOMContentLoaded 事件之间的区别

当初始的 HTML 文档被完全加载和解析完成之后, DOMContentLoaded 事件被触发, 而无需等待样式表, 图像和子框架的完成加载.
window 的 load 事件仅在 DOM 和所有相关资源全部完成加载后才会触发.

## const 定义的 Array 中间元素能否被修改? 如果可以, 那 const 修饰对象的意义是?

可以被修改. const 的意义是为了保证变量指向的内存地址不发生变化.

## restful

REST 是英文 representational state transfer(表象性状态转变)或者表述性状态转移. Rest 是 web 服务的一种架构风格, 使用 HTTP, URI, XML, JSON, HTML 等广泛流行的标准和协议. 轻量级, 跨平台, 跨语言的架构设计. 它是一种设计风格, 一种思想, 而不是一种标准.

restful 对应的中文是 rest 式的. Restful web service 是一种常见的 rest 的应用, 是遵守了 rest 风格的 web 服务. rest 式的 web 服务是一种 ROA(The Resource-Oriented Architecture)(面向资源的架构).

### Rest 架构的主要原则

- 网络上的所有事物都被抽象为资源
- 每个资源都有一个唯一的资源标识符
- 同一个资源具有多种表现形式(xml, json 等)
- 对资源的各种操作不会改变资源标识符
- 所有的操作都是无状态的
- 符合 REST 原则的架构方式即可称为 RESTful

### 为什么会出现 Restful

在 Restful 之前的操作:

- GET /photos/query/{photo} 获取特定 photo
- POST /photos/create 创建 photo
- POST /photos/update/{photo} 更新特定 photo
- GET/POST /photos/delete/{photo} 删除特定 photo

RESTful 用法:

| Verb      | URI             | Description     |
| --------- | --------------- | --------------- |
| GET       | /photos         | 获取所有 photos |
| POST      | /photos         | 创建 photo      |
| GET       | /photos/{photo} | 获取特定 photo  |
| PUT/PATCH | /photos/{photo} | 更新特定 photo  |
| DELETE    | /photos/{photo} | 删除特定 photo  |

之前的操作是没有问题的, 大神认为是有问题的, 有什么问题呢? 你每次请求的接口或者地址, 都在做描述. 例如查询的时候用了 query, 新增的时候用了 create, 其实完全没有这个必要, 我使用了 get 请求, 就是查询. 使用 post 请求, 就是新增的请求, 我的意图很明显, 完全没有必要做描述, 这就是为什么有了 restful.

### 如何使用

| http 方法 | 资源操作 |
| --------- | -------- |
| GET       | SELECT   |
| POST      | INSERT   |
| PUT       | UPDATE   |
| DELETE    | DELETE   |

安全性: 对 REST 接口的访问, 不会使服务器端资源的状态发生变化

## OSI

OSI(Open System Interconnect), 即开放式系统互联. 一般都叫 OSI 参考模型, OSI 定义了网络互连的七层框架:

- 应用层
- 表示层
- 会话层
- 传输层
- 网络层
- 数据链路层
- 物理层

虽然 OSI 定义了七层, 但是现在我们常用的是基于 TCP/IP 的五层协议:

- 应用层
- 传输层
- 网络层
- 数据链路层
- 物理层

![OSI](./resource/osi.png)

## HTTP

超文本传输协议(英文: HyperText Transfer Protocol, 缩写: HTTP)是一种用于分布式, 协作式和超媒体信息系统的应用层协议. HTTP 是万维网的数据通信的基础. 设计 HTTP 最初的目的是为了提供一种发布和接收 HTML 页面的方法. 通过 HTTP 或者 HTTPS 协议请求的资源由统一资源标识符(Uniform Resource Identifiers, URI)来标识.

HTTP(HyperText Transport Protocol)是超文本传输协议的缩写, 它是一个**应用层**协议, 它用于传送 WWW 方式的数据. HTTP 协议采用了请求/响应模型. 客户端向服务器发送一个请求, 请求头包含请求的方法, URL, 协议版本, 以及包含请求修饰符, 客户信息和内容的类似于 MIME 的消息结构. 服务器以一个状态行作为响应, 响应的内容包括消息协议的版本, 成功或者错误编码加上包含服务器相关信息, 实体元信息以及可能的实体内容.

## TCP

传输控制协议(英语: Transmission Control Protocol, 缩写为 TCP)是一种面向连接的, 可靠的, 基于字节流的**传输层**通信协议. 在简化的计算机网络 OSI 模型中, 它完成第四层传输层所指定的功能, 用户数据包协议(UDP)是同一层内另一个重要的传输协议.

在因特网协议族(Internet protocol suite)中, TCP 层是位于 IP 层之上, 应用层之下的中间层. 不同主机的应用层之间经常需要可靠的, 像管道一样的连接, 但是 IP 层不提供这样的流机制, 而是提供不可靠的包交换.

应用层向 TCP 层发送用于网间传输的, 用 8 位字节表示的数据流, 然后 TCP 把数据流分区成适当长度的报文段(通常受该计算机连接的网络的数据链路层的最大传输单元(MTU)的限制). 之后 TCP 把结果包传给 IP 层, 由它来通过网络将包传送给接收端实体的 TCP 层. TCP 为
了保证不发生丢包, 就给每个包一个序号, 同时序号也保证了传送到接收端实体的包的按序接收. 然后接收端实体对已成功收到的包发回一个相应的确认(ACK); 如果发送端实体在合理的往返时延(RTT)内未收到确认, 那么对应的数据包就被假设为已丢失将会被进行重传. TCP 用一个校验和函数来检验数据是否有错误; 在发送和接收时都要计算校验和.

## IP

网际协议(英语: Internet Protocol, 缩写为 IP), 又译互联网协议, 是用于分组交换数据网络的一种协议.

IP 是在 TCP/IP 协议族中**网络层**的主要协议, 任务是仅仅根据源主机和目的主机的地址传送数据. 为此目的, IP 定义了寻址方法和数据报的封装结构. 第一个架构的主要版本, 现在称为 IPv4, 仍然是最主要的互联网协议, 尽管世界各地正在积极部署 IPv6.

## 宿主对象 host objects 和原生对象 native object 的区别

原生对象是由 ECMAScript 规范定义的 JavaScript 内置对象, 比如 String, Math, RegExp, Object, Function 等等.

宿主对象是由运行时环境(浏览器或 Node)提供, 比如 window, XMLHTTPRequest 等.

## 匿名函数的典型应用场景

- 匿名函数可以在 IIFE 中使用, 来封装局部作用域内的代码, 以便其声明的变量不会暴露到全局作用域.
- 匿名函数可以作为只用一次, 不需要在其他地方使用的回调函数. 当处理函数在调用它们的程序内部被定义时, 代码具有更好地自闭性和可读性, 可以省去寻找该处理函数的函数体位置的麻烦.

## options 请求

在有很多情况下, 当我们在 js 里面调用一次 ajax 请求时, 在浏览器那边却会查询到两次请求, 第一次的 Request Method 参数是 OPTIONS, 还有一次就是我们真正的请求, 比如 get 或是 post 请求方式

这是浏览器对复杂跨域请求的一种处理方式, 在真正发送请求之前, 会先进行一次预请求, 就是我们刚刚说到的参数为 OPTIONS 的第一次请求, 他的作用是用于试探性的服务器响应是否正确, 即是否能接受真正的请求, 如果在 options 请求之后获取到的响应是拒绝性质的, 例如 500 等 http 状态, 那么它就会停止第二次的真正请求的访问

大致说明一下, 有三种方式会导致这种现象:

1. 请求的方法不是 GET/HEAD/POST
2. POST 请求的 Content-Type 并非 application/x-www-form-urlencoded, multipart/form-data, 或 text/plain
3. 请求设置了自定义的 header 字段

比如我的 Content-Type 设置为"application/json; charset=utf-8"并且自定义了 header 选项导致了这种情况.

## 原型链继承

通过申明一个构造函数, 然后在该构造函数的原型上添加属性和方法, 然后子类调用父类构造函数来达到继承的目的.

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
document.cookie = `key=value; expires=${now.toUTCString()}; path=/; domain=localhost`;

// 读取cookie
const cookies = document.cookie;
```

## 你对 MVVM 的理解

它是将**数据双向绑定**的思想作为核心, View 和 Model 之间没有联系, 而是通过 ViewModel 把 View 跟 Model 进行连接, 因此视图的数据的变化会同时修改数据源, 而数据源数据的变化也会立即反应在 view 层.

优点是在表单交互较多的场景下, 会简化大量与业务无关的代码. 缺点就是无法追踪局部状态的变化, 增加了出错时 debug 的难度

## 常见的 web 页面优化的手段有哪些

- 合并多个文件为单个文件, 减少 http 请求
- 压缩资源代码, 以减少体积
- 图片懒加载

## 说下客户端缓存有哪些以及区别

- cookie
- sessionStorage
- localStorage

## 经常使用的 ES6 中的特性有哪些

- let, const
- Map, Set
- 默认参数
- 剩余参数
- 展开操作符, 主要用在给函数传参, 多个数组合并, 多个对象合并
- 解析赋值, 把一个对象或者数组中的元素一次性赋值给多个变量
- 箭头函数
- 字符串模板
- class
- 模块导入导出

## 解释原型继承 prototypal inheritance 的工作原理

所有 JS 对象都有一个`__proto__`属性, 指向它的原型对象. 当试图访问一个对象的属性时, 如果没有在该对象上找到, 它还会搜寻该对象的原型, 以及该对象的原型的原型, 依次层层向上搜索, 直到找到一个名字匹配的属性或到达原型链的末尾. 这种行为是在模拟经典的继承.

## 作用域链 Scope Chain

javascript 有两种作用域类型, 全局作用域, 局部作用域, 作用域决定了变量的可见性. 函数内部申明的变量为局部变量, ES6 中花括号中申明的变量也为局部变量, 函数之外申明的变量为全局变量. 内部函数可以访问外部函数变量以及全局变量的这种机制, 用链式查找决定哪些数据能被访问.

每一个函数运行的时候会拥有一个自己的执行环境, 每个执行环境都存储这个环境里面定义的变量和函数, 当这个执行环境的所有代码执行完了之后, 该环境会被销毁, 保存在其中的所有变量和函数定义也被销毁掉了, 我们把这样一个执行环境称为一个作用域.

全局 window/global 是最大的作用域, 全局里声明的函数是次一级的作用域, 在次一级函数里面可以访问到全局申明的变量和函数, 但在全局中访问不到次一级函数里面申明的函数和变量. 同样在次一级函数里面申明的函数可以访问外面函数申明的变量和函数, 这样一层一层的递进, 就成了一个链条, 也就是作用域链.

## 跨域

浏览器的同源策略会导致跨域, 这里同源策略又分为以下两种:

- DOM 同源策略: 禁止对不同源页面 DOM 进行操作. 这里主要场景是 iframe 跨域的情况, 不同域名的 iframe 是限制互相访问的.
- XHR 同源策略: 禁止使用 XHR 对象向不同源的服务器地址发起 HTTP 请求.

只要**协议, 域名, 端口**有任何一个不同, 都被当作是不同的域, 之间的请求就是跨域操作. 为什么要有跨域的限制, 跨域限制主要是为了安全考虑.

跨域的解决方式:

1. 跨域资源共享

CORS 是一个 W3C 标准, 全称是"跨域资源共享"(Cross-origin resource sharing), 同源安全策略默认阻止获取跨域资源访问. 但 CORS 给 web 服务器提供了允许跨域资源访问资源的能力. 对于服务器端, 需要在 response header 中设置如下两个字段:

```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: *
Access-Control-Allow-Headers: *
Access-Control-Allow-Credentials: 'true'
```

2. jsonp 实现跨域

基本原理就是通过动态创建 script 标签, 然后利用 src 属性进行跨域.

3. 服务端代理

基本原理是使用类似于 nginx 做一层中专来负责代理原来的接口, 然后在响应头中增加跨资源共享标识.

## 内存释放

内存释放有两种情况:

- 引用类型是在没有引用之后, 通过 JavaScript 引擎垃圾回收器自动回收
- 值类型如果是处于闭包的情况下, 要等闭包没有引用才会被 GC 回收, 非闭包的情况下等待 v8 的新生代 (new space) 切换的时候回收.

## 引用传递

It's always pass by value, but for objects the value of the variable is a reference. Because of this, when you pass an object and change its members, those changes persist outside of the function. This makes it look like pass by reference. But if you actually change the value of the object variable you will see that the change does not persist, proving it's really pass by value.

JavaScript 始终是以值传递的, 只是对对象来说传递的变量的值是引用而已. 正因为如此, 当你传递一个对象并修改其成员, 这些改变会在函数执行完毕后在外部被保存下来. 这样看上去给人的感觉好像是传递的是引用. 但是如果你完全改变一个对象的值, 那么在函数执行完毕后这个改变不会被保存下来, 就证明了确实是值传递.

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
console.log("after changeMember: " + x.member); /* change persist */
```

## 事件委托 event delegation

事件委托是将事件监听器添加到父元素, 而不是每个子元素单独设置事件监听器. 当触发子元素时, 事件会冒泡到父元素, 监听器就会触发. 这种技术的好处是:

- 内存占用减少, 因为只需要一个父元素的事件处理程序, 而不必为每个后代都添加事件处理程序.
- 无需从已删除的元素中移除事件监听器, 在添加新的子元素时也无需将处理程序绑定到新元素上.

## IIFE 立即调用函数表达式

IIFE(Immediately Invoked Function Expression)( 立即调用函数表达式)是一个在定义时就会立即执行的 JavaScript 函数.

```javascript
(function () {
  // statements;
})();
```

## DOM2 级事件

DOM2 级事件规定事件流包括三个阶段, 事件捕获阶段, 处于目标阶段和事件冒泡阶段. 首先发生的是事件捕获, 为截获事件提供了机会, 然后是实际目标接收到事件, 最后一个阶段是冒泡阶段, 可以在这个阶段对事件作出响应.

## 请描述事件冒泡

当一个事件在 DOM 元素上触发时, 如果有事件监听器, 它将尝试处理该事件, 然后事件冒泡到其父级元素, 并发生同样的事情. 最后直到事件到达祖先元素(HTML 根元素). 事件冒泡是实现事件委托的原理(event delegation).

## 变量提升 hoisting

变量提升(hoisting)是用于解释代码中变量声明行为的术语. 使用 var 关键字声明或初始化的变量, 会将声明语句"提升"到当前作用域的顶部. 但是, 只有声明才会触发提升, 赋值语句(如果有的话)将保持原样. 函数声明会使函数体提升, 但函数表达式(以声明变量的形式书写)只有变量声明会被提升.

## DOM 事件流

dom 事件以流的形式传递, 先从最外层元素向最内层元素流过, 此过程称为捕获, 到达最内层元素后又重新向最外层元素流动, 此过程称为冒泡. 通过 addEventListener 绑定事件, 默认是在冒泡阶段触发事件, 如果 useCapture 设置为 true, 则事件是在捕获阶段触发. 一个事件只会触发一次, 要么冒泡阶段, 要么捕获阶段.

额外的一些解释:

- 事件冒泡(event bubbling)
- 事件捕获(event capturing)

DOM2 级事件规定事件流包括三个阶段, 事件捕获阶段, 处于目标阶段和事件冒泡阶段. 首先发生的是事件捕获, 为截获事件提供了机会, 然后是实际目标接收到事件, 最后一个阶段是冒泡阶段, 可以在这个阶段对事件作出响应.

## === 跟 == 区别

`==`运算符是在进行必要的类型转换后, 再比较. `===`运算符不会进行类型转换, 所以如果两个值不是相同的类型, 会直接返回 false.

## JS 运行机制

JS 执行是单线程的, 它是基于事件循环的. 事件循环大致分为以下几个步骤:

1. 所有同步任务都在主线程上执行, 形成一个执行栈(execution context stack).
2. 主线程之外, 还存在一个"任务队列"(task queue). 只要异步任务有了运行结果, 就在"任务队列"之中添加一个任务.
3. 一旦主线程"执行栈"中的所有同步任务执行完毕, 执行栈为空的时候, JS 引擎就会读取"任务队列"里面的任务, 将其推入栈中执行.
4. 主线程不断重复上面的第三步.

## 活动对象

变量对象包含了活动对象, 活动对象就是作用域链上正在被执行和引用的变量对象. 我们从活动对象的名称中也能看出 "执行, 运行, 激活" 等意味. 你可以这样理解, 整个代码的运行总有一个起始的对象吧, 不管这个起始是变量还是函数, 总要有一个称呼, 虽然我们把执行环境中的变量和函数的总称叫做变量对象, 但这不能反映代码的动态性, 为了区别于普通的变量对象, 我们创造了活动对象的概念.

## 高阶函数

高阶函数是指至少满足下列条件之一的函数

- 函数可以作为参数被传递
- 函数可以作为返回值输出

## `__proto__`, `prototype`, `constructor`

- `__proto__`和 `constructor` 属性是对象所独有的;
- `prototype` 属性是函数所独有的, 因为函数也是一种对象, 所以函数也拥有`__proto__`和 `constructor` 属性.
- `__proto__`属性的作用就是当访问一个对象的属性时, 如果该对象内部不存在这个属性, 那么就会去它的`__proto__`属性所指向的那个对象(父对象)里找, 一直找, 直到`__proto__`属性的终点 null, 再往上找就相当于在 null 上取值, 会报错. 通过`__proto__`属性将对象连接起来的这条链路即我们所谓的原型链.
- `prototype` 属性的作用就是让该函数所实例化的对象们都可以找到公用的属性和方法, 即 `f1.__proto__ === Foo.prototype`.
- `constructor` 属性的含义就是指向该对象的构造函数, 所有函数(此时看成对象了)最终的构造函数都指向 `Function`.

## 自定义事件

> [CustomEvent](https://developer.mozilla.org/zh-CN/docs/Web/API/CustomEvent)

```javascript
// 创建自定义事件
const event = new CustomEvent("custom-event", {
  detail: { key1: "someValue" },
});

const btn = document.querySelector("#btn");
// 监听已创建的自定义事件
btn.addEventListener("custom-event", (e) => {
  console.log("event", e);
});

// 当按钮被点击的时候调度事件
btn.addEventListener("click", (e) => {
  btn.dispatchEvent(event);
});
```

## for, forEach, for..in, for..of 区别

在 JavaScript 中有 4 中主要的方式用来遍历数组:

- `for (let i = 0; i < arr.length; ++i)`
- `arr.forEach((v, i) => { /_ ... _/ })`
- `for (let i in arr)`
- `for (const v of arr)`

for 和 for..in 循环结构使您可以访问数组中的索引, 而不是实际的元素. 而 forEach 和 for..of, 您可以访问数组元素本身.

针对非数值属性(Non-Numeric Properties), for..in 会遍历非数值属性, 而其他几种遍历则不会.

针对数组中的空元素, for..in 和 forEach 会跳过空元素, 但是 for 和 for..of 不会.

如果你想迭代一个对象的属性, 你可以用 for-in 循环(这也是它的本职工作)或内建的 Object.keys()方法.

总结:

通常, for..of 是迭代 JavaScript 中数组的最可靠方法. 它比常规的 for 循环更简洁, 并且没有 for..in 和 forEach 那样多的边缘情况. for..of 的主要缺点是您需要做一些额外的工作才能访问索引, 并且无法像 forEach 那样进行链接. forEach 在使用的时候有一些限制(比如在在 forEach 中不能使用 await, yield), 但是在许多情况下, 它使代码更简洁.

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

## 什么叫 shim

shim 垫片的意思, 指把一个库引入另一个旧的浏览器, 然后用旧的 API 来实现一些新的 API 功能.

## DOM 操作

```javascript
// 从 DOM 中移除元素
el.remove();

// 返回指定元素及其后代的文本内容
el.textContent;

// 设置元素的文本内容
el.textContent = string;

// 获取HTML
el.innerHTML;

// 设置HTML
el.innerHTML = htmlString;

// 移除所有节点
el.innerHTML = "";

// DOM查找
let ul = document.querySelector("ul");
let firstChild = document.querySelector("ul li: first-child");

// DOM 创建 textNode
let textNode = document.createTextNode("some text");
document.body.appendChild(textNode);

// DOM创建 Element
// element = document.createElement(tagName[, options]);
let newLi = document.createElement("li");
newLi.textContent = "some text";

// Append 插入到子节点的末尾
el.appendChild(newEl);

// 如果匹配给定的选择器, 返回true
el.matches(selector);

// Prepend 插入到子节点的前面
el.insertBefore(newEl, el.firstChild);

// 在选中元素前插入新节点
// insertBefore
const p1 = document.querySelector("#p1");
const newEl = document.createElement("p");
newEl.textContent = "Hello world";
p1.parentNode.insertBefore(newEl, p1);

// 在选中元素后插入新节点
// insertAfter
const p1 = document.querySelector("#p1");
const newEl = document.createElement("p");
newEl.textContent = "Hello world";
p1.parentNode.insertBefore(newEl, p1.nextSibling);

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

## 执行环境

每个函数都有自己的执行环境, 这些环境彼此独立, 每发生一次函数调用, 脚本引擎就需要预先为函数创建一个执行环境. 比如函数的调用过程中: FnA -> FnB -> FnC 当 FnA 开始调用 FnB 时候, 引擎就需要先把 FnA 的执行环境保存起来(进栈操作), 在等到 FnB 返回之后再恢复(出栈操作) FnA 的执行环境.

引擎为函数建立执行环境的步骤:

1. 创建活动对象 创建活动对象也就是申明, 但是没有赋值, 真正执行的时候才赋值
2. 分配作用域链 比如创建 FnA 函数时, 作用域链里 push (顶级作用域 window), 当调用的 FnA 的时候, 在往其作用域链里推入(第一步创建的活动对象), 此时其作用域链就变成了(ActiveObj, window)
3. 绑定 this, 函数内部的 this 默认指向全局对象 window / global, 可用 with call apply 修改 this 绑定的作用域

标识符解析:

就是一个属性的查找过程, 从作用域链中的第一个对象依次往后查找, 若没有返回 undefined

## 闭包

理解闭包, 首先必须理解变量作用域. JavaScript 有两种作用域: 全局作用域和函数作用域. 函数内部可以直接读取全局变量. 如果出于种种原因, 需要得到函数内的局部变量. 正常情况下, 这是办不到的, 只有通过变通方法才能实现. 那就是在函数的内部, 再定义一个函数.

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

闭包就是一个函数能够读取其他函数内部变量的函数. 由于在 JavaScript 语言中, 只有函数内部的子函数才能读取内部变量, 因此可以把闭包简单理解成"定义在一个函数内部的函数". 闭包最大的特点, 就是它可以"记住"诞生的环境, 比如 f2 记住了它诞生的环境 f1, 所以从 f2 可以得到 f1 的内部变量.

闭包的最大用处有两个:

- 一个是可以读取函数内部的变量, 另一个就是让这些变量始终保持在内存中, 即闭包可以使得它诞生环境一直存在.
- 闭包的另一个用处, 是封装对象的私有属性和私有方法.

性能考量:

注意, 外层函数每次运行, 都会生成一个新的闭包, 而这个闭包又会保留外层函数的内部变量, 所以内存消耗很大. 因此不能滥用闭包, 否则会造成性能问题. 如果不是因为某些特殊任务而需要闭包, 在没有必要的情况下, 在其它函数中创建函数是不明智的, 因为闭包对脚本性能具有负面影响, 包括处理速度和内存消耗.

闭包构造三步走:

1. 在函数 fnA 中定义一个函数 fnB
2. 通过调用 fnA 把 fnB 的引用返回并赋值给其他作用域里的变量 c
3. 通过 c 执行 fnB

## 用闭包模拟私有属性方法

诸如 Java 在内的一些语言支持将方法声明为私有的, 即它们只能被同一个类中的其它方法所调用. 对此, JavaScript 并不提供原生的支持, 但是可以使用闭包模拟私有方法. 私有方法不仅仅有利于限制对代码的访问: 还提供了管理全局命名空间的强大能力, 避免非核心的方法污染了代码的公共接口部分.

下面的示例展现了如何使用闭包来定义公共函数, 且其可以访问私有函数和变量. 这个方式也称为 模块模式(module pattern):

```JavaScript
var makeCounter = function(){
  var privateCounter=0;
  function changeBy(v){
    privateCounter+=v;
  }
  return {
    increment: function(){
      changeBy(1);
    },
    decrement: function(){
      changeBy(-1);
    },
    value: function(){
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

## Javascript 回收机制

js 垃圾回收机制:

- 标记法
- 引用计数法

一个局部的变量在函数执行结束之后才被释放, 所以在遍历的时候用匿名函数加上小括号运行可以解决变量立即释放的问题, 以致不在其执行结束后仍旧可以访问的问题

## 解析 HTML 字符串

```javascript
// 解析 HTML 字符串
const range = document.createRange();
const parse = range.createContextualFragment.bind(range);

const rawHtml = `<ul><li>1</li><li>2</li><li>3</li></ul>`;
document.body.appendChild(parse(rawHtml));
```

## 合并数组

```javascript
const arr1 = [1, 2, 3];
const arr2 = [2, 3, 4];

// result: [1, 2, 3, 2, 3, 4]
const mergeArr = [...arr1, ...arr2];
```

## 合并多个对象

```javascript
const o1 = { a: 1 };
const o2 = { b: 2 };
const o3 = { c: 3 };

// result: { a: 1, b: 2, c: 3 }
const obj = Object.assign(o1, o2, o3);

// 或者
// result: { a: 1, b: 2, c: 3 }
const obj = { ...a, ...b, ...c };
```

## 检测一个对象是否为空

```javascript
function isEmptyObject(obj) {
  return Object.keys(obj).length === 0;
}
```

## 生成介于两个数之间的随机数

```javascript
function random(max, min) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
```

## 在循环中缓存 array.length

这个技巧很简单, 这个在处理一个很大的数组循环时, 对性能影响将是非常大的. 基本上, 大家都会写一个这样的同步迭代的数组:

```JavaScript
for(let i = 0; i < array.length; i++) {
    console.log(array[i]);
}
```

如果是一个小型数组, 这样做很好, 如果你要处理的是一个大的数组, 这段代码在每次迭代都将会重新计算数组的大小, 这将会导致一些延误. 为了避免这种现象出现, 可以将 array.length 做一个缓存:

```JavaScript
const length = array.length;
for(let i = 0; i < length; i++) {
    console.log(array[i]);
}
```

你也可以写在这样:

```JavaScript
for(let i = 0, length = array.length; i < length; i++) {
    console.log(array[i]);
}
```

## 数组元素的洗牌

对于数组元素的洗牌, 不需要使用任何外部的库, 比如 Lodash, 只要这样做:

```JavaScript
const list = [1, 2, 3]

list.sort(() => Math.random() - 0.5);

// [ 3, 2, 1 ]
console.log(list);
```

## 替换所有

String.replace()函数允许你使用字符串或正则表达式来替换字符串, 本身这个函数只替换第一次出现的字符串, 不过你可以使用正则表达多中的/g 来模拟 replaceAll()函数功能:

```JavaScript
const str = "twice third";

// twIce third
const str1 = str.replace(/i/, "I");
// twIce thIrd
const str2 = str.replace(/i/g, 'I');
```

## 数组截断

这个小技巧主要用来锁定数组的大小, 如果用于删除数组中的一些元素来说, 是非常有用的. 例如, 你的数组有 10 个元素, 但你只想只要前五个元素, 那么你可以通过 array.length=5 来截断数组. 如下面这个示例:

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

## 获取数组中最后一个元素

Array.prototype.slice(begin,end)用来获取 begin 和 end 之间的数组元素. 如果你不设置 end 参数, 将会将数组的默认长度值当作 end 值. 但有些同学可能不知道这个函数还可以接受负值作为参数. 如果你设置一个负值作为 begin 的值, 那么你可以获取数组的最后一个元素. 如:

```JavaScript
const arr = [1, 2, 3, 4, 5, 6];
// [6]
arr.slice(-1);

// [5,6]
arr.slice(-2);
```

## DOM 有些操作

```javascript
// 兄弟元素
[...el.parentNode.children].filter((child) => child !== el);

// 前一个元素
el.previousElementSibling;

// 后一个元素
el.nextElementSibling;

// 获得匹配元素的第一个祖先元素
// 注意: 它自己是它的第一个祖先元素
el.closest(selector);

// 获取给定元素的祖元素集合, 不包括元素本身和最后一个祖元素
function parentsUntil(el, selector) {
  const result = [];
  el = el.parentNode;

  while (el && !el.matches(selector)) {
    result.push(el);
    el = el.parentNode;
  }

  return result;
}

// Form
document.querySelector("#input").value;
```

## node 中使用 axios 库下载文件

```javascript
async function downLoadFile(url, dir) {
  try {
    const fName = url.split("/").pop();
    const filePath = path.resolve(__dirname, dir, fName);
    const writer = fs.createWriteStream(filePath);
    const response = await axios({
      url: url,
      method: "get",
      responseType: "stream",
    });

    response.data.pipe(writer);
    return new Promise((resolve, reject) => {
      writer.on("finish", (e) => {
        resolve();
      });
      writer.on("error", (e) => {
        console.log("error:", e);
        reject();
      });
    });
  } catch (e) {
    console.error(e);
  }
}
```

## javascript 获取或者设置 DOM 属性

```javascript
// 获取
el.getAttribute("foo");

// 设置
el.setAttribute("foo", "bar");

// 获取data-属性
el.getAttribute("data-foo");

// 获取一个元素上所有 data-* 属性
el.dataset;

// 设置data-属性
el.dataset["foo"] = "bar";
```

## javascript 与 css

```javascript
// 获取元素样式
// null 的意思是不返回伪类元素
window.getComputedStyle(el, null);

// 设置元素样式
el.style.color = "#ff0011";

// 添加类
el.classList.add(className);

// 移除类
el.classList.remove(className);

// 判定是否包含具体类
el.classList.contains(className);

// toggle class
el.classList.toggle(className);
```

## 使用!!操作符转换布尔值

有时候我们需要对一个变量查检其是否存在或者检查值是否有一个有效值, 如果存在就返回 true 值. 为了做这样的验证, 我们可以使用!!操作符来实现是非常的方便与简单. 对于变量可以使用!!variable 做检测, 只要变量的值为:0, null, " ", undefined 或者 NaN 都将返回的是 false, 反之返回的是 true. 比如下面的示例:

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

// 这个也适用于Date, 在本例中, 它将返回的是时间戳数字:
// 1461288164385
+new Date() //
```

## 使用`||`运算符

在 ES6 中有默认参数这一特性. 为了在老版本的浏览器中模拟这一特性, 可以使用`||`操作符, 并且将将默认值当做第二个参数传入. 如果第一个参数返回的值为 false, 那么第二个值将会认为是一个默认值. 如下面这个示例:

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

## 将 NodeList 转换成数组

如果你运行 document.querySelectorAll("p")函数时, 它可能返回 DOM 元素的数组, 也就是 NodeList 对象. 但这个对象不具有数组的函数功能, 比如 sort(), reduce(), map(), filter()等. 为了让这些原生的数组函数功能也能用于其上面, 需要将节点列表转换成数组. 可以使用[].slice.call(elements)来实现:

```JavaScript
// elements is NodeList
const elements = document.querySelectorAll("p");

// Now the NodeList is an array
const arr1 = [].slice.call(elements);

// This is another way of converting NodeList to Array
const arr2 = Array.from(elements);
```

## javascript 计算 DOM 宽高

```javascript
// 宽度计算
// 含 scrollbar
window.innerWidth;
// 不含 scrollbar
window.document.documentElement.clientWidth;

// 高度它们是一致的
window.innerHeight;
window.document.documentElement.clientHeight;

// Document height
const body = document.body;
const html = document.documentElement;
const height = Math.max(body.offsetHeight, body.scrollHeight, html.clientHeight, html.offsetHeight, html.scrollHeight);

// Element height
// 精确到整数(border-box 时为 height - border 值, content-box 时为 height + padding 值)
el.clientHeight;

// 精确到小数(border-box 时为 height 值, content-box 时为 height + padding + border 值)
el.getBoundingClientRect().height;

// 获取元素滚动条垂直位置
document.documentElement.scrollTop;
```
