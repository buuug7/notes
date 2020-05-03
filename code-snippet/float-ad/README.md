## 使用方法

```
// 在你的js文件中加入如下代码调用
$(function () {
    $.floatingAd({
        //频率
        delay: 60,
        //超链接后是否关闭漂浮
        isLinkClosed: true,
        //漂浮内容
        ad: [{
            //关闭区域背景透明度(0.1-1)
            //headFilter: 0.1,
            //图片
            'img': "path/to/img.jpg",
            //图片高度
            'imgHeight': 50,
            //图片宽度
            'imgWidth': 200,
            //图片链接
            'linkUrl': "http://www.github.com/somelinks",
            //浮动层级别
            'z-index': 100,
        },],
        //关闭事件
        onClose: function (elem) {
            //alert('关闭');
        }
    });
});

// css 文件中引入style.scss
```
