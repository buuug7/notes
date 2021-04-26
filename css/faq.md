# Css FAQ

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

- fixed 元素的默认定位行为，元素会根据正常文档流来定位，设置 TRBL(top right bottom left)属性不会起任何作用。
- relative 元素根据文档的正常流来定位，以它原本的位置作为参考点，通过设置 TRBL(top right bottom left)偏移来定位，它的偏移不会影响其他的元素。
- absolute 元素会从正常文档流中移除，不为元素预留空间，是根据它最近的已定位的祖先元素来定位的, 配合 TRBL(top right bottom left)来定位(如果父元素没有设置 position, 则以浏览器左上角为原点定位)
- sticky 元素根据正常流定位，然后相对于它最近滚动祖先，通过设置 TRBL 的值来偏移。偏移值不会影响任何其他元素的位置。
