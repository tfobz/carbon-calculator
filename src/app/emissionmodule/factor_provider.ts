import { FactorManager } from "./factor-manager";

import italy from "../../assets/factors/italy.json";
import austria from "../../assets/factors/austria.json";
import sweden from "../../assets/factors/sweden.json";
import spain from "../../assets/factors/spain.json";
/** is an array of preset names of countries that are currently supported by the class.  */
export const PRESET_FACTORS_LIST: string[] = [
    "italy", "austria", "sweden", "spain"
];
/**
 * The FactorProvider class provides a way to get a FactorManager object based on a preset name.
 * The class imports four json files, one for each of the preset names in the PRESET_FACTORS_LIST.
 */
export class FactorProvider{
  /**
   * takes a preset name as an argument and returns a FactorManager object based on the preset name
   * If a preset name that is not in the PRESET_FACTORS_LIST is passed as an argument to the
   * get(preset_name: string) method, it will return a new instance of FactorManager with no data.
   * @param preset_name names of countries currentl supported by the app
   * @returns Faktormanager object
   */
    static get(preset_name: string): FactorManager{
        switch(preset_name.toLowerCase()){
            case "italy": {
                return FactorManager.load(italy);
            }
            case "austria": {
                return FactorManager.load(austria);
            }
            case "sweden": {
                return FactorManager.load(sweden);
            }
            case "spain": {
                return FactorManager.load(spain);
            }
            default: {
                return new FactorManager();
            }
        }
    }
}
