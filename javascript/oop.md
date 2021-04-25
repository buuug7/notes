# JavaScript OOP 来自于[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript)

## 面向对象编程

面向对象编程是用抽象的方式创建基于现实世界模型的一种编程模式,包括模块化,多态,封装几种技术

面向对象可以看做是使用一系列对象相互协作的软件设计,相对于传统概念,一个程序只是一些函数的集合,或者简单的计算机指令的列表.
在 OOP 中,每个对象都能够接受消息,处理数据和发送消息给其他对象,每个对象都可以看做是一个拥有清晰角色或者责任的独立小机器.

面向对象编程的目的是在编程中促进更多的灵活性和可维护性,在大型软件工程中广为流行.凭借其对模块的重用,面向对象的代码开发更简单,更容易理解,相比非模块化编程方法,它能更直接的分析,编码和理解复杂的情况和过程

## 术语

- Namespace 命名空间 允许开发人员在一个独特,应用相关的名字下捆绑所有的功能的容器
- Class 类 定义对象的特征,它是对象属性和方法的模板定义
- Object 对象 类的一个实例
- Property 属性 对象的特征,比如颜色
- Method 方法 对象的能力,比如行走
- Constructor 构造函数 对象初始化的瞬间被调用的方法,通常它的名字与包含它的类一直
- Inheritance 继承 一个类可以继承另一个类的特征
- Encapsulation 封装 一种把数据和相关方法捆绑在一起使用的方法
- Abstraction 抽象 结合复杂的继承,方法,属性的对象能够模拟现实的模型
- Polymorphism 多态 不同类可以定义相同的方法或属性

## 原型编程(prototype-based programming)

基于原型的编程不是面向对象编程中体现的风格，且行为重用（在基于类的语言中也称为继承）是通过装饰它作为原型的现有对象的过程实现的。这种模式也被称为弱类化，原型化，或基于实例的编程。

## JavaScript 面向对象编程

#### 命名空间

在 javascript 中,命名空间只是另一个包含方法,属性,对象的对象,JavaScript 中的普通对象和命名空间在语言层面上没有区别,在 JavaScript 中创建命名空间很简单:一个全局对象被创建,所有的变量,方法和功能都成为该对象的属性,使用命名空间很大程度上减少应用程序的名称冲突.

```JavaScript
// 全局命名空间
var MYAPP=MYAPP || {};
```

在上面的代码示例中，我们首先检查 MYAPP 是否已经被定义（是否在同一文件中或在另一文件）。如果是的话，那么使用现有的 MYAPP 全局对象，否则，创建一个名为 MYAPP 的空对象用来封装方法，函数，变量和对象。

我们也可以创建子命名空间

```JavaScript
// 子命名空间
var MYAPP.event={};
```

下面是用于创建命名空间和添加变量,函数和方法的代码写法:

```JavaScript
// 给普通方法和属性创建一个叫做MYAPP.commonMethod的容器
MYAPP.commonMethod = {
  regExForName: "", // 定义名字的正则验证
  regExForPhone: "", // 定义电话的正则验证
  validateName: function(name){
    // 对名字name做些操作，你可以通过使用“this.regExForname”
    // 访问regExForName变量
  },

  validatePhoneNo: function(phoneNo){
    // 对电话号码做操作
  }
}

// 对象和方法一起申明
MYAPP.event = {
    addListener: function(el, type, fn) {
    //  代码
    },
   removeListener: function(el, type, fn) {
    // 代码
   },
   getEvent: function(e) {
   // 代码
   }

   // 还可以添加其他的属性和方法
}

//使用addListner方法的写法:
MYAPP.event.addListener("yourel", "type", callback);
```

#### 标准内置对象

JavaScript 有包括在其核心的几个对象，例如，Math，Object，Array 和 String 对象。下面的例子演示了如何使用 Math 对象的 random()方法来获得一个随机数。

```JavaScript
console.log(Math.random);
```

JavaScript 中的每个对象都是 Object 对象的实例且继承它所有的属性和方法

#### 自定义对象

##### 类

JavaScript 是一种基于原型的语言，它没类的声明语句，比如 C++或 Java 中用的.这有时会对习惯使用有类申明语句语言的程序员产生困扰.相反,JavaScript 可用方法作类.定义一个类跟定义一个函数一样简单.在下面的例子中,我们定义了一个新类 Person.

