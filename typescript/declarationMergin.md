# Declaration Merging

声明合并意思是编译器将同一名字的两个独立声明合并为一个单一声明.合并后的声明同时拥有原先两个声明的特征.

TypeScript 中的声明会创建一下三种实体:

- 命名空间,创建命名空间的声明会新建一个命名空间
- 类型声明, 用声明的模型来创建一个类型并绑定到给定的名字上
- 值的声明, 会创建在 javascript 输出中看到的值

## Merging Interfaces

最简单最通用的声明合并是接口合并, 从根本上来说,合并的机制是把双方的成员放到一个同名的接口中.

```typescript
interface Box {
  height: number;
  width: number;
}

interface Box {
  scale: number;
}

let box: Box = {
  height: 5,
  width: 6,
  scale: 10,
};
```

接口中非函数成员应该是唯一的, 如果不唯一, 那么他们的类型必须相同, 如果两个接口中同时声明了同名的非函数成员且他们的类型不同, 则编译器会报错.

对于函数成员, 每个同名函数声明会被当成这个函数的重载, 同时需要注意, 当两个接口合并, 后面的接口具有更高的优先级.

```typescript
interface Cloner {
  clone(animal: Animal): Animal;
}

interface Cloner {
  clone(animal: Sheep): Sheep;
}

interface Cloner {
  clone(animal: Dog): Dog;
  clone(animal: Cat): Cat;
}

interface Cloner {
  clone(animal: Dog): Dog;
  clone(animal: Cat): Cat;
  clone(animal: Sheep): Sheep;
  clone(animal: Animal): Animal;
}
```

## Merging Namespaces 合并命名空间

与接口合并类似, 命名空间会创建出命名空间和值, 对于命名空间合并, 模块导出的同名接口进行合并, 构成单一命名空间内含合并后的接口, 对于命名空间里值的合并, 如果当前已经存在给定名字的命名空间, 那么后来的命名空间的导出成员会被加到已经存在的那个模块里.

```typescript
namespace Animals {
    export class Zebra {}
}

namespace Animals {
    export interface Legged { numberOfLegs: number },
    export class Dog {}
}

// 等同于

namespace Animals {
    export interface Legged { numberOfLegs: number; }

    export class Zebra { }
    export class Dog { }
}
```

除了合并之外, 你还需要了解非导出成员是如何处理的. 非导出成员仅在其原有的命名空间内可见. 也就是说合并之后, 从其他命名空间的合并进来的成员无法访问非导出成员.

## Merging Namespaces with Classes, Functions, and Enums

命名空间可以与其它类型声明合并, 只要命名空间的定义符合将要合并类型的定义. 合并结果包含两者的声明类型. TypeScript 使用这个功能去实现一些 JavaScript 里的设计模式。

#### Merging Namespaces with class

```typescript
// 实现内部类
class Album {
  label: Album.AlbumLabel;
}

namespace Album {
  export class AlbumLabel {}
}
```

## Disallowed Merges 非法合并

TypeScript 并非允许所有的合并。 目前，类不能与其它类或变量合并。

## Module Augmentation 模块扩展

## Global augmentation 全局扩展
