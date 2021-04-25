## 第六章 面向对象的程序设计

关于对象的定义: 无序属性的集合,其属性可以包含基本值,对象或者函数.也就是说对象是一组没有特定顺序的值.

#### 理解对象

对象数据属性(property)具有的特性(attribute)有:

- [[Configurable]] 是否能通过 delete 删除属性从而重新定义属性,默认为 true
- [[Enumerable]] 是否能通过 for-in 循环返回属性,默认为 true
- [[Writable]] 能否修改属性的值,默认为 true
- [[Value]] 属性的数据值,默认为 undefined

访问器属性,getter 和 setter 函数,getter 用来读取,setter 用来写入,其特性有:

- [[Configurable]] 表示是否能够通过 delete 删除属性从而重新定义属性.默认为 true
- [[Enumerable]] 表示是否能通过 for-in 循环返回属性,默认为 true
- [[Get]] 在读取属性的时候调用的函数,默认为 undefined
- [[Setter]] 在写入属性的时候调用的函数,默认为 undefined

访问器属性不能直接定义,只能通过`Object.defineProperty()`来定义.

```javascript
var book = {
  _year: 2004,
  edition: 1,
};
Object.defineProperty(book, "year", {
  get: function () {
    return this._year;
  },
  set: function (newValue) {
    if (newValue > 2004) {
      this._year = newValue;
      this.edition += newValue - 2004;
    }
  },
});
book.year = 2005;
book.edition; // 2
```

定义多个属性:

```javascript
//
var book = {};
Object.defineProperties(book, {
  _year: {
    value: 2004,
  },
  edition: {
    value: 1,
  },
  year: {
    get: function () {
      return this._year;
    },
    set: function (newValue) {
      if (newValue > 2004) {
        this._year = newValue;
        this.edition += newValue - 2004;
      }
    },
  },
});
```

#### 创建对象

###### 工厂模式

一种广为人知的设计模式,其抽象了创建具体对象的过程.工厂模式解决了创建多个相似对象的问题,但是却没有解决对象识别的问题.

```JavaScript
function createPerson(name,age,job){
  var o = new Object();
  o.name = name;
  o.age = age;
  o.job = job;
  o.sayName = function(){
    alert(this.name);
  }
  return o;
}
var person1 = createPerson('Nicholas',29,"Software Engineer");
var person2 = createPerson('Greg',33,"Doctor");
```

###### 构造函数模式

构造模式可以创建特定类型的对象.

- 构造函数跟一般函数并没有什么区别
- 构造函数的主要问题是每个方法都要在每个实例上重新创建一遍

```javascript
function Person(name, age, job) {
  this.name = name;
  this.age = age;
  this.job = job;
  this.sayName = function () {
    alert(this.name);
  };
}
var person1 = new Person("Nicholas", 29, "Software Engineer");
var person2 = new Person("Greg", 33, "Doctor");
```

###### 原型模式

我们创建的每一个函数都有一个 prototype(原型)属性,这个属性是一个指针,指向一个对象,而这个对象的用途是包含可以由特定类型的所有实例共享的属性和方法.使用原型模式的好处是可以让所有对象实例共享它所包含的属性和方法.

```javascript
function Person() {}
Person.prototype.name = "Nicholas";
Person.prototype.age = 29;
Person.prototype.job = "Software engineer";
Person.prototype.sayName = function () {
  alert(this.name);
};

var person1 = new Person();
person1.sayName(); // Nicholas
var person2 = new Person();
person2.sayName(); // Nicholas
alert(person1.sayName == person2.sayName); // true

// Object.getPrototypeOf() 用来获取一个对象的原型
Object.getPrototypeOf(person1) == Person.prototype; // true

// 实例定义的属性或者方法可以覆盖原型中的同名属性或者方法

// 原型与in操作符
// in操作符会在通过对象能够访问给定属性时返回true,无论该属性存在于实例或者原型中
"name" in person1; // true

// 可以用for-in 来枚举对象的属性(可枚举的属性),但是ECMAScript 5中有更好的获取方法Object.keys()
Object.keys(person1);

// 更简单的原型语法
function Person() {}
Person.prototype = {
  constructor: Person,
  name: "Nicholas",
  age: 29,
  job: "Software Engineer",
  syaName: function () {
    alert(this.name);
  },
};

// 实例的原型仅指向原型,而不是指向构造函数
// javascript中所有原生的引用类型都是使用原型模式创建,比如 Object,Array,String

// 原型模式的缺点
// 原型中的所有属性被很多实例共享,对于包含基本值得属性影响不大,但是对于那些包含引用类型值得属性来说,问题非常突出
// 一个实例修改该引用类型的属性,会导致其他实例上该属性值同步发生变化,因为部分实例有属于自己的属性
// 这也导致了很少有人单独使用原型模式
```

