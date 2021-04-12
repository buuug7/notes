给定的 ["a,b,d", "a,c,o", "c,d,e", "e,f,g", "g,c"]
返回 ['a,b,d', 'c,o', 'e', 'f,g']
调用 uniqueData，返回的结果的每一项元素不能出现在前面已经出现过元素

// expect(uniqueData(["a,b,d", "a,c,o", "c,d,e", "e,f,g", "g,c"])).toEqual([
// "a,b,d",
// "c,o",
// "e",
// "f,g",
// ]);

```javascript
function uniqueData(arr) {
  const array = [...arr];
  const alreadyExists = [];
  const result = [];

  array.forEach((item) => {
    const itemArr = item.split(",");
    const newItem = itemArr.map((it) => {
      if (!alreadyExists.includes(it)) {
        alreadyExists.push(it);
        return it;
      }
      return "";
    });

    const r = newItem.filter((item) => item !== "");
    result.push(r.join(","));
  });
  return result.filter((item) => item.length);
}
```
