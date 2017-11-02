import { Model } from "./Model";

export class Categorie extends Model{
        
    private name: string;
    
    private description: string;
    protected  $dom: JQuery;

    constructor(id:number, name:string, description:string){
        super(id);
        this.name = name;
        this.description = description;
    }

    display($parent: JQuery): void{
        let div: string = "<div class='type animated swing' id='"+this.name+"' data-category="+this.id+"><h3>" + this.name + "</h3></div>";
        this.$dom = $(div);
        $parent.append(this.$dom);
    }

    
}