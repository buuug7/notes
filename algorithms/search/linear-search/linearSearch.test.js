import linearSearch from "./linearSearch";

it("should search all numbers in array", function () {
  const arr = [1, 2, 4, 6, 2];
  expect(linearSearch(arr, 10)).toEqual([]);
  expect(linearSearch(arr, 1)).toEqual([0]);
  expect(linearSearch(arr, 2)).toEqual([1, 4]);
});

it("should search all strings in array", function () {
  const arr = ["a", "b", "a"];
  expect(linearSearch(arr, "c")).toEqual([]);
  expect(linearSearch(arr, "b")).toEqual([1]);
  expect(linearSearch(arr, "a")).toEqual([0, 2]);
});

it("should search objects", function () {
  const comparatorCallback = (a, b) => {
    if (a.key === b.key) {
      return 0;
    }

    return a.key < b.key ? -1 : 1;
  };

  const arr = [{ key: 5 }, { key: 6 }, { key: 7 }, { key: 6 }];

  expect(linearSearch(arr, { key: 10 }, comparatorCallback)).toEqual([]);
  expect(linearSearch(arr, { key: 5 }, comparatorCallback)).toEqual([]);
  expect(linearSearch(arr, { key: 6 }, comparatorCallback)).toEqual([1, 3]);
});
