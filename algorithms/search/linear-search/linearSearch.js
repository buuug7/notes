import Comparator from "../../utils/Comparator";

/**
 * linear search
 * @param {any[]} arr
 * @param {any} seekElement
 * @param {function(a, b): number} [comparatorCallback]
 * @return {number[]}
 */
export default function linearSearch(arr, seekElement, comparatorCallback) {
  const comparator = new Comparator(comparatorCallback);
  const foundIndices = [];

  arr.forEach((element, index) => {
    if (comparator.equal(element, seekElement)) {
      foundIndices.push(index);
    }
  });

  return foundIndices;
}
