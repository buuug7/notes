# Fetch 相关

## Fetch

#### 基本用法

```javascript
async function getData() {
  let url = "https://api.github.com/repos/buuug7/notes/commits";
  let response = await fetch(url);

  // 获取json结果
  let data = await response.json();

  // 根据 name 获取 header
  const contentType = response.headers.get("Content-Type");

  // 迭代 header
  for (const it of response.headers) {
    console.log(it);
  }
}
```

#### 设置 request header

```javascript
fetch(url, {
  headers: {
    Authentication: "secret",
  },
});
```

#### POST 请求

如果请求的 body 是字符串，则 Content-Type 会默认设置为 text/plain;charset=UTF-8。但是，当我们要发送 JSON 时，我们会使用 headers 选项来发送 application/json

```javascript
fetch(url, {
  method: "POST",
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
});
```

#### 上传图片

```html
<canvas
  width="200"
  height="200"
  style="border:1px solid;"
  id="myCanvas"
></canvas>
<button id="submitBtn">submit</button>
<script>
  myCanvas.onmousemove = function (e) {
    let ctx = myCanvas.getContext("2d");
    ctx.lineTo(e.clientX, e.clientY);
    ctx.stroke();
  };

  async function submit() {
    const blob = await new Promise((resolve) =>
      myCanvas.toBlob(resolve, "image/png")
    );

    let url = "https://api.github.com/repos/buuug7/notes/commits";
    let response = await fetch(url, {
      method: "POST",
      body: blob,
    });

    let data = await response.json();
  }

  submitBtn.addEventListener("click", submit);
</script>
```

#### 其他

- response.status —— response 的 HTTP 状态码，
- response.ok —— HTTP 状态码为 200-299，则为 true。
- response.headers —— 类似于 Map 的带有 HTTP header 的对象。

获取 response body 的方法：

- response.text() —— 读取 response，并以文本形式返回 response，
- response.json() —— 将 response 解析为 JSON 对象形式，
- response.formData() —— 以 FormData 对象（multipart/form-data 编码，参见下一章）的形式返回 response，
- response.blob() —— 以 Blob（具有类型的二进制数据）形式返回 response，
- response.arrayBuffer() —— 以 ArrayBuffer（低级别的二进制数据）形式返回 response。

fetch 参数

- method —— HTTP 方法，
- headers —— 具有 request header 的对象（不是所有 header 都是被允许的）
- body —— 要以 string，FormData，BufferSource，Blob 或 UrlSearchParams 对象的形式发送的数据（request body）。

## FormData

```javascript
const formData = new FormData([form]);
```

如果提供了 HTML form 元素，它会自动捕获 form 元素字段。FormData 的特殊之处在于网络方法（network methods），例如 fetch 可以接受一个 FormData 对象作为 body。它会被编码并发送出去，带有 Content-Type: multipart/form-data。从服务器角度来看，它就像是一个普通的表单提交。

#### 带文件的表单

```html
<form id="myForm">
  <input type="text" name="name" value="twice" />
  <input type="text" name="age" value="18" />
  <input type="file" name="picture" accept="image/*" />
  <input type="submit" />
</form>
<script>
  myForm.onsubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:9991", {
      method: "POST",
      mode: "no-cors",
      body: new FormData(myForm),
    });

    const result = await response.text();
    console.log(result);
  };
</script>
```

#### 带 Blob 数据的表单

```html
<canvas
  id="myCanvas"
  width="100"
  height="80"
  style="border: 1px solid"
></canvas>
<input type="button" value="Submit" onclick="submit()" />

<script>
  myCanvas.onmousemove = function (e) {
    const ctx = myCanvas.getContext("2d");
    ctx.lineTo(e.clientX, e.clientY);
    ctx.stroke();
  };

  async function submit() {
    const imageBlob = await new Promise((resolve) =>
      myCanvas.toBlob(resolve, "image/png")
    );

    const formData = new FormData();
    formData.append("name", "twice");
    formData.append("image", imageBlob, "image.png");

    const response = await fetch("http://localhost:9991", {
      method: "POST",
      mode: "no-cors",
      body: formData,
    });

    const result = await response.text();
    console.log(result);
  }
</script>
```

#### 其他

FormData 对象用于捕获 HTML 表单，并使用 fetch 或其他网络方法提交。我们可以从 HTML 表单创建 new FormData(form)，也可以创建一个完全没有表单的对象，然后使用以下方法附加字段：

- formData.append(name, value)
- formData.append(name, blob, fileName)
- formData.set(name, value)
- formData.set(name, blob, fileName)
- formData.delete(name)
- formData.get(name)
- formData.has(name)

让我们在这里注意两个特点：

- set 方法会移除具有相同名称（name）的字段，而 append 不会。
- 要发送文件，需要使用三个参数的语法，最后一个参数是文件名，一般是通过 `<input type="file">` 从用户文件系统中获取的。
