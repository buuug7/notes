# React

## 资源

- https://reactjs.org/
- https://github.com/Wavez/react-hooks-lifecycle
- https://github.com/wojtekmaj/react-lifecycle-methods-diagram
- https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html
- [react single file example](https://gist.github.com/buuug7/d8a812ea0f2b8c909caceec8227f1759)

## react single file example

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>React single file example</title>
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>

    <!-- Don't use this in production: -->
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  </head>
  <body>
    <div id="root"></div>
    <script type="text/babel">
      const App = function () {
        return <h1>Hello, world</h1>;
      };

      const root = ReactDOM.createRoot(document.getElementById("root"));
      root.render(<App />);
    </script>
    <!--
      Note: this page is a great way to try React but it's not suitable for production.
      It slowly compiles JSX with Babel in the browser and uses a large development build of React.

      Read this section for a production-ready setup with JSX:
      https://reactjs.org/docs/add-react-to-a-website.html#add-jsx-to-a-project

      In a larger project, you can use an integrated toolchain that includes JSX instead:
      https://reactjs.org/docs/create-a-new-react-app.html

      You can also use React without JSX, in which case you can remove Babel:
      https://reactjs.org/docs/react-without-jsx.html
    -->
  </body>
</html>
```

## React 两个工作阶段

- render phase 渲染阶段, 调用 render, 然后将结果与上次渲染结果作比较
- commit phase 提交阶段, 发生在 React 插入, 更新以及删除 DOM 节点的时候, 此阶段会调用生命周期的 componentDidUpdate 或者 componentDidMount.

## 什么是 React(what's React) ?

React is a declarative, efficient, and flexible JavaScript library for building user interfaces. It lets you compose complex UIs from small and isolated pieces of code called "components".

React 是一个声明式, 高效且灵活的用于构建用户界面的 JavaScript 库. 它让你使用一种被称为组件的代码片段, 然后组合他们来构建复杂的用户界面.

## React features

- 声明式(declarative), 让开发者只关心数据, 当数据变动时 React 能高效更新和渲染视图.
- 组件化(component based), 构建管理其自身状态的独立组件, 然后对其组合以构成更复杂的 UI.
- 跨平台(learn once, write anywhere)，编写的代码在各个平台都可以运行

## 什么是组件(what's React component) ?

组件指的是可复用的代码片段. 一个接受 props 参数, 并且返回一个 **React element** 的函数被称为组件. **React element** 用来描述在屏幕上所看到的内容, 通常 React element 使用 JSX 来编写.

## 什么是 JSX(what's JSX) ?

JSX 是 javascript 的语法扩展, 它可以让你在 javascript 文件中书写类似于 HTML 风格的标记语法. 在构建的时候被转换成 `React.createElement`, 可以理解为 JSX 是 `React.createElement`语法糖.

```javascript
React.createElement(type, [props], [. ..children]);
```

`React.createElement()`会创建一个 React element, 其中参数 type 可以为普通的 dom tag 或者另一个 React component, 用 JSX 书写的代码会被翻译成 `React.createElement()`

```javascript
<div className="app">
  <h4>Hello world</h4>
  <p>lorem ipsum dolor site amet</p>
</div>
```

// equivalent to

```javascript
React.createElement("div", { className: "app" }, React.createElement("h1", {}, "Hello world"), React.createElement("p", {}, "lorem ipsum dolor site"));
```

注意:

- 由于 JSX 会编译成 React.createElement, 确保 React 在 JSX 代码作用域内
- 自定义的组件必须以大写字母开头
- props 默认值为 true, 比如 `<User age />`默认 age 会为 true
- 可以使用 `...` 展开运算符在 JSX 中传递整个 props 对象 `<MyComponent {. ..props} />`
- 函数表达式可以作为 JSX 子元素
- true, false, undefined, null 是合法的子元素, 但是不会渲染, 如果想渲染这些值, 请将它们转换为字符串

## React 哲学

- 将 UI 划分为组件
- 用 react 创建一个静态版本
- 确定 UI 的最小状态
- 确定 state 存放在哪里
- 添加反向数据流(让内层组件能改变上层组件的 state)

## React key

key 是组件的一个特殊属性, key 帮助 React 识别被修改, 删除, 添加的 item, 使得 React diff 运算更加高效.

## Refs & DOM

ref 是 React 组件的一个特殊属性, 通常用该属性来引用一个组件的实例或者指向特定 DOM. 创建的方式有:

- React.useRef()
- React.createRef()
- callback 方式, 当被挂载到 DOM 上的时候, 会执行传递给 ref 的回调函数, 然后在回调函数中把当前 ref 保存到一个变量中

何时使用 Ref:

- 管理 dom 的聚焦 focus, 文本选择, 或者媒体播放的控制等
- 触发命令式的动画
- 与第三方的 DOM 集成

function component 使用 React.useRef 创建 ref:

```javascript
function MyInput() {
  const inputRef = React.createRef();
  return (
    <div className="my-input">
      <input type="text" ref={inputRef} />
      <button
        onClick={() => {
          inputRef.current.focus();
        }}
      >
        focus input
      </button>
    </div>
  );
}
```

function component 使用 callback ref:

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

## React class component 生命周期

组件的生命周期:

```
# Mounting:
-> constructor()
-> static getDerivedStateFromProps()
-> render()
-> componentDidMount()

# Updating:
-> static getDerivedStateFromProps()
-> shouldComponentUpdate()
-> render()
-> getSnapshotBeforeUpdate()
-> componentDidUpdate()

# Unmounting:
-> componentWillUnmount()

# Error Handling:
-> static getDerivedStateFromError()
-> componentDidCatch()
```

## context 上下文

context 提供了一种在组件树中无需显式层层传递数据而共享数据的方式. 但是请谨慎使用它, 因为它让组件复用变得更加困难, 何时使用 context 取决于你, 但有一点需要说明的是, 如果你仅仅只是想避免在多个组件层级中传递数据, 那么**组合组件**的方式通常是比 context 更加简单高效的一个选择.

context 中默认值只有在组件它所处的上层组件树中的 **provider** 所提供的 value 没有匹配的时候才会使用. 如果想从子组件中更新 context, 可以在 context 中声明一个函数然后在子组件中调用该函数更新 context.

```javascript
import React from "react";

export const UserContext = React.createContext({
  user: null,
  updateUser: () => {},
});

export const PostsContext = React.createContext({
  posts: [],
  updatePosts: () => {},
});

export function User() {
  const { user, updateUser } = React.useContext(UserContext);
  return (
    <div className="User">
      <p>
        my name is {user.name} and {user.age} years old.
      </p>
      <button
        onClick={() => {
          updateUser({
            ...user,
            age: ++user.age,
          });
        }}
      >
        Change user
      </button>
    </div>
  );
}

export function Posts() {
  const { posts, updatePosts } = React.useContext(PostsContext);
  return (
    <ul className="Posts">
      <h4>My posts: </h4>
      {posts.map((item) => (
        <li key={item.id}>{item.title}</li>
      ))}
      <button
        onClick={() => {
          updatePosts([
            ...posts,
            {
              id: ++posts.length,
              title: "random title is generated",
            },
          ]);
        }}
      >
        Add post
      </button>
    </ul>
  );
}

export default function App() {
  const [user, setUser] = React.useState({ name: "Tom", age: 8 });
  const [posts, setPosts] = React.useState([
    {
      id: 1,
      title: "where ca we go next? ",
    },
    {
      id: 2,
      title: "have a good weekday",
    },
  ]);

  const userContext = {
    user: user,
    updateUser: (user) => {
      setUser(user);
    },
  };

  const postsContext = {
    posts: posts,
    updatePosts: setPosts,
  };

  return (
    <div className="App">
      <UserContext.Provider value={userContext}>
        <PostsContext.Provider value={postsContext}>
          <User />
          <Posts />
        </PostsContext.Provider>
      </UserContext.Provider>
    </div>
  );
}
```

## Error boundary 错误边界

为了解决部分 UI 错误而不引起整个应用奔溃, React 16 引入了错误边界来处理这些问题. 错误边界是一种 React 组件, 用来捕获发生在其子组件树中的错误, 打印错误, 并显示备用 UI. React 不支持使用 hooks 的方式写 error boundary.

注意在开发环境中有可能无法测试错误边界的情况, 请使用生产测试. 使用 create-react-app 作为脚手架的请在`npm run build`之后测试.

#### 错误边界无法捕获的错误有下面这些

- 事件处理器错误
- 异步代码(setTimeout, requestAnimationFrame 等)
- 服务端渲染
- 它自身抛出的错误

#### 关于未捕获的错误(Uncaught Error)行为

要注意未被任何错误边界捕获的错误会导致整个组件树被卸载, 这是 React 16 后默认的行为.

#### 错误边界位置

错误边界应该放置在哪里? 具体粒度由开发者自己决定, 为了简单起见, 你可以将其放置在最顶层的路由.

#### 如何捕获事件处理器发生的错误

关于事件处理器中发生的错误, 开发者可以使用 try/catch 语句来捕获.

#### 错误边界的例子

```jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log(error);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}