###### 组合使用构造函数模式和原型模式

在这种模式下,构造函数模式用来定义实例属性,而原型模式用来定义方法和共享属性,结果每个实例都会有自己的一份实例属性的副本,但同时又共享着对方的引用,最大限度的节省了内存.该模式是目前在 ECMAScript 中使用最广泛,认同度最高的一种创建自定义对象的方法.

```javascript
function Person(name, age, job) {
  this.name = name;
  this.age = age;
  this.job = job;
  this.friends = ["Shelby", "Court"];
}
Person.prototype = {
  constructor: Person,
  sayName: function () {
    alert(this.name);
  },
};

var person1 = new Person("Nicholas", 29, "Software Engineer");
var person2 = new Person("Greg", 27, "Doctor");

person1.friends.push("Van");
person1.friends; // ["Shelby", "Court", "Van"]
person2.friends; // ["Shelby", "Court"]
```

###### 动态原型模式

把所有的信息都封装在构造函数中,比较完美,不过不能用对象字面量重写原型.

```javascript
function Person(name, age, job) {
  this.name = name;
  this.age = age;
  this.job = job;

  if (typeof this.sayName != "function") {
    Person.prototype.sayName = function () {
      alert(this.name);
    };
  }
}
```

###### 寄生构造函数模式

用的不多,不在介绍

###### 稳妥构造函数模式

用的不都,听说很安全,适合在某些安全执行环境中使用,这里不在介绍了

#### 继承

由于 ECMAscript 中函数没有签名,无法实现接口继承,只能用实现继承,实现继承主要依据原型链来实现.

###### 原型链

原型链的概念:让一个引用类型的原型等于另外一个引用类型的实例,而另外一个引用类型的原型又指向另外一个引用类型的实例,如此层层递进,就构成了实例与原型的链条.  
原型链实现继承的问题有:

- 包含引用类型的原型属性会被所有实例共享
- 创建子类型的实例时,不能向超类型中传递参数

###### 借用构造函数

基本思想是在子类构造函数的内部调用超类构造函数.

```javascript
function SuperType(name) {
  this.name = name;
}
function SubType() {
  SuperType.call(this, "Nicholas");
  // 实例属性
  this.age = 29;
}
var instance = new SubType();
instance.name; // Nicholas
instance.age; // 29
```

借用构造函数的问题:

- 方法都在构造函数中定义,因此函数复用就无从谈起
- 在超类型的原型中定义的方法,对子类而言也是不可见的,结果所有类型都只能使用构造函数模式

###### 组合继承(combination inheritance)

组合继承也叫做伪经典继承,指的是将原型链和借用构造函数的技术组合到一块,从而发挥两者之长的一种继承模式.背后的思路是使用原型链实现对原型属性和方法的继承,而通过借用构造函数来实现对实例属性的继承.

```javascript
function SuperType(name) {
  this.name = name;
  this.colors = ["red", "blue", "green"];
}

SuperType.prototype.sayName = function () {
  alert(this.name);
};

function SubType(name, age) {
  // 继承属性
  SuperType.call(this, name);
  this.age = age;
}

// 继承方法
SubType.prototype = new SuperType();

SubType.prototype.sayAge = function () {
  alert(this.age);
};

var instance1 = new SubType("Nicholas", 29);
instance1.colors.push("black");
instance1.colors; // red,blue,green,black,
instance1.sayName(); // Nicholas
instance1.sayAge(); // 29

var instance2 = new SubType("Gred", 27);
instance2.colors; // red,blue,green;
instance2.sayName(); // Nicholas
instance2.sayAge(); // 27
```

组合继承避免了原型链和借用构造函数的缺陷,融合了他们的优点,成为 Javascript 中最常用的继承模式,而且可以用`instanceof`和`isPrototypeOf()`也能够用于识别基于组合继承创建的对象.

###### 原型式继承

思想是借助原型基于已有的对象创建新对象.

```javascript
// 用如下函数来实现
function object(o) {
  function F() {}
  F.prototype = o;
  return new F();
}
// 这种原型式继承,要求你必须有一个对象可以作为另一个对象的基础.
var person = {
  name: "Nicholas",
  friends: ["Shelby", "Court", "Van"],
};

var anotherPerson = object(person);
anotherPerson.name = "Greg";
anotherPerson.friends.push("Rob");

var yetAnotherPerson = object(person);
yetAnotherPerson.name = "Linda";
yetAnotherPerson.friends.push("Barbie");

person.friends; // Shelby,Court,Van,Rob,Barbie
anotherPerson.friends; // Shelby,Court,Van,Rob,Barbie
```

ECMAScript 5 新增的`Object.create()`方法规范化了原型式继承,该方法类似于上面的`object()`方法.

