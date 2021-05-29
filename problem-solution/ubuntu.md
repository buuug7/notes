# ubuntu related

## 配置代理

```
export HTTP_PROXY=http://127.0.0.1:7890
export HTTPS_PROXY=$HTTP_PROXY

# Or if an authenticated proxy
export HTTP_PROXY=http://username:password@proxy.fqdn.or.ip:3128
export HTTPS_PROXY=$HTTP_PROXY
```

## 资源

- https://askubuntu.com/

## 修改密码

```
sudo passwd username
```

## 安装 docker

参考:

- https://docs.docker.com/engine/install/ubuntu/

## 添加一个用户到用户组

${USER} 代表当前用户, someGroupName 用真是的用户组名称替换

`sudo gpasswd -a ${USER} someGroupName`

## ubuntu 安装 nodejs

参考:

- https://github.com/nodesource/distributions

## 查看 DNS, 查看 IP

查看 DNS

```
resolvectl status
```

查看 IP

```
ip addr
```

## ubuntu 20.04 设置静态 IP

由于 ubuntu 17.10+　使用 [Netplan](https://netplan.io/) 作为默认的网络管理工具, 所以请使用 Netplan 配置网络, 之前的版本请使用 ifconfig 和`/etc/network/interfaces`来配置.

使用`ip link`查看当前的网络的名称, 一般就是`eth0`. 在 `/etc/netplan`目录下有个`00-installer-config.yaml`, 可能有些环境的名字会不同, 编辑该文件

```yaml
network:
  # the version of the network configuration format
  version: 2
  # device type: can be ethernets, bonds, bridges, or vlans
  ethernets:
    eth0:
      dhcp4: no
      addresses:
        - 172.24.112.2/20
      gateway4: 172.24.112.1
      # DNS
      nameservers:
        addresses: [8.8.8.8, 1.1.1.1]
```

完毕后使用`sudo netplan apply`应用配置, 查看设定是否应用成功使用`ip addr`查看结果.

参考:

- [how-to-configure-static-ip-address-on-ubuntu-20-04](https://linuxize.com/post/how-to-configure-static-ip-address-on-ubuntu-20-04/)

## ubuntu 设置时区

新版本的 ubuntu 推荐使用 `timedatectl`来查看系统时区设定。也可以使用 `cat /etc/timezone` 命令查看当前系统设置的时区，但是现在不推荐。

如果要修改时区设定，先使用`timedatectl list-timezones`列出系统支持的所有时区信息，找出你需要设置的时区。然后使用 `timedatectl set-timezone your_time_zone` 来设置时区，比如设定`Asia/Shanghai`, 则可以使用`timedatectl set-timezone Asia/Shanghai`.

使用 tzdata 现在不推荐这种方式了。

## 上传下载文件

```bash
# 从远程主机copy文件到本地
scp -r username@1.2.3.4:/home/username/myFile.txt .

# 从本地copy文件到原创主机
scp -r myFile.txt username@1.2.3.4:/home/username/
```

## 常用卸载命令

```bash
apt-get autoremove ：
删除为了满足其他软件包的依赖而安装的，系统会自动卸载这些不再需要的软件包

apt-get remove [+软件包名称]：
删除已安装的软件包（保留配置文件）。

apt-get –purge remove [+软件包名称]：
删除已安装包，同时删除配置文件。

autoclean:
删除已经卸载的软件包的.deb安装文件

apt-get clean：
删除安装了的软件包的安装包（如果你确定这些安装包不会再用）。

clean:
类似上面的命令，但它删除包缓存中的所有包。
```

## 查看是那个发行版，比如是 centos 或者 ubuntu

```
lsb_release -a
```
