import { EmissionModule } from "./emission-module";
import { advancedSerializer } from "./serializer/advanced-serializer";
import { factorSerializer } from "./serializer/factor-serializer";

export interface Serializer {
    save(module: EmissionModule): any, 
    load(data: any): EmissionModule
}

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

export default class EmissionsManager{
    /*
        Loads an object with unknown type
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