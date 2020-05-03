<?php
/**
 * Created by PhpStorm.
 * User: buuug7
 * Date: 2015/6/30
 * Time: 15:31
 */
session_start();
require "Person.php";
require "Student.php";

$stu=new \buuug7\Student("buuug7",22,"Tsinghua");
$stu->id=1;

//测试类
echo $stu->say();
echo "<br>";
echo $stu->study();
echo $stu->id;

//外部访问类中定义的常量的方法 类名::CONST
echo \buuug7\Student::TAG;
echo "<hr>";

//克隆一个对象
$stu2=clone($stu);
echo $stu2->id;

echo "<hr>";
//对象序列化
$serialStu=serialize($stu);

//创建序列化存储目录
$filePath=dirname(__FILE__)."\\file";
if(!is_dir($filePath)){
    mkdir($filePath);
}
//把对象存储到文件
$filename=$filePath."\\serialize_object.txt";
if(file_put_contents($filename,$serialStu,FILE_APPEND)){
    echo "serialized object writer into file success!";
}

//反序列化
echo "<br>";
$unStu=unserialize(file_get_contents($filename));
echo $unStu->say();

//将对象序列化到session中
echo "<hr>";
$_SESSION['stu']=$stu;
echo $_SESSION["stu"]->study();
$_SESSION['stu']=null;