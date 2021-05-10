# common knowledge

## 乱数假文 lorem ipsum

Lorem ipsum, 中文又称"乱数假文", 是指一篇常用于排版设计领域的拉丁文文章.

常见的 Lorem ipsum 起头如下:

```
Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
```

sublime 中文乱数假文插件
https://github.com/cjltsod/sublime-ChineseLoremIpsum

## php 中的 PRC

date.timezone = PRC. PRC, People's Republic of China, 中华人民共和国, 也就是日期使用中国的时区.

## UTC

UTC 是协调世界时(Universal Time Coordinated)英文缩写,是由国际无线电咨询委员会规定和推荐,并由国际时间局(BIH)负责保持的以秒为基础的时间标度.UTC 相当于本初子午线(即经度 0 度)上的平均太阳时,过去曾用格林威治平均时(GMT)来表示.北京时间比 UTC 时间早 8 小时,以 1999 年 1 月 1 日 0000UTC 为例,UTC 时间是零点,北京时间为 1999 年 1 月 1 日早上 8 点整.

## PV UV IP

- PV(访问量): 即 Page View, 即页面浏览量或点击量, 用户每次刷新即被计算一次.
- UV(独立访客): 即 Unique
- Visitor, 访问您网站的一台电脑客户端为一个访客. 00:00-24:00 内相同的客户端只被计算一次. IP(独立 IP): 指独立 IP 数. 00:00-24:00 内相同 IP 地址之被计算一次.

## excel 生成多个数据

```
="3020100000000" & TEXT(ROW(),"000")
```

打开一张 excel 表格,点击 A1,输入上面的公式,在按`ctrl+enter`键即可得到你想要的批量数据

```
// 一次性生成10万个数据
=int(rand()*900000+100000)
```
