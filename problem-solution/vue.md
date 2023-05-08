## vue jsx

详情参考[vue-jsx](https://github.com/vuejs/jsx)

```
npm install @vue/babel-preset-jsx @vue/babel-helper-vue-jsx-merge-props

{
  "presets": ["@vue/babel-preset-jsx"]
}

```

请停止使用过期的 [babel-plugin-transform-vue-jsx](https://github.com/vuejs/babel-plugin-transform-vue-jsx)

## vue hook:xxx

当我们需要在父组件上知道子组件什么时候被创建、挂载或者是更新，可以通过使用 `@hook:前缀` 监听生命周期中的钩子，并指定回调函数。从语法上来看，就是组件内的生命周期函数在执行结束后会 $emit 一个 hook + 生命周期名字 的自定义事件。

```vue
<v-runtime-template @hook:updated="doSomething" :template="template" />
```
