# 命令式和声明式编程

## 命令式编程 Imperative

用详细的命令机器怎么(How)去处理一件事情以达到你想要的结果(What).

例如,使用 javascript 更新视图, 就是命令式的:

```html
<h4 class="today">2021/5/19</h4>
```

```javascript
const today = new Date();
const todayDom = document.querySelector(".today");
todayDom.textContent = today.toLocaleTimeString();
```

## 声明式编程 Declarative

只告诉你想要的结果(What), 机器自己摸索过程(How). 例如 SQL 就是典型的声明式编程语言.

例如, 使用 react 更新视图, 就是声明式的:

```jsx
<div className="today">{today.toLocaleString()}</div>
```

```javascript
this.setState({ today: new Date() });
```

## 优缺点

命令式编程更加的精细化，更严谨，程序也会一丝不苟的执行你的命令。

声明式让你可以更关注在状态表现，而不用去考虑底层如何实现, 声明式编程能在特定的更高层面代码领域我们带来效率的提升，程序员只需要对想要的结果（What）进行深思熟虑，程序会自动的解决过程（How）。当然代码看起来更简洁也是大大的满足了众多强迫症程序猿。
