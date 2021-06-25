# double linked list 双向链表

双向链表(doubly linked list) 是由一组称为节点的顺序链接记录组成的链接数据结构。每个节点包含两个字段，它们是对节点序列中上一个节点和下一个节点的引用。开始节点和结束节点的上一个链接和下一个链接分别指向某种终止节点，通常是 null，以方便遍历列表。

![double-linked-list](./double-linked-list.svg)

## 时间复杂度

- Access `O(n)`
- Search `O(n)`
- Insertion `O(1)`
- Deletion `O(1)`

## 空间复杂度

- `O(1)`

## implementation

`./DoubleLinkedList.js`
