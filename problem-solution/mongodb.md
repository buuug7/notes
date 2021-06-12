# mongodb

## windows 上基本操作

下载:
https://www.mongodb.com/try/download/community

启动:

```
# 以前台的方式运行
"C:\Program Files\MongoDB\Server\4.4\bin\mongod.exe"

# 后台方式运行
# win10, 打开任务管理器, 点击服务一列, 找到 MongoDB 服务, 右键点击启动或者重新启动
```

连接 MongoDB instance

```bash
# 在命令中连接MongoDB instance
"C:\Program Files\MongoDB\Server\4.4\bin\mongo.exe"

# 以安全方式启动
"C:\Program Files\MongoDB\Server\4.4\bin\mongod.exe" --dbpath "data" --auth
```

## 基本操作

```bash

# 显示所有数据库
show databases

# 使用 admin 数据库
use admin


# 创建用户
db.createUser(
  {
    user: "superuser",
    pwd: "changeMeToAStrongPassword",
    roles: [ "root" ]
  }
)

# 显示所有用户
show users

# 关闭 MongoDB 实例
db.shutdownServer()

# 切换到 dbName 数据库, 如果不存在就创建
use dbName;

# 创建 user collection
db.createCollection('user')

# 删除 collection
db.user.drop()

# 插入数据
db.user.insertMany([
  {
    name: 'Tom',
    age: 18,
  },
  {
    name: 'Alex',
    age: 19,
  },
])

# 查找 age = 18 的用户
db.user.find({
  age: 18
})

# 查找 age > 18 的用户
db.user.find({
  age: {
    $gt: 18
  }
})

# 更新用户名为 Tom 的 age 为 26
db.user.updateOne(
  {
    name: 'Tom',
  },
  {
    $set: { age: 26 },
    $currentDate: { 'updated_at': true },
  },
)

db.user.updateMany()

# 删除 age = 26 的第一条数据
db.user.deleteOne({
  age: 26
})

db.user.deleteMany()


# delete column

db.user.update({}, {$unset: {age:1}});


# update add use column with reference other columns
# age 的值 变成 age + 2

db.user.updateMany({}, [
  {
    $set: {
      age: {
        $sum: ['$age', 2],
      },
    },
  },
])

# rename column

db.user.updateMany({}, {
  $rename: { "age": "age2" },
})

```
