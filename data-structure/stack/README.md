# stack 栈

栈(stack) 是一种抽象数据类型,用作表示元素的集合,具有两种主要操作:

- push, 添加元素到栈的顶端(末尾);
- pop, 移除栈最顶端(末尾)的元素.

以上两种操作可以简单概括为“后进先出(LIFO = last in, first out)”。此外, 还有一个 peek 操作用于访问栈当前顶端(末尾)的元素。

## implementation

```javascript
class Stack {
  constructor() {
    // often the stack is implemented with linked list
    // for simplify, here we use the array
    this.list = [];
  }

  isEmpty() {
    return this.list.length === 0;
  }

  peek() {
    return this.list[0];
  }

  push(value) {
    this.list.push(value);
  }

  pop(value) {
    this.list.pop();
  }

  toString() {
    return this.list;
  }
}
```
