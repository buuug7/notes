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

#### justify-items

Aligns grid items along the inline (row) axis (as opposed to **align-items** which aligns along the block (column) axis). This value applies to all grid items inside the container.

该属性指定在 row 轴上对齐方式

- start – aligns items to be flush with the start edge of their cell
- end – aligns items to be flush with the end edge of their cell
- center – aligns items in the center of their cell
- stretch – fills the whole width of the cell (this is the default)

```css
.container {
  justify-items: start | end | center | stretch;
}
```

#### align-items

Aligns grid items along the block (column) axis (as opposed to **justify-items** which aligns along the inline (row) axis). This value applies to all grid items inside the container.

该属性指定在 column 轴对齐方式

- start – aligns items to be flush with the start edge of their cell
- end – aligns items to be flush with the end edge of their cell
- center – aligns items in the center of their cell
- stretch – fills the whole height of the cell (this is the default)

```css
.container {
  align-items: start | end | center | stretch;
}
```

#### place-items

**place-items** sets both the **align-items** and **justify-items** properties in a single declaration.

values:

<align-items> / <justify-items> – The first value sets align-items, the second value justify-items. If the second value is omitted, the first value is assigned to both properties.

#### justify-content

Sometimes the total size of your grid might be less than the size of its grid container. This could happen if all of your grid items are sized with non-flexible units like px. In this case you can set the alignment of the grid within the grid container. This property aligns the grid along the inline (row) axis (as opposed to **align-content** which aligns the grid along the block (column) axis).

有时，网格的总大小可能小于其网格容器的大小。如果所有网格项目的大小都以非弹性单位（例如 px）为单位，则可能会发生这种情况。在这种情况下，您可以在网格容器中设置网格的对齐方式。此属性使网格沿内嵌（行）轴对齐（与 align-content 相对，后者使网格沿块（列）轴对齐）。

Values:

- start – aligns the grid to be flush with the start edge of the grid container
- end – aligns the grid to be flush with the end edge of the grid container
- center – aligns the grid in the center of the grid container
- stretch – resizes the grid items to allow the grid to fill the full width of the grid container
- space-around – places an even amount of space between each grid item, with half-sized spaces on the far ends
- space-between – places an even amount of space between each grid item, with no space at the far ends
- space-evenly – places an even amount of space between each grid item, including the far ends

```css
.container {
  justify-content: start | end | center | stretch | space-around | space-between
    | space-evenly;
}
```

#### align-content

Sometimes the total size of your grid might be less than the size of its grid container. This could happen if all of your grid items are sized with non-flexible units like px. In this case you can set the alignment of the grid within the grid container. This property aligns the grid along the block (column) axis (as opposed to **justify-content** which aligns the grid along the inline (row) axis).

有时，网格的总大小可能小于其网格容器的大小。如果所有网格项目的大小都以非弹性单位（例如 px）为单位，则可能会发生这种情况。在这种情况下，您可以在网格容器中设置网格的对齐方式。该属性使网格沿块（列）轴对齐（与对齐内容相反，其使网格沿内联（行）轴对齐）。

Values:

- start – aligns the grid to be flush with the start edge of the grid container
- end – aligns the grid to be flush with the end edge of the grid container
- center – aligns the grid in the center of the grid container
- stretch – resizes the grid items to allow the grid to fill the full height of the grid container
- space-around – places an even amount of space between each grid item, with half-sized spaces on the far ends
- space-between – places an even amount of space between each grid item, with no space at the far ends
- space-evenly – places an even amount of space between each grid item, including the far ends

```css
.container {
  align-content: start | end | center | stretch | space-around | space-between |
    space-evenly;
}
```

#### place-content

place-content sets both the **align-content** and **justify-content** properties in a single declaration.

Values:

<align-content> / <justify-content> – The first value sets align-content, the second value justify-content. If the second value is omitted, the first value is assigned to both properties.

#### grid-auto-columns grid-auto-rows

Specifies the size of any auto-generated grid tracks (aka implicit grid tracks). Implicit tracks get created when there are more grid items than cells in the grid or when a grid item is placed outside of the explicit grid. (see The Difference Between Explicit and Implicit Grids)

指定任何自动生成的网格轨道（也称为隐式网格轨道）的大小。当网格项目多于网格中的单元格或将网格项目放置在显式网格之外时，会创建隐式轨迹。

Values:

- <track-size> – can be a length, a percentage, or a fraction of the free space in the grid (using the fr unit)

```css
.container {
  grid-auto-columns: <track-size>...;
  grid-auto-rows: <track-size>...;
}
```

#### grid-auto-flow

If you have grid items that you don’t explicitly place on the grid, the auto-placement algorithm kicks in to automatically place the items. This property controls how the auto-placement algorithm works.

