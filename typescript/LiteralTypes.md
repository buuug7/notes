# 字面量类型 Literal Types

一个字面量类型是一个类型更具体的子类型. 例如"hello world" 是字符串类型,但是字符串类型并不一定是"hello world"


在Typescript中有两类字面量类型, string 和 number, 你可以精确的控制一个字符串或者数字的值通过使用字面量类型.


## 字面量收缩

使用const来声明不可变变量,使用 let来声明可变变量

```typescript
// typescript 会将helloWorld的类型设置为更具体的 "Hello World"类型, 而不是string类型
const helloWorld = "hello world";

// 由于let声明的变量会发生变化,编译器会将hiWorld声明为string
let hiWorld = "Hi world";
```

## 字符串字面量类型 String Literal Types

```typescript
type Easing = "ease-in" | "ease-out";

function createElement(tagName: 'img'): HTMLImageElement;
```

## 数字字面量类型

```typescript
interface MyConfig {
    size: 4 | 8 | 16;
    name: string;
} 
```