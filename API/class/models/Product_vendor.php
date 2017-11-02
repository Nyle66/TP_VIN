<?php

class Product_vendor extends Model implements JsonSerializable{
    
    private $vendeur_id;
    private $product_id;
    
    function setVendeur_id($vendeur_id) { $this->vendeur_id = $vendeur_id; }
    function getVendeur_id() { return $this->vendeur_id; }
    function setProduct_id($product_id) { $this->product_id = $product_id; }
    function getProduct_id() { return $this->product_id; }

    function jsonSerialize(){
        return [
            "vendeur_id" => $this->vendeur_id,
            "product_id" => $this->product_id
        ];
    }
}