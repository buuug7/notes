# string 常用方法

其中 String 的属性有两个, 一个是 length, 另一个是 prototype

## String.fromCharCode(num1[,...[,numN]])

静态方法,使用 unicode 编码来创建字符, 只作用于低位编码, 高位编码请使用 ES6 的`String.fromCodePoint()`.

```javascript
// result: ABC
String.fromCharCode(65, 66, 67);
```

## String.fromCodePoint(num1[,...[,numN]])

静态方法,使用指定的 unicode 编码来创建字符串.

```javascript
// result: ABC
String.fromCodePoint(65, 66, 67);
```

## str.charAt(index)

从一个字符串中返回指定索引的字符,index 的值介于 0 跟字符串长度减一之间的整数.

```javascript
"abc".charAt(1); // b
```

## str.charCodeAt(index)

返回 0-65535 之前的整数, 表示给定索引处的 UTF-16 代码单元,如果编码单元大于 0x10000, 则不能被一个 UTF-16 编码单元单独表示, 只能匹配第一个编码单元. 可以使用 ES6`coePointAt()`来替代.

```javascript
// result: 97
"abc".charCodeAt(0);
```

## str.codePointAt(pos)

返回一个 Unicode 编码点值的整数

```javascript
// result: 98
"abc".codePointAt(1);
```

## str.concat(string2 [,...[,StringN]])

将一个或者多个字符串与原字符串连接合并, 返回一个新的字符串.

> 强烈建议使用`+`做字符串的连接会获取更高的性能.

```javascript
// result: "hello world"
"hello ".concat("world");
```

## str.endsWith(searchString [, position])

用来判断当前字符串是否是以另外一个给定字符串结尾的, 返回 true 或者 false. 其中第二个参数可选, 作为 str 的长度, 默认为`str.length`, 从结尾算起.

```javascript
// result: true
"hello world".endsWith("world");

// result: true
"hello world".endsWith("lo", 5);
```

## str.startsWith(searchString [, position])

用来判断 str 是否是以 searchString 开头的, 第二个参数指定搜索开始位置, 默认值为 0.

```javascript
// result: true
"hello world".startsWith("hello");

// result: true
"hello world".startsWith("wo", 6);
```

## str.includes(searchString [, position])

用于判断一个字符串是否包含在另一个字符串中, 返回 true 或者 false. 第二个参数指定了从当前字符串的那个索引位置开始开始搜寻字符串, 默认值为 0.

```javascript
// result: true
"red and blue".includes("red");

// result: false
"red and blue".includes("red", 1);
```

## str.indexOf(searchValue [, fromIndex])

返回 searchValue 在 str 中第一次出现的索引值, 如果未找到则返回-1. 其中第二个可选参数默认值为 0, 如果 fromIndex 为负值则等同于传入了 0, 如果 fromIndex>=str.length, 则返回-1. 注意 indexOf 区分大小写.

```javascript
// result: 4
"red and blue.".indexOf("and");

// result: -1
"red and blue.".indexOf("and", 5);
```

## str.lastIndexOf(searchValue [, fromIndex])

返回 searchValue 在 str 中最后出现的位置, 如果未找到则返回-1. 第二个可选参数默认值为 str.length, 如果负数则被当做 0 处理, 如果大于 str.length 则被当做 str.length.

> 注意它是从后往前查找的,但是返回的 index 是从前往后的

```javascript
// result: 3
"canal".lastIndexOf("a");

// result: 1
"canal".lastIndexOf("a", 2);

// result: -1
"canal".lastIndexOf("a", 0);
```

## str.match(regexp)

当一个字符串与一个正则表达式匹配时, match()方法返回匹配信息, 如果未匹配到返回 null.

```javascript
// result: ["t", "w", "i", "c", "e"]
"twice".match(/[a-z]/g);

// result: ["t", index: 0, input: "twice", groups: undefined]
"twice".match(/[a-z]/);
```

## str.padEnd(targetLength [, padString])

用 padString 字符串填充 str, 返回填充后达到指定长度的字符串, 从当前字符串的末尾开始填充.

```javascript
// result: "abc   "
"abc".padEnd(6);

// result: "abc---"
"abc".padEnd(6, "-");
```

## str.padStart(targetLength [, padString])

