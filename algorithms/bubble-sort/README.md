# bubble sort

冒泡排序, 有时被称为下沉排序, 它反复遍历要排序的列表, 比较每一对相邻项, 如果它们的顺序错误(升序或降序排列), 则交换它们. 重复遍历整个列表直到不需要交换为止.

步骤:

- 比较相邻的元素. 如果位置错误, 就交换他们
- 对每一对相邻元素作同样的工作, 从开始第一对到结尾的最后一对
- 这步做完后, 最后的元素会是最大的数, 然后将该数固定在最后
- 针对所有的元素重复以上的步骤
- 持续每次对越来越少的元素重复上面的步骤, 直到没有任何一对数字需要比较

![bubble sort](./bubble-sort.gif)

## Complexity

- best: `n`
- Worst: `n^2`
- Average: `n^2`

简单实现:

```javascript
/**
 * bubble sort
 * @param {Array} arr
 */
function bubble(arr) {
  const _arr = [...arr];
  const length = arr.length;

  for (let i = 0; i < length; i++) {
    for (let j = i + 1; j < length; j++) {
      if (_arr[i] > _arr[j]) {
        const tmp = _arr[i];
        _arr[i] = _arr[j];
        _arr[j] = tmp;
      }
    }
  }
  return _arr;
}
```
