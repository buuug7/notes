/**
 * 防抖
 * 在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时。
 * @param fn
 * @param wait
 */
export function debounce(fn: Function, wait: number) {
  let time = null;
  return function () {
    if (time) {
      clearTimeout(time);
    }
    const arg = arguments;
    time = setTimeout(() => {
      fn.apply(this, arg);
    }, wait);
  };
}
