import { FactorManager } from "./factor-manager";

import italy from "../../assets/factors/italy.json";

export const PRESET_FACTORS_LIST: string[] = [
    "italy"
];

export class FactorProvider{
    static get(preset_name: string): FactorManager{
        switch(preset_name.toLowerCase()){
            case "italy": {
                return FactorManager.load(italy);
            }
            default: {
                return new FactorManager();
            }
        }
    } 
}