用 padString 填充 str, 以便产生的字符串达到给定的长度, 填充从当前字符串的开始起.

```javascript
// result: "   abc"
"abc".padStart(6);

// result: "---abc"
"abc".padStart(6, "-");
```

## str.repeat(count)

构造并返回新的字符串,新字符串是 str 的 count 次连接,其中 count>=0

```javascript
// result: abcabcabc
"abc".repeat(3);

// result: ""
"abc".repeat(0);
```

## str.replace(regexp|substr, newSubStr|function)

返回由替换值替换之后的新字符串

```javascript
// result: "abc+abc"
"abc_123".replace(/_/, "+");

// result: "123 abc"
"abc_123".replace(/(\w+)_(\d+)/, "$2 $1");
```

## str.search(regexp)

使用 regexp 正则表达式来匹配,如果匹配成功返回索引, 否则返回-1

```javascript
// result: 0
"abc".search(/a/);

// result: -1
"abc".search(/e/);
```

## str.slice(beginSlice[, endSlice])

返回一个从原字符串中提取出来的新字符串

```javascript
// result: abc
"abc".slice(0);

// result: bc
"abc".slice(1);

// result: ""
"abc".slice(1, 1);

// result: b
"abc".slice(1, 2);
```

## str.split([separate[, limit]])

返回原字符串以分隔符出现位置分隔而成的一个数组, 第二个参数 limit 限定分隔的片段数量.

```javascript
// result: ["a", "b", "c"]
"a,b,c".split(",");
```

## str.substr(start[, length])

返回 str 从 start 位置开始长度为 length 的字符, 如果第二个参数省略会自动提取的 str 的末尾.

```javascript
// result: "bc"
"abc".substr(1);

// result: "a"
"abc".substr(0, 1);

// result: "b"
"abc".substr(1, 1);

// result: ""
"abc".substr(1, -1);

// result: "c"
"abc".substr(-1, 1);
```

## str.substring(indexStart[, indexEnd])

返回 str 字符串从 indexStart 索引开始到 indexEnd 索引之间的子字符串,不包括 indexEnd. 如果省略 indexEnd 则一直提取到字符串的末尾.

```javascript
// result: "b"
"abc".substring(1, 2);

// result: "bc"
"abc".substring(1);

// result: ""
"abc".substring(1, 1);
```

## str.toLowerCase()

将 str 转换为小写形式

## str.toUpperCase()

将 str 转换为大写形式

## str.toString()

返回指定对象的字符串形式, String 对象覆盖了 Object 对象的 toString 方法, 和`String.prototype.valueOf()`返回值一样.

```javascript
// result: "hello world"
new String("hello world").toString();
```

## str.valueOf()

返回一个 String 对象的原始值(primitive value), String 对象 toString 和 valueOf 返回值相同

```javascript
// result: hello world
new String("hello world").valueOf();
```

## str.trim()

删除 str 字符串两端的空白字符,空白字符包括(space,tab, ..)

```javascript
// result: hello world
" hello world   ".trim();
```

## str.trimLeft()

删除 str 字符串左端的空白字符

```javascript
// result: "hello world   "
" hello world   ".trimLeft();
```

## str.trimRight()

删除 str 字符串右端的空白字符

```javascript
// result: " hello world"
" hello world   ".trimRight();
```

## str[Symbol.iterator]

返回一个 Iterator 对象

```javascript
let generator = "abc"[Symbol.iterator]();
generator.next(); // {value: "a", done: false}
generator.next(); // {value: "b", done: false}
generator.next(); // {value: "c", done: false}
generator.next(); // {value: undefined, done: true}

// 使用for..of
for (let v of "abc") {
  console.log(v);
}
```

## String.raw `templateString`

返回给定模板字符串的原始字面量值

```javascript
// result: "Hi\n!"
String.raw`Hi\n!`;

const name = "bob";
// result: "hello, bob"
String.raw`hello, ${name}`;
```

---

## str.toLocaleLowerCase()

使用本地化的大小写映射规则将 str 转换为小写形式

## str.toLocaleUpperCase()

使用本地化的大小写映射规则将 str 转化成大写形式

## str.normalize([form])

按照指定的一种 Unicode 正规形式将当前字符串正规化

## referenceStr.localeCompare(compareString[, locale[, locale[, options]]])

TODO
