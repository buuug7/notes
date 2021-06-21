# nodejs notes

some useful notes about nodejs

## Node Error

Node.js中所有的错误都继承于Javascript的Error类，总共分成四类：

+ 标准的 JavaScript 错误，例如 <RangeError>、<ReferenceError>等。
+ 由底层操作系触发的系统错误，例如试图打开不存在的文件。
+ 由应用程序代码触发的用户自定义的错误。
+ AssertionError 是一个特定类型的错误，通常用来表示断言失败。这类错误通常来自 assert 模块。

## Event Loop

任何需要太长时间将控制权返回给事件循环的 JavaScript 代码都会阻塞页面中任何 JavaScript 代码的执行，甚至阻塞 UI 线程, 导致用户无法进行其他操作。JavaScript 中几乎所有的 I/O
都是非阻塞的。网络请求、文件系统操作等。这就是为什么 JavaScript 如此多地基于回调，基于 promise 和 async/await。

#### the call stack 调用堆栈

调用堆栈是一个后进先出 LIFO (Last In, First Out) 的堆栈，事件循环不断检查调用堆栈以查看是否有任何需要运行的函数。它会将找到的任何函数调用添加到调用堆栈中，并按顺序执行每个调用。

#### The Message Queue 消息队列

当 setTimeout() 被调用时，浏览器或 Node.js 启动计时器。一旦计时器到期，回调函数被放入消息队列。 事件循环优首先处理在调用栈中找到的所有东西，一旦里面没有任何东西，它就会去消息队列中取东西。

#### ES6 Job Queue 任务队列

ECMAScript 2015 引入了 Job Queue 的概念，它被 Promises 使用。这是一种尽快执行异步函数结果的方法，而不是放在调用堆栈的末尾。promise.then 将 promise fulfilled
状态下的回调函数添加到 job queue 中。等到主任务队列执行完成时，然后在执行存在 job queue 队列中的回调函数。

## JavaScript 任务队列

js 中有三个任务队列：主任务队列，job queue，message queue， 它们的优先级是：主任务队列 > job queue > message queue。 每当要执行下一个任务前（或者一个任务完成后），js
会根据优先级询问各个任务队列是否为空，一旦遇到非空任务队列时则取其第一个任务执行。

## concat buffer chunk from readable stream

```javascript
const chunks = [];
for await (let chunk of readable) {
  chunks.push(chunk);
}
console.log(Buffer.concat(chunks));
```

## set node ENV

Ubuntu

```bash
NODE_ENV=production node app.js
```

docker

```docker
ENV NODE_ENV=whatEver
```

or

```
-e "NODE_ENV=production"
```

## install

