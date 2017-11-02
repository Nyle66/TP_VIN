export class Model {

    protected id: number;

    constructor( id: number ){
        this.id = id;
    }

    getId(){
        return this.id;
    }

}