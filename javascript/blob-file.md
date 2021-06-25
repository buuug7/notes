# Blob & File

## download file with createObjectURL

```javascript
const data = JSON.stringify({ name: "tom", age: 22 });
const blob = new Blob([data], { type: "application/json" });
const url = URL.createObjectURL(blob);

const link = document.createElement("a");
link.href = url;
link.setAttribute("download", "collect-new-english-words.json");
document.body.appendChild(link);
link.click();
document.body.removeChild(link);
```

## Blob

Blob 表示一个不可变,原始数据的类文件对象, 它的数据可以按照文本或者二进制格式进行读写, 也可以转换成 ReadableStream 来进行操作.

File 接口基于 Blob,继承了 Blob 功能并扩展 Blob,使得它可以用来支持操作用户系统上的文件.

```javascript
// 创建 Blob
const data = JSON.stringify({ name: "tom" });
const blob = new Blob([data], { type: "application/json" });

// 使用 Blob 创建一个指向类型化数组的URL
// "blob:https://developer.mozilla.org/a84a31a7-1f6c-49a8-b33f-e9637d3998e4"
const url = URL.createObjectURL(blob);

// 使用 FileReader 读取 Blob
const reader = new FileReader();
reader.addEventListener("loadend", () => {
  console.log(reader.result); // {"name":"tom"}
});
reader.readAsText(blob);

// 使用 Response 对象读取 Blob
new Response(blob).text().then((text) => {
  console.log(text); // {"name":"tom"}
});
```

## File

File 对象是特殊类型的 Blob, 通常用来处理用户上传的文件.

语法:

```javascript
// bits包含了 ArrayBuffer, Blob, DOMString等对象的Array
// name, USVString, 表示文件名称或者文件路径
new File(bits, name[, options]);
```

## FileReader

FileReader 对象允许 Web 应用程序异步读取存储在用户计算机上的文件（或原始数据缓冲区）的内容，使用 File 或 Blob 对象指定要读取的文件或数据。

其中 File 对象可以是来自用户在一个`<input>`元素上选择文件后返回的 FileList 对象,也可以来自拖放操作生成的 DataTransfer 对象,

FileReader 仅用于以安全的方式从用户（远程）系统读取文件内容 它不能用于从文件系统中按路径名简单地读取文件。

FileReader 读取图片并展示的例子:

```html
<input type="file" id="my-input" />
<img src="#" alt="upload img" style="width: 100%" />
```

```javascript
const input = document.querySelector("#my-input");
input.addEventListener("change", (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.addEventListener("loadend", () => {
    document.querySelector("img").src = reader.result;
  });
  reader.readAsDataURL(file);
});
```
