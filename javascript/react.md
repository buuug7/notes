# react

## what's react ?

A JavaScript library for building user interfaces.

react 是一个用于构建用户界面的 JavaScript 库.

React is a declarative, efficient, and flexible JavaScript library for building user interfaces. It lets you compose complex UIs from small and isolated pieces of code called “components”.

react 是一个声明式, 高效且灵活的用于构建用户界面的 JavaScript 库. 它通过让你使用一种小的独立的被称为组件的代码片段, 然后通过组合他们来构建复杂的用户界面.

## react features

##### Declarative 声明式

react 使构建用户界面变得简单. 为你应用的每一个状态设计精简的视图, 当数据变动时 react 能高效更新和渲染合适的组件. 编写声明式的视图能让你的代码更加有预测性且调试方便.

##### Component Based 组件化

构建管理其自身状态的封装组件, 然后对其组合以构成复杂的 UI. 由于组件逻辑使用 JavaScript 编写而非模板, 因此你可以轻松地在应用中传递数据, 并保持状态与 DOM 分离.

##### Learn Once, Write Anywhere 学习一次, 跨平台编写

无论你现在使用什么技术栈, 在无需重写现有代码的前提下,通过引入 react 来开发新功能. react 还可以使用 Node 进行服务器渲染，或使用 react-native 开发原生移动应用。

## what's react component ?

一个接受 props 参数, 并且返回一个 **react element** 的函数被称为组件. **react element** 描述了要在屏幕上渲染视图的一个轻量级抽象, 通常 react element 使用 JSX 来编写.

## what's JSX ?

一种类似于 XML 语法的模板语言, 在构建的时候 JSX 被转换成 `React.createElement(component, props, ...children)`. react 官方对此的定义是 JSX 是 `React.createElement`.

```javascript
<div className="app">
  <h4>Hello world</h4>
  <p>lorem ipsum dolor site amet</p>
</div>
```

// equivalent to

```javascript
React.createElement(
  "div",
  { className: "app" },
  React.createElement("h1", {}, "Hello world"),
  React.createElement("p", {}, "lorem ipsum dolor site amet")
);
```

注意:

- 由于 JSX 会编译成 React.createElement,确保 React 在 JSX 代码作用域内
- 自定义的组件必须以大写字母开头
- props 默认值为 true, 比如 `<User age />`默认 age 会为 true
- 可以使用...展开运算符在 JSX 中传递整个 props 对象
- 函数表达式可以作为 JSX 子元素
- true,false, undefined,null 是合法的子元素,但是不会渲染,如果想渲染这些值,请将它们转换为字符串

## react 哲学

- 将 UI 划分为组件
- 用 react 创建一个静态版本
- 确定 UI 的最小状态
- 确定 state 存放在哪里
- 添加反向数据流(让内层组件能改变上层组件 state)

## 代码分割 code splitting

代码分割帮助你减小生成大体积的代码包, 并延迟加载用户当前仅需要的资源, 能显著的提高应用的性能, 尤其首屏.

使用 `import()`

// before

```javascript
import { add } from "./math.js";
add(1, 2);
```

// after

```javascript
import("./math.js").then((math) => {
  math.add(1, 2);
});
```

使用 React.lazy 函数可以动态加载一个普通组件(仅仅支持 default export), 其返回的是一个 Promise 对象, 需要在 Suspense 组件内使用

```javascript
import OtherComponent from "./OtherComponent";
```

```javascript
const OtherComponent = React.lazy(() => import("./OtherComponent"));

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

const Home = lazy(() => import("./routes/Home"));
const About = lazy(() => import("./routes/About"));

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

## context 上下文

context 提供了一种在组件树中无需显式层层传递数据而共享数据的方式. 但是请谨慎使用它, 因为它让组件复用变得更加困难, 何时使用 context 取决于你, 但有一点需要说明的是, 如果你仅仅只是想避免在多个组件层级中传递数据, 那么**组合组件**的方式通常是比 context 更加简单高效的一个选择.

context 中默认值只有在组件它所处的上层组件树中的 **provider** 没有匹配的时候才会使用.

如果想从子组件中更新 context, 可以在 context 中声明一个函数然后在子组件中调用该函数更新 context.

由于基于 class 的组件社区会越来越少使用, 下面的例子是基于 hooks 的 context 的例子

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
      title: "where ca we go next?",
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

为了解决部分 UI 错误而不引起整个应用奔溃, react 16 引入了错误边界来处理这些问题. 错误边界是一种 react 组件, 用来捕获发生在其子组件树中的错误, 打印错误, 并显示备用 UI. react 不支持使用 hooks 的方式写 error boundary.

注意在开发环境中有可能无法测试错误边界的情况, 请使用生产测试. 使用 create-react-app 作为脚手架的请在`npm run build`之后测试.

#### 错误边界无法捕获的错误有下面这些

- 事件处理器错误
- 异步代码(setTimeout, requestAnimationFrame 等)
- 服务端渲染
- 它自身抛出的错误

#### 关于未捕获的错误(Uncaught Error)行为

要注意未被任何错误边界捕获的错误会导致整个组件树被卸载, 这是 react 16 后默认的行为.

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

Forwarding refs 是一个让组件接受一个 ref(引用), 然后将其向下传递给子组件的技术. 使用调用`React.createRef`对组件进行 ref 转发.

```jsx
import React from "react";

const MyButton = React.forwardRef((props, ref) => {
  return <button ref={ref}>{props.children}</button>;
});

// also can custom the display name in devtool
MyButton.displayName = "MyButton";

const MyButtonWrap = React.forwardRef((props, ref) => (
  <MyButton ref={ref}>{props.children}</MyButton>
));

