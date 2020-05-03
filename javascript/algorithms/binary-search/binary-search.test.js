import { binarySearch } from './binary-search';

describe('binarySearch', () => {
  it('should search number in sorted array', function() {
    expect(binarySearch([], 1)).toBe(-1);
    expect(binarySearch([1], 1)).toBe(0);
    expect(binarySearch([1, 2], 1)).toBe(0);
    expect(binarySearch([1, 2], 2)).toBe(1);
    expect(binarySearch([1, 5, 10, 100, 200], 100)).toBe(3);
    expect(binarySearch([1, 5, 10, 100, 200], 2)).toBe(-1);
  });

  it('should search object in sorted array', function() {
    const sortedObjects = [
      { id: 1, name: 'Twice Man' },
      { id: 2, name: 'Lucy' },
      { id: 3, name: 'Alex' },
      { id: 4, name: 'Tom' }
    ];

    const compare = (a, b) => {
      if (a.id === b.id) {
        return 0;
      }

      return a.id > b.id ? 1 : -1;
    };

    expect(binarySearch([], { id: 1 }, compare)).toBe(-1);
    expect(binarySearch(sortedObjects, { id: 1 }, compare)).toBe(0);
    expect(binarySearch(sortedObjects, { id: 2 }, compare)).toBe(1);
    expect(binarySearch(sortedObjects, { id: 3 }, compare)).toBe(2);
  });
});
