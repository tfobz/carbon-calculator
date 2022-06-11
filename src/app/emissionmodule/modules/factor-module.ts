import { EmissionModule } from "../emission-module";
import { FactorManager } from "../factor-manager";

export class FactorEmissionModule implements EmissionModule{
    private _id: string = "";
    private _unit: string = "Unit";
    private _number: number = 0;

    constructor(id: string){
        this._id = id;
    }

    calculate(factorManager: FactorManager): number{
        return this._number * factorManager.get(this._id);
    }

    public get id(): string{ return this._id; }
    
    public get unit(): string { return this._unit; }
    public set unit(unit: string){ this._unit = unit; }

    public get number(){ return this._number; }
    public set number(number: number){ this._number = number; }
}