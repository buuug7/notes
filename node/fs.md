# fs file system

该模块下面的所有方法都有同步 synchronous 和 异步 asynchronous 方式调用.

synchronous 同步方式调用:

```javascript
const fs = require("fs");

fs.writeFileSync("./my.txt", "hello world");
```

callback 方式:

```javascript
const fs = require("fs");

fs.writeFile("./my.txt", "hello world", (err) => {
  if (err) {
    console.log(err.message);
  }
  console.log("create successfully");
});
```

promise 方式:

```javascript
const fs = require("fs/promises");

async function createMyFile(path) {
  await fs.writeFile(path, "hello world1");
}

createMyFile("./my.txt").then(() => {});
```

## file path

文件路径可以是 string, Buffer, 或者使用 file 协议构建的 URL 对象

```javascript
// use URL linux based
fs.readFileSync(new URL("file:///home/buuug7/code/test-node/my.txt"));

// windows
// use URL with hostname buuug7-pc
fs.readFileSync(
  new URL("file://buuug7-pc/c:/Users/buuug7/code/test-node/my.txt")
);

// windows
// use URL without hostname
fs.readFileSync(new URL("file:///c:/Users/buuug7/code/test-node/my.txt"));
```

## File descriptor 文件描述符

每一个打开的文件都会在系统中维护一个文件描述符, 这个文件描述符通常都是一个数字. Node.js 屏蔽了不同系统实现的差异, 对每一个打开的文件赋予一个数字编号, 这个编号就是文件描述符.

```javascript
const file = fs.openSync("./my.txt", "r");
console.log(file); // 3
```

## fs.readdir

读取目录

```javascript
// 异步
fs.readdir("./dir1", function (err, files) {
  if (err) throw err;
  console.log(files);
});

// 同步
let files = fs.readdirSync("./dir1");
console.log(files);
```

## fs.mkdir

创建文件夹

```javascript
// 异步
fs.mkdir("./dir1", function (err) {
  if (err) throw err;
  console.log("make dir success");
});

// 同步
fs.mkdirSync("./dir2");
```

## fs.rmdir

删除文件夹

```javascript
// 异步
fs.rmdir("./dir1", function (err) {
  if (err) throw err;
  console.log("delete success");
});

// 同步
fs.rmdirSync("./dir2");
```

## fs.unlink

删除文件

```javascript
// 异步
fs.unlink("./a.txt", function (err) {
  if (err) throw err;
  console.log("success delete file");
});

// 同步
fs.unlinkSync("./b.txt");
```

## fs.readFile

读取文件

```javascript
// 异步
fs.readFile("./css.md", { encoding: "utf-8", flag: "r" }, function (err, data) {
  if (err) throw err;

  console.log(data);
});

fs.readFile("./css.md", "utf-8", function (err, data) {
  if (err) throw err;

  console.log(data);
});

// 同步
let data = fs.readFileSync("./css.md", "utf-8");
console.log(data);
```

## fs.writeFile

写入文件

```javascript
// 异步
fs.writeFile("./a.txt", "text more ..", function (err) {
  if (err) throw err;
  console.log(err);
});

// 同步
fs.writeFileSync("./b.txt", "some text");
```

## fs.read

```javascript
// 异步
fs.open("./dir1/css.md", "r", function (err, fd) {
  if (err) throw err;

  let buffer = new Buffer.alloc(255);

  fs.read(fd, buffer, 0, 10, 0, function (err, bytesRead, buffer) {
    if (err) throw err;
    console.log(bytesRead, buffer.slice(0, bytesRead).toString());

    fs.close(fd, function (err) {
      if (err) throw err;
    });
  });
});

// 同步
let fd = fs.openSync("./dir1/css.md", "r");
let buffer = new Buffer.alloc(255);
let bytesRead = fs.readSync(fd, buffer, 0, 10, 0);
console.log(buffer.slice(0, bytesRead).toString());
```

## fs.write

```javascript
// 异步
fs.open("./c.txt", "w", function (err, fd) {
  if (err) throw err;

  let buffer = new Buffer.alloc(11, "hello world");

  fs.write(fd, buffer, 0, 11, 0, function (err, bytesWritten, buffer) {
    if (err) throw err;

    console.log("write success");

    fs.close(fd, function (err) {
      if (err) throw err;
    });
  });
});

// 同步
let fd = fs.openSync("./d.txt", "w");
let buffer = new Buffer.alloc(11, "hello world");
fs.writeSync(fd, buffer, 0, 11, 0);
```
