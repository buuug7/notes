<?php
/**
 * Created by PhpStorm.
 * User: buuug7
 * Date: 2015/7/1
 * Time: 17:15
 */


//创建数据库连接
$conn=new mysqli('localhost','buuug7','','c9');
if($conn->connect_error){
    exit($conn->connect_error);
}

//C-插入数据
$sql="insert into user(name,email) values('QQ','mahuateng@qq.com')";
if($conn->query($sql)){
    //其中$conn->insert_id为刚才插入的主键的值
    printf("insert a row with id=%d success!<br>",$conn->insert_id);
}
//U-更新操作
$sql="update user set email='ma@qq.com' where email is null ";
if($conn->query($sql)){
    printf("update operation has affected %d rows!<br>",$conn->affected_rows);
}

//R-读取数据
$sql="select * from user limit 5";
if($rs=$conn->query($sql)){
    printf("select operation:<br>");
    while($row=$rs->fetch_array()){
        printf("id=%d,name=%s,email=%s<br>",$row['id'],$row['name'],$row['email']);
    }
}

//D-删除操作
$sql="delete from user where name like 'weixin%'";
if($conn->query($sql)){
    printf("delete operation has affected %d rows!<br>",$conn->affected_rows);
}
$conn->close();
