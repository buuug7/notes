## mysql related

### ubuntu20.04 允许 mysql 远程连接

```bash
# /etc/mysql/mysql.conf.d/mysqld.conf
# comment bind_address=127.0.0.1
# or set bind_address=0.0.0.0

grant all privileges on *.* to root@"%" identified by "root" with grant option;
flush privileges;
```

### 设置 mysql 密码策略跟最小长度

```
set global validate_password_policy = 0;
set global validate_password_length = 4;
```

### ubuntu 安装 mysql 5.7+

```
## 1
## 安装
sudo apt update
sudo apt install mysql-server

## 2
## 启动mysql
sudo service mysql start

## 3
## 根据提示配置安全 Run the security script
sudo mysql_secure_installation
```

> <https://www.digitalocean.com/community/tutorials/how-to-install-mysql-on-ubuntu-18-04>

### 完整登陆 mysql 命令

```
mysql -h主机 -u用户名 -p密码 -P端口号
```

### 添加用户并赋予权限

```mysql
CREATE USER 'username'@'%' IDENTIFIED BY 'ThePassword'; -- Creates the user
GRANT ALL PRIVILEGES ON *.* TO 'username'@'%' WITH GRANT OPTION; -- Gives all the privileges to the new user on the newly created database
```

### 查看当前用户认证信息

```mysql
SELECT user, authentication_string, plugin, host FROM mysql.user;
```

### 修改 root 用户认证密码 plugin

```mysql
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
FLUSH PRIVILEGES ;
```

### Removing MySQL with APT

```bash
# To uninstall the MySQL server and the related components that have been installed using the MySQL APT repository, first, remove the MySQL server using the following command:
sudo apt-get remove mysql-server

# Then, remove any other software that was installed automatically with the MySQL server:
sudo apt-get autoremove

# To uninstall other components, use the following command, replacing package-name with the name of the package of the component you want to remove:
sudo apt-get remove package-name

# To see a list of packages you have installed from the MySQL APT repository, use the following command:
dpkg -l | grep mysql | grep ii
```

### 在 ubuntu 删除 mysql

```
apt-get remove -y --purge mysql-server mysql-client mysql-common
apt-get autoremove -y
apt-get autoclean

rm -rf /var/lib/mysql
rm -rf /var/log/mysql
rm -rf /etc/mysql
```

### 创建数据库

```mysql
create database `awesome_comments` default charset utf8mb4 collate utf8mb4_unicode_ci;
```

### 另外

--添加唯一键
ALTER TABLE `test2` ADD UNIQUE ( `userid`)

--修改主键
ALTER TABLE `test2` DROP PRIMARY KEY ,ADD PRIMARY KEY ( `id` )

--增加索引
ALTER TABLE `test2` ADD INDEX ( `id` )
ALTER TABLE `category` MODIFY COLUMN `id` int(11) NOT NULL AUTO_INCREMENT FIRST ,ADD PRIMARY KEY (`id`);

删除某一字段
ALTER TABLE mytable DROP 字段 名;

### mysql 导入 sql 文件

```
source d:/datafilename.sql
```

### mysql 错误显示法语的解决办法

mysql.ini 文件里头有一个参数叫做 lc-messages
你把它的值 设成 lc-messages=en_US， 然后重启 mysql 服务，mysql 错误提示就可以显示英文了。

### mysql 语句顺序

select 语句的完整形式:

```
select [all|distinct|distinctrow|top]
{*|table.*|[table.]field1[AS alias1][,[table.]field2[AS alias2][,...]]}
from tableExpression[,...][IN externaldatabase]
[where...]
[group by...]
[having...]
[order by...]
[limit ...]
[with ownerAccess option]

```

### mysql find_in_set 的相反用法是 not find_in_set

FIND_IN_SET returns the index of the match if it is found,
and returns 0 if it is not found.
Since 0 is FALSE you can just use NOT FIND_IN_SET('needle', 'haystack')

### mysql 日期处理

选定当前的日期：
select now();

格式化日期：
mysql> select date_format(now(),'%Y -%m-%d %H:%i:%s');

显示当前版本和日期
select version(), current_date;

### mysql 基本操作

