### jquery ajax

XMLHttpRequest 是 Ajax(asynchronous javascript and xml)的一部分,jquery 提供了对其的封装,比如$.ajax(),$.get(),$.getScript(),$.getJSON(),$.post(),$().load(),通常,Ajax 在跨域的时候并不能正常工作,比如一个网页从 a.com 发送 Ajax 请求是获取不到 b.com 数据的,以为他们违反同源策略(origin policy),不过不用担心,JSONP(JSON with padding)解决了这个问题

#### 关键概念(key concepts)

##### GET VS. POST

GET:用于非破坏性操作(non-destructive operations),你仅仅从服务器获取数据,不能修改数据,其请求的数据通常能被浏览器缓存,GET 请求通常在一个查询字符串中包含所有数据  
POST:用于破坏性操作(destructive operations),可以更改服务器数据,浏览器通常不会缓存该数据,查询字符串是 URL 中的一部分,数据和查询字符串分离

##### Data Types

text: for transporting simple string  
html: for transporting blocks of HTML to be placed on the page  
script: for adding a new script to the page  
json: for transporting JSON-formatted data,which can include strings,arrays,and objects
jsonp: for transporting JSON data from another domain  
xml: for transporting data in a custom XML schema.  
大多数的情况下用 JSON 格式传输数据

##### A is Asynchronous

```javascript
//The asynchronicity of Ajax catches many new jQuery users off guard. Because Ajax calls are asynchronous by default, the response is not immediately available. Responses can only be handled using a callback. So, for example, the following code will not work:
var response;
$.get("foo.php", function(r) {
  response = r;
});
console.log(response); // undefined

//Instead, we need to pass a callback function to our request; this callback will run when the request succeeds, at which point we can access the data that it returned, if any.
$.get("foo.php", function(response) {
  console.log(response); // server response
});
```

##### same-origin policy and JSONP

In general, Ajax requests are limited to the same protocol (http or https), the same port, and the same domain as the page making the request. This limitation does not apply to scripts that are loaded via jQuery's Ajax methods.

The other exception is requests targeted at a JSONP service on another domain. In the case of JSONP, the provider of the service has agreed to respond to your request with a script that can be loaded into the page using a \<script\> tag, thus avoiding the same-origin limitation; that script will include the data you requested, wrapped in a callback function you provide.

##### Ajax and Firebug

#### jQuery's Ajax-related Methods

\$.ajax()

```javascript
// Using the core $.ajax() method
$.ajax({
  // The URL for the request
  url: "post.php",
  // The data to send (will be converted to a query string)
  data: { id: 123 },
  // Whether this is a POST or GET request
  type: "GET",
  // The type of data we expect back
  dataType: "json"
})
  // Code to run if the request succeeds (is done);
  // The response is passed to the function
  .done(function(json) {
    $("<h1>")
      .text(json.title)
      .appendTo("body");
    $('<div class="content">')
      .html(json.html)
      .appendTo("body");
  })
  // Code to run if the request fails; the raw request and
  // status codes are passed to the function
  .fail(function(xhr, status, errorThrown) {
    alert("Sorry, there was a problem!");
    console.log("Error: " + errorThrown);
    console.log("Status: " + status);
    console.dir(xhr);
  })
  // Code to run regardless of success or failure;
  .always(function(xhr, status) {
    alert("The request is complete!");
  });
```

\$.ajax()的配置项

- asyn: 默认为 ture,设置为 false 变成同步调用
- cache: 默认 true,当这只为 false 会不用缓存
- done: 如何请求成功要执行的回调函数
- fail: 请求失败执行的回调函
- always: 无论失败是否都执行的回调函数
- context: 回调函数运行的上下文(在回调函数内部 this 指向原来发送给\$.ajax()的对象)
- data: 发送到服务器的数据,可以是对象,也可以是查询字符串(foo=bar&amp;baz=bim)
- dataType: 从服务器返回数据的类型
- jsonp: 默认值为"callback",当发送一个 JSONP 请求的时候,在查询字符串中回调函数的名字
- timeout: 设置延时(单位毫秒),超过该时间仍旧获取不到结果判定为失败的请求
- traditional: Set to true to use the param serialization style in use prior to jQuery 1.4. For details, see http://api.jquery.com/jQuery.param/.
- type: 请求类型,"GET"或者"POST","PUT","DELETE"
- url: 请求的 URL(该参数不能省略)

##### 一些简便用法

下面这些方法都是\$.ajax()的简单包装,他们都需要设置的参数是 url,data,success callback,data type(optional)

- \$.get
- \$.post
- \$.getScript
- \$.getJSON
- \$.fn.load()

