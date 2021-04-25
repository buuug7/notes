# Css FAQ

## 盒模型

CSS 盒模型描述了以文档树中的元素而生成的矩形框，并根据排版模式进行布局（box-sizing）。每个盒子都有一个内容区域（例如文本，图像等）以及周围可选的 padding（内边距）、border（边框） 和 margin（外边距） 区域。

## relative fixed absolute static 四种定位有什么区别

经过定位的元素，其 position 属性值必然是 relative、absolute、fixed 或 sticky。

- fixed 元素的默认定位行为，元素会根据正常文档流来定位，设置 TRBL(top right bottom left)属性不会起任何作用。
- relative 元素根据文档的正常流来定位，以它原本的位置作为参考点，通过设置 TRBL(top right bottom left)偏移来定位，它的偏移不会影响其他的元素。
- absolute 元素会从正常文档流中移除，不为元素预留空间，是根据它最近的已定位的祖先元素来定位的, 配合 TRBL(top right bottom left)来定位(如果父元素没有设置 position, 则以浏览器左上角为原点定位)
- sticky 元素根据正常流定位，然后相对于它最近滚动祖先，通过设置 TRBL 的值来偏移。偏移值不会影响任何其他元素的位置。
