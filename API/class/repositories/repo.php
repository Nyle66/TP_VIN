<?php
abstract class Repo {

    protected $connection;

    function __construct( $connection ){
        $this->connection = $connection;
    }

}