function App() {
  return (
    <div className="App">
      <div>Hello world</div>
      <MyErrorBoundary>
        <SomeComponent />
      </MyErrorBoundary>
    </div>
  );
}
```

## Forwarding refs 转发 refs

Forwarding refs 是一个让组件接受一个 ref(引用), 然后将其向下传递给子组件的技术. 通过调用 `React.forwardRef` 对组件进行 ref 转发. forwardRef 会基于一个组件创建一个新组件, 这个新组件能够将其接收到的 ref 属性转发到其组件树下的另一个组件中.

https://codesandbox.io/p/sandbox/test-react-forward-ref-jstr3t

#### 将 DOM 节点暴露给父组件

```jsx
import { forwardRef, useRef } from "react";

const MyInput = forwardRef(function MyInput(props, ref) {
  return <input {...props} ref={ref} />;
});

export default function App() {
  const ref = useRef(null);
  return (
    <div>
      <MyInput ref={ref} />
      <button
        onClick={() => {
          ref.current.focus();
        }}
      >
        Focus
      </button>
    </div>
  );
}
```

#### 在多个组件中层层转发 ref，比如在高阶组件中转发 ref 到最终的 DOM 节点

```javascript
import { forwardRef, useRef } from "react";

const MyInput = forwardRef(function MyInput(props, ref) {
  return <input {...props} ref={ref} />;
});

const MyField = forwardRef(function MyField(props, ref) {
  return <MyInput {...props} ref={ref} />;
});

// 1. Form 组件中通过 useRef 定义了一个 ref
// 2. MyField 组件将 Form 组件中定义的 ref 转发给子组件 MyInput
// 3. MyInput 组件将接收到的 ref 转发给内部的 input 输入框
export default function Form() {
  const ref = useRef(null);
  return (
    <div>
      <MyField ref={ref} />
      <button
        onClick={() => {
          ref.current.focus();
        }}
      >
        Focus
      </button>
    </div>
  );
}
```

#### 暴露命令式句柄而非 DOM 节点

可以使用 useImperativeHandle 自定义对象暴露一个更加受限制的方法集，而非整个 DOM 节点

```javascript
import { forwardRef, useRef, useImperativeHandle } from "react";

