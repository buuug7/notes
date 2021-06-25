# select sort 选择排序

选择排序是一种就地比较的排序算法. 它具有 O(n2)时间复杂度, 使得它在大列表上效率低下, 并且通常比类似的插入排序性能差. 选择排序以其简单性而闻名, 在某些情况下, 特别是在辅助内存有限的情况下, 它比更复杂的算法具有性能优势.

步骤:

- 在未排序数组中找到最小(大)元素, 存放到排序数组起始(末尾)位置
- 从剩余未排序元素中继续寻找最小(大)元素, 然后放到已排序序列的末尾
- 以此类推, 直到所有元素均排序完

![select sort](./select-sort.gif)

## Complexity

- best: `n^2`
- Worst: `n^2`
- Average: `n^2`

## implementation

```javascript
/**
 * select sort
 * @param {*[]} originArr
 * @return {*[]}
 */
function selectSort(originArr) {
  const arr = [...originArr];
  for (let i = 0; i < arr.length; i++) {
    let maxIndex = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[maxIndex] > arr[j]) {
        maxIndex = j;
      }
    }

    if (i !== maxIndex) {
      [arr[i], arr[maxIndex]] = [arr[maxIndex], arr[i]];
    }
  }

  return arr;
}
```
