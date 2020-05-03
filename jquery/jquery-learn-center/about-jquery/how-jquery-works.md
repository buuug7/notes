## How jQuery works

#### jQuery : the basics

```html
<html>
  <head>
    <meta charset="utf-8" />
    <title>demo</title>
  </head>
  <body>
    <a href="http://jquery.com/">jQuery</a>
    <script src="https://unpkg/jquery"></script>
    <script>
      // you code here
    </script>
  </body>
</html>
```

#### launching Code on document ready

```javascript
$(document).ready(function() {
  // you code here
});
```

#### Adding and removing an HTML class

```javascript
$("a").addClass("myClass");
$("a").removeClass("myClass");
```

#### Special effects

```javascript
$(document).ready(function() {
  $("a").click(function(event) {
    event.preventDefault();
    $(this).hide("slow");
  });
});
```

#### Callbacks and functions

callback without arguments

```javascript
$.get("my.html", myCallBack);
```

callback with arguments

```javascript
// wrong
$.get("my.html", myCallBack(param1, param2));

// right
$.get("my.html", function() {
  myCallBack(param1, param2);
});
```
