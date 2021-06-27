# CSS 选择器

在 CSS 中，选择器是用于选择要设置样式的元素的模式。

## Reference

- [w3schools css selector](https://www.w3schools.com/cssref/css_selectors.asp)
- [MDN css selector](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors)

## class 选择器

- `.className` 选择所有 class="className" 的元素
- `.className1.className2` 选择所有 class="className1 className"的元素
- `.className1 .className2` 选择 class="className2"的所有元素, 并且该元素是 class="className1"的后代元素

## ID 选择器

- `#myId` 选择 id="myId"的元素

## `*` 选择器

- `*` 选择所有元素

## 标签选择器

- `p` 选择所有 `<p>` 元素
- `p.className` 选择所有具有 class="className"的`<p>`元素
- `p,div` 选择所有`<p>`,<div> 元素
- `div p` 选择所有在<div>下面的`<p>`元素
- `div > p` 选择父元素是<div>的所有`<p>`元素
- `div + p` 选择紧跟在<div>后面的第一个`<p>`元素
- `p ~ ul` 选择前面有`<p>`元素的每一个`<ul>`元素

## 属性选择器

- `[href]` 选择具有 href 属性的所有元素
- `[target="_black"]` 选择 `target="_black"` 的所有元素
- `[title~="flower"]` 选择属性 title 包含 flower 的所有元素, 值为以空格分割的单个或者多个字符
- `[lang|="en"]` 选择具有 lang 属性, 并且以 en,en-开始的元素
- `a[href^="https"]` 选择 href 属性以 https 开头的每一个`<a>`元素
- `a[href$=".pdf"]` 选择 href 属性以`.pdf` 结尾的每一个<a>元素
- `a[href*="w3schools"]` 选择 href 属性包含 w3schools 的每一个<a>元素
- `[title*="name" i]` 匹配 title 属性值包含 name 的元素, 忽略大小写
- `div[title][href^="https"]` 组合使用

## 伪类选择器

- `a:active` Selects the active link
- `p::after` Insert something after the content of each `<p>` element
- `p::before` Insert something before the content of each `<p>` element
- `input:checked` Selects every checked `<input>` element
- `input:default` Selects the default `<input>` element
- `input:disabled` Selects every disabled `<input>` element
- `p:empty` Selects every `<p>` element that has no children (including text nodes)
- `input:enabled` Selects every enabled `<input>` element
- `p:first-child` Selects every `<p>` element that is the first child of its parent
- `p::first-letter` Selects the first letter of every `<p>` element
- `p::first-line` Selects the first line of every `<p>` element
- `p:first-of-type` Selects every `<p>` element that is the first `<p>` element of its parent
- `input:focus` Selects the input element which has focus
- `a:hover` Selects links on mouse over
- `a:link` Selects all unvisited links
- `a:visited` Selects all visited links
- `:not(p)` Selects every element that is not a <p> element
- `p:nth-child(2)` Selects every <p> element that is the second child of its parent
- `p:nth-of-type(2)` Selects every <p> element that is the second <p> element of its parent
- `p:nth-last-child(2)` Selects every <p> element that is the second child of its parent, counting from the last child
- `p:nth-last-of-type(2)` Selects every <p> element that is the second <p> element of its parent, counting from the last child
- `::selection` Selects the portion of an element that is selected by a user
- `p:only-child` Selects every <p> element that is the only child of its parent
