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

#### before after

::before 和::after 这两个主要用来给元素的前面或后面插入内容，这两个常和"content"配合使用，使用的场景最多的就是清除浮动。

```css
p:before {
  content: '"';
  font-size: 2rem;
  padding-right: 1rem;
}
p:after {
  content: "(-_-)";
  font-size: 2rem;
  padding-left: 1rem;
}
```

```html
<p>Lorem ipsum dolor sit.</p>
```

#### empty

用来选择没有任何内容的元素，这里没有内容指的是一点内容都没有，哪怕是一个空格。

```css
/* 隐藏空白的<p>元素 */
p {
  min-height: 1rem;
  background-color: orange;
}

p:empty {
  display: none;
}
```

#### first-child

表示选择父元素的第一个子元素的元素, 简单点理解就是选择元素中的第一个子元素, 记住是子元素, 而不是后代元素

```css
ul li:first-child {
  color: red;
}
```

```html
<ul>
  <li>Lorem ipsum dolor sit amet.</li>
  <li>Consequuntur fuga iusto minus officiis!</li>
  <li>Cumque facere illum laudantium quos.</li>
  <li>At culpa eveniet placeat qui.</li>
</ul>
```

#### last-child

与`:first-child`类似，选择的是元素的最后一个子元素

#### nth-child(n)

用来定位某个父元素的一个或多个特定的子元素, 其中 **n** 是其参数, 而且可以是整数值`1, 2, 3, 4`, 也可以是表达式 `2n+1,-n+5` 和关键词` odd、even`, 但参数 n 的起始值始终是 1, 而不是 0.

```css
ul li:nth-child(odd) {
  color: red;
}
```

```html
<ul>
  <li>Lorem ipsum dolor sit amet.</li>
  <li>Consequuntur fuga iusto minus officiis!</li>
  <li>Cumque facere illum laudantium quos.</li>
  <li>At culpa eveniet placeat qui.</li>
</ul>
```

#### nth-last-child(n)

`:nth-last-child(n)`选择器和前面的`:nth-child(n)`选择器非常的相似，只是这里多了一个“last”，所起的作用和`:nth-child(n)`选择器有所区别，从某父元素的最后一个子元素开始计算，来选择特定的元素。

```css
ul li:nth-last-child(odd) {
  color: red;
}
```

```html
<ul>
  <li>Lorem ipsum dolor sit amet.</li>
  <li>Consequuntur fuga iusto minus officiis!</li>
  <li>Cumque facere illum laudantium quos.</li>
  <li>At culpa eveniet placeat qui.</li>
</ul>
```

#### nth-of-type(n)

`:nth-of-type(n)` 选择器和 `:nth-child(n)` 选择器非常类似，不同的是它只计算父元素中指定的某种类型的子元素。当某个元素中的子元素不单单是同一种类型的子元素时，使用`:nth-of-type(n)`选择器来定位于父元素中某种类型的子元素是非常方便和有用的。在`:nth-of-type(n)`选择器中的 **n** 和 `:nth-child(n)` 选择器中的 n 参数也一样，可以是具体的整数，也可以是表达式，还可以是关键词。

```css
ul li:nth-of-type(odd) {
  color: red;
}
```

```html
<ul>
  <li>Lorem ipsum dolor sit amet.</li>
  <li>Consequuntur fuga iusto minus officiis!</li>
  <li>Cumque facere illum laudantium quos.</li>
  <li>At culpa eveniet placeat qui.</li>
</ul>
```

#### first-of-type

`:first-of-type` 选择器类似于 `:first-child` 选择器，不同之处就是指定了元素的类型,其主要用来定位一个父元素下的某个类型的第一个子元素。

```css
ul li:first-of-type {
  color: red;
}
```

```html
<ul>
  <li>Lorem ipsum dolor sit amet.</li>
  <li>Consequuntur fuga iusto minus officiis!</li>
  <li>Cumque facere illum laudantium quos.</li>
  <li>At culpa eveniet placeat qui.</li>
</ul>
```

#### last-of-type

`:last-of-type` 选择器和 `:first-of-type` 选择器功能是一样的，不同的是他选择是父元素下的某个类型的最后一个子元素。

#### nth-last-of-type(n)

“:nth-last-of-type(n)”选择器和“:nth-of-type(n)”选择器是一样的，选择父元素中指定的某种子元素类型，但它的起始方向是从最后一个子元素开始，而且它的使用方法类似于上节中介绍的“:nth-last-child(n)”选择器一样。

```css
ul li:nth-last-of-type(odd) {
  color: red;
}
```

