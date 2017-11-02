import { Categorie } from "./Categorie";
import { Model } from "./Model";

export class Produit extends Model{


    private name:string;
    private description: string;
    protected  $dom: JQuery;

    constructor( id: number, name:string, description: string ){
        super(id);
        this.name = name;
        this.description = description;
    }

    setDescription( description: string ){
        this.description = description;
    }

    display($parent: JQuery): void{
        let div: string = "<div class='prod animated swing' id='"+this.id+"' data-produit="+this.id+"><h3>" + this.name + "</h3></div>";
        this.$dom = $(div);
        $parent.append(this.$dom);
    }
    detail($parent: JQuery): void{
        let div: string = "<div class='detail animated fadeInLeft'><p>" + this.description + "</p><br><img src='cat.gif' id='img'/></div>";
        this.$dom = $(div);
        $parent.append(this.$dom);
    }
}