```JavaScript
function Person(){}
// 或者
var Person=function(){}
```

##### 对象(类的实例)

我们使用 new obj 创建对象 obj 的新实例, 将结果（obj 类型）赋值给一个变量方便稍后调用。
在下面的示例中，我们定义了一个名为 Person 的类，然后我们创建了两个 Person 的实例(person1 and person2).

```JavaScript
function Person(){}
var person1=new Person();
var person2=new Person();
```

##### 构造器

在实例化时构造器被调用 (也就是对象实例被创建时)。构造器是对象中的一个方法。 在 JavaScript,中函数就可以作为构造器使用,因此不需要特别地定义一个构造器方法. 每个声明的函数都可以在实例化后被调用执行

构造器常用于给对象的属性赋值或者为调用函数做准备。 在本文的后面描述了类中方法既可以在定义时添加，也可以在使用前添加。

在下面的示例中, Person 类实例化时构造器调用一个 alert 函数。

```JavaScript
function Person(){
  alert('Person instantiated');
}
var person1=new Person();
var person2=new Person();
```

##### 属性(对象属性)

属性就是 类中包含的变量;每一个对象实例有若干个属性. 为了正确的继承，属性应该被定义在类的原型属性 (函数)中。

可以使用 关键字 this 调用类中的属性, this 是对当前对象的引用。 从外部存取(读/写)其属性的语法是: InstanceName.Property; 这与 C++，Java 或者许多其他语言中的语法是一样的 (在类中语法 this.Property 常用于 set 和 get 属性值)

在下面的示例中，我们为定义 Person 类定义了一个属性 firstName 并在实例化时赋初值。

```JavaScript
function Person(firstName){
  this.firstName=firstName;
  alert('Person instantiated');
}
var person1=new Person('Alice');
var person2=new Person('Bob');

// Show the firstName peroperties of the Objects
alert('person1 is '+person1.firstName); // person1 is Alice
alert('person2 is '+person2.firstName); // person2 is Bob
```

##### 方法(对象属性)

方法与属性很相似， 不同的是：一个是函数，另一个可以被定义为函数。 调用方法很像存取一个属性, 不同的是 add () 在方法名后面很可能带着参数. 为定义一个方法, 需要将一个函数赋值给类的 prototype 属性; 这个赋值给函数的名称就是用来给对象在外部调用它使用的。

在下面的示例中，我们给 Person 类定义了方法 sayHello()，并调用了它.

```JavaScript
function Person(firstName){
  this.firstName=firstName;
}
Person.prototype.sayHello=function(){
  alert("Hello,I'm "+ this.firstName);
}
var person1=new Person('Alice');
var person2=new Person('Bob');

// call the Person sayHello method
person1.sayHello(); // Hello,I'm Alice
person2.sayHello(); // Hello,I'm Bob
```

在 JavaScript 中方法通常是一个绑定到对象中的普通函数, 这意味着方法可以在其所在 context 之外被调用。 思考下面示例中的代码:

```JavaScript
function Person(firstName) {
  this.firstName = firstName;
}

Person.prototype.sayHello = function() {
  alert("Hello, I'm " + this.firstName);
};

var person1 = new Person("Alice");
var person2 = new Person("Bob");
var helloFunction = person1.sayHello;

person1.sayHello();                                 // alerts "Hello, I'm Alice"
person2.sayHello();                                 // alerts "Hello, I'm Bob"
helloFunction();                                    // alerts "Hello, I'm undefined" (or fails
                                                    // with a TypeError in strict mode)
console.log(helloFunction === person1.sayHello);          // logs true
console.log(helloFunction === Person.prototype.sayHello); // logs true
helloFunction.call(person1);                        // logs "Hello, I'm Alice"
```

如上例所示, 所有指向 sayHello 函数的引用 ，包括 person1, Person.prototype, 和 helloFunction 等， 均引用了相同的函数.

在调用函数的过程中，this 的值取决于我们怎么样调用函数.在通常情况下，我们通过一个表达式 person1.sayHello()来调用函数：即从一个对象的属性中得到所调用的函数。此时 this 被设置为我们取得函数的对象（即 person1）。这就是为什么 person1.sayHello()使用了姓名“Alice”而 person2.sayHello()使用了姓名“bob”的原因。

