# SQL basic

## SQL

SQL(structure query language) is a standard language for storing, manipulating and retrieving data in databases.

SQL(结构化查询语言)是一种用来存储, 操作和获取数据库中数据的标准语言.

## RDBMS

RDBMS stands for Relational Database Management System.

RDBMS 指的是关系数据库管理系统.

RDBMS is the basis for SQL, and for all modern database systems such as MS SQL Server, IBM DB2, Oracle, MySQL, and
Microsoft Access.

RDBMS 是 SQL 的基本, 包括主流的现代化数据库系统, 比如 MS SQL Server, Oracle, Mysql, 和 Microsoft Access.

## table

The data in RDBMS is stored in database objects called tables. A table is a collection of related data entries and it
consists of columns and rows.

数据是以表的形式储存在 RDBMS 中的, 表是一系列相关数据的集合, 由列跟行组成.

## record

A record, also called a row, is each individual entry that exists in a table.

记录(也称为行)是表中存在的每个单独的条目.

A column is a vertical entity in a table that contains all information associated with a specific field in a table.

列是表中垂直条目, 包含了所有与特定字段关联的信息.

A database most often contains one or more tables. Each table is identified by a name (e.g. "Customers" or "Orders").
Tables contain records (rows) with data.

一个数据库通常包含多个表, 每一个表通过他们的名字来区分. 表中包含了记录.

## The SQL SELECT Statement

The `SELECT` statement is used to select data from a database. The data returned is stored in a result table, called the
result-set.

查询语句用来从数据库中获取数据, 返回的数据储存在一个结果表中, 称为结果集.

```sql
SELECT col1[AS alias1], ..., colN [AS aliasN]
FROM
  table_name;
```

```sql
select *
from user;
```

## SQL SELECT DISTINCT Statement

The `SELECT DISTINCT` statement is used to return only distinct (different) values. Inside a table, a column often
contains many duplicate values; and sometimes you only want to list the different (distinct) values.

Distinct 语句用来返回不重复的值. 在一个表中, 一个列通常包含了许多重复值, 有时你只想列出不同的值.

```sql
select distinct columnName
from user;
```

## SQL WHERE Clause

The `WHERE` clause is used to filter records. The `WHERE` clause is used to extract only those records that fulfill a
specified condition.

`Where` 语句用来过滤记录. 被用来精确返回符合指定条件的记录.

```sql
SELECT expr1[AS alias1], ..., exprN [AS aliasN]
FROM
  table_name
WHERE
  logical_expression;
```

```sql
select *
from user
where name = 'alex';
```

Operators in The WHERE Clause

- `=` equal
- `>` great than
- `<` less than
- `>=` great than or equal
- `<=` less than or equal
- `<>` or `!=` not equal
- `between` between a certain range
- `like` search for a pattern
- `in` to specify multiple possible values for a column

## SQL AND, OR and NOT Operators

The `WHERE` clause can be combined with `AND`, `OR`, and `NOT` operators.

where 语句可以跟 AND, OR, 和 Not 运算符结合使用.

The `AND` and `OR` operators are used to filter records based on more than one condition:

And 和 OR 操作符用来对数据过滤超过一个条件的时候使用.

The `NOT` operator displays a record if the condition(s) is NOT TRUE.

如果条件不是真, NOT 操作符显示该记录.

```sql
select *
from user
where age > 20
  and sex = 'boy';
select *
from user
where age > 20
   or age < 15;
select *
from user
where not name = 'alex';
```

## SQL ORDER BY Keyword

```sql
ORDER BY expr1 [ASC, DESC], ..., exprN [ASC, DESC];
```

The `ORDER BY` keyword is used to sort the result-set in ascending or descending order.

ORDER BY 关键字用来排序结果集.

The `ORDER BY` keyword sorts the records in ascending order by default. To sort the records in descending order, use
the `DESC` keyword.

`ORDER BY` 默认使用升序, 使用 `DESC` 关键字用来降序.

```sql
select *
from user
order by name asc, age desc;
```

## SQL INSERT INTO Statement

The `INSERT INTO` statement is used to insert new records in a table.

`INSERT INTO` 语句用来在表中插入新记录.

