# Professional javascript for web developers 3rd Edition

## 第一章

javascript 组成的三个部分:

- ECMAScript ,由 ECMA-262 定义的一个标准,目前各大浏览器都已经完整支持第五版,改标准最新的版本为 ES6=ECMAScript2015
- DOM,文档对象模型,提供访问和操作网页内容的方法和接口
- BOM,提供与浏览器交互的方法和接口

## 第二章

在 HTML 中引入 Script 标签的位置:  
全部放入 head 标签的缺点:

- 必须要等到所有的 JavaScript 代码下载,解析,执行之后,在能呈现页面的内容(浏览器遇到`<body>`标签时才呈现页面内容)
- 对于那些需要很多 JavaScript 代码的页面来说会导致浏览器在呈现页面时出现明显的延迟,而延迟期间浏览器的窗口将是一片空白

现代 WEB 应用的做法:

- 把全部的 JavaScript 文件应用放在 body 标签结束之前
- 在解析 JavaScript 代码之前,页面的内容将完全呈现在浏览器中
- 用户因为浏览器窗口显示空白页面的时间缩短而感到打开页面的速度加快了

#### 延迟脚本

```JavaScript
<script defer src="example.js"></script>
```

script 标签的 defer 表示脚本可以延迟到文档完全被解析和显示之后执行,只对外部脚本有效.

#### 异步脚本

```JavaScript
<script async src="example.js"></script>
```

指定 async 属性的目的是不让页面等待脚本下载和执行,从而异步加载页面其他内容,只对外部脚本有效.

#### 内嵌代码与外部文件

并不存在硬性的规定必须使用外部文件,但是支持使用外部文件的人多会强调如优点:

- 可维护性,可集中管理 JavaScript 代码
- 可缓存,浏览器能够根据具体的设置缓存链接的所有外部 JavaScript 文件
- 适应未来

#### 文档模式

html5,的文档模式为

```
<!DOCTYPE html>
```

#### `<noscript>`元素

用于在不支持 JavaScript 的浏览器中显示替代的内容,在如下情况下才会显示出 noscript 元素内的内容:

- 浏览器不支持脚本
- 浏览器支持脚本,但脚本被禁用

```html
<noscript>
  <p>本页面需要浏览器支持JavaScript.</p>
</noscript>
```

## 第三章

任何语言的核心都必然会描述这门语言最基本的工作原理.ECMA-262 通过叫做 ECMAScript 的伪语言为我们描述 JavaScript 的基本概念.

#### 语法

严格模式(strict mode),严格模式是为 JavaScript 定义了一种不同的解释与执行模型,在严格模式下,ECMAScript3 中一些不确定的行为将得到处理,而且对某些不安全的操作会抛出错误.可以在脚本顶部或者函数内部的上方添加`"strict mode";`

```JavaScript
"strict mode";

// or
function(){
  "strict mode";
  // 函数体
}
```

#### 变量

ECMAScript 的变量是松散类型的,是可以用来保存任何类型的数据.使用`var`操作符定义的变量将成为定义该变量作用域中的局部变量.省略`var`会导致创建全局变量,我们不建议通过省略`var`来定义全局变量,因为在局部作用域中定义的全局变量很难维护.

#### 数据类型

typeof 操作符用来检测给定变量的数据类型,返回值有:

- undefined 未定义
- boolean 布尔值
- string 字符串
- number 数值
- object 数值是对象或 null
- function 函数

undefined 类型,值只有一个就是 undefined,使用 var 声明变量但是未初始化,该变量就为 undefined,同样未申明的变量用 typeof 检测也会返回 undefined,所有我们在定义一个变量的时候一定要初始化,这是一个明智的选择,可以避免很多问题.

null 类型是第二个只有一个值的数据类型,这个特殊的值就是 null.null 值表示一个空对象指针.null == undefined ,会返回 true.

Boolean 类型只有两个字面值:true 和 false,任何类型的值都可以转换为 Boolean 值,空字符串,0,NaN,null,undefined 被转换为 false,其余的都被转换为 true.

Number 类型

- 浮点数,其保存值所需要的内存空间是整数的两倍,可用 e 表示法,浮点数值计算会产生舍入误差,所以永远不要测试某个特定的浮点数值.
- 数值范围,由于内存限制,不可能保存世界上所有数值,ECMAScript 能够表示的最小和最大数值保存在`Number.MIN_VALUE`和`Number.MAX_VALUE`中,超出该范围的值会被自动转换为特殊的 Infinity,正无穷(Infinity),负无穷(-Infinity).
- NaN(Not a Number),这个数值用于表示一个本来要返回数值的操作未返回数值的情况,比如`1/0`会返回 NaN,任何与 NaN 涉及的操作都会返回 NaN,NaN 与任何值不相等,包括自身.`isNaN()`函数用来判断 NaN.
- 数值转换
  - Number()函数,转换的规则比较复杂
  - parseInt()函数,转换为整数
  - parseFloat(),转换为浮点数
