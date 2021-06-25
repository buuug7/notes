class DoubleLinkedListNode {
  constructor (value, next = null, previous = null) {
    this.value = value

    /** @type {DoubleLinkedListNode} */
    this.next = next

    /** @type {DoubleLinkedListNode} */
    this.previous = previous
  }

  toString () {
    const v = {
      value: this.value,
      previous: this.previous ? this.previous.value : null,
      next: this.next ? this.next.value : null,
    }

    return JSON.stringify(v)
  }
}

class DoubleLinkedList {
  constructor () {
    /** @type {DoubleLinkedListNode} */
    this.head = null

    /** @type {DoubleLinkedListNode} */
    this.tail = null
  }

  prepend (value) {
    const newNode = new DoubleLinkedListNode(value)
    if (this.head) {
      this.head.previous = newNode
    }
    this.head = newNode

    if (!this.tail) {
      this.tail = newNode
    }

    return this
  }

  append (value) {
    const newNode = new DoubleLinkedListNode(value)

    if (!this.head) {
      this.head = newNode
      this.tail = newNode
      return this
    }

    this.tail.next = newNode
    newNode.previous = this.tail
    this.tail = newNode

    return this
  }

  find (value) {
    if (!this.head) {
      return null
    }

    let findNode = null
    let currentNode = this.head

    while (currentNode) {
      if (currentNode.value === value) {
        findNode = currentNode
        break
      } else {
        currentNode = currentNode.next
      }
    }

    return findNode
  }

  delete (value) {
    if (!this.head) {
      return null
    }

    let deleteNode = null
    let currentNode = this.head

    while (currentNode) {
      if (currentNode.value === value) {
        deleteNode = currentNode

        if (deleteNode === this.head) {
          this.head = deleteNode.next

          if (this.head) {
            this.head.previous = null
          }

          if (deleteNode === this.tail) {
            this.tail = null
          }
        } else if (deleteNode === this.tail) {
          this.tail = deleteNode.previous
          this.tail.next = null
        } else {
          deleteNode.previous.next = deleteNode.next
          deleteNode.next.previous = deleteNode.previous
        }
      }

      currentNode = currentNode.next
    }

    return deleteNode
  }

  deleteTail () {
    if (!this.tail) {
      return null
    }

    if (this.head === this.tail) {
      const deleteTail = this.tail
      this.head = null
      this.tail = null
      return deleteTail
    }

    const deleteTail = this.tail
    this.tail = this.tail.previous
    this.tail.next = null

    return deleteTail
  }

  deleteHead () {
    if (!this.head) {
      return null
    }

    const deleteHead = this.head

    if (this.head.next) {
      this.head = this.head.next
      this.head.previous = null
    } else {
      this.head = null
      this.tail = null
    }

    return deleteHead
  }

  toArray () {
    const nodes = []
    let currentNode = this.head
    while (currentNode) {
      nodes.push(currentNode)
      currentNode = currentNode.next
    }
    return nodes
  }

  toString () {
    return this.toArray().map((item) => item.toString())
  }
}

const list = new DoubleLinkedList()
list.append('a')
list.append('b')
list.append('c')
list.append('d')
