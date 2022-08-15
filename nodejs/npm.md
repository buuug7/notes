# npm

Node package management

## 设置代理

Setup npm proxy

```
For HTTP:

npm config set proxy http://proxy_host:port
For HTTPS:

use the https proxy address if there is one

npm config set https-proxy https://proxy.company.com:8080
else reuse the http proxy address

npm config set https-proxy http://proxy.company.com:8080
```

## package.json

package.json 包含了你项目的清单, 以及一些有关包的元信息, 如果你的包想通过 npm 分发, 那么 package.json 中必须要具备几个必选的属性, 比如 name, version, description 等.

```json
{
  "name": "package name",
  "version": "1.0.0",
  "description": "description of package",
  "main": "lib/index.js",
  "private": true,
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "Joe <joe@whatever.com> (https://whatever.com)",
  "license": "ISC",
  "dependencies": {
    "vue": "^2.5.2"
  },
  "devDependencies": {
    "autoprefixer": "^7.1.2"
  },
  "engines": {
    "node": ">= 6.0.0",
    "npm": ">= 3.0.0"
  },
  "browserslist": ["> 1%", "last 2 versions", "not ie <= 8"],
  "repository": "github: whatever/testing",
  "homepage": "https://whatever.com/package",
  "bugs": "https://github.com/whatever/package/issues",
  "contributors": []
}
```

- `version` 版本号
- `name` 包名称
- `description` 包介绍
- `main` 包入口文件
- `private` 如果设置为 true, 那么会阻止发布到 npm
- `scripts` 定义一系列 node 可运行脚本
- `keywords` 关键字
- `author` 作者
- `license` 许可证.
- `dependencies` 包的依赖
- `devDependencies` 包的开发依赖
- `engines` 包所支持的 node 版本
- `browserslist` 所支持的浏览器
- `repository` 包源码仓库
- `bugs` Links to the package issue tracker, most likely a GitHub issues page
- `homepage` package homepage
- `contributors` 贡献者

## package-lock.json

package-lock.json 文件的目标是跟踪依赖包的确切版本, 确保每个人安装的依赖都会保持一致的版本, 而不会因为语义化版本指定的版本范围导致两个人安装不同的包.

## 查看一个包的各个版本

```
npm view packageName versions

# 查看最新的包信息, 无需指定版本号, 比如
npm view react
```

# npm version use those symbols

`x.x.x`

- `^` 当升级的时候, 第一位不变, 后面的两位可变
- `~` 中间一位不变, 第三位可变
- `>` 接受比指定版本大的版本号
- `>=` 接受大于等于指定版本的版本
- `<` 接受比指定版本号小的版本
- `<=` 接受小于等于指定版本号的版本
- `=` 版本号精确相等
- `-` 接受一个范围的版本号
- `||` 接受左右两侧指定的版本号规则

## 清理 cache

```bash
npm cache clean --force
```

## 给已经发布的包添加标签

`npm dist-tag add <package-name>@<version> [<tag>]`

## Scopes and package visibility

- Unscoped packages are always public.
- Private packages are always scoped.
- Scoped packages are private by default; you must pass a command-line flag when publishing to make them public.

## npm package git URL format

Git URLs used for npm packages can be formatted in the following ways:
The commit-ish can be any tag, sha, or branch that can be supplied as an argument to git checkout. The default commit-ish is master.

```
git://github.com/user/project.git#commit-ish
git+ssh://user@hostname: project.git#commit-ish
git+http://user@hostname/project/blah.git#commit-ish
git+https://user@hostname/project/blah.git#commit-ish
```

## module 定义

A module is any file or directory in the node_modules directory that can be loaded by the Node.js require() function. To be loaded by the Node.js require() function, a module must be one of the following:

- A folder with a package.json file containing a "main" field.
- A JavaScript file.

一个模块就是任意一个在 node_modules 目录下的文件或者目录, 并且这个文件或者目录可以被 Node.js 的 require()函数加载. 为了能让 Node.js 的 require() 函数加载, 模块必须具备下面列出选项的任何一个:

- 如果是文件夹, 那么文件夹下属的 package.json 文件中有一个"main"字段
- 或者一个 JavaScript 文件

一个具有 package.json 的模块也被成为一个包.

## package 定义

A package is a file or directory that is described by a package.json file. A package must contain a package.json file in order to be published to the npm registry.

一个被 package.json 描述的文件或者文件夹被称为一个包. 为了发布到 npm 仓库, 一个包必须包含 package.json 文件.

Packages can be unscoped or scoped to a user or organization, and scoped packages can be private or public. Unscoped packages are always public.

一个用户或者组织发布的包可以带命名空间或者不带命名空间, 带命名空间的包可是是公开的或者私有的.

## 查看 npm 的配置

```bash
npm config ls -l
```

## 管理多个 registry

Using npmrc to managing multiple profiles for different registries

请使用 npmrc 来管理多个 registry

```bash
npm install -g npmrc
```

## 获取或者设置 npm 仓库地址

```bash
# 获取registry地址
npm config get registry

# 设置registry
npm config set registry https://registry.npmjs.org/
```

## mac 下面 npm 全局包安装的位置

`/usr/local/lib/node_modules`

## npm 如何下架已经发布得包

打开<https://www.npmjs.com/support/>, 填写申请单即可. 下面是样例

Subject: please help me unpublish the old **@buuug7/simplify** package

How can we help?

the old **@buuug7/simplify** package is outdate, i published new package to replace it and the **@buuug7/simplify** is not used any more, please help me delete it [@buuug7/simplify](https://www.npmjs.com/package/@buuug7/simplify). thanks.

## npm 发部带 scope 的包

先在 package.json 中 name 中指定 '@scopeName/packageName', 然后在发布的时候需要指定 --access public 选项 `npm publish --access public`

## Node version management

```bash
# 安装
npm install -g n

# Use or install the latest official release:
n latest

# Use or install the stable official release:
n stable

# Use or install the latest LTS official release:
n lts
```

## npm 跟 yarn 命令比较

其中 packageName 代表包的名称

- `npm install == yarn / yarn install`
- `npm install packageName --save == yarn add packageName`
- `npm install packageName --save-dev == yarn add packageName --dev`
- `npm uninstall packageName --save == yarn remove packageName`
- `npm update == yarn upgrade`
- `npm install packageName -g == yarn global add packageName`

## npm 配置仓库地址

```bash
# 淘宝地址
npm config set registry https://registry.npm.taobao.org

# 当你想发布自己的包时, 需要将地址修改回来
npm config set registry https://registry.npmjs.org/
```

## npm 基本命令

```bash
# installing all dependencies
npm install

# install package to dependencies
npm install <package-name> --save

# install package to devDependencies
npm install <package-name> --save-dev

# install package to global
npm install <package-name> -g

# update all packages
npm update

# update single package
npm update <package-name>

# Running Tasks
npm run <task-name>

# update npm itself
npm install npm -g
```
