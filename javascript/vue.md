# vue 相关面试题

## Vue 双向绑定数据的原理

使用的是发布-订阅的模式, 通过 Object.defineProperty() 来劫持各个属性的 setter, getter, 在数据变动时发布消息给订阅者, 触发相应监听回调.

## Vue 中 key 的作用

key 是给每一个 VNODE 的唯一 id, 依靠 key, 我们的 diff 操作可以更准确, 更快速.

## Vue 组件 data 为什么必须是函数

因为 js 本身的特性带来的, 如果 data 是一个对象, 那么由于对象本身属于引用类型, 当我们修改其中的一个属性时, 会影响到所有 Vue 实例的数据. 如果将 data 作为一个函数返回一个对象, 那么每一个实例的 data 属性都是独立的, 就不会相互影响了.

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
  - destroyed: Vue 实例销毁后调用. 调用后, Vue 实例指向的所有东西都会解绑定, 所有的事件监听器会被移除, 所有的子实例也会被销毁.

## $nextTick 是做什么的

$nextTick 是将回调延迟到下次 DOM 更新循环结束之后在执行, 使用 $nextTick 可以获取更新后的 DOM.

## 异步更新队列

Vue 在更新 DOM 时是异步执行的。只要侦听到数据变化，将会开启一个队列，并缓冲在同一事件循环中发生的所有数据变更。如果同一个 watcher 被多次触发，只会被推入到队列中一次。这种在缓冲时去除重复数据对于避免不必要的计算和 DOM 操作是非常重要的。

然后，在下一个的事件循环“tick”中，Vue 刷新队列并执行实际 (已去重的) 工作。Vue 在内部对异步队列尝试使用原生的 Promise.then、MutationObserver 和 setImmediate，如果执行环境不支持，则会采用 setTimeout(fn, 0) 代替。

例如，当你设置 vm.someData = 'new value'，该组件不会立即重新渲染。当刷新队列时，组件会在下一个事件循环“tick”中更新。多数情况我们不需要关心这个过程，但是如果你想基于更新后的 DOM 状态来做点什么，这就可能会有些棘手。虽然 Vue.js 通常鼓励开发人员使用“数据驱动”的方式思考，避免直接接触 DOM，但是有时我们必须要这么做。为了在数据变化之后等待 Vue 完成更新 DOM，可以在数据变化之后使用 Vue.nextTick(callback)。这样回调函数将在 DOM 更新完成后被调用。

```javascript
this.$nextTick().then(() => {
  // dom some operation with DOM
});
```

## 什么是虚拟 DOM

虚拟 DOM (Virtual DOM)是真实 DOM 在内存中的表示, 一般指的是用 JavaScript 对 真实 DOM 的一种抽象 更宽泛的来说, VDOM 就是 Javascript 对象, 然后根据这个对象构建出真实 DOM 树.

虚拟 DOM 的优点:

- 减少 DOM 的操作, 虚拟 dom 可以将多次操作合并为一次操作, 减少对真实 DOM 操作的次数
- 声明式, 开发者只关心数据的变动, 对 DOM 的繁琐操作让类库去做(比如 ReactDOM, Vue)

DOM diff:

DOM diff 是两个虚拟 DOM 树对比的算法，d iff 算法仅在两个树的同级的虚拟节点之间做比较, 递归地进行比较, 最终实现整个 DOM 树的更新. diff 算法的三个步骤:

- 用 JavaScript 对象来表示 DOM 树的结构, 然后根据这个对象构建出真实的 DOM 树并插入到文档
- 当状态变化的时候, 重新构造一棵新的对象树, 然后用新的树跟旧的树进行比较, 记录两棵树的差异
- 最后把所记录的差异应用到所构建的真正 DOM 树上, 这样就完成了一次视图更新

## diff 算法

diff 算法是进行虚拟节点元素的对比, 并返回一个 patchs 对象, 用来存储两个节点不同的地方, 最后用 patchs 记录的信息去局部更新 Dom.

两个树如果完全比较的话需要时间复杂度为 O(n^3), 如果对 O(n^3)不太清楚的话建议去网上搜索资料. 而在 Diff 算法中因为考虑效率的问题, 只会对同层级元素比较, 时间复杂度则为 O(n), 说白了就是深度遍历, 并比较同层级的节点.

```javascript
// 判断两棵Virtual Dom Tree 差异
// 把差异更新到真实Dom中去
let patchs = diff(oldTree, newTree); //获取两棵Virtual Dom Tree 差异
patch(ulDom, patchs); //找到对应的真实dom, 进行部分渲染
```

## vue 优化

- 多用计算属性, 避免过度使用 watch
