## 一些在 Shell 中的基本操作

```
更改目录： cd <路径>
          cd .. 移动到上级目录
          pushd <路径> 记住来源的同时移动到其他目录，popd 返回来源

目录列举： ls 列举出当前目录下所有的文件和子目录名（不包含隐藏文件），
             可以选择使用通配符 * 来缩小搜索范围。
             示例(1)： 列举所有以“.java”结尾的文件，输入 ls *.java (Windows: dir *.java)
             示例(2)： 列举所有以“F”开头，“.java”结尾的文件，输入ls F*.java (Windows: dir F*.java)

创建目录：
    Mac/Linux 系统：mkdir
              示例：mkdir books
    Windows   系统：md
              示例：md books

移除文件：
    Mac/Linux 系统：rm
              示例：rm somefile.java
    Windows   系统：del
              示例：del somefile.java

移除目录：
    Mac/Linux 系统：rm -r
              示例：rm -r books
    Windows   系统：deltree
              示例：deltree books

重复命令： !!  重复上条命令
              示例：!n 重复倒数第n条命令

命令历史：
    Mac/Linux 系统：history
    Windows   系统：按 F7 键

文件解压：
    Linux/Mac 都有命令行解压程序 unzip，你可以通过互联网为 Windows 安装命令行解压程序 unzip。
    图形界面下（Windows 资源管理器，Mac Finder，Linux Nautilus 或其他等效软件）右键单击该文件，
    在 Mac 上选择“open”，在 Linux 上选择“extract here”，或在 Windows 上选择“extract all…”。
    要了解关于 shell 的更多信息，请在维基百科中搜索 Windows shell，Mac/Linux用户可搜索 bash shell。
```
