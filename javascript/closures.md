## JavaScript Closures (JavaScript 闭包)

闭包是指能够访问自由变量的函数.定义在闭包中的函数可以记忆它创建时的环境  
闭包是一种特殊的对象,它由两部分构成:函数以及创建该函数的环境,环境是指闭包创建的时作用域中的局部变量组成

```JavaScript
function makeFunc() {
  var name = "Mozilla";
  function displayName() {
    alert(name);
  }
  return displayName;
}

var myFunc = makeFunc();
myFunc();
```

运行这段代码的效果和之前的 init() 示例完全一样：字符串 "Mozilla" 将被显示在一个 JavaScript 警告框中。其中的不同 — 也是有意思的地方 — 在于 displayName() 内部函数在执行前被从其外围函数中返回了。

这段代码看起来别扭却能正常运行。通常，函数中的局部变量仅在函数的执行期间可用。一旦 makeFunc() 执行过后，我们会很合理的认为 name 变量将不再可用。虽然代码运行的没问题，但实际并不是这样的。

这个谜题的答案是 myFunc 变成一个 闭包 了。 闭包是一种特殊的对象。它由两部分构成：函数，以及创建该函数的环境。环境由闭包创建时在作用域中的任何局部变量组成。在我们的例子中，myFunc 是一个闭包，由 displayName 函数和闭包创建时存在的 "Mozilla" 字符串形成。

#### 用闭包模拟私有方法

诸如 Java 在内的一些语言支持将方法声明为私有的，即它们只能被同一个类中的其它方法所调用。对此，JavaScript 并不提供原生的支持，但是可以使用闭包模拟私有方法。私有方法不仅仅有利于限制对代码的访问：还提供了管理全局命名空间的强大能力，避免非核心的方法弄乱了代码的公共接口部分。
下面的示例展现了如何使用闭包来定义公共函数，且其可以访问私有函数和变量。这个方式也称为 模块模式（module pattern）：

```JavaScript
var makeCounter=function(){
  var privateCounter=0;
  function changeBy(v){
    privateCounter+=v;
  }
  return {
    increment:function(){
      changeBy(1);
    },
    decrement:function(){
      changeBy(-1);
    },
    value:function(){
      return privateCounter;
   }
  };
}

var counter1=makeCounter();
counter1.increment(); // 1
counter1.increment(); // 2
counter1.decrement(); // 1
console.log(counter1.value()); //1

var counter2=makeCounter();
counter2.increment(); // 1
counter2.decrement(); // 0
console.log(counter2.value()); // 0
```

请注意两个计数器是如何维护它们各自的独立性的。每次调用 makeCounter() 函数期间，其环境是不同的。每次调用中， privateCounter 中含有不同的实例。这种形式的闭包提供了许多通常由面向对象编程 U 所享有的益处，尤其是数据隐藏和封装。

#### 性能考量

如果不是因为某些特殊任务而需要闭包，在没有必要的情况下，在其它函数中创建函数是不明智的，因为闭包对脚本性能具有负面影响，包括处理速度和内存消耗。
