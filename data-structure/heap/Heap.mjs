export class Heap {
  constructor(comparatorFunction) {
    this.heapContainer = [];

    const defaultComparator = (a, b) => {
      if (a === b) {
        return 0;
      }
      return a > b ? 1 : -1;
    };

    this.compare = comparatorFunction || defaultComparator;
  }

  getLeftChildIndex(parentIndex) {
    return 2 * parentIndex + 1;
  }

  getRightChildIndex(parentIndex) {
    return 2 * parentIndex + 2;
  }

  getParentIndex(childIndex) {
    return Math.floor((childIndex - 1) / 2);
  }

  hasParent(childIndex) {
    return this.getParentIndex(childIndex) >= 0;
  }

  hasLeftChild(parentIndex) {
    return this.getLeftChildIndex(parentIndex) < this.heapContainer.length;
  }

  hasRightChild(parentIndex) {
    return this.getRightChildIndex(parentIndex) < this.heapContainer.length;
  }

  leftChild(parentIndex) {
    return this.heapContainer[this.getLeftChildIndex(parentIndex)];
  }

  rightChild(parentIndex) {
    return this.heapContainer[this.getRightChildIndex(parentIndex)];
  }

  parent(childIndex) {
    return this.heapContainer[this.getParentIndex(childIndex)];
  }

  swap(indexOne, indexTwo) {
    const tmp = this.heapContainer[indexTwo];
    this.heapContainer[indexTwo] = this.heapContainer[indexOne];
    this.heapContainer[indexOne] = tmp;
  }

  peek() {
    if (this.heapContainer.length === 0) {
      return null;
    }

    return this.heapContainer[0];
  }

  find(item, comparator = this.compare) {
    const foundItemIndices = [];
    for (
      let itemIndex = 0;
      itemIndex < this.heapContainer.length;
      itemIndex++
    ) {
      if (comparator(item, this.heapContainer[itemIndex]) === 0) {
        foundItemIndices.push(itemIndex);
      }
    }
    return foundItemIndices;
  }

  isEmpty() {
    return !this.heapContainer.length;
  }

  toString() {
    return this.heapContainer.toString();
  }

  poll() {
    if (this.heapContainer.length === 0) {
      return null;
    }

    if (this.heapContainer === 1) {
      return this.heapContainer.pop();
    }

    const item = this.heapContainer[0];
    this.heapContainer[0] = this.heapContainer.pop();
    this.heapDown();
    return item;
  }

  add(item) {
    this.heapContainer.push(item);
    this.heapUp(this.heapContainer.length - 1);
    return this;
  }

  remove(item, comparator = this.compare) {
    const numberOfItemsToRemove = this.find(item, comparator).length;
    for (let iteration = 0; iteration < numberOfItemsToRemove; iteration++) {
      const indexToRemove = this.find(item, comparator).pop();
      if (indexToRemove === this.heapContainer.length - 1) {
        this.heapContainer.pop();
      } else {
        this.heapContainer[indexToRemove] = this.heapContainer.pop();
        const parentItem = this.parent(indexToRemove);
        if (
          this.hasLeftChild(indexToRemove) &&
          (!parentItem ||
            this.pairIsInCorrectOrder(
              parentItem,
              this.heapContainer[indexToRemove]
            ))
        ) {
          this.heapDown(indexToRemove);
        } else {
          this.heapUp(indexToRemove);
        }
      }
    }

    return this;
  }

  heapUp(customStartIndex) {
    let currentIndex = customStartIndex || this.heapContainer.length - 1;
    while (
      this.hasParent(currentIndex) &&
      !this.pairIsInCorrectOrder(
        this.parent(currentIndex),
        this.heapContainer[currentIndex]
      )
    ) {
      this.swap(currentIndex, this.getParentIndex(currentIndex));
      currentIndex = this.getParentIndex(currentIndex);
    }
  }

  heapDown(customStartIndex = 0) {
    let currentIndex = customStartIndex;
    let nextIndex = null;

    while (this.hasLeftChild(currentIndex)) {
      if (
        this.hasRightChild(currentIndex) &&
        this.pairIsInCorrectOrder(
          this.rightChild(currentIndex),
          this.leftChild(currentIndex)
        )
      ) {
        nextIndex = this.getRightChildIndex(currentIndex);
      } else {
        nextIndex = this.getLeftChildIndex(currentIndex);
      }

      if (
        this.pairIsInCorrectOrder(
          this.heapContainer[currentIndex],
          this.heapContainer[nextIndex]
        )
      ) {
        break;
      }

      this.swap(currentIndex, nextIndex);
      currentIndex = nextIndex;
    }
  }

  pairIsInCorrectOrder(firstElement, secondElement, compareFn) {
    throw new Error(`
    You have to implement heap pair comparision method
    for ${firstElement} and ${secondElement} values.`);
  }
}

export class MiniHeap extends Heap {
  pairIsInCorrectOrder(firstElement, secondElement) {
    return (
      this.compare(firstElement, secondElement) === -1 ||
      this.compare(firstElement, secondElement) === 0
    );
  }
}

export class MaxHeap extends Heap {
  pairIsInCorrectOrder(firstElement, secondElement) {
    return (
      this.compare(firstElement, secondElement) === 1 ||
      this.compare(firstElement, secondElement) === 0
    );
  }
}
