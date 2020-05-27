# Classes 类

## 例子

```typescript
class Person {
  name: string;
  constructor(name: string) {
    this.name = name;
  }

  say() {
    console.log(this.name);
  }
}

let person = new Person('Alex');
```

## 继承

```typescript
class Person {
  name: string;
  constructor(name: string) {
    this.name = name;
  }

  say() {
    console.log(this.name);
  }
}

class child extends Person {
  constructor(name: string) {
    super(name);
  }
  say() {
    console.log('child :' + this.name);
  }
}
```

## 公有，私有与受保护的修饰符

- 默认为 public,任何地方都可以访问类成员
- private，不能在申明它的类的外部使用
- protected，在派生类中可以使用


## ECMAScript Private Fields

```typescript
class Animal {
  #name: string;
  constructor(theName: string) {
    this.#name = theName;
  }
}

new Animal("cat").#name; // Property '#name' is not accessible outside class 'Animal' because it has a private identifier.
```

## readonly 修饰符

readonly 将属性设置为只读，只读属性必须在申明时或者构造函数里面才能初始化

```typescript
class Person {
  readonly name: string;
  constructor(name: string) {
    this.name = name;
  }
}
```

## 参数属性

把声明和赋值合并到一块。

```typescript
class Person {
  constructor(public name: string) {}

  say() {
    console.log(this.name);
  }
}

let person = new Person('Alex');
console.log(person.name); // Alex
```

## 存取器

通过 getters/setters 截取对对象成员的访问。

```typescript
class Person {
  private _name: string;

  get name() {
    return this._name;
  }

  set name(newName: string) {
    if (newName.length < 5) {
      throw new Error('name to short');
    }

    this._name = newName;
  }
}
```

## 静态属性

静态属性属于类，不属于类的实例

```typescript
class Person {
  static code = 100;
}

// 访问静态属性
Person.code; // 100
```

## 抽象类

抽象类作为其他派生类的基类来使用，一般不会直接被实例化。不同于接口，抽象类可以包含成员实现的细节。

抽象类中的抽象方法不能包含具体的实现，并且在派生类中必须实现。

```typescript
abstract class Person {
  abstract say(): void;

  run(): void {
    console.log('Run...');
  }
}

class Child extends Person {
  say(): void {
    console.log('say hello');
  }
}
```

## 把类当作接口使用

```typescript
class Person {
  name: string;
}

interface Personal extends Person {
  age: number;
}

const p: Personal = {
  name: 'alex',
  age: 22
};
```
