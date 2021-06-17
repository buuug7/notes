# HTTP

为了支持所有可能的 HTTP 应用程序，Node.js 的 HTTP API 都是非常底层的。 它仅进行流处理和消息解析。 它将消息解析为消息头和消息主体，但不会解析具体的消息头或消息主体。

## http.Agent

Agent 对 TCP 连接进行了池化管理。简单的情况下，客户端发送一个 HTTP 请求之前，首先建立一个 TCP 连接，收到响应后会立刻关闭 TCP 连接。但是我们知道 TCP 的三次握手是比较耗时的。所以如果我们能复用 TCP 连接，在一个 TCP 连接上发送多个 HTTP 请求和接收多个 HTTP 响应，那么在性能上面就会得到很大的提升。Agent 的作用就是复用 TCP 连接。不过 Agent 的模式是在一个 TCP 连接上串行地发送请求和接收响应，不支持 HTTP PipeLine 模式。

```javascript
http.get(
  "http://localhost:3000",
  {
    agent: new http.Agent({
      keepAlive: true,
    }),
  },
  (res) => {
    // connection: 'keep-alive',
    // 'keep-alive': 'timeout=5',
    console.log(res.headers);
  }
);
```

## http.ClientRequest

An http.ClientRequest object is created when http.request() or http.get() is called.

```javascript
const http = require("http");

const req = http.request(
  {
    host: "localhost",
    port: 3000,
    path: "/",
  },
  (res) => {
    let data = "";
    res.on("data", (chunk) => {
      data += chunk;
    });

    res.on("end", () => {
      console.log(data);
    });
  }
);

req.end();
```

## http.Server

```javascript
const server = http.createServer((req, res) => {
  // req is instance of http.IncomingMessage

  // res is instance of http.ServerResponse
  res.write("hello world");
  res.end();
});
server.listen(3000);
```

## http.ServerResponse

Created by an http.Server and passed as the second parameter to the request event it fires.

## http.IncomingMessage

The http.IncomingMessage object is created by:

- http.Server when listening to the request event
- http.ClientRequest when listening to the response event

## 样例

使用 https.get 请求数据

```javascript
const https = require("https");

https.get("https://httpbin.org/ip", (res) => {
  const { statusCode, headers, rawHeaders } = res;
  let error;

  if (statusCode !== 200) {
    error = new Error(`request failed with statusCode: ${statusCode}`);
  }

  if (error) {
    console.log(error.message);
    res.resume();
    return;
  }

  res.setEncoding("utf8");
  let rawData = "";
  res.on("data", (chunk) => {
    rawData += chunk;
  });

  res
    .on("end", () => {
      const parsedData = JSON.parse(rawData);
      console.log("parsedData", parsedData);
    })
    .on("error", (e) => {
      console.error(`failed: ${e.message}`);
    });
});
```

使用 http request 请求数据

```javascript
const https = require("https");

const options = {
  hostname: "httpbin.org",
  path: "/post",
  protocol: "https:",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

const request = https.request(options, (res) => {
  const { statusCode, headers, rawHeaders } = res;

  let error;

  if (statusCode !== 200) {
    error = new Error(`request failed with statusCode: ${statusCode}`);
  }

  if (error) {
    console.error(error.message);
    res.resume();
    return;
  }

  res.setEncoding("utf8");

  let rawData = "";
  res.on("data", (chunk) => {
    rawData += chunk;
  });

  res.on("end", () => {
    console.log("result: ", JSON.parse(rawData));
  });
});

const postData = {
  id: 999,
  value: "content",
};

request.write(JSON.stringify(postData));

// 必须调用 req.end() 来表示请求的结束，即使没有数据被写入请求主体
request.end();
```
