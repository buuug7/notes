<?php
/**
 * Created by PhpStorm.
 * User: buuug7
 * Date: 2015/7/1
 * Time: 17:49
 */

//创建数据库连接
$conn=new mysqli('localhost','buuug7','','c9');
if($conn->connect_error){
    exit($conn->connect_error);
}

$conn->autocommit(false);

//mysqli 预处理初始化
$stmt=$conn->stmt_init();

//C-插入数据
$sql="insert into user (name,email) values(?,?)";
$stmt->prepare($sql);
$stmt->bind_param('ss',$name,$email);
$name="stmt_qq";
$email='stamt_qq@e.com';
if($stmt->execute()){
    printf("insert a row with id=%d success!<br>",$conn->insert_id);
}

//U-更新操作
$sql="update user set name=? where name=?";
$stmt->prepare($sql);
$stmt->bind_param('ss',$newName,$oldName);
$newName="stmt_update_qq";
$oldName="QQ";
if($stmt->execute()){
    printf("update operation has affected %d rows!<br>",$conn->affected_rows);
}

//R-读取操作
$sql="select * from user where name=? and email=? limit 5";
$stmt->prepare($sql);
$stmt->bind_param('ss',$name,$email);
if($stmt->execute()){
    $rs=$stmt->get_result();
    while($row=$rs->fetch_array()){
        printf("id=%d,name=%s,email=%s<br>",$row['id'],$row['name'],$row['email']);
    }
}

//R-读取操作,绑定结果到一个变量上
$sql="select name from user where email=?";
$stmt->prepare($sql);
$stmt->bind_param('s',$email);
$email='ma@qq.com';
if($stmt->execute()){
    $stmt->bind_result($name);
    while($stmt->fetch()){
        printf("name=%s<br>",$name);
    }
}

//D-删除操作
$sql="delete from user where id in (?,?)";
$stmt->prepare($sql);
$stmt->bind_param('ii',$id,$id2);
$id=1;
$id2=3;
if($stmt->execute()){
    printf("delete operation has affeted %d rows",$conn->affected_rows);
}

//提交事务
$conn->commit();

//关闭打开的资源
$stmt->close();
$conn->close();