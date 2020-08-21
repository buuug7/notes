# javascript related

## fetch 下载的例子

```javascript
fetch(url, myInit).then((res) => {
  const contentType = res.headers.get("Content-Type");
  // 根据返回contentType，处理是json，还是下载文件
  if (contentType.toLowerCase() == "application/json;charset=utf-8") {
    res.json().then((data) => {
      alert(data.success);
    });
  } else if (
    contentType.toLowerCase() ==
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  ) {
    res.blob().then((blob) => {
      // 创建一个a标签，用于下载
      var a = document.createElement("a");
      var url = window.URL.createObjectURL(blob);
      var fileName = "被下载的文件.txt";
      a.href = url;
      a.download = fileName;
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }
});
```

## 为什么有些函数前面有个`+function(){}`或者`!function(){}`

参考[stackoverflow](https://stackoverflow.com/questions/5827290/javascript-function-leading-bang-syntax)

## 关于 var

在函数内部声明变量不适用 var 就会变成全局变量

## javascript 获取 dom api

```javascript
// 可以往控制台写东西
console.log();

// 获取元素:
document.getElementById("元素的id");

//获取元素的属性:
document.getElementById("元素的id").getAttribute("属性名");

// 获取元素样式的属性:
document.getElementById("table1").style.style的属性名;

//获取表单输入框的值:
document.getElementById("表单属性名").value;
```

## javascript 弹出一个窗口

```javascript
// openURL 暂时未用到
function openURL(url) {
  window.open(
    url,
    "Share",
    "width=550,height=400,toolbar=0,scrollbars=1,location=0,statusbar=0,menubar=0,resizable=0"
  );
}
```

## Javascript 获取时间

```javascript
var tick = new Date();
var month = (tick.getMonth() + 1).toString().replace(/^(\d)$/, "0$1");
var day = tick
  .getDate()
  .toString()
  .replace(/^(\d)$/, "0$1");
var h = tick
  .getHours()
  .toString()
  .replace(/^(\d)$/, "0$1");
var m = tick
  .getMinutes()
  .toString()
  .replace(/^(\d)$/, "0$1");
document.write(month + "-" + day + " " + h + ":" + m);
```

## 罗马数字跟阿拉伯数字相互转换

```javascript
function romanize(num) {
  if (!+num) return false;
  var digits = String(+num).split(""),
    key = [
      "",
      "C",
      "CC",
      "CCC",
      "CD",
      "D",
      "DC",
      "DCC",
      "DCCC",
      "CM",
      "",
      "X",
      "XX",
      "XXX",
      "XL",
      "L",
      "LX",
      "LXX",
      "LXXX",
      "XC",
      "",
      "I",
      "II",
      "III",
      "IV",
      "V",
      "VI",
      "VII",
      "VIII",
      "IX",
    ],
    roman = "",
    i = 3;
  while (i--) roman = (key[+digits.pop() + i * 10] || "") + roman;
  return Array(+digits.join("") + 1).join("M") + roman;
}

function deromanize(str) {
  var str = str.toUpperCase(),
    validator = /^M*(?:D?C{0,3}|C[MD])(?:L?X{0,3}|X[CL])(?:V?I{0,3}|I[XV])$/,
    token = /[MDLV]|C[MD]?|X[CL]?|I[XV]?/g,
    key = {
      M: 1000,
      CM: 900,
      D: 500,
      CD: 400,
      C: 100,
      XC: 90,
      L: 50,
      XL: 40,
      X: 10,
      IX: 9,
      V: 5,
      IV: 4,
      I: 1,
    },
    num = 0,
    m;
  if (!(str && validator.test(str))) return false;
  while ((m = token.exec(str))) num += key[m[0]];
  return num;
}
```

## Javascript 数组常用 api

数组就是一组相关数据的集合,不过 js 中的数组长度一般不指定,可以随意增加长度

```javascript
//push()方法返回值为压入数组(堆栈)后的新数组长度
//pop()方法返回值为其取出元素的内容

//shift()从头部移出一个元素并返回移出的元素
//unshift()从数组的头部插入一个元素并返回新数组的长度

//splice(1,2,3,4,5):操作原数组本身
//第一个参数表示: 起始位置
//第二个参数表示:截取的个数
//第三个参数以后表示:表示追加的心元素

//slice()表示截取的范围(做闭右开区间),返回的是截取的内容,他不操作原数组本身

//concat()连接两个数组返回一个合并后的数组
//join()不操作数组本身,在每个数组之间加入指定内容,返回的是一个字符串

//reverse()倒序数组,其操作数组本身

//sort()排序,转换成字符串来排序的

//ECMA5中增加的数组方法:
//indexOf:
//传递一个参数的时候是表示值,返回索引位置
//传递两个参数的时候表示第一个是起始位置,第二个参数是值

//lastIndexOf();返回传值在数组中最后一次出现的索引

//every(function(item,index,array){})会对数组里面的每个元素都进行给定函数的测试若返回true,则ervery最终返回true,负责返回false

//filter(function(item,index,array){}),对调用数组进行给定函数的过滤,最后返回过滤的结果,也是一个数组

//map(function(item,index,array){}),对调用数组逐个元素进行函数的修改,返回修改后的数组

//some(function(item,index,array){}),对调用数组逐个元素进行函数的测试

//reduce从左边遍历,其内的function可传递四个参数,第一个为当前遍历前一个元素,第二个为当前元素,第三个为索引位置,第四个为array本身
//reduceRight从右侧遍历,参数同上
```

## Javascript 事件委托

```javascript
//首先你的错误是由于闭包造成的，虽然修改后可以避免错误，但我强烈建议你使用事件委托完成事件绑定。代码可以修改如下：
function test() {
  var doc = document.getElementsByTagName("body")[0];
  doc.onclick = function (e) {
    e = e || window.event;
    var tagChild = e.srcElement || e.target;
    if (tagChild.nodeType == 1 && tagChild.tagName.toLowerCase() == "p") {
      alert(tagChild.id);
    }
    tagChild = null;
  };
}
```

优点：

- 页面监听事件的标签元素减少，有效提高性能问题
- 减少使用 for 循环绑定事件，同样提高了性能
- 性能提高了，你的代码质量就会得到认可

## 执行环境 闭包

每个函数都有自己的执行环境,这些环境彼此独立,每发生一次函数调用,脚本引擎就需要预先为函数创建一个 执行环境

比如函数的调用过程中:FnA-->FnB-->FnC-->当 FnA 开始调用 FnB 时候,引擎就需要先把 FnA 的执行环境保存起来(进栈操作),在等到 FnB 返回之后再恢复(出栈操作)FnA 的执行环境

引擎为函数建立执行环境的步骤:

- 1 创建活动对象 创建必须活动对象也就是申明,但是没有赋值,真正执行的时候才赋值
- 2 分配作用域链 比如创建 FnA 函数时,作用域链里 push(顶级作用域 window),当调用的 FnA 的时候,在往其作用域链里推入(第一步创建的活动对象),此时其作用域链就变成了(ActiveObj,window)
- 3 绑定 this 函数内部的 this 默认指向全局对象 window,可用 with call apply 修改 this 绑定的作用域

标识符解析

就系一个属性的查找过程:从作用域链中的第一个对象依次往后查找,若没有返回 undefined

闭包:是一个表达式通常为函数,可用有任意参数,连同绑定这些参数的环境一起构成

闭包构造三步走:

- 1-->在函数 A 中定义一个函数 B
- 2-->通过调用 A 把 B 的引用返回来,赋值给其他作用域里德变量 c
- 3-->通过 c 执行 B

## 函数相关

- 查看函数的形参个数:调用函数名.length 即可
- 查看函数的实际参数个数:arguments.length 即可
- arguments.callee 调用自己本身,通常用于递归
- this 对象指在运行时期基于执行环境的绑定,谁调用它它指向谁
- call apply 除了传递参数外,还有绑定作用域的作用,call 接受变长参数,二 apply 接受数组
- 标识符解析:从作用域链中的第一个对象依次往后查找,一直找到 window,如果都没有的话返回 undefined,所以全局变量尽量别申请太多,因为变量时层层向上查找,全局变量时最后才被搜索查找的
- 闭包:被返回来的内部函数以及它的作用域链,就叫做一个闭包
- 每一个函数都有一个执行环境

## Javascript 回收机制

js 垃圾回收机制:

- 标记法
- 引用计数法

一个局部的变量在函数执行结束之后才被释放,所以在遍历的时候用匿名函数加上小括号运行可以解决变量立即释放的问题,以致不在其执行结束后仍旧可以访问的问题

## 数据类型

javascript 是一种弱类型的脚本语言,其变量根据赋值来决定数据类型,在方法内部声明的变量为局部变量,在方法外部声明的变量为全局变量,或者在方法内部不加 var 时声明的变量也为全局变量  
typeof 关键字通常用来判断变量的数据类型

- Number 数值类型,包括整数小数 (Infinity 表示正无穷,NaN 表示不是一个数字 not a number)

- undefined 是一种数据类型,表示变量被声明了但是没有赋值

- null 空值,表示一种空的对象的引用

- String 类型,字符序列的组合

- Boolean 数据类型

- 引用数据类型,Object 类型,Array 类型等等..

```javascript
var arr=[];
var obj={};
var date=new Date[];
```

## javascript 去除重复

```javascript
// 第一种：也是最笨的吧
Array.prototype.unique1 = function () {
  var r = new Array();
  label: for (var i = 0, n = this.length; i < n; i++) {
    for (var x = 0, y = r.length; x < y; x++) {
      if (r[x] == this[i]) {
        continue label;
      }
    }
    r[r.length] = this[i];
  }
  return r;
};

// 第二种：这个正则天书一样
Array.prototype.unique2 = function () {
  return this.sort()
    .join(",,")
    .replace(/(,|^)([^,]+)(,,\2)+(,|$)/g, "$1$2$4")
    .replace(/,,+/g, ",")
    .replace(/,$/, "")
    .split(",");
};

// 第三种：使用对象的【hasOwnProperty】方法
Array.prototype.unique3 = function () {
  var temp = {},
    len = this.length;
  for (var i = 0; i < len; i++) {
    var tmp = this[i];
    if (!temp.hasOwnProperty(tmp)) {
      temp[this[i]] = "my god";
    }
  }

  len = 0;
  var tempArr = [];
  for (var i in temp) {
    tempArr[len++] = i;
  }
  return tempArr;
};

// 第四种：先排序，前项比后项。这个方法挺简单的，但也实用
Array.prototype.unique4 = function () {
  var temp = new Array();
  this.sort();
  for (i = 0; i < this.length; i++) {
    if (this[i] == this[i + 1]) {
      continue;
    }
    temp[temp.length] = this[i];
  }
  return temp;
};

// 下面是以前经常用的，效率也很好。有点想hash表的感觉
Array.prototype.unique5 = function () {
  var res = [],
    hash = {};
  for (var i = 0, elem; (elem = this[i]) != null; i++) {
    if (!hash[elem]) {
      res.push(elem);
      hash[elem] = true;
    }
  }
  return res;
};
```

## 对象函数闭包原型

- javascript 中一切都是对象

值类型的类型判断用 typeof,引用类型的类型判断用 instanceof
对象->若干属性的集合
对象是属性的集合

- 函数和对象的关系

对象是通过函数来创建的,函数又是一种对象

- prototype 原型

javacript 默认给函数一个属性(prototype),每个函数都有一个叫做 prototype 的属性,该属性叫做原型
这个 prototype 的属性值是一个对象

- 隐式原型

每个对象都有一个**proto**,可成为隐式原型,其指向创建该对象的函数的 prototype

- instanceof 用来判断引用类型

instanceof 表示的是一种继承关系,原型链结构

- javascript 的继承是通过原型链来体现的

访问一个对象的属性时,先在基本属性中查找,如果没有,在沿着**proto**这条链向上找,这就是原型链
在实际中如何区分一个属性是基本属性还是在原型中呢?
用 hasOwnProperty 配置 for...in 循环

- 原型的灵活性

在 Java 和 C#中，你可以简单的理解 class 是一个模子，对象就是被这个模子压出来的一批一批月饼（中秋节刚过完）。压个啥样，就得是个啥样，不能随便动，动一动就坏了。
而在 javascript 中，就没有模子了，月饼被换成了面团，你可以捏成自己想要的样子。
首先，对象属性可以随时改动。
对象或者函数，刚开始 new 出来之后，可能啥属性都没有。但是你可以这会儿加一个，过一会儿在加两个，非常灵活。

- 执行上下文

javascript 在执行一段代码之前,都会进行一些准备工作来生成执行上下文
通俗的解释是:在代码执行之前,把将要用到的所有变量都事先拿出来,有的直接赋值,有的用 undefined 占个空
首先进行准备工作:
普通变量(包括函数表达式)
函数声明,
赋值,
this 赋值,
如果代码段是函数体,那么在此基础上需要附加:
参数赋值,
argumengs 赋值,
自由变量的取值作用域赋值,

- this

函数张的 this 到底取什么值,是在函数真正被调用执行的时候确定的,函数定义的时候确定不了
情况 1:构造函数
其中的 this 就代表它即将 new 出来的对象

情况 2:函数作为对象的一个属性
函数作为对象的一个属性被调用时,函数中的 this 指向该对象

情况 3:函数用 call 或者 apply 调用
当一个函数被 call 和 apply 调用时,this 的值就取传入的对象的值

情况 4:全局调用普通函数
this 永远是 window

- 执行上下文栈

执行全局代码时,会产生一个执行上下文环境,每次调用函数都又会产生执行上下文环境.当函数调用完毕,这个上下文环境以及其中的数据都会被销毁,在重新回到全局上下文环境,处于活动的执行上下文环境只有一个

- 作用域

javascript 中没有块级作用域,所谓块级作用域,就是指大括号{}中间的语句
javascript 除了全局作用域之外,函数可以创建作用域;
所以在我们声明变量时,全局变量要在代码前端声明,函数中要在函数体一开始就声明最好
作用域最大的用处就是隔离变量,不同作用域下同名变量不会冲突

- 自由变量

在 A 作用域中使用的变量 x,却没有在 A 作用域中声明(即在其他作用域中声明),对于 A 作用域来说,x 就是自由变量

- 闭包

闭包应用的两种情况:
第一:函数作为返回值
第二:函数作为参数被传递
