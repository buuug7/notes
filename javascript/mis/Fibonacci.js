/**
 * Fibonacci
 * 斐波那契数列，又称黄金分割数列
 * 指的是这样一个数列：1、1、2、3、5、8、13、21、34
 * 以递归的方法定义：F(0)=0，F(1)=1, F(n)=F(n-1)+F(n-2)（n>=2，n∈N*）
 * @param {number} num
 * @returns
 */
function fib(num) {
  if (num === 0) {
    return 0;
  }
  if (num === 1) {
    return 1;
  }

  return fib(num - 2) + fib(num - 1);
}
