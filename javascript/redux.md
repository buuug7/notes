# redux

A Predictable State Container for JS Apps
JS 应用程序的一个可预测状态容器工具.

features:

- predictable 可预测
- centralized 集中式, single source of truth
- debuggable 可测试
- flexible 灵活

## core concepts

The **state** is a plain javascript object.
状态是用普通 JavaScript 对象来表示的

To change something in the state, you need to dispatch an **action**
要改变状态, 你需要分发一个动作

An action is a plain JavaScript object with a **type** field that describes what happened.
一个动作就是一个普通 JavaScript 对象, 其包含了一个 type 属性, 描述了所发生的事情

reducer 是一个 function, 它接收当前的状态以及要发生的动作, 返回新的状态

## Basic Example

```javascript
import { createStore } from "redux";

/**
 * This is a reducer - a function that takes a current state value and an
 * action object describing "what happened", and returns a new state value.
 * A reducer's function signature is: (state, action) => newState
 *
 * The Redux state should contain only plain JS objects, arrays, and primitives.
 * The root state value is usually an object.  It's important that you should
 * not mutate the state object, but return a new object if the state changes.
 *
 * You can use any conditional logic you want in a reducer. In this example,
 * we use a switch statement, but it's not required.
 */
function counterReducer(state = { value: 0 }, action) {
  switch (action.type) {
    case "counter/incremented":
      return { value: state.value + 1 };
    case "counter/decremented":
      return { value: state.value - 1 };
    default:
      return state;
  }
}

// Create a Redux store holding the state of your app.
// Its API is { subscribe, dispatch, getState }.
let store = createStore(counterReducer);

// You can use subscribe() to update the UI in response to state changes.
// Normally you'd use a view binding library (e.g. React Redux) rather than subscribe() directly.
// There may be additional use cases where it's helpful to subscribe as well.

store.subscribe(() => console.log(store.getState()));

// The only way to mutate the internal state is to dispatch an action.
// The actions can be serialized, logged or stored and later replayed.
store.dispatch({ type: "counter/incremented" });
// {value: 1}
store.dispatch({ type: "counter/incremented" });
// {value: 2}
store.dispatch({ type: "counter/decremented" });
// {value: 1}
```

## combine slice

combine multiple reducer into single rootReducer

```javascript
import { createStore } from "redux";

import userReducer from "./features/user/user.reducer";
import todoReducer from "./features/todo/todo.reducer";

function rootReducer(state = {}, action) {
  return {
    user: userReducer(state.user, action),
    todo: todoReducer(state.todo, action),
  };
}

export const store = createStore(rootReducer);
```
