### Effects 特效

在你的页面上通过 jquery 加特效非常简单,可以用 jquery 提供的特效或者你自己定制的特效

#### 特效入门

##### 显示隐藏内容

.hide() .show()

```javascript
// Instantaneously hide all paragraphs
$("p").hide();

// Instantaneously show all divs that have the hidden style class
$("div.hidden").show();

// Slowly hide all paragraphs
$("p").hide("slow");

// Quickly show all divs that have the hidden style class
$("div.hidden").show("fast");

// Hide all paragraphs over half a second
$("p").hide(500);

// Show all divs that have the hidden style class over 1.25 seconds
$("div.hidden").show(1250);
```

##### 淡入滑动特效

.slideUp() .slideDown() .fadeOut() .fadeIn()

```javascript
// Hide all paragraphs using a slide up animation over 0.8 seconds
$("p").slideUp(800);

// Show all hidden divs using a slide down animation over 0.6 seconds
$("div.hidden").slideDown(600);

// Hide all paragraphs using a fade out animation over 1.5 seconds
$("p").fadeOut(1500);

// Show all hidden divs using a fade in animation over 0.75 seconds
$("div.hidden").fadeIn(750);
```

##### 根据当前的可见性状态改变显示

```javascript
// Instantaneously toggle the display of all paragraphs
$("p").toggle();

// Slowly toggle the display of all images
$("img").toggle("slow");

// Toggle the display of all divs over 1.8 seconds
$("div").toggle(1800);

// Toggle the display of all ordered lists over 1 second using slide up/down animations
$("ol").slideToggle(1000);

// Toggle the display of all blockquotes over 0.4 seconds using fade in/out animations
$("blockquote").fadeToggle(400);
```

##### 在动画完成后添加回调函数

```javascript
// Fade in all hidden paragraphs; then add a style class to them (not quite right)
// 不好
$("p.hidden")
  .fadeIn(750)
  .addClass("lookAtMe");

// Fade in all hidden paragraphs; then add a style class to them (correct with animation callback)
// 很好
$("p.hidden").fadeIn(750, function() {
  // this = DOM element which has just finished being animated
  $(this).addClass("lookAtMe");
});

// Run a callback even if there were no elements to animate
var someElement = $("#nonexistent");

var cb = function() {
  console.log("done!");
};

if (someElement.length) {
  someElement.fadeIn(300, cb);
} else {
  cb();
}
```

##### 管理特效

.stop() .delay() .jQuery.fx .jQuery.fx.off

```javascript
// Create a button to stop all animations on the page:
$( "<button type='button'></button>" )
    .text( "Stop All Animations" )
    .on( "click", function() {
        $( "body *" ).filter( ":animated" ).stop();
    })
    .appendTo( document.body );

// Hide all level 1 headings over half a second; then wait for 1.5 seconds
// and reveal all level 1 headings over 0.3 seconds
$( "h1" ).hide( 500 ).delay( 1500 ).show( 300 );

// jQuery.fx对象含有大量对特效的预定值,你可以重写这些设置来改变动画的默认设置
{
    slow: 600,
    fast: 200,
    _default: 400 // Default speed, used for "normal"
}

// You can modify any of these settings and even introduce some of your own
jQuery.fx.speeds.fast = 300;
jQuery.fx.speeds.blazing = 100;
jQuery.fx.speeds.excruciating = 60000;

// jQuery.fx.off can be set to true to disable all animations
$( "<button type='button'></button>" )
    .text( "Disable Animations" )
    .on( "click", function() {
        jQuery.fx.off = true;
    })
    .appendTo( document.body );
```

#### 用.animate()定制特效

通过.animate()方法可以实现强大的特效

```javascript
// Custom effects with .animate()
$("div.funtimes").animate(
  {
    left: "+=50",
    opacity: 0.25
  },
  // Duration
  300,
  // Callback to invoke when the animation is finished
  function() {
    console.log("done!");
  }
);
// 注意与颜色相关的属性在.animate()中无法使用,不过jquery提供的jquery-color插件可以处理

//Easing
// Per-property easing
$("div.funtimes").animate(
  {
    left: ["+=50", "swing"],
    opacity: [0.25, "linear"]
  },
  300
);
```

#### queue&dequeue explained

##### queues as callbacks

```javascript
//queue跟callback函数完成一样的功能
$( ".box" )
    .animate( {
        height: 20
    }, "slow")
    .queue( function() {
        $( "#title" ).html( "We're in the animation, baby!" );
        // This tells jQuery to continue to the next item in the queue
        // 调用.dequeue()让该执行的项目弹出队列,然后执行下一个任务
        $( this ).dequeue();
    } );

// 另外一种让执行完毕的任务弹出队列的方式是调用.next()
.queue( function( next ) {
    console.log( "I fired!" );
    next();
} );

```

##### 定制队列

以上都是使用默认的队列名字"fx",元素可以有很多个队列附加在其上面,我们可以给每个队列不同的名字

```javascript
// 输入.dequeue("queueName")调用该队列执行
$(".box")
  .queue("steps", function(next) {
    console.log("Step 1");
    next();
  })
  .queue("steps", function(next) {
    console.log("Step 2");
    next();
  })
  .dequeue("steps");
```

##### 清除队列

队列就是一些列有序的操作,调用.clearQueue()可以清除队列

```javascript
// In this example, nothing will happen as we removed everything from the steps queue.
$(".box")
  .queue("steps", function(next) {
    console.log("Will never log because we clear the queue");
    next();
  })
  .clearQueue("steps")
  .dequeue("steps");
```

##### 替换队列
