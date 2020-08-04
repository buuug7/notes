export function quickSort(originArray, compare = (a, b) => a - b) {
  const array = [...originArray];
  if (array.length < 2) {
    return array;
  } else {
    const pivot = array.shift();
    const less = array.filter((item) => compare(item, pivot) <= 0);
    const greater = array.filter((item) => compare(item, pivot) > 0);

    return quickSort(less).concat([pivot]).concat(quickSort(greater));
  }
}
