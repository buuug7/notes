<?php
/**
 * Created by PhpStorm.
 * User: buuug7
 * Date: 2015/6/30
 * Time: 21:16
 * use singletong packaged PDO
 */

namespace buuug7;


class Pdo {

    private static $conn=null;

    private function __construct($dsn,$user,$pwd){
        try{
            $this->conn=new \PDO($dsn,$user,$pwd);
        }catch (\PDOException $e){
            exit($e->getMessage());
        }
    }

    public static function getInstance($dsn,$user,$pwd){
        if(!(self::$conn instanceof self)){
            self::$conn=new self($dsn,$user,$pwd);
        }
        return self::$conn;
    }

    //外部获取连接的唯一方法
    public function getConn(){
        return $this->conn;
    }

    //私有化克隆函数,防止外界克隆
    private function __clone(){
    }
}