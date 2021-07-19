function fibonacciNthRecursive(n) {
  if (n <= 1) {
    return n;
  }

  return fibonacciNthRecursive(n - 2) + fibonacciNthRecursive(n - 1);
}
