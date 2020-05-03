#jQuery notes

---

### jquery FAQ

###### jquery 禁止链接

```javascript
$("a").on("click", function(e) {
  return false;
});
```

###### 如何通过 class 或 id 选择元素?

```javascript
//用id选择元素
$("#myDivId");
//用类class选择元素
$(".myCssClass");
```

###### 当我已近有了一个 DOM 元素集合的时候,如何选择集合中的其他元素?

```javascript
var myDomElement = document.getElementById("foo"); // A plain DOM element.
$(myDomElement).find("a"); // Finds all anchors inside the DOM element.
```

###### 如何测试一个元素含有一个特定的类?

```javascript
// 用.hasClass()
$("div").click(function() {
  if ($(this).hasClass("protected")) {
    $(this)
      .animate({ left: -10 })
      .animate({ left: 10 })
      .animate({ left: -10 })
      .animate({ left: 10 })
      .animate({ left: 0 });
  }
});
// 用.is()
if ($("#myDiv").is(".pretty.awesome")) {
  $("#myDiv").show();
}
// 不过.is()有更多的用法,例如
if ($("#myDiv").is(":hidden")) {
  $("#myDiv").show();
}
```

###### 如何判定选择的元素是否存在?

```javascript
// 用.length
if ($("#myDiv").length) {
  $("#myDiv").show();
}
```

###### 如何知道 toggle 的元素状态?

```javascript
var isVisible = $("#myDiv").is(":visible");
var isHidden = $("#myDiv").is(":hidden");
```

###### 用 id 选择器选择元素的时候,id 的值中含有 css 预设的特定符号怎么办?

```javascript
// 用"\\"转义字符
// Does not work:
$("#some:id");
// Works!
$("#some\\:id");
// Does not work:
$("#some.id");
// Works!
$("#some\\.id");

// 用下面的函数也可以解决问题
function jq(myid) {
  return "#" + myid.replace(/(:|\.|\[|\]|,)/g, "\\$1");
}
// works
$(jq("some.id"));
```

###### 如何 disable/enable 表单元素?

```javascript
// Disable #x
$("#x").prop("disabled", true);
// Enable #x
$("#x").prop("disabled", false);
```

###### 如何 check/uncheck 表单中的复选框,单选框?

```javascript
// Check #x
$("#x").prop("checked", true);
// Uncheck #x
$("#x").prop("checked", false);
```

###### 如何获得下拉列表选中项的值?

```html
<select id="myselect">
  <option value="1">Mr</option>
  <option value="2">Mrs</option>
  <option value="3">Ms</option>
  <option value="4">Dr</option>
  <option value="5">Prof</option>
</select>
```

```javascript
// 选中的项的值,该值会提交到服务器
$("#myselect").val();
// => 1

// 获取下拉列表中选中项的值
$("#myselect option:selected").text();
// => "Mr"
```

###### 如何替换有十个子项的列表(ul,ol)中第三个子项的值?

```javascript
// 用.eq()方法
// This doesn't work; text() returns a string, not the jQuery object:
$(this)
  .find("li a")
  .eq(2)
  .text()
  .replace("foo", "bar");
// This works:
var thirdLink = $(this)
  .find("li a")
  .eq(2);
var linkText = thirdLink.text().replace("foo", "bar");
thirdLink.text(linkText);
```

###### 如何把一个 jquery 对象转换成本地 DOM 元素(native DOM element)?

jquery 对象是伪数组类型

```javascript
// 用数组的形式来转换
$("#foo")[0]; // Equivalent to document.getElementById( "foo" )
// 用.get(),不过性能不行
$("#foo").get(0); // Identical to above, only slower.
// You can also call .get() without any arguments to retrieve a true array of DOM elements.
```

### 基础

---

##### 准备(jquery ready 函数和代码写入的地方)

- 第一步添加 jquery 库并引入你的 html 文件中
- 第二步在 jquery ready 函数中写你的代码

```javascript
$(document).ready(function() {
  $("a").click(function(event) {
    console.log("buuug7");
    event.preventDefault();
  });
});
```