```
// 创建数据库
create {database|schema} [if not exists] db_name;

// 删除指定的数据库,mysql不支持一次删除多个数据库
drop database [if exists] db_name;

// 查看数据库
show {database};

// 显示所有数据库
show databases;

// 显示正在使用的数据库
select database();

// 查看上一步的警告
show warnings;

// 查看已经创建好的数据库的编码方式
show create database db_name;

// 创建数据库的同时指定编码方式
create {database|schema} [if not exists] db_name [default character set='utf8'];

// 修改已创建好的数据库的编码方式
alter {database|schema} db_name [default] character set [=]  '字符集';

// 打开指定的数据库
use db_name;

// 登陆的同时打开指定的数据库
mysql -u用户名 -p密码 -Ddb_name


// 在mysql数据库下的名字叫mysql的数据库user表存放着当前用户的一些信息

// 进入mysql数据库控制台:
mysql -u 用户名 -p

// 在插入中文之前临时转换客户端编码方式:set names gbk;

// 查看mysql手册方法:
?命令
help 命令


// 数据表是存储数据结构的表格

// 创建数据表语法:
create table [if not exists] table_name(column_name column_type );

// 查看表结构
desc table_name
// 或者
show columns from table_name;

// 查看创建表的语句
show create table table_name;

// mysql中的注释
--注释内容,或者#注释内容

// 字段添加注释
字段后面 comment 注释内容

// 刷新数据库
flush privileges

// 用文本方式导入sql语句到mysql中：
// 命令：/. c:/data.sql
// 记着后面没有`;`号

// 清空表格记录
delete from 表名

```

### mysql 中的数据类型:一个值的集合以及定义在这个值集合上的一组操作

- 整型
  - bit 位字段,1-64 位,储存 0,1 序列. `select b'1'`
  - tinyint 占用一个字节,范围-128~127
  - smallint 占用二个字节,范围 -23768~32767(unsigned 65535)
  - mediumint 占用三个字节,范围-8388608 ～ 8388607
  - int 占用四个字节,范围-2147483648 ～ 2147483647
  - bigint 占用 8 个字节,范围-9223372036854775808 ～ 9223372036854775807
- 浮点数
  - float(M,D) 单精度
  - double(M,D) 双精度
  - 定点数 decimal(M,D)
- boolean 0 或者 1
- 日期类型
  - date 3 `yyyy:MM:dd` 表示`1000-01-01～9999-12-31`的日期
  - time 3 HH:mm:ss
  - datetime 8 date 和 time 的组合
  - timestamp 4 功能和 datetime 相同,但是范围比较小`1970-01-01 00:00:00~2037-12-31 23:59:59`
  - year,用两位表示,范围是`1970~2069`,用四位表示范围是`1901~2155`
- 字符型
  - char(M) 定长 0~255,默认为 1,后面用空格填充制定长度
  - varchar(M) M<=255,变长 0~65536
  - text
    - tinytext 最大长度为 255
    - text 最大长度为 64k
    - mediumtext 最大长度为 16k
    - longtext 最大长度 4gb
  - set 集合,最多 64 个成员,可以是多个值的一个集合
  - enum 枚举类型最多 65535 个值,其存储的是你枚举值得编号,在插入的时候可以插入枚举的值或者其对应的编号,每次只能插入其中的一个值
- 二进制 可以存储任何数据

  - tinyblob 最大长度 255 字节
  - blob 最大长度 64KB
  - mediumblob 最大长度 16mb
  - longblob 最大长度 4gb

### 约束:表级约束,字段约束

- 主键约束(primary key),主键是每一条信息的唯一标识
- 自增长约束(auto_increment)
- 非空约束(not null)
- 默认值约束(default)
- 无符号 unsigned
- 零填充 zerofill
- 唯一约束 unique，特例是 null 值不认为相同

### mysql 中的存储引擎

默认的一般为 innodb,常见的三种存储引擎的优缺点

- innodb 存储格式为.frm,支持事务,支持外键,安全,缺点是读写效率差,占用空间大
- myisam 存储格式为.frm,.myd,.myi,show varilables,占用空间小,处理速度快,缺点是不支持事务,适合插入读取
- memory 存储格式为.frm,处理速度快,缺点是异常无法恢复,适合一次性存储,如果需要快速读取,对安全性要求不高可以选择该引擎

