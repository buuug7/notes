/**
 *
 * @param sortedArray
 * @param seekElement
 * @param compare
 */
export function binarySearch(
  sortedArray: any[],
  seekElement: any,
  compare: (a, b) => number
) {
  let startIndex = 0;
  let endIndex = sortedArray.length - 1;

  while (startIndex <= endIndex) {
    const middleIndex = Math.floor((endIndex - startIndex) / 2) + startIndex;
    if (compare(sortedArray[middleIndex], seekElement) === 0) {
      return middleIndex;
    }

    if (compare(sortedArray[middleIndex], seekElement) > 0) {
      endIndex = middleIndex - 1;
    } else {
      startIndex = middleIndex + 1;
    }
  }

  return -1;
}
