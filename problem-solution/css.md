## css related

#### 修改输入框的 placeholder

- WebKit, Blink (Safari, Google Chrome, Opera 15+) and Microsoft Edge are using a pseudo-element: ::-webkit-input-placeholder. [Ref]
- Mozilla Firefox 4 to 18 is using a pseudo-class: :-moz-placeholder (one colon). [Ref]
- Mozilla Firefox 19+ is using a pseudo-element: ::-moz-placeholder, but the old selector will still work for a while. [Ref]
- Internet Explorer 10 and 11 are using a pseudo-class: :-ms-input-placeholder. [Ref]
- April 2017: Most modern browsers support the simple pseudo-element ::placeholder [Ref]

```css
::-webkit-input-placeholder {
  /* WebKit, Blink, Edge */
  color: #909;
}
:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #909;
  opacity: 1;
}
::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #909;
  opacity: 1;
}
:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: #909;
}
::-ms-input-placeholder {
  /* Microsoft Edge */
  color: #909;
}

::placeholder {
  /* Most modern browsers support this now. */
  color: #909;
}

textarea::placehodler {
  /* some thing */
}
```

#### 子元素相对于父元素设定 margin-top 值的时候，为什么是整体相对于 body 进行了偏移？

- 修改父元素的高度，增加 padding-top 样式模拟
- 为父元素添加 overflow：hidden；样式即可
- 为父元素或者子元素声明浮动
- 为父元素添加 border
- 为父元素或者子元素声明绝对定位 。

#### 网页灰色黑色黑白色 CSS 代码，让网页变黑色 CSS 代码

```
html {
    -webkit-filter: grayscale(100%);
    -moz-filter: grayscale(100%);
    -ms-filter: grayscale(100%);
    -o-filter: grayscale(100%);
    filter:progid:DXImageTransform.Microsoft.BasicImage(grayscale=1);
    _filter:none;
    }
```

#### css 禁止换行,强制换行

```
//强制换行
//1、word-break: break-all;  只对英文起作用，以字母作为换行依据。
//2、word-wrap: break-word;  只对英文起作用，以单词作为换行依据。
//3、white-space: pre-wrap;  只对中文起作用，强制换行。

//禁止换行
//white-space:nowrap; overflow:hidden; text-overflow:ellipsis;
```

#### CSS,font-family,好看常用的中文字体