上面的代码会在 DOM 已经加载,不必等到其他资源(如图片等)加载完毕就开始执行,点击 a 超链接后会向控制台打印 buuug7 字符,并禁止链接的跳转  
window.onload 和\$(document).ready()的区别:

1. window.onload 必须等到页面内包括图片的所有元素都加载完毕后才执行,多个 window.onload 只会执行一个
2. $(document).ready()是DOM结构绘制完毕后就执行,不必等到全部加载完毕,多个$(document).ready()都可以执行

$(document).ready(handler)==$().ready(handler)==\$(handler) 这三个写法等价

##### 用 jquery 添加删除元素的类

```javascript
// add class
$("a").addClass("test");
//remove class
$("a").removeClass("test");
```

##### jquery 隐藏元素

```javascript
$("a").hide("slow");
```

##### 回调函数

回调函数就是传递给其他函数的一个参数,该参数也为函数,在其父函数执行完毕后它自己才执行,回调函数在等待其父函数执行完毕之前的这段时间里,浏览器会去处理其他问题而不会停止下来等待该结果,一旦该回调函数执行完毕后就会通知浏览器处理该结果,大大提高了浏览器的执行效率,所以回调函数比一般的函数特别

```javascript
//callback without arguments
$.get("myhtmlpage.html", myCallBack);
//callback with arguments(right)
$.get("myhtmlpage.html", function() {
  myCallBack(param1, param2);
});
//callback with arguments(wrong)
$.get("myhtmlpage.html", myCallBack(param1, param2));
```

注意上面的有参数的回调函数,错误的那个是因为它把回调函数的值当做第二个参数,并不是把函数当做第二个参数

##### No-Conflict Mode

当与其他库冲突的时候,可以通过用一下几种方法来解决冲突问题

```javascript
// 创建新的别名
var $jq = jQuery.noConflict();

// 直接用函数表达式调用
jQuery.noConflict();
(function($) {
  // Your jQuery code here, using the $
})(jQuery);

// 把参数$直接传递到jQuery(document).ready()函数中
jQuery(function($) {
  // Your jQuery code here, using the $
});
// or
jQuery(document).ready(function($) {
  // Your jQuery code here, usring the $
});
```

##### attributes(属性)

```javascript
// 设置元素属性
$("a").attr("href", "http://www.baidu.com/");
// 一次设置多个属性
$("a").attr({
  href: "http://www.baidu.com/",
  title: "new title"
});
// 获取元素属性的值
$("a").attr("href");
```

##### slelecting elements(选择元素)

```javascript
// selecting elements by ID
$("#myId");

// selecting elements by Class Name
$(".myClass");

// selecting elements by Attribute
$("input[name='first-name']");

// selecting elements by compound CSS selector
$("#contents ul.people li");

/* pseudo-selector below */
$("a.external:first");
// selected odd tr
$("tr:odd");
// select all input-like elements in a form
$("#myForm:input");
$("div:visible");
// all except the first tree divs
$("div:gt(2)");
// all currently animated divs
$("div:animated");

// 判断是否选中元素
// 错误
if($("a.foo")){
    ...
}
// 正确
if($("a.foo").length){
    ...
}

// filter selections
// 类名为foo的div中是否有p元素
$("div.foo").has("p");
// 类名为foo的div元素中没有包含bar类的元素
$("div.foo").not(".bar");
// ul中含有apple类的li项目
$("ul li").filter(".apple");
// 返回列表的第一个元素
$("ul li").first();
// 返回ul中第三个元素
$("ul li").eq(2);

// 选择表单元素
// :checked伪类选择器选中checked的输入项
// :checked伪类选择器适用于checkbox,radio buttons,selects
$("form :checked");
// :disabled
// 适用于任意<input>元素
$("form :disabled");
// :enabled
// :disabled的反面,选择任意没有disabled属性的元素
$("form :enabled");
// :input
// 该伪选择器选择表单中的所有<input>,<textarea>,<select>,<button>元素
$("form :input");
// :selected
// 选择select下选中的<option>
$("form :selected");
// 其他的伪类选择器
// :password
// :radio
// :text
// :submit
// :checkbox
// :reset
// :file
// :image

```