```sql
insert into user(name, age)
values ('alex', 22);
insert into user
values (null, 'alex', 22);
```

## What is a NULL Value?

A field with a NULL value is a field with no value.

一个字段的值是 NULL 代表该字段没有值.

If a field in a table is optional, it is possible to insert a new record or update a record without adding a value to
this field. Then, the field will be saved with a NULL value.

如果在表中的一个字段是可选的, 那么在插入新记录或者更新的时候不需要对该字段添加值. 然后, 该字段会被保存为 NULL 值.

## How to Test for NULL Values?

We will have to use the IS NULL and IS NOT NULL operators instead.

使用 IS NULL 和 NOT NULL 来判断.

```sql
select *
from user
where age is null;
select *
from user
where age is not null;
```

## SQL UPDATE Statement

The UPDATE statement is used to modify the existing records in a table.

更新语句用来修改存在的记录.

```sql
UPDATE table_name
SET col1 = expr1,
    col2 = expr2, …, colN = expr;
```

```sql
update user
set name = 'Twice'
where id = 1;
```

## SQL DELETE Statement

The `DELETE` statement is used to delete existing records in a table.

删除语句用来删除存在的记录.

```sql
delete
from user
where id = 1;

-- 删除user表中所有记录
delete
from user;
```

## SQL TOP, LIMIT or ROWNUM Clause

The `SELECT TOP` clause is used to specify the number of records to return.

`SELECT TOP` 语句用来返回指定数量的记录.

```sql
-- mysql
select *
from user limit 5;

-- sql server / MS Access
select top 5 *
from user;

-- oracle
select *
from user rownum <= 5;

```

## SQL MIN() and MAX() Functions

The `MIN()` function returns the smallest value of the selected column.

`MIN()` 函数返回选择列中最小的值.

The `MAX()` function returns the largest value of the selected column.

`MAX()` 函数返回选择列中最大值.

```sql
select min(id)
from user;
select max(id)
from user;
```

## SQL COUNT(), AVG() and SUM() Functions

The `COUNT()` function returns the number of rows that matches a specified criteria.

`COUNT()` 函数返回匹配指定条件行的数量.

The `AVG()` function returns the average value of a numeric column.

`AVG()` 函数返回数字列的平均值

The `SUM()` function returns the total sum of a numeric column.

`SUM()` 函数返回一个数字列的总和.

```sql
select count(id)
from user;
select avg(age)
from user;
select sum(age)
from user;
```

## SQL LIKE Operator

The `LIKE` operator is used in a `WHERE` clause to search for a specified pattern in a column.

`LIKE` 操作符用来在 `WHERE` 语句的列中指定搜索模式.

There are two wildcards often used in conjunction with the LIKE operator:

- `%` The percent sign represents zero, one, or multiple characters
- `%` 百分号代表一个或者多个字符
- `-` The underscore represents a single character
- `-` 下划线代表一个字符

```sql
select *
from user
where name like 't%';
select *
from user
where name like 'al_x';
```

## SQL Wildcards

A wildcard character is used to substitute one or more characters in a string.

通配符用来在字符串中替代一个或者多个字符.

wildcard characters are used with the SQL `LIKE` operator. The `LIKE` operator is used in a `WHERE` clause to search for
a specified pattern in a column.

通配符在 SQL `LIKE` 操作符中使用. 通常在 WHERE 字句中使用.

- `% stand for one or more character`
- `_ stand for single character`
- `[charlist] eg, [ab] stand for a or b`
- `[!charlist] eg, [!ab] stand for not a or not c`

Mysql 中使用 regexp

```sql
select *
from user
where name regexp '^[ab]';
select *
from user
where name regexp '[a-z]$'
```

## SQL IN Operator

The `IN` operator allows you to specify multiple values in a WHERE clause.

`IN` 操作符允许在 WHERE 指定多个值.

The `IN` operator is a shorthand for multiple `OR` conditions.

`IN` 操作符是多个 OR 条件的简写.

```sql
select *
from user
where name in ('alex', 'twice');
```

## SQL BETWEEN Operator

The `BETWEEN` operator selects values within a given range. The values can be numbers, text, or date.

BETWEEN 操作符从给定范围选择值, 值可以是数字, 文本或者日期.