const MyInput = forwardRef(function MyInput(props, ref) {
  const inputRef = useRef(null);
  // 将收到的 ref 传递给 useImperativeHandle 并指定你想要暴露给 ref 的值：
  useImperativeHandle(ref, () => {
    return {
      focus() {
        inputRef.current.focus();
      },
      scrollIntoView() {
        inputRef.current.scrollIntoView();
      },
    };
  });
  return <input {...props} ref={inputRef} />;
});

export default function App() {
  const ref = useRef();
  return (
    <div>
      <MyInput ref={ref} />
      <button
        onClick={() => {
          ref.current.focus();

          // 这行代码不起作用，因为 DOM 节点没有被暴露出来：
          // ref.current.style.opacity = 0.5;

          // 如果某个组件得到了 MyInput 的 ref，则只会接收到 { focus, scrollIntoView } 对象
          // 而非整个 DOM 节点, 这可以让 DOM 节点暴露的信息限制到最小
        }}
      >
        Focus
      </button>
    </div>
  );
}
```

## React.Fragment 片段

Fragment 允许你在不添加额外节点的情况下将子元素组合.

当使用`Fragment`组件包裹多个子元素, 在渲染的时候不会向 DOM 增加额外的节点. 由于 React 组件只能有一个根节点, 在有`Fragment`存在的情况下, 就可以变相的实现一个组件返回多个根节点了, 因为`Fragment`这一层在渲染到真实 DOM 的时候会被擦除, 简写形式为`<></>`

使用场景:

- 希望返回多个节点的组件
- 分配多个元素给一个变量
- 那些对父子元素有语义限制的场合, 比如`tr`下面只允许`td`

```jsx
// 希望返回多个节点的组件
function MyComponent() {
  return (
    <>
      <td>A</td>
      <td>B</td>
    </>
  );
}

function CloseDialog() {
  // 分配多个元素给一个变量
  // 和其他元素一样，你可以将 Fragment 元素分配给变量，作为 props 传递等
  const buttons = (
    <>
      <OKButton />
      <CancelButton />
    </>
  );
  return <AlertDialog buttons={buttons}>Are you sure?</AlertDialog>;
}
```

## HOC(hight-order component) 高阶组件

具体来说, 一个高阶组件是接收一个组件返回一个新组件的函数.

```javascript
const EnhancedComponent = enhance(WrappedComponent);
```

组件是将 props 转换为 UI, 而高阶组件是将组件转换为另外一个组件. 通常在高阶组件中不应该修改输入组件, 而应该使用组合的方式来增加新的功能.

```javascript
function User() {
  return <div>username: Tom</div>;
}

function withLog(Component) {
  // enhance component
  function ComponentWithLog(props) {
    console.log("componentName: ", Component.name);
    return <Component {. ..props} />;
  }

  // custom HOC name in devtools
  ComponentWithLog.displayName = `${Component.name}WithLog`;
  return ComponentWithLog;
}

export default function App() {
  const UserWithLog = withLog(User);

  return (
    <div>
      <UserWithLog />
    </div>
  );
}
```

## 代码分割 code splitting

代码分割帮助你减小生成大体积的代码包, 并延迟加载用户当前不需要的资源, 能显著的提高应用的性能, 尤其首屏.

使用 `import()`

// before

```javascript
import { add } from ". /math.js";
add(1, 2);
```

// after

```javascript
import(". /math.js").then((math) => {
  math.add(1, 2);
});
```

使用 React.lazy 函数可以动态加载一个普通组件(仅仅支持 default export), 其返回的是一个 Promise 对象, 需要在 Suspense 组件内使用

```javascript
import OtherComponent from ". /OtherComponent";
```

```javascript
const OtherComponent = React.lazy(() => import(". /OtherComponent"));

function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <OtherComponent />
      </Suspense>
    </div>
  );
}
```

Route-based code splitting 基于路由的代码分割

```javascript
import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const Home = lazy(() => import(". /routes/Home"));
const About = lazy(() => import(". /routes/About"));

const App = () => (
  <Router>
    <Suspense>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
      </Switch>
    </Suspense>
  </Router>
);
```

## optimizing performance

- 在生产环境中请使用生产版本
  - 如果使用 create react app 脚手架, 该优化的脚手架都帮你优化了, 你只需要 `npm run build`
  - 如果使用 react 官方提供单个 bundle 文件, 请在生产环境中使用以`. production.min.js`结尾的文件
  - 使用 browserify 构建
  - 使用 rollup 构建
  - 使用 webpack 构建, 如果使用 webpack v4, 请使用`terser-webpack-plugin`优化代码, webpack v5 则不需要
- 使用 DevTools Profiler 对组件进行性能分析
- 对长列表, 推荐使用**虚拟滚动**技术, 它允许在给定的时间内渲染有限的内容, 以降低重新渲染组件的耗时.
  - [react-window](https://github.com/bvaughn/react-window)
  - [react-virtualized](https://github.com/bvaughn/react-virtualized)
- avoid reconciliation 避免协调, 通过覆盖默认的 shouldComponentUpdate 来避免不必要的渲染, 来提高性能
- 通过继承 PureComponent 让 react 只进行 props 浅比较从而提高性能. 对数据结构比较复杂的 props 和 state, 在使用 PureComponent 的时候需要谨慎.
- 使用不可变数据 immutability data 来避免 mutating data 易变且追踪的缺点以降低开发者心智负担, 同时也会让 react diff 算法更加高效, 推荐如下几个库可以帮助开发者处理复杂的深层次嵌套数据结构.
  - [immer](https://github.com/immerjs/immer)
  - [immutability-helper](https://github.com/kolodny/immutability-helper)

## portals

通常, 当你从组件的 render 方法返回一个元素的时候, 该元素将被挂载到 DOM 节点中离其最近的父节点下面. 而 Portal 允许你将子节点挂载到父组件 DOM 节点以外的其他 DOM 节点.

从 portal 内部触发的事件会冒泡到包含 React 组件的父组件树中, 即使这些元素不是他的祖先元素.

```html
<div id="root"></div>
<div id="modal-root"></div>
```

```javascript
import ReactDOM from "react-dom";
import React from "react";

