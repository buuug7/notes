# Linux 基础操作

## ubuntu 获取用户 uid 跟 gid

```
id

# 或者

id -u username

# 或者
echo $UID
```

## 文件权限

linux 文件权限一般包括读,写,执行,对应为 r,w,x. 权限的属组有拥有者(User), 群组(Group), 其他组(Other)三种. 每个文件都可以针对这三个群组设置不同的读写执行权限. 通常情况下, 一个文件只能归属于一个用户组, 如果其他用户想要该文件的权限, 可以将该用户加入到具备该权限的群组即可.

表示一个文件的权限通常使用十位二进制表示法, 第一位代表文件类型(目录或者文件), 后九位表示权限, 分成三组(User, Group, Other), 每一组使用三位二进制表示(第一位代表读, 第二位代表写, 第三位代表运行), 可简化为三位八进制形式.

比如 `-rwxr-xr-x`, 第一位`-`表示是一个普通文件, 2-4 位表示该文件拥有者具有读写运行权限, 5-7 位表示该文件所在群组有读跟运行权限, 8-10 位 表示其他用户组有读跟运行权限.

- `001` - `1` - `--x` - 运行
- `010` - `2` - `-w-` - 写
- `011` - `3` - `-wx` - 写,运行
- `100` - `4` - `r--` - 读
- `101` - `5` - `r-x` - 读,运行
- `110` - `6` - `rw-` - 读,写
- `111` - `7` - `rwx` - 读,写,运行

十位二进制的其中第一位表示文件的类型, 类型有:

- `d` 表示目录
- `-` 表示普通文件
- `s` 表示套接字文件
- `p` 表示管道文件
- `l` 表示符号链接文件
- `b` 表示块设备文件
- `c` 表示字符设备文件

## chmod 命令用来改变文件的读写执行等权限

```bash
# 设置 file 文件的权限为文件拥有者,同组用户, 其他用户都具有读/写/执行权限
chmod 777 file

# 设置 test 目录的及其子目录的权限为 777
chmod -R 777 test

# 你也可以用 chmod u+x file 的方式为 User 组添加运行权限
# 其中u代表User, g代表Group, o代表Other, a代表所有
# + 代表添加, -代表取消, =代表覆盖
# 例如为 file 所属用户组添加写权限
chmod u+w file
```

## chown 改变文件的拥有者和分组

```bash
# 把 file_or_directory 的所有者修改为 newUser
chown newUser file_or_directory

# 把目录 directory 及其下的所有文件和子目录的属主设置为 newUser, 属组设置为 newGroup
chown -R newUser:newGroup directory
```

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

```bash
# 不指定用户
ssh ip

# 指定用户
ssh -l root ip
ssh root@ip

# 指定端口
ssh -p port ip
ssh -l root -p port ip
ssh -p port root@ip
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

## files and directories 文件以及目录操作

```bash
# 创建 mkdir
mkdir directoryName

# 创建文件 touch vi nano echo
touch filename
vi filename
nano filename
echo 'content' > filename

# 删除文件 rm
rm file

# 删除非空目录或者空目录, 参数r为遍历删除其子目录以及子文件, 参数f为强制删除
rm -rf directory

# 正则匹配删除多个文件,例如删除当前目录下后缀名为.txt的所有文件
rm *.txt

# 移动文件mv
mv source target

# 复制文件cp
cp path/to/file path/to/otherFile

# 复制文件夹, 参数r的意思为遍历复制其子目录以及文件
cp -r path/to/directory path/to/otherDirectory


# 查找目录以及文件find/locate,其中locate是在原来建立的索引中查找,find是实时查找
# 查找当前目录下是否有 filename 文件
find ./ -name filename

# 查找当前目录下后缀名为 .txt 的文件
find ./ -name "*.txt"

# 显示文件内容
# 显示 file 文件内容到屏幕
cat file

# 显示file文件前5行内容
head -5 file

# 显示file文件最后2行
tail -2 file

# 查找文件内容egrep
# 在 file 中查找 keyword 字符串
egrep 'keyword' file


