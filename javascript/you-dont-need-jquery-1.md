## query selector

```javascript
// jquery
$('selector');

// native
document.querySelectorAll('selector');

// 后代查询
// jquery
$el.find('li');
// native
el.querySelectorAll('li');

// 兄弟元素
// jquery
$el.siblings();
// native
[...el.parentNode.children].filter(child => child !== el);

// 前一个元素
// jquery
$el.prev();
// native
el.previousElementSibling;

// 后一个元素
// jquery
$el.next();
// native
el.nextElementSibling;

// 获得匹配元素的第一个祖先元素
// jquery
$el.closest(queryString);
// native
el.closest(selector);

// 获取给定元素的祖元素集合，不包括元素本身和最后一个祖元素
// jquery
$el.parentsUtil(selector, filter);
// native
function parentsUntil(el, selector) {
  const result = [];
  el = el.parentNode;

  while (el && !el.matches(selector)) {
    result.push(el);
    el = el.parentNode;
  }

  return result;
}

// Form
// input/textarea
// jquery
$('#input').val();
// native
document.querySelector('#input').value;

// Body
// jquery
$('body');
// native
document.body;

// 获取和设置属性
// jquery
$el.attr('foo');
$el.attr('foo', 'bar');
// native
el.getAttribute('foo');
el.setAttribute('foo', 'bar');
```
