# nodejs notes

some useful notes about nodejs

## node addon

- https://blog.atulr.com/node-addon-guide/

## exports, module.exports

> https://stackoverflow.com/questions/7137397/module-exports-vs-exports-in-node-js

exports 是 module.exports 的简写， 你可以理解为， 在文件的开始处是这么定义

```javascript
var module = new Module(...);
var exports = module.exports;
```

当你从其他地方 `require` 该模块（文件）的时候，只有 `module.exports` 会被返回，而不是 `exports`

如果给 `exports` 赋值一个新的变量，那么 export 将不会指向 `module.exports`

```javascript
// 导出 hello
module.exports.hello = true;

// 不会导出 hello，因为 exports 被赋予一个新的对象，它不会在指向 module.exports
exports = { hello: true };
```

## node process gracefully terminate node 进程优雅退出

`process.exit(0)`会直接退出, 参数 0 代表成功退出. 如果指代这次退出是非正常退出, 可以传递 1.

```javascript
// process gracefully terminate
process.kill(process.pid, "SIGTERM");
```

## Node Error

Node.js 中所有的错误都继承于 Javascript 的 Error 类, 总共分成四类:

- 标准的 JavaScript 错误, 例如 `<RangeError>`, `<ReferenceError>`等.
- 由底层操作系触发的系统错误, 例如试图打开不存在的文件.
- 由应用程序代码触发的用户自定义的错误.
- AssertionError 是一个特定类型的错误, 通常用来表示断言失败. 这类错误通常来自 assert 模块.

## Event Loop

任何需要太长时间将控制权返回给事件循环的 JavaScript 代码都会阻塞页面中任何 JavaScript 代码的执行, 甚至阻塞 UI 线程, 导致用户无法进行其他操作. JavaScript 中几乎所有的 I/O 都是非阻塞的. 网络请求, 文件系统操作等. 这就是为什么 JavaScript 如此多地基于回调, 基于 promise 和 async/await.

#### the call stack 调用堆栈

调用堆栈是一个后进先出 LIFO (Last In, First Out) 的堆栈, 在执行栈空的时候事件循环不断检查调用堆栈以查看是否有任何需要运行的函数. 它会将找到的任何函数调用添加到调用堆栈中, 并按顺序执行每个调用.

#### The Message Queue 消息队列

当 setTimeout() 被调用时, 浏览器或 Node.js 启动计时器. 一旦计时器到期, 回调函数被放入消息队列. 事件循环优首先处理在调用栈中找到的所有东西, 一旦里面没有任何东西, 它就会去消息队列中取东西.

#### ES6 Job Queue 任务队列

ECMAScript 2015 引入了 Job Queue 的概念, 它被 Promises 使用. 这是一种尽快执行异步函数结果的方法, 而不是放在调用堆栈的末尾. promise.then 将 promise fulfilled 状态下的回调函数添加到 job queue 中. 等到主任务队列执行完成时, 然后在执行存在 job queue 队列中的回调函数.

## JavaScript 任务队列

js 中有三个任务队列: 主任务队列, job queue, message queue, 它们的优先级是: 主任务队列 > job queue > message queue. 每当要执行下一个任务前(或者一个任务完成后), js 会根据优先级询问各个任务队列是否为空, 一旦遇到非空任务队列时则取其第一个任务执行.

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
const file = require(". /path/to/file");
const somePackage = require("somePackage");
```

## 导出 exports or module.exports

> https://stackoverflow.com/questions/7137397/module-exports-vs-exports-in-node-js

你可以想象在你的文件的开头有类似的东西, 他们都指向同一个对象

```javascript
var module = new Module(...);
var exports = module.exports;
```

而最终会返回 `module.exports`, 而不是 exports

- module.exports = xxx 导出单个对象
- exports.xxx 导出具有多个属性的对象

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

## 图片 base64 互相转换

图片生产 base64

```javascript
const fs = require("fs");
const mime = "image/png";
const encoding = "base64";
const imageData = fs.readFileSync("/path/to/example.png").toString("base64");
const uri = `data:${mime};${encoding},${imageData}`;
```

base64 生成文件

```javascript
const fs = require("fs");
const uri = "data: image/png; base64, aGVsbG8...";
const buf = Buffer.from(uri.split(", ")[1], "base64");
fs.writeFileSync("/path/to/example.png", buf);
```

## events

The events module provides us the EventEmitter class, which is key to working with events in Node.js.

在 node.js 中可以使用 events 模块提供的 EventEmitter 类处理与事件相关的事情. 当 EventEmitter 对象发出一个事件时, 该特定事件附带的所有函数都会被同步调用.

```javascript
const { EventEmitter } = require("events");

const myEvent = new EventEmitter();

const f1 = (event) => console.log(`f1`, event);

// listen c1 event
myEvent.on("c1", f1);

// remove c1 listener associated with callback1 callback
myEvent.off("c1", f1);
// remove all listeners of named c1
myEvent.removeAllListeners("c1");

