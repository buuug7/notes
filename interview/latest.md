## 说一下 Vue 的双向绑定数据的原理

使用的是发布-订阅的模式，通过 Object.defineProperty() 来劫持各个属性的 setter，getter，在数据变动时发布消息给订阅者，触发相应监听回调。

## dom 事件以流的形式传递，先从最外层元素向最内层元素流过，此过程称为捕获，到达最内层元素后又重新向最外层元素流动，此过程称为冒泡。

通过 addEventListener 绑定事件，默认是在冒泡阶段触发事件，如果 useCapture 设置为 true，则事件是在捕获阶段触发。一个事件只会触发一次，要么冒泡阶段，要么捕获阶段。

## JS 运行机制

JS 执行是单线程的，它是基于事件循环的。事件循环大致分为以下几个步骤:

1. 所有同步任务都在主线程上执行，形成一个执行栈（execution context stack）。
2. 主线程之外，还存在一个"任务队列"（task queue）。只要异步任务有了运行结果，就在"任务队列"之中放置一个事件。
3. 一旦"执行栈"中的所有同步任务执行完毕，系统就会读取"任务队列"，看看里面有哪些事件。那些对应的异步任务，于是结束等待状态，进入执行栈，开始执行。
4. 主线程不断重复上面的第三步。

## Vue 中 key 的作用

key 是给每一个 vnode 的唯一 id,依靠 key,我们的 diff 操作可以更准确、更快速

## Vue 组件 data 为什么必须是函数

因为 js 本身的特性带来的，如果 data 是一个对象，那么由于对象本身属于引用类型，当我们修改其中的一个属性时，会影响到所有 Vue 实例的数据。如果将 data 作为一个函数返回一个对象，那么每一个实例的 data 属性都是独立的，不会相互影响了

## vue 生命周期的理解

vue 实例有一个完整的生命周期，生命周期也就是指一个实例从开始创建到销毁的这个过程。

- beforeCreate() 在实例创建之间执行，数据未加载状态
- created() 在实例创建、数据加载后，能初始化数据，dom 渲染之前执行
- beforeMount() 虚拟 dom 已创建完成，在数据渲染前最后一次更改数据
- mounted() 页面、数据渲染完成，真实 dom 挂载完成
- beforeUpdated() 重新渲染之前触发
- updated() 数据已经更改完成，dom 也重新 render 完成,更改数据会陷入死循环
- beforeDestroy() 和 destroyed() 前者是销毁前执行（实例仍然完全可用），后者则是销毁后执行

## 说说你对 MVVM 的理解

它是将“数据模型数据双向绑定”的思想作为核心，因此在 View 和 Model 之间没有联系，通过 ViewModel 进行交互，而且 Model 和 ViewModel 之间的交互是双向的，因此视图的数据的变化会同时修改数据源，而数据源数据的变化也会立即反应在 view 层。

优点是在表单交互较多的场景下，会简化大量与业务无关的代码。
缺点就是无法追踪局部状态的变化，增加了出错时 debug 的难度

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

## === 跟 == 区别

`==`运算符是在进行必要的类型转换后，再比较。`===`运算符不会进行类型转换，所以如果两个值不是相同的类型，会直接返回 false。

## 请解释变量提升（hoisting）

变量提升（hoisting）是用于解释代码中变量声明行为的术语。使用 var 关键字声明或初始化的变量，会将声明语句“提升”到当前作用域的顶部。 但是，只有声明才会触发提升，赋值语句（如果有的话）将保持原样。函数声明会使函数体提升，但函数表达式（以声明变量的形式书写）只有变量声明会被提升。

## 请描述事件冒泡

当一个事件在 DOM 元素上触发时，如果有事件监听器，它将尝试处理该事件，然后事件冒泡到其父级元素，并发生同样的事情。最后直到事件到达祖先元素。事件冒泡是实现事件委托的原理（event delegation）。

## javascript 设置 cookie

```javascript
// 设置cookie
const now = new Date();
now.setTime(now.getTime() + 24 * 60 * 60 * 1000);
document.cookie = `key=value;expires=${now.toUTCString()};path=/;domain=localhost`;

// 读取cookie
const cookies = document.cooke;
```

## IIFE（立即调用函数表达式）

IIFE（ 立即调用函数表达式）是一个在定义时就会立即执行的 JavaScript 函数。

```javascript
(function () {
  // statements;
})();
```

## 请解释事件委托（event delegation）

事件委托是将事件监听器添加到父元素，而不是每个子元素单独设置事件监听器。当触发子元素时，事件会冒泡到父元素，监听器就会触发。这种技术的好处是：

内存占用减少，因为只需要一个父元素的事件处理程序，而不必为每个后代都添加事件处理程序。
无需从已删除的元素中解绑处理程序，也无需将处理程序绑定到新元素上。

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

