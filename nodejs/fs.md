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

fs.writeFile("./my.txt", "hello world")
  .then((rs) => {
    console.log(rs);
  })
  .catch((err) => {
    console.log("err", err);
  });
```

## file system flags 文件系统标记

- `a`: 打开文件用来在追加信息, 如果不存在就创建.
- `ax`: 跟'a'类似, 但是路径如果存在就会报错.
- `a+`: 打开文件读取或者追加, 如果文件不存在就创建.
- `r`: 打开文件并读取, 如果文件不存在就会抛出异常.
- `r+`: 打开文件用来读取和写入, 如果文件不存在就会抛出异常.
- `w`: 打开文件并写入, 文件不存在就创建, 如果文件存在就会覆盖源文件.
- `wx`: 类似于 'w' 但是如果路径存在就会失败
- `w+`: 打开文件用来读和写. 如果文件不存在就会创建, 文件存在就会覆盖原文件.

```javascript
const fs = require("fs");
const fd = fs.openSync("./my.txt", "w");
fs.writeFileSync(fd, "hello world");

// or

fs.writeFileSync("./my.txt", "Hello world", {
  flag: "w",
});
```

## file path

文件路径可以是 string, Buffer, 或者使用 file 协议构建的 URL 对象

```javascript
// use URL linux based
// file://
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

## fs.Dir, fs.Dirent

fs.Dir 表示一个目录的 class， fs.Dirent 表示一个目录或者一个文件（从 fs.Dir 读取信息时返回的类型)。

```javascript
// 读取目录，遍历子目录，适合读取大目录，小的目录使用readdir
const fs = require("fs");

const dir = fs.opendirSync("./");
let subDir;
while (null !== (subDir = dir.readSync())) {
  console.log(`item name: ${subDir.name}`);
}

// 或者使用promise方式读取
async function print(path) {
  const dir = await fs.promises.opendir(path);
  for await (const subDir of dir) {
    console.log(subDir.name);
  }
}
print("./").then(() => {});
```

## 监听目录或者文件

```javascript
fs.watch("./src", (e, filename) => {
  // do something
});
```

## 监听文件 watchFile

```javascript
fs.watchFile("./myFile.txt", (curr, pre) => {});
```

## createReadStream

```javascript
const stream = fs.createReadStream("./myFile.txt");

let data = "";
stream.on("data", (chunk) => {
  data += chunk;
});

stream.on("end", () => {
  console.log(data);
});
```

## createWriteStream

```javascript
const writer = fs.createWriteStream("./name.txt");
for (let i = 0; i < 100; i++) {
  writer.write(`line ${i} \n`);
}
```

## 查看文件状态

- `fs.stat()`
- `fs.lstat()` 功能跟 fs.stat 一致，对待符号链接文件不同，只对符号链接本身进行状态检测，不涉及其指向的文件
- `fs.fstat()` 功能跟 fs.stat 一致，只是传参为文件描述符 fd

```javascript
fs.stat("./myFile.txt", (err, stats) => {
  console.log(stats);
});
```

## 检测用户对某个文件的访问权限 fs.access

```javascript
// check file is exists
fs.access("./myFile.txt", fs.constants.R_OK, (err) => {
  console.log(err);
});

// check file is writable
fs.access("./myFile.txt", fs.constants.W_OK, (err) => {
  console.log(err);
});
```

## fs.appendFile

往文件中追加更多内容，若文件不存在就会创建

```javascript
fs.appendFile("./myFile.txt", "some text", (err) => {
  if (err) {
    console.log(err);
  }
});
```

## 设置文件权限 mode

```javascript
// r = 4
// w = 2
// x = 1
// rw = 6
// rx = 5
// rwx = 7
// 三位八进制形式，第一位为所有者，第二位为所属用户组，第三位为其他用户组
fs.chmod("./myFile.txt", 0o666, (err) => {
  if (err) {
    console.log(err);
  }
});
```

## chown 设置文件属组

```javascript
// 将 myFile.txt 的拥有者设置为 root, 用户组设置为 root
// chown root:root ./myFile.txt
// 一般 root 用户的 uid 跟 gid 都为 0
fs.chown("./myFile.txt", 0, 0, (err) => {
  if (err) {
    console.log(err);
  }
});
```