function Modal(props) {
  const modalRoot = document.querySelector("#modal-root");
  const el = document.createElement("div");

  React.useEffect(() => {
    modalRoot.appendChild(el);
  }, []);

  return ReactDOM.createPortal(props.children, el);
}

export default function App() {
  return (
    <div>
      <Modal>Lorem ipsum dolor sit amet.</Modal>
    </div>
  );
}
```

## React.PureComponent

类似于 React.Component, 区别在于 React.Component 默认没有实现 `shouldComponentUpdate()`, 而 React.PureComponent 使用 props 和 state 浅比较(shallow compare)默认实现了 `shouldComponentUpdate()`.

## React.memo

memo 允许你的组件在 props 没有改变的情况下跳过重新渲染, 使用 memo 将组件包装起来，以获得该组件的一个记忆化版本。memo 返回一个新的 React 组件, 它的行为与提供给 memo 的组件相同，只是当它的父组件重新渲染时 React 不会总是重新渲染它，除非它的 props 发生了变化。

memo 是一个高阶组件, 它会记忆上次的渲染结果, 如果 props 没有发生变化, 那么它仅仅返回上次渲染结果而不是重新在渲染. 在对比 props 变化的时候使用的是对象浅比较 跟 `Object.is`, 你也可以使用自定义的比较函数来判定是否需要重新渲染.

```javascript
const MemoizedComponent = memo(SomeComponent, arePropsEqual?)

function arePropsEqual(preProps, nextProps) {
  // return true or false
}
```

```javascript
function WeatherReport({ record }) {
  const avgTemp = calculateAvg(record);
  // ...
}

const MemoWeatherReport = memo(WeatherReport);

function App() {
  const record = getRecord();
  return (
    <>
      <MemoWeatherReport record={record} />
      <MemoWeatherReport record={record} />
    </>
  );
}
```

与 useMemo 相比，memo 根据 props 而不是特定计算来记忆化组件渲染。与 useMemo 类似，记忆化的组件只缓存了具有最后一组 prop 值的最后一次渲染。一旦 props 更改，缓存将失效，组件将重新渲染。

## Suspense

Suspense 允许在子组件完成加载前展示后备方案.

```javascript
<Suspense fallback={<Loading />}>
  <SomeComponent />
</Suspense>
```

只有启用了 Suspense 的数据源才会激活 Suspense 组件，它们包括：

- 支持 Suspense 的框架如 Relay 和 Next.js
- 使用 lazy 懒加载组件代码
- 使用 use 读取 Promise 的值

Suspense 无法检测在 Effect 或事件处理程序中获取数据的情况

## React.lazy 跟 Suspense

`React.lazy` 定义一个动态加载组件, 这项技术会帮助你减少打包体积并延迟加载那些当前视图不需要的组件. 在使用 webpack 打包的时候, 使用 `import` 导入的组件会进行代码分割以减少单个包的体积.

`React.Suspense`当其下属的组件树中有些组件未准备就绪的时候, 允许你指定备用 UI(Fallback UI). Suspense 跟 React.lazy 定义的组件配合使用的场景是 Suspense 目前唯一的使用场景.

注意项:

- 不要在其他组件 内部 声明 lazy 组件, 总是在模块的顶层声明它们

```javascript
const HelloComponent = React.lazy(() => import(". /Hello.js"));

function App() {
  return (
    <div>
      <React.Suspense fallback={"<div>Ops, something went wrong! </div>"}>
        <HelloComponent />
      </React.Suspense>
    </div>
  );
}
```

## 关于 setState

```javascript
setState(updater, [callback]);

// 传递一个对象更新state, React会使用shallow merge跟当前state进行合并
// 在同一个事件循环周期内多次调用setState会合并为一次setState
// 类似于: Object.assign(preState, {count: 2}, {count: 3})
setState({
  count: 9,
});

// 传递一个 function
setState((preState, props) => {
  return {
    count: preState.someState + 1,
  };
});

