import {Categorie} from './Categorie';
import { Produit } from "./Produit";
import { Model } from './Model';

export class Vendeur extends Model  {

    private name: string;
    private categories: Categorie[];
    private produits: Produit[];

    constructor( id:number, name:string ){
        super(id);
        this.name = name;
    }

    addCategorie( category: Categorie ){
        this.categories.push( category );
    }

    addProduit( produit: Produit ){
        this.produits.push( produit );
    }

}