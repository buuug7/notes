## jquery related

#### jquery 自动判断页面上的图片是否加载成功,不成功替换为默认图片

```
// 方法 1：更换图片地址
$('img').error(function(){
    $(this).attr('src', '加载失败.png');
});
// 方法 2：隐藏它
$("img").error(function(){
    $(this).hide();
});
```
