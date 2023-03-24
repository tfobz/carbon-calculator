import { EmissionModule } from "../emission-module";
import { FactorManager } from "../factor-manager";

export interface AdvancedSubModule{
    id: string,
    number: number
}

export const ELECTRICITY_MODULE_ID: string = "electricity_emission_module";
export const MOBILITY_MODULE_ID: string = "mobility_emission_module";
/**
 *
 */
export const ELECTRICITY_TYPES: string[] = [
    "WIND_ELECTRICITY_TYPE",
    "HYDRO_POWER_ELECTRICITY_TYPE",
    "NATURAL_GAS_ELECTRICITY_TYPE",
    "OIL_ELECTRICITY_TYPE",
    "COAL_ELECTRICITY_TYPE"
];

export const MOBILITY_TYPES: string[] = [
    "PKW_MOBILITY_TYPE",
    "BUS_MOBILITY_TYPE",
    "TRAIN_MOBILITY_TYPE",
    "CITY_BUS_MOBILITY_TYPE"
];
/**
 * is a module for calculating emissions that have multiple sub-types,
 * such as electricity and mobility
 */
export class AdvancedEmissionModule implements EmissionModule {
  /**
   * Id of the module
   */
    private _id: string = "";
    /**
     * Unit of the module
     */
    private _unit: string = "Unit";
    /**
     * array of AdvancedSubModule
     */
    private _list: AdvancedSubModule[] = [];
    /**
     * sets the ID
     * @param id of the module
     */
    constructor(id: string){
        this._id = id;
    }
    /**
     *  takes in a FactorManager as an argument and calculates the emissions by multiplying the
     *  number of each submodule by the corresponding factor in the FactorManager
     * @param factorManager
     * @returns
     */
    calculate(factorManager: FactorManager): number {
        let sum = 0;
        this._list.forEach(subModule => {
            const result = subModule.number * factorManager.get(this._id + "_" + subModule.id);
            sum += result;
        })
        return sum;
    }
    /**
     * add a submodule to the list of submodules
     * @param subModule
     */
    add(subModule: AdvancedSubModule){
        this._list.push(subModule);
    }
    /**
     * 
     * @param id
     * @returns
     */
    getType(id: string): AdvancedSubModule | undefined{
        return this._list.find(subModule => subModule.id.toLowerCase() == id.toLowerCase());
    }
    /**
     * change value of a specific submodule
     * @param id
     * @param value
     */
    changeTypeValue(id: string, value: number){
        let subModule = this.getType(id);
        if(subModule == null) return;
        subModule.number = value;
    }

    removeType(id: string){
        this._list = this._list.filter(subModule => subModule.id != id);
    }

    getTypes(): string[]{
        let list: string[] = [];
        this._list.forEach(subModule => {
            list.push(subModule.id);
        })
        return list;
    }

    get list(): AdvancedSubModule[] {
        return this._list;
    }

    set list(list: AdvancedSubModule[]){
        this._list = list;
    }

    get number(): number {
        let sum = 0;
        this._list.forEach(subModule => sum += subModule.number);
        return sum;
    }

    set number(value: number){
        return;
    }

    get id(): string { return this._id; }

    get unit(): string { return this._unit; }
    public set unit(unit: string){ this._unit = unit; }

}