// 第二个参数传递一个回调函数用来获取更新后的state
setState(
  (preState, props) => {
    // return new state
  },
  () => {
    // do with the new changed state
  }
);
```

setState 会告诉 React 当前组件以及它的子组件需要使用更新后的 state 重新渲染, 这也是你更新用户界面的首选方式.

setState 是异步的, 你可以把它理解为一个网络请求一样的操作, 在同一个事件循环周期内, React 会合并多次 setState 操作为一个 setState 操作, 所以 React 不保证在调用 setState 后组件的 state 立即就会更新.

要读取更新后的 state, 有两种方式:

- 在 setState 第二个参数 callback 中获取更新后的 state.
- 在 componentDidUpdate 中获取

## 关于 render()

通常是返回一个 React element, 如果要返回多个元素, 请使用`React.Fragment`, 如果返回的是数字或者字符串, 会在 DOM 中渲染为 text node. 如果返回的是 Boolean 或者 null, 则什么都不渲染.

`render()` 函数应该是纯函数, 意味着在该函数中你不能修改组件的 state, 对于相同的 state, render 函数应该返回相同的内容. 如果你想跟浏览器进行交互, 通常的方式是在 `componentDidMount()` 中执行相应的操作.

## 关于组件的 constructor

在组件中使用 constructor 的目的通常是:

- 初始化组件的 state
- 绑定事件到该实例

在 constructor 中对 state 进行直接赋值(也是唯一一个能对 state 直接赋值的地方). 在 constructor 中你不应该调用`setState()`, 并避一切副作用. 在 constructor 中避免把 props 的值赋值给 state, 这样做通常会引起 bug, 因为当 props 变更的时候, 变更的结果不会反应到 state 上面, 如果要了解更多请参考 [you-probably-dont-need-derived-state](https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html).

## 关于 componentDidMount()

当一个组件挂载到 DOM 上后, 会立即调用`componentDidMount()`, 在该生命周期函数中是执行网络请求最佳的地方, 同样在该处你可以添加一些订阅设置等. 在该函数内部, 你可以安全的调用 setState, 会触发组件重新渲染.

## 关于 componentDidUpdate()

该方法会在组件更新结束后立即调用, 对于组件初次加载, 不会调用该方法, 如果 `shouldComponentUpdate()` 返回 false, 也不会调用该方法. 在该方法内部, 你可以进行与 DOM 相关的操作, 也可以执行网络请求, 也可以调用 setState, 不过请设置好退出条件, 不然容易引起死循环.

## 关于 componentWillUnmount()

在组件卸载和销毁之前会调用该方法, 在该方法中通常是用来执行清理操作, 比如清除定时器, 取消网络请求, 清理在`componentDidMount()`中的订阅等. 在该方法内部, 你不应该调用 setState, 因为组件从来不会再次渲染.

## getDerivedStateFromProps

在组件实例化之后以及重新渲染之前调用, 返回一个对象用来更新 state, 或者返回 null 来表示新的 props 不会引起 state 的变化, 该 API 用来替代 componentWillReceiveProps 的使用场景.

```javascript
class SomeComponent extends React.Component {
  static getDerivedStateFromProps(props, state) {
    // ...
  }
}
```

使用该方法会让你的组件变得臃肿复杂, 在使用之前请考虑如下几种情况:

- 如果你想执行一些副作用, 比如 props 变化后要执行网络请求, 请考虑使用 componentDidUpdate 代替
- 当 props 改变的时候, 你想执行依赖于该 props 的其他计算, 请考虑优先使用 memorization
- 当 props 改变的时候, 你想重置一部分 state, 请考虑使用 [fully controlled](https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#recommendation-fully-controlled-component) 或者 [fully uncontrolled with a key](https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#recommendation-fully-uncontrolled-component-with-a-key)

## getSnapshotBeforeUpdate

在组件更新前调用, 此方法的返回值将作为第三个参数传递给 componentDidUpdate, 这个生命周期函数通常是跟 componentDidUpdate 一起使用, 它覆盖了过时的 componentWillUpdate 的所有用例.

```javascript
class SomeComponent extends React.Component {
  getSnapshotBeforeUpdate(prevProps, prevState) {
    // ...
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    // snapshot即是getSnapshotBeforeUpdate返回的值
  }
}
```

## Reconciliation 协调

Reconciliation 是 React 的 diff 算法, 用于比较更新前后的虚拟 DOM 树差异, 从而使用最小的代价将原始 DOM 按照新的状态属性进行更新.

## diff 算法

两个不同类型元素比较时, 会卸载原来的树并建立新的树, 例如从`<a>`变成`<img>`, 或者`<Article>`变成`<Comment>`都会触发一个完整的卸载重建流程.

对比同类型的元素的时候, React 会保留 DOM 节点, 仅更新变更的属性, 例如:

```javascript
// 仅更新className
<div className="before">
<div className="after">
```

对比同类型的组件的时候, 组件实例保持不变, React 更新组件实例的 props 并调用实例的`render()`方法, 然后调用 `componentDidUpdate()` 方法.

对 DOM 节点的子元素会进行递归遍历比较, 为了提高比较性能, react 增加了 Key 属性, 使用 key 来匹配原有树上的子元素以及最新树上的子元素. 请记住在设置 key 的时候, key 应该具有稳定可预测性.

## 渲染属性 render props

render props 指的是在多个组件中使用函数 props 共享代码的一种技术. 它用来告知组件需要渲染什么内容.

```javascript
function UserList({ render, users }) {
  return (
    <div className="user-list">
      {users.map((user) => (
        <React.Fragment key={user.id}>{render(user)}</React.Fragment>
      ))}
    </div>
  );
}

function User({ user }) {
  return (
    <div className="user" key={user.id}>
      {user.name}
    </div>
  );
}

