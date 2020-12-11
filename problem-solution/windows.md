# windows related

## 查看端口

```
netstat -ano|findstr 8080
```

## wsl 跟 windows 互相访问

> 这里的 wsl 指的是 wsl2

windows 访问 wsl 中部署的应用, 比如 nginx, 在 wsl 启动后监听 8080 端口, 那么在 windows 中可以直接访问 `http://localhost:8080`. 也就是 wsl 中监听的端口跟在 windows 中使用的是同一个接口.

wsl 中访问 windows 中部署的应用, 以 nginx 为例, nginx 在 windows 中监听 8080 端口,那么在 wsl 中只能通过 wsl 跟 windows 中建立的虚拟网卡中分配的 IP 去访问,通过在 windows 中`控制面板\网络和 Internet\网络连接` 名字为**vEthernet (WSL)**的虚拟网卡中查看详情来获取 IP,假如 IP 为 172.17.240.1,则访问的地址为 `172.17.240.1:8080`地址来访问.

## 重启 wsl

```
//WSL-Ubuntu18.04 LTS 重启方法
//以管理员权限运行cmd
>>net stop LxssManager	//停止
>>net start LxssManager	//启动
```

## windows10 wsl2 --参考的对象类型不支持尝试的操作

wsl2 在使用 vpn 后会起不来，解决方案就是 cmd 下管理员权限执行 netsh winsock reset

## win10 Hyper-v 安装 虚拟机 出现 `the unsigned image’s hash is not allowed`

解决方法是把 VM 的安全选项里的安全启动给关掉

## hyper-v 跟虚拟机互访

1. 设置虚拟虚拟交换管理器为 default switch 为默认连接，即**内部连接**
2. 新建的虚拟机选择 default switch
3. 在主机中访问虚拟机服务
   - 进虚拟机查看该虚拟机分配的 IP
   - 如果是 ubuntu,查看 IP 命令为`ifconfig -a`
   - 使用该 IP 就可以访问虚拟机上的服务
4. 在虚拟机中访问主机服务
   - 在 windows 中 控制面板->网络和 Internet 链接->网络连接
   - 查看**vEthernet(Default Switch)** 中详细信息
   - 列表中 IPv4 即位主机 IP,使用该 IP 就可以在虚拟机中访问主机服务

## w 安装 Win10 出现我们无法创建新的分区，也找不到现有的

提前进 PE 分好区,把安装包里面的这 4 个文件(boot 文件夹,sources 文件夹,bootmgr, bootmgr.efi)复制到 c 盘（提前用工具分好区），重启电脑，拔下 u 盘自动安装

## 查看 windows 版本

```
# cmd
ver

```

#### win10 常用快捷键有哪些

- Win+L 快速锁屏
- Win+E 打开 我的电脑
- Win+D 进入桌面
- Win+R 快速打开运行功能
- Win+上下左右方向键 分屏操作
- Win+Tab 可新建电脑桌面
- Win+上下方向键 窗口最大化\最小化
- Win+空格 切换多个输入法
- Win+I 打开 windows 设置
- Win+数字键 打开任务栏上第 N 个程序
- Ctrl+Shift+N 快速创建文件夹
- Ctrl+鼠标拖动 快速创建副本
- Ctrl+N 快速创建同级界面
- Shift+Delete 永久删除
- Shift+Ctrl+Esc 打开任务管理器
- Alt+双击 查看文件属性
- Win+Shift+S 截图
- 打开 Windows ink 工作区进行截图
- Win+W 打开 Windows ink 工作区
- Win+q 搜索入口
  - 搜索内容 默认搜索全部
  - app:搜索内容 搜索应用
  - document:搜索内容 搜索文档
  - settings:搜索内容 搜索设置
  - web:搜索内容 搜索网页
  - folder:搜索内容 搜索文件

#### windows 查看指定端口被占用 杀死指定进程

```
## 最后一列显示的是进程PID
netstat -aon|findstr 1099
## 杀死该进程
taskkill -f -pid 进程PID
```

#### chrome disabled CORS

启动快捷方式添加 --disable-web-security --user-data-dir

#### 操作无法完成 因为其中的文件或者文件夹在另一个程序中已经打开

<https://blog.csdn.net/feinifi/article/details/83216030 />

#### office Tool

[office Tool](https://otp.landian.vip/en-us/#)

#### office kms 服务器

```
zh.us.to 有效
kms.03k.org 有效
kms.chinancce.com 有效
kms.shuax.com 有效
kms.dwhd.org 有效
kms.luody.info 有效
kms.digiboy.ir 有效
kms.lotro.cc 有效
www.zgbs.cc 有效
cy2617.jios.org 有效
```

#### win10 查看版本号

- win+R 然后输入 winver
- 或者在 cmd 的标题栏中就有 win10 的版本号

#### windows 创建删除文件

```
// 创建文件

//第一种，使用echo
echo 123>m.txt

// 第二种，用type命令
// 创建一个空文件 type nul>*.*
type nul>m.txt


// 删除文件
// del *.*
// del m.txt
```

#### windows 创建文件夹

```
完整命令是md [盘符:\][路径\]新目录名
md c:\test\myfolder
```

#### windows 删除文件文件夹

```
// 删除文件夹，该文件夹必须是空文件夹
rd directoryName

// 删除文件夹以及该文件夹中所有的文件，/s的意思是会进行删除，添加了/q，即quiet，安静模式
rd /s /q directoryName

// 删除文件
del file1 file2

// 删除文件，可以使用通配符
del f*.txt
```

#### VC 库下载地址

- [VC11](https://www.microsoft.com/en-us/download/details.aspx?id=30679)
- [VC14](https://www.microsoft.com/en-us/download/details.aspx?id=48145)
- [VC15](https://go.microsoft.com/fwlink/?LinkId=746572)

#### vcruntime140.dll 找不见

Windows 下运行 php7 需要 Visual C++Redistributable 2015,下载地址为

```
https://www.microsoft.com/en-gb/download/details.aspx?id=48145
```

#### vcruntime110.dll

其中在安装 wamp3.x 的时候回提示该文件找不到,下载地址为

```
https://www.microsoft.com/zh-CN/download/details.aspx?id=30679
```

#### 创建以点号开头的文件夹

您无法使用 Windows 资源管理器创建名称以句点开头的文件夹，除非该文件夹的名称也以句点结束。输入名称 (.ssh.) 后，最后的句点会自动删除

#### 在 word 如何在下划线上输入汉字

先在空白地方打空格,然后选中空格,加下划线,最后就可以在线上打字了.

#### URL 跟文件路径区别

在 windows 中浏览器 url 用的是"/"表示路径
而 windows 中的访问磁盘文件用的是"\"
