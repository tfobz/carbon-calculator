import { EmissionModule, EmissionUtils, FactorEmissionModule } from "../emission-module";

export const WATER_EMISSION_MODULE_ID = "water_emission_module";

export class WaterEmissionModule extends FactorEmissionModule{
    constructor(){
        super(WATER_EMISSION_MODULE_ID);
        super.factor = 0.4;
    }
}

export class WaterEmissionUtil implements EmissionUtils{
    create(data: any): EmissionModule {
        let module = new WaterEmissionModule();
        if(data.number){
            module.number = data.number;
        }
        return module;
    }
    save(module: EmissionModule) {
        if(module instanceof WaterEmissionModule){
            let obj: WaterEmissionModule = module as WaterEmissionModule;
            return { type: obj.id, number: obj.number };
        }
        return undefined;
    }
}