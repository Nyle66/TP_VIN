<?php 
class Connection {

    static $connection = null;

    static function getConnection(){
      
        if( empty( self::$connection ) ){    
            self::$connection = new PDO(
                "mysql:dbname=vins;host=localhost",
                "root",
                "root"
            );
        }

        return self::$connection;
    }

    private function __construct(){}

}

