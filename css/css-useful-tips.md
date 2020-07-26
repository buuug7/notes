# css-useful-tips

some useful css tips(一些有用的 css 技巧, 大部分来自 wtfhtmlcss.com)

## 永远声明文档类型(always include a doctype)

强烈建议用 HTML5 的 doctype,缺少文档类型声明会使你的网页有些地方出现莫名其妙的显式 bug

```html
<!DOCTYPE html>
```

## 使用盒子模型的 border-box

额外的 padding 和 border-width 会使元素所占用的空间超出它本身的大小, 为了避免这种情况, 请设置 box-sizing:border-box 后, padding 和 border-width 不会增加元素额外所占用的空间, 下面是一个通用的做法, 复制粘贴到你的 css 文件即可生效

```css
/* apply a natural box layout model to all elements, but allowing components to change */
html {
  box-sizing: border-box;
}
*,
*:before,
*:after {
  box-sizing: inherit;
}
```

## 浮动元素优先(floats first)

浮动元素的文档顺序应该是第一位的, 浮动元素需要被包裹, 负责会引起文档结构颠倒, 请参考下面的例子

```html
<div class="parent">
  <div class="float">Float</div>
  <div class="content">
    <!-- ... -->
  </div>
</div>
```

## 浮动和清除(floats and clearing)

任何内容后面跟着的浮动元素会环绕在该内容的周围直到你清除该浮动, 用下面给出的代码来解决你的浮动问题.

现代化的 clearfix
```css
.clearfix::after {
  display: block;
  content: "";
  clear: both;
}
```

古典的 clearfix
```css
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
```

## 浮动元素高度计算

父元素包含浮动的子元素会导致浏览器计算其高度为 0, 添加 clearfix 来阻止浏览器计算其高度

## 浮动元素会将该元素变成块级元素

浮动元素会自动转换 display:block, 所以不要在一个元素设置浮动属性后在设置其 display:block, 没有必要

```css
.element {
  float: left;
  display: block; /* Not necessary */
}
```

## 垂直相邻元素的 margin 边界会重叠到一起

在很多情况中, 垂直对齐的元素的上边界和底边界会重叠一起, 对于浮动元素或者绝对(absolutely)元素来说是永远不会重叠的, 当然水平相邻的元素的边界也不会重叠

## 永远设置 `<button>` 元素的 type

`<button>`的 type 默认是 submit, 通过设置`<button>`的 type="button" 来阻止其提交表单的功能

## 关于定位的解释(position explained)

- position:fixed; 是基于浏览器视口来定位元素
- position:absolute; 是根据它最近的已定位的父元素来定位的, 配合 TRBL(top right bottom left)来定位(如果父元素没有设置 position, 则以浏览器左上角为原点定位)
- position:relative; 参照父元素左上角结合 TRBL 来定位

## 定位与宽度(position and width)

在定位 position:absolute|fixed, 的时候不要设置 width:100%; 因为 width:100%, 就相当于设置 left:0;right:0;

## fixed 定位与 transforms

当一个元素的父元素有 transform 设置的时候, 会用 transforms 创建一个新的包含块, 强制设置父元素的 position:relative,position:fixed; 的元素会具有 position:absolute; 属性,可以参考该例子 [demo](http://output.jsbin.com/yabek/1/)
