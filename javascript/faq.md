# javascript FAQ

### 高阶函数

高阶函数是指至少满足下列条件之一的函数

- 函数可以作为参数被传递
- 函数可以作为返回值输出

### **proto**, prototype, constructor

①**proto**和 constructor 属性是对象所独有的；
② prototype 属性是函数所独有的，因为函数也是一种对象，所以函数也拥有**proto**和 constructor 属性。
**proto**属性的作用就是当访问一个对象的属性时，如果该对象内部不存在这个属性，那么就会去它的**proto**属性所指向的那个对象（父对象）里找，一直找，直到**proto**属性的终点 null，再往上找就相当于在 null 上取值，会报错。通过**proto**属性将对象连接起来的这条链路即我们所谓的原型链。
prototype 属性的作用就是让该函数所实例化的对象们都可以找到公用的属性和方法，即 f1.**proto** === Foo.prototype。
constructor 属性的含义就是指向该对象的构造函数，所有函数（此时看成对象了）最终的构造函数都指向 Function。

### 创建自定义事件

> [CustomEvent](https://developer.mozilla.org/zh-CN/docs/Web/API/CustomEvent)

```javascript
let customEvent = new CustomEvent("custom-evt", {
  detail: { someKey: "value.." },
});

document.dispatchEvent(customEvent);

// 捕获事件
document.addEventListener("custom-evt", function (e) {
  console.log(e.detail);
});
```

### for..in for...of 却别

TODO

### Node.textContent 属性可以表示一个节点及其后代节点的文本内容

```javascript
var text = element.textContent;
element.textContent = "this is some sample text";

// 给定如下HTML:
//   <div id="divA">This is <span>some</span> text</div>

// 获得文本内容:
var text = document.getElementById("divA").textContent;
// |text| is set to "This is some text".

// 设置文本内容:
document.getElementById("divA").textContent = "This is some text";
// divA的HTML现在是这样的:
// <div id="divA">This is some text</div>
```

### 什么是弱类型的

Loose typing means that variables are declared without a type.
弱类型指的是在申明变量的时候不指定变量的类型

```JavaScript
/*JavaScript Example(loose typing)*/
var a=13;// Number declaration
var b="thirteen";// String declaration
```

```java
/*Java Example(Strong typing)*/
int a=13; // int declaration
string b="thirteen"; // String declaration
```

### 什么叫纯函数

一个函数的返回结果只依赖于它的参数，并且在执行过程里面没有副作用，我们就把这个函数叫做纯函数。

### 什么叫 shim

shim 垫片的意思，指把一个库引入另一个旧的浏览器，然后用旧的 API 来实现一些新的 API 功能。

### DOM 的操作

```
  // DOM查找
  let ul = document.querySelector('ul');
  let firstChild = document.querySelector('ul li:first-child');

  // DOM创建 Element
  // element = document.createElement(tagName[, options]);
  let newLi = document.createElement('li');
  newLi.textContent = '5 ipsum amet.';

  // DOM 创建 textNode
  let textNode = document.createTextNode('pu guohong');
  document.body.appendChild(textNode);

  // DOM 添加
  // element.appendChild(aChild);
  ul.appendChild(newLi);

  // DOM 替换
  // 返回的是被移除的DOM
  // replacedNode = parentNode.replaceChild(newChild, oldChild);
  let r = ul.replaceChild(newLi, firstChild);
  console.log(r);

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