```javascript
// Using jQuery's Ajax convenience methods
// Get plain text or HTML
$.get(
  "/users.php",
  {
    userId: 1234
  },
  function(resp) {
    console.log(resp); // server response
  }
);
// Add a script to the page, then run a function defined in it
$.getScript("/static/js/myScript.js", function() {
  functionFromMyScript();
});
// Get JSON-formatted data from the server
$.getJSON("/details.php", function(resp) {
  // Log each key in the response data
  $.each(resp, function(key, value) {
    console.log(key + " : " + value);
  });
});

// Using .load() to populate an element
$("#newContent").load("/foo.html");

// Using .load() to populate an element based on a selector
$("#newContent").load("/foo.html #myDiv h1:first", function(html) {
  alert("Content updated!");
});
```

#### Ajax and Forms

##### serialization

序列化表单,.serialized()转换成查询字符串和.serializeArray()转换成数组

```javascript
// Turning form data into a query string
$("#myForm").serialize();
// Creates a query string like this:
// field_1=something&field2=somethingElse

// Creating an array of objects containing form data
$("#myForm").serializeArray();

// Creates a structure like this:
// [
//   {
//     name : "field_1",
//     value : "something"
//   },
//   {
//     name : "field_2",
//     value : "somethingElse"
//   }
// ]
```

##### 客户端验证(Client-side validation)

```javascript
// Using validation to check for the presence of an input
$("#form").submit(function(event) {
  // If .required's value's length is zero
  if ($(".required").val().length === 0) {
    // Usually show some kind of error message here
    // Prevent the form from submitting
    event.preventDefault();
  } else {
    // Run $.ajax() here
  }
});

// Validate a phone number field
$("#form").submit(function(event) {
  var inputtedPhoneNumber = $("#phone").val();
  // Match only numbers
  var phoneNumberRegex = /^\d*$/;
  // If the phone number doesn't match the regex
  if (!phoneNumberRegex.test(inputtedPhoneNumber)) {
    // Usually show some kind of error message here
    // Prevent the form from submitting
    event.preventDefault();
  } else {
    // Run $.ajax() here
  }
});
```

##### Prefiltering

A prefilter is a way to modify the ajax options before each request is sent (hence, the name prefilter).

```javascript
// For example, say we would like to modify all cross-domain requests through a proxy. To do so with a prefilter is quite simple
// Using a proxy with a prefilter
$.ajaxPrefilter(function(options, originalOptions, jqXHR) {
  if (options.crossDomain) {
    options.url =
      "http://mydomain.net/proxy/" + encodeURIComponent(options.url);
    options.crossDomain = false;
  }
});

// You can pass in an optional argument before the callback function that specifies which dataTypes you'd like the prefilter to be applied to. For example, if we want our prefilter to only apply to JSON and script requests, we'd do:
// Using the optional dataTypes argument
$.ajaxPrefilter("json script", function(options, originalOptions, jqXHR) {
  // Do all of the prefiltering here, but only for
  // requests that indicate a dataType of "JSON" or "script"
});
```

#### Working with JSONP

The advent of JSONP — essentially a consensual cross-site scripting hack — has opened the door to powerful mashups of content. Many prominent sites provide JSONP services, allowing you access to their content via a predefined API. A particularly great source of JSONP-formatted data is the Yahoo! Query Language, which we'll use in the following example to fetch news about cats.

```javascript
// Using YQL and JSONP
$.ajax({
  url: "http://query.yahooapis.com/v1/public/yql",
  // The name of the callback parameter, as specified by the YQL service
  jsonp: "callback",
  // Tell jQuery we're expecting JSONP
  dataType: "jsonp",
  // Tell YQL what we want and that we want JSON
  data: {
    q: 'select title,abstract,url from search.news where query="cat"',
    format: "json"
  },
  // Work with the response
  success: function(response) {
    console.log(response); // server response
  }
});
```

jQuery handles all the complex aspects of JSONP behind-the-scenes — all we have to do is tell jQuery the name of the JSONP callback parameter specified by YQL ("callback" in this case), and otherwise the whole process looks and feels like a normal Ajax request.

#### Ajax Events

Often, you'll want to perform an operation whenever an Ajax request starts or stops, such as showing or hiding a loading indicator. Rather than defining this behavior inside every Ajax request, you can bind Ajax events to elements just like you'd bind other events. For a complete list of Ajax events, visit Ajax Events documentation on docs.jquery.com.

```javascript
// Setting up a loading indicator using Ajax Events
$("#loading_indicator")
  .ajaxStart(function() {
    $(this).show();
  })
  .ajaxStop(function() {
    $(this).hide();
  });
```
