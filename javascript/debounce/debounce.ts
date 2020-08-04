/**
 * debounce
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
