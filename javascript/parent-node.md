# ParentNode 接口

## 属性

#### ParentNode.childElementCount

只读属性,返回给定元素的子元素

```javascript
document.body.childElementCount; // 11
```

#### ParentNode.children

只读属性,返回一个 Node 的子元素

```javascript
document.body.children;
```

#### ParentNode.firstElementChild

只读属性,返回 Node 的第一个元素节点

```javascript
document.body.firstElementChild; 
```

#### ParentNode.lastElementChild

只读属性,返回 Node 的最后一个元素节点

```javascript
document.body.lastElementChild;
```

## 方法

#### ParentNode.append()

允许在 ParentNode 最后一个子节点之后插入一组 Node 对象或者 DOMString 对象,被插入的 DOMString 对象等价于 Text 节点,它与 Node.appendChild()的最大差异之处在于它能追加 DOMString 对象,而 Node.appendChild()只接受 Node 对象.

```javascript
let p = document.createElement("p");
p.textContent = "lorem ipsum dolor sit";
document.body.append(p);
document.body.append("some text");
```

#### ParentNode.prepend()

允许在 ParentNode 的第一个子节点之前插入一系列 Node 对象或者 DOMString 对象.

```javascript
let p = document.createElement("p");
p.textContent = "lorem ipsum dolor sit";
document.body.prepend(p);
document.body.prepend("some text");
```

### ParentNode.querySelectorAll(selectors)

返回一个 NodeList 表示元素的列表,其中参数 selectors 为 CSS 选择器

```javascript
document.querySelector("div.note");
```
