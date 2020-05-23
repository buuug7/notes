# Interface 接口

## 可选属性

带有可选属性的接口与普通的接口定义差不多，只是在可选属性名字定义的后面加一个?符号。

```typescript
interface Person {
  name?: string;
  age?: number;
}
```

## 只读属性

一些对象属性只能在对象刚刚创建的时候修改其值。 你可以在属性名前用 readonly 来指定只读属性

```typescript
interface Point {
  readonly x: number;
  readonly y: number;
}
```

`ReadonlyArray<T>`类型，与`Array<T>`类似，只是把所有可变方法去掉了。

## readonly vs const

最简单判断该用 readonly 还是 const 的方法是看要把它做为变量使用还是做为一个属性。 做为变量使用的话用 const，若作为属性则使用 readonly。

## 函数类型 Function Types

```typescript
interface SearchFunc {
  (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function (source: string, subString: string) {
  return source.search(subString) > -1;
};
```

## 可索引的类型

与使用接口描述函数类型差不多，我们也可以描述那些能够“通过索引得到”的类型，比如 a[10]或 ageMap["daniel"]。 可索引类型具有一个索引签名，它描述了对象索引的类型，还有相应的索引返回值类型。

```typescript
interface StringArray {
  [index: number]: string;
}

let myArray: StringArray;
myArray = ['apple', 'chrome'];
```

## 类类型: 实现接口

```typescript
interface Person {
  name: string;
  say(): void;
}

class Teacher implements Person {
  name: string = 'Alex';

  say(): void {
    console.log('some message');
  }
}
```

## 类类型：类静态部分与实例部分的区别

当一个类实现了一个接口时，只对其实例部分进行类型检查。 constructor 存在于类的静态部分，所以不在检查的范围内. 可以使用类表达式来实现对构造器的类型检测

```typescript
interface ClockConstructor {
  new (hour: number, minute: number);
}

interface ClockInterface {
  tick();
}

const Clock: ClockConstructor = class Clock implements ClockInterface {
  constructor(h: number, m: number) {}

  tick() {
    console.log('beep beep');
  }
};

const c = new Clock(1, 2);
c.tick();
```

## 继承接口

一个接口可以继承一个或者多个接口

```typescript
interface Person {
  name: string;
}

interface Aged {
  age: number;
}

interface Teacher extends Person, Aged {
  school: string;
}
```

## 混合类型

TODO

## 接口继承类

接口可以继承类，继承类的成员但不包括实现，类中 private 或者 protected 成员也会继承。但是对于继承了 private 或者 protected 的接口，只有其子类才能实现。
