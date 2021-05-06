# document

## document.body

返回当前文档的`<body>`元素或者`<iframe>`元素

## document.characterSet

返回当前文档的字符编码

## document.compatMode

表示当前文档的渲染模式是混杂模式还是标准模式,如果值为`BackCompat`则为混杂模式,如果值为`CSS1Compat`为标准模式

## document.defaultView

在浏览器中,该属性返回当前 document 对象所关联的 window 对象

## document.designMode

控制整个文档是否为可编辑,有效值为 on 跟 off,默认为 off

## document.dir

代表了文档的文字朝向,默认是从左到右,`rtl`代表从右到左,`ltr`代表从左到右

```javascript
document.dir; // ltr
document.dir = "rtl"; // 设置成从右到左
```

## document.doctype

返回当前文档关联的文档类型定义 DTD,是一个只读属性

```javascript
document.doctype; // <!doctype html>
```

## document.documentElement

是一个返回文档对象根元素的只读属性,使用这个只读属性可以很方便的获取任意文档的根元素

```javascript
document.documentElement; // <html....
```

## document.documentURI

返回文档的地址字符串,该属性为只读属性

```javascript
document.documentURI; // http://some..../a/b
```

## document.domain

获取/设置当前文档的原始域部分,用于同源策略

```javascript
document.domain; // some.com
```

## document.forms

返回当前文档中`<form>`元素的一个集合

## document.head

返回当前文档中的`<head>`元素,如果有多个,只返回第一个

## document.hidden

返回布尔值,表示页面是否隐藏

## document.images

返回当前文档中所有 image 元素的集合

## document.links

返回一个包含文档中所有具有 href 属性值的元素集合

## document.location

只读属性,返回一个 Location 对象,包含了文档 URL 相关的信息,并提供了改变 URL 和加载其他 URL 的方法.

```javascript
document.location.href; //
document.location.pathname; //
```

## document.readyState

描述了文档的加载状态,其值为

- `loading` 仍在加载
- `interactive` 文档加载完毕,文档已被解析,但是诸如图像,样式表和子框架的子资源扔在加载
- `complete` 完成加载,`load`事件即将触发

```javascript
document.onreadystatechange = function () {
  console.log(e);
};
```

## document.referrer

返回跳转或者打开当前页面的那个页面

```javascript
document.referrer; // http....
```

## document.scripts

返回当前文档中所有`<script>`元素集合

## document.scrollingElement

返回滚动文档的 Element 对象的引用,在标准模式下,这是文档的根元素,即`document.documentElement`

```javascript
document.scrollingElement.scrollTop = 0; //让页面滚动到顶部
```
