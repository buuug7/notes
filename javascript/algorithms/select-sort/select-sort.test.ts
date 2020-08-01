import { selectSort } from "./select-sort";

it("should sort number array", function () {
  const arr = [2, 3, 1, 4];
  const compare = (a, b) => a - b;

  expect(selectSort(arr, compare)[0]).toBe(1);
  expect(selectSort(arr, compare)[3]).toBe(4);
});

it("should sort object array", function () {
  const arr = [
    { key: 2, value: "value2" },
    { key: 1, value: "value1" },
    { key: 3, value: "value3" },
  ];
  const compare = (a, b) => a.key - b.key;

  expect(selectSort(arr, compare)[0]["key"]).toBe(1);
  expect(selectSort(arr, compare)[2]["key"]).toBe(3);
});
