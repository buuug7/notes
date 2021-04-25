# vue 相关面试题

## Vue 双向绑定数据的原理

使用的是发布-订阅的模式，通过 Object.defineProperty() 来劫持各个属性的 setter，getter，在数据变动时发布消息给订阅者，触发相应监听回调。

## Vue 中 key 的作用

key 是给每一个 VNODE 的唯一 id,依靠 key,我们的 diff 操作可以更准确、更快速

## Vue 组件 data 为什么必须是函数

因为 js 本身的特性带来的，如果 data 是一个对象，那么由于对象本身属于引用类型，当我们修改其中的一个属性时，会影响到所有 Vue 实例的数据。如果将 data 作为一个函数返回一个对象，那么每一个实例的 data 属性都是独立的，不会相互影响了

## Vue 生命周期

vue 实例有一个完整的生命周期，生命周期也就是指一个实例从开始创建到销毁的这个过程。

- beforeCreate 在实例创建之前执行，数据未加载状态
- created 在实例创建、数据加载后，能初始化数据，dom 渲染之前执行
- beforeMount 虚拟 dom 已创建完成，在数据渲染前最后一次更改数据
- mounted 页面、数据渲染完成，真实 dom 挂载完成
- beforeUpdated 重新渲染之前触发
- updated 数据已经更改完成，dom 也重新 render 完成,更改数据会陷入死循环
- beforeDestroy 和 destroyed 前者是销毁前执行（实例仍然完全可用），后者则是销毁后执行
