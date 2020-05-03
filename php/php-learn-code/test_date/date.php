<?php
// get timezone
echo date_default_timezone_get();

// set timezone
date_default_timezone_set("Asia/Shanghai");

// output date with format
echo date("Y-m-d H:i:s");

// maketime
$date=mktime(3,29,55,10,28,2016);

var_dump($date);

echo date('Y-m-d',$date);

// 
echo strtotime("monday");
?>