```Javascript
var person = {
  name: 'Nicholas',
  friends: ["Shelby","Court","Van"]
};

var anotherPerson = Object.create(person);
anotherPerson.name = 'Greg';
anotherPerson.friends.push('Rob');

var yetAnotherPerson = Object.create(person);
yetAnotherPerson.name = 'Linda';
yetAnotherPerson.friends.push('Barbie');

person.friends; // Shelby,Court,Van,Rob,Barbie
anotherPerson.friends; // Shelby,Court,Van,Rob,Barbie
```

在没有必要兴师动众地创建构造函数,而只想让一个对象与另一个对象保持类似的情况下,原型式继承式完全胜任的.不过在包含引用类型的属性时始终会共享相同的值.

###### 寄生式继承

寄生式继承是与原型式继承紧密相关的一种思路,其思路与寄生构造函数和工厂模式类似,即创建一个仅用于封装继承过程的函数,该函数在内部以某种方式增强对象,最后再像真正地是他做了所有工作一样返回对象.

```javascript
function createAnother(original) {
  var clone = object(original);
  clone.sayHi = function () {
    alert("Hi");
  };
  return clone;
}
```

由于该模式降低了函数的复用导致效率低下为其最大弊端.

###### 寄生组合式继承

由于组合继承无论在什么情况下,都会调用两次超类构造函数,所有有人提出来寄生组合式继承来解决这一个问题.  
所谓寄生组合继承,即通过借用构造函数来继承属性,通过原型链的混成形式来继承方法.其背后的思路是:不必为了指定类型的原型而调用超类型的构造函数,我们所需要的无非就是超类型原型的一个副本而已.

```javascript
function inheritPrototype(SubType, SuperType) {
  var prototype = SuperType.prototype;
  prototype.constructor = SubType;
  SubType.prototype = prototype;
}

// 例子
function SuperType(name) {
  this.name = name;
  this.colors = ["red", "blue", "green"];
}

SuperType.prototype.sayName = function () {
  alert(this.name);
};

function SubType(name, age) {
  SuperType.call(this, name);
  this.age = age;
}

inheritPrototype(SubType, SuperType);

SubType.prototype.sayAge = function () {
  alert(this.age);
};

var sub = new SubType("Nicholas", 29);
sub.sayName(); // Nicholas
sub.sayAge(); // 29
sub.colors.push("black");
sub.colors; // red,blue,green,black
```

开发人员普遍认为寄生组合式继承式引用类型最理想的继承范式.YUI 就是使用寄生组合继承.

#### 第六章总结

ECMAScript 支持面向对象(OO)编程,但不使用类或者接口,对象在代码执行过程中创建和增强,因此具有动态性而非严格定义的实体.在没有类的情况下,可以采用下列模式来创建对象.

- 工厂模式,使用简单的函数创建对象,为对象添加属性和方法,然后返回对象.这个模式后来被构造函数模式替代.
- 构造函数模式,可以创建自定义引用类型,可以像创建内置对象实例一样使用 new 操作符.该模式的缺点是它的每个成员都无法得到复用,包括函数.由于函数可以不局限于任何对象(与对象是松散耦合),因此没有理由不在多个对象间共享函数.
- 原型模式,使用构造函数的 prototype 属性来指定那些应该共享的属性和方法.组合使用构造函数模式和原型模式时,使用构造函数定义实例属性,而使用原型定义共享的属性和方法.

JavaScript 主要使用原型链实现继承,原型链的构建是通过一个类的实例赋值给另一个构造函数的原型来实现的.这样,子类型就能够访问超类型中所有属性和方法,这一点与基于类的继承很相似.原型链的问题是对象实例共享所有继承的属性和方法,因此不宜单独使用.解决这个问题的技术是使用借用构造函数,即在子类构造函数的内部调用超类构造函数,这样就可以做到每个实例都具有自己的属性,同时还支持只使用构造函数模式来定义类型.使用最多的继承模式是组合继承,这种模式使用原型链继承共享的属性和方法,而通过借用构造函数继承实例属性.此外,还有以下几种继承模式:

- 原型式继承,可以在不必预先定义构造函数的情况下实现继承,其本质是执行对给定对象的浅复制.而复制的副本还可以进一步改造.
- 寄生式继承,与原型式继承非常相似,也是基于某些对象或者信息创建一个对象,然后增强对象,最后在返回对象.为了解决组合继承模式多次调用超类构造函数而导致的低效率问题,可以将这个模式与组合继承一起使用.
- 寄生组合式继承,集寄生式继承和组合式继承的优点与一身,是实现基于类继承的最有效方式.

## 第七章 函数表达式

定义函数的两种方式:

