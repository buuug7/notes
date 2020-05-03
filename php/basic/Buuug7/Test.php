<?php

namespace Buuug7;

class Test extends BaseTest implements TestInterface
{
    use TestTrait;

    const HWG = 'here we go';

    public $name = 'buuug7';

    private $sex;

    public function __construct()
    {
        //TODO:
    }

    public function getName()
    {
        return $this->name;
    }

    public function test(String $str)
    {
        print $str;
    }

    public function getClassName()
    {
        return static::class;
    }

    public function say()
    {
        print "say: {$this->name}";
    }

    public function walk()
    {
        // TODO: Implement walk() method.
    }

    public function __toString()
    {
        return $this->name;
    }

}
