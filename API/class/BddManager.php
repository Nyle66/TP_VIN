<?php 

class BddManager {

    private $repo_vendeur;
    private $repo_produit;
    private $repo_cate;

  
      function __construct(){
          $this->connection = Connection::getConnection();
          $this->repo_vendeur = new repo_vendeur( $this->connection );
          $this->repo_produit = new repo_produit( $this->connection );
          $this->repo_cate = new repo_cate( $this->connection );
      }
  
      function getRepo_vendeur(){
          return $this->repo_vendeur;
      }
   
      function getRepo_produit(){
          return $this->repo_produit;
      }
      function getRepo_cate(){
          return $this->repo_cate;
      }

      public function getVendeurById(Vendeur $vendeur){

        $object = $this->connection->prepare('SELECT * FROM vendeur WHERE username=:username AND password=:password');
        $object->execute(array(
            'username'=>$vendeur->getUsername(),
            'password'=>$vendeur->getPassword()
        ));
        $userdata = $object->fetch(PDO::FETCH_ASSOC);
        if(!empty($userdata)){
          return new Vendeur($userdata);
        }
        return false;
    }

    public function getCategorie(Vendeur $vendeur){
        
        $query = "SELECT DISTINCT categorie.* FROM categorie
        JOIN product_vendor ON product_vendor.vendeur_id =:vendeur_id
        JOIN produit ON produit.id = product_vendor.product_id
        WHERE categorie.id = produit.categorie_id";
        $prep = $this->connection->prepare( $query );
        $prep->execute( [
            "vendeur_id" => $vendeur->getId(),
        ] );
 
        $result = $prep->fetchAll(PDO::FETCH_ASSOC);
 
        return $result;
    }

    public function getProduct(Vendeur $vendor, Category $categorie){
        
        $query = "SELECT produit.* FROM produit
        JOIN product_vendor 
        ON product_vendor.vendeur_id=:vendor_id
        WHERE produit.id=product_vendor.product_id 
        AND produit.categorie_id=:category_id";
        $prep = $this->connection->prepare( $query );
        $prep->execute( [
            "vendor_id" => $vendor->getId(),
            "category_id" => $categorie->getId(),
        ] );
 
        $result = $prep->fetchAll(PDO::FETCH_ASSOC);
 
        return $result;
    }

    public function getDetails(Produit $produit){
                
        $query = " SELECT produit.description FROM produit
        WHERE produit.id=:id"; 
        $prep = $this->connection->prepare( $query );
        $prep->execute( [
            "id" => $produit->getId()
        ] );
 
        $result = $prep->fetch(PDO::FETCH_ASSOC);
 
        return $result;         
    }

}