##### getters & setters

一些 jquery 函数既可以用于获取值也可以用于设置值,通常一个 getters 函数会获取选中区域中的第一元素的值(不过.text()函数除外,
它会默认获取所有元素的值)

```javascript
// 会设置所有h1元素的html为hello world
$("h1").html("hello world");
// 会获取第一个h1元素的值
$("h1").html();
// setter通常会返回一个jquery对象,允许你在后面继续调用jquery函数,而getters通常不能这么调用
// 这样的调用通常称为chaining,也就是链式调用
$("h1")
  .html("hello world")
  .addClass("test");
$("#content")
  .find("h3")
  .eq(2)
  .html("foo bar");
// jquery提供的.end()方法让链式调用返回上一级
$("#content")
  .find("h3")
  .eq(2)
  .html("new text for the third h3!")
  .end() // Restores the selection to all h3s in #content
  .eq(0)
  .html("new text for the first h3!");
```

#### 操纵元素

##### 获取和设置元素的信息(getting and setting information about elements)

```javascript
// .html() 获取或者设置HTML内容
// .text() 获取或者设置text内容,HTML将会被去除
// .attr() 获取或者设置元素属性
// .width() 获取或者设置选中区域的第一个元素宽度,传递参数为整数
// .height() 获取或者设置选中区域的第一个元素高度,传递参数为整数
// .position() 获取选中区域第一个元素的定位信息,它不能设置元素定位信息
// .val() 获取或者设置表单元素的值
```

##### 移动,复制,移除元素

```javascript
// .insertAfter() 将给定的元素插入参数所选元素的后面
// <h6>元素会跟在<h1>元素后面
$("<h6>i am h6</h6>").insertAfter("h1");
// .after() 在选定的元素后面跟上参数中的元素
// 同样<h1>元素后面跟着<h6>
$("h1").after("<h6>i am h6</h6>");
// .insertBefore()和.before()跟前面的相反

// .append()将参数指定的内容添加到所选定的元素的末尾
// .appendTo()与append()相反

// Make the first list item the last list item:
// 将ul中第一个li添加到末尾,当然第二个li就会变成第一个li,因为appendTo默认为移动元素
var li = $("#myList li:first").appendTo("#myList");

// Another approach to the same problem:
$("#myList").append($("#myList li:first"));
```

##### 克隆元素

```javascript
// 克隆ul第一个li元素在添加到ul末尾
$("#myList li:first")
  .clone()
  .appendTo("#myList");
```

##### 删除元素

- .remove()删除的元素不在关联其数据和事件
- .detach()删除的元素仍旧关联它原来的数据和事件
- .empty()清空元素的内容

##### 创建元素

```javascript
// 创建一个段落
$("<p>This is a new paragraph.</p>");

// Creating a new element with an attribute object.
$("<a/>", {
  html: "This is a <strong>new</strong> link",
  class: "new",
  href: "foo.html"
});

//给ul一次添加多个子元素
var html = [];
for (var i = 0; i < 10; i++) {
  html.push("<li>item" + i + "</li>");
}
$("ul").append(html.join(""));
```

##### 操作属性

```javascript
// 操作单个属性
$("#myDiv a:first").attr("href", "new.html");
// 操作一个元素的多个属性
$("#myDiv a:first").attr({
  href: "new.html",
  rel: "nofollow"
});
```

#### jquery 对象

当创建或者选择元素的时候,jquery 返回一个 jquery 对象,类似于数组(array-like),但是比数组更加复杂

##### DOM 和 DOM 元素

DOM=document object model(文档对象模型),它代表 HTML 文档,DOM 元素被它的类型(例如 div,p,a 等)和属性(src,href,class 等)来描述

##### jquery 对象

用 jquery 对象简单并且兼容性很好,所以就可以代替本地(native-dom)来操作,检查你 jquery 选择器是否匹配上对应的元素的通用做法是用.length 属性来验证,其中的.get()方法是将 jquery 对象转换成本地 dom 元素(native DOM element),返回 DOM 元素本身

```javascript
// Selecting only the first <h1> element on the page.
var firstHeadingElem = $( "h1" ).get( 0 );
});
```

