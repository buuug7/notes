# SQL advance

## SQL CREATE DATABASE Statement

The CREATE DATABASE statement is used to create a new SQL database.

CREATE DATABASE 语句用来新建一个数据库。

Syntax 语法

```sql
CREATE DATABASE databasename;
```

```sql
-- mysql
create database if not exists my_table default charset utf8;
```

## SQL DROP DATABASE Statement

The DROP DATABASE statement is used to drop an existing SQL database.

DROP DATABASE 语句用来删除存在的数据库

Syntax 语法

```
DROP DATABASE databasename;
```

```mysql
drop database my_table;
```

## SQL BACKUP DATABASE

TODO

## The SQL CREATE TABLE Statement

The CREATE TABLE statement is used to create a new table in a database.

CREATE TABLE 语句用来创建新表

Syntax 语法

```
CREATE TABLE table_name (
    column1 datatype,
    column2 datatype,
    column3 datatype,
   ....
);
```

```mysql
create table if not exists user(
    id int primary key auto_increment,
    name varchar(255),
    age int
);
```

## SQL DROP TABLE Statement

The DROP TABLE statement is used to drop an existing table in a database.

DROP TABLE 语句用来删除表

Syntax 语法

```
DROP TABLE table_name;
```

```mysql
DROP TABLE if exists user;
-- 清空user表
truncate table user;

```

## 重命名列

```
alter table table_name change column_name new_column_name varchar(255);
```

## 调整列顺序

```
alter table table_name modify column_name  varchar(255) after id;
```

## SQL ALTER TABLE Statement

The ALTER TABLE statement is used to add, delete, or modify columns in an existing table.

ALTER TABLE 语句用来添加删除或者修改表中存在的列。

The ALTER TABLE statement is also used to add and drop various constraints on an existing table.

ALTER TABLE 语句也被用来为表添加删除多种约束

#### ALTER TABLE - ADD Column

```
ALTER TABLE table_name
ADD column_name datatype;
```

```mysql
alter table user add first_name varchar(255);
```

#### ALTER TABLE - DROP COLUMN

```
ALTER TABLE table_name
DROP COLUMN column_name;
```

```mysql
alter table user drop column first_name;
```

#### ALTER TABLE - ALTER/MODIFY COLUMN

```
# oracle / mysql
ALTER TABLE table_name
MODIFY COLUMN column_name datatype;
```

```mysql
alter table user modify name text;
```

## SQL Constraints

SQL constraints are used to specify rules for data in a table.

SQL 约束被用来指定表中数据的规则。

#### SQL Create Constraints

Constraints can be specified when the table is created with the CREATE TABLE statement, or after the table is created with the ALTER TABLE statement.

约束可以在表创建的时候指定，也可以在表创建成功狗通过 ALTER TABLE 语句来修改。

Syntax 语法

```
CREATE TABLE table_name (
    column1 datatype constraint,
    column2 datatype constraint,
    column3 datatype constraint,
    ....
);
```

#### SQL Constraints

SQL constraints are used to specify rules for the data in a table.

SQL 约束用来指定表中数据储存的规则。

Constraints are used to limit the type of data that can go into a table. This ensures the accuracy and reliability of the data in the table. If there is any violation between the constraint and the data action, the action is aborted.

约束可以限定表中储存数据的类型。这确保了数据的准确性和可信度。如果操作行为违背了约束，该行为会被取消。

Constraints can be column level or table level. Column level constraints apply to a column, and table level constraints apply to the whole table.

约束可以是列级别或者表级别。列级别应用在该列，表级别应用在全表。

The following constraints are commonly used in SQL:
SQL 中常用的约束有：

- NOT NULL - Ensures that a column cannot have a NULL value
- NOT NULL - 确保一列不包含 NULL 值
- UNIQUE - Ensures that all values in a column are different
- UNIQUE - 确保在列中所有值不相同
- PRIMARY KEY - A combination of a NOT NULL and UNIQUE. Uniquely identifies each row in a table
- PRIMARY KEY - 是 NOT NULL 和 UNIQUE 的组合。 唯一标识表中的每一行。
- FOREIGN KEY - Uniquely identifies a row/record in another table
- FOREIGN KEY - 在其他表中唯一的表示一条记录
- CHECK - Ensures that all values in a column satisfies a specific condition
- CHECK - 确保在一列中的所有值满足指定的条件
- DEFAULT - Sets a default value for a column when no value is specified
- DEFAULT - 当没有指定值的时候，为列设置默认值
- INDEX - Used to create and retrieve data from the database very quickly
- INDEX - 用来快速创建和获取表中的数据

