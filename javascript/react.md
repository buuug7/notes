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

一种类似于 XML 语法的模板语言, 在构建的时候 JSX 被转换成 React.createElement.

```jsx
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

```jsx
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

```jsx
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

```jsx
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
