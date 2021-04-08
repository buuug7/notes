# vue 相关面试题

## 说一下 Vue 的双向绑定数据的原理

使用的是发布-订阅的模式，通过 Object.defineProperty() 来劫持各个属性的 setter，getter，在数据变动时发布消息给订阅者，触发相应监听回调。
