import { EmissionModule, EmissionUtils } from "./emission-module";
import { TonerEmissionUtils, TONER_EMISSION_MODULE_ID } from "./impl/toner_emission-module";
import { SchoolCarEmissionUtils, SCHOOL_CAR_EMISSION_MODULE_ID } from "./impl/transport/school_car_emission-module";

const emissions: Map<string, EmissionUtils> = new Map([
    [SCHOOL_CAR_EMISSION_MODULE_ID, new SchoolCarEmissionUtils()],
    [TONER_EMISSION_MODULE_ID, new TonerEmissionUtils()]
]);

export default class EmissionsManager{
    /*
        Loads an object with unknown type
    */
    static load(data: any): EmissionsManager|undefined{
        if(data.type){
            let utils: EmissionUtils|undefined = emissions.get(data.type);
            if(utils){
                return utils.create(data);
            }
        }
        return undefined;
    }
    
    static save(module: EmissionModule): any{
        if(module === undefined){
            return undefined;
        }
        let utils: EmissionUtils|undefined = emissions.get(module.id);
        if(utils){
            return utils.save(module);
        }
    }
}