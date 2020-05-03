<?php
/**
 * Created by PhpStorm.
 * User: buuug7
 * Date: 2015/6/30
 * Time: 15:13
 */

namespace buuug7;


class Person {
    protected $id;
    protected $name="";
    protected $age;

    function __construct($name,$age){
        $this->name=$name;
        $this->age=$age;
    }
    function __get($property){
        return $this->$property;
    }
    function __set($property,$value){
        $this->$property=$value;
    }

    public function say(){
        return "my name is ".$this->name;
    }
}