```html
<ul>
  <li>Lorem ipsum dolor sit amet.</li>
  <li>Consequuntur fuga iusto minus officiis!</li>
  <li>Cumque facere illum laudantium quos.</li>
  <li>At culpa eveniet placeat qui.</li>
</ul>
```

#### root

从字面上我们就可以很清楚的理解是根选择器, 他的意思就是匹配元素所在文档的根元素。在 HTML 文档中, 根元素始终是 `<html>`

```css
:root {
  background: orange;
}
```

#### not

否定选择器, 可以选择除某个元素之外的所有元素, 记着 not 前面必须添加限定选择器, 起到对前面选择器下属的部分子元素否定作用.

```css
/* 非 <p> 元素 */
body :not(p) {
  color: red;
}

/* 链接中不是以https开头的链接 */
a:not([href^="https"]) {
  color: red;
}
```

#### only-child

`:only-child`选择器选择的是父元素中只有一个子元素，而且只有唯一的一个子元素。也就是说，匹配的元素的父元素中仅有一个子元素，而且是一个唯一的子元素。

```css
p:only-child {
  color: red;
}
```

```html
<div>
  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
  <p>Accusamus earum ipsam itaque iure placeat quaerat quis!</p>
</div>

<div>
  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
</div>
```

#### only-of-type

`:only-of-type` 选择器用来选择一个元素是它的父元素的唯一一个相同类型的子元素。这样说或许不太好理解，换一种说法。`:only-of-type` 是表示一个元素他有很多个子元素，而其中只有一种类型的子元素是唯一的，使用 `:only-of-type` 选择器就可以选中这个元素中的唯一一个类型子元素

```css
div p:only-of-type {
  color: red;
}
```

```html
<div>
  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
  <p>Accusamus earum ipsam itaque iure placeat quaerat quis!</p>
  <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</div>
</div>

<div>
  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
  <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</div>
</div>
```

#### enabled

在 Web 的表单中，有些表单元素有可用 `:enabled` 和不可用 `:disabled` 状态，比如输入框，密码框，复选框等。在默认情况之下，这些表单元素都处在可用状态。那么我们可以通过伪选择器`:enabled` 对这些表单元素设置样式。

```css
input:disabled {
  border: 1px solid red;
}
```

```html
<form>
  <label for="name">Name</label>
  <input type="text" id="name" />

  <label for="email">Email</label>
  <input type="text" id="email" disabled="disabled" />
</form>
```

#### disabled

`:disabled` 选择器刚好与`:enabled`选择器相反，用来选择不可用表单元素。要正常使用`:disabled` 选择器，需要在表单元素的 HTML 中设置 “disabled” 属性。

```css
input:disabled {
  border: 1px solid red;
}
```

```html
<form>
  <label for="name">Name</label>
  <input type="text" id="name" />

  <label for="email">Email</label>
  <input type="text" id="email" disabled="disabled" />
</form>
```

#### checked

在表单元素中，单选按钮和复选按钮都具有选中和未选中状态, 大家都知道，要覆写这两个按钮默认样式比较困难。在 CSS3 中，我们可以通过状态选择器 `:checked` 配合其他标签实现自定义样式。而 :checked 表示的是选中状态。

```css
label > span {
  display: none;
}

input[type="radio"]:checked + span {
  display: inline-block;
}
```

```html
<form>
  <label>
    <input type="radio" value="boy" name="sex" /> Boy <span>√</span>
  </label>

  <label>
    <input type="radio" value="girl" name="sex" checked /> Girl <span>√</span>
  </label>
</form>
```

#### read-only

`:read-only` 伪类选择器用来指定处于只读状态元素的样式。简单点理解就是，元素中设置了“readonly=’readonly’”

```css
input:read-only {
  border: 1px solid red;
}
```

```html
<form>
  <label for="email">Email</label>
  <input type="email" id="email" value="youpp@126.com" readonly />
</form>
```

#### selection

`::selection` 伪元素是用来匹配突出显示的文本(用鼠标选择文本时的文本)。浏览器默认情况下，用鼠标选择网页文本是以“深蓝的背景，白色的字体”显示的

```css
::selection {
  color: red;
}
```

## 其他伪类选择器

- `a:active` 选择激活的超链接
- `p::first-letter` 选择每一个 p 元素的第一个字母
- `p::first-line` 选择每个 p 元素的第一行
- `input:focus` 选择获取焦点的 input 元素
- `a:hover` 选择鼠标悬停在其上的超链接
- `a:link` 选择所有未被访问的超链接
- `a:visited` 选择所有访问过的超链接
