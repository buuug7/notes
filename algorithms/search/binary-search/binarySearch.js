import Comparator from "../../utils/Comparator";

/**
 * binary search
 * @param {any[]} arr
 * @param {any} a
 * @param {function(a, b): number} [compareCallback]
 * @return {number}
 */
export function binarySearch(arr, a, compareCallback) {
  const comparator = new Comparator(compareCallback);

  let startIndex = 0;
  let endIndex = arr.length - 1;

  while (startIndex <= endIndex) {
    const midIndex = Math.floor((endIndex - startIndex) / 2) + startIndex;

    if (comparator.equal(arr[midIndex], a)) {
      return midIndex;
    }

    if (comparator.greaterThan(arr[midIndex], a)) {
      endIndex = midIndex - 1;
    } else {
      startIndex = midIndex + 1;
    }
  }

  return -1;
}
