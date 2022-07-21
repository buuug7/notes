# webpack

At its core, webpack is a static module bundler for modern JavaScript applications. When webpack processes your application, it internally builds a dependency graph from one or more entry points and then combines every module your project needs into one or more bundles

从本质上讲，webpack 是现代 JavaScript 应用程序的静态模块打包器。当 webpack 处理你的应用程序时，它会在内部从一个或多个入口点构建依赖关系图，然后将项目所需的每个模块组合成一个或多个包。

- Entry, 入口点指示 webpack 应该使用哪个模块来开始构建其内部依赖图, 默认为 `./src/index.js`
- Output, output 属性告诉 webpack 在哪里生成打包的文件以及如何命名这些文件, 默认为 ./dist/main.js
- Loaders, webpack 只理解 JavaScript 和 JSON 文件。Loader 允许 webpack 处理其他类型的文件并将它们转换为可以被您的应用程序使用的有效模块, 并将其添加到关系依赖图中
- Plugins, loader 是用来转换某些类型的模块，然而 Plugins 来执行更广泛的任务，如 bundle 优化、资源的管理和环境变量的注入等
- Mode, 通过将 mode 参数设置为 development、production 或 none，您可以启用 webpack 与每个环境对应的内置优化, 默认值为生产

## webpack 常见的优化

#### 压缩 JS 代码

webpack 默认在生成 production 包的时候代码是压缩的，打包的时候注意设置 mode=“production”

#### 根据 entry 依赖来分割代码

webpack 会根据入口文件的依赖将文件打包成几个单独的文件

```javascript
{
  entry: {
    shared: "lodash",
    index: {
      import: "./src/index.js",
      dependOn: "shared",
    },
    another: {
      import: "./src/another.js",
      dependOn: "shared",
    },
  },
};
```

#### 使用 SplitChunksPlugin 来抽出公用的代码

使用 SplitChunksPlugin 抽出公用代码到一个单独的文件，以此来减小生成的各个文件中重复的代码

```javascript
{
  optimization: {
  splitChunks: {
    chunks: "all",
  }
}
}
```

#### 使用动态导入（dynamic import）

webpack 在打包的时候会根据动态导入的模块自动生成单独 chunk 文件，在需要的时候会单独加载。

```javascript
function getSomeComponent() {
  import("lodash").then(({ default: _ }) => {
    // do some with lodash
  });
}

// or use async await syntax
async function getSomeComponent() {
  const { default: _ } = await import("lodash");
  // do some with lodash
}
```

#### 使用 mini-css-extract-plugin

使用 mini-css-extract-plugin 把 css 代码从生成的 JavaScript 代码中抽出来单独加载

#### 使用 prefetch preload

使用 prefetch 来预先获取在将来可能需要一些资源

```javascript
import(/* webpackPrefetch: true */ "./path/to/LoginModal.js");
```

使用 preload 来预加载当前导航期间也将需要资源

```javascript
import(/* webpackPreload: true */ "ChartingLibrary");
```

#### 使用 bundle Analysis 来分析生成的包

可以使用 webpack 官方提供的工具[analyse](https://github.com/webpack/analyse)来分析生成的包，或者使用社区中的其他包分析工具：

- [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer)
- [bundle-stats](https://github.com/relative-ci/bundle-stats)

#### 对第三方的库配置缓存

打包的时候对第三方的 vendor 配置缓存，除非他们的内容有所改动，否则不会生成新的文件，也就是说，在最终的打包文件中，用户的浏览器不会去重新下载这些本来就没有变动的 vendor 资源

```javascript
{
    output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
    optimization: {
    moduleIds: 'deterministic',
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        }
      },
    }
  },
}
```
