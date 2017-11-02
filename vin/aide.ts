readVendor(){
    
           var name=this.$name.val();
           var password=this.$password.val();
    
                   $.ajax({
                       url: "http://localhost:8888/mobile/vin/API/vendor",
                       method: "POST",
                       data : {
                           name : name,
                           password : password
                       },
                       dataType: "json",
                       success : ( data ) => {
                           
                           if( data.success == true ){
                               console.log(data.vendor);
                               
                               this.$connexion.hide();
                               this.$categorie.show();  
                               
                               //Creer le vendeur avec les données recupéré
                               let vendor: Vendor = new Vendor(data.vendor.id, data.vendor.name, data.vendor.password)
                               this.currentVendor = vendor;
                               this.readCategories();
                               
                           }
                           
           
                       },
                       error : function( error ){
                           console.log(error);
                           alert("error");
                       }
                   });
       }