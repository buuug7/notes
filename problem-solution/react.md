# React

## props, state 区别

As a general rule, use props to configure a component when it renders. Use state to keep track of any component data that you expect to change over time.

一般来说，当组件渲染的时候，使用 props 来配置组件的行为。而使用 state 来跟踪随着时间而变化的组件数据。

## quick try JSX

参考 <https://raw.githubusercontent.com/reactjs/reactjs.org/master/static/html/single-file-example.html>

## 何时使用 Ref

- 管理 dom 的聚焦 focus，文本选择，或者媒体播放的控制等
- 出发命令式的动画
- 与第三方的 DOM 集成
