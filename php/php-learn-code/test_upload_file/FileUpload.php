<?php
/**
 * Created by PhpStorm.
 * User: buuug7
 * Date: 2015/6/29
 * Time: 22:54
 */

namespace buuug7;


class FileUpload {

    //上传文件路径
    var $uploadPath;
    //允许上传的扩展名
    var $extArr=array();
    //允许上传文件的体积
    var $fileSize;
    //上传文件的命名
    var $newName;

    function __set($property,$value){
        $this->$property=$value;
    }

    //获取扩展名
    public function getExt(){
        $extArr=explode(".",$_FILES['file']['name']);
        $fileExt=trim(array_pop($extArr));
        $fileExt=strtolower($fileExt);
        return $fileExt;
    }

    //检查扩展名
    public function checkExt(){
        
        $fileExt=$this->getExt();

        if(!empty($fileExt)){
            return in_array($fileExt,$this->extArr);
        }
        return false;
    }

    //检查文件大小
    public function checkSize(){
        return $_FILES['file']['size']>$this->fileSize;
    }

    //开始上传文件
    public function upload(){

        if(!empty($_FILES)){
            //上传出错退出
            if($_FILES['file']['error']>0){
                $errno=$_FILES['file']['error'];
                echo "<script>alert('file upload error: $errno');history.back();</script>";
                exit();
            }
            //检查扩展名
            if(!$this->checkExt()){
                echo "<script>alert('not supported extension!');history.back();</script>";
                exit();
            }
            //检查大小
            if($this->checkSize()){
                exit("file size no more than ".($this->fileSize/1024)."kb");
            }
            //判断上传文件目录是否存在,不存在创建
            if(!is_dir($this->uploadPath)){
                if(!mkdir($this->uploadPath,0664)){
                    exit("create directory occur a problem!");
                }
            }
            //移动文件到上传目录
            if(!move_uploaded_file($_FILES['file']['tmp_name'],$this->uploadPath."/".$this->newName.".".$this->getExt())){
                exit("move upload file occur a problem!");
            }
            return true;
        }else{
            return false;
        }
    }
}