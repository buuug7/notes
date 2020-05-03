<?php
/**
 * Created by PhpStorm.
 * User: buuug7
 * Date: 2015/6/30
 * Time: 15:19
 */

namespace buuug7;


class Student extends Person {
    private $school="";
    //随便定义一个常量标记
    const TAG="STU";

    function __construct($name,$age,$school){
        parent::__construct($name,$age);
        $this->school=$school;
    }

    function __get($property){
        return $this->$property;
    }
    function __set($property,$value){
        $this->$property=$value;
    }

    public function study(){
        return "I am study in ".$this->school."---".self::TAG;//类内部访问静态资源或者常量的时候用self::
    }

    public function say(){
        return "I am a student,my name is ".$this->name;
    }
}