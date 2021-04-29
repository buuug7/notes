# 防抖

在事件被触发 n 秒后再执行回调，如果在这 n 秒内又被触发，则重新计时。

```javascript
function debounce(fn, wait) {
  let time = null;
  return function () {
    if (time) {
      clearTimeout(time);
    }
    time = setTimeout(() => fn(...arguments), wait);
  };
}
```