- String 类型,用于表示由零个或多个 Unicode 字符组成的字符序列,即字符串.
  - 转义字符
    - `\n` 换行
    - `\t` 制表
    - `\b` 空格
    - `\r` 回车
    - `\f` 进纸
    - `\\` 斜杠
    - `\'` 单引号
    - `\"` 双引号
    - `\xnn` 以十六进制代码 nn 表示的一个字符
    - `\unnnn` 以十六进制代码 nnnn 表示的一个 Unicode 字符
  - 转换为字符串,使用`toString()`方法,用 String()也可以
- Object 类型,对象是一组数据和功能的集合,Object 的每个实例都具有下列属性和方法
  - Constructor, 保存着用于创建当前对象的函数
  - hasOwnProperty(propertyName),用于检测给定的属性在当前对象实例中是否存在.
  - isPrototypeOf(Object),用于检查传入的对象是否是另一个对象的原型
  - propertyIsEnumerable(propertyName),用于检查给定的属性是否能够使用 for-in 语句来枚举.
  - toLocalString(),返回对象的字符串表示,该字符串与执行环境的地区对应.
  - toString(),返回对象的字符串表示
  - valueOf(),返回对象的字符串,数值或布尔值表示

#### 操作符

包括算是操作符,位操作符,关系操作符,相等操作符

- 一元操作符
  - 递增递减操作符
  - 一元加减操作符
- 位操作符
  - 位非(NOT),操作符为`~`,结果为操作数的负值减 1
  - 位与(AND), 操作符为`&`
  - 位或(OR),操作符为`|`
  - 异或(XOR),操作符为`^`
  - 左移,操作符`<<`,空缺位置用 0 填充,
  - 有符号右移,操作符`>>`,空缺的位用符号位来填充
  - 无符号右移,操作符`>>>`
- 布尔操作符
  - 逻辑非`!`
  - 逻辑与`&&`,短路操作符
  - 逻辑或`||`,短路操作符
- 乘性操作符
  - 乘法`*`
  - 除法`/`
  - 求模`%`
- 加性操作符
  - 加法`+`,如果两个操作数中有一个是字符串,则会将两个字符串拼接
  - 减法`-`
- 关系操作符,小于`<`,大于`>`,小于等于`<=`,大于等于`>=`.在比较之前会如果类型不同会进行转换.
- 相等操作符
  - 相等和不相等,`==`,`!=`,其中`null == undefined`,比较的时候回进行转换
  - 全等和不全等,`===`,`!==`,直接比较不进行转换
- 条件操作符 condition ? true_value : false_value;
- 赋值操作符`=`
  - 复合赋值操作符
    - `*=`
    - `/=`
    - `%=`
    - `+=`
    - `-=`
    - `<<=`
    - `>>=`
    - `>>>=`
- 逗号操作符,`var num=1,num=2,num=3;`用于声明多个变量,也可以赋值.

#### 语句

if 语句

```javascript
var i = 30;
if (i > 25) {
  //do some
} else if (i > 30) {
  // do other
} else {
  // do else
}
```

do-while 语句

```javascript
var i = 30;
do {
  //some
} while (i < 30);
```

while 语句

```javascript
var i = 30;
while (i < 30) {
  // do some
}
```

for 语句

```javascript
for (var i = 0; i < 5; i++) {
  //do some
}
```

for-in 语句,是一种精准的迭代语句,可用来枚举对象的属性.

```javascript
var arr = [1, 2, 3, 4];
for (var item in arr) {
  console.log(item);
}
```

label 语句,一般都是配合 for 等循环语句使用.

```javascript
start: for (var i = 0; i < count; i++) {
  // some
}
```

break 和 continue 语句

```javascript
// break 语句会立刻退出循环,强制继续执行循环后面的语句
for (var i = 1; i < 10; i++) {
  if (i == 3) {
    break;
  }
  console.log(i);
}
// 0 1 2 4 5

// continue 语句会退出当前循环,继续执行下次循环
for (var i = 1; i < 10; i++) {
  if (i == 3) {
    continue;
  }
  console.log(i);
}
// 0 1 2
```

with 语句,其作用是将代码的作用域设置到一个特定的对象中. 严格模式下不允许使用 with 语句.所以这里在不做介绍.

switch 语句,用来简化多重 if else 语句来设计的,如果省略 break 关键字,就会导致执行完当前 case,继续执行下一个 case.

```javascript
var num = 2;
switch (num) {
  case 1:
    console.log(num);
    break;
  case 2:
    console.log(num);
    break;
  case 3:
    console.log(num);
    break;
  case 4:
    console.log(num);
    break;
  default:
    console.log(num);
}
```

#### 函数

函数就是一组相关代码的集合,主要用来复用代码. ECMAScript 中函数参数保存在`arguments`对象中,访问参数可通过 arguments[i] ,ECMAScript 中函数没有重载的概念.  
与其他语言函数的区别:

