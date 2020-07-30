/**
 * Default compare
 * @param {(string | number)} a
 * @param {(string | number)} b
 * @returns {number}
 */
function defaultCompare(a, b) {
  return a - b;
}

/**
 * Binary search
 * @param {*[]} sortedArray
 * @param {*} seekElement
 * @param {function(a, b)} [compareCallback]
 * @return {number}
 */
export function binarySearch(
  sortedArray,
  seekElement,
  compareCallback = defaultCompare
) {
  let startIndex = 0;
  let endIndex = sortedArray.length - 1;

  while (startIndex <= endIndex) {
    // Calculate the index of middle element
    const middleIndex = startIndex + Math.floor((endIndex - startIndex) / 2);

    // Founded , return element position
    if (compareCallback(sortedArray[middleIndex], seekElement) === 0) {
      return middleIndex;
    }

    // Decide which half to choose for seeking
    if (compareCallback(sortedArray[middleIndex], seekElement) < 0) {
      startIndex = middleIndex + 1;
    } else {
      endIndex = middleIndex - 1;
    }
  }

  // Not found
  return -1;
}
