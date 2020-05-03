# HTML5

- 语义: 能够让你更恰当地描述你的内容是什么
- 连通性: 能够让你跟服务器之间通过新技术进行通讯
- 离线&储存: 能够让网页在客户端本地存储数据以高效地离线运行
- 多媒体: 使 audio 和 video 成为 web 中的一等公民
- 2D/3D 绘图效果: 提供了一个更加分化范围的呈现选择
- 性能&集成 :提供了非常显著的性能优化和更有效的计算机硬件使用
- 设备访问 Device Access: 能够处理各种输入和输出设备
- 样式设计: 让作者来创作更加复杂的主题吧

## 用 HTML5 的 doctype 声明文件包含 HTML5 标记

```html
<!DOCTYPE html>
```

## 用 `<meta charset>` 声明字符集

```html
<meta charset="UTF-8" />
```

## HTML5 新增了几个新元素使得开发者可以用标准语义去描述 web 文档的结构

这些包括 header,footer,section,article,aside,nav

- <header>元素表示一组引导性的帮助，可能包含标题元素，也可以包含其他元素，像logo，分节头部，搜索表单等。

```html
<header>a logo</header>
```

`<footer>` 表示最近一个章节内容或者根节点元素的页脚，一个页脚通常包含该章节作者，版权数据或者与文档相关的链接等信息。

```html
<footer>
  Some copyright info or perhaps some author info for an &lt;article&gt;?
</footer>
```

`<section>`表示文档中的一个区域（或节），比如，内容中的一个专题组，一般来说会有包含一个 heading。

```html
<section>
  <h1>Heading</h1>
  <p>Bunch of awesome content</p>
</section>
```

`<article>`元素表示文档、页面、应用或网站中的独立结构，其意在成为可独立分配的或可复用的结构，如在发布中，它可能是论坛帖子、杂志或新闻文章、博客、用户提交的评论、交互式组件，或者其他独立的内容项目。

```html
<article class="film_review">
  <header>
    <h2>Jurassic Park</h2>
  </header>
  <section class="main_review">
    <p>Dinos were great!</p>
  </section>
  <section class="user_reviews">
    <article class="user_review">
      <p>Way too scary for me.</p>
      <footer>
        <p>
          Posted on <time datetime="2015-05-16 19:00">May 16</time> by Lisa.
        </p>
      </footer>
    </article>
    <article class="user_review">
      <p>I agree, dinos are my favorite.</p>
      <footer>
        <p>Posted on <time datetime="2015-05-17 19:00">May 17</time> by Tom.</p>
      </footer>
    </article>
  </section>
  <footer>
    <p>Posted on <time datetime="2015-05-15 19:00">May 15</time> by Staff.</p>
  </footer>
</article>
```

`<aside>` 元素中连接到页面中其他部分的内容，被认为是独立于该内容的一部分并且可以被单独的拆分出来而不会使整体受影响。其通常表现为侧边栏或者被插入在该内容里。他们通常包含在工具条，例如来自词汇表的定义。也可能有其他类型的信息，例如相关的广告、笔者的传记、web 应用程序、个人资料信息，或在博客上的相关链接。

```html
<article>
  <p>
    The Disney movie <em>The Little Mermaid</em> was first released to theatres
    in 1989.
  </p>
  <aside>
    The movie earned $87 million during its initial release.
  </aside>
  <p>
    More info about the movie...
  </p>
</article>
```

`<nav>` 描绘一个含有多个超链接的区域，这个区域包含转到其他页面，或者页面内部其他部分的链接列表，例如页头导航。

```html
<nav>
  <ul>
    <li><a href="#">Home</a></li>
    <li><a href="#">About</a></li>
    <li><a href="#">Contact</a></li>
  </ul>
</nav>
```

## HTML5 音频视频

`<video>` 或者 `<audio>` 嵌入媒体

```html
<video src="http://v2v.cc/~j/theora_testsuite/320x240.ogg" controls>
  你的浏览器不支持 <code>video</code> 标签.
</video>

<audio src="audio.ogg" controls autoplay loop>
  <p>你的浏览器不支持audio标签</p>
</audio>
```

## HTML5 表单

#### `<input>` 元素的 type 拥有更多的值

- search: 这个元素呈现为一个搜索框，换行符会从输入值中去掉
- tel: 一个编辑电话号码的输入控件，换行符会从中去掉，在没有其他的限制，因为电话号码国际化差异非常明显，可以设置 pattern 和 maxlength 来做额外的限制
- url: 表现为一个编辑 url 的输入控件
- email: 呈现为一个邮件地址

#### list: <datalist> 元素的 id

```html
<label>Choose a browser from this list:
<input list="browsers" name="myBrowser" /></label>
<datalist id="browsers">
  <option value="Chrome">
  <option value="Firefox">
  <option value="Internet Explorer">
  <option value="Opera">
  <option value="Safari">
</datalist>
```

#### input patter

一个正则表达式，用于检查控件的值,能够作用于的 type 值为 text,tel,search,url,email 的 input 元素

```html
//限制输入框只能输入三个大写字母
<input type="text" name="name" id="name" pattern="[A-Z]{3}" />
```

#### `<form>`元素有一个新特新

novalidate: 设置该属性不会在表单提交之前对其验证

```html
// 提交表单将不会做任何验证
<form action="" novalidate>
  <label for="name">name</label>
  <input type="text" name="name" id="name" pattern="[A-Z]{3}" />
  <button type="submit">submit</button>
</form>
```

#### `<datalist>`元素

`<datalist>` 元素会在填写 `<input>` 字段时，显示一列 `<option>` 作为提示。  
你可以使用 `<input>` 元素上的 list 特性来将一个特定的 input 与特定的 `<datalist>` 元素做关联。

#### placeholder 属性

placeholder 特性作用于 `<input>` 与 `<textarea>` 元素上，提示用户此域内能够输入什么内容。placeholder 中的文本不能包含回车与换行。

#### aotuofocus 属性

autofocus 特性让你能够指定一个表单控件，当页面载入后该表单自动获得焦点，除非用户覆盖它

```html
<input type="text" name="name" id="name" autofocus />
```

#### 约束验证

- `<input>`, `<select>`， 和 `<textarea>` 元素上的 required 属性规定其值必须填写
- `<input>` 元素上的 pattern 特性用于限定元素值必须匹配一个特定的正则表达式。
- `<input>` 与 `<textarea>` 元素的 maxlength 特性限制了用户能够输入的最大字符数(在 Unicode 代码点内)
- type 的 url 与 email 值分别用于限制输入值是否为有效的 URL 或电子邮件地址。
