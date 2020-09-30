# MYSQL 中数据类型

主要包括以下五大类:

- 整数类型: BIT、BOOL、TINY INT、SMALL INT、MEDIUM INT、 INT、 BIG INT
- 浮点数类型: FLOAT、DOUBLE、DECIMAL
- 字符串类型: CHAR、VARCHAR、TINY TEXT、TEXT、MEDIUM TEXT、LONGTEXT、TINY BLOB、BLOB、MEDIUM BLOB、LONG BLOB
- 日期类型: Date、DateTime、TimeStamp、Time、Year
- 其他数据类型: BINARY、VARBINARY、ENUM、SET、Geometry、Point、MultiPoint、LineString、MultiLineString、Polygon、GeometryCollection 等

## 整型

- tinyint(m) 1 个字节 范围(-128~127)
- smallint(m) 2 个字节 范围(-32768~32767)
- mediumint(m) 3 个字节 范围(-8388608~8388607)
- int(m) 4 个字节 范围(-2147483648~2147483647)
- bigint(m) 8 个字节 范围(+-9.22\*10 的 18 次方)

取值范围如果加了 unsigned, 则最大值翻倍, 如 tinyint unsigned 的取值范围为(0~256)。

int(m)里的 m 是表示 SELECT 查询结果集中的显示宽度, 并不影响实际的取值范围, 没有影响到显示的宽度, 不知道这个 m 有什么用。

## 浮点型(float 和 double)

- float(m,d) 单精度浮点型 8 位精度(4 字节) m 总个数, d 小数位
- double(m,d) 双精度浮点型 16 位精度(8 字节) m 总个数, d 小数位

设一个字段定义为 float(6,3), 如果插入一个数 123.45678,实际数据库里存的是 123.457, 但总个数还以实际为准, 即 6 位。整数部分最大是 3 位, 如果插入数 12.123456, 存储的是 12.1234, 如果插入 12.12, 存储的是 12.1200.

## 定点数

浮点型在数据库中存放的是近似值, 而定点类型在数据库中存放的是精确值。

decimal(m,d) 参数 m<65 是总个数, d<30 且 d<m 是小数位。

## 字符串(char,varchar,text)

- char(n) 固定长度, 最多 255 个字符
- varchar(n) 固定长度, 最多 65535 个字符
- tinytext 可变长度, 最多 255 个字符
- text 可变长度, 最多 65535 个字符
- mediumtext 可变长度, 最多 2 的 24 次方-1 个字符
- longtext 可变长度, 最多 2 的 32 次方-1 个字符

char 和 varchar:

- char(n) 若存入字符数小于 n, 则以空格补于其后, 查询之时再将空格去掉。所以 char 类型存储的字符串末尾不能有空格, varchar 不限于此。
- char(n) 固定长度, char(4)不管是存入几个字符, 都将占用 4 个字节, varchar 是存入的实际字符数+1 个字节（n<=255）或 2 个字节(n>255), 所以 varchar(4),存入 3 个字符将占用 4 个字节。
- char 类型的字符串检索速度要比 varchar 类型的快。

varchar 和 text:

- varchar 可指定 n, text 不能指定, 内部存储 varchar 是存入的实际字符数+1 个字节（n<=255）或 2 个字节(n>255), text 是实际字符数+2 个字节。
- text 类型不能有默认值。
- varchar 可直接创建索引, text 创建索引要指定前多少个字符。varchar 查询速度快于 text,在都创建索引的情况下, text 的索引似乎不起作用。

## 二进制数据(Blob)

- BLOB 和 text 存储方式不同, TEXT 以文本方式存储, 英文存储区分大小写, 而 Blob 是以二进制方式存储, 不分大小写。
- BLOB 存储的数据只能整体读出。
- TEXT 可以指定字符集, Blob 不用指定字符集。

## 日期时间类型