- 函数申明,该种申明的一个特征是函数申明提升(function declartion hoisting),用这种方法定义的函数在执行代码之前会读取函数申明,意味着可以吧函数申明放在调用它代码的后面
- 函数表达式,创建一个匿名函数并将其赋值给一个变量

```javascript
// 函数申明
function sayHi() {
  alert("hi");
}
// 函数表达式
var sayHi = function () {
  alert("hi");
};
```

#### 递归

递归函数是在一个函数通过名字调用自身的情况下构成的.

```javascript
function factorial(num) {
  if (num <= 1) {
    return 1;
  } else {
    return num * factorial(num - 1);
  }
}
```

#### 闭包

闭包是指有权访问另一个函数作用域中变量的函数.创建闭包的常见方式,就是在一个函数内部创建另一个函数.

```javascript
//
//
function createComparisonFunction(propertyName) {
  return function (object1, object2) {
    var value1 = ojbect1[propertyName]; // 内部函数访问了外部函数的propertyName变量
    var value2 = object2[propertyName]; // 同理
    if (value1 < value2) {
      return -1;
    } else if (value1 > value2) {
      return 1;
    } else {
      return 0;
    }
  };
}
```

闭包只能取得包含函数中任何变量的最后一个值.  
在闭包中使用 this 对象可能会导致一些问题,this 对象在运行时基于函数的执行环境绑定的,在全局函数中,this 等于 window,而当函数被作为某个对象的方法调用时,this 等于哪个对象.而匿名函数的执行环境具有全局性,因此 this 对象指向 window.不过在编写闭包方式不同,这一点可能并不明显.通常用一个变量来暂存 this 对象.

#### 模仿块级作用域

这种技术经常用在全局作用域中被用在函数外部,从而限制向全局作用域中添加过多的变量和函数.一般来说我们都应该尽量少向全局作用域中添加变量和函数.
用作块级作用域(私有作用域)的匿名函数语法

```javascript
(function () {
  // 这里是块级作用域
})();
```

#### 私有变量

javascript 中没有私有成员的概念,所有对象的属性都是共有的,不过,倒是有一个私有变量的概念,任何在函数中定义的变量,都可以认为是私有变量,因为在函数的外部不能访问函数内部的变量.私有变量包括函数的参数,局部变量和在函数内部定义的其他函数.  
我们把有权访问私有变量和私有函数的公有方法称为特权方法(privileged method).

```javascript
// 在构造函数中
function MyObject() {
  var privateVariable = 10;
  function privateFunction() {
    return false;
  }
  // 特权方法
  this.publicMethod = function () {
    privateVariable++;
    return privateFunction();
  };
}
```

###### 静态私有变量

通过在私有作用域中定义私有变量和函数,同样也可以创建特权方法.

```javascript
(function () {
  // 私有变量和私有函数
  var privateVariable = 10;
  function privateFunction() {
    return false;
  }
  // 构造函数
  MyObject = function () {};
  // 公有特权方法
  MyObject.prototype.publicMethod = function () {
    privateVariable++;
    return privateFunction();
  };
})();
```

###### 模块模式

单例(singleton),指的就是只有一个实例的对象.javascript 是以对象字面量的方式来创建单例对象的.

```javascript
var singleton = {
  name: value,
  method: function () {
    // ...
  },
};
```

模块模式通过为单例添加私有变量和特权方法能够使其得到增强.

```javascript
var singleton = (function () {
  // 私有变量和私有函数
  var privateVariable = 10;
  function privateFunction() {
    return false;
  }
  // 特权方法和属性
  return {
    publicProperty: true,
    publicMethod: function () {
      privateVariable++;
      return privateFunction();
    },
  };
})();
```

###### 增强的模块模式

这种增强模式适合那些单例必须是某种类型的实例.同时还必须添加某些属性和方法对其加以增强的情况.

```javascript
var singleton = (function () {
  // 私有变量和私有属性
  var privateVariable = 10;
  function privateFunction() {
    return false;
  }
  // 创建对象
  var object = new CustomType();
  object.publicProperty = true;
  object.publicMethod = function () {
    privateVariable++;
    return privateFunction();
  };
  return object;
})();
```

#### 第七章 总结

javascript 编程中,函数表达式是一种非常有用的技术,使用函数表达式可以无需对函数命名,从而实现动态编程.匿名函数,也称为拉姆达函数,另一种使用 javascript 函数的强大方式.函数表达式的特定有:

- 函数表达式不同于函数声明.函数声明需要有名字,函数表达式不需要.没有名字的函数表达式也叫做匿名函数.
- 在无法确定如何引用函数的情况下,递归函数就会变得比较复杂.
- 递归函数应该使用 arguments.callee 来递归调用自身,不要使用函数名,因为函数名可能会发生变化.

当在函数内部定义了其他函数,就创建了闭包.闭包有权访问包含函数内部的所有变量