```
例1（小米米官网）：font-family: "Arial","Microsoft YaHei","黑体","宋体",sans-serif;
例2（淘宝技术研发中心）：font: 12px/1.5 Tahoma,Helvetica,Arial,'宋体',sans-serif;
例3（加网 ）：font: 14px/1.5 'Microsoft YaHei',arial,tahoma,\5b8b\4f53,sans-serif;
例4（淘宝UED）：font: 12px/1 Tahoma,Helvetica,Arial,"\5b8b\4f53",sans-serif;
例5（一淘UX）:font-family: Helvetica, 'Hiragino Sans GB', 'Microsoft Yahei', '微软雅黑', Arial, sans-serif;
font: 12px/1 Tahoma,Helvetica,Arial,"\5b8b\4f53",sans-serif;

另外：
HTML，CSS，font-family：中文字体的英文名称
宋体 SimSun
黑体 SimHei
微软雅黑 Microsoft YaHei
微软正黑体 Microsoft JhengHei
新宋体 NSimSun
新细明体 PMingLiU
细明体 MingLiU
标楷体 DFKai-SB
仿宋 FangSong
楷体 KaiTi
仿宋_GB2312 FangSong_GB2312
楷体_GB2312 KaiTi_GB2312
宋体：SimSuncss中中文字体（font-family）的英文名称
Mac OS的一些：
华文细黑：STHeiti Light [STXihei]
华文黑体：STHeiti
华文楷体：STKaiti
华文宋体：STSong
华文仿宋：STFangsong
儷黑 Pro：LiHei Pro Medium
儷宋 Pro：LiSong Pro Light
標楷體：BiauKai
蘋果儷中黑：Apple LiGothic Medium
蘋果儷細宋：Apple LiSung Light
Windows的一些：
新細明體：PMingLiU
細明體：MingLiU
標楷體：DFKai-SB
黑体：SimHei
新宋体：NSimSun
仿宋：FangSong
楷体：KaiTi
仿宋_GB2312：FangSong_GB2312
楷体_GB2312：KaiTi_GB2312
微軟正黑體：Microsoft JhengHei
微软雅黑体：Microsoft YaHei
装Office会生出来的一些：
隶书：LiSu
幼圆：YouYuan
华文细黑：STXihei
华文楷体：STKaiti
华文宋体：STSong
华文中宋：STZhongsong
华文仿宋：STFangsong
方正舒体：FZShuTi
方正姚体：FZYaoti
华文彩云：STCaiyun
华文琥珀：STHupo
华文隶书：STLiti
华文行楷：STXingkai
华文新魏：STXinwei
Windows 中的中文字体。
在默认情况下，也就是未自行安装新字体或者 Office 等文字处理软件的情况下，Windows 默认提供下列字体：
Windows 95/98/98SE 宋体、黑体、楷体_GB2312、仿宋_GB2312
Windows XP/2000/2003/ME/NT 宋体/新宋体、黑体、楷体_GB2312、仿宋_GB2312 (Windows XP SP3 宋体-PUA)
Windows Vista/7/2008 宋体/新宋体、黑体、楷体、仿宋、微软雅黑、SimSun-ExtB
那么每种字体能显示那些汉字呢？
Vista 之前的 Windows 中宋体/新宋体、黑体支持 GBK 1.0 字符集，
楷体_GB2312、仿宋_GB2312 支持 GB2312-80 字符集。
（注：Windows 3.X 只能支持 GB2312-80 字符集）
Vista 及之后的 Windows 中宋体/新宋体、黑体、楷体、仿宋、微软雅黑支持 GB18030-2000 字符集，
SimSun-ExtB 只支持 GB18030-2005 字符集扩展 B 部分。
下面对字符集进行简单的介绍：
GB2312-80 < GBK 1.0 < GB18030-2000 < GB18030-2005
GB2312-80 中的字符数量最少，GB18030-2005 字符数量最多。
GB2312-80 是最早的版本，字符数比较少；
GBK 1.0 中的汉字大致与 Unicode 1.1 中的汉字数量相同；
GB18030-2000 中的汉字大致与 Unicode 3.0 中的汉字数量相同，主要增加了扩展 A 部分；
GB18030-2005 中的汉字大致与 Unicode 4.1 中的汉字数量相同，主要增加了扩展 B 部分；
由于 Unicode 5.2 的发布，估计 GB18030 会在近期发布新版本，增加扩展 C 部分。
需要说明的是在 GB18030 中扩展 B 部分并不是强制标准。
如果想查看 GB18030 的标准文本，请访问 http://www.gb168.cn 中的强标阅读。
如果想了解 Unicode 的内容，请访问 http://www.unicode.org。
现在纠正网上普遍的一个错误：
GB18030-2000 和 GB18030-2005 都不支持单字节的欧元符号
与简体中文有关的代吗页如下：
936 gb2312 简体中文(GB2312)————其实是GBK
10008 x-mac-chinesesimp 简体中文(Mac)
20936 x-cp20936 简体中文(GB2312-80)
50227 x-cp50227 简体中文(ISO-2022)
51936 EUC-CN 简体中文(EUC)
52936 hz-gb-2312 简体中文(HZ)
54936 GB18030 简体中文(GB18030)
补充：
使用楷体_GB2312、仿宋_GB2312后，在 Windows 7/Vista/2008 中可能不再显示为对应的字体。
这是因为 Windows 7/Vista/2008 中有楷体、仿宋，默认情况下没有楷体_GB2312、仿宋_GB2312，字体名称相差“_GB2312”。

```

#### a:visited 不起作用

```
//链接样式的定义顺序以及定义：
a:link {}     /* 未访问的链接 */
a:visited {}  /* 已访问的链接 */
a:hover {}    /* 当有鼠标悬停在链接上 */
a:active {}   /* 被选择的链接 */
//你重新设置一下试试！
//你代码发的不全，我无法进行测试！
```

#### font 简写规则

```
.font{
font-style:italic;
font-variant:small-caps;
font-weight:bold;
font-size:12px;
line-height:1.5em;
font-family:arial,verdana;
}


//上面的可以简写为下面的:

.font{
    font:italic small-caps bold 12px/1.5em arial,verdana;
}
//其中12px/1.5em为font-size/line-height
```

#### background url 详解