- date 日期 '2008-12-2'
- time 时间 '12:25:36'
- datetime 日期时间 '2008-12-2 22:06:44'
- timestamp 时间戳,存储的是 int 类型的毫秒值

## 数据类型的属性

- NULL 数据列可包含 NULL 值
- NOT NULL 数据列不允许包含 NULL 值
- DEFAULT 默认值
- PRIMARY KEY 主键
- AUTO_INCREMENT 自动递增, 适用于整数类型
- UNSIGNED 无符号
- CHARACTER SET name 指定一个字符集

## MYSQL 数据类型的长度和范围

格式: 数据类型 字节长度 范围或用法

- Bit 1 无符号[0,255], 有符号[-128,127], BIT 和 BOOL 布尔型都占用 1 字节
- TinyInt 1 整数[0,255]
- SmallInt 2 无符号[0,65535], 有符号[-32768,32767]
- MediumInt 3 无符号[0,2^24-1], 有符号[-2^23,2^23-1]]
- Int 4 无符号[0,2^32-1], 有符号[-2^31,2^31-1]
- BigInt 8 无符号[0,2^64-1], 有符号[-2^63 ,2^63 -1]
- Float(M,D) 4 单精度浮点数。D 是精度, 如果 D<=24 则为默认的 FLOAT, 如果 D>24 则会自动被转换为 DOUBLE 型。
- Double(M,D) 8 双精度浮点。
- Decimal(M,D) M+1 或 M+2 未打包的浮点数, 用法类似于 FLOAT 和 DOUBLE, 如果在 ASP 中使用到 Decimal 数据类型, 直接从数据库读出来的 Decimal 可能需要先转换成 Float 或 Double 类型后再进行运算。
- Date 3 以 YYYY-MM-DD 的格式显示, 比如: 2009-07-19
- Date Time 8 以 YYYY-MM-DD HH:MM:SS 的格式显示, 比如: 2009-07-19 11: 22: 30
- TimeStamp 4 以 YYYY-MM-DD 的格式显示, 比如: 2009-07-19
- Time 3 以 HH:MM:SS 的格式显示。比如: 11: 22: 30
- Year 1 以 YYYY 的格式显示。比如: 2009
- Char(M) M
- 定长字符串。
- VarChar(M) M 变长字符串, 要求 M<=255
- Binary(M) M 类似 Char 的二进制存储, 特点是插入定长不足补 0
- VarBinary(M) M 类似 VarChar 的变长二进制存储, 特点是定长不补 0
- Tiny Text Max:255 大小写不敏感
- Text Max:64K 大小写不敏感
- Medium Text Max:16M 大小写不敏感
- Long Text Max:4G 大小写不敏感
- TinyBlob Max:255 大小写敏感
- Blob Max:64K 大小写敏感
- MediumBlob Max:16M 大小写敏感
- LongBlob Max:4G 大小写敏感
- Enum 1 或 2 最大可达 65535 个不同的枚举值
- Set 可达 8 最大可达 64 个不同的值

## 使用建议

- 在指定数据类型的时候一般是采用从小原则, 比如能用 TINY INT 的最好就不用 INT, 能用 FLOAT 类型的就不用 DOUBLE 类型, 这样会对 MYSQL 在运行效率上提高很大, 尤其是大数据量测试条件下。
- 不需要把数据表设计的太过复杂, 功能模块上区分或许对于后期的维护更为方便, 慎重出现大杂烩数据表
- 数据表和字段的起名字也是一门学问
- 设计数据表结构之前请先想象一下是你的房间, 或许结果会更加合理、高效
- 数据库的最后设计结果一定是效率和可扩展性的折中, 偏向任何一方都是欠妥的

## 选择数据类型的基本原则

前提: 使用适合存储引擎。
选择原则: 根据选定的存储引擎, 确定如何选择合适的数据类型。

下面的选择方法按存储引擎分类:

