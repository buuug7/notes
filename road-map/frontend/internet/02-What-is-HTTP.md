# What is HTTP

HTTP 代表超文本传输协议，它是一个无状态(意味着服务器在两个请求之间不保留任何数据（状态）)，应用层通信的协议，是现代 web 的基石。它是为 web 浏览器和 web 服务器之间的通信而设计的. 虽然通常基于 TCP/IP 层，但它可以用于任何可靠的传输层，即不丢失消息的协议.

## HTTP Basics

HTTP 允许在不同的主机跟客户端之间通信，并且支持混合的网络配置，因此 HTTP 协议是一个无状态协议，通信通常基于 TCP/IP，
不过任何可信的传输都可以使用 HTTP 协议来传输数据。TCP/IP 默认端口为 80 端口，但是其他端口也可以使用。

主机跟客户端交流通过一对 Request/Response 来完成，客户端发起一个 request，服务端会返回一个 response 来响应客户端的请求。
当前版本的协议是 HTTP/1.1，在 1.0 的基础上添加了 一些新的特性，包括 persistence connections(持久连接)，chunked transfer-coding(分块编码)
等等。

## 请求方法

URLs 指定我们想要通信的主机，具体执行什么动作由 HTTP Verbs 来指定。
请求的动词有:

- GET 获取一个存在的资源
- POST 创建一个新的资源
- PUT 更新一个存在的资源
- DELETE 删除一个存在的资源

以上的四个动词是最常用的，PUT 和 DELETE 有时候被认为是 POST 的特殊情况

不常用的动词还有:

- HEAD 类似于 GET ，但是没有消息体，经常用来获取服务器特定资源的 header，检查资源是否变动，比如时间戳。
- TRACE 回显服务器收到的请求，主要用于测试或诊断。
- OPTIONS 用于获取服务器的能力，这个方法可使服务器传回该资源所支持的所有 HTTP 请求方法。用'\*'来代替资源名称，向 Web 服务器发送 OPTIONS 请求，可以测试服务器功能是否正常运作。
- CONNECT HTTP/1.1 协议中预留给能够将连接改为隧道方式的代理服务器。通常用于 SSL 加密服务器的链接（经由非加密的 HTTP 代理服务器）。
- PATCH 用于将局部修改应用到资源。

## 状态码

所有 HTTP 响应的第一行都是状态行，依次是当前 HTTP 版本号，3 位数字组成的状态代码，以及描述状态的短语，彼此由空格分隔。客户端通过 URLs 和 Verbs 发送请求到服务器，服务器返回状态码和消息来响应客户端的请求.返回的状态码帮助客户端来解释服务器的响应.

状态代码的第一个数字代表当前响应的类型：

- 1xx 代表请求已经被接受，需要继续处理.这类响应是临时响应，只包含状态行和某些可选的响应头信息，并以空行结束.由于 HTTP/1.0 中未定义任何 1xx 状态码，一般情况下服务器禁止向客户端发送该类状态码。
- 2xx 代表请求已经被成功处理
  - `200 OK` 请求成功，请求所希望的响应头或者数据体将随此响应返回。
  - `202 Created` 代表接受请求，但是尚未处理，最终请求可能会也可能不会被执行。在异步操作下，没有比发送这个状态码更为合适的方法了。
  - `204 No Content` 服务器成功处理了请求，但不需要返回消息体(message body)。
  - `205 Reset Content` 服务器成功处理了请求，且没有返回任何内容。要求请求者重置文档视图
  - `206 Partial Content` 服务器成功处理了请求，响应中仅仅包含了部分内容，额外的头信息中包含了精确的 Range 和内容截止的信息，通常的下载工具比如迅雷使用此类响应实现断点续传
- 3xx 这类状态码代表客户端需要采取进一步的操作才能完成请求，通常用来重定向，后续的请求地址在本次响应的 location 域中指定
  - `301 Moved Permanently` 被请求的资源被永久移动到新位置了
  - `302 Moved Temporarily` 请求的资源临时从不同的 URI 响应请求
  - `303 See Other` 请求的响应可以在另一个 URI 上找到
  - `304 Not Modified` 服务器检查资源没有变动，客户端应该继续使用缓存的资源信息。这种通常是通过让客户端发送`ETag(Entity Tag)`的 hash 信息，与服务器上资源的 hash 信息比较来决定是否发送给状态码。
