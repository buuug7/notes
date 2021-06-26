# CSS 选择器

在 CSS 中，选择器是用于选择要设置样式的元素的模式。

## reference

- [w3schools css selector](https://www.w3schools.com/cssref/css_selectors.asp)

## class 选择器

```css
/* 选择所有 class="className" 的元素 */
.className {
  color: red;
}

/* 选择所有 class="className1 className"的元素 */
.className1.className2 {
  color: red;
}

/* 选择class="className2"的所有元素, 并且该元素是class="className1"的后代元素 */
.className1 .className2 {
  color: red;
}
```

## ID 选择器

```css
/* 选择 id="myId"的元素 */
#myId {
  color: red;
}
```

## `*` 选择器

```css
/* 选择所有元素 */
* {
  color: red;
}
```

## 标签选择器

```css
/* 选择所有 <p> 元素 */
p {
  color: red;
}

/* 选择所有具有class="className"的<p>元素 */
p.className {
  color: red;
}

/* 选择所有<p>,<div> 元素 */
p,
div {
  color: red;
}

/* 选择所有在<div>下面的<p>元素 */
div p {
  color: red;
}

/* 选择父元素是<div>的所有<p>元素 */
div > p {
  color: red;
}

/* 选择紧跟在<div>后面的第一个<p>元素 */
div + p {
  color: red;
}

/* 选择前面有<p>元素的每一个<ul>元素 */
p ~ ul {
  color: red;
}
```

## 属性选择器

```css
/* 选择具有href属性的所有元素 */
[href] {
  color: blue;
}

/* 选择href="_black"的所有元素 */
[href="_black"] {
  color: blue;
}

/* 选择属性title包含flower的所有元素, 值为以空格分割的单个或者多个字符 */
[title~="flower"] {
  color: blue;
}

/* 选择具有lang属性,并且以en,en-开始的元素*/
[lang|="en"] {
}

/* 选择href属性以https开头的每一个<a>元素 */
a[href^="https"] {
  color: blue;
}

/* 选择href属性以.pdf结尾的每一个<a>元素 */
a[href$=".pdf"] {
  color: red;
}

/* 选择href属性包含w3schools的每一个<a>元素 */
a[href*="w3schools"] {
  color: red;
}

/* 匹配title属性值包含name的元素 */
[title*="name" i] {
  color: red;
}

/* 组合使用 */
div[title][class="a"] {
  color: red;
}
```

## 伪类选择器

- `a:active` Selects the active link
- `p::after` Insert something after the content of each <p> element
- `p::before` Insert something before the content of each <p> element
- `input:checked` Selects every checked <input> element
- `input:default` Selects the default <input> element
- `input:disabled` Selects every disabled <input> element
- `p:empty` Selects every <p> element that has no children (including text nodes)
- `input:enabled` Selects every enabled <input> element
- `p:first-child` Selects every <p> element that is the first child of its parent
- `p::first-letter` Selects the first letter of every <p> element
- `p::first-line` Selects the first line of every <p> element
- `p:first-of-type` Selects every <p> element that is the first <p> element of its parent
- `input:focus` Selects the input element which has focus
