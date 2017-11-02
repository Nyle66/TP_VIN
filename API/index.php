<?php 
require "flight/Flight.php"; 
require "autoload.php";

Flight::set("BddManager", new BddManager());

Flight::route('POST /connect',function(){

    $username = Flight::request()->data['username'];
    $password = Flight::request()->data['password'];

    $status = [
        "success" => false,
        "user" => false
    ];

    $vendor = new Vendeur();
    $vendor->setUsername($username);
    $vendor->setPassword($password);

    $bdd = new BddManager();
    $user = $bdd->getVendeurById($vendor);
    
    if($user != false){
        $status['success'] = true;
        $status['user'] = $user;
    }

    echo json_encode( $status );

});

Flight::route('GET /vendor/@id/category',function( $id ){

    $status = [
        "success" => false,
        "category" => false
    ];

    $vendeur = new Vendeur();
    $vendeur->setId($id);

    $bdd = new BddManager();
    $categories = $bdd->getCategorie($vendeur);

    if( $categories ){
        $status['success'] = true;
        $status['category'] = $categories;
    }

    echo json_encode( $status );

});

Flight::route('GET /vendor/@vid/category/@cid/products',function( $vid, $cid ){
    
        $status = [
            "success" => false,
            "product" => false
        ];

        $vendor = new Vendeur();
        $vendor->setId($vid);
    
        $category = new Category();
        $category->setId($cid);
    
        $bdd = new BddManager();
        $product = $bdd->getProduct($vendor, $category);
    
        if( $product ){
            $status['success'] = true;
            $status['product'] = $product;
        }
    
        echo json_encode( $status );
    
    });

    Flight::route('GET /produit/@id/details',function( $id){
    
        $status = [
            "success" => false,
            "details" => false
        ];
    
        $product = new Produit();
        $product->setId($id);
    
        $bdd = new BddManager();
        $details = $bdd->getDetails($product);
    
        if( $details ){
            $status['success'] = true;
            $status['details'] = $details;
        }
    
        echo json_encode( $status );
    
    });

Flight::start();