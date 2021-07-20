import { euclidean } from "../euclidean/euclidean";

export function leastCommonMultiple(a, b) {
  return a === 0 || b === 0 ? 0 : Math.abs(a * b) / euclidean(a, b);
}
