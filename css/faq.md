# Css FAQ

## 文档流

- 普通流,普通流中元素的位置由该元素在 HTML 文档中的位置决定。行内元素水平排列，直到当行被占满然后换行，块级元素则会被渲染为完整的一个新行
- 浮动,在浮动布局中，元素首先按照普通流的位置出现，然后根据浮动的方向尽可能的向左边或右边偏移，其效果与印刷排版中的文本环绕相似。
- 绝对定位,在绝对定位布局中，元素会整体脱离普通流，因此绝对定位元素不会对其兄弟元素造成影响，而元素具体的位置由绝对定位的坐标决定。

## BFC

BFC 即 Block Formatting Contexts (块级格式化上下文)，它属于上述定位方案的普通流。 具有 BFC 特性的元素可以看作是隔离了的独立容器，容器里面的元素不会在布局上影响到外面的元素，并且 BFC 具有普通容器所没有的一些特性. 通俗一点来讲，可以把 BFC 理解为一个封闭的大箱子，箱子内部的元素无论如何翻江倒海，都不会影响到外部。

只要元素满足下面任一条件即可触发 BFC 特性：

- body 根元素
- 浮动元素：float 除 none 以外的值
- 绝对定位元素：position (absolute、fixed)
- display 为 inline-block、table-cells、flex
- overflow 除了 visible 以外的值 (hidden、auto、scroll)

BFC 的应用:

- 同一个 BFC 下外边距会发生折叠
- BFC 可以包含浮动的元素（清除浮动）
- BFC 可以阻止元素被浮动元素覆盖

## positioning with floats

HTML 的标准文档流是: 从上到下, 从左到右, 遇到块级元素换行

浮动层: 元素 float 属性后, 就是脱离文档流, 进行左右浮动, 紧贴着父元素的左右边框, 浮动元素空出的位置, 由后续的非浮动元素填充, 块级元素直接填充上去, 内联元素有空隙就插入. 设置一个元素浮动不仅影响它自己，而且影响它的祖先，兄弟元素。

float 属性允许我们把一个元素从文档正常流中移除, 把它定位到其父元素左边或者右边, 其他非浮动的元素就会环绕该浮动的元素, 通常 float 属性有两个最常用的值 left, right.

浮动元素默认是块级元素, 所以他会改变元素的默认显示样式, 比如`<span>`是行内元素, 但是给它设置 float 属性后它会自动变成块级元素.

```css
div {
  float: left;
  /*float:right;*/
}
```

## 清除浮动

清除浮动使用 clear 属性,其值用的最多的是 left, right 和 both

```css
div {
  clear: left;
  /*clear:right;*/
  /*clear:both;*/
}
```

## 盒模型

CSS 盒模型描述了以文档树中的元素而生成的矩形框，并根据排版模式进行布局（box-sizing）。每个盒子都有一个内容区域（例如文本，图像等）以及周围可选的 padding（内边距）、border（边框） 和 margin（外边距） 区域。

## 说说你对盒模型的理解，以及如何告知浏览器使用不同的盒模型渲染布局

CSS 盒模型描述了以文档树中的元素而生成的矩形框，并根据排版模式进行布局。每个盒子都有一个内容区域（例如文本，图像等）以及周围可选的 padding、border 和 margin 区域。

CSS 盒模型负责计算：

- 块级元素占用多少空间。
- 边框是否重叠，边距是否合并。
- 盒子的尺寸。

盒模型有以下规则：

- 块级元素的大小由 width、height、padding、border 和 margin 决定。
- 如果没有指定 height，则块级元素的高度等于其包含子元素的内容高度加上 padding（除非有浮动元素，请参阅下文）。
- 如果没有指定 width，则非浮动块级元素的宽度等于其父元素的宽度减去父元素的 padding。
- 元素的 height 是由内容的 height 来计算的。
- 元素的 width 是由内容的 width 来计算的。
- 默认情况下，padding 和 border 不是元素 width 和 height 的组成部分。

通过 box-sizing 属性可以被用来调整这些表现:

- content-box 是默认值。如果你设置一个元素的宽为 100px，那么这个元素的内容区会有 100px 宽，并且任何边框和内边距的宽度都会被增加到最后绘制出来的元素宽度中。
- border-box 告诉浏览器：你想要设置的边框和内边距的值是包含在 width 内的。也就是说，如果你将一个元素的 width 设为 100px，那么这 100px 会包含它的 border 和 padding，内容区的实际宽度是 width 减去(border + padding)的值。大多数情况下，这使得我们更容易地设定一个元素的宽高。

## relative fixed absolute static 四种定位有什么区别

经过定位的元素，其 position 属性值必然是 relative、absolute、fixed 或 sticky。

#### relative

元素的默认定位行为，当将一个元素设置为`position: relative`, 它会脱离文档流, 具体偏移的位置根据其`left`, `right`, `top` and `bottom`的值来决定, 偏移是相对于其原始位置, 其相邻的其他元素并未察觉到该元素已经偏移了.。

#### absolute

当元素被设置为`absolute`的时候，元素同样脱离正常文档流，其定位是根绝它最近已经定位的父元素，配合 `top, right, bottom, left`来定位

#### fixed

被设置为`fixed`的元素与设置`absolute`十分相似, 只是它参考的是当前浏览器窗口(视口)

#### sticky

元素根据正常流定位，然后相对于它最近滚动祖先。偏移值不会影响任何其他元素的位置。

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

## 定位与宽度(position and width)

在定位 position:absolute|fixed, 的时候不要设置 width:100%; 因为 width:100%, 就相当于设置 left:0;right:0;

## fixed 定位与 transforms

当一个元素的父元素有 transform 设置的时候, 会用 transforms 创建一个新的包含块, 强制设置父元素的 position:relative,position:fixed; 的元素会具有 position:absolute; 属性,可以参考该例子 [demo](http://output.jsbin.com/yabek/1/)
