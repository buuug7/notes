import { MiniHeap } from "../heap/Heap.mjs";

export default class PriorityQueue extends MiniHeap {
  constructor() {
    super();
    this.priorities = new Map();
    this.compare = this.comparePriority;
  }

  add(item, priority) {
    this.priorities.set(item, priority);
    super.add(item);
    return this;
  }

  remove(item, customComparator) {
    super.remove(item, customComparator);
    this.priorities.delete(item);
    return this;
  }

  changePriority(item, priority) {
    this.remove(item, this.compareValue);
    this.add(item, priority);
    return this;
  }

  findByValue(item) {
    return this.find(item, this.compareValue);
  }

  hasValue(item) {
    return this.findByValue(item).length > 0;
  }

  comparePriority(a, b) {
    if (this.priorities.get(a) === this.priorities.get(b)) {
      return 0;
    }

    return this.priorities.get(a) > this.priorities.get(b) ? 1 : -1;
  }

  compareValue(a, b) {
    if (a === b) {
      return 0;
    }

    return a > b ? 1 : -1;
  }

  toString() {
    return this.heapContainer
      .map((it) => `item: ${it}, priority: ${this.priorities.get(it)}`)
      .join("\n");
  }
}
