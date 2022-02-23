
interface EmissionModule{
    id: string;
    unit: string;
    number: number;
    calculate(): number;   
}

export interface ModuleType{
    id: string,
    factor: number
}

class FactorEmissionModule implements EmissionModule{
    private _id: string = "";
    private _unit: string = "Unit";
    private _factor: number = 0;
    private _number: number = 0;

    constructor(id: string){
        this._id = id;
    }

    calculate(): number{
        return this._number * this._factor;
    }

    public get id(): string{ return this._id; }
    
    public get unit(): string { return this._unit; }
    public set unit(unit: string){ this._unit = unit; }

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