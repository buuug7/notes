class LinkedListNode {
  constructor(value, next = null) {
    this.value = value;

    /** @type {LinkedListNode} */
    this.next = next;
  }

  toString() {
    return this.value;
  }
}

class LinkedList {
  constructor() {
    /** @type {LinkedListNode} */
    this.head = null;

    /** @type {LinkedListNode} */
    this.tail = null;
  }

  append(value) {
    const node = new LinkedListNode(value, null);

    if (!this.head) {
      this.head = node;
      this.tail = node;
      return this;
    }

    this.tail.next = node;
    this.tail = node;
    return this;
  }

  prepend(value) {
    const node = new LinkedListNode(value, this.head);
    this.head = node;

    if (!this.tail) {
      this.tail = node;
    }

    return node;
  }

  delete(value) {
    if (!this.head) {
      return null;
    }

    let deleteNode = null;

    // checked delete is head
    while (this.head && this.head.value === value) {
      deleteNode = this.head;
      this.head = this.head.next;
    }

    let currentNode = this.head;

    while (currentNode.next) {
      const nextNode = currentNode.next;
      if (value === nextNode.value) {
        deleteNode = nextNode;
        currentNode.next = nextNode.next;
      } else {
        currentNode = currentNode.next;
      }
    }

    // if delete is tail
    // rewrite detail
    if (this.tail.value === value) {
      this.tail = currentNode;
    }

    return deleteNode;
  }

  deleteHead() {
    if (!this.head) {
      return null;
    }
    const deleteNode = this.head;
    if (this.head.next) {
      this.head = this.head.next;
    } else {
      this.head = null;
      this.tail = null;
    }

    return deleteNode;
  }

  deleteTail() {
    const deleteNode = this.tail;
    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
      return deleteNode;
    }

    let currentNode = this.head;

    while (currentNode.next) {
      if (!currentNode.next.next) {
        currentNode.next = null;
      } else {
        currentNode = currentNode.next;
      }
    }
    this.tail = currentNode;
    return deleteNode;
  }

  find(value) {
    if (!this.head) {
      return null;
    }

    let findNode = null;
    let currentNode = this.head;
    while (currentNode) {
      if (currentNode.value === value) {
        findNode = currentNode;
        break;
      } else {
        currentNode = currentNode.next;
      }
    }

    return findNode;
  }

  toArray() {
    const nodes = [];
    let currentNode = this.head;
    while (currentNode) {
      nodes.push(currentNode);
      currentNode = currentNode.next;
    }

    return nodes;
  }

  toString() {
    return this.toArray().map((node) => node.toString());
  }
}

const list = new LinkedList();
list.append("a");
list.append("b");
list.append("c");
list.append("d");
