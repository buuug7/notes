# ubuntu related

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
      # 可选配置
      # nameservers:
      #   addresses: [8.8.8.8, 1.1.1.1]
```

完毕后使用`sudo netplan apply`应用配置, 查看设定是否应用成功使用`ip addr`查看结果.

参考:

- [how-to-configure-static-ip-address-on-ubuntu-20-04](https://linuxize.com/post/how-to-configure-static-ip-address-on-ubuntu-20-04/)

## ubuntu 设置时区

新版本的 ubuntu 推荐使用 `timedatectl`来查看系统时区设定。也可以使用 `cat /etc/timezone` 命令查看当前系统设置的时区，但是现在不推荐。

如果要修改时区设定，先使用`timedatectl list-timezones`列出系统支持的所有时区信息，找出你需要设置的时区。然后使用 `timedatectl set-timezone your_time_zone` 来设置时区，比如设定`Asia/Shanghai`, 则可以使用`timedatectl set-timezone Asia/Shanghai`.

使用 tzdata 现在不推荐这种方式了。

## hyper-v 设置分辨率

```
设置分辨率
打开grub
vim /etc/default/grub

按i进入编辑状态，找到：
GRUB_CMDLINE_LINUX_DEFAULT=“quiet splash”

在之后加入分辨率设置：
GRUB_CMDLINE_LINUX_DEFAULT=“quiet splash video=hyperv_fb:1280x720”

按Esc，退出编辑；按Shift + : 然后输入wq保存退出

运行sudo update-grub

运行root重启
```

#### 安装 git lfs

```bash
curl -s https://packagecloud.io/install/repositories/github/git-lfs/script.deb.sh | sudo bash
sudo apt-get install git-lfs
git lfs install
```

## 上传下载文件

```bash
# 从远程主机copy文件到本地
scp -r username@1.2.3.4:/home/username/myFile.txt .

# 从本地copy文件到原创主机
scp -r myFile.txt username@1.2.3.4:/home/username/
```

## ubuntu 查看 IP

```
ifconfig -a
```

## proftpd

```bash
sudo apt-get update
sudo apt-get dist-upgrade

sudo apt-get install proftpd

sudo nano /etc/proftpd/proftpd.conf

# add user

> Hello. After hours and hours of trying out solutions i finally found one that worked on multiple vps'es.

Here are the following steps:

nano /etc/shells
add the following to the end of the file

/bin/false
Now create an account using:

useradd USERNAME -d /home/USERNAME -s /bin/false
Give the user a password

passwd USERNAME
create a folder for the user.

mkdir /home/USERNAME
Give the ownership to the user

chown -R USERNAME:USERNAME /home/USERNAME
you are done right now it should work if you followed the steps correctly

Connect to your FTP server

Just type ftp://server_ip_address in the address bar of your browser. Replace server_ip_address with the IP address of your server. You will then be asked for your username and password

You can see who is connected to your FTP server with the following command.

ftpwho
Also, you can see statistics.

ftpstats
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

## ubuntu 安装 php7+nginx+mysql

```
add-apt-repository ppa:ondrej/php 添加php源
apt-get update

sudo apt-get install php7.1-fpm php7.1-mysql php7.1-common php7.1-curl php7.1-cli php7.1-mcrypt php7.1-mbstring php7.1-dom

sudo apt-get install php7.1-cgi 单独安装cgi


// 安装nginx
sudo apt-get install nginx

// 编辑 vim /etc/nginx/sites-available/default

location ~ \.php$ {
        include snippets/fastcgi-php.conf;
    #
    #   # With php7.0-cgi alone:
    #   fastcgi_pass 127.0.0.1:9000;
    #   # With php7.1-fpm:
        fastcgi_pass unix:/run/php/php7.1-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
    }


// 安装mysql
sudo apt-get install msyql-server mysql-client

// 修改mysql密码
update user set authentication_string=password('yourpassword') where user='root';

```

## ubuntu 转换 php5 跟 php7

```
a2dismod php5
a2enmod php7
```

## ubuntu 卸载 apache2

```
sudo apt-get remove apache2*
```

## ubuntu 安装 php5 php7

```
sudo add-apt-repository ppa:ondrej/php
sudo apt-get update
// php5.6
sudo apt-get -y install php5.6 php5.6-mcrypt php5.6-mbstring php5.6-curl php5.6-cli php5.6-mysql php5.6-gd php5.6-intl php5.6-xsl php5.6-zip php5.6-fpm

// php7.1
sudo apt-get -y install php7.1 php7.1-mcrypt php7.1-mbstring php7.1-curl php7.1-cli php7.1-mysql php7.1-gd php7.1-intl php7.1-xsl php7.1-zip php7.1-fpm
```

## php 安装有些项目时提示 requires ext-dom

```
// 需要安装xml
apt-get install php7.1-xml
```

## apache2

[官网文档](http://httpd.apache.org/docs/)

```
// 查看版本
apache2 -v

// 切换站点
a2ensite
a2dissite
// 例如切换 000-default.conf
a2ensite 000-default
a2dissite 000-default

// 切换模块
a2enmod
a2dismod

// 例如切换php版本
a2dismod php5.6
a2enmod php7.1
service apache2 restart

// 切换配置
a2enconf
a2disconf
```
