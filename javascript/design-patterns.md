# Design Patterns

Design patterns are reusable solutions to commonly occuring problems in software design.  
设计模式指的是对那些经常出现的问题的一种通用的解决方法, 设计模式的好处是为了代码的复用, 可维护性.

## 面向对象五大原则

#### Single Responsibility Principle 单一职责原则

核心思想是一个类最好只做一件事情, 职责过多, 可能引起变化的原因就越多, 这将导致职责相互依赖, 相互之间产生影响, 从而大大损伤其内聚性和耦合度, 职责通常理解为功能, 单一职责即为单一功能.

#### Open Closed Principle 开闭原则

核心思想是软件实体应该是可扩展的, 而不是可修改的. 也就是对扩展开放, 对修改封闭. 开放封闭原则主要体现在两个方面:

- 对扩展开放, 意味着有新的需求和变化时, 可以对现有代码进行扩展, 以适应新的情况
- 对修改封闭, 意味着类一旦设计完成, 就可以独立完成其工作, 而不要对其进行任何尝试性的修改

#### Dependency Inversion Principle 依赖倒置原则

核心思想是依赖于抽象, 具体而言就是高层模块不依赖于底层模块, 二者都同依赖于抽象, 抽象不依赖于具体, 具体必须依赖于抽象, 依赖抽象是面向对象编程的精髓, 也是依赖倒置的核心

#### Interface Segregation Principle 接口隔离原则

核心思想是使用多个小的专门的接口, 而不是使用一个大的总接口

#### Liskon Substitution Principle 里氏代换原则

核心思想是子类必须能够替换其基类, 但基类不一定能替换子类. 该思想体现为对继承机制的约束规范, 至于子类能够替换基类时, 才能保证系统在运行期间内识别子类, 这是保证继承复用的基础.

## JavaScript Design Patterns

由于 javascript 中缺少 class, 可以用 function 来模拟类, 例如:

```JavaScript
// A car "class"
function Car (model) {

  this.model = model;
  this.color = "silver";
  this.year = "2012";

  this.getInfo = function () {
    return this.model + " " + this.year;
  };
}

// 调用
var myCar = new Car("ford");
myCar.year = "2010";
console.log(myCar.getInfo());
```

#### The Constructor Pattern 构造器模式

对象构造器是被用来创建特殊类型的对象的, 首先它要准备使用的对象, 其次在对象初次被创建时, 通过接收参数, 构造器要用来对对象的属性和方法赋值.

创建对象的三种方式

```JavaScript
// 对象字面量
var newObject = {};
// 使用Object.create(Object.prototype)
var newObject = Object.create(Object.prototype);
// 使用new Object()
var newObject = new Object();
```

把键值对赋值给对象的四种方法

```JavaScript
// Set properties
newObject.someKey = "Hello World";
// Or
newObject["someKey"] = "Hello World";

// Get properties
var value = newObject.someKey;
// Or
// Get properties
var value = newObject["someKey"];

// use Object.defineProperty Set or update properties
Object.defineProperty(newObject, "someKey", {
  value: "for more control of the property's behavior",
  writable: true,
  enumerable: true,
  configurable: true
});

// use Object.defineProperties Set properties
Object.defineProperties(newObject, {

  "someKey": {
    value: "Hello World",
    writable: true
  },

  "anotherKey": {
    value: "Foo bar",
    writable: false
  }

});
```

一个简单的构造器模式的例子:

```JavaScript
function Person (name, age) {

  this.name = name;
  this.age = age;

  this.hello = function() {
    console.log('Hello World');
  }
}

// Usage:
var person1 = new Person("Tom", 18);
var person2 = new Person("Cat", 9);
```

使用"原型"的构造器: 在 Javascript 中函数有一个 prototype 的属性. 当我们调用 Javascript 的构造器创建一个对象时, 构造函数 prototype 上的属性对于所创建的对象来说都看见. 照这样, 就可以创建多个访问相同 prototype 的 Car 对象了.

```JavaScript
function Car (model, year, miles) {
  this.model = model;
  this.year = year;
  this.miles = miles;
}

// Note here that we are using Object.prototype.newMethod rather than
// Object.prototype so as to avoid redefining the prototype object
Car.prototype.toString = function () {
  return this.model + " has done " + this.miles + " miles";
};

// Usage:

var civic = new Car("Honda Civic", 2009, 20000);
var mondeo = new Car("Ford Mondeo", 2010, 5000);

console.log(civic.toString());
console.log(mondeo.toString());
```

上面代码, 单个 toString()实例被所有的 Car 对象所共享了

#### The Module Pattern (模块模式)

在 JavaScript 中有好几种实现模块模式的方法,包括:

- The Module pattern
- Object literal notation
- AMD modules
- CommonJS modules
- ECMAScript Harmony modules

#### Object Literals(对象字面量)

在对象字面量中,一个对象被描述为包裹在一对大括号中的键值对,注意最后的一个键值对后面没有逗号

```JavaScript
var myObjectLiteral = {
  variableKey: variableValue,
  functionKey: function () {
    // ...
  }
};
```

看看如下用对象字面量标记定义的一个完整的模块的例子

```JavaScript
var myModule = {
  myProperty: "someValue",
  // object literals can contain properties and methods.
  // e.g we can define a further object for module configuration:
  myConfig: {
    useCaching: true,
    language: "en"
  },

  // a very basic method
  saySomething: function () {
    console.log("Where in the world is Paul Irish today?");
  },

  // output a value based on the current configuration
  reportMyConfig: function () {
    console.log("Caching is: " + (this.myConfig.useCaching ? "enabled" : "disabled"));
  },

  // override the current configuration
  updateMyConfig: function (newConfig) {
    if (typeof newConfig === "object") {
      this.myConfig = newConfig;
      console.log(this.myConfig.language);
    }
  }
};

// Outputs: Where in the world is Paul Irish today?
myModule.saySomething();

// Outputs: Caching is: enabled
myModule.reportMyConfig();

// Outputs: fr
myModule.updateMyConfig({
  language: "fr",
  useCaching: false
});

// Outputs: Caching is: disabled
myModule.reportMyConfig();
```

#### The Module Pattern

在 JavaScript 中, 模块模式通常用来模拟一个对象中类似于类概念中的私有或者公开方法和变量, 这样有利于从全局作用域中分离出来, 不至于跟页面中其他的脚本中的函数命名冲突.

模块模式使用闭包来确保了"私有", 它提供了一种将私有方法和变量, 保护的代码片段从全局作用域中隔离开的方法, 使用这种模式, 仅仅只有公开的 API 被返回, 其他的所有都保持了私有. 该模式跟 IIFE 很类似, 只是返回对象而不是一个函数.

一个简单的模块模式的模板样例:

```JavaScript
var myNamespace = (function () {

  var myPrivateVar, myPrivateMethod;

  // A private counter variable
  myPrivateVar = 0;

  // A private function which logs any arguments
  myPrivateMethod = function (foo) {
    console.log(foo);
  };

  return {
    // A public variable
    myPublicVar: "foo",

    // A public function utilizing privates
    myPublicFunction: function (bar) {

      // Increment our private counter
      myPrivateVar++;

      // Call our private method using bar
      myPrivateMethod(bar);
    }
  };

})();
```
