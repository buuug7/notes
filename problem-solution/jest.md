# Jest

## jest 支持 ESM

首先在 package.js 中添加

```json
{
  "type": "module"
}
```

然后类似于如下运行 tests

```bash
node --experimental-vm-modules node_modules/jest/bin/jest.js
```

## runTestByPath

```bash
node node_modules/jest/bin/jest.js --runTestsByPath path/to/some.test.js
```
