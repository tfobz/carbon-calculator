import { EmissionModule } from "../emission-module";
import { FactorManager } from "../factor-manager";
/**
 * The FactorEmissionModule class is an Angular class that implements the EmissionModule interface.
 * It calculates the emissions by multiplying the number of the module by the corresponding factor in the FactorManager.
 */
export class FactorEmissionModule implements EmissionModule{
    /** ID of the module */
    private _id: string = "";
    /** Unit of measurment of the module */
    private _unit: string = "Unit";
    /** rapresents how much of e.g. km you drove */
    private _number: number = 0;
    /**
     * sets the ID
     * @param id of the module
     * @returns void
     * */
    constructor(id: string){
        this._id = id;
    }
    /**
     * takes in a FactorManager as an argument and calculates the emissions by multiplying the
     * number of the module by the corresponding factor in the FactorManager
     * @param factorManager FactorManager
     * @returns emissions number
     * */
    calculate(factorManager: FactorManager): number{
        return this._number * factorManager.get(this._id);
    }
    /**
     * get the ID of the module
     * @returns string
     * */
    public get id(): string{ return this._id; }
    /**
     * get the unit of the module
     * @returns string
     * */
    public get unit(): string { return this._unit; }
    /**
     * set the unit of the module
     * @param unit string
     * @returns void
     *  */
    public set unit(unit: string){ this._unit = unit; }
    /**
     * get the number of the module
     * @returns number
     * */
    public get number(){ return this._number; }
    /**
     * set the number of the module
     * @param number number
     * @returns void
     * */
    public set number(number: number){ this._number = number; }
}
