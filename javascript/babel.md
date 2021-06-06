# babel

Babel 是一个工具链，主要用于在当前和旧浏览器或环境中将 ECMAScript 2015+ 代码转换为向后兼容的 JavaScript 版本。以下是 Babel 可以为您做的主要事情：

- transform syntax 转换语法
- 对于目标环境中缺少的功能, 使用 Polyfill（通过第三方 polyfill，例如 core-js）
- source coe transformation 源代码转换

## babel cli

```bash
# 转换
babel src --out-dir dist

# 指定plugins
babel src --out-dir dist --plugins=@babel/plugin-transform-arrow-functions

# 指定预设
babel src --out-dir dist --presets=@babel/env
```

## polyfill

babel > 7.4.0 将@babel/polyfill 标记为弃用, 推荐使用手动方式引入 corejs 部分模块.

```javascript
import "core-js/stable";
import "regenerator-runtime/runtime";
```

## target 优先顺序

babel 会优先使用自己配置文件中的 targets, 如果配置文件中没有设定 targets, 然后才回去查找 package.json 文件跟`.browserslistrc`文件中的浏览器配置, 使用的时候请开启 debug 方式来查看当前 babel 所使用的配置信息,在构架的时候会打印相关的数据到控制台上.

```javascript
// babel.config.json
{
  "presets": [
    [
      "@babel/env",
      {
        "useBuiltIns": "usage",
        "corejs": "@3",
        "debug": true
      }
    ]
  ]
}

// package.json
{
  "browserslist": [
    "chrome > 87",
    "last 2 firefox versions",
    "not ie > 0"
  ]
}
```
