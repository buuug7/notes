# flexbox 弹性布局

在设置 flex 布局后,子元素的 float,clear 和 vertical-align 属相将会失效.

- [参考资料 1](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [参考资料 2](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)

## 以下下属相用在 flex 容器上

#### display

定义 flex 容器

```css
.container {
  display: flex;
}
```

#### flex-direction

定义容器内的主轴方向

```css
.container {
  flex-direction: row|row-reverse|column|column-reverse;
}
```

- row(default),从左到右
- row-reverse,从右到左
- column,从上到下
- column-reverse,从下到上

#### flex-wrap

默认情况下,项目都在一条线上,如果一条轴线排不下,定义如何换行.

```css
.container {
  flex-warp: nowrap|wrap|warp-reverse;
}
```

- nowrap,在同一行显示,不换行
- wrap,显示不下会换行
- wrap-reverse,换行,从底部到顶部

#### flex-flow

这个是`flex-direction`和`flex-wrap`的简写,默认值为 row nowrap

```css
.container {
  flex-flow: < "flex-direction" > || < "flex-wrap" >;
}
```

#### justify-content

该属性用来指定项目在主轴上对齐的方式.

```css
.container {
  justify-content: flex-start|flex-end|center|space-between|space-around;
}
```

- flex-start(default),左对齐
- flex-end ,右对齐
- center , 居中
- space-between ,两端对齐
- space-around ,每个项目两侧的间隔相等.

#### align-items

定义项目在交叉轴上的对齐方式

```css
.container {
  align-items: flex-start|flex-end|center|baseline|stretch;
}
```

- flex-start 交叉轴的起点对齐
- flex-end 交叉轴的终点对齐
- center 交叉轴的终点对齐
- baseline 项目的第一行文字基线对齐
- stretch(默认值) 如果项目为设置高度或者为 auto,将占满整个容器的高度

#### align-content

该属性定义了多根轴线的对齐方式,如果项目只有一根轴线,该属性不起作用

```css
.container {
  align-content: flex-start|flex-end|center|space-between|space-aroud|stretch;
}
```

- flex-start 与交叉轴的起点对齐
- flex-end 与交叉轴的终点对齐
- center 与交叉轴的中点对齐
- space-between 与交叉轴两端对齐
- space-around 每根轴线两侧间隔相等.
- stretch (default) 轴线占满整个交叉轴

## 以下属性用在 flex 项目上

#### order

该属性定义项目的排列顺序.数值越小越靠前,默认值为 0

```css
.item {
  order: <integer>;
}
```

#### flex-grow

该属性定义了项目放大比例,默认为 0,即如果存在剩余空间,也不放大.

```css
flex-grow: <number>;
```

#### flex-shrink

该属性定义了项目的缩放比例,默认为 1,即如果空间不足,该项目将会缩小.

```css
.item {
  flex-shrink: <number>;
}
```

#### flex-basis

该属性定义了在分配多余空间之前,项目占据主轴空间.

```css
.item {
  flex-basis: <length>|auto;
}
```

#### flex 属性

该属性是`flex-grow,flex-shrink,flex-basis`的简写,默认值为`0 1 auto`,推荐该简写

```css
.item {
  flex: none|[< "flex-grow" > < "flex-shrink" >? || < "flex-basis" >];
}
```

该属性有两个快捷键:auto (1 1 auto)和 none(0 0 auto);

#### align-self

该属性允许单个项目有与其他项目不一样的对齐方式,可覆盖`align-items`,默认值为 auto,表示继承父元素的 align-items,如果没有父元素,则等同于 stretch.

```css
.item {
  align-self: auto|flex-start|flex-end|center|baseline|stretch;
}
```
