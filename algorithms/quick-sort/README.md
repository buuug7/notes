# Quick sort 快速排序

快速排序是一种分而治之的算法。快速排序首先将一个大数组分成两个子数组：低元素和高元素。然后递归地对子数组排序。

![quick-sort](./quick-sort.gif)

步骤如下：

- 从数组中选择一个基准值(pivot)
- 分区：重新排列数组，使值小于 pivot 的所有元素都在 pivot 之前，而值大于 pivot 的所有元素都在它之后。在这个分区之后，pivot 在它的最终位置。这称为分区操作。
- 递归地将上述步骤应用于每个子数组
- 直到别拆分的数组的长度小于 2 的时候返回

## Complexity

- best: `n log(n)`
- Worst: `n^2`
- Average: `n log(n)`

## implementation

```javascript
/**
 * quick sort
 * @param {Array} originArr
 * @return {T[]}
 */
function quickSort(originArr) {
  const arr = [...originArr];

  if (arr.length < 2) {
    return arr;
  } else {
    const pivot = arr.shift();
    const less = arr.filter((item) => item <= pivot);
    const greater = arr.filter((item) => item > pivot);
    return quickSort(less).concat([pivot]).concat(quickSort(greater));
  }
}
```
