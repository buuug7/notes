# pseudo selector

### CSS3 新增加的三个属性选择器

```$xslt
E[att^="val"] 匹配E元素，且E元素定义了属性attr，其值以val开头的任何字符串
E[att$="val"] 匹配E元素，且E元素定义了属性attr，其值以val结尾的任何字符串
E[att*="val"] 匹配E元素，且E元素定义了属性attr，其值包含val的任何字符串
```

### root

从字面上我们就可以很清楚的理解是根选择器, 他的意思就是匹配元素 E 所在文档的根元素。在 HTML 文档中, 根元素始终是 `<html>`

```css
:root {
  background: orange;
}
```

### not

否定选择器,可以选择除某个元素之外的所有元素,语法`:not(selector) { CSS样式 }`

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

### empty

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

### target

目标选择器，用来匹配文档(页面)的 url 的某个标志符的目标元素，具体查看下面的例子

```css
.menuSection {
  display: none;
}

:target {
  /* 这里的:target就是指id="brand"的div对象 */
  display: block;
}
```

```html
<h2><a href="#brand">Brand</a></h2>
<div class="menuSection" id="brand">content for Brand</div>
```

### first-child

表示的是选择父元素的第一个子元素的元素 E, 简单点理解就是选择元素中的第一个子元素, 记住是子元素, 而不是后代元素

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

### last-child

与`:fist-child`类似，选择的是元素的最后一个元素

```css
ul li:last-child {
  color: red;
}
```

### nth-child(n)

用来定位某个父元素的一个或多个特定的子元素, 其中“n”是其参数, 而且可以是整数值(1,2,3,4), 也可以是表达式(2n+1、-n+5)和关键词(odd、even), 但参数 n 的起始值始终是 1, 而不是 0. 也就是说，参数 n 的值为 0 时，选择器将选择不到任何匹配的元素。

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

### nth-last-child(n)

“:nth-last-child(n)”选择器和前面的“:nth-child(n)”选择器非常的相似，只是这里多了一个“last”，所起的作用和“:nth-child(n)”选择器有所区别，从某父元素的最后一个子元素开始计算，来选择特定的元素。

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

### first-of-type

“:first-of-type”选择器类似于“:first-child”选择器，不同之处就是指定了元素的类型,其主要用来定位一个父元素下的某个类型的第一个子元素。

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

### last-of-type

“:last-of-type”选择器和“:first-of-type”选择器功能是一样的，不同的是他选择是父元素下的某个类型的最后一个子元素。

```css
ul li:last-of-type {
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

### nth-of-type(n)

“:nth-of-type(n)”选择器和“:nth-child(n)”选择器非常类似，不同的是它只计算父元素中指定的某种类型的子元素。当某个元素中的子元素不单单是同一种类型的子元素时，使用“:nth-of-type(n)”选择器来定位于父元素中某种类型的子元素是非常方便和有用的。在“:nth-of-type(n)”选择器中的“n”和“:nth-child(n)”选择器中的“n”参数也一样，可以是具体的整数，也可以是表达式，还可以是关键词。

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

### nth-last-of-type(n)

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

### only-child

“:only-child”选择器选择的是父元素中只有一个子元素，而且只有唯一的一个子元素。也就是说，匹配的元素的父元素中仅有一个子元素，而且是一个唯一的子元素。

```css
div p:only-child {
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

### only-of-type

“:only-of-type”选择器用来选择一个元素是它的父元素的唯一一个相同类型的子元素。这样说或许不太好理解，换一种说法。“:only-of-type”是表示一个元素他有很多个子元素，而其中只有一种类型的子元素是唯一的，使用“:only-of-type”选择器就可以选中这个元素中的唯一一个类型子元素

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

### enabled

在 Web 的表单中，有些表单元素有可用（“:enabled”）和不可用（“:disabled”）状态，比如输入框，密码框，复选框等。在默认情况之下，这些表单元素都处在可用状态。那么我们可以通过伪选择器“:enabled”对这些表单元素设置样式。

```css
input:enabled {
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

### disabled

“:disabled”选择器刚好与“:enabled”选择器相反，用来选择不可用表单元素。要正常使用“:disabled”选择器，需要在表单元素的 HTML 中设置“disabled”属性。

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

### checked

在表单元素中，单选按钮和复选按钮都具有选中和未选中状态。（大家都知道，要覆写这两个按钮默认样式比较困难）。在 CSS3 中，我们可以通过状态选择器“:checked”配合其他标签实现自定义样式。而“:checked”表示的是选中状态。

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

### selection

“::selection”伪元素是用来匹配突出显示的文本(用鼠标选择文本时的文本)。浏览器默认情况下，用鼠标选择网页文本是以“深蓝的背景，白色的字体”显示的

```css
::selection {
  background-color: red;
}
```

### read-only

“:read-only”伪类选择器用来指定处于只读状态元素的样式。简单点理解就是，元素中设置了“readonly=’readonly’”

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

### read-write

“:read-write”选择器刚好与“:read-only”选择器相反，主要用来指定当元素处于非只读状态时的样式。

```css
input:read-only {
  border: 1px solid red;
}
input:read-write {
  border: 1px solid blue;
}
```

```html
<form>
  <label for="email">Email</label>
  <input type="email" id="email" value="youpp@126.com" readonly />

  <label for="name">Name</label>
  <input type="text" id="name" value="buuug7" />
</form>
```

### before after

::before 和::after 这两个主要用来给元素的前面或后面插入内容，这两个常和"content"配合使用，使用的场景最多的就是清除浮动。

```css
p:before {
  content: '"';
  font-size: 2rem;
  padding-right: 1rem;
}
p:after {
  content: "(-_-";
  font-size: 2rem;
  padding-left: 1rem;
}
```

```html
<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
```
