# 节流

规定在一个单位时间内，只能触发一次函数。如果这个单位时间内触发多次函数，只有一次生效。

```javascript
function throttle(fn, wait) {
  let time = null;
  return function () {
    if (!time) {
      time = setTimeout(() => {
        fn(...arguments);
        time = null;
      }, wait);
    }
  };
}
```
