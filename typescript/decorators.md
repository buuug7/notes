# Decorators 装饰器

装饰器为类和类成员提供了一种同时添加注解跟元编程语法的方式

setting in tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES5",
    "experimentalDecorators": true
  }
}
```

装饰器是一种特殊类型的声明, 可以附加在 :

- class declaration
- method
- accessor
- property
- parameter

## Decorator Factories 装饰器工厂

装饰器工厂就是一个返回表达式的简单的函数, 在运行时被装饰器调用

```typescript
function color(value: string) {
  // this is the decorator factory
  return function (target) {
    // this is the decorator
    // do something with 'target' and 'value'
  };
}
```

## Decorator Composition 组合装饰器

```typescript
// On a single line
@f @g x

// On multiple lines
@f
@g
x
```

多个装饰器装饰一个声明的时候

- 每一个装饰器的表达式是从 **top-to-bottom** 来计算的
- 结果被当作函数从**bottom-to-top**来调用

```typescript
function f() {
  console.log('f():evaluated');
  return function (
    target,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    console.log('f(): called');
  };
}

function g() {
  console.log('g(): evaluated');
  return function (
    target,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    console.log('g(): called');
  };
}

class C {
  @f()
  @g()
  method() {}
}

// result:
// f(): evaluated
// g(): evaluated
// g(): called
// f(): called
```

## Class Decorator 类装饰器

类装饰器是在类声明之前定义的. 类装饰器是被用在类构造器上, 可以用来监视,修改或替换类定义.类装饰器不能用在声明文件中`.d.ts`, 也不能用在任何外部上下文中(比如 declare 的类).

类装饰器表达式会在运行时当作函数被调用, 类的构造函数作为其唯一参数.

如果类装饰器返回一个值, 他会使用提供的构造函数来替换类声明.

```typescript
function classDecorator<T extends { new (...args: any[]): {} }>(
  constructor: T
) {
  return class extends constructor {
    newProperty = 'new property';
    hello = 'override';
  };
}

@classDecorator
class Greeter {
  property = 'property';
  hello: string;
  constructor(m: string) {
    this.hello = m;
  }
}

console.log(new Greeter('world'));
// class_1 {
//   property: 'property',
//   hello: 'override',
//   newProperty: 'new property'
// }
```

## Method Decorators 方法装饰器

方法装饰器声明在一个方法的声明之前. 它会被应用到方法的属性描述符上面, 可以用来修改,监视和替换方法的定义. 方法装饰器不能用在声明文件中`.d.ts`, 也不能用在任何外部上下文中(比如 declare 的类).

方法装饰器表达式会在运行时当作函数被调用,传入下列三个参数:

- 对于静态成员来说是类的构造器, 对于实例成员是类的原型对象
- 成员的名字
- 成员的属性描述符

```typescript
class Greeter {
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }

  @enumerable(false)
  greet() {
    return 'hello, ' + this.greeting;
  }
}

function enumerable(value: boolean) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    descriptor.enumerable = value;
  };
}
```

## Accessor Decorators 访问器装饰器

访问器装饰器声明在一个访问器的声明之前（紧靠着访问器声明）。 访问器装饰器应用于访问器的属性描述符并且可以用来监视，修改或替换一个访问器的定义。 访问器装饰器不能用在声明文件中（.d.ts），或者任何外部上下文（比如 declare 的类）里。

访问器装饰器表达式会在运行时当作函数被调用，传入下列 3 个参数：

- 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象
- 成员的名字
- 成员的属性描述符

```typescript
class Pointer {
  private _x: number;
  private _y: number;
  constructor(x: number, y: number) {
    this._x = x;
    this._y = y;
  }

  @configurable(false)
  get x() {
    return this._x;
  }

  @configurable(false)
  get y() {
    return this._y;
  }
}

function configurable(value: boolean) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    descriptor.configurable = value;
  };
}
```

## Property Decorators 属性装饰器

属性装饰器声明在一个属性声明之前（紧靠着属性声明）。 属性装饰器不能用在声明文件中（.d.ts），或者任何外部上下文（比如 declare 的类）里。

属性装饰器表达式会在运行时当作函数被调用，传入下列 2 个参数:

- 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象
- 成员的名字

```typescript
class Greeter {
  @format('Hello, %s')
  greeting: string;

  constructor(message: string) {
    this.greeting = message;
  }

  greet() {
    let formatString = getFormat(this, 'greeting');
    return formatString.replace('%s', this.greeting);
  }
}

import 'reflect-metadata';

const formatMetadataKey = Symbol('format');

function format(formatString: string) {
  return Reflect.metadata(formatMetadataKey, formatString);
}

function getFormat(target: any, propertyKey: string) {
  return Reflect.getMetadata(formatMetadataKey, target, propertyKey);
}
```

## Parameter Decorator 参数装饰器

参数装饰器声明在一个参数声明之前（紧靠着参数声明）。 参数装饰器应用于类构造函数或方法声明。 参数装饰器不能用在声明文件（.d.ts），重载或其它外部上下文（比如 declare 的类）里。

参数装饰器表达式会在运行时当作函数被调用，传入下列 3 个参数：

- 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象
- 成员的名字
- 参数在函数参数列表中的索引

```typescript
class Greeter {
  greeting: string;

  constructor(message: string) {
    this.greeting = message;
  }

  @validate
  greet(@required name: string) {
    return 'Hello ' + name + ', ' + this.greeting;
  }
}

import 'reflect-metadata';

const requiredMetadataKey = Symbol('required');

function required(
  target: Object,
  propertyKey: string | symbol,
  parameterIndex: number
) {
  let existingRequiredParameters: number[] =
    Reflect.getOwnMetadata(requiredMetadataKey, target, propertyKey) || [];
  existingRequiredParameters.push(parameterIndex);
  Reflect.defineMetadata(
    requiredMetadataKey,
    existingRequiredParameters,
    target,
    propertyKey
  );
}

function validate(
  target: any,
  propertyName: string,
  descriptor: TypedPropertyDescriptor<Function>
) {
  let method = descriptor.value;
  descriptor.value = function () {
    let requiredParameters: number[] = Reflect.getOwnMetadata(
      requiredMetadataKey,
      target,
      propertyName
    );
    if (requiredParameters) {
      for (let parameterIndex of requiredParameters) {
        if (
          parameterIndex >= arguments.length ||
          arguments[parameterIndex] === undefined
        ) {
          throw new Error('Missing required argument.');
        }
      }
    }

    return method.apply(this, arguments);
  };
}
```

## Metadata 元数据

一些例子使用了[reflect-metadata](https://github.com/rbuckton/ReflectDecorators)库来支持实验性的 metadata API。 这个库还不是 ECMAScript (JavaScript)标准的一部分。 然而，当装饰器被 ECMAScript 官方标准采纳后，这些扩展也将被推荐给 ECMAScript 以采纳。
