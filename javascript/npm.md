# npm

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
git+ssh://user@hostname:project.git#commit-ish
git+http://user@hostname/project/blah.git#commit-ish
git+https://user@hostname/project/blah.git#commit-ish
```

## module 定义

A module is any file or directory in the node_modules directory that can be loaded by the Node.js require() function. To be loaded by the Node.js require() function, a module must be one of the following:

A folder with a package.json file containing a "main" field.
A JavaScript file.

一个模块就是任意一个在 node_modules 目录下的文件或者目录, 并且这个文件或者目录可以被 Node.js 的 require()函数加载. 为了能让 Node.js 的 require()函数加载, 模块必须具备下面列出选项的任何一个:

- 如果是文件夹, 那么文件夹下属的 package.js 文件中有一个"main"字段
- 或者一个 JavaScript 文件

一个具有 package.json 的模块也被成为一个包.

## package 定义

A package is a file or directory that is described by a package.json file. A package must contain a package.json file in order to be published to the npm registry.

一个被 package.json 描述的文件或者文件夹被称为一个包. 为了发布到 npm 仓库, 一个包必须包含 package.json 文件.

Packages can be unscoped or scoped to a user or organization, and scoped packages can be private or public. Unscoped packages are always public.

一个用户或者组织发布的包可以带命名空间或者不带命名空间, 带命名空间的包可是是公开的或者私有的.

## 查看 npm 的配置

```shell
npm config ls -l
```

## 管理多个 registry

Using npmrc to managing multiple profiles for different registries

请使用 npmrc 来管理多个 registry

```shell
npm install -g npmrc
```

## 获取或者设置 npm 仓库地址

```shell
# 获取registry地址
npm config get registry

# 设置registry
npm config set registry https://registry.npmjs.org/
```

## mac 下面 npm 全局包安装的位置

`/usr/local/lib/node_modules`

## npm 如何下架已经发布得包

打开<https://www.npmjs.com/support/>, 填写申请单即可.下面是样例

Subject: please help me unpublish the old **@buuug7/simplify** package

How can we help?
the old **@buuug7/simplify** package is outdate, i published new package to replace it and the **@buuug7/simplify** is not used any more, please help me delete it [@buuug7/simplify](https://www.npmjs.com/package/@buuug7/simplify). thanks.

## npm 发部带 scope 的包

先在 package.json 中 name 中指定 '@scopeName/packageName', 然后在发布的时候需要指定 --access public 选项 `npm publish --access public`

## Node version management

```
// 安装
npm install -g n

// Use or install the latest official release:
n latest

// Use or install the stable official release:
n stable

// Use or install the latest LTS official release:
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

```
// 淘宝地址
npm config set registry https://registry.npm.taobao.org

//当你想发布自己的包时，需要将地址修改回来
npm config set registry https://registry.npmjs.org/
```

## npm 常用命令

```
//安装包并保存到package.json文件中的devDependencies属性中
npm install packageName --save-dev
or
npm install packageName -D

//安装包并保存到package.json文件中的dependencies属性中
npm install packageName --save

//全局安装一个包
npm install packageName -g

//npm升级自身
npm install npm -g
```
