# buffer

buffer(缓冲区)指的是一块内存区域. nodeJs buffer 它代表在 V8 引擎之外分配的固定大小的内存块(无法调整大小). 你可以将缓冲区视为一个整数数组, 每个整数代表一个字节的数据. 缓冲区中的整数每个都代表一个字节，因此限制为 0 到 255（包括 0 到 255）的值

Buffer 对象用于表示固定长度的字节序列, Buffer 类是 JavaScript 的 Uint8Array 类的子类, Buffer 和字符串之间转换时, 可以指定字符编码. 如果未指定字符编码, 则将使用 UTF-8 作为默认值.

## why need buffer

引入 buffer 是为了帮助开发人员更高效的处理二进制数据.

## 创建 buffer

```javascript
// 使用字符串创建
const buf = Buffer.from("Hello world!");

// 基于一个buf创建一个新的buf
const buf2 = Buffer.from(buf);

// 创建 1kb 大小的 Buffer
const buf = Buffer.alloc(1024);

// 使用 ArrayBuffer
// abc
const buf2 = Buffer.from([97, 98, 99]);
```

## write buffer

```javascript
var buffer = Buffer.alloc(16);
buffer.write("Hello", "utf-8");

// or

buffer[0] = "i".charCodeAt(0);
```

## reading from buffer

```javascript
buffer.toString("utf-8");
buffer.toString("utf-8", 0, 3);
```

## 其他操作

```javascript
const buf = Buffer.from("hello");
// 访问单个元素
buf[0]; // 104

buf.toString(); // hello
buf.length; // 5

// 遍历
for (const item of buf) {
  console.log(item);
}

// 分割buffer
buf.subarray(1, 5); // ello

// isBuffer
Buffer.isBuffer(buf); // true

// byteLength
Buffer.byteLength(buf, "utf-8");

// copy
const copiedBuf = Buffer.alloc(5);
copiedBuf.set(buf);

// buffer slice
buf.slice(0, 3);
```