// emit c1 event
myEvent.emit("c1", "payload");
```

## OS 模块

- os.arch()
- os.cpus()
- os.endianness()
- os.freemem()
- os.totalmem()
- os.homedir()
- os.hostname()
- os.loadavg()
- os.networkInterfaces()
- os.platform()
- os.release()
- os.tmpdir()
- os.type()
- os.uptime()
- os.userInfo()

## 逐行

```javascript
const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Are you ok? ", (data) => {
  console.log("Answer: ", data);
  rl.close();
});
```

## TCP 客户端

net 模块用于创建基于流的 TCP 或 IPC 的服务器(net.createServer())与客户端(net.createConnection())

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
    console.log("Received Data: ", data.toString());
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
  console.log(`Server ready: `, socketServer.address());
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

## DNS 模块

dns 模块用于启用名称解析. 例如, 使用它来查找主机名的 IP 地址.

```javascript
const dns = require("dns");

dns.resolve("github.com", (err, addresses) => {
  if (err) throw err;
  console.log("addresses: ", addresses);
});
```

## path 模块

```javascript
const path = require("path");

// 返回路径的最后一部分. 第二个参数可以过滤掉文件扩展名
path.basename("/test/something"); //something
path.basename("/test/something.txt"); //something.txt
path.basename("/test/something.txt", ".txt"); //something

// 返回路径的目录部分:
path.dirname("/path/to/file.txt"); // /path/to

// 返回路径的扩展部分
path.extname("/path/to/file.txt"); // .txt

// 连接多个路径
path.join("/", "users", "joe", "notes.txt"); //'/users/joe/notes.txt'

// 当实际路径包含诸如 .或 .., 或双斜线的时候, 尝试将其转换为真实路径
path.normalize("/users/joe/. .//test.txt"); //'/users/test.txt'

// 将字符串路径解析成对象
// 返回如下的信息
// {
//   root: '/',
//   dir: '/users',
//   base: 'test.txt',
//   ext: '. txt',
//   name: 'test'
// }
path.parse("/users/test.txt");

// 接受 2 个路径作为参数. 根据当前工作目录, 返回从第一个路径到第二个路径的相对路径.
path.relative("/Users/joe", "/Users/joe/test.txt"); //'test.txt'
path.relative("/Users/joe", "/Users/joe/something/test.txt"); //'something/test.txt'

// 您可以使用 path.resolve() 获取相对路径的绝对路径计算

// if run from my home folder
// /Users/joe/joe.txt
path.resolve("joe.txt");

// if run from my home folder
// /Users/joe/tmp/joe.txt
path.resolve("tmp", "joe.txt");

// 如果第一个参数以斜杠开头, 则表示它是绝对路径:
///etc/joe.txt
path.resolve("/etc", "joe.txt");
```

## crypto 模块

crypto 模块提供了加密功能, 实现了包括对 OpenSSL 的哈希, HMAC, 加密, 解密, 签名, 以及验证功能的一整套封装.

sha256:

```javascript
const crypto = require("crypto");
// 创建使用 sha256 的哈希函数
const hash = crypto.createHash("sha256");

// 输入流编码: utf8, ascii, binary(默认)
hash.update("data");

// 输出编码: hex, binary, base64
const hashData = hash.digest("hex");
```

加盐(salt), 盐值就是随机数值, 用于在计算密码的哈希值时加强数据的安全性, 可以有效抵御诸如字典攻击, 彩虹表攻击等密码攻击媒介.

```javascript
const crypto = require("crypto");
const md5 = crypto.createHash("md5");
const cryptoData = md5.update("some data" + ":" + "salt").digest("hex");
```

HMAC 算法是一种基于密钥的报文完整性的验证方法, 其安全性是建立在 Hash 加密算法基础上的. 它要求通信双方共享密钥, 约定算法, 对报文进行 Hash 运算, 形成固定长度的认证码. 通信双方通过认证码的校验来确定报文的合法性。 HMAC 算法可以用来作加密、数字签名、报文验证等.(HMAC 和随机盐 Hash 算法非常像)

```javascript
const crypto = require("crypto");
const hash = crypto.createHmac("sha256", "some key").update("data").digest("hex");
```

加密(Cipher)和解密(Decipher)算法:

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

// 解密
const decipher = crypto.createDecipheriv(algorithm, key, iv);
decipher.setAuthTag(tag);
let decrypted = decipher.update(encrypted, "hex", "utf8");
decrypted += decipher.final("utf8");

console.log("decrypted", decrypted);
```

## process 进程

process 对象是一个全局变量, 提供了有关当前 Node.js 进程的信息并对其进行控制. 作为全局变量, 它始终可供 Node.js 应用程序使用, 无需使用 require(). 它也可以使用 `require("process")`
显式地访问:

