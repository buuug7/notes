## CSS 属性选择器

```css
/* 匹配有title属性的元素 */
[title] {
  color: red;
}

/* 匹配有title属性的div元素 */
div[title] {
  color: red;
}

/* 匹配title属性值name的div元素 */
div[title="name"] {
  color: red;
}

/* 匹配title属性值包含name的元素 */
[title~="name"] {
  color: red;
}

/* 管道符 */
/* 匹配title属性值以name或name-开头的元素 */
[title|="name"] {
  color: red;
}

/* 匹配title属性值以name开头的元素 */
[title^="name"] {
  color: red;
}

/* 匹配title属性值以name结尾的元素 */
[title$="name"] {
  color: red;
}

/* 匹配title属性值包含name的元素 */
[title*="name"] {
  color: red;
}

/* 忽略大小写 */
/* 匹配title属性值包含name的元素 */
[title*="name" i] {
  color: red;
}

/* 组合使用 */
div[title][class="a"] {
  color: red;
}
```
