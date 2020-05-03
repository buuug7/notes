## ubuntu related

#### proftpd

```
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

#### 常用卸载命令

```
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

#### 查看是那个发行版，比如是 centos 或者 ubuntu

```
lsb_release -a
```

#### ubuntu 安装 php7+nginx+mysql

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

#### ubuntu 转换 php5 跟 php7

```
a2dismod php5
a2enmod php7
```

#### ubuntu 卸载 apache2

```
sudo apt-get remove apache2*
```

#### ubuntu 安装 php5 php7

```
sudo add-apt-repository ppa:ondrej/php
sudo apt-get update
// php5.6
sudo apt-get -y install php5.6 php5.6-mcrypt php5.6-mbstring php5.6-curl php5.6-cli php5.6-mysql php5.6-gd php5.6-intl php5.6-xsl php5.6-zip php5.6-fpm

// php7.1
sudo apt-get -y install php7.1 php7.1-mcrypt php7.1-mbstring php7.1-curl php7.1-cli php7.1-mysql php7.1-gd php7.1-intl php7.1-xsl php7.1-zip php7.1-fpm
```

#### php 安装有些项目时提示 requires ext-dom

```
// 需要安装xml
apt-get install php7.1-xml
```

#### apache2

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