- 无需指定函数的返回值,任何 ECMAScript 函数都可以在任何时候返回任何值
- 实际上,未指定任何返回值的函数返回的是`undefined`
- ECMAScript 没有函数签名的概念,因为函数参数是一个包含零个或多个值的数组形式
- 可以向 ECMAScript 函数传递任意数量的参数,并通过 arguments 对象来访问这些参数.
- 由于不存在函数签名的特性,ECMAScript 函数不能重载.

```javascript
function sum() {
  return arguments;
}
```

## 第四章

#### 基本类型和引用类型的值

基本类型值指的是简单的数据段,而引用类型值指那些可能由多个值构成的对象.

- 动态属性,对于引用类型值,我们可以为其添加属性和方法,但是对基本类型值是不能添加属性和方法的.
- 复制变量,基本类型值在复制的时候复制值跟原值之间相互独立互不干扰,引用类型值在复制的时候他们同时指向一个对象,修该一个会影响另一个.
- 传递参数,基本类型值传递如同基本类型变量复制一样,而引用类型值的传递则如同引用类型变量的复制一样.
- 检测类型,检测基本类型数据用`typeof`,检测引用类型用`instanceof`

#### 执行环境及作用域

执行环境(execution content),执行环境定义了变量或函数有权访问的其他数据.每一个执行环境都有一个与之关联的变量对象,环境中定义的所有变量和函数都保存在这个对象中.全局执行环境是最外围的一个执行环境,根据 ECMAScript 实现的宿主不同,表示执行环境的对象也不同,在 Web 浏览器中,全区执行环境被认为是`window`对象,因此所有全局变量和函数都是作为 window 对象的属性和方法创建的.

某个执行环境的所有代码执行完毕后,该环境被销毁,保存在其中的所有变量和函数定义也随之销毁.

每个函数都有自己的执行环境,当执行流进入一个函数时,函数的环境就会被推入一个环境栈中.而在函数执行之后,栈将其环境弹出,把控制权返还给之前的执行环境.

当代码在一个环境中执行时,会创建变量对象的一个 **作用域** **scope chain**,作用域链的用途是保证对执行环境有权访问的所有变量和函数的有序访问.作用域链的前端始终都是当前执行代码所在环境的变量对象.作用域链中的下一个变量对象来自包含(外部)环境,而在下一个变量对象则来自下一个包含环境.这样一直延续到全局执行环境.全局执行环境的对象始终是作用域链中的最后一个对象.

标示符解析是沿着作用域链一级一级地搜索标示符的过程.搜索过程始终从作用域链的前端开始,然后逐级地向后回溯,直到找到标示符为止,如果找不到则发生错误.

#### 延长作用域链

虽然执行环境的类型只有两种,全局和局部(函数),但还是有其他方法来延长作用域链,这么说是因为有些语句可以在作用域链的前端增加一个变量对象,该变量会在代码执行后被移出.

- try-catch 语句的 catch 块
- with 语句

对于`with`语句,现在都不建议过多使用 with,我们就不介绍了,而`try-catch`,`catch`会创建一个新的变量对象,其中包含的是被抛出错误对象的声明.

#### 没有块级作用域

在 Javascript 中没有块级作用域,包裹在花括号中的代码不会有自己的作用域,常见的例如`if for`等语句.在声明一个变量的时候如果不用`var`会导致创建全局变量,所以在创建对象的时候务必使用`var`.

查询标识符,在确定一个标识符的时候,搜索过程从作用域链的顶端开始,依次向上搜索.直到找到为止.如果找不到会发生错误.

#### 垃圾收集

Javascript 是一门具有自动垃圾收集机制的编程语言,开发人员不必关心内存分配和回收问题.

- 离开作用域的值将被自动标记为可以回收,因此将在垃圾手机期间被删除
- **标记清除** 是目前主流的垃圾手机算法,其思想是给当前不使用的值加上标记,然后在回收其内存.
- 另一种垃圾收集算法是 **引用计数** ,其思想是跟踪记录所有值被引用的次数,当引用次数变为 0 时,则说明在没有办法访问这个值了,因此就可以将其占用的内存空间回收.不过在代码存在循环引用现象时,该算法会导致问题.
- 适当的解除变量的引用对垃圾回收机制有好处

## 第五章 引用类型

引用类型的值(对象)是引用类型的一个实例,引用类型是一种数据结构,用于将数据和功能组织在一起.这也常被称为类,但是 javascript 对类的概念跟其他语言略有不同.

#### object 类型

到目前为止,我们看到的大多数引用类型值都是 Object 类型的实例,也是使用最多的一个引用类型.

```javascript
// new 操作符来创建
var person = new Object();
person.name = "buuug7";
person.age = 22;

// 对象字面量来创建
var person = {
  name: "buuug7",
  age: 22
};

// 访问 , 点表示法
person.name; // buuug7
person.age; // 22

// 访问, 方括号表示法
person["name"]; // buuug7
person["age"]; // 22
```

#### Array 类型

