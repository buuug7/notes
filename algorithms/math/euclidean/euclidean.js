export function euclidean(originA, originB) {
  const a = Math.abs(originA);
  const b = Math.abs(originB);

  return b === 0 ? a : euclidean(b, a % b);
}
