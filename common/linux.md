# Linux 基础操作

## 杀死特定进程

```
kill -9 pid
```

## 查看端口占用情况

```shell
# 查看端口占用情况
netstat -anp | grep 端口号

# 该命令是查看当前所有已经使用的端口情, 用该命令也可以查看当前服务器是不是有用户访问
netstat -nultp
```

## 查看各种发行版方式

```
lsb_release -a

cat /etc/xxx-release XX为发行版名称

/etc/issue
```

## ssh

更详细的可以用 ssh -h 查看
常用格式`ssh [-l login_name] [-p port] [user@]hostname`

```shell
# 举例
# 不指定用户
ssh 192.168.0.11

# 指定用户
ssh -l root 192.168.0.11
ssh root@192.168.0.11

# 制定端口
ssh -p 12333 192.168.0.11
ssh -l root -p 12333 216.230.230.114
ssh -p 12333 root@216.230.230.114
```

另外修改配置文件`/etc/ssh/sshd_config`, 可以改 ssh 登录端口和禁止 root 登录. 改端口可以防止被端口扫描.  
重启 sshd 服务: `service sshd restart`

## 学会使用命令帮助

whatis info man which whereis

```shell

# 查看某个命令的简要说明
whatis commond

# 正则匹配,搜索含有local字符的命令
whatis -w "local*"

# 查看命令的详细说明
info commond

# 查看命令的说明文当
man commond

# 用来搜索只记住了部分关键字的命令
man -k commond

# 查看命令程序的binary安装路径
which commond

# 查看程序的搜索路径
whereis commond
```

## files and directories manager 文件以及目录管理

文件管理即为文件或者目录的创建,删除,查询,移动,mkdir/rm/mv

```
// 创建mkdir
mkdir directoryname

// 创建文件 touch vi nano gedit (echo+content > filename)
touch filename
vi filename
nano filename
gedit filename
echo somecontent > filename

// 删除文件rm
rm filename

// 删除非空目录或者空目录,参数r为遍历删除其子目录以及子文件,参数f为强制删除
rm -rf directory

// 正则匹配删除多个文件,例如删除当前目录下后缀名为.txt的所有文件
rm *.txt

// 移动文件mv
mv filename destDirectory

// 复制文件cp
cp filename destDirectory

// 复制文件夹,参数r的意思为遍历复制其子目录以及文件
cp -r directory destDirectory

// 列出目录项 ls
ls

// 列出所有目录项(不胡略以.开头的文件)
ls -a

// 查找目录以及文件find/locate,其中locate是在原来建立的索引中查找,find是实时查找
// 查找当前目录下是否有a.txt文件
find ./ -name a.txt

// 查找当前目录下后缀名为.txt的文件
find ./ -name "*.txt"

// 显示文件内容
// 显示a.txt文件内容到屏幕
cat a.txt

// 显示a.txt文件前5行内容
head -5 a.txt

// 显示a.txt文件最后2行
tail -2 a.txt

// 查找文件内容egrep
// 在a.txt中查找buuug7字符串
egrep 'buuug7' a.txt

// chmod命令用来改变文件的读写执行等权限
// 查看一个目录或者文件的权限用 ls -l 来看,左侧的十位数表示该文件的权限
// 其中下面的两个buuug7,第一个表示属主,第二个表示属主
-rwxrwxrwx 1 buuug7 buuug7 0 abr 15 06:57 m.txt

// 下面是用ls -l 命令显示文件的权限,总共十位数,对应关系如下
//    -        rw-        r--     r--
// 普通文件 文件拥有者 同组用户 其他用户
// 第一个-代表普通文件,d代表目录,接下来三位rw-代表文件拥有者的(读/写/执行),后面同理


// 设置文件或者目录的权限(数字法)
// 关于数字权限
// chmod ABC file
// 其中A、B、C各为一个数字，分别表示User、Group、及Other的权限
// 0表示没有权限，1表示可执行权限，2表示可写权限，4表示可读权限，然后将其相加
// A、B、C这三个数字如果各自转换成由“0”、“1”组成的二进制数，则二进制数的每一位分别代表一个角色的读、写、运行的权限
// 比如User组的权限A：
// 如果可读、可写、可运行，就表示为二进制的111，转换成十进制就是7。
// 如果可读、可写、不可运行，就表示为二进制的110，转换成十进制就是6。
// 如果可读、不可写、可运行，就表示为二进制的101，转换成十进制就是5。
// 如果可执行,表示为二进制为100,转换为十进制为4

// “4=r,2=w,1=x”的意思是：
// r代表读，w代表写，x代表执行，
// 如果可读，权限是二进制的100，十进制是4；
// 如果可写，权限是二进制的010，十进制是2；
// 如果可运行，权限是二进制的001，十进制是1；

// 具备多个权限，就把相应的 4、2、1 相加就可以了：
// 若要 rwx 则 4+2+1=7
// 若要 rw- 则 4+2=6
// 若要 r-x 则 4+1=5
// 若要 r-- 则 =4
// 若要 -wx 则 2+1=3
// 若要 -w- 则 =2
// 若要 --x 则 =1
// 若要 --- 则 =0

// 为不同的角色分配不同的权限，放在一起，就出现 777、677这样的数字了。
// 你也可以用 chmod u+x  file  的方式为User组添加运行权限。

// 设置a.txt文件的权限为文件拥有者,同组用户,其他用户都具有最高的执行权限(读/写/执行)
chmod 777 a.txt

// 设置/test目录的及其子目录的权限为777
chmod -R 777 /test

// chown 改变文件的拥有者
// 语法：chown ［选项］ 用户或组 文件
// [选项]的说明如下:
// - R 递归式地改变指定目录及其下的所有子目录和文件的拥有
// - v 显示chown命令所做的工作。

// 把文件a.txt的所有者修改为buuug7
chown buuug7 a.txt

// 把目录/test及其下的所有文件和子目录的属主设置为buuug7,属组设置为buuug7
chown -R buuug7.buuug7 /test


// 给文件增加别名

// 硬连接,删除其中的一个,另一个仍旧可以使用
// ln cc ccAgian

// 软连接,删除源,另一个无法使用
// ln -s cc ccTo

// 管道和重定向
// 批处理命令连接执行,使用 |
// 串联:使用分号
// 前面执行成功,则执行后面,否则不执行:&&
// 前面执行失败,则执行后面一条: ||

// 如果有home目录,则输出success,否则输出failed
ls /home && echo success! || echo failed

// 重定向
// 将信息buug7输出到a.txt
echo buuug7 > a.txt
// 将/home目录下面的信息存入a.txt中
ls /home > a.txt
//清空文件
 :> a.txt

// bash快捷键输入删除
// ctrl+u 删除光标到行首的字符,删除全行
// ctrl+w 删除光标前面的一个相邻字符串
// ctrl+H 删除光标前边的一个字符
```