```
background:url(../images/list01.png) no-repeat 0 center;
的意思是 图像地址 不重复 水平位置0 垂直位置居中

0 center 的意思就是 水平位置0 垂直位置居中
-4px -3px 的意思就是 水平位置-4px  垂直位置-3px

这两个值和background-position 属性是一样的，即设置背景图像的起始位置。
这个属性设置背景原图像的位置，背景图像如果要重复，将从这一点开始。
默认值：0% 0%
可能的值
 top left
 top center
 top right
 center left
 center center
 center right
 bottom left
 bottom center
 bottom right (以上，如果您仅规定了一个关键词，那么第二个值将是"center"。)

 x% y% ( 第一个值是水平位置，第二个值是垂直位置。左上角是 0% 0%。右下角是 100% 100%。如果您仅规定了一个值，另一个值将是 50%。)

mpx npx (第一个值是水平位置，第二个值是垂直位置。左上角是 0 0。单位是像素 (0px 0px) 或任何其他的 CSS 单位。如果您仅规定了一个值，另一个值将是50%。)

您可以混合使用 % 和 position 值。
```

#### css 中 font 和 background 简写形式说明

```
// font字体属性包括下面的几个:
// font-family（字体族）: “Arial”、“Times New Roman”、“宋体”、“黑体”等;
// font-style（字体样式）: normal（正常）、italic（斜体）或oblique（倾斜）;
// font-variant (字体变化): normal（正常）或small-caps（小体大写字母）;
// font-weight (字体浓淡): 是normal（正常）或bold（加粗）。有些浏览器甚至支持采用100到900之间的数字（以百为单位）;
// font-size（字体大小）: 可通过多种不同单位（比如像素或百分比等）来设置, 如：12xp，12pt，120%，1em

// 简写形式 font: font-style | font-variant | font-weight | font-size | font-family
// 比如font:italic normal bold 12px arial,verdana;

// background包括下面几个属性:
// background-color：#999999； //元素的背景色
// background-image : url("path/bgFile.gif"); //设置背景图像
// background-repeat : repeat-x | repeat-y | repeat | no-repeat; //设置重复方式
// background-attachment : fixed | scroll; //设置背景图片的固定方式
// background-position : X轴坐标,Y轴坐标[top,bottom,center,left,right,20px,10%];  //设置背景的左上角位置,坐标可以是以百分比或固定单位

// 简写形式background:#FFCC66  url("path/bgFile.gif")  no-repeat  fixed  left  top;
```

#### background-position 详解

```
//语法：
background-position : length || length
background-position : position || position
//取值：
length  : 百分数 | 由浮点数字和单位标识符组成的长度值。
position  : top | center | bottom | left | center | right

该属性定位不受对象的补丁属性( padding )设置影响

// 背景图片的左上角将与容器元素的左上角对齐
background-position:0 0

// 图片以容器左上角为参考向左偏移70px，向上偏移 40px
background-position:-70px -40px;

// 图片以容器左上角为参考向右偏移70px，向下偏移 40px
background-position:70px 40px;

// 图片水平和垂直居中。与 background-position:center center;效果等同。
background-position:50% 50%;

// 图片处于容器元素的右下角，与 background-position:right bottom
background-position:100% 100%;

```

#### 一些小技巧让你的 CSS 技术更专业

```
// 使用:not()添加/去除导航上不需要的边框
.nav li:not(:last-child) {
     border-right:1pxsolid#666;
}

// 为body添加行高,你不需要分别为每一个 <p>, <h*> 等元素添加行高，而是为body添加
body {
     line-height:1;
}

// 使用负 nth-child 选择元素
li {
   display:none;
}
/* 选择1到3的元素并显示 */
li:nth-child(-n+3) {
   display:block;
}

// 使用表格会很痛苦，因此使用table-layout：fixed来保持单元格相同的宽度
.calendar {
  table-layout:fixed;
}

// 使用属性选择器选择空链接
a[href^="http"]:empty::before {
  content:attr(href);
}
```

#### 垂直居中的几种方法

```
// 第一种方法
html,
body {
    width:100%;
    height:100%;
    margin:0;
    padding:0;
}
.content {
    width:300px;
    height:300px;
    background:orange;
    margin:0 auto;/*水平居中*/
    position:relative;/*脱离文档流*/
    top:50%;/*偏移*/
    transform:translateY(-50%);
}

// 第二种用flex
html,
body {
    width:100%;
    height:100%;
    margin:0;
    padding:0;
}
body {
    display:flex;
    align-items:center;/*定义body的元素垂直居中*/
    justify-content:center;/*定义body的里的元素水平居中*/
}
.content {
    width:300px;
    height:300px;
    background:orange;
}

```
