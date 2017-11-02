<?php

class Produit extends Model implements JsonSerializable{
    
    private $vin;
    private $description;
    
    function setVin($vin) { $this->vin = $vin; }
    function getVin() { return $this->vin; }
    function setDescription($description) { $this->description = $description; }
    function getDescription() { return $this->description; }

    function jsonSerialize(){
        return [
            "id" => $this->id,
            "name" => $this->vin,
            "description" => $this->description

        ];
    }
    
}