- 在后台执行环境中,闭包的作用域链包含着它自己的作用域,包含函数的作用域和全局作用域.
- 通常,函数的作用域及其所有变量在函数执行结束后全部销毁.
- 但是,当函数返回一个闭包时,这个函数的作用域将会一直在内从中保存到闭包不存在为止.

使用闭包可以在 javascript 模拟块级作用域

- 创建并立即调用一个函数,这样既可以执行其中的代码,又不会在内存中留下该函数的引用.
- 结果就是函数内部的所有变量都会被立即销毁,除非将某些变量赋值给了包含作用域(即外部作用域)中的变量.

闭包还可以用于在对象中创建私有变量

- 即使 javascript 中没有正式的私有对象属性的概念.但可以使用闭包来实现公有方法,而通过公有方法可以访问包含作用域中的变量和方法.
- 有权访问私有变量的公有方法称为特权方法
- 可以使用构造函数模式,原型模式来实现自定义类型的特权方法,也可以使用模块模式,增强的模块模式来实现单例的特权方法.

javascript 中函数表达式和闭包都是极其有用的特性,利用它们可以实现很多功能.不过,因为创建闭包必须维护额外的作用域,所有过度的使用它们可能会占用大量内存.

## 第八章 BOM

#### window 对象

BOM 的核心是 window 对象,它表示浏览器的一个实例.在浏览器中,window 对象具有双重角色,它既是通过 javascript 访问浏览器窗口的一个接口,又是 ECMAScript 规定的 Global 对象.

在全局作用域中声明的变量,函数都会成为 window 对象的属性和方法.

如果页面中包含框架,则每个框架都拥有自己的 window 对象,并且保存在 frame 集合中.一个框架的 top 对象始终指向最外层的框架,也就是浏览器窗口.parent 对象始终指向当前框架的直接上层框架.self 对象,它始终指向 window.

###### 窗口位置

各种浏览器中探测窗口位置的 API 和计算方法不一致,通常的有`window.screenX,window.screenY,window.screenLeft,window.screenTop`来获取,可以使用`window.moveTo(),window.moveBy()`来移动窗口,不过这两个方法有可能被浏览器禁用

###### 窗口大小

通过`innerWidth,innerHeight,outerWidth,outerHeight`可以确定窗口大小,不过在计算中因各种浏览器计算方法不同有差异.同样可以用`window.resizeTo(),window.resieBy()`来调整窗口大小,不过这两个方法有可能被浏览器禁用.

###### 导航和打开窗口

```javascript
// 该方法既可以导航到一个特定的URL,也可以打开一个新的浏览器窗口.
// 第一个参数为为加载URL
// 第二个参数 窗口目标
// 第三个参数 特性字符串,例如指定宽高,是否显示工具栏等
// 第四个参数 新页面是否取代浏览器历史记录中当前加载页面的布尔值

// 如果浏览器内置的屏蔽程序阻止了弹出窗口,那么 window.open() 就会返回null,通过这个就可以检测弹出窗口是否被屏蔽
window.open("https://github.com", "_blank", "width=300,height=300");
```

###### 间歇调用和超时调用

超时调用指的是在指定的时间后执行代码,间歇调动指的是在每隔一段时间就执行一次代码.

```javascript
// 超时调用
// 5秒之后在执行
var timeoutId = setTimeout(function () {
  console.log("opps...");
}, 5000);

// 在超时调用未开始之前可以取消超时调用
clearTimeout(timeoutId);

// 间歇调用
var interval = setInterval(function () {
  console.log("hello");
}, 1000);

clearInterval(interval);
```

###### 系统对话框

- alert()
- confirm()
- prompt()
- print()

#### location 对象

location 对象是最有用的 BOM 对象之一,提供了与当前窗口中加载的文档有关的信息,还提供了一些导航功能.

- hash
- host
- hostname
- href
- port
- protocel
- search
- pathname
- ...

#### navigator 对象

navagator 提供了与浏览器有关的信息.

- appName
- appVersion
- language
- onLine
- plateform
- userAgent
- ...

#### screen 对象

在编程中用处不大,保存着与客户端显示器相关的信息.

#### history 对象

history 对象保存着用户上网的历史记录.其中有几个有用的方法.

```javascript
// 后退一页
history.go(-1);
// 前进一页
history.go(1);
// 前进两页
history.go(2);

// or
history.back();
history.forward();
```

#### 第八章 总结

浏览器对象模型 BOM 以 window 对象为依托,表示浏览器窗口以及页面可见区域.同时,window 对象还是 ECMAScript 中的 Global 对象,因此所有全局变量和函数都是它的属性和方法,且所有原生的构造函数及其他函数也都存在于它的命名空间下.

