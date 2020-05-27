# Enums 枚举

枚举允许开发者定义一组命名的常量, 使用枚举可以使代码易于理解维护, Typescript 提供了基于数字跟字符串的枚举.


## Numeric enums 数字枚举

```typescript
// where Up = 0, Down = 1, Left = 2, Right = 3
enum Direction {
    Up, // or Up = 1
    Down,
    Left,
    Right
}
```

## String enums 字符串枚举

```typescript
enum Direction {
    Up = 'up',
    Down = 'down',
    Left = 'left',
    Right = 'right'
}
```

## Heterogeneous enums 混合枚举

非常不建议使用混合枚举

```typescript
enum SomeEnum {
    No = 0,
    Yes = 'YES'
}
```

## Computed and constant members 计算和常量成员

每一个枚举成员有一个值与之关联,该值要么为常量,要么通过计算


## Union enums and enum member types 联合枚举和枚举成员类型

```typescript
enum ShapeKind {
    Circle,
    Square
}

interface Circle {
    kind: ShapeKind.Circle;
    radius: number;
}

interface Square {
    kind: ShapeKind.Square;
    sideLength: number;
}

let c: Circle = {
    kind: ShapeKind.Square, // Error! Type 'ShapeKind.Square' is not assignable to type 'ShapeKind.Circle'.
    radius: 100
}
```

## Enums at runtime

枚举类型在运行时是真实存在的对象

## Enums at compile time

```typescript
enum LogLevel {
    ERROR,
    WARN,
    INFO
}

// This is equivalent to : 'ERROR' | 'WARN' | 'INFO'
type LogLevelTypes = keyof typeof LogLevel;
```

## Reverse mappings 反向映射

注意字符串枚举成员没有反向映射

```typescript
enum Enum { 
    A 
}

let a = Enum.A; // 0
let nameOfA = Enum[a]; // 'A'
```

## 常量枚举

在大多数情况下, 枚举是一个完美的解决方案. 然而在有些情况下要求更严格, 为了避免在访问枚举值时支付额外的生成代码和间接调用的开销, 使用常量枚举是一个不错的选择, 常量枚举只能使用常量表达式, 这是因为常量枚举跟正常枚举不同, 他们在编译过程中是被完全移除.

```typescript
const enum Directions {
    Up,
    Down,
    Left,
    Right
}

let directions = [
  Directions.Up,
  Directions.Down,
  Directions.Left,
  Directions.Right
];

// in generated code will become
var directions = [0 /* Up */, 1 /* Down */, 2 /* Left */, 3 /* Right */];
```

## Ambient enum 外部枚举

[what-means-ambient-in-typescript](https://stackoverflow.com/questions/26946495/what-means-ambient-in-typescript)

Ambient simply means "without implementation".

Ambient declarations only exist in the type system and are erased at run-time

外部枚举被用来描述已经存在的枚举类型.

```typescript
declare enum Enum {
    A = 1,
    B,
    C = 2
}
```