function App() {
  const users = [
    {
      id: 1,
      name: "user1",
    },
    {
      id: 2,
      name: "user2",
    },
  ];
  return (
    <div>
      <UserList users={users} render={(user) => <User user={user} />} />
    </div>
  );
}
```

## shouldComponentUpdate 的作用

shouldComponentUpdate 允许我们手动地判断是否要进行组件更新, 根据组件的应用场景设置函数的合理返回值能够帮我们避免不必要的更新

## 在生命周期中的哪一步你应该发起 AJAX 请求

我们应当将 AJAX 请求放到 componentDidMount 函数中执行, 主要原因有:

如果我们将 AJAX 请求放置在生命周期的其他函数中, 比如 getSnapshotBeforeUpdate 这个函数在组件渲染过程中调用次数无法确, 可能调用一次也可能调用多次, 这会导致一个网络请求被调用多次, 而 componentDidMount 函数只会执行一次, 保证了网络请求只调用一次.

## 概述下 React 中的事件处理逻辑

为了解决跨浏览器兼容性问题, React 将浏览器原生事件封装为合成事件. 这里的合成事件提供了与原生事件相同的接口, 不过它们屏蔽了底层浏览器的细节差异, 保证了行为的一致性. 另外有意思的是, React 并没有直接将事件附着到子元素上, 而是以单一事件监听器的方式将所有的事件委托到顶层进行处理. 这样 React 在更新 DOM 的时候就不需要考虑如何去处理附着在 DOM 上的事件监听器, 最终达到优化性能的目的.

## React 组件指责划分

- 根据组件的职责通常把组件分为 UI 组件和容器组件.
- UI 组件负责 UI 的呈现, 容器组件负责管理数据和逻辑

## props, state 区别

As a general rule, use props to configure a component when it renders. Use state to keep track of any component data that you expect to change over time.

一般来说, 当组件渲染的时候, 使用 props 来配置组件的行为. 而使用 state 来跟踪随着时间而变化的组件数据.

## callback 跟 useRef, React.createRef 区别

callback ref 中当前 ref 存储的就是 dom 的引用, 不需要在通过 ref.current 来去访问, 其他几个都是需要使用 ref.current 属性去访问引用的 dom

## 废弃的几个 API

- `componentWillMount` React 17+会删除该 API
- `UNSAFE_componentWillMount` `componentWillMount` 的别名, 请使用 componentDidMount 或者 constructor
- `componentWillReceiveProps` React 17+会删除该 API
- `UNSAFE_componentWillReceiveProps` `componentWillReceiveProps` 的别名, 请使用 getDerivedStateFromProps
- `componentWillUpdate` React 17+会删除该 API
- `UNSAFE_componentWillUpdate` `componentWillUpdate` 的别名, 请使用 getSnapshotBeforeUpdate

## 受控和非受控组件

名词**受控**和**非受控**通常用来指代表单之类的元素, 例如 inputs, 但是也可以用来描述数据频繁更新的组件. 用 props 传入数据的话, 组件可以被认为是受控(因为组件被父级传入的 props 控制). 数据只保存在组件内部的 state 的话, 是非受控组件(因为外部没办法直接控制 state).

如果一个 input 表单元素的值是由 React 控制, 就其称为受控组件. 一个非受控组件, 就像是运行在 React 体系之外的表单元素. 当用户将数据输入到表单字段(例如 input, dropdown 等)时, React 不需要做任何事情就可以映射更新后的信息.

## React 严格模式做了什么?

- 识别不安全的生命周期
- 检测意外的副作用
- 检测过时的 API
  - legacy string ref
  - legacy findDOMNode
  - legacy context API

## ReactDOM.render()

```javascript
ReactDOM.render(element, container[, callback])
```

在提供的 container 里渲染一个 React 元素, 并返回对该组件的引用(或者针对无状态组件返回 null). 如果 React 元素之前已经在 container 里渲染过, 这将会对其执行更新操作, 只会在必要时改变 DOM 以映射最新的 React 元素. 如果提供了可选的回调函数, 该回调将在组件被渲染或更新之后被执行.

## React DOM 元素

为了性能和浏览器兼容性, React 实现了一套独立于浏览器的 DOM 系统, 所有的 DOM 属性都使用小驼峰的方式来书写, 比如 tabindex 则为 tabIndex.

checked:
当`<input>`组件的类型为 checkbox 和 radio 的时候, 组件支持 checked 属性, defaultChecked 则是组件首次挂载时的默认值.

className:
对应为 css 的 class

dangerouslySetInnerHTML:
为 DOM 设置 innerHTML

```javascript
function MyComponent() {
  return <div dangerouslySetInnerHTML={{ __html: "some html" }} />;
}
```

htmlFor:
由于 for 在 JavaScript 中为保留字, 所以使用 htmlFor 替代 HTML 中的 for

onChange:
onChange 映射为 html 中的 onchange

selected:
在<selected>中设置 value 来选中相应的<option>

```javascript
function MySelect() {
  return (
    <select value="B">
      <option value="A">A</option>
      <option value="B">B</option>
      <option value="C">C</option>
    </select>
  );
}
```

## React 合成事件

React 使用 SyntheticEvent 对浏览器事件进行了包装, 使得兼容性和跨浏览器更加友好. 要想访问浏览器原生事件, 只需要访问合成事件的 nativeEvent 即可.

- https://reactjs.org/docs/events.html

## testing

推荐使用 jest 搭配 `react-testing-library` 来测试你的组件, `react-testing-library` 是基于`DOM Testing Library`, 并且在 react-dom 跟 react-dom/test-utils 上提供了轻量级的函数来辅助开发者写出更加友好的测试代码.

- [react-testing-library](https://testing-library.com/docs/react-testing-library/intro/)

## what's hook?

hook 是一种特殊的函数, 它让你把更多的 React 特性应用到函数组件(function component).

## why hooks:

- 复用有状态组件困难, 使用 render props 和 HOC 极易形成嵌套地狱(wrapper hell)
- 复杂的组件很难理解, 无数的生命周期钩子函数导致组件的逻辑混乱不堪, 在其上增加新功能很容易引起 bug
- class 对 JavaScript 来说增加了理解上的困难, 样板代码太多, 并且 class 让代码优化困难

## rule of hook:

- 只在函数式组件最顶层调用 hook
- 只在函数式组件中调用 hook

## useState

useState 返回一个有状态的值和一个用来更新该值的函数.

```javascript
const [state, setState] = useState(initialState);