#### 穿越(Traversing)

##### Parents

```html
<div class="grandparent">
  <div class="parent">
    <div class="child">
      <span class="subchild"></span>
    </div>
  </div>
  <div class="surrogateParent1"></div>
  <div class="surrogateParent2"></div>
</div>
```

```javascript
// Selecting an element's direct parent:

// returns [ div.child ]
$("span.subchild").parent();

// Selecting all the parents of an element that match a given selector:

// returns [ div.parent ](返回父元素中类名为parent的div元素)
$("span.subchild").parents("div.parent");

// returns [ div.child, div.parent, div.grandparent ](返回所有的父元素包括body和html,这里没写出来)
$("span.subchild").parents();

// Selecting all the parents of an element up to, but *not including* the selector:

// returns [ div.child, div.parent ](返回从子元素直接父元素到类名为grandparent的父元素之间的元素,但是不包含选择器中的父元素)
$("span.subchild").parentsUntil("div.grandparent");

// Selecting the closest parent, note that only one parent will be selected
// and that the initial element itself is included in the search:

// returns [ div.child ]
$("span.subchild").closest("div");

// returns [ div.child ] as the selector is also included in the search:
$("div.child").closest("div");
```

##### Children

```javascript
// Selecting an element's direct children:

// returns [ div.parent, div.surrogateParent1, div.surrogateParent2 ](返回div类型的子元素)
$("div.grandparent").children("div");

// Finding all elements within a selection that match the selector:

// returns [ div.child, div.parent, div.surrogateParent1, div.surrogateParent2 ]
$("div.grandparent").find("div");
```

##### Siblings

```javascript
// Selecting a next sibling of the selectors:

// returns [ div.surrogateParent1 ]
$("div.parent").next();

// Selecting a prev sibling of the selectors:

// returns [] as No sibling exists before div.parent
$("div.parent").prev();

// Selecting all the next siblings of the selector:

// returns [ div.surrogateParent1, div.surrogateParent2 ]
$("div.parent").nextAll();

// returns [ div.surrogateParent1 ]
$("div.parent")
  .nextAll()
  .first();

// returns [ div.surrogateParent2 ]
$("div.parent")
  .nextAll()
  .last();

// Selecting all the previous siblings of the selector:

// returns [ div.surrogateParent1, div.parent ]
$("div.surrogateParent2").prevAll();

// returns [ div.surrogateParent1 ]
$("div.surrogateParent2")
  .prevAll()
  .first();

// returns [ div.parent ]
$("div.surrogateParent2")
  .prevAll()
  .last();
```

#### 操作 css 样式,元素大小(CSS,Styling,\$Dimensions)

注意驼峰拼写的 css 属性,是推荐的写法,不过不赞成用.css()函数设置元素的样式,而是用.addClass(),.removeClass()来操作

```javascript
// Getting CSS properties.
$( "h1" ).css( "fontSize" ); // Returns a string such as "19px".
$( "h1" ).css( "font-size" ); // Also works.

// Setting CSS properties.
$( "h1" ).css( "fontSize", "100px" ); // Setting an individual property.
// Setting multiple properties.
$( "h1" ).css({
    fontSize: "100px",
    color: "red"
});

// 赞成的设置css样式的方法如下
// Working with classes.
var h1 = $( "h1" );
h1.addClass( "big" );
h1.removeClass( "big" );
h1.toggleClass( "big" );
if ( h1.hasClass( "big" ) ) {
    ...
}

// 尺寸(Dimensions)
// Basic dimensions methods.

// Sets the width of all <h1> elements.
$( "h1" ).width( "50px" );

// Gets the width of the first <h1> element.
$( "h1" ).width();

// Sets the height of all <h1> elements.
$( "h1" ).height( "50px" );

// Gets the height of the first <h1> element.
$( "h1" ).height();

// Returns an object containing position information for
// the first <h1> relative to its "offset (positioned) parent".
$( "h1" ).position();
```

#### Data Methods(将数据存储到 DOM 元素上)

页面刷新该数据将不会存在