## 文本处理

```

// find 文件查找
// 格式:find path -option [-print] [-exec -ok command] {} \;
// path 表示要查找的路径,当前目录用.,系统根目录用/
// -print 将匹配的文件输出到标准输出
// -exec find命令对匹配的文件执行该参数给出的shell命令,命令形式为 commond {} \
// -ok和-exec作用相同,只不过以一种更为安全的模式来执行该参数给出的shell命令,在执行前都会给出让用户确定的提示
// 记着{} \之间的空格,记着命令的最后的分号

// -option的说明如下
// -name filename 按文件名查找
// -user username 按文件的属主来查找
// -atime -n +n 按文件访问时间来查找
// -mtime -n +n 按文件更改时间来查找文件,-n表示n天以内,+n只n天以前
// -size n[c] 查找文件长度为n的文件
// -type b/d/c/p/l/f 查找 设备/目录/字符设备/管道/符号链接/普通文本
// ...

// find例子
// 查找当前目录中后缀名称为txt和pdf文件:
// 注意\(  \)符号内的左右都有空格,-o表示与的意思
find . \( -name *.txt -o -name *.pdf \) -print

// 用正则方式查找txt和pdf:
// 忽略大小写用-iregex
find . -regex ".*\(\.txt|\.pdf\)$"

// 查找当前目录所有飞txt的文件
find . ! -name *.txt -print

// 按类型搜索
// 列出当前所有目录,d只目录,f指文件,l指符号链接
find . -type -d -print

// 按时间来搜索
// -atime 访问时间(单位天,分钟为-amin,)
// -mtime 修改时间(内容被修改)
// -ctime 变化时间(元数据或权限辩护)

// 查看当前目录最近3天访问过的所有文件
find . -atime 3 -type f -print

// 查看当前目录下3天内访问过的所有文件
find . -atime -3 -type f -print

// 查看当前目录下3天前访问过的所有文件
find . -atime +3 -type f -print

// 按大小搜索size
// 查看大于2k的文件
find . -size +2k -type -f -print

// 按权限查找
// 查看具有可执行权限的所有文件
find . -type f -perm 644

// 找到后的后续动作
// 用xargs执行命令
find . -name *.txt |xargs cat -n

// 用exec来执行后续的命令,注意最后的分号
// 查找txt文件并显示行号
find . -name *.txt  -exec cat -n {} \;

// 如果需要执行多个命令,可以将多个命令写成一个脚本,然后用-exec调用的时候执行脚本即可
-exec ./commond.sh {} \;

// grep 文本搜索
// 格式:grep match_pattern file
// 参数:-o 输出匹配的文本行,-v输出没有匹配的行,-c统计文件中包含文本的次数,-n打印匹配的行号,-i忽略大小写,-l只打印文件名

// 在多级目录中对文本进行递归搜索(程序员最爱)
grep "buuug7" . -R -n

// 匹配多个模式:比如搜索/etc/passwd 文件中含有'buuug7'和含有'root'的文本行
grep -e 'buuug7' -e 'root' /ect/passwd


// xargs能够将输入数据转化为特定命令的命令行参数
// 查找/etc/hsots文件内包含google内容的文本行,一行显示3列
grep "google" /etc/hosts | xargs -n 3

// sort 排序
// -n 按数字来排序
// -d 按字典来排序
// -r 逆序排序
// -k N 指定按第N列排序
// 按字典顺序排列/etc/hosts文件中的内容
sort -d /etc/hosts


// uniq 消除重复行
// 查看/etc/hosts文件没有重复的文本行
sort /etc/hosts | uniq
// 查看/etc/hosts文件中各行重复的次数
sort /etc/hosts | uniq -c
// 查看/etc/hosts文件中的重复行
sort /etc/hosts | uniq -d

// tr 进行转换
// 语法:tr [OPTION]... SET1 [SET2]

// 替换字符串abcde中的e为2
// echo abcde | tr 'e' '2'

// 删除字符床abc123中的数字
// echo abc123 | tr -d '0-9'

// 压缩字符
// 去除字符串中多余的空格
// echo abc   123 | tr -s ' '

// 替换字符,将字符串abcdefg字符用数字替换
// echo abcdefg | tr 'a-z' '0-9'
```
