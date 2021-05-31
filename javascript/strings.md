# JavaScript String

JavaScript 中集中字符串

## String

String 对象是一个用于字符串或一个字符序列的构造函数. 可以使用字符串字面量或者 String 构造函数来声明一个字符串.

## DOMString

DOMString 是一个 UTF-16 字符串. 由于 JavaScript 已经使用了这样的字符串, 所以 DOMString 直接映射到 一个 String. 当一个 Web API 接收一个 DOMString, 接收的值会字符串化(
stringified).

它是 DOM 接口对 UTF-16 字符串的独立实现. JavaScript 字符串已经是 UTF-16 字符串, 因此任何 JavaScript 字符串也是 DOMString 的实例. 该接口适用于默认情况下不将字符串实现为 UTF-16
序列的实现, 因此如果需要, 它们可以实现单独的类型以映射到 DOMString. 正如规范所述, 需要独立于实现的接口的原因是"确保互操作性". 为什么叫 DOMString?大概是因为它与 DOM 有关. 它与 DOM 有什么关系?因为它是
DOM 标准的一部分.

## USVString

USVString 是一系列 Unicode 标量值. 此定义与 DOMString 或 JavaScript String 类型的定义不同, 因为它始终代表适合于文本处理的有效序列, 而后者可以包含代理代码点. USVString
类型通常在执行文本处理的 API 中找到, 而 DOMString 由大多数其他 API 使用.

当 USVString 提供给 JavaScript 时, 它会映射到 JavaScript 原始字符串`String`, 其 Unicode 标量值序列采用 UTF-16 编码.

当 Web API 接受 USVString 时,提供的值首先被字符串化(与 DOMString 的方式相同). 然后通过将任何未配对的代理代码单元替换为 Unicode 替换字符 `U+FFFD`也就是`(�)`, 将生成的字符串进一步转换为
USVString.

## CSSOMString

CSSOMString 用于表示 CSSOM 规范中的字符串数据, 可以指代 DOMString 或 USVString. 当规范说 CSSOMString 时, 取决于浏览器供应商选择使用 DOMString 还是 USVString. 当规范说
CSSOMString 时, 在内部使用 UTF-8 来表示内存中字符串的浏览器实现可以使用 USVString, 但已经将字符串表示为 16 位序列的实现可能会选择使用 DOMString.

## Binary strings

JavaScript 字符串是使用 UTF-16 编码的, 这就意味着每一个码元需要两个字节, 它总共有 65535 个码点. 其中 ASCII 编码的码点不超过 127, 而二进制字符串跟 ASCII 编码类似,它的码点不超过 255.

有个函数`btoa()`, 其参数就为二进制字符串格式.

随着 Web 应用程序变得越来越强大(对音频,视频操作, 使用 WebSockets 访问原始数据等功能), 让 JavaScript 高效操作二进制数据变得迫在眉睫, 这也就是为啥引入二进制字符串格式的原因了.

以前, 操作二进制必须通过对字符串的操作来模拟, 使用`charCodeAt()`既慢又容易出错. 现在有 TypedArray 来对二进制进行高效的操作.