- 使用框架,每个框架都有自己的 window 对象以及所有原生构造函数及其他函数的副本.每个框架都保存在 frames 集合中,可以通过位置或者名称来访问.
- 有一些窗口指针,可以用来引用其他框架,包括父框架.
- top 对象始终指向最外层的框架,也就是整个浏览器窗口
- parent 始终指向当前框架的直接上层框架
- self 对象指向 window
- location 对象可以通过编程方式来访问浏览器导航系统.
- 调用 replace()方法可以导航到一个新 URL,同时该 URL 会替换浏览器历史记录中当前显示的页面.
- navigator 对象提供了与浏览器有关的信息,到底提供了那些信息,很大程度上取决于用户的浏览器,不过,也有一些公认的属性,如 userAgent
- screen 对象保存着与客户端显示器相关的信息,这些信息一般用于站点分析
- history 对象为访问浏览器历史记录开了一个小缝隙,开发人员可以据此判断历史记录数量,也可以在历史记录中向前向后导航到任意页面.

## 第九章 客户端检测

#### 总结

客户端检测是 javascript 开发中最具有争议的一个话题,由于浏览器间存在差异,通常需要根据不同的浏览器的能力分别编写不同的代码.有不少客户端检测方法,但下列是最常用的.

- 能力检测:在编写代码之前检测特定浏览器的能力. 例如, 脚本在调试某个函数之前,可能先要检测该函数是否存在.这种检测方法将开发人员从考虑具体的浏览器类型和版本中解放出来,让他们把注意力集中到相应的能力是否存在上.能力检测无法精确地检测特定浏览器和版本.
- 怪癖检测:怪癖实际上是浏览器实现中存在的 bug,例如早期的 webkit 中就存在一个怪癖,即它会在 for-in 循环中返回隐藏的属性.怪癖检测通常涉及到运行一小段代码,然后确定浏览器是否存在某个怪癖.由于怪癖检测与能力检测相比较效率更低,因此应该只在某个怪癖会干扰脚本运行的情况下使用.怪癖检测无法精确地检测特定浏览器和版本.
- 用户代理检测: 通过检测用户代理字符串来识别浏览器.用户代理字符串包含大量与浏览器有关的信息,包括浏览器,平台,操作系统以及浏览器版本.用户代理字符串有过相当长的发展历史,在此期间,浏览器提供商试图通过在用户代理字符串中添加一些欺骗信息,欺骗网站相信自己的浏览器是另一种浏览器.用户代理检测需要特殊技巧,特别要注意 Opera 会隐藏其用户代理字符串的情况.即便如此,通过用户代理字符串任然能够检测出浏览器所用的呈现引擎以及所在的平台,包括移动设备和游戏系统.

在决定使用哪种客户端检测方法时,一般应优先考虑使用能力检测.怪癖检测是确定应该如何处理代码的第二选择.而用户代理检测则是客户端检测的最后一种方案,因为这种方法对用户代理字符串具有很强的依耐性.

## 第十章 DOM

DOM 是语言中立的 API,用于访问和操作 HTML 和 XML 文档.DOM1 级将 HTML 和 XML 文档形象的看做一个层次化的节点树,可以使用 javascript 来操作节点树,进而改变底层文档的外观和结构.  
DOM 由各种节点构成,简要总结如下:

- 最基本的节点是 Node,用于抽象表示文档中一个独立的部分,所有其他类型都继承自 Node
  - 其中 nodeName 和 NodeValue 保存着该节点的信息
  - 每个节点都有一个 childNodes 属性,保存着 NodeList 对象,NodeList 对象是一种类数组对象,具有动态性.可以用数组或者 item()的方法来访问子节点.
  - 每个节点都有一个 parentNode 属性,该属性指向文档树中的父节点.
  - 可以使用列表中每个节点的 previousSibing 和 nextSibing 属性来访问同胞节点.列表中的第一个节点的 previousSibing 属性值为 null,最后一个节点的 nextSibing 属性的值为 null,据此可以判断列表中的第一个节点和最后一个节点
  - 父节点的 firstChild 和 lastChild 的值始终等于 someNode.childNodes[0],和 someNode.childNodes[someNode.childNodes.length-1]
  - 操作节点,appendChild()用来向列表末尾添加一个节点,如果传入的值为文档的一部分,那结果就是将该节点从原来位置移动到新位置.
  - insertBefore(),接收两个参数,要插入的节点和作为参考的节点
  - replaceChild(),接收两个参数,要插入的节点和要替换的节点.
  - removeChild(),移除节点
  - cloneNode(),克隆节点,参数为 true 为深复制,参数为 false 为浅复制.
