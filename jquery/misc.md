## jquery ajax 全局携带 cookie

```javascript
$.ajaxSetup({
  xhrFields: {
    withCredentials: true,
  },
});
```