- MyISAM 数据存储引擎和数据列: MyISAM 数据表, 最好使用固定长度(CHAR)的数据列代替可变长度(VARCHAR)的数据列。
- MEMORY 存储引擎和数据列: MEMORY 数据表目前都使用固定长度的数据行存储, 因此无论使用 CHAR 或 VARCHAR 列都没有关系。两者都是作为 CHAR 类型处理的。
- InnoDB 存储引擎和数据列: 建议使用 VARCHAR 类型。

对于 InnoDB 数据表, 内部的行存储格式没有区分固定长度和可变长度列（所有数据行都使用指向数据列值的头指针）, 因此在本质上, 使用固定长度的 CHAR 列不一定比使用可变长度 VARCHAR 列简单。因而, 主要的性能因素是数据行使用的存储总量。由于 CHAR 平均占用的空间多于 VARCHAR, 因 此使用 VARCHAR 来最小化需要处理的数据行的存储总量和磁盘 I/O 是比较好的。

## 关于固定长度数据列与可变长度的数据列

#### char 与 varchar

CHAR 和 VARCHAR 类型类似, 但它们保存和检索的方式不同。它们的最大长度和是否尾部空格被保留等方面也不同。在存储或检索过程中不进行大小写转换。

下面的表显示了将各种字符串值保存到 CHAR(4)和 VARCHAR(4)列后的结果, 说明了 CHAR 和 VARCHAR 之间的差别:

| 值         | CHAR(4) | 存储需求 | VARCHAR(4) | 存储需求 |
| ---------- | ------- | -------- | ---------- | -------- |
| ''         | '....'  | 4 个字节 | ''         | 1 个字节 |
| 'ab'       | 'ab..'  | 4 个字节 | 'ab'       | 3 个字节 |
| 'abcd'     | 'abcd'  | 4 个字节 | 'abcd'     | 5 个字节 |
| 'abcdefgh' | 'abcd'  | 4 个字节 | 'abcd'     | 5 个字节 |

请注意上表中最后一行的值只适用不使用严格模式时；如果 MySQL 运行在严格模式, 超过列长度不的值不保存, 并且会出现错误。

从 CHAR(4) 和 VARCHAR(4) 列检索的值并不总是相同, 因为检索时从 CHAR 列删除了尾部的空格。通过下面的例子说明该差别:

```sql
CREATE TABLE vc (v VARCHAR(4), c CHAR(4));
INSERT INTO vc VALUES ('ab ', 'ab ');

SELECT CONCAT(v, '+'), CONCAT(c, '+') FROM vc;
-- +----------------+----------------+
-- | CONCAT(v, '+') | CONCAT(c, '+') |
-- +----------------+----------------+
-- | ab + | ab+ |
-- +----------------+----------------+
-- 1 row in set (0.00 sec)
```

#### 浮点数与定点数

为了能够引起大家的重视, 在介绍浮点数与定点数以前先让大家看一个例子

```sql
CREATE TABLE test (c1 float(10,2),c2 decimal(10,2));
insert into test values(131072.32,131072.32);

select * from test;
-- +-----------+-----------+
-- | c1 | c2 |
-- +-----------+-----------+
-- | 131072.31 | 131072.32 |
-- +-----------+-----------+
-- 1 row in set (0.00 sec)
```

从上面的例子中我们看到 c1 列的值由 131072.32 变成了 131072.31, 这就是浮点数的不精确性造成的。在 mysql 中 float、double（或 real）是浮点数, decimal（或 numberic）是定点数。

浮点数相对于定点数的优点是在长度一定的情况下, 浮点数能够表示更大的数据范围, 它的缺点是会引起精度问题。在今后关于浮点数和定点数的应用中, 大家要记住以下几点:

- 浮点数存在误差问题；
- 对货币等对精度敏感的数据, 应该用定点数表示或存储；
- 编程中, 如果用到浮点数, 要特别注意误差问题, 并尽量避免做浮点数比较；
- 要注意浮点数中一些特殊值的处理。
