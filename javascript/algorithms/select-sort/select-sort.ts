/**
 *
 * @param originArray
 * @param compare
 */
export function selectSort(originArray: any[], compare: (a, b) => number) {
  const array = [...originArray];

  for (let i = 0; i < array.length - 1; i++) {
    let minIndex = i;

    for (let j = i + 1; j < array.length - 1; j++) {
      if (compare(array[j], array[minIndex]) < 0) {
        minIndex = j;
      }
    }

    if (i !== minIndex) {
      const tmp = array[i];
      array[i] = array[minIndex];
      array[minIndex] = tmp;
    }
  }

  return array;
}