## SQL NOT NULL Constraint

By default, a column can hold NULL values. The NOT NULL constraint enforces a column to NOT accept NULL values.

默认，一列可以储存 NULL 值。NOT NULL 约束强制一列不接受 NULL 值。

This enforces a field to always contain a value, which means that you cannot insert a new record, or update a record without adding a value to this field.

这会强制一个字段永远含有一个值，意味着你不能插入一条新记录或者更新一条记录在不指定值的情况下。

#### SQL NOT NULL on CREATE TABLE

```mysql
CREATE TABLE Persons (
    ID int NOT NULL,
    LastName varchar(255) NOT NULL,
    FirstName varchar(255) NOT NULL,
    Age int
);
```

#### SQL NOT NULL on ALTER TABLE

```mysql
alter table user modify column name varchar(255) not null;
```

## SQL UNIQUE Constraint

The UNIQUE constraint ensures that all values in a column are different. Both the UNIQUE and PRIMARY KEY constraints provide a guarantee for uniqueness for a column or set of columns.

UNIQUE 约束确保一个列中所有制都不同。UNIQUE 和 PRIMARY KEY 约束都可以为一列或者列集合确保不同的值。

A PRIMARY KEY constraint automatically has a UNIQUE constraint. However, you can have many UNIQUE constraints per table, but only one PRIMARY KEY constraint per table.

一个 PRIMARY KEY 约束会自动的提供 UNIQUE 约束。然而，你可以在每个表中设定多个 UNIQUE 约束，但是 PRIMARY KEY 约束在每个表中只能有一个。

#### SQL UNIQUE Constraint on CREATE TABLE

```mysql
CREATE TABLE Persons (
    ID int NOT NULL,
    LastName varchar(255) NOT NULL,
    FirstName varchar(255),
    Age int,
    UNIQUE (ID)
);
```

#### SQL UNIQUE Constraint on ALTER TABLE

```mysql
alter table my_table add unique (name);
-- or give a custom constraint name
alter table my_table add constraint unique_name unique (name);
```

#### DROP a UNIQUE Constraint

```mysql
alter table my_table drop index unique_name;
```

## SQL PRIMARY KEY Constraint

The PRIMARY KEY constraint uniquely identifies each record in a table. Primary keys must contain UNIQUE values, and cannot contain NULL values.

PRIMARY KEY 约束用来唯一标识表中的一条记录。PRIMARY 必须包含 UNIQUE 值，并且不能包含 NULL 值。

A table can have only ONE primary key; and in the table, this primary key can consist of single or multiple columns (fields).

一个表只能有一个主键。一个主键可以由一个或者多个列组成。

#### SQL PRIMARY KEY on CREATE TABLE

```mysql
create table my_table(
    id int not null,
    name varchar(255),
    primary key (id)
);

-- or
create table my_table(
    id int not null,
    name varchar(255),
    constraint PK_MY_TABLE primary key (id)
);
```

#### SQL PRIMARY KEY on ALTER TABLE

```mysql
alter table my_table add primary key (id);
-- or
alter table my_table add constraint PK_MY_TABLE primary key (id);
```

#### DROP a PRIMARY KEY Constraint

```mysql
alter table my_table drop primary key ;
```

## SQL FOREIGN KEY Constraint

A FOREIGN KEY is a key used to link two tables together. A FOREIGN KEY is a field (or collection of fields) in one table that refers to the PRIMARY KEY in another table.

一个外键通常被用作关联两个表，一个外键是表中一个指向另外一张表主键的字段。

The table containing the foreign key is called the child table, and the table containing the candidate key is called the referenced or parent table.

包含外键的表叫做子表，包含候选键的表叫做引用表或者父表。

#### SQL FOREIGN KEY on CREATE TABLE

```mysql
create table my_table(
    id int primary key auto_increment,
    user_id int not null ,
    foreign key (id) references user(id)
);

-- or
create table my_table(
    id int not null primary key auto_increment,
    user_id int not null ,
    constraint FK_USER_ID foreign key (user_id) references user(id)
);
```

