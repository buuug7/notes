## jquery extend 插件

#### 类级别

可以理解为扩展 jquery 类,比如$.ajax(),相当于静态方法,使用$.extend(object)

```javascript
$.extend({
  add: function(a, b) {
    return a + b;
  },
  minus: function(a, b) {
    return a - b;
  }
});
```

#### 对象级别

可以理解为基于对象的拓展,例如$("body").showText(),使用$.fn.extend 方法

```javascript
// 定义
$.fn.extend({
  showText: function() {
    $(this).click(function() {
      alert($(this).text());
    });
  },
  showHtml: function() {
    $(this).click(function() {
      alert($(this).html());
    });
  }
});

// 用法
$("#top").showText();
$("#top").showHtml();
```

#### jquery 插件开发过程

- 定义作用域,为插件定义私有作用域,外部代码不能直接访问内部代码,插件内部代码不会污染全局变量

```javascript
(function($) {
  // you code here
})(jQuery);
```

- 定义方法,该方法可以接受一些参数

```javascript
(function($) {
  $.fn.showText = function(options) {
    // you code here
  };
})(jQuery);
```

- 设置默认值,一般会将默认属性定义为 defaults,使用\$.extend(defaults,options)将默认值和传入参数的值合并

```javascript
(function($) {
  $.fn.showText = function(options) {
    var defaults = {
      name: "buuug7",
      age: 22
    };

    options = $.extend(defaults, options);
  };
})(jQuery);
```

- 调用

```javascript
$("#id").showText();
```
