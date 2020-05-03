# html basic

HTML stands for HyperText Markup Language:

- HyperText means that is uses the HTTP part of the internet
- Markup means the code you write is annotated with keywords
- Language means it can be read by both human and a computer



## attributes

attributes act like extra information tied to an HTML element. they are written within an HTML tag. they are not displayed by the browser either.
属性为关联的 html 元素提供额外的信息，它们写在 HTML 标签之内，它们不会被浏览器显示出来。

## comments

if you write something in your code without disrupting how the browser will display your page, you can write comments, they will be ignored by the browser, and are only useful for us humans who write the code.

如果想在代码中写一些额外的信息并不让浏览器显示它，可以使用注释，它会被浏览器忽略，这些注释通常对写代码的人非常有用。

```html
<!-- i am a comment -->
```

## self-enclosing elements

they only have an opening tag

子关闭元素只有开始标签。

```html
<br />
<input type="text" />
<img src="https://google.com/avatar.jpg" alt="avatar" />
```

## two main types of HTML elements

Block elements are meant to structure the main parts of your page. Inline elements are meant to differentiate part of a text,to give it a particular function or meaning. inline elements usually comprise a single or few words.

+ Block elements: ul ol div article section blockquote
+ Inline elements: a em strong q abbr input br img

## other types of HTML elements

there are several exceptions to the block/inline elements, but the ones you will most often encounter are:

- list items : li
- table,table rows,table cells for : table,tr,td

### HTML Hierarchy : it is a big family tree

An HTML documents is like a big family tree, with parents, siblings, children, ancestors, and descendants. It comes from the ability to nest HTML elements within one another.

- Nesting 嵌套，元素之间可以嵌套
- Order 次序，外层内层嵌套顺序不能颠倒
- Depth 深度，外层可以嵌套内层，内层也可以嵌套
- Block and inline nesting 一般是按照块级元素嵌套行内元素，但是有个例外就是 a 元素

## HTML Semantic HTML 语义 (HTML is about meaning)

The purpose of HTML tags is to deliver meaning to a document. Don't be concerned about how your web page looks like. Focus on the significance of each tag you'll use.

## Structure elements: organizing your page

structure elements allow you to organize the main parts of your page,they usually contain other HTML elements.

- `<header>` as the first element of the page,that can include the logo and the tag line.
- `<nav>` as a list of links that go to the different pages of the website.
- `<h1>` as the title of the page.
- `<article>` as the main content ,like a blog post
- `<footer>` as the last element of the page, located at the bottom

## Text elements: defining your content

inside these structure elements,you usually find text delements meant to define the purpose of your content

- `<p>` for paragraphs
- `<ul>` for (unordered) lists
- `<ol>` for (ordered) lists
- `<li>` for individual list items
- `<blockquote>` for quotes

## Inline elements: distinguishing your text

inline elements allow to distinguish parts of your text.

- `<strong>` for important words
- `<em>` for emphasized words
- `<a>` for links
- `<small>` for less important words
- `<abbr>` for abbreviations like W3C

## generic elements

尽管这些 HTML 元素没有实际的意义,但是有很多布局都是使用 div+span 来布局的

- `<div>` for block-level elements
- `<span>` for inline elements

## don't think over semantics

尽管 HTML 中有语义的元素很多,但是你只要掌握下面列出的这些就已经足够了

- structure
  - header
  - h1
  - h2
  - h3
  - nav
  - footer
  - article
  - section
- text
  - p
  - ul
  - ol
  - li
  - blockquote
- inline
  - a
  - strong
  - em
  - q
  - abbr
  - small

## HTML Formatting

when whitespace does not matter

- line-breaks (换行符),换行和空行都会被浏览器忽略
- tabulations (tab 制表符)，同样也被浏览器忽略
- tree format 建议书写 HTML 的时候用树形的格式，以便于阅读

Tabulations, empty lines, successive spaces, and line-breaks, are dismissed by the computer, and are all converted into a single space.

制表符，空行，连续的空格，换行，都被当做一个空格来处理。

## A Valid HTML document

some boilerplate

