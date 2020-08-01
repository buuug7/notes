import { binarySearch } from "./binary-search";

it("should search number in sorted array", function () {
  const arr = [1, 2, 3, 4];
  const compare = (a, b) => a - b;
  expect(binarySearch(arr, 2, compare)).toBe(1);
  expect(binarySearch(arr, 99, compare)).toBe(-1);
});

it("should search object in sorted array", function () {
  const arr = [
    {
      key: 1,
      value: "value1",
    },
    {
      key: 2,
      value: "value2",
    },
    {
      key: 3,
      value: "value3",
    },
  ];

  const compare = (a, b) => a.key - b.key;

  expect(binarySearch(arr, { key: 1 }, compare)).toBe(0);
  expect(binarySearch(arr, { key: 22 }, compare)).toBe(-1);
});