或者使用

```javascript
var exec = require("child_process").exec;
exec("chown user:group filename");
```

## copyFile

复制文件,不是复制文件夹, 如果目标文件存在,默认会覆盖

```javascript
fs.copyFile("./my.txt", "./my2.txt", (err) => {
  console.log(err);
});
```

## existsSync

尽管 fs.exists 是被废弃了, 但是 existsSyn 仍旧推荐你使用, 返回 true 或者 false.

```javascript
const rs = fs.existsSync("./myFile.txt");
```

## 链接文件, 硬链接 link

```javascript
fs.link("./myFile.txt", "./myFile.link.txt", (err) => {
  console.log(err);
});
```

## mkdir 创建文件夹

创建文件夹, 如果递归创建,请设置 recursive 为 true

```javascript
fs.mkdir("dir1/dir2", { recursive: true }, (err, path) => {
  if (err) console.log(err);
});
```

## 创建临时文件夹 mkdtemp

```javascript
const fs = require("fs");
const os = require("os");
const path = require("path");

const tmpDir = os.tmpdir();

fs.mkdtemp(path.join(tmpDir, "foo-"), (error, dir) => {
  console.log(dir); // /tmp/foo-Dykxtb
});
```

## open 打开文件

返回文件描述符, 默认 flag 为'r'

```javascript
fs.open("./myFile.txt", "r", (err, fd) => {
  if (err) console.log(err);

  fs.readFile(fd, (err, buf) => {
    console.log(buf);
  });
});
```

## read

`fs.read(fd,[options,] callback)`, 这个是简化版的 read

```javascript
fs.open("./myFile.txt", "r", (err, fd) => {
  if (err) console.log(err);
  fs.read(fd, (err, bytesRead, buffer) => {
    console.log(buffer.toString());
  });
});

// 复杂版
fs.open("./myFile", "r", function (err, fd) {
  if (err) throw err;

  let buffer = new Buffer.alloc(255);

  fs.read(fd, buffer, 0, 10, 0, function (err, bytesRead, buffer) {});
});
```

## readdir 读取目录

读取目录

```javascript
// 异步
fs.readdir("./dir1", function (err, files) {
  console.log(files);
});
```

## readFile

读取文件

```javascript
fs.readFile("./myFile.txt", (err, data) => {
  console.log(data);
});

fs.readFile("./myFile.txt", { encoding: "utf-8", flag: "r" }, (err, data) => {
  console.log(data);
});
```

## realpath

返回真实 path 路径,绝对路径

```javascript
fs.realpath("./myFile.txt", (err, p) => {
  console.log(p);
});
```

## rename

重命名文件

```javascript
fs.rename("./myFile.txt", "myFile2.txt", (err) => {
  console.log(err);
});
```

## rmdir 删除文件夹

删除文件夹, 如果要递归删除, 请使用 `fs.rm(path, { recursive: true })` , 不建议使用 rmdir 的 recursive

```javascript
fs.rmdir("./dir1", (err) => {
  console.log(err);
});
```

## rm 删除文件夹或者文件

```javascript
fs.rm("./dir1", (err) => {
  console.log(err);
});

// 递归删除
fs.rm("./dir1", { recursive: true, force: true }, (err) => {
  console.log(err);
});
```

## 创建符号链接 symlink

```JavaScript
fs.symlink('./myFile.txt', './myFile.ln.txt', err => {
    console.log(err);
})
```

## 删除文件或者符号链接的文件

```javascript
fs.unlink("./myFile.txt", (err) => {});
```

## fs.writeFile

写入文件

```javascript
// 异步
fs.writeFile("./a.txt", "text more ..", function (err) {});
```

## fs.write

```javascript
// write with buffer
fs.open("./myFile.txt", "w", (err, fd) => {
  if (err) throw err;
  const data = Buffer.from("hello world");
  fs.write(fd, buffer, (err, bytesWritten, buf) => {});
});

// write with string
fs.open("./myFile.txt", "w", (err, fd) => {
  if (err) throw err;
  fs.write(fd, "hello world", (err, bytesWritten, buf) => {});
});
```
