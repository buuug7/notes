<?php

try{
    $conn=new PDO('mysql:host=localhost;charset=utf8;port=3306;dbname=c9','buuug7','');
    $conn->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
}catch(PDOException $e){
    echo 'Connected failed : '.$e->getMessage();
}

// select
$rs=$conn->query('select * from user')->fetchAll();
var_dump($rs);

// insert
$rs=$conn->exec("insert into user (name,email,created_at) values ('test','test@test.com',now())");
if($rs>0){
    echo "insert success!<br/>";
}

// update 
$rs=$conn->exec("update user set name='test2' where name='test'");
if($rs>0){
    echo "updated successfull!<br/>";
}

// delete
$rs=$conn->exec("delete from user where name='test2'");
if($rs>0){
    echo "Deleted successful!<br/>";
}

echo "<hr>";

/* use prepare statement */

// use ? 
$stat=$conn->prepare('select * from user where name=?');
$stat->execute(['test']);
$rs=$stat->fetchAll();
var_dump($rs);

// use naming for the placeholder
$stat=$conn->prepare('select * from user where name=:name');
$stat->execute([':name'=>'buuug7']);
$rs=$stat->fetchAll();
var_dump($rs);

// user bindParam
$name='buuug7';
$stat=$conn->prepare('select * from user where name=?');
$stat->bindParam(1,$name,PDO::PARAM_STR);

$stat->execute();
$rs=$stat->fetchAll();
var_dump($rs);

// use bindParam  insert example
$name="b78";
$email="b78@c.com";
$stat=$conn->prepare('insert into user (name,email,created_at) values (?,?,now())');
$stat->bindParam(1,$name,PDO::PARAM_STR);
$stat->bindParam(2,$email,PDO::PARAM_STR);
$rs=$stat->execute();
if($rs>0){
    echo "insert successful!";
}


$conn=null;