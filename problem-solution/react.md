# React

## props, state 区别

As a general rule, use props to configure a component when it renders. Use state to keep track of any component data that you expect to change over time.

一般来说，当组件渲染的时候，使用 props 来配置组件的行为。而使用 state 来跟踪随着时间而变化的组件数据。

## callback 跟 useRef，React.createRef 区别

callback ref 中当前 ref 存储的就是 dom 的引用，不需要在通过 ref.current 来去访问，其他几个都是需要使用 ref.current 属性去访问引用的 dom

## function component 使用 callback ref

```javascript
function MyInput() {
  let inputRef = null;

  return (
    <div>
      <button
        onClick={(e) => {
          inputRef.focus();
        }}
      >
        focus input
      </button>
      <input type="text" ref={(node) => (inputRef = node)} />
    </div>
  );
}
```

## hight-order component（HOC）高阶组件

具体来说，一个高阶组件是接受一个组件返回一个新组建的函数。

```javascript
const EnhancedComponent = higherOrderComponent(WrappedComponent);
```

组件是将 props 转换为 UI，而高阶组件是将组件转换为另外一个组件。