ECMAScript 中的数组与其他语言中的数组区别较大,ECMAScript 中的每一项可以保存任何类型的数组.其数组长度可以动态的调整.

```javascript
//
// 创建数组
//
// 使用Array构造函数
var numbers = new Array(); // 创建一个空数组
var numbers = new Array(5); // 创建指定长度的数组
var numbers = new Array("red", "blue", "green"); // 创建并初始化数组

// 使用数组字面量表示法
var numbers = [];
var numbers = [1, 2, 3];

//
// 读取数组
//
var numbers = [1, 2, 3];
numbers[0]; // 1
numbers[1]; // 2

//
// 数组长度
//
var numbers = [1, 2, 3];
numbers.length; // 3

//
// 检测数组
//
// 不推荐 instanceof 如果网页中包含多个框架,导致检测不准确
// 推荐用ES5的Array.isArray()
var numbers = [1, 2, 3];
Array.isArray(numbers); // true

//
// 转换方法
//
// toLocalString() toString() valueOf()
// toString() 返回由数组中每个值的字符串形式拼接而成的一个逗号分隔的字符串
// valueOf() 返回数组本身
// 用join()方法也可以实现toString()方法的功能
var numbers = [1, 2, 3];
numbers.join(","); // 1,2,3

//
// 栈方法
//
// 数组可以表现的像栈一样,LIFO(Last-In-First-Out,后进先出)
// 栈中项的插入叫推入,移除叫弹出,只发生在栈的顶部.
// ECMAScript专门提供了push()和pop()方法,以便实现类似栈的行为
var numbers = [1, 2, 3];
numbers.push(4); // 4
numbers.pop(); // 4

//
// 队列方法
//
// 队列数据结构的访问规则是FIFO(First-In-First-Out,先进先出)
// 结合使用shift()和push()数组可以实现队列方法
var numbers = [1, 2, 3];
numbers.push(4); // 4
numbers.shift(); // 1
alert(numbers); // 2,3,4
// unshift()与shift()作用相反,它可以在数组的前端添加任意个项并返回数组的长度
numbers.unshift(0, 1); // 5
alert(); // 0,1,2,3,4

//
// 重排序方法
//
// reverse() 取反
// sort() 默认按照升序排列,不过通常情况下并不是我们想要的结果,它接受一个函数
var numbers = [1, 2, 3, 10, 4];
numbers.sort(function(value1, value2) {
  return value2 - value1;
});

//
// concat()方法
//
// 基于当前数组中的所有项创建一个新数组
var numbers = [1, 2, 3];
var numbers2 = numbers.concat(4, 5, 6); // [1, 2, 3, 4, 5, 6]

//
// slice()方法
//
// 基于当前数组中的一个或者多个创建一个新数组
// 如果slice方法的参数为负数,则用数组长度加上该数来确定相应的位置
// 例如数组长度为8, slice(-4,-2)与slice(4,6)相同
var numbers = [1, 2, 3, 4, 5, 6];
var numbers2 = numbers.slice(1); // [2,3,4,5,6]
var numbers3 = numbers.slice(1, 3); // [2,3]

//
// splice()方法
//
// 删除: 可以删除任意项,只需要指定两个参数,要删除的第一项位置和要删除的项数
var numbers = [1, 2, 3, 4, 5, 6];
// 从第一项开始,总共删除1项
var removed = numbers.splice(0, 1); // 1
alert(numbers); // 2,3,4,5,6

// 插入: 向指定位置插入多个项,提供参数:起始位置,0(要删除的项数),和要插入的项
var numbers = [1, 2, 3, 4, 5, 6];
// 向位置1插入8,9,10
var removed = numbers.splice(1, 0, 8, 9, 10); // []``
alert(numbers); // 1, 8, 9, 10, 2, 3, 4, 5, 6

// 替换: 可以向指定位置插入任意数量的项,同时可删除任意数量的项
// 删除三项,插入三项
var numbers = [1, 2, 3, 4, 5, 6];
var removed = numbers.splice(1, 3, 7, 8, 9); // [2,3,4]
alert(numbers); // 1,7,8,9,5,6

//
// 位置方法
//
// indexOf() 和 lastIndexOf()
// 接受两个参数,要查找的项和表示查找起点位置的索引
var numbers = [1, 2, 3, 4, 2, 5, 6];
numbers.indexOf(2); // 1
numbers.lastIndexOf(2); // 4

//
// 迭代方法
//
// 每个方法都接受两个参数:要在每一项运行的函数和(可选)运行该函数的作用域对象(this)
// 传入这些方法中的函数会接收三个参数:数组项的值,该项在数组中的值和数组对象本身
// every() 对数组中的每一项运行给定函数,如果该函数对每一项都返回true,则返回true
// some() 对数组中的每一项运行给定函数,如果该函数任一项返回true,则返回true
// filter() 对数组中的每一项运行给定函数,返回该函数返回true的项组成的数组
// forEach() 对函数中的每一项运行给定函数,没有返回值
// map() 对数组中的每一项运行给定函数,返回每次函数调用的结果组成的数组

var numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];
var everyResult = numbers.every(function(item, index, array) {
  return item > 2;
});
alert(everyResult); // false

var someResult = numbers.some(function(item, index, array) {
  return item > 2;
});
alert(someResult); // true

var filterResult = numbers.filter(function(item, index, array) {
  return item > 2;
});
alert(filterResult); // 3,4,5,4,3

numbers.forEach(function(item, index, array) {
  // 执行某些操作
});

var mapResult = numbers.map(function(item, index, array) {
  return item * 2;
});
alert(mapResult); // 2, 4, 6, 8, 10, 8, 6, 4, 2

//
// 缩小方法
//
// reduce() reduceRight()
// 这两个方法都会迭代数组的所有项,然后构建一个最终返回的值
// reduce()方法从数组的第一项开始,逐个遍历到最后
// reduceRight() 方法从数组的最后一项开始,向前遍历到第一项
// 这两个方法都接收两个参数: 一个在每一项上调用的函数和(可选的)作为缩小基础的初始值
// 传给reduce()和reduceRight()的函数接收四个参数:前一个值,当前值,项的索引和数组对象
// 这个函数返回的任何值都会作为第一个参数自动传给下一个项,第一次迭代发生在第二项上,因此第一个参数是数组的第一项,第二个参数是数组的第二项
var numbers = [1, 2, 3, 4, 5];
var sum = numbers.reduce(function(prev, cur, index, array) {
  return prev + cur;
});
alert(sum); // 15
```

