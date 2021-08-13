# TypedArray 类型化数组

类型化数组描述了二进制缓冲区视图. 大部分普通数组的方法在 TypedArray 也同样适用, 详情参考
MDN [TypedArray](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray)

```javascript
new TypedArray();
new TypedArray(length);
new TypedArray(typedArray);
new TypedArray(object);
new TypedArray(buffer [, byteOffset [, length
]])
;

// 其中TypedArray是下面的一种之一
Int8Array / Uint8Array / Uint8ClampedArray
Int16Array / Uint16Array
Int32Array / Uint32Array
Float32Array / Float64Array
```

```javascript
const int8 = new Int8Array(3);
int8[0] = 21;
console.log(int8[0]); // 21

// 使用
const d1 = Int8Array.from([1, 2, 3]);
const d2 = Int8Array.of(1, 2, 3);
```

| 类型              | 范围                    | 大小 byte | 描述                                     |
| ----------------- | ----------------------- | --------- | ---------------------------------------- |
| Int8Array         | -128 to 127             | 1         | 8 位有符号二进制整数                     |
| Uint8Array        | 0 to 255                | 1         | 8 位无符号二进制整数, 超出后从另一边循环 |
| Uint8ClampedArray | 0 to 255                | 1         | 8 位无符号二进制整数, 超出后为边界值     |
| Int16Array        | -32768 to 32767         | 2         | 16 位有符号二进制整数                    |
| Uint16Array       | 0 to 65535              | 2         | 16 位无符号二进制整数                    |
| Int32Array        | -2^31 to 2^31-1         | 4         | 32 位有符号二进制整数                    |
| Uint32Array       | 0 to 2^32-1             | 4         | 32 位无符号二进制整数                    |
| Float32Array      | 1.2x10^-38 to 3.4x10^38 | 4         | 32 位 IEEE 浮点数                        |
| Float64Array      | 5x10^-324 to 1.8x10^308 | 8         | 64 位 IEEE 浮点数                        |

## ArrayBuffer

ArrayBuffer 对象用来表示通用的, 固定长度的原始二进制缓冲区, 它是一个字节数组, 不能直接操作 ArrayBuffer 的内容, 而是通过类型数组(TypedArray)或者 DataView 来操作.

```javascript
const buffer = new ArrayBuffer(3);
const view = new Int8Array(buffer);
view[0] = 32;
view[1] = 33;
view[2] = 34;
console.log(view); // Int8Array(3)[32, 33, 34]
```

## DataView

DataView 视图可以操作 ArrayBuffer 对象的底层接口.

```javascript
// 语法
// buffer为 ArrayBuffer
new DataView(buffer [, byteOffset [, byteLength
]])
```

```javascript
const buffer = new ArrayBuffer(3);
const view = new DataView(buffer, 0);

view.setInt8(0, 11);
view.setInt8(1, 12);
view.setInt8(2, 13);
console.log(view.getInt8(1)); // 12
```
