# Unicode

- http://www.ruanyifeng.com/blog/2014/12/unicode.html

Unicode 是将全世界所有的字符包含在一个集合里,计算机只要支持这个字符集,就能显示所有的字符,再也不会有乱码了.它从 0 开始,为每个符号指定一个编号,这叫做"码点"(code point).

Unicode 的最新版本是 7.0 版,一共收入了 109449 个符号,其中的中日韩文字为 74500 个, 全世界现有的符号当中,三分之二以上来自东亚文字

这么多符号, Unicode 不是一次性定义的,而是分区定义. 每个区可以存放 65536 个(2^16)字符, 称为一个平面(plane). 目前一共有 17 个(2^5)平面, 整个 Unicode 字符集的大小现在是 2^21.

最前面的 65536 个字符位, 称为基本平面(BMP), 它的码点范围是从 0 一直到 `2^16 - 1`,写成 16 进制就是从 `U+0000` 到 `U+FFFF`. 所有最常见的字符都放在这个平面,这是 Unicode 最先定义和公布的一个平面.

剩下的字符都放在辅助平面(缩写 SMP),码点范围从 `U+010000` 一直到 `U+10FFFF`.

## UTF-32

Unicode 只规定了每个字符的码点,到底用什么样的字节序表示这个码点,就涉及到编码方法.最直观的编码方法是,每个码点使用四个字节表示,字节内容一一对应码点.这种编码方法就叫做 UTF-32.比如,码点 0 就用四个字节的 0 表示,码点 597D 就在前面加两个字节的 0.

```
U+0000 = 0x0000 0000
U+597D = 0x0000 597D
```

UTF-32 的优点在于,转换规则简单直观,查找效率高.缺点在于浪费空间,同样内容的英语文本,它会比 ASCII 编码大四倍.这个缺点很致命,导致实际上没有人使用这种编码方法,HTML 5 标准就明文规定,网页不得编码成 UTF-32.

人们真正需要的是一种节省空间的编码方法,这导致了 UTF-8 的诞生.UTF-8 是一种变长的编码方法,字符长度从 1 个字节到 4 个字节不等.越是常用的字符,字节越短,最前面的 128 个字符,只使用 1 个字节表示,与 ASCII 码完全相同.

| 编号范围            | 字节 |
| ------------------- | ---- |
| 0x0000 - 0x007F     | 1    |
| 0x0080 - 0x07FF     | 2    |
| 0x0800 - 0xFFFF     | 3    |
| 0x010000 - 0x10FFFF | 4    |

## UTF-16

它的编码规则很简单:基本平面的字符占用 2 个字节,辅助平面的字符占用 4 个字节.也就是说,UTF-16 的编码长度要么是 2 个字节(U+0000 到 U+FFFF),要么是 4 个字节(U+010000 到 U+10FFFF).

于是就有一个问题,当我们遇到两个字节,怎么看出它本身是一个字符,还是需要跟其他两个字节放在一起解读?

说来很巧妙,我也不知道是不是故意的设计,在基本平面内,从 U+D800 到 U+DFFF 是一个空段,即这些码点不对应任何字符.因此,这个空段可以用来映射辅助平面的字符.

具体来说,辅助平面的字符位共有 220 个,也就是说,对应这些字符至少需要 20 个二进制位.UTF-16 将这 20 位拆成两半,前 10 位映射在 U+D800 到 U+DBFF(空间大小 210),称为高位(H),后 10 位映射在 U+DC00 到 U+DFFF(空间大小 210),称为低位(L).这意味着,一个辅助平面的字符,被拆成两个基本平面的字符表示.

## javascript 编码

JavaScript engines are free to use UCS-2 or UTF-16 internally. Most engines that I know of use UTF-16, but whatever choice they made, it's just an implementation detail that won't affect the language's characteristics.

The ECMAScript/JavaScript language itself, however, exposes characters according to UCS-2, not UTF-16.

JavaScript 语言采用 Unicode 字符集,但是只支持一种编码方法.这种编码既不是 UTF-16, 也不是 UTF-8, 更不是 UTF-32. JavaScript 用的是 UCS-2.

UTF-16 跟 UCS-2 两者的关系简单说, 就是 UTF-16 取代了 UCS-2, 或者说 UCS-2 整合进了 UTF-16. 所以, 现在只有 UTF-16, 没有 UCS-2.

由于 JavaScript 只能处理 UCS-2 编码, 造成所有字符在这门语言中都是 2 个字节, 如果是 4 个字节的字符, 会当作两个双字节的字符处理. JavaScript 的字符函数都受到这一点的影响, 无法返回正确结果. ECMAScript 6(ES6), 大幅增强了 Unicode 支持, 基本上解决了这个问题.

#### 正确识别字符

ES6 可以自动识别 4 字节的码点.因此,遍历字符串就简单多了.

```javascript
for (let s of string) {
  // ...
}
```

#### 码点表示法

JavaScript 允许直接用码点表示 Unicode 字符, 写法是"反斜杠 + u + 码点". 但是, 这种表示法对 4 字节的码点无效. ES6 修正了这个问题, 只要将码点放在大括号内, 就能正确识别.

```javascript
"好" === "\u597D"; // true
```

#### 字符串处理函数

ES6 新增了几个专门处理 4 字节码点的函数.

- String.fromCodePoint():从 Unicode 码点返回对应字符
- String.prototype.codePointAt():从字符返回对应的码点
- String.prototype.at():返回字符串给定位置的字符

#### 正则表达式

ES6 提供了 u 修饰符,对正则表达式添加 4 字节码点的支持.

```javascript
/^.$/u.test("𫟜"); // true
/^.$/.test("𫟜"); // false
```
