<?php

phpinfo();
die();

use Buuug7\Test;

use Buuug7\Cart;

spl_autoload_register(function ($className) {
    include_once __DIR__ . '/' . $className . '.php';
});


$output = array_filter([1, 2, 3, 4, 5, 6, 7, 8], function ($item) {
    return $item % 2 == 0;
});

$cart = new Cart();

$cart->add('apple', 10);
$cart->add('tomato', 20);

$total = $cart->getTotal(0.2);
echo $total;
