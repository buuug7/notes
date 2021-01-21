# fs 模块常用方法

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
