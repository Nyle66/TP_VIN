System.register("Model", [], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Model;
    return {
        setters: [],
        execute: function () {
            Model = class Model {
                constructor(id) {
                    this.id = id;
                }
                getId() {
                    return this.id;
                }
            };
            exports_1("Model", Model);
        }
    };
});
System.register("Categorie", ["Model"], function (exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var Model_1, Categorie;
    return {
        setters: [
            function (Model_1_1) {
                Model_1 = Model_1_1;
            }
        ],
        execute: function () {
            Categorie = class Categorie extends Model_1.Model {
                constructor(id, name, description) {
                    super(id);
                    this.name = name;
                    this.description = description;
                }
                display($parent) {
                    let div = "<div class='type animated swing' id='" + this.name + "' data-category=" + this.id + "><h3>" + this.name + "</h3></div>";
                    this.$dom = $(div);
                    $parent.append(this.$dom);
                }
            };
            exports_2("Categorie", Categorie);
        }
    };
});
System.register("Produit", ["Model"], function (exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var Model_2, Produit;
    return {
        setters: [
            function (Model_2_1) {
                Model_2 = Model_2_1;
            }
        ],
        execute: function () {
            Produit = class Produit extends Model_2.Model {
                constructor(id, name, description) {
                    super(id);
                    this.name = name;
                    this.description = description;
                }
                setDescription(description) {
                    this.description = description;
                }
                display($parent) {
                    let div = "<div class='prod animated swing' id='" + this.id + "' data-produit=" + this.id + "><h3>" + this.name + "</h3></div>";
                    this.$dom = $(div);
                    $parent.append(this.$dom);
                }
                detail($parent) {
                    let div = "<div class='detail animated fadeInLeft'><p>" + this.description + "</p><br><img src='cat.gif' id='img'/></div>";
                    this.$dom = $(div);
                    $parent.append(this.$dom);
                }
            };
            exports_3("Produit", Produit);
        }
    };
});
System.register("Vendeur", ["Model"], function (exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    var Model_3, Vendeur;
    return {
        setters: [
            function (Model_3_1) {
                Model_3 = Model_3_1;
            }
        ],
        execute: function () {
            Vendeur = class Vendeur extends Model_3.Model {
                constructor(id, name) {
                    super(id);
                    this.name = name;
                }
                addCategorie(category) {
                    this.categories.push(category);
                }
                addProduit(produit) {
                    this.produits.push(produit);
                }
            };
            exports_4("Vendeur", Vendeur);
        }
    };
});
System.register("App", ["Categorie", "Vendeur", "Produit"], function (exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    var Categorie_1, Vendeur_1, Produit_1, App;
    return {
        setters: [
            function (Categorie_1_1) {
                Categorie_1 = Categorie_1_1;
            },
            function (Vendeur_1_1) {
                Vendeur_1 = Vendeur_1_1;
            },
            function (Produit_1_1) {
                Produit_1 = Produit_1_1;
            }
        ],
        execute: function () {
            App = class App {
                constructor() {
                    this.$username = $("#username");
                    this.$password = $("#password");
                    this.$categories = $("#categories");
                    this.$connection = $("#connection");
                    this.$vins = $("#vins");
                    this.$details = $("#details");
                    this.all_categories = [];
                    this.all_product = [];
                }
                displayCategories() {
                    console.log(this.$categories);
                    for (let category of this.all_categories) {
                        category.display(this.$categories);
                    }
                }
                displayProduct() {
                    for (let product of this.all_product) {
                        product.display(this.$vins);
                    }
                }
                readVendeur() {
                    var username = this.$username.val();
                    var password = this.$password.val();
                    $.ajax({
                        url: "http://localhost:8888/tp_vin/API/connect",
                        method: "POST",
                        data: {
                            username: username,
                            password: password
                        },
                        dataType: "json",
                        success: (data) => {
                            if (data.success == true) {
                                this.current_vendor = new Vendeur_1.Vendeur(data.user.id, data.user.username);
                                this.$categories.show();
                                this.$connection.hide();
                                this.readCategories();
                            }
                        },
                        error: function (error) {
                            console.log(error);
                            alert("error");
                        }
                    });
                }
                readCategories() {
                    $.ajax({
                        url: "http://localhost:8888/tp_vin/API/vendor/" + this.current_vendor.getId() + "/category",
                        method: "GET",
                        dataType: "json",
                        success: (data) => {
                            console.log(data);
                            if (data.success == true) {
                                for (let element of data.category) {
                                    let category = new Categorie_1.Categorie(element.id, element.name, element.description);
                                    this.all_categories.push(category);
                                }
                                this.displayCategories();
                            }
                        },
                        error: function (error) {
                            console.log(error);
                            alert("error");
                        }
                    });
                }
                readProduct() {
                    $.ajax({
                        url: "http://localhost:8888/tp_vin/API/vendor/" + this.current_vendor.getId() + "/category/" + this.current_cate.getId() + "/products",
                        method: "GET",
                        dataType: "json",
                        success: (data) => {
                            console.log(data);
                            if (data.success == true) {
                                for (let element of data.product) {
                                    console.log(element);
                                    let product = new Produit_1.Produit(element.id, element.vin, element.description);
                                    this.all_product.push(product);
                                }
                                this.displayProduct();
                            }
                        },
                        error: function (error) {
                            console.log(error);
                            alert("error");
                        }
                    });
                }
                readDetail() {
                    $.ajax({
                        url: "http://localhost:8888/tp_vin/API/produit/" + this.current_produit.getId() + "/details",
                        method: "GET",
                        dataType: "json",
                        success: (data) => {
                            console.log(data);
                            if (data.success == true) {
                                this.current_produit.setDescription(data.details.description);
                                this.current_produit.detail(this.$details);
                            }
                        },
                        error: function (error) {
                            console.log(error);
                            alert("error");
                        }
                    });
                }
                getCategoryById(id) {
                    for (let category of this.all_categories) {
                        if (category.getId() == id) {
                            return category;
                        }
                    }
                    return null;
                }
                getProduitById(id) {
                    for (let produit of this.all_product) {
                        if (produit.getId() == id) {
                            return produit;
                        }
                    }
                    return null;
                }
            };
            exports_5("App", App);
        }
    };
});
System.register("main", ["App"], function (exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    var app_1, app;
    return {
        setters: [
            function (app_1_1) {
                app_1 = app_1_1;
            }
        ],
        execute: function () {
            app = new app_1.App();
            $("#form").submit(function (event) {
                event.preventDefault();
                app.readVendeur();
            });
            $(document).on("click", ".type", function () {
                app.$categories.hide();
                app.$vins.show();
                app.current_cate = app.getCategoryById($(this).data('category'));
                app.readProduct();
            });
            $(document).on("click", ".prod", function () {
                app.$vins.hide();
                app.$details.show();
                app.current_produit = app.getProduitById($(this).data('produit'));
                app.readDetail();
            });
            // $(document).on("click", "#backlog", function(){
            //     app.$categories.hide(); 
            //     app.$connection.show();
            // });
            // $(document).on("click", "#backcate", function(){
            //     app.$vins.hide(); 
            //     app.$categories.show();
            // });
            // $(document).on("click", "#backprod", function(){
            //     app.$details.hide(); 
            //     app.$vins.show();
            // });
        }
    };
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlRTL01vZGVsLnRzIiwiVFMvQ2F0ZWdvcmllLnRzIiwiVFMvUHJvZHVpdC50cyIsIlRTL1ZlbmRldXIudHMiLCJUUy9BcHAudHMiLCJUUy9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7WUFBQSxRQUFBO2dCQUlJLFlBQWEsRUFBVTtvQkFDbkIsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7Z0JBQ2pCLENBQUM7Z0JBRUQsS0FBSztvQkFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztnQkFDbkIsQ0FBQzthQUVKLENBQUE7O1FBQUEsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7WUNWRixZQUFBLGVBQXVCLFNBQVEsYUFBSztnQkFPaEMsWUFBWSxFQUFTLEVBQUUsSUFBVyxFQUFFLFdBQWtCO29CQUNsRCxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7b0JBQ1YsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2pCLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO2dCQUNuQyxDQUFDO2dCQUVELE9BQU8sQ0FBQyxPQUFlO29CQUNuQixJQUFJLEdBQUcsR0FBVyx1Q0FBdUMsR0FBQyxJQUFJLENBQUMsSUFBSSxHQUFDLGtCQUFrQixHQUFDLElBQUksQ0FBQyxFQUFFLEdBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUcsYUFBYSxDQUFDO29CQUNuSSxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDbkIsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzlCLENBQUM7YUFHSixDQUFBOztRQUFBLENBQUM7Ozs7Ozs7Ozs7Ozs7O1lDbkJGLFVBQUEsYUFBcUIsU0FBUSxhQUFLO2dCQU85QixZQUFhLEVBQVUsRUFBRSxJQUFXLEVBQUUsV0FBbUI7b0JBQ3JELEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztvQkFDVixJQUFJLENB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QUMsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUN2QixHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUNqQixHQUFHLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQyxlQUFlLENBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQVcsQ0FBRSxDQUFDO2dCQUM3RSxHQUFHLENBQUMsV0FBVyxFQUFFLENBQUM7WUFFdEIsQ0FBQyxDQUFDLENBQUM7WUFFSCxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUU7Z0JBRTdCLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ2pCLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ3BCLEdBQUcsQ0FBQyxlQUFlLEdBQUcsR0FBRyxDQUFDLGNBQWMsQ0FBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBVyxDQUFFLENBQUM7Z0JBQzlFLEdBQUcsQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUVyQixDQUFDLENBQUMsQ0FBQztZQUVILGtEQUFrRDtZQUVsRCwrQkFBK0I7WUFDL0IsOEJBQThCO1lBRTlCLE1BQU07WUFDTixtREFBbUQ7WUFFbkQseUJBQXlCO1lBQ3pCLDhCQUE4QjtZQUU5QixNQUFNO1lBQ04sbURBQW1EO1lBRW5ELDRCQUE0QjtZQUM1Qix3QkFBd0I7WUFFeEIsTUFBTTtRQUNOLENBQUMiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBNb2RlbCB7XG5cbiAgICBwcm90ZWN0ZWQgaWQ6IG51bWJlcjtcblxuICAgIGNvbnN0cnVjdG9yKCBpZDogbnVtYmVyICl7XG4gICAgICAgIHRoaXMuaWQgPSBpZDtcbiAgICB9XG5cbiAgICBnZXRJZCgpe1xuICAgICAgICByZXR1cm4gdGhpcy5pZDtcbiAgICB9XG5cbn0iLCJpbXBvcnQgeyBNb2RlbCB9IGZyb20gXCIuL01vZGVsXCI7XG5cbmV4cG9ydCBjbGFzcyBDYXRlZ29yaWUgZXh0ZW5kcyBNb2RlbHtcbiAgICAgICAgXG4gICAgcHJpdmF0ZSBuYW1lOiBzdHJpbmc7XG4gICAgXG4gICAgcHJpdmF0ZSBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICAgIHByb3RlY3RlZCAgJGRvbTogSlF1ZXJ5O1xuXG4gICAgY29uc3RydWN0b3IoaWQ6bnVtYmVyLCBuYW1lOnN0cmluZywgZGVzY3JpcHRpb246c3RyaW5nKXtcbiAgICAgICAgc3VwZXIoaWQpO1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XG4gICAgfVxuXG4gICAgZGlzcGxheSgkcGFyZW50OiBKUXVlcnkpOiB2b2lke1xuICAgICAgICBsZXQgZGl2OiBzdHJpbmcgPSBcIjxkaXYgY2xhc3M9J3R5cGUgYW5pbWF0ZWQgc3dpbmcnIGlkPSdcIit0aGlzLm5hbWUrXCInIGRhdGEtY2F0ZWdvcnk9XCIrdGhpcy5pZCtcIj48aDM+XCIgKyB0aGlzLm5hbWUgKyBcIjwvaDM+PC9kaXY+XCI7XG4gICAgICAgIHRoaXMuJGRvbSA9ICQoZGl2KTtcbiAgICAgICAgJHBhcmVudC5hcHBlbmQodGhpcy4kZG9tKTtcbiAgICB9XG5cbiAgICBcbn0iLCJpbXBvcnQgeyBDYXRlZ29yaWUgfSBmcm9tIFwiLi9DYXRlZ29yaWVcIjtcbmltcG9ydCB7IE1vZGVsIH0gZnJvbSBcIi4vTW9kZWxcIjtcblxuZXhwb3J0IGNsYXNzIFByb2R1aXQgZXh0ZW5kcyBNb2RlbHtcblxuXG4gICAgcHJpdmF0ZSBuYW1lOnN0cmluZztcbiAgICBwcml2YXRlIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG4gICAgcHJvdGVjdGVkICAkZG9tOiBKUXVlcnk7XG5cbiAgICBjb25zdHJ1Y3RvciggaWQ6IG51bWJlciwgbmFtZTpzdHJpbmcsIGRlc2NyaXB0aW9uOiBzdHJpbmcgKXtcbiAgICAgICAgc3VwZXIoaWQpO1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XG4gICAgfVxuXG4gICAgc2V0RGVzY3JpcHRpb24oIGRlc2NyaXB0aW9uOiBzdHJpbmcgKXtcbiAgICAgICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICAgIH1cblxuICAgIGRpc3BsYXkoJHBhcmVudDogSlF1ZXJ5KTogdm9pZHtcbiAgICAgICAgbGV0IGRpdjogc3RyaW5nID0gXCI8ZGl2IGNsYXNzPSdwcm9kIGFuaW1hdGVkIHN3aW5nJyBpZD0nXCIrdGhpcy5pZCtcIicgZGF0YS1wcm9kdWl0PVwiK3RoaXMuaWQrXCI+PGgzPlwiICsgdGhpcy5uYW1lICsgXCI8L2gzPjwvZGl2PlwiO1xuICAgICAgICB0aGlzLiRkb20gPSAkKGRpdik7XG4gICAgICAgICRwYXJlbnQuYXBwZW5kKHRoaXMuJGRvbSk7XG4gICAgfVxuICAgIGRldGFpbCgkcGFyZW50OiBKUXVlcnkpOiB2b2lke1xuICAgICAgICBsZXQgZGl2OiBzdHJpbmcgPSBcIjxkaXYgY2xhc3M9J2RldGFpbCBhbmltYXRlZCBmYWRlSW5MZWZ0Jz48cD5cIiArIHRoaXMuZGVzY3JpcHRpb24gKyBcIjwvcD48YnI+PGltZyBzcmM9J2NhdC5naWYnIGlkPSdpbWcnLz48L2Rpdj5cIjtcbiAgICAgICAgdGhpcy4kZG9tID0gJChkaXYpO1xuICAgICAgICAkcGFyZW50LmFwcGVuZCh0aGlzLiRkb20pO1xuICAgIH1cbn0iLCJpbXBvcnQge0NhdGVnb3JpZX0gZnJvbSAnLi9DYXRlZ29yaWUnO1xuaW1wb3J0IHsgUHJvZHVpdCB9IGZyb20gXCIuL1Byb2R1aXRcIjtcbmltcG9ydCB7IE1vZGVsIH0gZnJvbSAnLi9Nb2RlbCc7XG5cbmV4cG9ydCBjbGFzcyBWZW5kZXVyIGV4dGVuZHMgTW9kZWwgIHtcblxuICAgIHByaXZhdGUgbmFtZTogc3RyaW5nO1xuICAgIHByaXZhdGUgY2F0ZWdvcmllczogQ2F0ZWdvcmllW107XG4gICAgcHJpdmF0ZSBwcm9kdWl0czogUHJvZHVpdFtdO1xuXG4gICAgY29uc3RydWN0b3IoIGlkOm51bWJlciwgbmFtZTpzdHJpbmcgKXtcbiAgICAgICAgc3VwZXIoaWQpO1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIH1cblxuICAgIGFkZENhdGVnb3JpZSggY2F0ZWdvcnk6IENhdGVnb3JpZSApe1xuICAgICAgICB0aGlzLmNhdGVnb3JpZXMucHVzaCggY2F0ZWdvcnkgKTtcbiAgICB9XG5cbiAgICBhZGRQcm9kdWl0KCBwcm9kdWl0OiBQcm9kdWl0ICl7XG4gICAgICAgIHRoaXMucHJvZHVpdHMucHVzaCggcHJvZHVpdCApO1xuICAgIH1cblxufSIsImltcG9ydCB7Q2F0ZWdvcmllfSBmcm9tICcuL0NhdGVnb3JpZSc7XG5pbXBvcnQgeyBWZW5kZXVyIH0gZnJvbSAnLi9WZW5kZXVyJztcbmltcG9ydCB7IFByb2R1aXQgfSBmcm9tICcuL1Byb2R1aXQnO1xuXG5leHBvcnQgY2xhc3MgQXBwe1xuICAgIHB1YmxpYyAkdXNlcm5hbWU6IEpRdWVyeTxIVE1MRWxlbWVudD47XG4gICAgcHVibGljICRwYXNzd29yZDogSlF1ZXJ5PEhUTUxFbGVtZW50PjtcbiAgICBwdWJsaWMgJGNhdGVnb3JpZXM6IEpRdWVyeTxIVE1MRWxlbWVudD47XG4gICAgcHVibGljICRjb25uZWN0aW9uOiBKUXVlcnk8SFRNTEVsZW1lbnQ+O1xuICAgIHB1YmxpYyAkdmluczogSlF1ZXJ5PEhUTUxFbGVtZW50PjtcbiAgICBwdWJsaWMgJGRldGFpbHM6IEpRdWVyeTxIVE1MRWxlbWVudD47XG5cbiAgICBwdWJsaWMgY3VycmVudF92ZW5kb3I6VmVuZGV1cjtcbiAgICBwdWJsaWMgY3VycmVudF9jYXRlOiBDYXRlZ29yaWU7XG4gICAgcHVibGljIGN1cnJlbnRfcHJvZHVpdDogUHJvZHVpdDtcbiAgICBwdWJsaWMgYWxsX2NhdGVnb3JpZXM6IENhdGVnb3JpZVtdO1xuICAgIHB1YmxpYyBhbGxfcHJvZHVjdDogUHJvZHVpdFtdO1xuXG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgdGhpcy4kdXNlcm5hbWUgPSAkKFwiI3VzZXJuYW1lXCIpO1xuICAgICAgICB0aGlzLiRwYXNzd29yZCA9ICQoXCIjcGFzc3dvcmRcIik7XG4gICAgICAgIHRoaXMuJGNhdGVnb3JpZXMgPSAkKFwiI2NhdGVnb3JpZXNcIik7XG4gICAgICAgIHRoaXMuJGNvbm5lY3Rpb24gPSAkKFwiI2Nvbm5lY3Rpb25cIik7XG4gICAgICAgIHRoaXMuJHZpbnMgPSAkKFwiI3ZpbnNcIik7XG4gICAgICAgIHRoaXMuJGRldGFpbHMgPSAkKFwiI2RldGFpbHNcIik7XG5cbiAgICAgICAgdGhpcy5hbGxfY2F0ZWdvcmllcyA9IFtdO1xuICAgICAgICB0aGlzLmFsbF9wcm9kdWN0ID0gW107XG4gICAgICAgXG4gICAgfVxuXG4gICAgZGlzcGxheUNhdGVnb3JpZXMoKXtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy4kY2F0ZWdvcmllcyk7XG4gICAgICAgIGZvcihsZXQgY2F0ZWdvcnkgb2YgdGhpcy5hbGxfY2F0ZWdvcmllcyl7XG4gICAgICAgICAgICAgY2F0ZWdvcnkuZGlzcGxheSh0aGlzLiRjYXRlZ29yaWVzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRpc3BsYXlQcm9kdWN0KCl7XG4gICAgICAgIGZvcihsZXQgcHJvZHVjdCBvZiB0aGlzLmFsbF9wcm9kdWN0KXtcbiAgICAgICAgICAgICBwcm9kdWN0LmRpc3BsYXkodGhpcy4kdmlucyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZWFkVmVuZGV1cigpe1xuICAgICAgICB2YXIgdXNlcm5hbWU9dGhpcy4kdXNlcm5hbWUudmFsKCk7XG4gICAgICAgIHZhciBwYXNzd29yZD10aGlzLiRwYXNzd29yZC52YWwoKTtcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBcImh0dHA6Ly9sb2NhbGhvc3Q6ODg4OC90cF92aW4vQVBJL2Nvbm5lY3RcIixcbiAgICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhIDoge1xuICAgICAgICAgICAgICAgIHVzZXJuYW1lIDogdXNlcm5hbWUsXG4gICAgICAgICAgICAgICAgcGFzc3dvcmQgOiBwYXNzd29yZFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRhdGFUeXBlOiBcImpzb25cIixcbiAgICAgICAgICAgIHN1Y2Nlc3MgOiAoIGRhdGEgKSA9PiB7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYoIGRhdGEuc3VjY2VzcyA9PSB0cnVlICl7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRfdmVuZG9yID0gbmV3IFZlbmRldXIoIGRhdGEudXNlci5pZCwgZGF0YS51c2VyLnVzZXJuYW1lICk7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kY2F0ZWdvcmllcy5zaG93KCk7IFxuICAgICAgICAgICAgICAgICAgICB0aGlzLiRjb25uZWN0aW9uLmhpZGUoKTtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlYWRDYXRlZ29yaWVzKCk7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcblxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24oIGVycm9yICl7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICAgICAgICAgIGFsZXJ0KFwiZXJyb3JcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlYWRDYXRlZ29yaWVzKCl7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogXCJodHRwOi8vbG9jYWxob3N0Ojg4ODgvdHBfdmluL0FQSS92ZW5kb3IvXCIgKyB0aGlzLmN1cnJlbnRfdmVuZG9yLmdldElkKCkgKyBcIi9jYXRlZ29yeVwiLFxuICAgICAgICAgICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgICAgICAgICAgZGF0YVR5cGU6IFwianNvblwiLFxuICAgICAgICAgICAgc3VjY2VzcyA6ICggZGF0YSApID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgICAgICBpZiggZGF0YS5zdWNjZXNzID09IHRydWUgKXtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGZvciggbGV0IGVsZW1lbnQgb2YgZGF0YS5jYXRlZ29yeSApe1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNhdGVnb3J5OiBDYXRlZ29yaWUgPSBuZXcgQ2F0ZWdvcmllKCBlbGVtZW50LmlkLCBlbGVtZW50Lm5hbWUsIGVsZW1lbnQuZGVzY3JpcHRpb24gKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWxsX2NhdGVnb3JpZXMucHVzaCggY2F0ZWdvcnkgKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRpc3BsYXlDYXRlZ29yaWVzKCk7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcblxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24oIGVycm9yICl7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICAgICAgICAgIGFsZXJ0KFwiZXJyb3JcIik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSlcblxuICAgIH1cblxuICAgIHJlYWRQcm9kdWN0KCl7XG4gICAgICAgIFxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBcImh0dHA6Ly9sb2NhbGhvc3Q6ODg4OC90cF92aW4vQVBJL3ZlbmRvci9cIiArIHRoaXMuY3VycmVudF92ZW5kb3IuZ2V0SWQoKSArIFwiL2NhdGVnb3J5L1wiICsgdGhpcy5jdXJyZW50X2NhdGUuZ2V0SWQoKSArIFwiL3Byb2R1Y3RzXCIsXG4gICAgICAgICAgICBtZXRob2Q6IFwiR0VUXCIsXG4gICAgICAgICAgICBkYXRhVHlwZTogXCJqc29uXCIsXG4gICAgICAgICAgICBzdWNjZXNzIDogKCBkYXRhICkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgICAgIGlmKCBkYXRhLnN1Y2Nlc3MgPT0gdHJ1ZSApe1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgZm9yKCBsZXQgZWxlbWVudCBvZiBkYXRhLnByb2R1Y3QgKXsgY29uc29sZS5sb2coZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcHJvZHVjdDogUHJvZHVpdCA9IG5ldyBQcm9kdWl0KCBlbGVtZW50LmlkLCBlbGVtZW50LnZpbiwgZWxlbWVudC5kZXNjcmlwdGlvbiApO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hbGxfcHJvZHVjdC5wdXNoKCBwcm9kdWN0ICk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGlzcGxheVByb2R1Y3QoKTtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiggZXJyb3IgKXtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgICAgICAgICAgYWxlcnQoXCJlcnJvclwiKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KVxuICAgICAgICBcbiAgICB9XG5cbiAgICByZWFkRGV0YWlsKCl7XG4gICAgICAgIFxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBcImh0dHA6Ly9sb2NhbGhvc3Q6ODg4OC90cF92aW4vQVBJL3Byb2R1aXQvXCIgKyB0aGlzLmN1cnJlbnRfcHJvZHVpdC5nZXRJZCgpICsgXCIvZGV0YWlsc1wiLFxuICAgICAgICAgICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgICAgICAgICAgZGF0YVR5cGU6IFwianNvblwiLFxuICAgICAgICAgICAgc3VjY2VzcyA6ICggZGF0YSApID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgICAgICBpZiggZGF0YS5zdWNjZXNzID09IHRydWUgKXsgXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudF9wcm9kdWl0LnNldERlc2NyaXB0aW9uKCBkYXRhLmRldGFpbHMuZGVzY3JpcHRpb24gKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50X3Byb2R1aXQuZGV0YWlsKCB0aGlzLiRkZXRhaWxzICk7ICBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uKCBlcnJvciApe1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgICAgICAgICBhbGVydChcImVycm9yXCIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pXG4gICAgICAgIFxuICAgIH1cblxuICAgIGdldENhdGVnb3J5QnlJZCggaWQ6IG51bWJlciApOiBDYXRlZ29yaWV7XG5cbiAgICAgICAgZm9yKCBsZXQgY2F0ZWdvcnkgb2YgdGhpcy5hbGxfY2F0ZWdvcmllcyApe1xuICAgICAgICAgICAgaWYoIGNhdGVnb3J5LmdldElkKCkgPT0gaWQgKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gY2F0ZWdvcnk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgZ2V0UHJvZHVpdEJ5SWQoIGlkOiBudW1iZXIgKTogUHJvZHVpdHtcblxuICAgICAgICBmb3IoIGxldCBwcm9kdWl0IG9mIHRoaXMuYWxsX3Byb2R1Y3QgKXtcbiAgICAgICAgICAgIGlmKCBwcm9kdWl0LmdldElkKCkgPT0gaWQgKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJvZHVpdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG59IiwiaW1wb3J0IHsgQXBwIH0gZnJvbSBcIi4vYXBwXCI7XG5cbnZhciBhcHA6QXBwID0gbmV3IEFwcCgpO1xuXG4kKFwiI2Zvcm1cIikuc3VibWl0KCBmdW5jdGlvbihldmVudCl7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBhcHAucmVhZFZlbmRldXIoKTtcbiAgICBcbn0pO1xuXG4kKGRvY3VtZW50KS5vbihcImNsaWNrXCIsIFwiLnR5cGVcIiwgZnVuY3Rpb24oKXtcbiAgICBcbiAgICBhcHAuJGNhdGVnb3JpZXMuaGlkZSgpOyBcbiAgICBhcHAuJHZpbnMuc2hvdygpO1xuICAgIGFwcC5jdXJyZW50X2NhdGUgPSBhcHAuZ2V0Q2F0ZWdvcnlCeUlkKCAkKHRoaXMpLmRhdGEoJ2NhdGVnb3J5JykgYXMgbnVtYmVyICk7XG4gICAgYXBwLnJlYWRQcm9kdWN0KCk7XG4gICAgXG59KTtcblxuJChkb2N1bWVudCkub24oXCJjbGlja1wiLCBcIi5wcm9kXCIsIGZ1bmN0aW9uKCl7XG4gICAgXG4gICAgYXBwLiR2aW5zLmhpZGUoKTsgXG4gICAgYXBwLiRkZXRhaWxzLnNob3coKTtcbiAgICBhcHAuY3VycmVudF9wcm9kdWl0ID0gYXBwLmdldFByb2R1aXRCeUlkKCAkKHRoaXMpLmRhdGEoJ3Byb2R1aXQnKSBhcyBudW1iZXIgKTtcbiAgICBhcHAucmVhZERldGFpbCgpO1xuICAgIFxufSk7XG5cbi8vICQoZG9jdW1lbnQpLm9uKFwiY2xpY2tcIiwgXCIjYmFja2xvZ1wiLCBmdW5jdGlvbigpe1xuICAgIFxuLy8gICAgIGFwcC4kY2F0ZWdvcmllcy5oaWRlKCk7IFxuLy8gICAgIGFwcC4kY29ubmVjdGlvbi5zaG93KCk7XG4gICAgXG4vLyB9KTtcbi8vICQoZG9jdW1lbnQpLm9uKFwiY2xpY2tcIiwgXCIjYmFja2NhdGVcIiwgZnVuY3Rpb24oKXtcbiAgICBcbi8vICAgICBhcHAuJHZpbnMuaGlkZSgpOyBcbi8vICAgICBhcHAuJGNhdGVnb3JpZXMuc2hvdygpO1xuICAgIFxuLy8gfSk7XG4vLyAkKGRvY3VtZW50KS5vbihcImNsaWNrXCIsIFwiI2JhY2twcm9kXCIsIGZ1bmN0aW9uKCl7XG4gICAgXG4vLyAgICAgYXBwLiRkZXRhaWxzLmhpZGUoKTsgXG4vLyAgICAgYXBwLiR2aW5zLnNob3coKTtcbiAgICBcbi8vIH0pO1xuIl19
