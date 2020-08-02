import { quickSort } from "./quick-sort";

it("should sort number array", function () {
  const arr = [3, 2, 1, 4, 5];
  expect(quickSort(arr)[0]).toBe(1);
  expect(quickSort(arr)[4]).toBe(5);
});
