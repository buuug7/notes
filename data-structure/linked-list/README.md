## Linked list 链表

链表是数据元素的线性集合, 元素的线性顺序不是由它们在内存中的物理位置给出的。 相反, 每个元素指向下一个元素。它是由一组节点组成的数据结构,每个节点由数据和下一个节点的引用组成,这种结构允许在迭代期间有效地从序列中的任何位置插入或删除元素。

优点: 插入或删除元素非常高效
缺点: 链表的访问时间是线性的

![linkedList](./linked-list.svg)

## 时间复杂度

- Access `O(n)`
- Search `O(n)`
- Insertion `O(1)`
- Deletion `O(1)`

## 空间复杂度

- `O(1)`

## implementation

`./LinkedList.js`