function App() {
  const ref = React.useRef();

  React.useEffect(() => {
    ref.current.onclick = (e) => {
      alert(e.target.textContent);
    };
  }, []);

  return (
    <div>
      <MyButtonWrap ref={ref}>my button</MyButtonWrap>
    </div>
  );
}

export default App;
```

## React.Fragment 片段

当使用`React.Fragment`组件包裹多个子元素, 在渲染的时候不会向 DOM 增加额外的节点. 由于 react 组件只能有一个根节点, 在有`React.Fragment`存在的情况下, 就可以变相的实现一个组件返回多个根节点了, 因为`React.Fragment`这一层在渲染到真实 DOM 的时候会被移除. `<React.Fragment></React.Fragment>`的简写形式为`<></>`

使用场景:

- 那些对父子元素有语义限制的场合, 比如`tr`下面只允许`td`
- 希望返回多个根节点的组件

```jsx
function MyComponent() {
  return (
    <React.Fragment>
      <td>A</td>
      <td>B</td>
      <td>C</td>
    </React.Fragment>
  );
}
```

## hight-order component（HOC）高阶组件

具体来说，一个高阶组件是接受一个组件返回一个新组件的函数。

```javascript
const EnhancedComponent = enhance(WrappedComponent);
```

组件是将 props 转换为 UI，而高阶组件是将组件转换为另外一个组件。通常在高阶组件中不应该修改输入组件, 而应该使用组合的方式来增加新的功能.

```javascript
function User() {
  return <div>username: Tom</div>;
}

function withLog(Component) {
  // enhance component
  function ComponentWithLog(props) {
    console.log("componentName:", Component.name);
    return <Component {...props} />;
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

## optimizing performance

- 在生产环境中请使用生产版本
  - 如果使用 create react app 脚手架, 该优化的脚手架都帮你优化了, 你只需要 `npm run build`
  - 如果使用 react 官方提供单个 bundle 文件,请在生产环境中使用以`.production.min.js`结尾的文件
  - 使用 browserify 构建
  - 使用 rollup 构建
  - 使用 webpack 构建, 如果使用 webpack v4, 请使用`terser-webpack-plugin`优化代码, webpack v5 则不需要
- 使用 DevTools Profiler 对组件进行性能分析
- 对长列表, 推荐使用**虚拟滚动**技术, 它允许在给定的时间内渲染有限的内容, 以降低重新渲染组件的耗时.
  - [react-window](https://github.com/bvaughn/react-window)
  - [react-virtualized](https://github.com/bvaughn/react-virtualized)
- avoid reconciliation 避免协调, 通过覆盖默认的 shouldComponentUpdate 来避免不必要的渲染, 从而以提高性能
- 通过继承 PureComponent 让 react 只进行 props 浅比较从而提高性能. 对数据结构比较复杂的 props 和 state,在使用 PureComponent 的时候需要谨慎.
- 使用不可变数据 immutability data 来避免 mutating data 易变且追踪的缺点以降低开发者心智负担, 同时也会让 react diff 算法更加高效, 推荐如下几个库可以帮助开发者处理复杂的深层次嵌套数据结构.
  - [immer](https://github.com/immerjs/immer)
  - [immutability-helper](https://github.com/kolodny/immutability-helper)

## portals

通常,当你从组件的 render 方法返回一个元素的时候,该元素将被挂载到 DOM 节点中离其最近的父节点下面. 而 Portal 允许你将子节点挂载到父组件 DOM 节点以外的 其他 DOM 节点.

从 portal 内部触发的事件会冒泡到包含 react 组件的父组件树中, 即使这些元素不是他的祖先元素.

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

## Reconciliation

Reconciliation 是 React 的 diff 算法，用于比较更新前后的虚拟 DOM 树差异，从而使用最小的代价将原始 DOM 按照新的状态、属性进行更新。

## shouldComponentUpdate 的作用

shouldComponentUpdate 允许我们手动地判断是否要进行组件更新，根据组件的应用场景设置函数的合理返回值能够帮我们避免不必要的更新

## 在生命周期中的哪一步你应该发起 AJAX 请求

我们应当将 AJAX 请求放到 componentDidMount 函数中执行，主要原因有下:

如果我们将 AJAX 请求放置在生命周期的其他函数中，比如 componentWillMount 这个函数在组建的渲染过程中调用次数无法确，可能调用一次也可能调用多次，这样会导致多次调用一个网络请求，而 componentDidMount 函数只会执行一次，保证了网络请求只调用一次。

## 概述下 React 中的事件处理逻辑

为了解决跨浏览器兼容性问题，React 会将浏览器原生事件封装为合成事件。这里的合成事件提供了与原生事件相同的接口，不过它们屏蔽了底层浏览器的细节差异，保证了行为的一致性。另外有意思的是，React 并没有直接将事件附着到子元素上，而是以单一事件监听器的方式将所有的事件发送到顶层进行处理。这样 React 在更新 DOM 的时候就不需要考虑如何去处理附着在 DOM 上的事件监听器，最终达到优化性能的目的。

## react 组件的划分业务组件技术组件？

- 根据组件的职责通常把组件分为 UI 组件和容器组件。
- UI 组件负责 UI 的呈现，容器组件负责管理数据和逻辑

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

## quick try JSX

参考 <https://raw.githubusercontent.com/reactjs/reactjs.org/master/static/html/single-file-example.html>

## 何时使用 Ref

- 管理 dom 的聚焦 focus，文本选择，或者媒体播放的控制等
- 出发命令式的动画
- 与第三方的 DOM 集成