#### Date 类型

Date 类型使用 UTC(Coordinated Universal Time,国际协调时间)1970-01-01 零时开始经过的毫秒数来保存日期.

```javascript
// 创建一个日期对象
var now = new Date();

//
// Date.parse();
// 该函数接受一个表示日期的字符串参数,然后尝试根据这个字符串返回相应日期的毫秒数
// 2017-08-02 00:00:00
Date.parse("2017-08-02"); // 1501632000000

// Date.UTC();
// 返回对应日期的毫秒数,接受的参数为:年份,基于0的月份(0-11),月中的那一天(1-31),小时(0-23),分钟,秒以及毫秒数
// 其中只有年跟月是必须的
// 2017-08-02 00:00:00
Date.UTC(2017, 7, 2); // 1501632000000

// 当然创建一个日期对象的时候会自动调用Date.parse()或者Date.UTC()
var now = new Date(2017, 7, 2);
var now = new Date("2017-08-02");

// Date.now()返回当前时间时间表示的毫秒数,而不是时间对象

//
// 继承方法
//
// toString(),toLocaleString(),valueOf()
// toString() 返回带有时区信息的日期和时间,一般以军用时间表示
// toLocaleString() 返回与浏览器设置的地区相适应格式的时间和日期
// valueOf() 返回毫秒表示数

//
// 常用日期格式化方法
//
// toDateString() 显示: 星期几 月 日 年
// toLocaleDateString() 特定于地区的
// toTimeString() 显示: 时 分 秒 时区信息
// toLocaleTimeString() 特定与地区的
// toUTCString() 完整的UTC日期
// toLocaleString()
// 以上的几种方法输出的字符串格式因浏览器而异,没有哪一种方法能够在用户界面中显示一致的日期信息

//
// 获取和设置日期
//
// getTime() setTime()
// getFullYear() setFullYear()
// getUTCFullYear() setUTCFullYear()
// 很多... 自己查API,这里就不罗列了
```

#### RegExp 类型

ECMAScript 通过 RegExp 类型来支持正则表达式.

```javascript
// 创建正则表达式
// var expression = /pattern/flags;
// 任何一个正则表达式都可以带一个或者多个表示(flags)
// g: 表示全局模式(global),即模式将应用于所有字符串,而非在发现第一个匹配项时立刻停止
// i: 表示不区分大小写(case-insensitive)
//m: 表示多行(multiline)模式

// 创建正则表达式的方式有:字面量形式,使用RegExp构造函数
// RegExp的实例属性: global,ignoreCase,lastInex,multiline,source

// exec()
var pattern = /[bc]a/i;
pattern.global; // false
pattern.ignoreCase; // true
// RegExp的实例方法: exec(),test()
// exec()接受一个参数,即要应用模式的字符串,然后返回包含第一个匹配项信息的数组
var pattern = /[ab]c/gi;
var matches = pattern.exec("bbac");
matches.index; // 2
matches.input; // bbac
matches[0]; // ac

// test()
// 模式与参数匹配的情况下返回true
var pattern = /\d{3}-\d{3}-\d{2}/;
var text = "210-337-18";
if (pattern.test(text)) {
  alert("yes!");
}

// RegExp实例继承的toLocaleString()和toString()方法都会返回正则表达式的字面量

//
// RegExp构造函数的属性
//
// input 最近一次匹配的字符串
// lastMatch 最近一次的匹配项
// lastParen 最近一次匹配的捕获组
// leftContext input字符串lastMatch之前的文本
// rightContext input字符串lastMatch之后的文本
// multiline 布尔值,表示是否所有表达式都是用多行模式
// 9个用于存储捕获组的构造函数属性,RegExp.$1,RegExp.$2 ... RegExp.$9
var text = "this has been a short summer";
var pattern = /(.)hort/g;
if (pattern.test(text)) {
  alert(RegExp.input); // this has been a short summer'
  alert(RegExp.lastMatch); // short
  alert(RegExp.lastParen); // s
  alert(RegExp.leftContext); // this has been a
  alert(RegExp.rightContext); // summer
  alert(RegExp.multiline); // false
}
```

