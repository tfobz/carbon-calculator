import { EmissionModule } from "./emission-module";
import { advancedSerializer } from "./serializer/advanced-serializer";
import { factorSerializer } from "./serializer/factor-serializer";
/**
 * he purpose of the Serializer interface is to provide a way to convert EmissionModule objects
 * to and from a serialized format, such as JSON, for storage or transmission.
 */
export interface Serializer {
  /** takes an EmissionModule object as an argument and returns a serialized version
   *  of that object in the form of any.
  */
    save(module: EmissionModule): any,
  /**
   * takes a serialized object in the form of any as an argument and returns an EmissionModule object.
   */
    load(data: any): EmissionModule
}
/**
 * The emissions variable is a map that associates each EmissionModule type with a serializer
 * that can be used to save and load the module.
 */
const emissions: Map<string, Serializer> = new Map();
emissions.set("school_car_emission_module", factorSerializer);
emissions.set("heating_emission_module", factorSerializer);
emissions.set("dina4_emission_module", factorSerializer);
emissions.set("toner_emission_module", factorSerializer);
emissions.set("water_emission_module", factorSerializer);
emissions.set("computer_emission_module", factorSerializer);
emissions.set("laptop_emission_module", factorSerializer);
emissions.set("server_emission_module", factorSerializer);
emissions.set("printer_emission_module", factorSerializer);
emissions.set("plotter_emission_module", factorSerializer);
emissions.set("printer_3d_emission_module", factorSerializer);
emissions.set("pizza_emission_module", factorSerializer);
emissions.set("drinks_500ml_emission_module", factorSerializer);
emissions.set("coffee_emission_module", factorSerializer);

emissions.set("electricity_emission_module", advancedSerializer);
emissions.set("mobility_emission_module", advancedSerializer);
/**
 * The EmissionsManager class is used to handle different types of EmissionModule objects,
 * which are used to calculate emissions
 */
export default class EmissionsManager{
    /**
    *  Loads an object with unknown type
    */
    static load(data: any): EmissionModule|undefined{
        if(data.type){
            let utils: Serializer|undefined = emissions.get(data.type);
            if(utils){
                const ret = utils.load(data);
                if(units.has(ret.id)){
                    const unit = units.get(ret.id);
                    if(unit) ret.unit = unit;
                }
                return ret;
            }
        }
        return undefined;
    }
    /**
     * takes in an instance of EmissionModule and returns an object that can be saved
     * to a file or database.
     * @param module
     * @returns
     */
    static save(module: EmissionModule): any{
        let utils: Serializer|undefined = emissions.get(module.id);
        if(utils){
            return utils.save(module);
        }
        return undefined;
    }
    /**
     * returns an array of strings representing the ids of all available emission module types.
     * @returns array of strings representing the ids of all available emission module types
     */
    static getModuleIDs(): string[] {
        return Array.from(emissions.keys());
    }
    static getModuleUnits(ids:string[]): string[] {
        let ret: string[] = [];
        for(let id of ids){
            if(units.has(id)){
                ret.push(units.get(id) as string);
            }
        }
        return ret;
    }
}
/**
 * The units variable is a map that associates each EmissionModule type with a string
 * representing the unit of measurement for the module.
 */
const units: Map<string, string> = new Map();
units.set("water_emission_module", "m³");
units.set("heating_emission_module", "m³");
units.set("toner_emission_module", "piece");
units.set("computer_emission_module", "piece");
units.set("laptop_emission_module", "piece");
units.set("plotter_emission_module", "piece");
units.set("printer_3d_emission_module", "piece");
units.set("printer_emission_module", "piece");
units.set("server_emission_module", "piece");
units.set("pizza_emission_module", "piece");
units.set("dina3_emission_module", "piece");
units.set("dina4_emission_module", "piece");
units.set("coffee_emission_module", "cup");
units.set("drinks_500ml_emission_module", "glass");
units.set("school_car_emission_module", "km");
units.set("mobility_emission_module", "km");
units.set("electricity_emission_module", "kWh");
