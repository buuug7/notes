<?php

$fileName=$_POST['filename'] || '';
$data=[];
$data['filename']=$fileName;
$data['status']=2;

if(file_exists('upload/'.$fileName))
{
    @unlink('upload/'.$fileName);
    $data['status']=1;
}else{
    $data['status']=0;
}

echo json_encode($data);