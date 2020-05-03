# common commands

## 杀死特定进程

```
kill -9 pid
```

## 查看端口占用情况

```
netstat  -anp  |grep   端口号

netstat   -nultp 该命令是查看当前所有已经使用的端口情
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