- `process.env` 查看进程得环境变量
- `process.argv` 查看进程启动时候传入得参数 , 第一个元素是 process.execPath. 第二个元素是正被执行的 JavaScript 文件的路径. 其余的元素是任何额外的命令行参数.
- `process.cwd()` 查看进程的当前工作目录
- `process.execPath` 返回启动进程的可执行文件的绝对路径名
- `process.nextTick(cb)` 在 JavaScript 堆栈上的当前操作运行完成之后以及运行事件循环继续之前, 此队列会被调用. 效率比 setTimeout(fn, 0)更高, 执行顺序要早于 setTimeout.
- `process.exit(0); ` 同步地终止 nodejs 进程

当 nodejs 清空其事件循环并且没有其他工作要安排时, 会触发 'beforeExit' 事件

```javascript
process.on("beforeExit", (code) => {
  console.log("code: ", code);
});
```

#### spawn

`child_process.spawn()`方法使用给定的 command 衍生新的进程, 并传入 args 中的命令行参数. 如果省略 args, 则其默认为空数组.

```javascript
const cp = require("child_process");

const child = cp.spawn("node", ["-v"]);
child.stdout.pipe(process.stdout);

child.stdout.on("data", (data) => {
  console.log("data: ", data);
});
```

#### exec

衍生 shell, 然后在 shell 中执行 command, 并缓冲任何产生的输出. 传给 exec 函数的 command 字符串会被 shell 直接处理, 特殊字符(因 shell 而异)需要被相应地处理.

```javascript
const cp = require("child_process");

cp.exec("echo hello, world", (error, stdout) => {
  console.log(stdout);
});

cp.exec("ls -la", (error, stdout) => {
  console.log(stdout);
});
```

#### execFile

child_process.execFile() 函数类似于 child_process.exec(), 但默认情况下不会衍生 shell. 指定的可执行文件 file 会被直接衍生作为新的进程, 使其比 child_process.exec() 稍微更高效. 支持与 child_process.exec() 相同的选项. 由于没有衍生 shell, 因此不支持 I/O 重定向和文件通配等行为.

```javascript
const cp = require("child_process");

cp.execFile("node", ["-v"], (error, stdout) => {
  console.log(stdout);
});
```

#### fork

fork 方法会开发一个 IPC 通道, 不同的 Node 进程进行消息传送

```javascript
// parent.js
const cp = require("child_process");
const child = cp.fork(". /child.js");

// 给子进程发送消息
child.send("parent message");

// 监听子进程消息
child.on("message", (message) => {
  console.log("parent: ", message);
});

// child.js
process.on("message", (message) => {
  // 获取父进程得消息
  console.log("child: ", message);
});

// 给父进程发送消息
process.send("child message");
```

## node 线程

Node 进程占用了 7 个线程, 其中最核心的是 v8 引擎, 在 Node 启动后, 会创建 v8 的实例, 这个实例是多线程的

- 主线程: 编译, 执行代码
- 编译/优化线程: 在主线程执行的时候, 可以优化代码
- 分析器线程: 记录分析代码运行时间, 为 Crankshaft 优化代码执行提供依据
- 垃圾回收的几个线程

JavaScript 的执行是单线程的, 但 Javascript 的宿主环境, 无论是 Node 还是浏览器都是多线程的

## process.nextTick Promise

Node 执行完所有同步任务, 接下来就会执行 process.nextTick 的任务队列. 如果你希望异步任务尽可能快地执行, 那就使用 process.nextTick.

根据语言规格, Promise 对象的回调函数, 会进入异步任务里面的"微任务"(microtask)队列. 微任务队列追加在 process.nextTick 队列的后面, 也属于本轮循环.

Promise.resolve 跟 process.nextTick 返回得次序是无法预知得, 比如如下得例子,有可能是 2,3,1,3 或者 1,3,2,4

```javascript
process.nextTick(() => console.log(1));
Promise.resolve().then(() => console.log(2));
process.nextTick(() => console.log(3));
Promise.resolve().then(() => console.log(4));
// 执行结果
// 2
// 4
// 1
// 3

// 或者
// 1
// 3
// 2
// 4
```

## 一个标准的 node 回调示例

简而言之, 只要这几个关键点被满足, 其他一切都是可变的:

- 确保最后一个参数是一个回调函数;
- 当有错误发生时, 创建一个 Node Error 对象并将它作为回调函数的第一个参数返回;
- 如果没有错误, 就调用回调函数, 将 error 参数设为 null, 并传入相关数据;
- 回调函数必须在 process.nextTick()中被调用, 从而确保进程不被阻塞.

```javascript
function fib(n) {
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
    // 当有错误发生时, 创建一个 Node Error 对象并将它作为回调函数的第一个参数返回
    return cb(new Error("first arg missing"));
  }

  // 如果没有错误, 就调用回调函数, 将 error 参数设为 null, 并传入相关数据;
  // 回调函数必须在 process.nextTick()中被调用, 从而确保进程不被阻塞.
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
