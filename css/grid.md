# grid

> [complete-guide-grid](https://css-tricks.com/snippets/css/complete-guide-grid/)

CSS 网格布局是 CSS 中功能最强大的布局系统。它是一个二维系统，这意味着它既可以处理列又可以处理行，而 flexbox 很大程度上是一维系统。通过将 CSS 规则应用于父元素（成为 Grid 容器）和该元素的子元素（成为 Grid Items），您可以使用 Grid Layout。

## introduction

CSS 网格布局（又称“网格”）是基于二维网格的布局系统，旨在完全改变我们设计基于网格的用户界面的方式。 CSS 一直被用来布置我们的网页，但是它从来没有做得很好。首先，我们使用表格，然后使用浮动，定位和内联块，但是所有这些方法本质上都是 hack，并且遗漏了许多重要功能（例如，垂直居中）。 Flexbox 提供了帮助，但它适用于更简单的一维布局，而不是复杂的二维布局（Flexbox 和 Grid 实际上可以很好地协同工作）。网格是专门为解决布局问题而创建的第一个 CSS 模块，自我们创建网站以来，我们一直在探索自己的方式。

## properties for the parent (grid container)

#### display

- **grid** generates a block-level grid
- **inline-grid** generates an inline-level grid

```css
.container {
  display: grid | inline-grid;
}
```

#### grid-template-columns grid-template-rows

用空格分隔的值定义网格的列和行。这些值表示轨道大小，它们之间的间隔表示网格线。

- <track-size> can be a length, a percentage, or a fraction of the free space in the grid (using the fr unit)
- <line-name> an arbitrary name of your choosing

```css
.container {
  grid-template-columns: ... | ...;
  grid-template-rows: ... | ...;
}

.container-1 {
  grid-template-columns: 20px auto 30px;
  grid-template-rows: 100px 200px auto;
}
```

#### grid-template-areas

通过引用使用 grid-area 属性指定的网格区域的名称来定义网格模板。重复网格区域的名称会使内容跨越这些单元格。句点表示一个空单元格。语法本身提供了网格结构的可视化。

- <grid-area-name> - the name of a grid area specified with grid-area
- . - a period signifies an empty grid cell
- none - no grid areas are defined

```css
.container {
  grid-template-areas:
    " | . | none | ..."
    "...";
}

// eg
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 100px 100px 100px;
  grid-template-areas:
    "header header header"
    "main main main"
    "footer footer footer";
}

.item-a {
  grid-area: header;
}
.item-b {
  grid-area: main;
}
.item-c {
  grid-area: footer;
}
```

```html
<div class="container">
  <div class="item-a">Lorem, ipsum.</div>
  <div class="item-c">Veritatis, fugiat?</div>
  <div class="item-b">Sequi, iusto?</div>
</div>
```

#### grid-template

A shorthand for setting `grid-template-rows`, `grid-template-columns`, and `grid-template-areas` in a single declaration. it’s recommended to use the grid property instead of grid-template.

```css
.container {
  grid-template: none | <grid-template-rows> / <grid-template-columns>;
}
```

#### column-gap row-gap grid-column-gap grid-row-gap

指定网格线的大小。您可以将其视为设置列/行之间的装订线宽度。

`grid-column-gap` and `grid-row-gap` will be removed, recommended use `column-gap` and `row-gap`.

```css
.container {
  column-gap: <line-size>;
  row-gap: <line-size>;
}
```

#### gap grid-gap

A shorthand for `row-gap` and `column-gap`.

```css
.container {
  gap: <row-gap> <column-gap>;
}
```

The grid- prefix is deprecated (but who knows, may never actually be removed from browsers). Essentially grid-gap renamed to gap.
