# Functions 函数

## 书写完成函数类型

```typescript
let myAdd: (x: number, y: number) => number = function(
  x: number,
  y: number
): number {
  return x + y;
};
```

## 可选参数和默认参数 Optional and Default Parameters

可选参数必须跟在必须参数后面, 可选参数使用`?`来标记

```typescript
function buildName(firstName: string, lastName?: string) {
  if (lastName) {
    return firstName + ' ' + lastName;
  } else {
    return firstName;
  }
}
```

与可选参数不一样，带默认值的默认参数不必要跟在必须参数后面。如果带默认值的参数出现在必须参数前面，用户必须明确的传入`undefined`值来获得默认值。

```typescript
function buildName(firstName: string, lastName = 'smith') {
  return firstName + ' ' + lastName;
}

buildName('buuug7'); // buuug7 smith
buildName('buuug7', undefined); // buuug7 smith
buildName('buuug7', 'twice'); // buuug7 twice
```

## 剩余参数 Rest Parameters

```typescript
function buildName(firstName: string, ...restName: string[]) {
  return firstName + ' ' + restName.join(' ');
}

buildName('Alex', 'Twice', 'Job'); // Alex Twice Job
```

## this 跟箭头函数 this and arrow function

箭头函数保存函数创建时的 this 值，而不是调用时的值。

## 重载 Overloads

```typescript
function printName(x: string): string;
function printName(x: object): string;

function printName(x): any {
  if (typeof x === 'object') {
    console.log(x.name);
  } else if (typeof x === 'string') {
    console.log(x);
  }
}

printName({ name: 'Alex' }); // Alex
printName('Twice'); // Twice
```