如果您有未明确放置在网格上的网格项目，则自动放置算法会自动插入项目。此属性控制自动放置算法的工作方式。

Values:

- row – tells the auto-placement algorithm to fill in each row in turn, adding new rows as necessary (default)
- column – tells the auto-placement algorithm to fill in each column in turn, adding new columns as necessary
- dense – tells the auto-placement algorithm to attempt to fill in holes earlier in the grid if smaller items come up later

```css
.container {
  grid-auto-flow: row | column | row dense | column dense;
}
```

#### grid

A shorthand for setting all of the following properties in a single declaration: grid-template-rows, grid-template-columns, grid-template-areas, grid-auto-rows, grid-auto-columns, and grid-auto-flow (Note: You can only specify the explicit or the implicit grid properties in a single grid declaration).

## Properties for the Children (Grid Items)

Note:

`float`, `display: inline-block`, `display: table-cell`, `vertical-align` and `column-*` properties have no effect on a grid item.

#### grid-column-start grid-column-end grid-row-start grid-row-end

Determines a grid item’s location within the grid by referring to specific grid lines. grid-column-start/grid-row-start is the line where the item begins, and grid-column-end/grid-row-end is the line where the item ends.

Values:

- <line> – can be a number to refer to a numbered grid line, or a name to refer to a named grid line
- span <number> – the item will span across the provided number of grid tracks
- span <name> – the item will span across until it hits the next line with the provided name
- auto – indicates auto-placement, an automatic span, or a default span of one

```css
.item {
  grid-column-start: <number> | <name> | span <number> | span <name> | auto;
  grid-column-end: <number> | <name> | span <number> | span <name> | auto;
  grid-row-start: <number> | <name> | span <number> | span <name> | auto;
  grid-row-end: <number> | <name> | span <number> | span <name> | auto;
}
```

#### grid-column grid-row

Shorthand for grid-column-start + grid-column-end, and grid-row-start + grid-row-end, respectively.

Values:

- <start-line> / <end-line> – each one accepts all the same values as the longhand version, including span

```css
.item {
  grid-column: <start-line> / <end-line> | <start-line> / span <value>;
  grid-row: <start-line> / <end-line> | <start-line> / span <value>;
}
```

#### grid-area

Gives an item a name so that it can be referenced by a template created with the grid-template-areas property. Alternatively, this property can be used as an even shorter shorthand for grid-row-start + grid-column-start + grid-row-end + grid-column-end.

Values:

- <name> – a name of your choosing
- <row-start> / <column-start> / <row-end> / <column-end> – can be numbers or named lines

```css
.item {
  grid-area: <name> | <row-start> / <column-start> / <row-end> / <column-end>;
}
```

As a way to assign a name to the item:

```css
.item-d {
  grid-area: header;
}
```

As the short-shorthand for grid-row-start + grid-column-start + grid-row-end + grid-column-end:

```css
.item-d {
  grid-area: 1 / col4-start / last-line / 6;
}
```

#### justify-self

Aligns a grid item inside a cell along the inline (row) axis (as opposed to align-self which aligns along the block (column) axis). This value applies to a grid item inside a single cell.

Values:

- start – aligns the grid item to be flush with the start edge of the cell
- end – aligns the grid item to be flush with the end edge of the cell
- center – aligns the grid item in the center of the cell
- stretch – fills the whole width of the cell (this is the default)

```css
.item {
  justify-self: start | end | center | stretch;
}
```

#### align-self

Aligns a grid item inside a cell along the block (column) axis (as opposed to justify-self which aligns along the inline (row) axis). This value applies to the content inside a single grid item.

Values:

- start – aligns the grid item to be flush with the start edge of the cell
- end – aligns the grid item to be flush with the end edge of the cell
- center – aligns the grid item in the center of the cell
- stretch – fills the whole height of the cell (this is the default)

```css
.item {
  align-self: start | end | center | stretch;
}
```

#### place-self

place-self sets both the align-self and justify-self properties in a single declaration.

Values:

- auto – The “default” alignment for the layout mode.
- <align-self> / <justify-self> – The first value sets align-self, the second value justify-self. If the second value is omitted, the first value is assigned to both properties.

## Special Functions and Keywords

- When sizing rows and columns, you can use all the lengths you are used to, like px, rem, %, etc, but you also have keywords like min-content, max-content, auto, and perhaps the most useful, fractional units. grid-template-columns: 200px 1fr 2fr min-content;

- You also have access to a function which can help set boundaries for otherwise flexible units. For example to set a column to be 1fr, but shrink no further than 200px: grid-template-columns: 1fr minmax(200px, 1fr);

- There is repeat() function, which saves some typing, like making 10 columns: grid-template-columns: repeat(10, 1fr);

- Combining all of these things can be extremely powerful, like grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); See the demo at the top of the page about “The Most Powerful Lines in Grid”.