- Doctype
- the `<html>` element,all your HTML document must be wrapped inside an `<html>` element
- the `<head>` element,give additional for an HTML element
- the `<body>` element,everything inside the `<body>` will be displayed in the browser window

## a complete valid HTML document

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>your title</title>
    <meta name="description" content="simple html" />
  </head>
  <body>
    <p>hello world!</p>
  </body>
</html>
```

## HTML Content

HTML content is 90% text

## HTML Text

- Paragraphs, paragraphs `<p>` are the most used HTML elements, as they act as the default block-level element and are quick to write.
- List, lists come in 3 variations: ul, ol, dl
- Blockquote, blockquote are used to identify a citation.
- Headings, there are 6 levels of headings available, ranging from h1 to h5, 1 being the most important one

### inline semantic

the small parts within a block of text 块级元素的一部分

- Strong, for important words,use `<strong>` tag
- Emphasis, for emphasis words,use the `<em>` tag
- Abbreviations, abbreviations like W3C or CD can use the `<abbr>` element

```html
<p>I just bought a <abbr title="compact Disc">CD</abbr>.</p>
```

Inline quotes,the `<blockquote>` element is a block-level element,it has an inline version `<q>`

```html
<p>he said <q>"hello world"</q> and just left.</p>
```

Other inline elements,there are plenty of other inline-elements to choose from ,but it is enough if you know above we introduced.

## HTML Links : the core of the web

Links are essential in HTML, as the web was initially designed to be an information network of documents linked between each other. In HTML, links are inline elements written with the `<a>`, the `href` attribute is used to define the target of the link.

- relative URLs, if you want to define a link to another page of the same website,you can use relative URLs.
- absolute URLs, usually to navigate to anchor website
- anchor targets, to navigate within the same page

### HTML images : The major media on the web

Images are the first non-extual content to have appeared on the web,most images formats you can find on your computer can also be displayed in your browser.

- syntax,images use the `<img>` element,which is a self-closing element,the -src- attribute defines the location of the image
- dimensions(尺寸),every image has 2 dimensions:width and height,although it is possible in HTML,it's recommended to use css
- block or inline? the answer is inline element because of the `<img>` element being a self-closing element,it can not contain any other HTML element

```html
<p>
  There is a frog <img src="frog.jpg" alt="" /> in the middle of the paragraph!
</p>
```

## HTML Tables : For multi-dimensional data  

HTML tables are meant for tabular data only,which is any type of content that can be semantically arranged in rows and columns.

- syntax,building a table in HTML requires a specific structure, `<table>`, `<tr>`, `<td>`, `<th>`.
- thead,tfoot and tbody,just like a web page have a header and a footer, a table can have a head, body and footer else.
- colspan and rowspan,you can merge columns or rows by using the rowspan and colspan respectively.

a complete table table example

```html
<table border="1">
  <thead>
    <tr>
      <th>#</th>
      <th>name</th>
      <th>age</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>buuug7</td>
      <td>23</td>
    </tr>
    <tr>
      <td>2</td>
      <td>bsor</td>
      <td>33</td>
    </tr>
    <tr>
      <td colspan="2">3</td>
      <td>nobody</td>
    </tr>
  </tbody>
  <tfoot>
    <th>#</th>
    <th>name</th>
    <th>age</th>
  </tfoot>
</table>
```

## HTML Structure : to organize the main parts of your web page

For example, a blog's web page can be divided in 4 parts:

- **header** that is similar on every page, and is the main navigation of the website.
- **main** content,that changes for every page: a list of articles, a single article with comments, an about page...
- **sidebar** that links to monthly archives and categories.
- **footer** for additional links to less important pages.

## header

It is usually the first HTML element in the code, it acts as an introduction to the web page, with the logo, a tagline, and navigation links.

```html
<header>
  <p>
    <a href="">
      <img src="logo.jpg" alt="" />
    </a>
    <em>my website</em>
  </p>
  <ul>
    <li>
      <a href="#home">home</a>
    </li>
    <li>
      <a href="#about">about</a>
    </li>
  </ul>
