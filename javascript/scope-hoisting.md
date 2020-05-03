## JavaScript Scope and Hoisting

###作用域： 在 JavaScript 中，函数是我们在声明变量时，实际的作用域分隔符，也就是说常见的循环及表达式（如 if, for, while, switch 及 try）并“不能“指定作用域，这一点有别于大部分的程序语言。因此函数中的这些区块会共享作用域。这样使得在这些区块内部声明只属于这些函数块的变量行为可能是危险的。

###变量提升： 在运行时，所有的变量及函数声明将会被移到函数的起始位置（即函式的作用域）- 这就是所谓的变量提示。虽然如此，但是良好的习惯是在作用域的一开始就声明所有变量，避免因未声明就操作变量造成未预期的错误。 -这是一个块作用域语言开发者常见的问题。

#### JavaScript 拥有函数级别的作用域

```JavaScript
// 块级别的作用域对于JavaScript来说不起作用
var x = 1;
console.log(x); // 1
if (true) {
	var x = 2;
	console.log(x); // 2
}
console.log(x); // 2

// JavaScript拥有函数级别的作用域
var x=1;
function foo() {
  var x=2;
  console.log(x); // 2
}
foo(); // 2
console.log(x); // 1
```

#### 变量,函数申明提升

```JavaScript
function foo(){
  bar();
  var x=1;
}

// 上面的函数会被JavaScript解析器解析为下面的,变量的申明会被提前到函数开头地方
function foo(){
  var x;
  bar();
  x=1;
}

// 下面的两个函数是相等的
function foo() {
	if (false) {
		var x = 1;
	}
	return;
	var y = 1;
}
function foo() {
	var x, y;
	if (false) {
		x = 1;
	}
	return;
	y = 1;
}


// 试看下面的两个函数,第二个是被JavaScript解析器解析之后的
function test() {
	foo(); // TypeError "foo is not a function"
	bar(); // "this will run!"
	var foo = function () { // function expression assigned to local variable 'foo'
		alert("this won't run!");
	}
	function bar() { // function declaration, given the name 'bar'
		alert("this will run!");
	}
}

// foo变量和函数申明会被提升到函数的开头处
function test() {
  var foo;
  function bar() { // function declaration, given the name 'bar'
		alert("this will run!");
	}

	foo(); // TypeError "foo is not a function"
	bar(); // "this will run!"
	foo = function () { // function expression assigned to local variable 'foo'
		alert("this won't run!");
	}
}
test();
```

#### 我们该如何编码

首先申明变量必须用 var,并且放在最顶部申明,建议在一个作用域中用单个 var 申明变量
I recommend using JSLint with the onevar option to enforce this,your code should be look like below:

```JavaScript
/*jslint onevar: true [...] */
function foo(a, b, c) {
    var x = 1,
    	bar,
    	baz = "something";
}
```

#### 标准上如何说的

If the variable statement occurs inside a FunctionDeclaration, the variables are defined with function-local scope in that function, as described in section 10.1.3. Otherwise, they are defined with global scope (that is, they are created as members of the global object, as described in section 10.1.3) using property attributes { DontDelete }. Variables are created when the execution scope is entered. A Block does not define a new execution scope. Only Program and FunctionDeclaration produce a new scope. Variables are initialised to undefined when created. A variable with an Initialiser is assigned the value of its AssignmentExpression when the VariableStatement is executed, not when the variable is created.