```javascript
// Storing and retrieving data related to an element.
$("#myDiv").data("keyName", { foo: "bar" });

// Returns { foo: "bar" }
$("#myDiv").data("keyName");
```

#### jquery 的一些实用方法(utility methods)

在\$命名空间中存的一些辅助函数

```javascript
// $.trim()
// Returns "lots of extra whitespace"
$.trim("    lots of extra whitespace    ");

// $.each()
$.each(["foo", "bar", "baz"], function(idx, val) {
  console.log("element " + idx + " is " + val);
});
$.each({ foo: "bar", baz: "bim" }, function(k, v) {
  console.log(k + " : " + v);
});

// $.inArray()
// 返回元素在数组中的索引,如果没找到返回-1
var myArray = [1, 2, 3, 5];
if ($.inArray(4, myArray) !== -1) {
  console.log("found it!");
}

// $.extend()
// Changes the properties of the first object using the properties of subsequent objects:
// 用后面的对象的属性更新第一对象的属性
var firstObject = { foo: "bar", a: "b" };
var secondObject = { foo: "baz" };
var newObject = $.extend(firstObject, secondObject);

console.log(firstObject.foo); // "baz"
console.log(newObject.foo); // "baz"

// If you don't want to change any of the objects you pass to $.extend(), pass an empty object as the first argument:
// 用$.extend()不想修改原来对象的属性,只是想在产生的新对象中更新属性,只需要在传递第一个参数为空对象即可
var firstObject = { foo: "bar", a: "b" };
var secondObject = { foo: "baz" };
var newObject = $.extend({}, firstObject, secondObject);

console.log(firstObject.foo); // "bar"
console.log(newObject.foo); // "baz"

// $.proxy()
// 在调用一个方法的时候你可以传递上下文context的scope
// Returns a function that will always run in the provided scope — that is, sets the meaning of this inside the passed function to the second argument.
var myFunction = function() {
  console.log(this);
};
var myObject = { foo: "bar" };
myFunction(); // window
var myProxyFunction = $.proxy(myFunction, myObject);
myProxyFunction(); // myObject

//If you have an object with methods, you can pass the object and the name of a method to return a function that will always run in the scope of the object.
var myObject = {
  myFn: function() {
    console.log(this);
  }
};
$("#foo").click(myObject.myFn); // HTMLElement #foo
$("#foo").click($.proxy(myObject, "myFn")); // myObject
```

##### 判断变量类型

```javascript
$.isArray([]); // true
$.isFunction(function() {}); // true
$.isNumeric(3.14); // true

// $.type()
// 就相当于javascript的typeof
$.type(true); // "boolean"
$.type(3); // "number"
$.type("test"); // "string"
$.type(function() {}); // "function"

$.type(new Boolean()); // "boolean"
$.type(new Number(3)); // "number"
$.type(new String("test")); // "string"
$.type(new Function()); // "function"

$.type([]); // "array"
$.type(null); // "null"
$.type(/test/); // "regexp"
$.type(new Date()); // "date"
```

##### 遍历 jquery 对象或者非 jquery 对象