#### javascript 正则表达式

```javascript
// 元字符
// ( [ { \ ^ $ | ) ? * + .

// 常用特殊字符
// \t 制表符
// \n 换行符
// \r 回车符
// \f 换页符
// \b 退格符

//
// 字符类
//
// 原则上正则的一个字符对应一个字符,可以用[]括起来,着[]整体对应一个字符
var pattern = /[ab]/i;
pattern.test("a"); // true
pattern.test("b"); // true

// 取反
// [^ab]
var pattern = /[^ab]/i;
pattern.test("a"); // false
pattern.test("b"); // false
pattern.test("c"); // true

// 范围
// [a-z]
var pattern = /[a-z]/i;
pattern.test("m"); // true
pattern.test(9); // false

// 组合
// [^a-z]
// [a-z1-5\n]
// [a-zA-Z]

// 预定义
// . 除了换行和回车之外的任意字符
// \d 数字字符
// \D 非数字字符
// \s 空白字符
// \S 非空白字符
// \w 单词字符(所有的字母)
// \W 非单词字符

// 量词
// ? 出现零次或者一次
// * 出现零次或者多次
// + 一次或者多次
// {n} 对应出现零次或者n次
// {n,m} 至少出现n次,但不超过m次
// {n,} 至少出现n次

// 分组
// 用小括号表示
// /(dog){2}/g;
var pattern = /(dog){2,}/g;
pattern.test("dogdogpppp"); //true

// 方向引用
// 用 \编号 表示法来引用
/(dog)\1/.test("dogdog"); // true ,这里的\1 就表示第一个捕获组

// 候选
// 用 | 表示
/(red|black|yellow)/.test("red"); // true
/(red|black|yellow)/.test("yellow"); // true

// 前瞻
// ?=exp 正向前瞻 匹配exp前面的位置
// ?!exp 负向前瞻 匹配后面不是exp的位置
var str1 = "bedroom";
var str2 = "bedding";
var reBed = /(bed(?=room))/; //在我们捕获bed这个字符串时，抢先去看接下来的字符串是不是room
alert(reBed.test(str1)); //true
alert(RegExp.$1); //bed
alert(RegExp.$2 === ""); //true
alert(reBed.test(str2)); //false

var str1 = "bedroom";
var str2 = "bedding";
var reBed = /(bed(?!room))/; //要来它后面不能是room
alert(reBed.test(str1)); //false
alert(reBed.test(str2)); //true

// 边界
// ^ 开头,注意不能紧跟于左中括号的后面
// $ 结尾,
// \b 单词边界,指[a-zA-Z_0-9]之外的字符
// \B 非单词边界
```

#### Function 类型

每个函数都是 Function 类型的实例,而且都与其他引用类型一样具有属性和方法.由于函数都是对象,因此函数名实际上也是一个指向函数对象的指正,不会与某个函数绑定.

```javascript
// 定义函数
function sum(num1, num2) {
  return num1 + num2;
}
// 或者
var sum = function(num1, num2) {
  return num1 + num2;
};
// 也可以用构造函数Function来声明,但是不建议
```

##### 函数没有重载(将函数名想象为指针),后定义的会覆盖前面定义的同名函数

##### 函数申明和函数表达式

解析器会率先读取函数声明,并使其在执行任何代码之前可用,至于函数表达式,则必须等到解析器执行到它所在的代码行,才会真正被解释执行.

```javascript
alert(num(10, 10));
function sum(num1, num2) {
  return num1 + num2;
}

// 下面的会出错
alert(sum(10, 10));
var sum = function(num1, num2) {
  return num1 + num2;
};
```

##### 作为值的函数

因为 ECMAScript 中函数名本身就是变量,所有函数也可以作为值来使用,也就是说,可以像传递一个参数一样把一个函数传递给另外一个函数,而且还可以将一个函数作为结果返回.

##### 函数内部的属性

- `arguments` 用来保存函数的参数
  - 该对象有个`callee`属性,该属性是一个指针,指向拥有 arguments 对象的函数
- `this` 该对象引用的是函数据以执行的环境对象,谁调用该函数,this 就指向谁
- `caller` 保存着当前函数的函数引用,如果在全局作用域中调用当前函数,它的值为`null`

##### 函数属性和方法

