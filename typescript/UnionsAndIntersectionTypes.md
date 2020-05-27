# 联合和交叉类型 Unions and Intersection Types

联合跟交叉类型提供了一种组合类型的方式.


## 联合类型 Union Types

联合类型描述了一个值可能拥有的几种类型

```typescript
function padLeft(value: string, padding: string | number) {}
```

## Unions with Common Fields 通用成员联合

如果我们有一个值是联合类型, 我们只能访问在所有联合类型中通用的成员


```typescript
interface Bird {
    fly(): void;
    layEggs(): void;
}

interface Fish{
    swim(): void;
    layEggs(): void;
}


declare function getSmallPet(): Fish | Bird;

let pet = getSmallPet();
pet.layEggs();
pet.swim(); // Error

```

## Discriminating Unions 区别对待联合类型

使用switch来处理各种不同情形


## Intersection Types 交叉类型

交叉类型结合多个类型为一个类型, 使用 `TypeA && TypeB`

```typescript
interface TypeA {
    state1: string;
}

interface TypeB {
    state2: string;
}

type TypeAB = TypeA & TypeB;
const myType: TypeAB = {state1: 's1', state2: 's2'}
```

