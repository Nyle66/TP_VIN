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
                    let div = "<div class='detail animated zoomIn'><p>" + this.description + "</p><br><img src='cat.gif' id='img'/></div>";
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
                    this.$categories.children(".type").remove();
                    for (let category of this.all_categories) {
                        category.display(this.$categories);
                    }
                }
                displayProduct() {
                    this.$vins.children(".prod").remove();
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
                            this.all_categories = [];
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
                            this.all_product = [];
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
                app.$details.children(".detail").remove();
                app.$details.show();
                app.current_produit = app.getProduitById($(this).data('produit'));
                app.readDetail();
            });
            $(document).on("click", "#backlog", function () {
                app.$categories.hide();
                app.$connection.show();
            });
            $(document).on("click", "#backcate", function () {
                app.$vins.hide();
                app.$categories.show();
            });
            $(document).on("click", "#backprod", function () {
                app.$details.hide();
                app.$vins.show();
            });
        }
    };
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlRTL01vZGVsLnRzIiwiVFMvQ2F0ZWdvcmllLnRzIiwiVFMvUHJvZHVpdC50cyIsIlRTL1ZlbmRldXIudHMiLCJUUy9BcHAudHMiLCJUUy9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7WUFBQSxRQUFBO2dCQUlJLFlBQWEsRUFBVTtvQkFDbkIsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7Z0JBQ2pCLENBQUM7Z0JBRUQsS0FBSztvQkFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztnQkFDbkIsQ0FBQzthQUVKLENBQUE7O1FBQUEsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7WUNWRixZQUFBLGVBQXVCLFNBQVEsYUFBSztnQkFPaEMsWUFBWSxFQUFTLEVBQUUsSUFBVyxFQUFFLFdBQWtCO29CQUNsRCxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7b0JBQ1YsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2pCLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO2dCQUNuQyxDQUFDO2dCQUVELE9BQU8sQ0FBQyxPQUFlO29CQUNuQixJQUFJLEdBQUcsR0FBVyx1Q0FBdUMsR0FBQyxJQUFJLENBQUMsSUFBSSxHQUFDLGtCQUFrQixHQUFDLElBQUksQ0FBQyxFQUFFLEdBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUcsYUFBYSxDQUFDO29CQUNuSSxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDbkIsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzlCLENBQUM7YUFHSixDQUFBOztRQUFBLENBQUM7Ozs7Ozs7Ozs7Ozs7O1lDbkJGLFVBQUEsYUFBcUIsU0FBUSxhQUFLO2dCQU85QixZQUFhLEVBQVUsRUFBRSxJQUFXLEVBQUUsV0FBbUI7b0JBQ3JELEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztvQkFDVixJQUFJLENB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Q0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ2pCLEdBQUcsQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUM7WUFFM0IsQ0FBQyxDQUFDLENBQUM7WUFDSCxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxXQUFXLEVBQUU7Z0JBRWpDLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ3BCLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7WUFFckIsQ0FBQyxDQUFDLENBQUM7UUFDSCxDQUFDIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgTW9kZWwge1xuXG4gICAgcHJvdGVjdGVkIGlkOiBudW1iZXI7XG5cbiAgICBjb25zdHJ1Y3RvciggaWQ6IG51bWJlciApe1xuICAgICAgICB0aGlzLmlkID0gaWQ7XG4gICAgfVxuXG4gICAgZ2V0SWQoKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuaWQ7XG4gICAgfVxuXG59IiwiaW1wb3J0IHsgTW9kZWwgfSBmcm9tIFwiLi9Nb2RlbFwiO1xuXG5leHBvcnQgY2xhc3MgQ2F0ZWdvcmllIGV4dGVuZHMgTW9kZWx7XG4gICAgICAgIFxuICAgIHByaXZhdGUgbmFtZTogc3RyaW5nO1xuICAgIFxuICAgIHByaXZhdGUgZGVzY3JpcHRpb246IHN0cmluZztcbiAgICBwcm90ZWN0ZWQgICRkb206IEpRdWVyeTtcblxuICAgIGNvbnN0cnVjdG9yKGlkOm51bWJlciwgbmFtZTpzdHJpbmcsIGRlc2NyaXB0aW9uOnN0cmluZyl7XG4gICAgICAgIHN1cGVyKGlkKTtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICAgIH1cblxuICAgIGRpc3BsYXkoJHBhcmVudDogSlF1ZXJ5KTogdm9pZHtcbiAgICAgICAgbGV0IGRpdjogc3RyaW5nID0gXCI8ZGl2IGNsYXNzPSd0eXBlIGFuaW1hdGVkIHN3aW5nJyBpZD0nXCIrdGhpcy5uYW1lK1wiJyBkYXRhLWNhdGVnb3J5PVwiK3RoaXMuaWQrXCI+PGgzPlwiICsgdGhpcy5uYW1lICsgXCI8L2gzPjwvZGl2PlwiO1xuICAgICAgICB0aGlzLiRkb20gPSAkKGRpdik7XG4gICAgICAgICRwYXJlbnQuYXBwZW5kKHRoaXMuJGRvbSk7XG4gICAgfVxuXG4gICAgXG59IiwiaW1wb3J0IHsgQ2F0ZWdvcmllIH0gZnJvbSBcIi4vQ2F0ZWdvcmllXCI7XG5pbXBvcnQgeyBNb2RlbCB9IGZyb20gXCIuL01vZGVsXCI7XG5cbmV4cG9ydCBjbGFzcyBQcm9kdWl0IGV4dGVuZHMgTW9kZWx7XG5cblxuICAgIHByaXZhdGUgbmFtZTpzdHJpbmc7XG4gICAgcHJpdmF0ZSBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICAgIHByb3RlY3RlZCAgJGRvbTogSlF1ZXJ5O1xuXG4gICAgY29uc3RydWN0b3IoIGlkOiBudW1iZXIsIG5hbWU6c3RyaW5nLCBkZXNjcmlwdGlvbjogc3RyaW5nICl7XG4gICAgICAgIHN1cGVyKGlkKTtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICAgIH1cblxuICAgIHNldERlc2NyaXB0aW9uKCBkZXNjcmlwdGlvbjogc3RyaW5nICl7XG4gICAgICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcbiAgICB9XG5cbiAgICBkaXNwbGF5KCRwYXJlbnQ6IEpRdWVyeSk6IHZvaWR7XG4gICAgICAgIGxldCBkaXY6IHN0cmluZyA9IFwiPGRpdiBjbGFzcz0ncHJvZCBhbmltYXRlZCBzd2luZycgaWQ9J1wiK3RoaXMuaWQrXCInIGRhdGEtcHJvZHVpdD1cIit0aGlzLmlkK1wiPjxoMz5cIiArIHRoaXMubmFtZSArIFwiPC9oMz48L2Rpdj5cIjtcbiAgICAgICAgdGhpcy4kZG9tID0gJChkaXYpO1xuICAgICAgICAkcGFyZW50LmFwcGVuZCh0aGlzLiRkb20pO1xuICAgIH1cbiAgICBkZXRhaWwoJHBhcmVudDogSlF1ZXJ5KTogdm9pZHtcbiAgICAgICAgbGV0IGRpdjogc3RyaW5nID0gXCI8ZGl2IGNsYXNzPSdkZXRhaWwgYW5pbWF0ZWQgem9vbUluJz48cD5cIiArIHRoaXMuZGVzY3JpcHRpb24gKyBcIjwvcD48YnI+PGltZyBzcmM9J2NhdC5naWYnIGlkPSdpbWcnLz48L2Rpdj5cIjtcbiAgICAgICAgdGhpcy4kZG9tID0gJChkaXYpO1xuICAgICAgICAkcGFyZW50LmFwcGVuZCh0aGlzLiRkb20pO1xuICAgIH1cbn0iLCJpbXBvcnQge0NhdGVnb3JpZX0gZnJvbSAnLi9DYXRlZ29yaWUnO1xuaW1wb3J0IHsgUHJvZHVpdCB9IGZyb20gXCIuL1Byb2R1aXRcIjtcbmltcG9ydCB7IE1vZGVsIH0gZnJvbSAnLi9Nb2RlbCc7XG5cbmV4cG9ydCBjbGFzcyBWZW5kZXVyIGV4dGVuZHMgTW9kZWwgIHtcblxuICAgIHByaXZhdGUgbmFtZTogc3RyaW5nO1xuICAgIHByaXZhdGUgY2F0ZWdvcmllczogQ2F0ZWdvcmllW107XG4gICAgcHJpdmF0ZSBwcm9kdWl0czogUHJvZHVpdFtdO1xuXG4gICAgY29uc3RydWN0b3IoIGlkOm51bWJlciwgbmFtZTpzdHJpbmcgKXtcbiAgICAgICAgc3VwZXIoaWQpO1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIH1cblxuICAgIGFkZENhdGVnb3JpZSggY2F0ZWdvcnk6IENhdGVnb3JpZSApe1xuICAgICAgICB0aGlzLmNhdGVnb3JpZXMucHVzaCggY2F0ZWdvcnkgKTtcbiAgICB9XG5cbiAgICBhZGRQcm9kdWl0KCBwcm9kdWl0OiBQcm9kdWl0ICl7XG4gICAgICAgIHRoaXMucHJvZHVpdHMucHVzaCggcHJvZHVpdCApO1xuICAgIH1cblxufSIsImltcG9ydCB7Q2F0ZWdvcmllfSBmcm9tICcuL0NhdGVnb3JpZSc7XG5pbXBvcnQgeyBWZW5kZXVyIH0gZnJvbSAnLi9WZW5kZXVyJztcbmltcG9ydCB7IFByb2R1aXQgfSBmcm9tICcuL1Byb2R1aXQnO1xuXG5leHBvcnQgY2xhc3MgQXBwe1xuICAgIHB1YmxpYyAkdXNlcm5hbWU6IEpRdWVyeTxIVE1MRWxlbWVudD47XG4gICAgcHVibGljICRwYXNzd29yZDogSlF1ZXJ5PEhUTUxFbGVtZW50PjtcbiAgICBwdWJsaWMgJGNhdGVnb3JpZXM6IEpRdWVyeTxIVE1MRWxlbWVudD47XG4gICAgcHVibGljICRjb25uZWN0aW9uOiBKUXVlcnk8SFRNTEVsZW1lbnQ+O1xuICAgIHB1YmxpYyAkdmluczogSlF1ZXJ5PEhUTUxFbGVtZW50PjtcbiAgICBwdWJsaWMgJGRldGFpbHM6IEpRdWVyeTxIVE1MRWxlbWVudD47XG5cbiAgICBwdWJsaWMgY3VycmVudF92ZW5kb3I6VmVuZGV1cjtcbiAgICBwdWJsaWMgY3VycmVudF9jYXRlOiBDYXRlZ29yaWU7XG4gICAgcHVibGljIGN1cnJlbnRfcHJvZHVpdDogUHJvZHVpdDtcbiAgICBwdWJsaWMgYWxsX2NhdGVnb3JpZXM6IENhdGVnb3JpZVtdO1xuICAgIHB1YmxpYyBhbGxfcHJvZHVjdDogUHJvZHVpdFtdO1xuXG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgdGhpcy4kdXNlcm5hbWUgPSAkKFwiI3VzZXJuYW1lXCIpO1xuICAgICAgICB0aGlzLiRwYXNzd29yZCA9ICQoXCIjcGFzc3dvcmRcIik7XG4gICAgICAgIHRoaXMuJGNhdGVnb3JpZXMgPSAkKFwiI2NhdGVnb3JpZXNcIik7XG4gICAgICAgIHRoaXMuJGNvbm5lY3Rpb24gPSAkKFwiI2Nvbm5lY3Rpb25cIik7XG4gICAgICAgIHRoaXMuJHZpbnMgPSAkKFwiI3ZpbnNcIik7XG4gICAgICAgIHRoaXMuJGRldGFpbHMgPSAkKFwiI2RldGFpbHNcIik7XG5cbiAgICAgICAgdGhpcy5hbGxfY2F0ZWdvcmllcyA9IFtdO1xuICAgICAgICB0aGlzLmFsbF9wcm9kdWN0ID0gW107XG4gICAgICAgXG4gICAgfVxuXG4gICAgZGlzcGxheUNhdGVnb3JpZXMoKXtcbiAgICAgICAgdGhpcy4kY2F0ZWdvcmllcy5jaGlsZHJlbihcIi50eXBlXCIpLnJlbW92ZSgpO1xuICAgICAgICBmb3IobGV0IGNhdGVnb3J5IG9mIHRoaXMuYWxsX2NhdGVnb3JpZXMpe1xuICAgICAgICAgICAgIGNhdGVnb3J5LmRpc3BsYXkodGhpcy4kY2F0ZWdvcmllcyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkaXNwbGF5UHJvZHVjdCgpe1xuICAgICAgICB0aGlzLiR2aW5zLmNoaWxkcmVuKCBcIi5wcm9kXCIgKS5yZW1vdmUoKTtcbiAgICAgICAgZm9yKGxldCBwcm9kdWN0IG9mIHRoaXMuYWxsX3Byb2R1Y3Qpe1xuICAgICAgICAgICAgIHByb2R1Y3QuZGlzcGxheSh0aGlzLiR2aW5zKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlYWRWZW5kZXVyKCl7XG4gICAgICAgIHZhciB1c2VybmFtZT10aGlzLiR1c2VybmFtZS52YWwoKTtcbiAgICAgICAgdmFyIHBhc3N3b3JkPXRoaXMuJHBhc3N3b3JkLnZhbCgpO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IFwiaHR0cDovL2xvY2FsaG9zdDo4ODg4L3RwX3Zpbi9BUEkvY29ubmVjdFwiLFxuICAgICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGEgOiB7XG4gICAgICAgICAgICAgICAgdXNlcm5hbWUgOiB1c2VybmFtZSxcbiAgICAgICAgICAgICAgICBwYXNzd29yZCA6IHBhc3N3b3JkXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGF0YVR5cGU6IFwianNvblwiLFxuICAgICAgICAgICAgc3VjY2VzcyA6ICggZGF0YSApID0+IHtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiggZGF0YS5zdWNjZXNzID09IHRydWUgKXtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudF92ZW5kb3IgPSBuZXcgVmVuZGV1ciggZGF0YS51c2VyLmlkLCBkYXRhLnVzZXIudXNlcm5hbWUgKTtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLiRjYXRlZ29yaWVzLnNob3coKTsgXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJGNvbm5lY3Rpb24uaGlkZSgpO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVhZENhdGVnb3JpZXMoKTtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiggZXJyb3IgKXtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgICAgICAgICAgYWxlcnQoXCJlcnJvclwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVhZENhdGVnb3JpZXMoKXtcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBcImh0dHA6Ly9sb2NhbGhvc3Q6ODg4OC90cF92aW4vQVBJL3ZlbmRvci9cIiArIHRoaXMuY3VycmVudF92ZW5kb3IuZ2V0SWQoKSArIFwiL2NhdGVnb3J5XCIsXG4gICAgICAgICAgICBtZXRob2Q6IFwiR0VUXCIsXG4gICAgICAgICAgICBkYXRhVHlwZTogXCJqc29uXCIsXG4gICAgICAgICAgICBzdWNjZXNzIDogKCBkYXRhICkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuYWxsX2NhdGVnb3JpZXMgPSBbXTtcbiAgICAgICAgICAgICAgICBpZiggZGF0YS5zdWNjZXNzID09IHRydWUgKXtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGZvciggbGV0IGVsZW1lbnQgb2YgZGF0YS5jYXRlZ29yeSApe1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNhdGVnb3J5OiBDYXRlZ29yaWUgPSBuZXcgQ2F0ZWdvcmllKCBlbGVtZW50LmlkLCBlbGVtZW50Lm5hbWUsIGVsZW1lbnQuZGVzY3JpcHRpb24gKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWxsX2NhdGVnb3JpZXMucHVzaCggY2F0ZWdvcnkgKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRpc3BsYXlDYXRlZ29yaWVzKCk7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcblxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24oIGVycm9yICl7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICAgICAgICAgIGFsZXJ0KFwiZXJyb3JcIik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSlcblxuICAgIH1cblxuICAgIHJlYWRQcm9kdWN0KCl7XG4gICAgICAgIFxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBcImh0dHA6Ly9sb2NhbGhvc3Q6ODg4OC90cF92aW4vQVBJL3ZlbmRvci9cIiArIHRoaXMuY3VycmVudF92ZW5kb3IuZ2V0SWQoKSArIFwiL2NhdGVnb3J5L1wiICsgdGhpcy5jdXJyZW50X2NhdGUuZ2V0SWQoKSArIFwiL3Byb2R1Y3RzXCIsXG4gICAgICAgICAgICBtZXRob2Q6IFwiR0VUXCIsXG4gICAgICAgICAgICBkYXRhVHlwZTogXCJqc29uXCIsXG4gICAgICAgICAgICBzdWNjZXNzIDogKCBkYXRhICkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuYWxsX3Byb2R1Y3QgPSBbXTtcbiAgICAgICAgICAgICAgICBpZiggZGF0YS5zdWNjZXNzID09IHRydWUgKXtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGZvciggbGV0IGVsZW1lbnQgb2YgZGF0YS5wcm9kdWN0ICl7IGNvbnNvbGUubG9nKGVsZW1lbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHByb2R1Y3Q6IFByb2R1aXQgPSBuZXcgUHJvZHVpdCggZWxlbWVudC5pZCwgZWxlbWVudC52aW4sIGVsZW1lbnQuZGVzY3JpcHRpb24gKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWxsX3Byb2R1Y3QucHVzaCggcHJvZHVjdCApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRpc3BsYXlQcm9kdWN0KCk7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcblxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24oIGVycm9yICl7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICAgICAgICAgIGFsZXJ0KFwiZXJyb3JcIik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSlcbiAgICAgICAgXG4gICAgfVxuXG4gICAgcmVhZERldGFpbCgpe1xuICAgICAgICBcbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogXCJodHRwOi8vbG9jYWxob3N0Ojg4ODgvdHBfdmluL0FQSS9wcm9kdWl0L1wiICsgdGhpcy5jdXJyZW50X3Byb2R1aXQuZ2V0SWQoKSArIFwiL2RldGFpbHNcIixcbiAgICAgICAgICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICAgICAgICAgIGRhdGFUeXBlOiBcImpzb25cIixcbiAgICAgICAgICAgIHN1Y2Nlc3MgOiAoIGRhdGEgKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgICAgICAgaWYoIGRhdGEuc3VjY2VzcyA9PSB0cnVlICl7IFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRfcHJvZHVpdC5zZXREZXNjcmlwdGlvbiggZGF0YS5kZXRhaWxzLmRlc2NyaXB0aW9uICk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudF9wcm9kdWl0LmRldGFpbCggdGhpcy4kZGV0YWlscyApOyAgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiggZXJyb3IgKXtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgICAgICAgICAgYWxlcnQoXCJlcnJvclwiKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KVxuICAgICAgICBcbiAgICB9XG5cbiAgICBnZXRDYXRlZ29yeUJ5SWQoIGlkOiBudW1iZXIgKTogQ2F0ZWdvcmlle1xuXG4gICAgICAgIGZvciggbGV0IGNhdGVnb3J5IG9mIHRoaXMuYWxsX2NhdGVnb3JpZXMgKXtcbiAgICAgICAgICAgIGlmKCBjYXRlZ29yeS5nZXRJZCgpID09IGlkICl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNhdGVnb3J5O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGdldFByb2R1aXRCeUlkKCBpZDogbnVtYmVyICk6IFByb2R1aXR7XG5cbiAgICAgICAgZm9yKCBsZXQgcHJvZHVpdCBvZiB0aGlzLmFsbF9wcm9kdWN0ICl7XG4gICAgICAgICAgICBpZiggcHJvZHVpdC5nZXRJZCgpID09IGlkICl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb2R1aXQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG59IiwiaW1wb3J0IHsgQXBwIH0gZnJvbSBcIi4vYXBwXCI7XG5cbnZhciBhcHA6QXBwID0gbmV3IEFwcCgpO1xuXG4kKFwiI2Zvcm1cIikuc3VibWl0KCBmdW5jdGlvbihldmVudCl7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBhcHAucmVhZFZlbmRldXIoKTtcbiAgICBcbn0pO1xuXG4kKGRvY3VtZW50KS5vbihcImNsaWNrXCIsIFwiLnR5cGVcIiwgZnVuY3Rpb24oKXtcbiAgICBcbiAgICBhcHAuJGNhdGVnb3JpZXMuaGlkZSgpOyBcbiAgICBhcHAuJHZpbnMuc2hvdygpO1xuICAgIGFwcC5jdXJyZW50X2NhdGUgPSBhcHAuZ2V0Q2F0ZWdvcnlCeUlkKCAkKHRoaXMpLmRhdGEoJ2NhdGVnb3J5JykgYXMgbnVtYmVyICk7XG4gICAgYXBwLnJlYWRQcm9kdWN0KCk7XG4gICAgXG59KTtcblxuJChkb2N1bWVudCkub24oXCJjbGlja1wiLCBcIi5wcm9kXCIsIGZ1bmN0aW9uKCl7XG4gICAgXG4gICAgYXBwLiR2aW5zLmhpZGUoKTsgXG4gICAgYXBwLiRkZXRhaWxzLmNoaWxkcmVuKFwiLmRldGFpbFwiKS5yZW1vdmUoKTtcbiAgICBhcHAuJGRldGFpbHMuc2hvdygpO1xuICAgIGFwcC5jdXJyZW50X3Byb2R1aXQgPSBhcHAuZ2V0UHJvZHVpdEJ5SWQoICQodGhpcykuZGF0YSgncHJvZHVpdCcpIGFzIG51bWJlciApO1xuICAgIGFwcC5yZWFkRGV0YWlsKCk7XG4gICAgXG59KTtcblxuJChkb2N1bWVudCkub24oXCJjbGlja1wiLCBcIiNiYWNrbG9nXCIsIGZ1bmN0aW9uKCl7XG4gICAgXG4gICAgYXBwLiRjYXRlZ29yaWVzLmhpZGUoKTsgXG4gICAgYXBwLiRjb25uZWN0aW9uLnNob3coKTtcbiAgICBcbn0pO1xuJChkb2N1bWVudCkub24oXCJjbGlja1wiLCBcIiNiYWNrY2F0ZVwiLCBmdW5jdGlvbigpe1xuICAgIFxuICAgIGFwcC4kdmlucy5oaWRlKCk7IFxuICAgIGFwcC4kY2F0ZWdvcmllcy5zaG93KCk7XG4gICAgXG59KTtcbiQoZG9jdW1lbnQpLm9uKFwiY2xpY2tcIiwgXCIjYmFja3Byb2RcIiwgZnVuY3Rpb24oKXtcbiAgICBcbiAgICBhcHAuJGRldGFpbHMuaGlkZSgpOyBcbiAgICBhcHAuJHZpbnMuc2hvdygpO1xuICAgIFxufSk7XG4iXX0=
