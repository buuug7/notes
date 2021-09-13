# stream 流

流是支持 Node.js 应用程序的基本概念之一. 流可以高效的处理读/写文件, 网络通信或任何类型的端到端信息交换. 流并不是 Node.js 独有的概念. 它们是几十年前在 Unix 操作系统中引入的, 程序可以通过管道运算符 `|` 传递流来相互交互.

例如, 在传统方式中, 当读取文件时, 整个文件会读入内存, 然后在对其进行处理. 使用流你可以一块一块地读取它, 而无需把整个文件载入内存.

流是 NodeJs 中处理流式数据的抽象接口, 流模块提供了构建所有流 API 的基础. 流可以是可读的, 可写的, 或者可读可写的. 所有的流都是 EventEmitter 的实例.

## why stream

- 内存效率: 无需让整个数据全部加载到内存后才可以处理, 流可以让你一块一块读取数据
- 时间效率: 开始处理数据所需的时间更少, 因为你可以立即开始处理数据而无需等到整个数据全部加载完毕

## stream example

```javascript
const fs = require("fs");
const http = require("http");

const server = http.createServer((req, res) => {
  const data = fs.createReadStream(__dirname + "/data.txt");
  data.pipe(res);
});

server.listen(3000);
```

## NodeJs 中有四种基本流类型

- Writable - 可写入数据的流(例如 fs.createWriteStream()).
- Readable - 可读取数据的流(例如 fs.createReadStream()).
- Duplex - 可读又可写的流(例如 net.Socket).
- Transform - 类似于 Duplex, 但是在读写过程中可以转换数据的(例如 zlib.createDeflate()).

可写流和可读流都会在内部的缓冲器中存储数据, 可缓冲的数据大小取决于传入流构造函数的 highWaterMark 选项. 对于普通流, highWaterMark 指定了字节的总数. 对于对象模式的流, highWaterMark 指定了对象的总数.

当调用 stream.push(chunk) 时, 数据会缓冲在可读流中. 如果流的消费者没有调用 stream.read(), 则数据会保留在内部队列中直到被消费. 一旦内部的可读缓冲的总大小达到 highWaterMark 指定的阈值时, 流会暂时停止从底层资源读取数据, 直到当前缓冲的数据被消费 (也就是说, 流会停止调用内部的用于填充可读缓冲的 `readable._read()`).

当调用 writable.write(chunk) 时, 数据会被缓冲在可写流中. 当内部的可写缓冲的总大小小于 highWaterMark 设置的阈值时, 调用 writable.write() 会返回 true.
一旦内部缓冲的大小达到或超过 highWaterMark 时, 则会返回 false.

## 创建一个可读流

基于 class 的写法有些繁琐, 下面统一使用构造器创建比较简洁

```javascript
let count = 1;
const reader = new stream.Readable({
  read(size) {
    if (count < 10) {
      this.push(`${count}`);
      count++;
    }
  },
});

reader.on("data", (chunk) => {
  console.log(chunk);
});
```

## 创建可写流

```javascript
const stream = require("stream");

const writer = new stream.Writable({
  write(chunk, encoding, callback) {
    process.stdout.write(`stdout: ${chunk}`);
    callback();
  },
});

writer.write("hello world");
```

## 如何读取可读流

使用 data 事件读取

```javascript
readable.on("data", (chunk) => {
  // read
});
```

使用 read() 方法读取

```javascript
let str;

while(str !(str = readable.read())) {
  // console.log(str);
  // read data to str variable
}
```

使用**可写流**读取可读流

```javascript
readable.pipe(writable);
```

例如使用 process.stdout 可写流把 reader 可读流中的数据打印到控制台

```javascript
const stream = require("stream");

let count = 1;
const reader = new stream.Readable({
  read(size) {
    if (count < 10) {
      this.push(`${count}`);
      count++;
    }
  },
});

reader.pipe(process.stdout);
```

## 创建一个转换流

例如对写入的 'hello world' 转换为大写字母

```javascript
const stream = require("stream");

const toUppercase = new stream.Transform({
  transform(chunk, encoding, callback) {
    const upper = chunk.toString().toUpperCase();
    callback(null, upper);
  },
});

toUppercase.write("hello world");
toUppercase.on("data", (chunk) => {
  console.log(chunk.toString()); // HELLO WORLD
});
```