- `length` 表示函数希望接收的命名参数的个数
- `prototype` 属性,该属性不可枚举,使用`for-in`无法发现
- `call() apply()` 这两个方法的用途都是在特定的作用域中调用函数,实际上是设置函数体内 this 对象的值,使用这个两个函数都可以扩展函数的作用域
  - `call()` 第一个参数为运行函数的作用域对象,第二及其以后的参数是传递给函数的参数
  - `apply()` 第一个参数为运行函数的作用域对象,第二个参数为传递给函数的数组或者 arguments 对象
- `bind()` ECMAScript5 中定义的方法,该方法会创建一个函数的实例,其 this 值会被绑定到传给 bind()函数的值.
- `toString()`,`toLocaleString()` 和 `valueOf()`都会返回函数的代码,在代码调试的时候非常有用

#### 基本包装类型

为了便于操作基本类型值,ECMAScript 提供了 3 个特殊的引用类型,Boolean,Number 和 String,每当读取一个基本类型值时候,后台就会创建一个对应的基本包装类型的对象.从而让我们能够调用一些方法来操作这些数据.  
引用类型和基本包装类型的主要区别就是对象的生存期,使用 new 操作符创建的引用类型的实力,在执行流离开当前作用域之前都一直保存在内存中.而自动创建的基本包装类型的对象,则只存在于一行代码执行的一瞬间.这意味着我们不能在运行时为基本类型值添加属性和方法.

```javascript
//
// Boolean 类型
//
// Boolean类型是与布尔值对应的引用类型
// Boolean类型的实例重写了valueOf()方法,返回基本类型值true或false
// 重写了toString()方法,返回字符串'true'或'false'
// 用处不大,容易引起混淆,建议永远不要使用了
var booleanObject = new Boolean(true);

//
// Number 类型
//
// Number是与数字值对应的引用类型.
// 重写了 valueOf(),toLocaleString()和toString()方法,第一个返回对象表示的基本类型的值,另外两个则返回字符串形式的的数值.
// 我们任然不建议直接实例化Number类型

// toString(2) 以二进制输出 ...
// toString(8) 以8进制输出

// toFixed()
var num = 10;
alert(num.toFixed(2)); // 10.00

// toExponential() e表示法,其接收一个参数,该参数用来指定输出结果中小数的位数
alert(num.toExponential()); // 1.0e+1
alert(num.toExponential(2)); // 1.00e+1

// toPrecision()
// 返回该数值最合适的表示方法,该方法接收一个参数,表示数值的所有数字的位数
var num = 99;
alert(num.toPrecision(1)); // 1e+2
alert(num.toPrecision(2)); // 99
alert(num.toPrecision(3)); // 99.0

//
// String 类型
//
// String类型是字符串的对象包装类型.
var stringObject = new String("hello world");
// 其中继承的valueOf(),toLocaleString()和toString()都返回对象所表示的基本字符串值.
// length属性,表示字符串中包含多少个字符.即使字符串包含双字节字符,每个字符串也任然算一个字符.

// charAt() 返回对应位置的字符,基于0
// charCodeAt() 返回对应位置的字符编码,基于0

// 访问字符串中某个字符可以用方括号表示法.
var str = "hello world";
str[2]; // l

// concat()
// +
var str1 = "hello";
var str2 = "world";
str1.concat(" world"); // hello world
str1 + " world"; // hello world

// slice() ,第一个参数指定开始位置,第二个参数指定结束位置,关系为: startIndex <= index < endIndex
// substr() ,第一个参数指定开始位置,第二个参数指定返回的字符个数
// substring() ,跟slice()一模一样
// 以上三个方法在参数为负数的情况下情况各个不同,这里不做过多介绍,为了避免混乱,建议少用.
var str = "hello world";
str.slice(6); // world
str.slice(3, 5); // lo

str.substr(3); // lo world
str.substr(3, 5); //lo wo

str.substring(6); // world
str.substring(3, 5); // lo

// 字符串位置
// indexOf()和lastIndexOf()
// 在一个字符串中搜索给定的子字符串,返回子字符串的位置,没有找到返回 -1
// 第一个参数为子字符串,第二个参数可选,指定开始搜索的开始位置
var str = "hello world";
str.indexOf("o"); // 4
str.lastIndexOf("o"); // 7

str.indexOf("o", 6); // 7
str.lastIndexOf("o", 6); // 4

// trim() 删除前置及后缀的所有空格

// 大小写
// toLowerCase() toLocaleLowerCase()
// toUpperCase() toLocaleUpperCase()

// 字符串模式匹配方法
// match()
// 在字符串上调用match()与在RegExp上调用exec()方法相同
// 该方法接受一个参数,要么是一个正则表达式,要么是一个RegExp对象.
var text = "cat, bat, sat, fat";
var pattern = /.at/;
var matches = text.match(pattern);
matches.index; // 0
matches.lastIndex; // 0
matches[0]; // cat

// search()
// 参数与match()方法一致
// 返回字符串第一个匹配项的索引,如果没有返回-1
// 始终从字符串开头向后查找
var text = "cat, bat, sat, fat";
text.search(/at/);
1;

// replace()
// 第一个参数可以是一个RegExp对象或者一个字符串,第二个参数是一个字符串或者函数
var text = "cat, bat, sat, fat";
text.replace("at", "ond"); // cond, bat, sat, fat
text.replace(/at/g, "ond"); // cond, bond, sond, fond
// 第二个参数为函数可以实现更精准的替换操作
// 传递给函数的三个参数分别为: 模式的匹配项,模式匹配项在字符串中的位置和原始字符串
// 这个函数应该返回一个字符串
var text = "cat, bat, sat, fat";
var result = text.replace(/.at/g, function(match, pos, originalText) {
  switch (match) {
    case "cat":
      return "bigCat";
      break;
    case "bat":
      return "bigBat";
      break;
    case "sat":
      return "bigSat";
      break;
    case "fat":
      return "bigFat";
      break;
    default:
      return "opps...";
  }
});
alert(result); //"bigCat, bigBat, bigSat, bigFat"

// split()
// 根据指定的分隔符将一个字符串分割成多个字符串,并将结果放在一个数组中
// 第一个参数为分隔符,第二个可选的第二个参数用于指定数组的大小,确保返回的数组不会超过既定大小
var colorText = "red,blue,green,yellow";
colorText.split(","); //  ["red", "blue", "green", "yellow"]
colorText.split(",", 2); //  ["red", "blue"]

// localCompare()

// fromCharCode()
// 它属于String构造函数的静态方法
String.fromCharCode(104, 101, 108, 108, 111); // "hello"

// HTML方法
// 没啥意义,很少用到,忘记吧
```

