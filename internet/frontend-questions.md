## === 跟 == 区别

`==`运算符是在进行必要的类型转换后, 再比较. `===`
运算符不会进行类型转换, 所以如果两个值不是相同的类型, 会直接返回 false.

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

## 请描述事件冒泡

当一个事件在 DOM 元素上触发时, 如果有事件监听器, 它将尝试处理该事件, 然后事件冒泡到其父级元素, 并发生同样的事情. 最后直到事件到达祖先元素(HTML 根元素). 事件冒泡是实现事件委托的原理(event delegation).

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

## 作用域链 Scope Chain

javascript 有两种作用域类型, 全局作用域, 局部作用域, 作用域决定了变量的可见性. 函数内部申明的变量为局部变量, ES6 中花括号中申明的变量也为局部变量, 函数之外申明的变量为全局变量. 内部函数可以访问外部函数变量以及全局变量的这种机制, 用链式查找决定哪些数据能被访问.

每一个函数运行的时候会拥有一个自己的执行环境, 每个执行环境都存储这个环境里面定义的变量和函数, 当这个执行环境的所有代码执行完了之后, 该环境会被销毁, 保存在其中的所有变量和函数定义也被销毁掉了, 我们把这样一个执行环境称为一个作用域.

全局 window/global 是最大的作用域, 全局里声明的函数是次一级的作用域, 在次一级函数里面可以访问到全局申明的变量和函数, 但在全局中访问不到次一级函数里面申明的函数和变量. 同样在次一级函数里面申明的函数可以访问外面函数申明的变量和函数, 这样一层一层的递进, 就成了一个链条, 也就是作用域链.

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

## 说下客户端缓存有哪些以及区别

- cookie
- sessionStorage
- localStorage

## sessionStorage 跟 localStorage 区别

localStorage 生命周期是永久，sessionStorage 生命周期为当前窗口或标签页

## 常见的 web 页面优化的手段有哪些

- 合并多个文件为单个文件, 减少 http 请求
- 压缩资源代码, 以减少体积
- 图片懒加载

## 盒模型

CSS 盒模型描述了以文档树中的元素而生成的矩形框，并根据排版模式进行布局（box-sizing）。每个盒子都有一个内容区域（例如文本，图像等）以及周围可选的 padding（内边距）、border（边框） 和 margin（外边距） 区域。

## Vue 中 key 的作用

key 是给每一个 VNODE 的唯一 id, 依靠 key, 我们的 diff 操作可以更准确, 更快速.

## Vue 双向绑定数据的原理

使用的是发布-订阅的模式, 通过 Object.defineProperty() 来劫持各个属性的 setter, getter, 在数据变动时发布消息给订阅者, 触发相应监听回调.

## Vue 生命周期

从 Vue 实例创建, 运行, 到销毁的整个过程叫做 Vue 生命周期, 在这个过程中会伴随着各种各样的事件发生, Vue 会运行一些叫做生命周期钩子的函数, 这给了用户在不同阶段添加自己的代码的机会.

- 创建期间的生命周期函数:
  - beforeCreate: 实例正在内存中被创建, 此时, 还没有初始化好 data 和 methods 属性
  - created: 实例已经在内存中创建好了, 此时 data 和 methods 已经创建完毕, 此时还没有开始编译模板
  - beforeMount: 此时已经完成了模板的编译并生成虚拟 DOM(vm.$el), 但是还没有挂载到真实的 DOM 上
  - mounted: 此时, 已经将虚拟 DOM 挂载到真实 DOM 上了
- 运行期间的生命周期函数:
  - beforeUpdate: 状态更新之前执行此函数, 此时 data 中的状态值是最新的, 但是界面上显示的数据是旧的, 因为此时还没有开始运行渲染函数
  - updated: 实例更新完毕之后调用此函数, 此时 data 中的状态值和界面上显示的数据一致, 界面已经被重新渲染好了
- 销毁期间的生命周期函数(当`vm.$destroy()`被调用的时候):
  - beforeDestroy: 实例销毁之前调用. 在这一步, 实例仍然完全可用.
  - destroyed: Vue 实例销毁后调用. 调用后, Vue 实例指向的所有东西都会解绑定, 所有的事件监听器会被移除, 所有的子实例一并被销毁.

## $nextTick 是做什么的

$nextTick 是将回调延迟到下次 DOM 更新循环结束之后在执行, 使用 $nextTick 可以获取更新后的 DOM.

## 什么是虚拟 DOM

虚拟 DOM (Virtual DOM)是真实 DOM 在内存中的表示, 一般指的是用 JavaScript 对 真实 DOM 的一种抽象 更宽泛的来说, VDOM 就是 Javascript 对象, 然后根据这个对象构建出真实 DOM 树.

虚拟 DOM 的优点:

- 减少 DOM 的操作, 虚拟 dom 可以将多次操作合并为一次操作, 减少对真实 DOM 操作的次数
- 声明式, 开发者只关心数据的变动, 对 DOM 的繁琐操作让类库去做(比如 ReactDOM, Vue)

DOM diff:

DOM diff 是两个虚拟 DOM 树对比的算法，diff 算法仅在两个树的同级的虚拟节点之间做比较, 递归地进行比较, 最终实现整个 DOM 树的更新. diff 算法的三个步骤:

- 用 JavaScript 对象来表示 DOM 树的结构, 然后根据这个对象构建出真实的 DOM 树并插入到文档
- 当状态变化的时候, 重新构造一棵新的对象树, 然后用新的树跟旧的树进行比较, 记录两棵树的差异
- 最后把所记录的差异应用到所构建的真正 DOM 树上, 这样就完成了一次视图更新

## vue 的修饰符有哪些？

.stop
.prevent
.capture
.self
.once
.passive
.right
.center
.middle
.alt

## keep-alive 平时在哪里使用？原理是什么？

使用 keep-alive 包裹动态组件时，会对组件进行缓存，避免组件重新创建
使用有两个场景，一个是动态组件，一个是 router-view

## vuerouter 的两种模式的区别

vue-router 中有三种模式，分别是 hash、history、abstract
abstract 在不支持浏览器的 API 换景使用
hash 模式兼容性好，但是不美观，不利于 SEO
history 美观，historyAPI+popState，但是刷新会出现 404

## 谈谈 Vue 的性能优化有哪些？

数据层级不要过深，合理的设置响应式数据
使用数据时，缓存值的结果，不频繁取值
合理设置 key
v-show(频繁切换性能高)和 v-if 的合理使用
控制组件的粒度 -> Vue 采用组件级别更新
采用函数式组件 -> 函数式组价开销低
采用异步组件 -> 借助 webpack 的分包策略
使用 keep-alive 来缓存组件
虚拟滚动、时间分片等策略
打包优化

## 谈谈你对 Vuex 的理解？

Vuex 是专门为 vue 提供的全局状态管理系统，用于多个组件中的数据共享、数据缓存。
问题：无法持久化。

## 父子组件传值