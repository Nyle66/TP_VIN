import { App } from "./app";

var app:App = new App();

$("#form").submit( function(event){
    event.preventDefault();
    app.readVendeur();
    
});

$(document).on("click", ".type", function(){
    
    app.$categories.hide(); 
    app.$vins.show();
    app.current_cate = app.getCategoryById( $(this).data('category') as number );
    app.readProduct();
    
});

$(document).on("click", ".prod", function(){
    
    app.$vins.hide(); 
    app.$details.children(".detail").remove();
    app.$details.show();
    app.current_produit = app.getProduitById( $(this).data('produit') as number );
    app.readDetail();
    
});

$(document).on("click", "#backlog", function(){
    
    app.$categories.hide(); 
    app.$connection.show();
    
});
$(document).on("click", "#backcate", function(){
    
    app.$vins.hide(); 
    app.$categories.show();
    
});
$(document).on("click", "#backprod", function(){
    
    app.$details.hide(); 
    app.$vins.show();
    
});