```javascript
// $.each() 是一个通用的遍历对象,数组,伪数组(array-like)的方法
var sum=0;
var arr=[1,2,3,4,5];
$.each(arr,function(k,v){
    sum+=v;
});
console.log(sum);//15

// .each() 仅仅用在jquery集合上
<ul>
    <li><a href="#">Link 1</a></li>
    <li><a href="#">Link 2</a></li>
    <li><a href="#">Link 3</a></li>
</ul>
$( "li" ).each( function( index, element ){
    console.log( $( this ).text() );
});
// Logs the following:
// Link 1
// Link 2
// Link 3

// the second argument
// 有时候需要传递第二个参数,下面的例子看看
$( "li" ).each( function( index, listItem ) {
    this === listItem; // true
    // For example only. You probably shouldn't call $.ajax() in a loop.
    $.ajax({
        success: function( data ) {
            // The context has changed.
            // The "this" keyword no longer refers to listItem.
            this !== listItem; // true
        }
    });
});

// 有时候.each()不用的好
// 如下的两个例子是等价的

// 非必须(unnecessary)
$( "li" ).each( function( index, el ) {
    $( el ).addClass( "newClass" );
});
// 很好
$( "li" ).addClass( "newClass" );

// 另外一种情况是.each()通常是用来获取信息的,用来设置信息并不好用
// Doesn't work:
$( "input" ).val( $( this ).val() + "%" );
// .val() does not change the execution context, so this === window
// works
$( "input" ).each( function( i, el ) {
    var elem = $( el );
    elem.val( elem.val() + "%" );
});

// 大多数情况下,"getter"返回的是集合中首个元素的信息(.text()方法除外)
// 通常"setter",例如.text(),.html()等接受一个匿名函数用来应用到每一个匹配的元素上
// 匿名函数中的参数是匹配元素的index和value
// 下面的两个写法等价
$( "input" ).each( function( i, el ) {
    var elem = $( el );
    elem.val( elem.val() + "%" );
});

$( "input" ).val(function( index, value ) {
    return value + "%";
});

// .map()
// 有的时候用.map()比.each()更加有用,例如
var newArr = [];
$( "li" ).each( function() {
    newArr.push( this.id );
});
//下面的写法比上面的更加有效
$( "li" ).map( function(index, element) {
    return this.id;
}).get();


// $.map()
// $.map()工作在普通javascript数组之上,而.map()工作在jquery集合之上
<li id="a"></li>
<li id="b"></li>
<li id="c"></li>

var arr = [
    {id: "a",tagName: "li"},
    {id: "b",tagName: "li"},
    {id: "c",tagName: "li"}
    ];

// Returns [ "a", "b", "c" ]
$( "li" ).map( function( index, element ) {
    return element.id;
}).get();

// Also returns [ "a", "b", "c" ]
// Note that the value comes first with $.map
$.map( arr, function( value, index ) {
    return value.id;
});
```

##### jquery .index()方法

.index()用来搜索匹配元素,并返回相应的索引,从 0 开始

##### 没有参数的情况

```html
<ul>
  <div></div>
  <li id="foo1">foo</li>
  <li id="bar1">bar</li>
  <li id="baz1">baz</li>
  <div></div>
</ul>
```

```javascript
// 是获取对应它父元素的位置来返回index索引的
var foo = $("#foo1");
console.log("Index: " + foo.index()); // 1

var listItem = $("li");
// This implicitly calls .first()
console.log("Index: " + listItem.index()); // 1
console.log("Index: " + listItem.first().index()); // 1

var div = $("div");
// This implicitly calls .first()
console.log("Index: " + div.index()); // 0
console.log("Index: " + div.first().index()); // 0
//note: jquery 1.9之前需要在.index()后添加.first()来正常工作,jquery1.9+就不必加了
```

###### .index()有参数的情况(字符串参数)

```html
<ul>
  <div class="test"></div>
  <li id="foo1">foo</li>
  <li id="bar1" class="test">bar</li>
  <li id="baz1">baz</li>
  <div class="test"></div>
</ul>
<div id="last"></div>
```

```javascript
var foo = $("li");
// This implicitly calls .first()
console.log("Index: " + foo.index("li")); // 0
console.log("Index: " + foo.first().index("li")); // 0

var baz = $("#baz1");
console.log("Index: " + baz.index("li")); // 2

var listItem = $("#bar1");
console.log("Index: " + listItem.index(".test")); // 1

var div = $("#last");
console.log("Index: " + div.index("div")); // 2
```

###### .index()参数(是一个 jquery 的选择器)

如果参数是一个选择器,返回值就是原先元素相对于选择器匹配元素中的位置,找不到返回-1

```html
<ul>
  <div class="test"></div>
  <li id="foo1">foo</li>
  <li id="bar1" class="test">bar</li>
  <li id="baz1">baz</li>
  <div class="test"></div>
</ul>
<div id="last"></div>
```

```javascript
var foo = $("li");
var baz = $("#baz1");
console.log("Index: " + foo.index(baz)); // 2

var tests = $(".test");
var bar = $("#bar1");

// Implicitly calls .first() on the argument.
console.log("Index: " + tests.index(bar)); // 1
console.log("Index: " + tests.index(bar.first())); // 1
```
