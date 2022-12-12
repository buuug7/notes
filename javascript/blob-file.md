# Blob & File

## BLOB

Blob 表示一个不可变,原始数据的类文件对象, 它的数据可以按照文本或者二进制格式进行读写, 也可以转换成 ReadableStream 来进行操作.

Blob 由一个可选的字符串 type（通常是 MIME 类型）和 blobParts 组成, blobParts 是 Blob/BufferSource/String 类型的值的数组。`Blob = type + blobParts`

arrayBuffer，Uint8Array 及其他 BufferSource 是“二进制数据”，而 Blob 则表示“具有类型的二进制数据”。

```
new Blob(blobParts, options);
```

```javascript
// 从字符串创建 Blob
let blob = new Blob(["<html>…</html>"], { type: "text/html" });

// 从类型化数组（typed array）和字符串创建 Blob
let hello = new Uint8Array([72, 101, 108, 108, 111]); // 二进制格式的 "hello"
let blob = new Blob([hello, " ", "world"], { type: "text/plain" });

// 读取 blob 中的数据
let reader = new FileReader();
reader.onload = function () {
  console.log(reader.result);
};
reader.readAsText(blob);
```

#### Blob 用作 URL

下载一个动态生成的内容为 hello world 的 Blob 的文件

```html
<a download="hello.txt" href="#" id="link">Download</a>
```

```javascript
let blob = new Blob(["Hello world"], { type: "text/plain" });
link.href = URL.createObjectURL(blob);
```

用 Javascript 动态创建一个链接，通过 link.click() 模拟一个点击，然后便自动下载了。

```javascript
let link = document.createElement("a");
link.download = "hello.txt";
let blob = new Blob(["Hello world"], { type: "text/plain" });
link.href = URL.createObjectURL(blob);
link.click();
URL.revokeObjectURL(link.href);
```

#### Blob 转换为 base64

URL.createObjectURL 的一个替代方法是，将 Blob 转换为 base64-编码的字符串。

```javascript
let link = document.createElement("a");
link.download = "hello.txt";

let blob = new Blob(["Hello world"], { type: "text/plain" });

let reader = new FileReader();
reader.readAsDataURL(blob);
reader.onload = function () {
  link.href = reader.result;
  link.click();
};
```

#### Image 转换为 blob

图像操作是通过 <canvas> 元素来实现的：

- 使用 canvas.drawImage 在 canvas 上绘制图像（或图像的一部分）。
- 调用 canvas 方法 .toBlob(callback, format, quality) 创建一个 Blob，并在创建完成后使用其运行 callback。

```javascript
let img = document.querySelector("img");

img.onload = function () {
  let canvas = document.createElement("canvas");
  canvas.width = img.clientWidth;
  canvas.height = img.clientHeight;

  let context = canvas.getContext("2d");
  context.drawImage(img, 0, 0);

  canvas.toBlob(function (blob) {
    let link = document.createElement("a");
    link.download = "example.png";
    link.href = URL.createObjectURL(blob);
    link.click();

    URL.revokeObjectURL(link.href);
  }, "image/png");
};
```

#### Blob 转换为 ArrayBuffer

```javascript
const blob = new Blob(["abc"], { type: "text/plain" });
blob.arrayBuffer().then((buffer) => {
  const view = new Uint8Array(buffer);

  for (const it of view) {
    console.log(it);
  }
});
```

#### Blob 转换为 Stream

当我们读取和写入超过 2 GB 的 blob 时，将其转换为 arrayBuffer 的使用对我们来说会更加占用内存。这种情况下，我们可以直接将 blob 转换为 stream 进行处理。stream 是一种特殊的对象，我们可以从它那里逐部分地读取（或写入）.

Blob 接口里的 stream() 方法返回一个 ReadableStream，在被读取时可以返回 Blob 中包含的数据。

```javascript
const blob = new Blob(["abc"], { type: "text/plain" });
const reader = blob.stream().getReader();

reader.read().then((it) => {
  console.log(it);
});
```

## File

File 接口基于 Blob, 继承了 Blob 功能并扩展 Blob, 使得它可以用来支持操作用户系统上的文件. File 对象是特殊类型的 Blob, 通常用来处理用户上传的文件.

```javascript
// fileParts 包含了 ArrayBuffer, Blob, DOMString 等对象的 Array
// fileName, 表示文件名称或者文件路径
new File(fileParts, fileName[, options]);
```

```html
<input type="file" onchange="showFile(this)" />

<script>
  function showFile(input) {
    let file = input.files[0];

    alert(`File name: ${file.name}`); // 例如 my.png
    alert(`Last modified: ${file.lastModified}`); // 例如 1552830408824
  }
</script>
```

## FileReader

FileReader 对象允许 Web 应用程序异步读取存储在用户计算机上的文件（或原始数据缓冲区）的内容，使用 File 或 Blob 对象指定要读取的文件或数据。

其中 File 对象可以是来自用户在一个`<input>`元素上选择文件后返回的 FileList 对象,也可以来自拖放操作生成的 DataTransfer 对象,

FileReader 仅用于以安全的方式从用户（远程）系统读取文件内容 它不能用于从文件系统中按路径名简单地读取文件。

```javascript
let reader = new FileReader(); // 没有参数
```

- readAsArrayBuffer(blob), 将数据读取为二进制格式的 ArrayBuffer。
- readAsText(blob, [encoding]), 将数据读取为给定编码（默认为 utf-8 编码）的文本字符串。
- readAsDataURL(blob), 读取二进制数据，并将其编码为 base64 的 data url。
- abort(), 取消操作。

read 方法的选择，取决于我们喜欢哪种格式，以及如何使用数据。

- readAsArrayBuffer, 用于二进制文件，执行低级别的二进制操作。对于诸如切片（slicing）之类的高级别的操作，File 是继承自 Blob 的，所以我们可以直接调用它们，而无需读取。
- readAsText, 用于文本文件，当我们想要获取字符串时。
- readAsDataURL, 当我们想在 src 中使用此数据，并将其用于 img 或其他标签时。正如我们在 Blob 一章中所讲的，还有一种用于此的读取文件的替代方案：URL.createObjectURL(file)。

读取过程中，有以下事件：

- loadstart —— 开始加载。
- progress —— 在读取过程中出现。
- load —— 读取完成，没有 error。
- abort —— 调用了 abort()。
- error —— 出现 error。
- loadend —— 读取完成，无论成功还是失败。
  读取完成后，我们可以通过以下方式访问读取结果：

- reader.result 是结果（如果成功）
- reader.error 是 error（如果失败）。

这是一个读取文件的示例：

```html
<input type="file" onchange="readFile(this)" />
<script>
  function readFile(input) {
    let file = input.files[0];

    let reader = new FileReader();
    reader.readAsText(file);

    reader.onload = function () {
      console.log(reader.result);
    };

    reader.onerror = function () {
      console.log(reader.error);
    };
  }
</script>
```
