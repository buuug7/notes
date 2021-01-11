# node

## package.json 中版本依赖通配符

- 指定版本：比如"classnames": "2.2.5"，表示安装 2.2.5 的版本
- 波浪号`~`指定版本：比如  "babel-plugin-import": "~1.1.0",表示安装 1.1.x 的最新版本（不低于 1.1.0），但是不安装 1.2.x，也就是说安装时不改变大版本号和次要版本号
- `^`指定版本：比如  "antd": "^3.1.4",，表示安装 3.1.4 及以上的版本，但是不安装 4.0.0，也就是说安装时不改变大版本号。

## 使用 axios 库下载文件

```javascript
async function downLoadFile(url, dir) {
  try {
    const fName = url.split("/").pop();
    const filePath = path.resolve(__dirname, dir, fName);
    const writer = fs.createWriteStream(filePath);
    const response = await axios({
      url: url,
      method: "get",
      responseType: "stream",
    });

    response.data.pipe(writer);
    return new Promise((resolve, reject) => {
      writer.on("finish", (e) => {
        console.log("finish", fName);
        resolve();
      });
      writer.on("error", (e) => {
        console.log("error:", e);
        console.log("error:", fName);
        reject();
      });
    });
  } catch (e) {
    console.error(e);
  }
}
```
