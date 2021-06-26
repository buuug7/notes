# queue 队列

队列(queue) 是一种特殊类型的抽象数据类型或集合。集合中的实体按顺序保存。队列基本操作有两种：入队和出队。从队列的末尾添加元素，称为入队；从队列的头部添加元素，称为出队。队列中元素先进先出 FIFO (first in, first out).

## implementation

```javascript
class Queue {
  constructor() {
    // queue often is implemented with linked list
    // for simplify, here we implemented it with Array

    /** @type {Array} */
    this.list = [];
  }

  isEmpty() {
    return this.list.length === 0;
  }

  enqueue(value) {
    this.list.push(value);
  }

  dequeue(value) {
    this.list.shift();
  }

  peek() {
    return this.list[0];
  }

  toString() {
    return this.list;
  }
}
```