修改存储引擎:
修改配置文件中的 default-storage-engine,记着修改后需要重启 mysql
也可以再创建表的时候指定存储引擎,例如:

```
create table testengine2(
id int primary key auto_increment
);engine=memory
```

### 统计函数

```
SELECT COUNT(column) FROM tb_name
SELECT AVG(column) FROM tb_name
SELECT SUM(column) FROM tb_name
SELECT MAX(column) FROM tb_name
SELECT MIN(column) FROM tb_name
```

### 别名

As 可以省略

```mysql
select * from user u;

select * from user as u;

select username as name from user;

select username name from user;
```

### 备份数据库

在命令提示行首先进入 MySQL 目录下的 bin 或者吧 mysqldump 所在路径加入系统 path 里，
然后输入命令：

```
// 这里mydata是数据库名称，root是用户名，c:\\temp\\tes.sql是输出到指定文件夹的文件
mysqldump -u root -p mydata>c:\\temp\\tes.sql
```

导入备份的

```
mysql -u root -p root dbname<c:\\temp\\tes.sql
```

也可以用 mysqldump 导入数据库:

```
mysqldump -u 用户名 -p 数据库名称 < [路径]脚本.sql
```

也可以用 mysql 命令导入,先进入 cmd 到 bin:

```
mysql -u 用户名 -p -D 数据库名称 < [路径]脚本.sql
```

### mysql index key 区别

- 如果只是 key 的话，就是普通索引。mysql 的 key 和 index 多少有点令人迷惑，单独的 key 和其它关键词结合的 key(primary key)实际表示的意义是不同，这实际上考察对数据库体系结构的了解的。

- key 是数据库的物理结构，它包含两层意义和作用，一是约束（偏重于约束和规范数据库的结构完整性），二是索引（辅助查询用的）。包括 primary key, unique key, foreign key 等。

- primary key 有两个作用，一是约束作用（constraint），用来规范一个存储主键和唯一性，但同时也在此 key 上建立了一个 index；

- unique key 也有两个作用，一是约束作用（constraint），规范数据的唯一性，但同时也在这个 key 上建立了一个 index；

- foreign key 也有两个作用，一是约束作用（constraint），规范数据的引用完整性，但同时也在这个 key 上建立了一个 index；

可见，mysql 的 key 是同时具有 constraint 和 index 的意义，这点和其他数据库表现的可能有区别。（至少在 oracle 上建立外键，不会自动建立 index），因此创建 key 也有如下几种方式：

- 在字段级以 key 方式建立， 如 create table t (id int not null primary key);
- 在表级以 constraint 方式建立，如 create table t(id int, CONSTRAINT pk_t_id PRIMARY key (id));
- 在表级以 key 方式建立，如 create table t(id int, primary key (id));

其它 key 创建类似，但不管那种方式，既建立了 constraint，又建立了 index，只不过 index 使用的就是这个 constraint 或 key。

- index 是数据库的物理结构，它只是辅助查询的，它创建时会在另外的表空间（mysql 中的 innodb 表空间）以一个类似目录的结构存储。索引要分类的话，分为前缀索引、全文本索引等；
  因此，索引只是索引，它不会去约束索引的字段的行为（那是 key 要做的事情）。
  如，create table t(id int, index inx_tx_id (id));

总结，最后的释疑：

- 我们说索引分类，分为主键索引、唯一索引、普通索引(只有这一种才是纯粹的 index)等，也是基于是不是把 index 看作了 key。
  比如 create table t(id int, unique index inx_tx_id (id)); --index 当作了 key 使用

- 最重要的也就是，不管如何描述，理解 index 是纯粹的 index，还是被当作 key，当作 key 时则会有两种意义或起两种作用。

### 一个例子

```mysql
create table if not exists user
(
    id         int primary key auto_increment,
    username   varchar(255) not null,
    sex        enum ('boy','girl','secret') default 'secret',
    age        int unsigned,
    salary     float(5, 2),
    created_at datetime
);

insert into user(username, age, created_at)
values ('alex', 22, now());
```