The BETWEEN operator is inclusive: begin and end values are included.

BETWEEN 操作符包含开始和结束值.

```sql
select *
from user
where age between 22 and 24;
select *
from user
where age not between 22 and 24;
```

## SQL Aliases

SQL aliases are used to give a table, or a column in a table, a temporary name. Aliases are often used to make column
names more readable. An alias only exists for the duration of the query.

SQL 中别名用来给表, 列一个临时的名字. 别名通常用来使列名字更有可读性，别名的使用范围仅仅在该条查询语句中有效.

```sql
select u.name as username
from user as u;
```

## SQL Joins

A `JOIN` clause is used to combine rows from two or more tables, based on a related column between them.

JOIN 语句用来组合多个表, 基于多个表之间的关系.

![inner join](img_innerjoin.gif)
![left join](img_leftjoin.gif)
![right join](img_rightjoin.gif)
![full join](img_fulljoin.gif)

(INNER) JOIN: Returns records that have matching values in both tables

(内)连接: 返回两个表中都具有匹配的记录(交集)

LEFT (OUTER) JOIN: Returns all records from the left table, and the matched records from the right table

左(外)连接: 返回左表中所有记录, 以及右表中的匹配记录.

RIGHT (OUTER) JOIN: Returns all records from the right table, and the matched records from the left table

右(外)连接: 返回右表中所有记录, 以及左表中的匹配记录.

FULL (OUTER) JOIN: Returns all records when there is a match in either left or right table

全(外)连接: 当左表中或右表中有匹配项时返回所有记录

## SQL INNER JOIN Keyword

The `INNER JOIN` keyword selects records that have matching values in both tables.

`INNER JOIN` 关键字匹配存在两个表中的记录.

```sql
select user.name, article.title
from user
       inner join article on user.id = article.user_id;
-- equivalent above
select user.name, article.title
from user
       join article on user.id = article.user_id;
```

## SQL LEFT JOIN Keyword

The LEFT JOIN keyword returns all records from the left table (table1), and the matched records from the right table (
table2). The result is NULL from the right side, if there is no match.

左连接返回左表中所有记录, 和匹配右表的记录. 如果没有匹配, 右表返回的值都为空.

```sql
select user.name, article.title
from user
       left join article on user.id = article.user_id;
```

## SQL RIGHT JOIN Keyword

The `RIGHT JOIN` keyword returns all records from the right table (table2), and the matched records from the left
table (table1). The result is NULL from the left side, when there is no match.

右连接返回右表的所有记录, 以及左表中匹配的记录. 当没匹配的时候, 左侧表的值为空.

```sql
select user.name, article.title
from user
       right join article on user.id = article.user_id;
```

## SQL FULL OUTER JOIN Keyword

The `FULL OUTER JOIN` keyword return all records when there is a match in either left (table1) or right (table2) table
records.

全连接返回既满足左表又满足右表的所有记录.

Note: FULL OUTER JOIN can potentially return very large result-sets!

Tip: FULL OUTER JOIN and FULL JOIN are the same.

## SQL Self JOIN

A self JOIN is a regular join, but the table is joined with itself.

自连接时常规连接, 只是表跟自己连接而已.

```sql
SELECT column_name(s)
FROM table1 T1,
     table1 T2
WHERE condition;
```

```sql
select u1.name, u2.name
from user u1
       join user u2
where u1.id = u2.parent_id;
```

## SQL UNION Operator

The UNION operator is used to combine the result-set of two or more SELECT statements.

- Each SELECT statement within UNION must have the same number of columns
- The columns must also have similar data types
- The columns in each SELECT statement must also be in the same order

UNION 操作符用来把多个 SELECT 语句结合到一起.

- 每一个 SELECT 语句必须有相同的列
- 列必须有同样的数据类型
- 每一个 SELECT 语句的顺序必须一样

```sql
select name, age
from user
union
select name, age
from user;
```

The UNION operator selects only distinct values by default. To allow duplicate values, use UNION ALL:

UNION 操作符默认返回不同的值, 如果要返回重复值, 要使用 UNION ALL.

```sql
select name, age
from user
union all
select name, age
from user;
```

## SQL GROUP BY Statement

The `GROUP BY` statement group rows that have the same values into summary rows, like "find the number of customers in
each country".