- Document 表示整个文档,是一组分层节点的根几点.在 javascript 中,document 对象是 Document 的一个实例,使用 document 对象,有多种方法可以查询和取得节点.
  - document.body
  - document.doctype
  - document.title
  - document.URL
  - document.referrer
  - document.domain
  - document.getElementById()
  - document.getElementsByTagName()
  - document.getElementsByName()
  - document.images
  - document.links
  - document.forms
  - document.write()
  - document.writeLn()
- Element 节点表示文档中的所有 HTML 或 XML 元素,可以用来操作这些元素的内容和特性.
  - nodeName 为元素的标签名,nodeValue 为 null
  - HTML 元素由 HTMLELement 类型表示,继承自 ELement,并添加了一些属性
    - id
    - title
    - dir
    - className
  - 获取特性,用 getAttribute(),setAttribute()和 removeAttribute(),也可以直接访问属性名,例如`someElement.title`
  - 创建,使用 document.createELement()
- 另外还有一些节点类型,分别表示文本内容,注释,文档类型,CDATA 区域和文档片段.
  - Text 类型
    - 创建 document.createTextNode()
    - 规范化使用 normalize()
  - Comment 类型
  - CDATASectionl 类型
  - DocumentType 类型
  - DocumentFragment 类型
  - Attr 类型

访问 DOM 的操作在多数情况下都是很直观,不过在处理<script>和<style>元素时还是存在一些复杂性.由于这两个元素分别包含脚本和样式信息,因此浏览器通常会将他们与其他元素区别对待.这些区别导致了在针对这些元素使用 innerHTML 时,以及在创建新元素时的一些问题.

###### 动态脚本

```javascript
// 用函数封装下,载入外部脚本
function loadScript(url) {
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = url;
  document.body.appendChild(script);
}

// 行内方式
var script = document.createElement("script");
script.type = "text/javascript";
script.appendChild(document.createTextNode("function sayHi(){alert('hi');}"));
document.body.appendChild(script);
```

###### 动态样式

```javascript
// 函数封装,使用外部样式
function loadStyles(url) {
  var link = document.createElement("link");
  link.rel = "stylesheet";
  link.type = "text/css";
  link.href = url;
  var head = document.getElementsByTagName("head")[0];
  head.appendChild(link);
}

// 行内方式
var style = document.createElement("style");
style.type = "text/css";
style.appendChild(document.createTextNode("body{background-color:red}"));
var head = document.getElementsByTagName("head")[0];
head.appendChild(style);
```

理解 DOM 的关键,就是理解 DOM 对性能的影响. DOM 操作往往是 javascript 程序中开销最大的部分,而因访问 NodeList 导致的问题最多.NodeList 对象都是动态的,这就意味着每次访问 NodeList 对象,都会运行一次查询.有鉴于此,最好的办法就是尽量减少 DOM 操作.

## 第十一章 DOM 扩展

虽然 DOM 为 XML 及 HTML 文档交互制定了一系列核心 API,但仍然有几个规范对标准的 DOM 进行了扩展.这些扩展中有很多原来是浏览器专有的,但后来成为事实上的标准,于是其他浏览器也都提供了相同的实现.

- Selectors API 定义了两个方法,让开发人员能够基于 CSS 选择符从 DOM 中提取元素,这两个方法分别是`querySelector()`和`querySelectorAll()`
- Element Traversal,为 DOM 元素定义了额外的属性.让开发人员很方便地从一个元素跳转到另一个元素.之所以会出现这个扩展,是因为浏览器处理 DOM 元素间空白符的方式不一样.
  - childElementCount,返回子元素(不包括文本节点和注释)的个数.
  - firstElementChild,指向第一个元素,firstChild 的元素版
  - lastElementChild,指向最后一个元素,lastChild 的元素版
  - previousElementSibling,指向前一个同辈元素,previousSibling 的元素版
  - nextElementSibing,指向后一个同辈元素,nextSibling 的元素版
- HTML5,为标准的 DOM 定义了很多扩展功能.其中包括 innerHTML 属性这样的事实标准基础上提供的标准定义,以及为管理焦点,设置字符集,滚动页面而规定的扩展 API.
  - getElementsByClassName(),接受一个或者类名的字符串,返回带有指定类的所有元素的 NodeList
  - classList,元素类的一个列表集合
    - add(value) 将给定的字符串添加到列表中,如果存在就不添加了
    - contains(value) 列表中是否存在给定的值,存在返回 true,否则返回 false
    - remove(value) 从列表中删除给定的字符串
    - toggle(value) 如果列表中存在就删除,否则就添加.
  - 焦点管理
  - HTMLDOcument 的变化
    - document.readyState
      - loading, 正在加载文档
      - complete,已经加载完文档
    - document.compatMode
      - CSS1Compat 标准模式
      - BackCompat 混杂模式
    - head 属性
      - document.head
    - 字符集属性
      - document.charset
    - 自定义数据属性
      - 通过元素的 dataset 属性来访问自定义属性
    - 插入标记
      - innerHTML 属性
      - outerHTML 属性
    - scrollIntoView() 通过滚动浏览器窗口或者某个容器元素,调用元素就出现在视口中

