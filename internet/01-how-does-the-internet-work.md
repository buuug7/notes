# How does the internet work?

Knowing the basics of internet and how it works is the key knowledge that every developer must have. [How_the_internet_work](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/How_does_the_Internet_work)

了解互联网的基本知识和工作原理是每个开发者必须具备的关键知识.

## What is the internet?


Internet, at its simplest, is a global network of computers connected to each other which communicate through a standardized set of protocols.

互联网, 简单的说, 是一个相互连接的计算机组成的全球网络, 这些计算机通过一套标准的协议来通讯.

## Wires, Cables & Wifi 电线, 光纤 & 无线

Information on the internet moves from computer to another in the form of bits. The medium for this transfer can be wires e.g. ethernet wires that you might have seen in your homes, it can be transferred in the form of light or fiber optic cables, also we can use wireless mediums.

互联网上的信息是以比特的形式从一台计算机移动到另外一台计算机. 传输的介质可以是电线, 例如您在家中可能看到的以太网电线, 它可以以光或者光纤电缆的形式传递, 我们也可以使用无线介质.

## IP Addresses and DNS

IP地址, 全称 Internet protocol Address, 互联网协议地址, 当设备连接网络, 设备将被分配一个IP地址, 用作标识. 通过IP地址, 设备间可以互相通讯, IP地址有两个主要功能, 标识设备或者网络 和 寻址, 常见的IP地址分为IP4跟IP6两大类, IP地址由一串数字组成, IP4以十进制数字组成, 并以点分隔, 如 `192.168.0.1` . IP6地址由十六进制数字组成, 以冒号分隔, 如 `2001:db8:0:1234:0:567:8:1`.

DNS (Domain Name System) 域名系统, 它是互联网的一项服务, 它作为将域名和IP地址互相映射的一个分布式数据库, 能够使人方便的访问互联网. 当前对每一级域名长度的限制是63个字符, 域名总长度不能超过253个字符.

DNS 系统中, 常见的资源记录类型有: 

+ 主机记录(A记录): A记录是用于名称解析的重要记录, 它将特定的主机名映射到对应主机的IP地址上.
+ 别名记录(CNAME记录): CNAME记录用于将某个别名指向某个A记录上, 这样就不需要在为某个新名字创建一条新的A记录
+ IPv6主机记录(AAAA记录): 与A记录对应, 用于将特定的主机名称映射到一个主机的IPv6地址.

## 互联网（Internet）和网络（web）

你可能注意到了, 当我们通过浏览器上网的时候，我们通常是用域名去到达一个网站。这是否意味着互联网（Internet）和网络（Web）是一样的？事实并非这么简单。正如向我们所见，互联网是一种基础的技术，它允许我们把成千上万的电脑连接在一起。在这些电脑中，有一些电脑（我们称之为网络服务器（Web servers））可以发送一些浏览器可以理解的信息。互联网是基础设施，网络是建立在这种基础设施之上的服务。值得注意的是，一些其他服务运行在互联网之上，比如邮箱和IRC.
