import { FactorManager } from "./factor-manager";

import italy from "../../assets/factors/italy.json";
import austria from "../../assets/factors/austria.json";
import sweden from "../../assets/factors/sweden.json";
import spain from "../../assets/factors/spain.json";

export const PRESET_FACTORS_LIST: string[] = [
    "italy", "austria", "sweden", "spain"
];

export class FactorProvider{
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