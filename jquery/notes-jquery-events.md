### jquery 事件

jquery 提供简单的方法将事件附加在选择器上,提供的方法在事件发生的时候会调用,在方法内部,"this"指向该选中的元素(比如被点击的元素),事件处理的方法接受一个事件对象,该事件对象被用于确定事件的属性和阻止事件默认行为

---

#### jquery 基本事件

.click(),.focus(),.blur(),.change(),etc 都可以用.on()代替

```javascript
// Event setup using a convenience method
$("p").click(function() {
  console.log("You clicked a paragraph!");
});
// Equivalent event setup using the `.on()` method
$("p").on("click", function() {
  console.log("click");
});
```

##### 延伸事件到新的页面元素(Extending Events to New Page Elements)

```javascript
// 例如
$(document).ready(function() {
  // Sets up click behavior on all button elements with the alert class
  // that exist in the DOM when the instruction was executed
  $("button.alert").on("click", function() {
    console.log("A button with the alert class was clicked!");
  });
  // Now create a new button element with the alert class. This button
  // was created after the click listeners were applied above, so it
  // will not have the same click behavior as its peers
  $("<button class='alert'>Alert!</button>").appendTo(document.body);
});
// Consult the article on event delegation to see how to use .on() so that event behaviors will be extended to new elements without having to rebind them.
```

##### Inside the Event Handler Function

```javascript
// pageX, pageY
// type : The type of the event (e.g., "click").
// which : The button or key that was pressed.

// data : Event setup using the `.on()` method with data
$("input").on(
  "change",
  { foo: "bar" }, // Associate data with event binding
  function(eventObject) {
    console.log("An input value has changed! ", eventObject.data.foo);
  }
);

// target : The DOM element that initiated the event
// namespace : The namespace specified when the event was triggered.
// timeStamp : The difference in milliseconds between the time the event occurred in the browser and January 1, 1970.

// preventDefault() : prevent the defualt action of the event

// stopPropagation() : stop the event from bubbing up to other elements

// 额外的情况,为了转换DOM元素称为jquery对象,用$(this)
// 看下面完整的例子
// Preventing a link from being followed
$("a").click(function(eventObject) {
  var elem = $(this);
  if (elem.attr("href").match(/evil/)) {
    eventObject.preventDefault();
    elem.addClass("evil");
  }
});
```

##### 设置多个事件

```javascript
// Multiple events, same handler
$("input").on(
  "click change", // Bind handlers for multiple events
  function() {
    console.log("An input was clicked or changed!");
  }
);
// Binding multiple events with different handlers
$("p").on({
  click: function() {
    console.log("clicked!");
  },
  mouseover: function() {
    console.log("hovered!");
  }
});
```

##### 命名你的事件(namespacing events)

```javascript
// Namespacing events
$("p").on("click.myNamespace", function() {
  /* ... */
});
$("p").off("click.myNamespace");
$("p").off(".myNamespace"); // Unbind all events in the namespace
```

##### 删除事件监听器(tearing down event listeners)

```javascript
// Tearing down all click handlers on a selection
$("p").off("click");

// Tearing down a particular click handler, using a reference to the function
var foo = function() {
  console.log("foo");
};
var bar = function() {
  console.log("bar");
};
$("p")
  .on("click", foo)
  .on("click", bar);
$("p").off("click", bar); // foo is still bound to the click event
```

##### 设置事件只运行一次(setting up events to run once)

```javascript
// Switching handlers using the `.one()` method
$("p").one("click", firstClick);
function firstClick() {
  console.log("You just clicked this for the first time!");
  // Now set up the new handler for subsequent clicks;
  // omit this step if no further click responses are needed
  $(this).click(function() {
    console.log("You have clicked this before!");
  });
}

// Using .one() to bind several events
$("input[id]").one("focus mouseover keydown", firstEvent);
function firstEvent(eventObject) {
  console.log(
    "A " +
      eventObject.type +
      " event occurred for the first time on the input with id " +
      this.id
  );
}
```

#### 事件帮助(Event Helpers)

```javascript
// The hover helper function
$("#menu li").hover(function() {
  $(this).toggleClass("hover");
});
```

#### 事件概述

添加事件坚挺的方式有多种

```javascript
// The many ways to bind events with jQuery
// Attach an event handler directly to the button using jQuery's
// shorthand `click` method.
$("#helloBtn").click(function(event) {
  alert("Hello.");
});

// Attach an event handler directly to the button using jQuery's
// `bind` method, passing it an event string of `click`
$("#helloBtn").bind("click", function(event) {
  alert("Hello.");
});

// As of jQuery 1.7, attach an event handler directly to the button
// using jQuery's `on` method.
$("#helloBtn").on("click", function(event) {
  alert("Hello.");
});

// As of jQuery 1.7, attach an event handler to the `body` element that
// is listening for clicks, and will respond whenever *any* button is
// clicked on the page.
$("body").on(
  {
    click: function(event) {
      alert("Hello.");
    }
  },
  "button"
);

// An alternative to the previous example, using slightly different syntax.
// 事件委托机制,当我们需要对很多元素添加事件的时候，可以通过将事件添加到它们的父节点而将事件委托给父节点来触发处理函数
$("body").on("click", "button", function(event) {
  alert("Hello.");
});

// Binding a named function
// 如果多个元素或者多个事件共享一个handler事件处理器,可以用下面的方法来简化的代码
function sayHello(event) {
  alert("Hello.");
}
$("#helloBtn").on("click", sayHello);

// Preventing a default action from occurring and stopping the event bubbling
$("form").on("submit", function(event) {
  // Prevent the form's default submission.
  event.preventDefault();
  // Prevent event from bubbling up DOM tree, prohibiting delegation
  event.stopPropagation();
  // Make an AJAX request to submit the form data
});
```

