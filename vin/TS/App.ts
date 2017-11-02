import {Categorie} from './Categorie';
import { Vendeur } from './Vendeur';
import { Produit } from './Produit';

export class App{
    public $username: JQuery<HTMLElement>;
    public $password: JQuery<HTMLElement>;
    public $categories: JQuery<HTMLElement>;
    public $connection: JQuery<HTMLElement>;
    public $vins: JQuery<HTMLElement>;
    public $details: JQuery<HTMLElement>;

    public current_vendor:Vendeur;
    public current_cate: Categorie;
    public current_produit: Produit;
    public all_categories: Categorie[];
    public all_product: Produit[];

    constructor(){
        this.$username = $("#username");
        this.$password = $("#password");
        this.$categories = $("#categories");
        this.$connection = $("#connection");
        this.$vins = $("#vins");
        this.$details = $("#details");

        this.all_categories = [];
        this.all_product = [];
       
    }

    displayCategories(){
        this.$categories.children(".type").remove();
        for(let category of this.all_categories){
             category.display(this.$categories);
        }
    }

    displayProduct(){
        this.$vins.children( ".prod" ).remove();
        for(let product of this.all_product){
             product.display(this.$vins);
        }
    }

    readVendeur(){
        var username=this.$username.val();
        var password=this.$password.val();

        $.ajax({
            url: "http://localhost:8888/tp_vin/API/connect",
            method: "POST",
            data : {
                username : username,
                password : password
            },
            dataType: "json",
            success : ( data ) => {
                
                if( data.success == true ){
                    
                    this.current_vendor = new Vendeur( data.user.id, data.user.username );

                    this.$categories.show(); 
                    this.$connection.hide();

                    this.readCategories();
                    
                }
                

            },
            error : function( error ){
                console.log(error);
                alert("error");
            }
        });
    }

    readCategories(){

        $.ajax({
            url: "http://localhost:8888/tp_vin/API/vendor/" + this.current_vendor.getId() + "/category",
            method: "GET",
            dataType: "json",
            success : ( data ) => {
                this.all_categories = [];
                if( data.success == true ){
                    
                    for( let element of data.category ){
                        let category: Categorie = new Categorie( element.id, element.name, element.description );
                        this.all_categories.push( category );
                    }
                    this.displayCategories();
                    
                }
                

            },
            error : function( error ){
                console.log(error);
                alert("error");
            }

        })

    }

    readProduct(){
        
        $.ajax({
            url: "http://localhost:8888/tp_vin/API/vendor/" + this.current_vendor.getId() + "/category/" + this.current_cate.getId() + "/products",
            method: "GET",
            dataType: "json",
            success : ( data ) => {
                this.all_product = [];
                if( data.success == true ){
                    
                    for( let element of data.product ){ console.log(element);
                        let product: Produit = new Produit( element.id, element.vin, element.description );
                        this.all_product.push( product );
                    }
                    
                    this.displayProduct();
                    
                }
                

            },
            error : function( error ){
                console.log(error);
                alert("error");
            }

        })
        
    }

    readDetail(){
        
        $.ajax({
            url: "http://localhost:8888/tp_vin/API/produit/" + this.current_produit.getId() + "/details",
            method: "GET",
            dataType: "json",
            success : ( data ) => {
                console.log(data);
                if( data.success == true ){ 
                    this.current_produit.setDescription( data.details.description );
                    this.current_produit.detail( this.$details );  
                }
                

            },
            error : function( error ){
                console.log(error);
                alert("error");
            }

        })
        
    }

    getCategoryById( id: number ): Categorie{

        for( let category of this.all_categories ){
            if( category.getId() == id ){
                return category;
            }
        }
        return null;
    }

    getProduitById( id: number ): Produit{

        for( let produit of this.all_product ){
            if( produit.getId() == id ){
                return produit;
            }
        }
        return null;
    }

}