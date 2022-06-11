import { EmissionModule } from "./emission-module";
import { AdvancedSerializer, advancedSerializer } from "./serializer/advanced-serializer";
import { FactorSerializer, factorSerializer } from "./serializer/factor-serializer";

export interface Serializer {
    save(module: EmissionModule): any, 
    load(data: any): EmissionModule
}

const emissions: Map<string, Serializer> = new Map();
emissions.set("school_car_emission_module", factorSerializer);
emissions.set("electricity_emission_module", advancedSerializer);

export default class EmissionsManager{
    /*
        Loads an object with unknown type
    */
    static load(data: any): EmissionModule|undefined{
        if(data.type){
            let utils: Serializer|undefined = emissions.get(data.type);
            if(utils){
                return utils.load(data);
            }
        }
        return undefined;
    }
    
    static save(module: EmissionModule): any{
        let utils: Serializer|undefined = emissions.get(module.id);
        if(utils){
            return utils.save(module);
        }
        return undefined;
    }

    static getModuleIDs(): string[] {
        return Array.from(emissions.keys());
    }
}