# 给文件增加别名
# 硬连接, 删除其中的一个另一个仍旧可以使用
ln path/to/file path/to/hardLink

# 软连接,删除源,另一个无法使用
ln -s path/to/file_or_directory path/to/symlink

# 管道和重定向
# 批处理命令连接执行,使用 |
# 串联:使用分号
# 前面执行成功,则执行后面,否则不执行:&&
# 前面执行失败,则执行后面一条: ||

# 如果有home目录,则输出success,否则输出failed
ls /home && echo success! || echo failed

# 重定向
# 将信息 someText 输出到 file
echo someText > file

# 将/home目录下面的信息存入 file 中
ls /home > file

#清空文件
:> file

# bash快捷键输入删除
# ctrl+u 删除光标到行首的字符,删除全行
# ctrl+w 删除光标前面的一个相邻字符串
# ctrl+H 删除光标前边的一个字符
```

## find 例子

```bash
# find 例子
# 查找当前目录中后缀名称为 txt 和 pdf 文件:
# 注意\(  \)符号内的左右都有空格,-o表示与的意思
find . \( -name *.txt -o -name *.pdf \) -print

# 用正则方式查找 txt 和 pdf
# 忽略大小写用-iregex
find . -regex ".*\(\.txt|\.pdf\)$"

# 查找当前目录所有飞txt的文件
find . ! -name *.txt -print

# 按类型搜索
# 列出当前所有目录,d只目录,f指文件,l指符号链接
find . -type -d -print

# 按时间来搜索
# -atime 访问时间(单位天,分钟为-amin,)
# -mtime 修改时间(内容被修改)
# -ctime 变化时间(元数据或权限辩护)

# 查看当前目录最近3天访问过的所有文件
find . -atime 3 -type f -print

# 查看当前目录下3天内访问过的所有文件
find . -atime -3 -type f -print

# 查看当前目录下3天前访问过的所有文件
find . -atime +3 -type f -print

# 按大小搜索size
# 查看大于2k的文件
find . -size +2k -type -f -print

# 按权限查找
# 查看具有可执行权限的所有文件
find . -type f -perm 644

# 找到后的后续动作
# 用xargs执行命令
find . -name *.txt |xargs cat -n

# 用exec来执行后续的命令,注意最后的分号
# 查找txt文件并显示行号
find . -name *.txt  -exec cat -n {} \;
```

## grep

```bash
# grep 文本搜索
# 格式: grep match_pattern file
# 参数:-o 输出匹配的文本行,-v输出没有匹配的行,-c统计文件中包含文本的次数,-n打印匹配的行号,-i忽略大小写,-l只打印文件名

# 在多级目录中对文本进行递归搜索
grep "keyword" . -R -n

# 匹配多个模式: 比如搜索/etc/passwd 文件中含有'keyword1'和含有'keyword2'的文本行
grep -e 'keyword1' -e 'keyword2' /ect/passwd


# xargs 能够将输入数据转化为特定命令的命令行参数
# 查找/etc/hsots文件内包含google内容的文本行,一行显示3列
grep "google" /etc/hosts | xargs -n 3
```

## 文本处理

```bash
# sort 排序
# -n 按数字来排序
# -d 按字典来排序
# -r 逆序排序
# -k N 指定按第N列排序
# 按字典顺序排列/etc/hosts文件中的内容
sort -d /etc/hosts


# uniq 消除重复行
# 查看/etc/hosts文件没有重复的文本行
sort /etc/hosts | uniq
# 查看/etc/hosts文件中各行重复的次数
sort /etc/hosts | uniq -c
# 查看/etc/hosts文件中的重复行
sort /etc/hosts | uniq -d

# tr 进行转换
# 语法:tr [OPTION]... SET1 [SET2]

# 替换字符串abcde中的e为2
# echo abcde | tr 'e' '2'

# 删除字符床abc123中的数字
# echo abc123 | tr -d '0-9'

# 压缩字符
# 去除字符串中多余的空格
# echo abc   123 | tr -s ' '

# 替换字符,将字符串abcdefg字符用数字替换
# echo abcdefg | tr 'a-z' '0-9'
```