</header>
```

## footer

As opposed to the header, the footer is usually the last element of a page, where the main navigation links are repeated and secondary ones added.

```html
<footer>
  <p>mywebsite.io | copyright2019</p>
  <ul>
    <li>
      <a href="#home">home</a>
    </li>
    <li>
      <a href="#about"></a>
    </li>
    <li>
      <a href="#contact">contact</a>
    </li>
  </ul>
</footer>
```

## main

The main element contains, as its name suggests, the most important content of the page, the one that defines the purpose of the page.

## aside

The aside element usually lives alongside the main and contains additional information related to the main content.

## section

The section element allows to group, sections themselves dont't carry a specific meaning, it's more about the relation between its child elements, rather than its own meaning within the overall page.

section 元素通常用来分组，通常它自己没有什么实际意义，在整个页面内，更多的是关于它的子元素的之间的关系，而不是它自身的意义

## HTML FORMs

To make a page interactive.

使页面具有交互性，下面是一些交互的例子：

- signing up and logging in to website 注册登录
- entering personal information(name, address, credit card details) 输入个人信息
- filtering content(by using dropdown, checkboxes...) 过滤内容
- performing a search 执行搜索
- uploading files 上传文件

HTML 提供了如下 form controls:

- text inputs
- radio buttons
- checkboxes
- dropdown
- upload widgets
- submit buttons

## The form element

The `<form>` is a block-level element that defines an interactive part of a web page.

- `action` contains an address that defines where the form information will be sent
- `method` can be either GET or POST and defines how the form information will be sent

## text inputs

- Text `<input type='text'>` allows any type of character
- Email `<input type='email'>` might display a warning if an invalid email is entered
- Password `<input type='password'>` shows dots as characters
- Number `<input type='number'>` Up/Down keyboard keys can be used
- Telephone `<input type='tel'>` Can trigger an autofill
- Multiple line text `<textarea></textarea>` can be resized

## placeholders

text inputs can display a placeholder text.

`<input type='text' placeholder='enter your name'>`

#### labels

because form elements on their own are not very descriptive,they are usually preceded by a text label.  

因为表单元素自身没有描述性，通常在他们前面加上用 label 包裹的描述文本。

```
<label for="email">Email</label>
<input type="email" id="email">
```

## checkbox

checkboxes are form controls that only have 2 states:checked or unchecked

```
<label>
  <input type="checkbox"> i agree to the terms
</label>
```

by default, checkbox input is unchecked.you can mark it as checked by using the simply called checked attribute。

```
<label>
  <input type="checkbox" checked> i agree to the terms
</label>
```

## radio buttons

your HTML code need to group a list of radio buttons together, this is achieved by using the same value for the name attribute.

```
<label>marital status</label>
<label>
  <input type="radio" name="status"> single
</label>
<label>
  <input type="radio" name="status"> married
</label>
<label>
  <input type="radio" name="status"> widowed
</label>
```

## dropdown menus

if the number of options to choose from takes up too much space, you can use `<select>` dropdown menus.

```
<select name="" id="">
  <option value="january">january</option>
  <option value="february">february</option>
  <option value="march">march</option>
</select>
```

if your add the `mutiple` attribute, your can provide the ability to select multiple choices.

```
<label for="">which browers do you have?</label>
<select name="" id="" multiple>
  <option value="chrome">chrome</option>
  <option value="IE">IE</option>
  <option value="firefox">firefox</option>
</select>
```

#### a complete sign up form

```
<form action="/signup" method="POST">
  <p>
    <label for="">Title</label>
    <label>
      <input type="radio" name="title" value="mr">Mr
    </label>
    <label>
      <input type="radio" name="title" value="miss">Miss
    </label>
  </p>
  <p>
    <label>Name</label>
    <input type="text" name="name">
  </p>
  <p>
    <label>Email</label>
    <input type="email" name="email">
  </p>
  <p>
    <label>Password</label>
    <input type="password" name="password">
  </p>
  <p>
    <label>country</label>
    <select name="country" id="">
      <option value="china">china</option>
      <option value="united states">united states</option>
    </select>
  </p>
  <p>
    <label>
      <input type="checkbox" name="terms">i agree to the <a href="/terms">terms and conditions</a>
    </label>
  </p>
  <p>
    <button>sign up</button>
  </p>
</form>
```