然而我们使用不同的调用方法时, this 的值也就不同了。当从变量 helloFunction()中调用的时候， this 就被设置成了全局对象 (在浏览器中即 window)。由于该对象 (非常可能地) 没有 firstName 属性, 我们得到的结果便是"Hello, I'm undefined". (这是松散模式下的结果， 在 严格模式中，结果将不同（此时会产生一个 error）。 但是为了避免混淆，我们在这里不涉及细节) 。另外，我们可以像上例末尾那样，使用 Function#call (或者 Function#apply)显式的设置 this 的值。

##### 继承

创建一个或多个类的专门版本类方式称为继承（Javascript 只支持单继承）。 创建的专门版本的类通常叫做子类，另外的类通常叫做父类。 在 Javascript 中，继承通过赋予子类一个父类的实例并专门化子类来实现。在现代浏览器中你可以使用 Object.create 实现继承.

在下面的例子中, 我们定义了 Student 类作为 Person 类的子类. 之后我们重定义了 sayHello() 方法并添加了 sayGoodBye() 方法.

```JavaScript
// 定义Person构造器
function Person(firstName){
  this.firstName=firstName;
}

// 在Person.prototype中加入方法
Person.prototype.walk=function(){
  alert('I am walking!');
}
Person.prototype.sayHello=function(){
  alert("Hello,I'am "+this.firstName);
}

// 定义Student构造器
function Student(firstName,subject){
  // 调用父类构造器,确保(使用Function#call)"this"在调用过程中设置正确
  Person.call(this,firstName);
  // 初始化Student类特有属性
  this.subject=subject;
}

// 建立一个由Person.prototype继承而来的Student.prototype对象.
// 注意: 常见的错误是使用 "new Person()"来建立Student.prototype.
// 这样做的错误之处有很多, 最重要的一点是我们在实例化时
// 不能赋予Person类任何的FirstName参数
// 调用Person的正确位置如下，我们从Student中来调用它
Student.prototype=Object.create(Person.prototype);
// 设置"constructor"属性指向Student
Student.prototype.constructor=Student;

// 更换"sayHello"方法
Student.prototype.sayHello=function(){
  console.log("Hello,I'am "+this.firstName+".I'am studying "+this.subject+".");
}

// 加入"sayGoodBye方法"
Student.prototype.sayGoodBye=function(){
  console.log("Goodbye");
}

// 测试:
var student1=new Student("Janet","Applied Physics");
student1.sayHello(); // Hello, I'm Janet. I'm studying Applied Physics.
student1.walk(); // I am walking!
student1.sayGoodBye(); // Goodbye!

// check that instanceof works correctly
console.log(student1 instanceof Person); // true
console.log(student1 instanceof Student); // true
```

##### 封装

在上一个例子中，Student 类虽然不需要知道 Person 类的 walk()方法是如何实现的，但是仍然可以使用这个方法；Student 类不需要明确地定义这个方法，除非我们想改变它。 这就叫做封装，对于所有继承自父类的方法，只需要在子类中定义那些你想改变的即可。

##### 抽象

抽象是允许模拟工作问题中通用部分的一种机制。这可以通过继承（具体化）或组合来实现。
JavaScript 通过继承实现具体化，通过让类的实例是其他对象的属性值来实现组合。

JavaScript Function 类继承自 Object 类（这是典型的具体化） 。Function.prototype 的属性是一个 Object 实例（这是典型的组合）。

```JavaScript
var foo = function(){};
console.log( 'foo is a Function: ' + (foo instanceof Function) );                  // logs "foo is a Function: true"
console.log( 'foo.prototype is an Object: ' + (foo.prototype instanceof Object) ); // logs "foo.prototype is an Object: true"
```

##### 多态

就像所有定义在原型属性内部的方法和属性一样，不同的类可以定义具有相同名称的方法;方法是作用于所在的类中。并且这仅在两个类不是父子关系时成立（继承链中，一个类不是继承自其他类）。

#### 注意

本文中所展示的面向对象编程技术不是唯一的实现方式，在 JavaScript 中面向对象的实现是非常灵活的。

同样的，文中展示的技术没有使用任何语言 hacks，它们也没有模仿其他语言的对象理论实现。

JavaScript 中还有其他一些更加先进的面向对象技术，但这些都超出了本文的介绍范围。
