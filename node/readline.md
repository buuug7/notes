# readline module

readline 模块提供了一个接口，可以一次一行地从可读流（如从 process.stdin）中读取数据.

```javascript
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(`What's your name?`, (text) => {
  console.log(`Hi, ${text}`);
  rl.close();
});
```

## line event

```javascript
rl.on("line", (input) => {
  console.log(`Received: ${input}`);
});
```

## read file line by line

```javascript
const readline = require("readline");
const fs = require("fs");

const rl = readline.createInterface({
  input: fs.createReadStream("./package-lock.json"),
});

rl.on("line", (line) => {
  console.log(`Line from file: ${line}`);
});
```
