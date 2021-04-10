# bubble sort

冒泡排序，有时被称为下沉排序，是一种简单的排序算法，它反复遍历要排序的列表，比较每一对相邻项，如果它们的顺序错误（升序或降序排列），则交换它们。重复遍历整个列表直到不需要交换为止，这表示列表已经排好序了。

步骤：

- 比较相邻的元素。如果第一个比第二个大，就交换他们两个。
- 对每一对相邻元素作同样的工作，从开始第一对到结尾的最后一对。这步做完后，最后的元素会是最大的数，然后将该数固+ 针对所有的元素重复以上的步骤，除了最后一个
- 持续每次对越来越少的元素重复上面的步骤，直到没有任何一对数字需要比较

![bubble sort](./bubble-sort.gif)

## Complexity

- best: `n`
- Worst: `n^2`
- Average: `n^2`

简单实现：

```javascript
function bubbleSort(arr) {
  const _arr = [...arr];

  for (let i = 0; i < _arr.length; i++) {
    for (let j = i + 1; j < _arr.length; j++) {
      if (_arr[i] > _arr[j]) {
        [_arr[i], _arr[j]] = [_arr[j], _arr[i]];
      }
    }
  }
  return _arr;
}
```