#### 单体内置对象

##### Global 对象

- uri 编码,`encodeURI() encodeURIComponent() decodeURI() decodeURIComponent()`
- eval 方法,慎用,严格模式有很多限制
- Global 对象的属性
  - undefined 特殊值 undefined
  - NaN 特殊值 NaN
  - Infinity 特殊值 Infinity
  - Object 构造函数 Object
  - Array 构造函数 Array
  - Function 构造函数 Function
  - Boolean 构造函数 Boolean
  - String 构造函数 String
  - Number 构造函数 Number
  - Date 构造函数 Date
  - RegExp 构造函数 RegExp
  - Error 构造函数 Error
  - EvalError 构造函数 EvalError
  - RangeError 构造函数 RangeError
  - ReferenceError 构造函数 ReferenceError
  - SyntaxError 构造函数 SyntaxError
  - TypeError 构造函数 TypeError
  - URIError 构造函数 URIError
- window 对象,全局对象作为 window 对象的一部分来实现,在全局申明的所有变量和函数,成为了 window 对象的属性

##### Math 对象

- Math 对象的属性
  - Math.E 自然对数的底数,即常量 e 的值
  - Math.LN10 10 的自然对数
  - Math.LN2 2 的自然对数
  - Math.LOG2E 以 2 为底 e 的对数
  - Math.LOG10E 以 10 为底 e 的对数
  - Math.PI 3.14...
  - Math.SQRT1_2 1/2 的平方根
  - Math.SQRT2 2 的平方根
- Math.max()
- Math.min()
- Math.ceil() 向上舍入
- Math.floor() 向下舍入
- Math.round() 四舍五入
- Math.random() 返回介于 0 和 1 之间的随机数
- 其他更多...

#### 第五章总结

对象在 JavaScript 中被称为引用类型的值,而且有一些内置的引用类型可以用来创建特定的对象

- 引用类型与传统面向对象编程中的类类似,但实现不同
- Object 是基础类型,其他所有类型都从 Object 继承了基本的行为
- Array 类型是一组值得有序列表,同时提供了操作和转换这些值的功能
- Data 类提供了有关日期和时间的信息
- RegExp 是 ECMAScript 支持正则表达式的一个接口,提供了基本和高级的正则表达式功能
- 函数 Function 类型的实例,因此函数也是对象,这一点正是 JavaScript 最有特色的地方,因为函数是对象,所以函数也有方法,用来增强其功能
- 因为有了基本包装类型,所以 JavaScript 中基本类型值可以被当做对象来访问.三种基本包装类型是
  - Boolean
  - Number
  - String
  - 三种基本包装类型共有的特点是:
    - 每个包装类型都映射到基本类型
    - 在读取模式下访问基本类型值时,就会创建对应的基本包装类型的一个对象,从而方便了数据操作
    - 基本类型值的语句一经执行完毕,就会立刻销毁创建的基本类型包装对象
- 在所有代码执行之前,作用于中已经存在两个内置对象,Global 和 Math,在大多数 ECMAScript 实现中不能直接访问 Global 对象,不过在 web 浏览器中 window 承担了 Global 对象的角色,全局变量和函数都是 Global 对象的属性.Math 提供了很多属性和方法,用于辅助完成复杂的数学计算.
