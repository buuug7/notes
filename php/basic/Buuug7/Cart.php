<?php

namespace Buuug7;


class Cart
{
    const PRICE_APPLE = 5.00;
    const PRICE_TOMATO = 2.00;

    protected $products = [];


    public function add($product, $quantity)
    {
        $this->products[$product] = $quantity;
    }

    public function getQuantity($product)
    {
        return isset($this->products[$product]) ? $this->products[$product] : false;
    }

    public function getTotal(float $tax)
    {
        $total = 0.00;

        array_walk($this->products, function ($quantity, $product) use ($tax, &$total) {
            $price = constant(__CLASS__ . "::PRICE_" . strtoupper($product));
            $total += ($price * $quantity) * (1 + $tax);
        });

        return round($total, 2);
    }
}