install with [nvm](https://github.com/creationix/nvm)

## 导入 require(id)

- 内建模块直接从内存加载
- 文件模块通过文件查找定位到文件
- 包通过 package.json 里面的 main 字段查找入口文件

```javascript
const fs = require("fs");
const file = require("./path/to/file");
const somePackage = require("somePackage");
```

## 导出 exports or module.exports

- module.exports = xxx 导出单个对象
- exports.xxx 导出具有多个属性的对象

```javascript
module.exports = {
  name: "someName",
  hello () {
    console.log("hello world");
  },
};

// or
exports.name = "someName";
exports.hello = function () {
  console.log("hello world");
};
```

## `__dirname`, `__filename`

- `__dirname` 文件夹路径
- `__filename` 文件路径

## process

```javascript
// 查看 PATH
process.env.PATH;

// 获取命令行参数
process.argv;

// 设置 PATH
process.env.PATH = ":/some/path";
```

## Buffer

Buffer 对象用于表示固定长度的字节序列, 许多 Node.js API 支持缓冲区。Buffer 类是 JavaScript 的 Uint8Array 类的子类, 并使用涵盖其他用例的方法对其进行扩展。Buffer 类在全局范围内,
因此不需要使用 `require('buffer')`.

Buffer 和字符串之间转换时, 可以指定字符编码. 如果未指定字符编码, 则将使用 UTF-8 作为默认值.

```javascript
const buf1 = Buffer.from("hello", "utf-8");
console.log(buf1); // <Buffer 68 65 6c 6c 6f>
console.log(buf1.toString()); // hello
console.log(buf1.toString("hex")); // 68656c6c6f
console.log(buf1.toString("base64")); // aGVsbG8=

const buf2 = Buffer.from([97, 98, 99]);
console.log(buf2.toString()); // abc
```

图片生产 base64

```javascript
const fs = require("fs");
const mime = "image/png";
const encoding = "base64";
const imageData = fs.readSync("/path/to/example.png").toString("base64");
const uri = `data:${mime};${encoding},${imageData}`;
```

base64 生成文件

```javascript
const fs = require("fs");
const uri = "data:image/png;base64,aGVsbG8...";
const buf = Buffer.from(uri.split(",")[1], "base64");
fs.writeFileSync("/path/to/example.png", buf);
```

## events

Node.js 核心 API 的大部分都基于惯用的异步事件驱动的体系结构，在该体系结构中，某些类型的对象（称为“发射器”）发出命名事件，会触发对象的监听器。

例如：net.Server 对象当有一个新连接时会触发一个事件; 打开文件时, fs.ReadStream 会发出事件.

所有发出事件的对象都是 EventEmitter 类的实例。这些对象暴露 eventEmitter.on（）函数，该函数允许将一个或多个函数附加到该对象发出的命名事件。通常，事件名称是驼峰式的字符串，但是可以使用任何有效的
JavaScript 属性键。

当 EventEmitter 对象发出一个事件时，该特定事件附带的所有函数都会被同步调用。被调用的侦听器返回的任何值都将被忽略并丢弃。

```javascript
const EventEmitter = require("events").EventEmitter;

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

// 如果使用 ES6 箭头函数, this将不会指向 EventEmitter 实例
myEmitter.on("someEvent", function (...args) {
  console.log("someEvent accurred");
  console.log(args); // [ 'a', 'b' ]
  console.log(this);
});

// 错误处理
myEmitter.on("error", (err) => {
  console.error("some error");
});

myEmitter.emit("someEvent", "a", "b");
```

## stream

流是用于在 Node.js 中处理流数据的抽象接口。流模块提供用于实现流接口的 API . Node.js 提供了许多流对象, 例如, 对 HTTP 服务器的请求和 process.stdout 都是流实例.
流可以是可读的，可写的，或两者均可. 所有流都是 EventEmitter 的实例.

Node.js 中有四种基本流类型:

- 可写: 可向其写入数据的流, 例如，fs.createWriteStream()。
- 可读: 可从中读取数据的流, 例如 fs.createReadStream()。
- 双工: 既可读又可写的流, 例如 net.Socket
- 转换: 双工流, 可以在写入和读取数据时修改或转换数据, 例如 zlib.createDeflate()。

Node.js API 创建的所有流都仅在字符串和 Buffer(或 Uint8Array)对象上运行。但是, 流实现可以与其他类型的 JavaScript 值一起使用(null 除外, 它在流中具有特殊目的).
这样的流被认为以“对象模式”操作.

```javascript
const http = require("http");
const fs = require("fs");

// 如果不使用流, 会读取文件的全部内容，并在完成后调用回调函数
// 如果文件很大，则该操作将花费大量时间。
const serve = http.createServer((req, res) => {
  fs.readFile(__dirname + "data.txt", (err, data) => {
    res.end(data);
  });
});
serve.listen(3000);

// 如果使用流, 我们没有等待直到文件被完全读取
// 而是在准备好要发送的大量数据后立即开始将其流式传输到 HTTP 客户端
const server2 = http.createServer((req, res) => {
  const stream = fs.createReadStream(__dirname + "/data.txt");
  stream.pipe(res);
});
server2.listen(3000);
```

自定义可读流:

```javascript
const stream = require("stream");

class MyReader extends stream.Readable {
  constructor (options) {
    super(options);
    this.count = 0;
  }

  _read () {
    if (this.count <= 100) {
      this.count += 1;
      this.push(String(Math.random() * 100));
    } else {
      this.push(null);
    }
  }
}

const myReader = new MyReader();

myReader.on("data", (data) => {
  console.log(data);
});
```

自定义可写流:

```javascript
const stream = require("stream");

const myWriter = new stream.Writable({
  write (chunk, encoding, callback) {
    process.stdout.write(chunk + "\n");
    callback();
  },
});

myWriter.write("a");
myWriter.write("b");
myWriter.end();
```

从可读流获取数据: 使用可写流读取可读流

```javascript
const stream = require("stream");
const readableStream = new stream.Readable({
  read (size) {},
});
const writableStream = new stream.Writable({
  write (chunk, encoding, callback) {
    console.log(chunk);
    callback();
  },
});

readableStream.pipe(writableStream);

readableStream.push("a");
readableStream.push("b");
```

## FS

使用 fs 模块可以按照在标准 POSIX 函数上建模的方式与文件系统进行交互。

所有文件的操作均支持使用同步,异步,以及 promise 风格方式的调用.

```javascript
const fs = require("fs");

// 异步
fs.readFile("/path/to/file.txt", (err, data) => {
  if (err) throw err;
  console.log(data);
});

// 同步
fs.readFileSync("/path/to/file.txt");

// promise
(async function () {
  const data = await fs.promises.readFile("/path/to/file.txt");
  console.log(data);
})();
```

#### File paths

大多数 fs 操作接受使用 file：协议以字符串，Buffer 或 URL 对象的形式指定的文件路径。

```javascript
const fs = require("fs");
// string
fs.readFileSync("/path/to/file.txt");

// Buffer
fs.readFileSync(Buffer.from("/path/to/file.txt"));

// URL
fs.readFileSync(new URL("file:///tmp/file.txt"));
fs.readFileSync(new URL("file:///c:/tmp/file.txt")); // windows
```

#### 监视文件和文件夹

```javascript
const fs = require("fs");
// 推荐使用
fs.watch("/path/to/dirOrFile", () => {
  // do something ...
});

// 不推荐使用
fs.watchFile("/path/to/dirOrFile", () => {
  // do something ...
});
```

#### 逐行

```javascript
const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Are you ok?", (data) => {
  console.log("Answer:", data);
  rl.close();
});
```

#### FS 常用 API

- fs.copyFile
- fs.mkdir
- fs.rmdir
- fs.unlink
- fs.watch
- fs.read
- fs.write
- fs.open
- fs.close
- fs.openDir
- fs.rename

## TCP 客户端

net 模块用于创建基于流的 TCP 或 IPC 的服务器（net.createServer()）与客户端（net.createConnection()）

```javascript
const net = require("net");

const server = net.createServer((client) => {
  console.log(`Client connected`);
  client.on("end", () => {
    console.log("client disconnected");
  });

  setInterval(() => {
    client.write(`Some random data: ${Math.random()}`);
  }, 1000);
});

server.listen(8001, () => {
  console.log("Server started on port 8001");

  const client = net.connect({ port: 8001, host: "localhost" });
  client.on("data", (data) => {
    console.log("Received Data:", data.toString());
  });
});
```

## UDP socket

文件发送例子

```javascript
// 创建 server 监听 42000 端口
const dgram = require("dgram");
const socketServer = dgram.createSocket("udp4");

socketServer.on("message", (msg) => {
  process.stdout.write(msg.toString());
});

socketServer.on("listening", () => {
  console.log(`Server ready:`, socketServer.address());
});

socketServer.bind(42000);

// 创建 client 发送文件
const dgram = require("dgram");
const fs = require("fs");

const inputStream = fs.createReadStream("/path/to/file");
const socket = dgram.createSocket("udp4");

inputStream.on("readable", () => {
  let message;

  // 每次读取 16 个字节并发送给服务端
  while ((message = inputStream.read(16)) && message) {
    socket.send(message, 42000, "localhost");
  }
});
```

## HTTP

为了支持所有可能的 HTTP 应用程序，Node.js 的 HTTP API 都是非常底层的。 它仅进行流处理和消息解析。 它将消息解析为消息头和消息主体，但不会解析具体的消息头或消息主体。

```javascript
const http = require("http");

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "text/plain");
  res.write("Hello world");
  res.end();
});

server.listen(8001, () => {
  console.log(`Listening on port 8001`);
});
```

使用 http get 请求数据

```javascript
const https = require("https");

https.get("https://httpbin.org/ip", (res) => {
  const { statusCode, headers, rawHeaders } = res;
  let error;

  if (statusCode !== 200) {
    error = new Error(`request failed with statusCode: ${statusCode}`);
  }

  if (error) {
    console.log(error.message);
    res.resume();
    return;
  }

  res.setEncoding("utf8");
  let rawData = "";
  res.on("data", (chunk) => {
    rawData += chunk;
  });

  res
    .on("end", () => {
      const parsedData = JSON.parse(rawData);
      console.log("parsedData", parsedData);
    })
    .on("error", (e) => {
      console.error(`failed: ${e.message}`);
    });
});
```

使用 http request 请求数据

```javascript
const https = require("https");

const options = {
  hostname: "httpbin.org",
  path: "/post",
  protocol: "https:",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

const request = https.request(options, (res) => {
  const { statusCode, headers, rawHeaders } = res;

  let error;

  if (statusCode !== 200) {
    error = new Error(`request failed with statusCode: ${statusCode}`);
  }

  if (error) {
    console.error(error.message);
    res.resume();
    return;
  }

  res.setEncoding("utf8");

  let rawData = "";
  res.on("data", (chunk) => {
    rawData += chunk;
  });

  res.on("end", () => {
    console.log("result: ", JSON.parse(rawData));
  });
});

const postData = {
  id: 999,
  value: "content",
};

request.write(JSON.stringify(postData));

// 必须始终调用 req.end() 来表示请求的结束，即使没有数据被写入请求主体
request.end();
```

## DNS 模块

dns 模块用于启用名称解析。 例如，使用它来查找主机名的 IP 地址。

```javascript
const dns = require("dns");

dns.resolve("github.com", (err, addresses) => {
  if (err) throw err;
  console.log("addresses: ", addresses);
});
```

## crypto 模块

crypto 模块提供了加密功能，实现了包括对 OpenSSL 的哈希、HMAC、加密、解密、签名、以及验证功能的一整套封装。

sha256:

```javascript
const crypto = require("crypto");
// 创建使用 sha256 的哈希函数
const hash = crypto.createHash("sha256");

// 输入流编码：utf8、ascii、binary（默认）
hash.update("data");

// 输出编码：hex、binary、base64
const hashData = hash.digest("hex");
```

hmac: 用于创建加密 Hmac 摘要的工具

```javascript
const crypto = require("crypto");
const hash = crypto
  .createHmac("sha256", "some key")
  .update("data")
  .digest("hex");
```

加盐(salt), 盐值就是随机数值，用于在计算密码的哈希值时加强数据的安全性，可以有效抵御诸如字典攻击、彩虹表攻击等密码攻击媒介。

```javascript
const crypto = require("crypto");
const md5 = crypto.createHash("md5");
const cryptedData = md5.update("some data" + "some salt").digest("hex");
```

加密（Cipher）和解密（Decipher）算法:

```javascript
const crypto = require("crypto");

const password = "my password";
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);
const algorithm = "aes-256-gcm";

// 加密
const cipher = crypto.createCipheriv(algorithm, key, iv);
let encrypted = cipher.update(password, "utf8", "hex");
encrypted += cipher.final("hex");
const tag = cipher.getAuthTag();

console.log("encryped", encrypted);

const decipher = crypto.createDecipheriv(algorithm, key, iv);
decipher.setAuthTag(tag);
let decrypted = decipher.update(encrypted, "hex", "utf8");
decrypted += decipher.final("utf8");

console.log("decrypted", decrypted);
```

## process 进程

process 对象是一个全局变量，提供了有关当前 Node.js 进程的信息并对其进行控制。 作为全局变量，它始终可供 Node.js 应用程序使用，无需使用 require()。 它也可以使用 `require("process")`
显式地访问：

- `process.env` 查看进程得环境变量
- `process.argv` 查看进程启动时候传入得参数 , 第一个元素是 process.execPath。 第二个元素是正被执行的 JavaScript 文件的路径。 其余的元素是任何额外的命令行参数。
- `process.cwd()` 查看进程的当前工作目录
- `process.execPath` 返回启动进程的可执行文件的绝对路径名
- `process.exit()` 同步地终止进程
- `process.nextTick(cb)` 在 JavaScript 堆栈上的当前操作运行完成之后以及运行事件循环继续之前, 此队列会被完全耗尽. 效率比 setTimeout(fn, 0)更高，执行顺序要早于
  setTimeout，在主逻辑的末尾任务队列调用之前执行。
- `process.exit(0);` 同步地终止 nodejs 进程

当 nodejs 清空其事件循环并且没有其他工作要安排时，会触发 'beforeExit' 事件

```javascript
process.on("beforeExit", (code) => {
  console.log("code:", code);
});
```

#### exec

衍生 shell，然后在 shell 中执行 command，并缓冲任何产生的输出。 传给 exec 函数的 command 字符串会被 shell 直接处理，特殊字符（因 shell 而异）需要被相应地处理.

```javascript
const cp = require("child_process");

cp.exec("echo hello,world", (error, stdout) => {
  console.log(stdout);
});
```

#### execFile

child_process.execFile() 函数类似于 child_process.exec()，但默认情况下不会衍生 shell。 指定的可执行文件 file 会被直接衍生作为新的进程，使其比
child_process.exec() 稍微更高效。支持与 child_process.exec() 相同的选项。 由于没有衍生 shell，因此不支持 I/O 重定向和文件通配等行为。

```javascript
const cp = require("child_process");

cp.execFile("node", ["-v"], (error, stdout) => {
  console.log(stdout);
});
```

#### spawn

`child_process.spawn()`方法使用给定的 command 衍生新的进程，并传入 args 中的命令行参数。 如果省略 args，则其默认为空数组。通过流可以使用有大量数据输出的外部应用，节约内存.

```javascript
const cp = require("child_process");

const child = cp.spawn("node", ["-v"]);
child.stdout.pipe(process.stdout);
```

#### fork

fork 方法会开发一个 IPC 通道，不同的 Node 进程进行消息传送

```javascript
// parent.js
const cp = require("child_process");
const child = cp.fork("./child.js");
// 给子进程发送消息
child.send("parent message");
// 获取子进程发送得消息
child.on("message", (message) => {
  console.log("parent: ", message);
});

// child.js
process.on("message", (message) => {
  // 获取父进程得消息
  console.log("child: ", message);

  // 给父进程发送消息
  process.send("child message");
});
```

## node 线程

Node 进程占用了 7 个线程, 其中最核心的是 v8 引擎，在 Node 启动后，会创建 v8 的实例，这个实例是多线程的

- 主线程：编译、执行代码
- 编译/优化线程：在主线程执行的时候，可以优化代码
- 分析器线程：记录分析代码运行时间，为 Crankshaft 优化代码执行提供依据
- 垃圾回收的几个线程

JavaScript 的执行是单线程的，但 Javascript 的宿主环境，无论是 Node 还是浏览器都是多线程的

## process.nextTick Promise

Node 执行完所有同步任务，接下来就会执行 process.nextTick 的任务队列。如果你希望异步任务尽可能快地执行，那就使用 process.nextTick。

根据语言规格，Promise 对象的回调函数，会进入异步任务里面的”微任务”（microtask）队列。微任务队列追加在 process.nextTick 队列的后面，也属于本轮循环。

```javascript
process.nextTick(() => console.log(1));
Promise.resolve().then(() => console.log(2));
process.nextTick(() => console.log(3));
Promise.resolve().then(() => console.log(4));
// 执行结果
// 1
// 3
// 2
// 4
```

## 一个标准的 node 回调示例

简而言之，只要这几个关键点被满足，其他一切都是可变的：

- 确保最后一个参数是一个回调函数；
- 当有错误发生时，创建一个 Node Error 对象并将它作为回调函数的第一个参数返回；
- 如果没有错误，就调用回调函数，将 error 参数设为 null，并传入相关数据；
- 回调函数必须在 process.nextTick()中被调用，从而确保进程不被阻塞。

```javascript
function fib (n) {
  if (n < 2) {
    return n;
  }

  return fib(n - 1) + fib(n - 2);
}

const Obj = function () {};

Obj.prototype.doSomething = function (arg1) {
  // 确保最后一个参数是一个回调函数
  const cb = arguments[arguments.length - 1];

  if (!arg1) {
    // 当有错误发生时，创建一个 Node Error 对象并将它作为回调函数的第一个参数返回
    return cb(new Error("first arg missing"));
  }

  // 如果没有错误，就调用回调函数，将 error 参数设为 null，并传入相关数据；
  // 回调函数必须在 process.nextTick()中被调用，从而确保进程不被阻塞。
  process.nextTick(() => {
    const data = fib(arg1);

    cb(null, data);
  });
};

const t = new Obj();
t.doSomething(3, (err, value) => {
  if (err) {
    console.log(err);
  } else {
    console.log("value=", value);
  }
});
```
