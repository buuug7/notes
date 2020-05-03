<?php
/**
 * Created by PhpStorm.
 * User: buuug7
 * Date: 2015/6/30
 * Time: 20:13
 */
//header("Content-Type:text/html;charset=utf-8");

require "Pdo.php";

//拿到数据库连接
$pdo=\buuug7\Pdo::getInstance('mysql:host=localhost;prot=3306;charset=utf8;dbname=c9','buuug7','')->getConn();

//发送查询数据R
$pdo->query("set character set 'utf-8'");
$sql="select * from user";
$result=$pdo->query($sql);
$result=$result->fetchAll();
var_dump($result);
//执行插入数据C
$sql="insert into user(name,email) values('facebook','facebook@gmail.com')";
$pdo->exec($sql);

//更新数据U
$sql="update users set name='facebook2' where name='facebook'";
$pdo->exec($sql);

//删除数据D
$sql="delete from users where name='facebook3'";
$pdo->exec($sql);

echo "<hr>";

//预处理语句

//用?占位符
$sql="select * from users where name=? and email=?";
$stat=$pdo->prepare($sql);
$stat->execute(array("facebook",11));
$result=$stat->fetchAll();
var_dump($result);

echo "<hr>";

//预处理语句用 名字 来当占位符
$sql="select * from users where name=:name and email=:email";
$stat=$pdo->prepare($sql);
$stat->execute(array(":name"=>"facebook",":email"=>12));
$result=$stat->fetchAll();
var_dump($result);

echo "<hr>";

//用bindParam来绑定占位符
$sql="select * from users where name=?";
$name="Twitter";
$stat=$pdo->prepare($sql);
$stat->bindParam(1,$name,\PDO::PARAM_STR);
$stat->execute();
$result=$stat->fetchAll();
var_dump($result);

echo "<hr>";
//绑定一列到一个变量
$sql="select name,email from users";
$stat=$pdo->prepare($sql);
$stat->bindColumn(1,$name);
$stat->bindColumn(2,$email);
$stat->execute();
while($row=$stat->fetch()){
    echo "name=".$name." age=".$age."<br>";
}