function fibonacci(n) {
  const fibSequence = [0, 1];

  let currentValue = 1;
  let previousValue = 0;

  if (n === 0) {
    return [0];
  }

  if (n == 1) {
    return fibSequence;
  }

  let iterationCounter = n - 1;

  while (iterationCounter) {
    currentValue += previousValue;
    previousValue = currentValue - previousValue;

    fibSequence.push(currentValue);
    iterationCounter -= 1;
  }
  return fibSequence;
}