## 内存释放

引用类型是在没有引用之后, 通过 v8 的 GC 自动回收, 值类型如果是处于闭包的情况下, 要等闭包没有引用才会被 GC 回收, 非闭包的情况下等待 v8 的新生代 (new space) 切换的时候回收.

## 说说你对盒模型的理解

CSS 盒模型描述了以文档树中的元素而生成的矩形框，并根据排版模式进行布局。每个盒子都有一个内容区域（例如文本，图像等）以及周围可选的 padding、border 和 margin 区域。

## relative、fixed、absolute 和 static 四种定位有什么区别？

经过定位的元素，其 position 属性值必然是 relative、absolute、fixed 或 sticky。

- fixed 元素的默认定位行为，元素会根据正常文档流来定位，设置 TRBL(top right bottom left)属性不会起任何作用。
- relative 元素根据文档的正常流来定位，以它原本的位置作为参考点，通过设置 TRBL(top right bottom left)偏移来定位，它的偏移不会影响其他的元素。
- absolute 元素会从正常文档流中移除，不为元素预留空间，是根据它最近的已定位的祖先元素来定位的, 配合 TRBL(top right bottom left)来定位(如果父元素没有设置 position, 则以浏览器左上角为原点定位)
- sticky 元素根据正常流定位，然后相对于它最近滚动祖先，通过设置 TRBL 的值来偏移。偏移值不会影响任何其他元素的位置。

## 请解释原型继承（prototypal inheritance）的工作原理。

这是一个非常常见的 JavaScript 问题。所有 JS 对象都有一个`__proto__`属性，指向它的原型对象。当试图访问一个对象的属性时，如果没有在该对象上找到，它还会搜寻该对象的原型，以及该对象的原型的原型，依次层层向上搜索，直到找到一个名字匹配的属性或到达原型链的末尾。这种行为是在模拟经典的继承。

## 在经常使用的 ES6 中的特性有哪些

- let ,const
- 箭头函数
- 数组对象的结构析构
- 字符串模板
- set,map
- class
- promise

## 跨域

浏览器的同源策略会导致跨域，这里同源策略又分为以下两种：

- DOM 同源策略：禁止对不同源页面 DOM 进行操作。这里主要场景是 iframe 跨域的情况，不同域名的 iframe 是限制互相访问的。
- XmlHttpRequest 同源策略：禁止使用 XHR 对象向不同源的服务器地址发起 HTTP 请求。

> 只要协议、域名、端口有任何一个不同，都被当作是不同的域，之间的请求就是跨域操作。

为什么要有跨域的限制，浏览器这么做是出于何种原因呢。其实仔细想一想就会明白，跨域限制主要是为了安全考虑。

跨域的解决方式:

1. 跨域资源共享:

CORS 是一个 W3C 标准，全称是”跨域资源共享”（Cross-origin resource sharing）

对于服务器端，需要在 response header 中设置如下两个字段:

```
Access-Control-Allow-Origin:*
Access-Control-Allow-Methods:*
Access-Control-Allow-Headers:*
Access-Control-Allow-Credentials: true
```

2. jsonp 实现跨域:基本原理就是通过动态创建 script 标签,然后利用 src 属性进行跨域。

3. 服务端代理: 使用 nginx 代理下原始接口，在返回的时候添加额外的跨越响应头

## 请描述一下 javascript 的闭包

[闭包](../javascript/faq.md#闭包)

## 请描述一下 javascript 的作用域链（Scope Chain）

javascript 有两种作用域类型，局部作用域跟全局作用域，作用域决定了变量的可见性。函数内部申明的变量为局部变量，函数之外申明的变量为全局变量。内部函数可以访问外部函数变量以及全局变量的这种机制，用链式查找决定哪些数据能被内部函数访问。

每一个函数运行的时候会拥有一个自己的执行环境，每个执行环境都拥有一个位置来存储这个环境里面定义的变量和函数，当这个执行环境的所有代码执行完了之后，该环境被销毁，保存在其中的所有变量和函数定义也被销毁掉了，我们可以把这一个执行环境称为一个作用域。

全局 window/global 是最大的作用域，全局里声明的函数是次一级的作用域，在次一级函数里面可以访问到全局申明的变量和函数，但在全局中访问不到次一级函数里面申明的函数和变量。同样在次一级函数里面申明的函数可以访问外面函数申明的变量和函数，这样一层一层的递进，就成了一个链条，也就是作用域链。

## 说下客户端缓存有哪些, 它们有什么区别

- cookie
- sessionStorage
- localStorage

## 常见的 web 页面优化的手段有哪些

- 合并多个文件为单个文件，减少 http 请求
- 压缩资源代码，以减少体积
- 图片懒加载

## JavaScript 中作用域和变量提升

[scope-hoisting](../javascript/scope-hoisting.md)
