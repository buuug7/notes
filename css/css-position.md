## CSS position

HTML 的标准文档流是:从上到下,从左到右,遇到块级元素换行
浮动层:给元素 float 属性后,就是脱离文档流,进行左右浮动,紧贴着父元素的左右边框,浮动元素空出的位置,由后续的非浮动元素填充,块级元素直接填充上去,内联元素有空隙就插入

##### postioning with floats

float 属性允许我们把一个元素从文档正常流中移除,把它定位到其父元素左边或者右边,其他非浮动的元素就会环绕该浮动的元素,通常 float 属性有两个最常用的值 left,right.

浮动元素默认是块级元素,所以他会改变元素的默认显示样式,比如\<span\>是行内元素,但是给它设置 float 属性后它会自动变成块级元素.

```css
div {
  float: left;
  /*float:right;*/
}
```

##### 清除浮动

清除浮动使用 clear 属性,其值用的最多的是 left,right 和 both

```css
div {
  clear: left;
  /*clear:right;*/
  /*clear:both;*/
}
```