## 第十二章 DOM2 和 DOM3

该节涉及到 XML,XHTML,暂时搁置,以后有需求了在阅读

## 第十三章 事件

事件是将 javascript 与网页联系在一起的主要方式,DOM3 级事件规范和 HTML5 定义了常见的大多数事件.即使有规范定义了基本事件,但很多浏览器仍然在规范之外实现了自己的专有事件,从而为开发人员提供了更多掌握用户交互的手段.有些专有事件与特定设备关联,例如移动 safari 中的 orientationchange 事件就是特定关联 IOS 设备的.

#### 事件流

- 事件冒泡(event bubbling)
- 事件捕获(event capturing)

DOM2 级事件规定事件流包括三个阶段,事件捕获阶段,处于目标阶段和事件冒泡阶段.首先发生的是事件捕获,为截获事件提供了机会,然后是实际目标接收到事件,最后一个阶段是冒泡阶段,可以在这个阶段对事件作出响应.

#### 事件处理程序

- HTML 事件处理程序,通过在 HTML 代码内直接写事件处理程序,现在不建议使用
- DOM0 级事件处理程序,将一个函数赋值给一个事件处理程序,现在也广为使用
- DOM2 级事件处理程序,定义了`addEventListener()`和`removeEventListener()`用来处理指定和删除事件处理程序

#### 事件类型

- UI(user interface)事件,当用户与页面上的元素交互时触发
  - load,当页面完全加载后在 window 上触发
  - unload,当页面卸载后在 window 对象上触发
  - abord
  - error,当发生 javascript 错误在 window 上触发,无法加载图像时在`<img>`元素上触发
  - select,当用户选择文本框`<input>`或者`<textarea>`中的一个或者多个字符时触发
  - resize,当窗口或者框架的大小变化时在 window 或者框架上面触发
  - scroll,当用户滚动带滚动条的元素中内容时,在该元素上触发
- 焦点事件,当元素获得或者失去焦点时触发
- 鼠标事件,当用户通过鼠标在页面上执行操作的时候触发
  - click,在用户单机主鼠标按键(左键)或者按回车键时触发
  - dbclick,在用户双击主鼠标按键(左键)
  - mousedown,在用户按下了任意鼠标按键时触发
  - mouseenter,在鼠标光标从元素外部首次移动到元素范围之内时触发
  - mouseleave,在位于元素上方的鼠标光标移动到元素范围之外时触发
  - mousemove,当鼠标指针在元素内部移动时重复触发
  - mouseout,在鼠标指针位于一个元素上方,然后用户将其移入另一个元素时触发
  - mouseover
  - mouseup,在用户释放鼠标按键时触发.
- 滚轮事件,当使用鼠标滚轮时触发
- 文本事件,当在文档中输入文本时触发
  - textinput,是对 keypress 的补充,用意是在将文本显示给用户之前更容易拦截文本.
- 键盘事件,当用户通过键盘在页面上执行 操作时触发
  - keydown,当用户按下键盘上的任意键时触发,如果按住不放的话,会重复触发此事件
  - keypress,当用户按下键盘上的字符键时触发,而且如果按住不放的话,会重复触发此事件
  - keyup,当用户释放键盘上的键触发.
- 合成事件,当为 IME(Input Method Editor,输入法编辑器)输入字符时触发
- 变动(mutation)事件,当底层 DOM 结构发生变化时触发
- HTML5 事件
  - contentmenu 事件,通过单击鼠标右键可以掉出上下文菜单
  - beforeunload 事件
  - DOMContentLoaded 事件,形成完整的 DOM 树时触发
  - readystatechange 事件
  - pageshow 和 pagehide 事件
  - hashchange 事件
- 设备事件
- 触摸与手势事件

#### 内存和性能

使用事件时,需要考虑如下一些内存与性能方面的问题.

- 有必要限制一个页面中事件处理程序的数量,数量太多会导致占用大量内存,而且也会让用户感觉页面反应不够灵敏
- 建立在事件冒泡机制之上的事件委托技术,可以有效地减少事件处理程序的数量.
- 建议在浏览器卸载页面之前移除页面中的所有事件处理程序.

#### 模拟事件

可以使用 javascript 在浏览器中模拟事件,DOM2 级事件和 DOM3 级事件规范定义了模拟事件的方法,为模拟各种有定义的事件提供了方便.此外通过使用一些技术,还可以在某种程度上模拟键盘事件.

事件是 javascript 中最重要的主题之一,深入理解事件的工作机制以及它们对性能的影响至关重要.
