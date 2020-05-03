<?php
/**
 * Created by PhpStorm.
 * User: buuug7
 * Date: 2015/7/1
 * Time: 18:46
 */

$str="abrderf98r98r__r--";
$result=preg_match("/\d{4}/",$str,$mathces);

var_dump($mathces);

$result2=preg_replace("/\d{2}/","__",$str);
var_dump($result2);

$result3=preg_split("/[r]/",$str);
var_dump($result3);

$str2="11_youpp@q1.com";
$r2=preg_match("/^\w+\@\w+\.\w+/",$str2);
var_dump($r2);