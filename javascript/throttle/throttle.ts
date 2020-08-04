/**
 * 节流
 * 规定在一个单位时间内，只能触发一次函数。如果这个单位时间内触发多次函数，只有一次生效。
 * @param fn
 * @param await
 */
export function throttle(fn: Function, await: number) {
  let time = null;
  return function () {
    const arg = arguments;
    if (!time) {
      time = setTimeout(() => {
        fn.apply(this, arg);
      }, await);
    }
  };
}