- 4xx 客户端错误, 用来告诉客户端自己可能发生了错误，妨碍了服务器的处理。比如请求一个不可用的资源或者发送一个坏请求。
  - `400 Bad Request` 请求无法被服务器理解
  - `401 Unauthorized` 请求需要被授权
  - `403 Forbidden` 服务器禁止访问资源
  - `404 Not Found` 请求的资源未被服务器发现
  - `405 Method Not Allowed` 指定的请求方法不能用于请求相应的资源。
  - `409 Conflict` 由于和被请求的资源的当前状态存在冲突，请求无法完成。比如客户端尝试修改资源的状态比客户端的时间戳还要新。该状态码通常发生在多个人用`PUT`请求更新一个资源。
- 5xx 服务器错误, 表名服务器在处理请求时发生错误或者异常

  - `500 Internal Server Error` 服务器遇到了一个未曾预料的状况，导致了它无法完成对请求的处理。比如服务端的源码出错时。
  - `501 Not Implemented` 服务器不支持当前请求需要的某个功能。当服务器无法识别请求的方法，并且无法支持其对任何资源的请求。
  - `503 Service Unavailable` 服务器不可用，比如服务器超负荷无法响应新来的请求导致请求超时

## URLs (统一资源定位符)请求消息是通过 Uniform Resource Locators(URLs)发送的

```
http://www.domain.com:1234/path/to/resource?a=b&x=y
protocol = http
host = www.domain.com
port = 1234
resource path = path/to/resource
query = a=b&x=y
```

## headers

#### Content-Type

用于指示资源的 MIME 类型 media type, 在请求中 (如 POST 或 PUT)，客户端告诉服务器实际发送的数据类型.或者服务端告诉客户端它实际发送的数据类型. [Content-Type](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Type)

```
Content-Type: text/html; charset=utf-8
Content-Type: multipart/form-data; boundary=something
```

#### Accept

Accept 请求头用来告知客户端可以处理的内容类型，这种内容类型用 MIME 类型来表示。借助内容协商机制, 服务器可以从诸多备选项中选择一项进行应用，并使用 Content-Type 应答头通知客户端它的选择。[Accept](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Content_negotiation#Accept_%E9%A6%96%E9%83%A8)

```
Accept: <MIME_type>/<MIME_subtype>
Accept: <MIME_type>/*
Accept: */*

// Multiple types, weighted with the quality value syntax:
Accept: text/html, application/xhtml+xml, application/xml;q=0.9, */*;q=0.8
```

#### Content-Encoding

用来告知客户端应该怎样解码才能获取在 Content-Type 中标示的媒体类型内容。[Content-Encoding](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Encoding)

```
Content-Encoding: gzip
Content-Encoding: compress
Content-Encoding: deflate
Content-Encoding: identity
Content-Encoding: br
```

## MIME(multipurpose internet mail extensions) 多用途 Internet 电子邮件扩展

多用途 Internet 邮件扩展（MIME）类型 是一种标准化的方式来表示文档的性质和格式。浏览器通常使用 MIME 类型（而不是文件扩展名）来确定如何处理文档；因此服务器设置正确以将正确的 MIME 类型附加到响应对象的头部是非常重要的。

MIME 的组成结构非常简单；由类型与子类型两个字符串中间用'/'分隔而组成。不允许空格存在。type 表示可以被分多个子类的独立类别。subtype 表示细分后的每个类型。

```
type/subtype
```

#### 常用的 MIME 类型

[常用的 MIME 类型](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/MIME_types#%E9%87%8D%E8%A6%81%E7%9A%84MIME%E7%B1%BB%E5%9E%8B)

- application/octet-stream
- text/plain
- text/css
- text/html
- application/javascript
- image/gif
- image/jpeg
- image/png
- image/svg+xml
- application/json
- multipart/form-data
- multipart/byteranges

## HTTP 访问控制（CORS）

跨域资源共享(Cross-origin resource sharing, 缩写CORS) 是一种机制，它使用额外的 HTTP 头来告诉浏览器 让运行在一个 origin (domain) 上的 Web 应用被准许访问来自不同源服务器上的指定的资源。当一个资源从与该资源本身所在的服务器不同的域、协议或端口请求一个资源时，资源会发起一个跨域 HTTP 请求。

出于安全原因，浏览器限制从脚本内发起的跨源 HTTP 请求。 例如，XMLHttpRequest 和 Fetch API 遵循同源策略。 这意味着使用这些 API 的 Web 应用程序只能从加载应用程序的同一个域请求 HTTP 资源，除非响应报文包含了正确 CORS 响应头。

跨域资源共享（ CORS ）机制允许 Web 应用服务器进行跨域访问控制，从而使跨域数据传输得以安全进行。现代浏览器支持在 API 容器中（例如 XMLHttpRequest 或 Fetch ）使用 CORS，以降低跨域 HTTP 请求所带来的风险。
