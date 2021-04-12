根据数组的 label，移除数组中重复的选项

```javascript
const arr = [
  { label: "Alex", value: "1" },
  { label: "Alex", value: "1" },
  { label: "Bob", value: "2" },
  { label: "Xiao", value: "3" },
  { label: "dada", value: "4" },
  { label: "mom", value: "5" },
  { label: "mom", value: "5" },
  { label: "alice", value: "6" },
  { label: "tuex", value: "7" },
  { label: "tuex", value: "7" },
  { label: "sum", value: "8" },
  { label: "sum", value: "8" },
  { label: "fast", value: "9" },
  { label: "hot", value: "10" },
];
```

```javascript
function fn(arr) {
  const rs = [];
  arr.forEach((item) => {
    const isFind = rs.find((it) => it.label === item.label);
    if (!isFind) {
      rs.push(item);
    }
  });

  return rs;
}
```