setState(newState);
setState((preState) => {
  const newState = preState + 1;
  return newState;
});
```

lazy initial state 延迟设置 state 值:

```javascript
const [state, setState] = useState(() => {
  const initialState = someExpensiveComputation(props);
  return initialState;
});
```

## useEffect

useEffect 接收一个命令式, 有副作用的代码. 可以在该函数内部改变 DOM, 添加订阅, 设置定时器, 记录日志等有副作用的操作. 传递给 useEffect 的函数会在组件渲染到屏幕之后执行.

Although useEffect is deferred until after the browser has painted, it's guaranteed to fire before any new renders. React will always flush a previous render's effects before starting a new update.

尽管 useEffect 被延迟到浏览器绘制后执行, 但一定确保在开始任何新渲染前触发 uesEffect 中的回调函数. 在开始新一轮的更新前, React 会始终刷新上一次的渲染效果.

effect with cleanup:

```javascript
useEffect(() => {
  const subscription = source.subscribe();
  return () => {
    subscription.unsubscribe();
  };
});
```

useEffect 会告诉 React, 当组件被浏览器渲染到屏幕上后, 请执行 useEffect 中的回调函数. useEffect 会在组件每一次渲染后都会执行, 但是你可以通过给 useEffect 传递第二个参数用来跳过不必要的调用. 请使用多个独立的 effect 分开你的关注点(业务), 而不是在一个 effect 中包含所有的业务代码.

```javascript
useEffect(() => {
  // some effect
}, [deps, ...])
```

React 使用`Object.is()`来确定两个值是否相等.

## useReducer

useReducer 是 useState 的高级版本, 接收一个 reducer `(state, action) => newState`, 返回新的 state 和一个 dispatch 函数.

```javascript
import React from "react";

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = React.useReducer(reducer, { count: 0 });
  return (
    <div className="Counter">
      Count: {state.count}
      <p>
        <button onClick={() => dispatch({ type: "increment" })}>increment</button>
        <button onClick={() => dispatch({ type: "decrement" })}>decrement</button>
      </p>
    </div>
  );
}
```

## useCallback

useCallback is a React Hook that lets you cache a function definition between re-renders.

返回一个带记忆的函数, callback 只有在它的依赖发生变化的时候才会再次调用, 如果没有指定依赖, 会在每次渲染的时候都执行该函数. 也就是说, 它在依赖项不变的情况下, 多次渲染会保持同一个引用, 而不是每一次运行的时候都生成新的回调引用.

```javascript
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);
```

`useCallback(fn, deps)` 跟 `useMemo(() => fn, deps)`等价

## useMemo

useMemo is a React Hook that lets you cache the result of a calculation between re-renders.

返回一个有记忆的值, 该值只有在它的依赖发生变化的时候才会更新. 如果没有依赖提供, 会在每次渲染的时候都重新计算该值.

useMemo 一般用在客户端渲染时缓存昂贵的计算, 主要针对一些计算. 它可以作为性能优化的一个手段, 请记住 useMemo 是在渲染期间运行的, 在该函数内部避免做一些有副作用的操作.

```javascript
const memoizedValue = useMemo(() => expensiveComputeValue(a, b), [a, b]);
```

```javascript
function WeatherReport({record}) {
  const avgTemp = useMemo(() => calculateAvg(record)), record);
  // ...
}

function App() {
  const record = getRecord();
  return (
    <>
      <WeatherReport record={record} />
      <WeatherReport record={record} />
    </>
  );
}
```

## cache

cache 应用于服务器组件以记忆化可以跨组件共享的工作。

## useImperativeHandle

```javascript
useImperativeHandle(ref, createHandle, [deps]);
```

useImperativeHandle 可以自定义组件通过 ref 暴露给其调用者的属性或者方法.

```javascript
function MyInput(props, ref) {
  const inputRef = useRef();
  useImperativeHandle(ref, () => {
    return {
      focus() {
        inputRef.current.focus();
      },
    };
  });

  return <input type="text" ref={inputRef} />;
}

function App() {
  const MyInputForward = forwardRef(MyInput);
  const myInputRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      myInputRef.current.focus();
    }, 1000);
  });

  return (
    <div className="App">
      <MyInputForward ref={myInputRef} />
    </div>
  );
}
```

## useLayoutEffect

useLayoutEffect 跟 useEffect 功能类似，可以理解为 useEffect 的特殊版本，通常使用它在屏幕绘制之前测量 DOM 布局相关信息。 它会在浏览器重绘屏幕之前触发, 同步调用 useLayoutEffect 内部的代码，由于是同步调用，所以它会阻塞浏览器渲染，会影响组建性能，尽可能少使用 useLayoutEffect。

## useInsertionEffect

useInsertionEffect 在 React 对 DOM 进行更改之前触发，一些库可以在此处插入动态 CSS，它允许在任何布局效果触发之前将元素插入到 DOM 中。通常用来从 CSS-in-JS 库注入动态样式。useInsertionEffect 可以在更新 DOM 之前或之后运行，你不应该依赖 DOM 在何时更新的。

## useTransition

useTransition is a React Hook that lets you update the state without blocking the UI.
useTransition 顾名思义过渡，可以理解为过渡更新，能够让你把状态更新标记为非阻塞的方式（降低任务优先级）。一般状态更新的任务有两种，一种是紧急任务，比如文本框输入，点击等，另一种是过渡性任务，比如列表更新等，这种任务的优先级低。

主要用途是把一个状态更新标记为非阻塞式更新，降低任务级别以致不阻塞其他优先级高的任务。

```javascript
function TabContainer() {
  const [isPending, startTransition] = useTransition();
  const [tab, setTab] = useState();

  function selectTab(nextTab) {
    startTransition(() => {
      setTab(nextTab);
    });
  }
}
```

## useDeferredValue

useDeferredValue is a React Hook that lets you defer updating a part of the UI.

useDeferredValue 是一个 React Hook，可以让你延迟更新 UI 的某些部分。

```javascript
import { useState, useDeferredValue } from "react";

