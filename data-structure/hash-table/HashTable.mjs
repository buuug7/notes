import { LinkedList } from "../linked-list/LinkedList.mjs";

class HashTable {
  constructor(hashTableSize = 32) {
    /** @type {Array<LinkedList>} */
    this.buckets = Array(hashTableSize)
      .fill(null)
      .map(() => new LinkedList());
    this.keys = {};
  }

  hash(key) {
    const hash = Array.from(key).reduce(
      (hashAccumulator, keySymbol) => hashAccumulator + keySymbol.charCodeAt(0),
      0
    );

    return hash % this.buckets.length;
  }

  set(key, value) {
    const keyHash = this.hash(key);
    this.keys[key] = keyHash;

    const bucketLinkedList = this.buckets[keyHash];
    const node = bucketLinkedList.find({
      callback: (nodeValue) => nodeValue.key === key,
    });

    if (!node) {
      bucketLinkedList.append({ key, value });
    } else {
      node.value = value;
    }
  }

  delete(key) {
    const keyHash = this.hash(key);
    delete this.keys[key];
    const bucketLinkedList = this.buckets[keyHash];
    const node = bucketLinkedList.find({
      callback: (nodeValue) => nodeValue.key === key,
    });

    if (node) {
      return bucketLinkedList.delete(node.value);
    }

    return null;
  }

  get(key) {
    const buckedLinkedList = this.buckets[this.hash(key)];
    const node = buckedLinkedList.find({
      callback: (nodeValue) => nodeValue.key === key,
    });
    return node ? node.value : undefined;
  }

  has(key) {
    return Object.hasOwnProperty.call(this.keys, key);
  }

  getKeys() {
    return Object.keys(this.keys);
  }

  getValues() {
    return this.buckets.reduce((value, bucket) => {
      const bucketValues = bucket
        .toArray()
        .map((linkedListNode) => linkedListNode.value.value);
      return value.concat(bucketValues);
    }, []);
  }
}

const hashTable = new HashTable(2);

hashTable.set("a", 1);
hashTable.set("b", 2);
hashTable.set("c", 3);
hashTable.set("d", 4);
hashTable.set("e", 5);
hashTable.set("f", 6);

const keys = hashTable.getKeys();
const values = hashTable.getValues();

// console.log(keys);
// console.log(values);
// console.log(hashTable.buckets);
console.log(hashTable.get("f"));
console.log(hashTable.get("c"));
console.log(hashTable.buckets[1].toArray());
