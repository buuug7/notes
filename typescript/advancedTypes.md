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
