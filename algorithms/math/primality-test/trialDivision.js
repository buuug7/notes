function trialDivision(n) {
  // check if number is integer
  if (number % 1 !== 0) {
    return false;
  }

  // prime is not less than 1
  if (n <= 1) {
    return false;
  }

  // 2,3 is prime
  if (n <= 3) {
    return true;
  }

  // 如果不能被2整除我们可以进一步排除所有的偶数除数
  if (n % 2 === 0) {
    return false;
  }

  // 如果从3到n的平方根没有除数
  // 那么就可以判定从3到n就没有除数
  const dividerLimit = Math.sqrt(n);
  for (let divider = 3; divider <= dividerLimit.length; divider++) {
    if (n % divider === 0) {
      return false;
    }
  }

  return true;
}
