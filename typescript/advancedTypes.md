# Advanced Types

## Type Guards and Differentiating Types 类型守卫和类型区分

```typescript
let pet = getSmallPet();

// 使用类型断言 type assertion
if ((pet as Fish).swim) {
  (pet as Fish).swim();
} else if ((pet as Bird).fly) {
  (pet as Bird).fly();
}
```

## User-Defined Type Guards 用户自定义类型守卫

类型守卫是一个在运行时执行检测的表达式以确保在一定范围内的类型有效.

#### Using type predicates 使用类型预测

```typescript
function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}

// 使用
if (isFish(pet)) {
  pet.swim();
} else {
  pet.fly();
}
```

#### Using the `in` operator

`in`操作符用来缩小类型范围

```typescript
function move(pet: Fish | Bird) {
  if ('swim' in pet) {
    return pet.swim();
  }
  return pet.fly();
}
```

#### typeof type guards

`typeof` 类型守卫只接受两种不同的形式:

- `typeof v === 'typename'`
- `typeof v !== 'typename'`

其中 `typename`必须是:

- `number`
- `string`
- `boolean`
- `symbol`

#### `instanceof` type guards

`instanceof` 类型守卫是通过构造器来缩小类型范围

```typescript
let animal: Animal = getRandomAnimal();

if (animal instanceof AnimalCat) {
  animal; // type narrowed to 'AnimalCat'
}

if (animal instanceof AnimalDog) {
  animal; // type narrowed to 'AnimalDog'
}
```

## Nullable Types 可空类型

Typescript 有两种特殊类型, `null` 和 `undefined`, 它们的值分别为 `null` 和 `undefined`, 默认类型检测器认为`null`和`undefined`可以赋给任何类型.

使用`--strictNullChecks`标记可以改变这种默认行为, 在声明变量的时候可是使用联合类型让其显式的赋予`null`或`undefined`.

```typescript
let s = 'foo';
s = null; // error, 'null' is not assignable to 'string'
let sn: string | null = 'bar';
sn = null; // ok
```

#### Optional Parameter and properties

开启`--strictNullChecks`, 一个可选参数会自动添加支持`undefined`类型

可选参数

```typescript
function f(x: number, y?: number) {
  return x + (y || 0);
}
f(1, 2);
f(1);
f(1, undefined);
f(1, null); // error, 'null' is not assignable to 'number | undefined'
```

可选属性

```typescript
class C {
  a: number;
  b?: number;
}
let c = new C();
c.a = 12;
c.a = undefined; // error, 'undefined' is not assignable to 'number'
c.b = 13;
c.b = undefined; // ok
c.b = null; // error, 'null' is not assignable to 'number | undefined'
```

## Type guards and type assertions 类型守卫和类型断言

自从 `nullable` 类型可以被联合类型来实现, 你可以使用类型守卫来排除 `null`

```typescript
function f(sn: string | null): string {
  return sn || 'default';
}
```

万一编译器不能够排除 `null` 和 `undefined`的时候, 可以使用类型断言操作符手动来规避, 使用`identifier!` 来移除 `null` 和 `undefined`.

```typescript
let name = someVar!.length;
```

## Type Aliases 类型别名

类型别名创建一个类型的别名, 跟接口类似, 但是类型别名可以是基本类型,联合类型,元组类型等. 类型别名不会创建一个新的类型, 只是创建了一个指向那个类型的新名字.

```typescript
type Cat = Animal & { purrs: true };
```

类型别名跟接口类似,但是也有细微的差别, 多数情况下尽可能去使用接口, 如果你用接口无法描述一个类型(对象形状), 你可以使用联合或者元组类型,然后在使用类型别名.

## String Literal Types 字符串字面量类型

字符串字面量类型允许你精确的指定一个字符必须要具有的值.

```typescript
type Easing = 'ease-in' | 'ease-out' | 'ease-in-out';
```

## Numeric Literal Types 数字字面量类型

```typescript
function rollDice(): 1 | 2 | 3 | 4 | 5 | 6 {
  return Math.floor(Math.random() * 5) as 1 | 2 | 3 | 4 | 5 | 6;
}
```