function SearchPage() {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  // ...
}
```

1. 在初始渲染期间，返回的延迟值与你提供的值相同
2. 在更新期间，延迟值会**滞后于**最新值。具体地说，React 首先会在不更新延迟值的情况下进行重新渲染，然后在后台尝试使用新接收到的值进行重新渲染,一旦后台重新渲染完毕会立即提交到屏幕.

用法:

- 在新内容加载期间显示旧内容
- 延迟渲染 UI 的某些部分

## useDeferredValue 与防抖跟节流的区别

- 防抖, 在事件被触发 n 秒后再执行回调，如果在这 n 秒内又被触发，则重新计时。
- 节流, 规定在一个单位时间内，只能触发一次函数。如果这个单位时间内触发多次函数，只有一次生效。

虽然这些技术在某些情况下是有用的，但 useDeferredValue 更适合优化渲染，因为它与 React 自身深度集成，并且能够适应用户的设备。

与防抖或节流不同，useDeferredValue 不需要选择任何固定延迟时间。如果用户的设备很快（比如性能强劲的笔记本电脑），延迟的重渲染几乎会立即发生并且不会被察觉。如果用户的设备较慢，那么列表会相应地“滞后”于输入，滞后的程度与设备的速度有关。

此外，与防抖或节流不同，useDeferredValue 执行的延迟重新渲染默认是可中断的。这意味着，如果 React 正在重新渲染一个大型列表，但用户进行了另一次键盘输入，React 会放弃该重新渲染，先处理键盘输入，然后再次开始在后台渲染。相比之下，防抖和节流仍会产生不顺畅的体验，因为它们是阻塞的：它们仅仅是将渲染阻塞键盘输入的时刻推迟了。

如果你要优化的工作不是在渲染期间发生的，那么防抖和节流仍然非常有用。例如，它们可以让你减少网络请求的次数。你也可以同时使用这些技术。

## hooks 中如何使用之前的 state 跟 props

```javascript
function Counter() {
  const [count, setCount] = useState(0);
  const prevCountRef = useRef();
  useEffect(() => {
    prevCountRef.current = count;
  });
  const prevCount = prevCountRef.current;
  return (
    <div>
      Now: {count}, before: {prevCount}
    </div>
  );
}
```

将该逻辑抽成单独的 hook

```javascript
function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

function Counter() {
  const [count, setCount] = useState(0);
  const prevCount = usePrevious(count);
  return (
    <div>
      Now: {count}, before: {prevCount}
    </div>
  );
}
```

## hook 实现 forceUpdate

只是用来应急, 尽可能避免使用这种模式

```javascript
function Counter() {
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
  function handleClick() {
    forceUpdate();
  }

  return <div></div>;
}
```

## hook 如何侦测一个 DOM 节点

使用 callback ref 来获取 DOM 相关的信息. 不推荐使用 useRef, 因为当 ref 是一个对象的时候, ref 的变化不会通知我们. 而使用 callback ref, 可以确保 DOM 被挂载后, 立即调用 ref 指定的回调, 回调中参数就是当前的 ref 所指向的 DOM.

```javascript
function Counter() {
  const cb = (node) => {
    // do something with dom
  };
  return (
    <div>
      <h1 ref={cb}>measured dom</h1>
    </div>
  );
}
```

## react hooks 性能优化

#### 条件式 effect

请在 useEffect 中指定[deps], 避免在多次渲染时不必要的运行.

#### 多使用 useCallback

使用内联函数会对性能有影响, 多使用 useCallback, 它允许在多次重新渲染之间保持对相同回调的引用不变.

#### 多使用 useMemo

对于昂贵的计算, 请使用 useMemo 对计算结果进行缓存.

#### 如何惰性创建昂贵的对象(需要大量计算)?

初次初始化 state 操作昂贵, 使用一个函数返回初始 state, 这样避免在重新渲染的时候重新计算该初始值

```javascript
function Table(props) {
  // createRows() 每次渲染都会调用
  const [rows, setRows] = useState(createRows(props.count));
  // ...
}
```

```javascript
function Table(props) {
  // createRows() 多次渲染, 只调用一次
  const [rows, setRows] = useState(() => createRows(props.count));
  // ...
}
```

#### 避免层层向下传递回调

使用 context 往下层层传递回调, 避免不必要的传递开销.

## startTransition

startTransition 可以让你在不阻塞 UI 的情况下更新 state。

```javascript
import { startTransition } from "react";

function TabContainer() {
  const [tab, setTab] = useState("about");

  function selectTab(nextTab) {
    startTransition(() => {
      setTab(nextTab);
    });
  }
  // ...
}
```

## StrictMode

StrictMode 帮助你在开发过程中尽早地发现组件中的常见错误, 严格模式启用了以下仅在开发环境下有效的行为：

- 组件将重新渲染一次，以查找由于非纯渲染而引起的错误。
- 组件将重新运行 Effect 一次，以查找由于缺少 Effect 清理而引起的错误。
- 组件将被检查是否使用了已弃用的 API。

## Profiler

Profiler 允许你编程式测量 React 树的渲染性能
