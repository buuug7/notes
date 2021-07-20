import { binarySearch } from "./binarySearch";
import { expect } from "@jest/globals";

it("should search number in the sorted array", () => {
  expect(binarySearch([], 1)).toBe(-1);
  expect(binarySearch([1], 1)).toBe(0);
  expect(binarySearch([1, 2], 1)).toBe(0);
  expect(binarySearch([1, 2], 2)).toBe(1);
  expect(binarySearch([1, 5, 10, 12, 14, 17, 22], 12)).toBe(3);
});

it("should search object in sorted array", () => {
  const sortedArrayOfObjects = [
    { key: 1, value: "value1" },
    { key: 2, value: "value2" },
    { key: 3, value: "value3" },
  ];

  const comparator = (a, b) => {
    if (a.key === b.key) {
      return 0;
    }
    return a.key < b.key ? -1 : 1;
  };

  expect(binarySearch([], { key: 1 }, comparator)).toBe(-1);
  expect(binarySearch(sortedArrayOfObjects, { key: 4 }, comparator)).toBe(-1);
  expect(binarySearch(sortedArrayOfObjects, { key: 1 }, comparator)).toBe(0);
  expect(binarySearch(sortedArrayOfObjects, { key: 3 }, comparator)).toBe(2);
});
