
interface EmissionModule{
    id: string;
    calculate(): number;   
}

class FactorEmissionModule implements EmissionModule{
    private _id: string = "";
    private _factor: number = 0;
    private _number: number = 0;

    constructor(id: string){
        this._id = id;
    }

    calculate(): number{
        return this._number * this._factor;
    }

    public get id(): string{ return this._id; }

    public get factor(){ return this._factor; }
    public set factor(factor: number){ this._factor = factor; }

    public get number(){ return this._number; }
    public set number(number: number){ this._number = number; }
}

interface EmissionUtils{
    create(data: any): EmissionModule;
    save(module: EmissionModule): any;
}

export { EmissionModule, FactorEmissionModule, EmissionUtils };