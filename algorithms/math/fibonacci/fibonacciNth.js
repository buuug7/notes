function fibonacciNth(n) {
  let currentValue = 1;
  let previousValue = 0;

  if (n <= 1) {
    return n;
  }

  let iterationsCounter = n - 1;
  while (iterationsCounter) {
    currentValue += previousValue;
    previousValue = currentValue - previousValue;
    iterationsCounter -= 1;
  }

  return currentValue;
}