## Enum Member Types 枚举成员类型

当所有枚举成员是字面量初始化的,那么枚举成员具有类型.

## Discriminated Unions 可辨识联合类型

可以通过合并单例类型, 联合类型, 类型守卫和类型别名来撞见一个叫做**可辨识**联合的高级模式.其要具备 3 个要素:

- 具有普通的单例类型属性 - 可辨识的特征
- 一个类型别名包含了那些类型的联合 - 联合
- 此属性上的类型守卫

```typescript
interface Square {
  kind: 'square';
  size: number;
}

interface Rectangle {
  kind: 'rectangle';
  width: number;
  height: number;
}

interface Circle {
  kind: 'circle';
  radius: number;
}
```

首先我们声明了要联合的接口, 每个接口都有`kind` 属性但有不同的字符串字面量类型, kind 属性被称作**可辨识**的特装或标签.其他的属性则特定于各个接口. 下面将其联合到一起:

```typescript
type Shape = Square | Rectangle | Circle;
```

现在我们使用可辨识联合:

```typescript
function area(s: Shape) {
  switch (s.kind) {
    case 'square':
      return s.size * s.size;
    case 'rectangle':
      return s.height * s.width;
    case 'circle':
      return Math.PI * s.radius ** 2;
  }
}
```

如果没有涵盖所有可辨识联合的情形时, 想让编译器通知我们错误, 有两种方式可以实现:

- 启用 `--strictNullChecks`并指定一个返回值
- 使用`never`类型,编译器用它来进行完整性检测

## Polymorphic this types 多态 this 类型

多态 this 类型表示的是某个包含类或接口的子类型,被称作 F-bounded 多态性,这会让流式接口调用风格很容易实现

```typescript
class BasicCalculator {
  public constructor(protected value: number = 0) {}

  public currentValue(): number {
    return this.value;
  }

  public add(operand: number): this {
    this.value += operand;
    return this;
  }

  public multiply(operand: number): this {
    this.value *= operand;
    return this;
  }
}

let v = new BasicCalculator(2).multiply(5).add(1).currentValue();
```

由于这个类使用了 this 类型, 你可以继承它, 新的类可以直接使用之前的方法,而不用做任何改变

```typescript
class ScientificCalculator extends BasicCalculator {
  public constructor(value = 0) {
    super(value);
  }

  public sin() {
    this.value = Math.sin(this.value);
    return this;
  }
}

let v2 = new ScientificCalculator(2).multiply(5).sin().add(1).currentValue();
```

## Index Types 索引类型

使用索引类型, 编译器就能够检查使用了动态属性名的代码. javascript 常用模式中从对象中选取属性的子集是这样的

```typescript
function pluck(o, names) {
  return names.map((n) => o[n]);
}
```

使用 Typescript, 通过索引类型查询和索引访问操作符:

```typescript
function pluck<T, K extends keyof T>(o: T, names: K[]): T[K][] {
  return names.map((n) => o[n]);
}

interface Person {
  name: string;
  age: number;
}

let person: Person = {
  name: 'Jarid',
  age: 35,
};

let strings: string[] = pluck(person, ['name']); // ok, string[]
```

其中`keyof`为索引类型查询操作符, `T[K]`为索引访问操作符

## Mapping Types 映射类型

例如将已知类型的每个属性转变为可选或者只读属性,都可以通过 Typescript 提供的映射类型来完成, Typescript 提供了从旧类型中创建新类型的一种方式**映射类型**

```typescript
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

type Partial<T> = {
  [P in keyof T]?: T[P];
};

// 转换
type PersonPartial = Partial<Person>;
type ReadonlyPerson = Readonly<Person>;
```

这个语法描述的是类型而非成员,如果要添加额外的成员, 则可以使用交叉类型:

```typescript
type PartialWithNewMember<T> = {
  [P in keyof T]?: T[P];
} & { newMember: boolean };
```

更通用的版本

```typescript
type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};

type Partial<T> = {
  [P in keyof T]?: T[P];
};
```

## Conditional Types 有条件类型

```typescript
T extend U ? X : Y
```

上面的类型意思是，若 T 能够赋
值给 U，那么类型是 X，否则为 Y