#### SQL FOREIGN KEY on ALTER TABLE

```mysql
alter table my_table add foreign key (user_id) references user(id);
```

#### DROP a FOREIGN KEY Constraint

```mysql
alter table my_table drop foreign key FK_USER_ID;
```

## SQL CHECK Constraint

The CHECK constraint is used to limit the value range that can be placed in a column.

CHECK 约束被用来限制列中填充数据的范围。

If you define a CHECK constraint on a single column it allows only certain values for this column.

如果你在单个列上定义了 CHECK 约束，那么该字段它只允许特定的值。

If you define a CHECK constraint on a table it can limit the values in certain columns based on values in other columns in the row.

如果你在一张表上定义了 CHECK 约束，则可以根据行中其他列中的值限制某些列中的值。

#### SQL CHECK on CREATE TABLE

```mysql
create table my_table(
    id int not null primary key auto_increment,
    age int,
    check ( age > 18 )
)
```

#### SQL CHECK on ALTER TABLE

```mysql
alter table my_table add check ( age > 18 );
-- or
alter table my_table add constraint CHECK_AGE check ( age > 18 );
```

#### DROP a CHECK Constraint

```mysql
-- mysql 很多存储引擎不支持CHECK
alter table my_table drop CHECK CHECK_AGE;
```

## SQL DEFAULT Constraint

The DEFAULT constraint is used to provide a default value for a column. The default value will be added to all new records IF no other value is specified.

DEFAULT 约束用来给列提供默认值。如果未提供值，默认值会被添加进去。

#### SQL DEFAULT on CREATE TABLE

```mysql
create table my_table(
    id int not null,
    age int default 18
);
```

#### SQL DEFAULT on ALTER TABLE

```mysql
alter table my_table alter age set default 18;
```

#### DROP a DEFAULT Constraint

```mysql
alter table my_table alter age drop default;
```

## SQL CREATE INDEX Statement

The CREATE INDEX statement is used to create indexes in tables.

CREATE INDEX 语句用来创建索引

Indexes are used to retrieve data from the database very fast. The users cannot see the indexes, they are just used to speed up searches/queries.

索引用来快速的获取数据，用户看不见索引，他们仅仅被用来加速查询。

Syntax 语法

```sql
CREATE INDEX index_name
ON table_name (column1, column2, ...);

CREATE UNIQUE INDEX index_name
ON table_name (column1, column2, ...);
```

```sql
create index age_index on my_table(age);
create index id_age_index on my_table(id, age);

-- remove index
drop index age_index on my_table;
```

## SQL AUTO INCREMENT Field

Auto-increment allows a unique number to be generated automatically when a new record is inserted into a table.

自增允许当有新记录插入的时候自动生成一个唯一的数字。

Often this is the primary key field that we would like to be created automatically every time a new record is inserted.

通常用在主键上面用来生成一个行的唯一标识符

```sql
create table my_table(
    id int primary key auto_increment
);
```

## SQL Working With Dates

As long as your data contains only the date portion, your queries will work as expected. However, if a time portion is involved, it gets more complicated.

只要数据仅包含日期部分,查询就会按预期工作。但是,如果涉及时间部分,则它变得更加复杂。

Mysql：

- DATE - format YYYY-MM-DD
- DATETIME - format: YYYY-MM-DD HH:MI:SS
- TIMESTAMP - format: YYYY-MM-DD HH:MI:SS
- YEAR - format YYYY or YY

## SQL CREATE VIEW Statement

In SQL, a view is a virtual table based on the result-set of an SQL statement.

在 SQL 中，视图是基于一个 SQL 语句结果集的虚表。

A view contains rows and columns, just like a real table. The fields in a view are fields from one or more real tables in the database.

视图包含了行跟列，跟真实的表一样。视图中的字段可以来自不同的表。

You can add SQL functions, WHERE, and JOIN statements to a view and present the data as if the data were coming from one single table.

您可以将 SQL 函数、WHERE 和 JOIN 语句添加到视图中,并呈现数据,就像数据来自单个表一样。

Syntax

```sql
CREATE VIEW view_name AS
SELECT column1, column2, ...
FROM table_name
WHERE condition;
```

```sql
create view my_view as select * from user;
-- select from view
select * from my_view;
-- drop view
drop view my_view;
-- create or update a view
create or replace view my_view as select * from user;
```
