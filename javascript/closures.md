# JavaScript Closures 闭包

闭包是指能够访问自由变量的函数, 定义在闭包中的函数可以记忆它创建时的环境. 闭包是一种特殊的对象, 它由两部分构成, 函数以及创建该函数的环境, 环境是指闭包创建时作用域中的局部变量组成.

```JavaScript
function makeFun() {
  var name = "Mozilla";
  function displayName() {
    console.log(name);
  }
  return displayName;
}

var myFunc = makeFun();
myFunc();
```

这段代码看起来别扭却能正常运行. 通常, 函数中的局部变量仅在函数的执行期间可用. 一旦 makeFunc() 执行过后, 我们会很合理的认为 name 变量将不再可用. 虽然代码运行的没问题, 但实际并不是这样的.

这个谜题的答案是 myFunc 变成一个**闭包**了, 闭包是一种特殊的对象. 它由两部分构成, 函数以及创建该函数的环境. 环境由闭包创建时在作用域中的任何局部变量组成. 在我们的例子中, myFunc 是一个闭包, 由 displayName 函数和闭包创建时存在的 "Mozilla" 字符串形成.

## 用闭包模拟私有方法

诸如 Java 在内的一些语言支持将方法声明为私有的, 即它们只能被同一个类中的其它方法所调用. 对此, JavaScript 并不提供原生的支持, 但是可以使用闭包模拟私有方法. 私有方法不仅仅有利于限制对代码的访问：还提供了管理全局命名空间的强大能力, 避免非核心的方法弄乱了代码的公共接口部分.

下面的示例展现了如何使用闭包来定义公共函数, 且其可以访问私有函数和变量. 这个方式也称为 模块模式（module pattern）：

```JavaScript
var makeCounter = function(){
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

请注意两个计数器是如何维护它们各自的独立性的. 每次调用 makeCounter() 函数期间, 其环境是不同的. 每次调用中, privateCounter 中含有不同的实例. 这种形式的闭包提供了许多通常由面向对象编程 U 所享有的益处, 尤其是数据隐藏和封装.

## 性能考量

如果不是因为某些特殊任务而需要闭包, 在没有必要的情况下, 在其它函数中创建函数是不明智的, 因为闭包对脚本性能具有负面影响, 包括处理速度和内存消耗.

## 闭包的其他解释

理解闭包，首先必须理解变量作用域。JavaScript 有两种作用域：全局作用域和函数作用域。函数内部可以直接读取全局变量。如果出于种种原因，需要得到函数内的局部变量。正常情况下，这是办不到的，只有通过变通方法才能实现。那就是在函数的内部，再定义一个函数。

```javascript
function f1() {
  var n = 999;
  function f2() {
    console.log(n);
  }
  return f2;
}

var result = f1();
result(); // 999
```

闭包就是一个函数能够读取其他函数内部变量的函数。由于在 JavaScript 语言中，只有函数内部的子函数才能读取内部变量，因此可以把闭包简单理解成“定义在一个函数内部的函数”。闭包最大的特点，就是它可以“记住”诞生的环境，比如 f2 记住了它诞生的环境 f1，所以从 f2 可以得到 f1 的内部变量。

闭包的最大用处有两个：

- 一个是可以读取函数内部的变量，另一个就是让这些变量始终保持在内存中，即闭包可以使得它诞生环境一直存在。
- 闭包的另一个用处，是封装对象的私有属性和私有方法。

注意，外层函数每次运行，都会生成一个新的闭包，而这个闭包又会保留外层函数的内部变量，所以内存消耗很大。因此不能滥用闭包，否则会造成网页的性能问题。
