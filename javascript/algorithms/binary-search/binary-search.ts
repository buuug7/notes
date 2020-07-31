export function binarySearch<T extends { compare(a: T): 0 | -1 | 1 }>(
  sortedArr: T[],
  seekElement: T
) {
  let startIndex = 0;
  let endIndex = sortedArr.length - 1;

  while (startIndex <= endIndex) {
    const middleIndex = startIndex + Math.floor((endIndex - startIndex) / 2);

    if (sortedArr[middleIndex].compare(seekElement) === 0) {
      return middleIndex;
    }

    if (sortedArr[middleIndex].compare(seekElement) < 0) {
      startIndex = middleIndex + 1;
    } else {
      endIndex = middleIndex - 1;
    }
  }

  return -1;
}
