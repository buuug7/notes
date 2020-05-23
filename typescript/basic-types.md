# Basic Types 基本类型

## boolean 布尔类型

```typescript
let isDone: boolean = false;
```

## number 数字

```typescript
let n: number = 9;
let m: number = 0x123456;
```

## string 字符串

```typescript
let name: string = 'twiceMan';
```

## Array<T> or T[] 数组，其中 T 为类型

```typescript
let list: number[] = [1, 2, 3];

let list2: Array<number> = [1, 2, 3];
```

## Tuple 元组

元组类型表示一个已知元素数量和类型得数组

```typescript
let x: [string, number];
x = ['count', 22];
```

## enum 枚举

```typescript
enum Color {
  Red,
  Green,
  Blue,
}

let c: Color = Color.Blue;
```

## any 任意值

```typescript
let notSure: any = 123;
```

## void 空值

表示没有任何类型，当一个函数没有返回值时，通常会返回 void。声明一个 void 类型得标量通常没有什么作用，因为你只能为它赋值`undefined`, `null`

```typescript
let unUsable: void = undefined;
let unUsable: void = null;
```

## undefined, null

`undefined` 和 `null` 各自有自己得类型叫做 `undefined` 和 `null`。和 `void` 一样，本身用处不大。

默认情况下 `null` 和 `undefined` 时所有类型得子类型。

## never

never 表示哪些永远不存在得值得类型。例如，never 类型是哪些总是抛出异常或者根本就不会有返回值得函数表达式或箭头函数表达式返回值类型，never 类型是任何类型的子类型，可以赋给任何类型。然而没有类型是 never 的子类型或可以赋值给 never 类型（除了 never 类型本身）。即使 any 类型也不行。

```typescript
// 返回never的函数必须存在无法到达的终点
function error(message: string): never {
  throw new Error(message);
}

// 返回never的函数必须存在无法到达的终点
function infiniteLoop(): never {
  while (true) {}
}
```

## Object

object 表示非原始类型，也就是除了 `number, string, boolean, symbol, null, undefied` 之外的类型。

## 类型断言

通过类型断言这种方式可以告诉编译器，“相信我，我知道自己在干什么”。类似与其他语言里面的类型转换。类型断言的两种写法：

尖括号

```typescript
let someValue: any = 'this is string';
let strLength: number = (<string>someValue).length;
```

as 语法

```typescript
let someValue: any = 'this is string';
let strLength: number = (someValue as string).length;
```