GROUP BY 语句把具有相同值的行分组到概要行中. 例如"查找每一个国家的客户数量".

The `GROUP BY` statement is often used with aggregate functions (COUNT, MAX, MIN, SUM, AVG) to group the result-set by
one or more columns.

GROUP BY 语句通常跟聚合函数一起使用来分组结果集.

```sql
-- 按照年龄统计用户数
select age, count(*)
from user
group by age;
```

## SQL HAVING Clause

The `HAVING` clause was added to SQL because the `WHERE` keyword could not be used with aggregate functions.

HAVING 语句添加到 SQL 的原因是因为 WHERE 关键字不能用在聚合函数里面.

```sql
select age, count(id)
from user
group by age
having count(id) > 1;
```

## query group template

```sql
SELECT column_name[,
       list_of_other_columns]
     , aggregation [, list_of_aggregations]
FROM table_name
  [
WHERE list_of_conditions]
GROUP BY column_name [, list_of_other_columns]
  [
HAVING list_of_aggregate_conditions]
  [
ORDER BY list_of_columns/aliases];
```

## SQL EXISTS Operator

The `EXISTS` operator is used to test for the existence of any record in a subquery.

`EXISTS` 操作符用来测试子查询是否存在结果集.

The `EXISTS` operator returns true if the subquery returns one or more records.

`EXISTS` 操作符返会真如果子查询匹配到结果.

```sql
select name
from user
where exists(select age from user where age > 22);
```

## SQL ANY and ALL Operators

The `ANY` and `ALL` operators are used with a `WHERE` or `HAVING` clause.

`ANY` 和 `ALL` 操作符使用在 `WHERE` 或者 `HAVING` 语句中.

The `ANY` operator returns true if any of the subquery values meet the condition.

`ANY` 操作符返回真如果任何一个子查询返回值满足条件.

The `ALL` operator returns true if all the subquery values meet the condition.

ALL 操作符返回真如果所有子查询的返回值都满足条件.

```sql
select age
from user
where age > 22;
-- 23, 24

-- any
select name
from user
where age = any (select age from user where age > 22);
-- equivalent above
select name
from user
where age = 23
   or age = 24;

-- all
select name
from user
where age = all (select age from user where age > 22);
-- equivalent above
select name
from user
where age = 23
  and age = 24;
```

## SQL SELECT INTO Statement

The `SELECT INTO` statement copies data from one table into a new table.

`SELECT INTO` 语句把数据从一个表复制到一个新表.

```sql
SELECT *
INTO newtable [IN externaldb]
FROM oldtable
WHERE condition;

SELECT column1,
       column2,
       column3, ...
  INTO newtable [IN externaldb]
FROM oldtable
WHERE condition;
```

## SQL INSERT INTO SELECT Statement

The `INSERT INTO SELECT` statement copies data from one table and inserts it into another table.

- `INSERT INTO SELECT` requires that data types in source and target tables match
- The existing records in the target table are unaffected


INSERT INTO SELECT 语句复制数据从一个表插入到另外一个表中

- INSERT INTO SELECT 需求元数据和目标数据匹配
- 目标表中已经存在的数据不受影响

```sql
INSERT INTO table1 (column_1, column_2, ..., column_n)
SELECT column_1, column_2, ..., column_n
FROM table2
WHERE condition;
```

```sql
insert into user2
select *
from user;
```

## SQL CASE Statement

The CASE statement goes through conditions and returns a value when the first condition is met (like an IF-THEN-ELSE
statement). So, once a condition is true, it will stop reading and return the result. If no conditions are true, it
returns the value in the ELSE clause.

If there is no ELSE part and no conditions are true, it returns NULL.

```sql
CASE
    WHEN condition1 THEN result1
    WHEN condition2 THEN result2
    WHEN conditionN THEN resultN
    ELSE result
END;
```

## SQL NULL Functions

SQL IFNULL(), ISNULL(), COALESCE(), and NVL() Functions

```sql
select ifnull(name, 'default name')
from user;
select name
from user
where isnull(age);
```

## SQL Stored Procedures

TODO

## SQL COMMENTS

```sql
-- single line comments

/*
 multiple line comments
*/

```