#### 事件处理(handling events)

.on()可以绑定任何所选元素的事件

```javascript
// link Simple event binding
// When any <p> tag is clicked, we expect to see '<p> was clicked' in the console.
$("p").on("click", function() {
  console.log("<p> was clicked");
});

//Many events, but only one event handler
// When a user focuses on or changes any input element,
// we expect a console message bind to multiple events
$("div").on("mouseenter mouseleave", function() {
  console.log("mouse hovered over or left a div");
});

// Many events and handlers
$("div").on({
  mouseenter: function() {
    console.log("hovered over a div");
  },
  mouseleave: function() {
    console.log("mouse left a div");
  },
  click: function() {
    console.log("clicked on a div");
  }
});

// The event object
$("div").on("click", function(event) {
  console.log("event object:");
  console.dir(event);
});

// Passing data to the event handler
$("p").on(
  "click",
  {
    foo: "bar"
  },
  function(event) {
    console.log("event data: " + event.data.foo + " (should be 'bar')");
  }
);

// Binding events to elements that don't exist yet
// this is called event delegation(事件委托)
$("ul").on("click", "li", function() {
  console.log(
    "Something in a <ul> was clicked, and we detected that it was an <li> element."
  );
});

// Connecting Events to Run Only Once
// Switching handlers using the `.one()` method
$("p").one("click", function() {
  console.log("You just clicked this for the first time!");
  $(this).click(function() {
    console.log("You have clicked this before!");
  });
});

// link Disconnecting Events(解除事件监听)
// Unbinding all click handlers on a selection
$("p").off("click");
// Unbinding a particular click handler, using a reference to the function
var foo = function() {
  console.log("foo");
};
var bar = function() {
  console.log("bar");
};

$("p")
  .on("click", foo)
  .on("click", bar);
// foo will stay bound to the click event
$("p").off("click", bar);
```

#### 在事件处理函数内部(inside the event handling function)

```javascript
// pageX, pageY
// type
// which
// data
// target
// preventDefault()
// stopPropagation()

//In addition to the event object, the event handling function also has access to the DOM element that the handler was bound to via the keyword this. To turn the DOM element into a jQuery object that we can use jQuery methods on, we simply do $( this ), often following this idiom
var elem = $(this);
// Preventing a link from being followed
$("a").click(function(event) {
  var elem = $(this);
  if (elem.attr("href").match("evil")) {
    event.preventDefault();
    elem.addClass("evil");
  }
});
```

#### 理解事件委托机制

事件委托机制允许我们把一个事件监听器附加到一个父节点,该事件监听器将会在匹配的后代中工作,无论后代是现在存在的还是未来添加的

```html
<html>
<body>
<div id="container">
    <ul id="list">
        <li><a href="http://domain1.com">Item #1</a></li>
        <li><a href="/local/path/1">Item #2</a></li>
        <li><a href="/local/path/2">Item #3</a></li>
        <li><a href="http://domain4.com">Item #4</a></li>
    </ul>
</div>
</body
```

```javascript
// Attach a directly bound event handler
$("#list").on("click", "a", function(event) {
  event.preventDefault();
  console.log($(this).text());
});
// other example
// Attach a delegated event handler with a more refined selector
// 其中a[href^='http']表示以http开头的链接
$("#list").on("click", "a[href^='http']", function(event) {
  $(this).attr("target", "_blank");
});
```

#### 触发事件处理器(triggering event handlers)

可以手动通过.trigger()方法触发事件,不过该方法不能用于模拟本地浏览器事件,比如点击超链接或者输入框

```javascript
<a href="http://learn.jquery.com">Learn jQuery</a>;

// This will not change the current page
$("a").trigger("click");

// 如果不用.trigger()方法如何模拟本地浏览器事件
// 可以用jquery UI团队提供的jquery.simular.js
// Triggering a native browser event using the simulate plugin
$("a").simulate("click");
```

#### jquery 事件的变化历史

贯穿 jquery 的演化史,事件绑定的方法进行了无数次的改进,从 jquery1.7 开始启用.on()方法来直接绑定事件或者创建委托事件,下面介绍从 jquery1.0 开始到现在绑定事件方法的更替

```javascript
// .bind() 在jquery1.0 废弃

// .live() jquery1.3 废弃

// .delegate() jquery 1.4.2 废弃

// .on() jquery 1.7+
```
