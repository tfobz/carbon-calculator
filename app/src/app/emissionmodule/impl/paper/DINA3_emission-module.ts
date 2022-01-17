import { EmissionModule, EmissionUtils, FactorEmissionModule } from "../../emission-module";

export const DINA3_EMISSION_MODULE_ID = "dina3_emission_module";

export class DINA3EmissionModule extends FactorEmissionModule{
    constructor(){
        super(DINA3_EMISSION_MODULE_ID);
        super.factor = 0.0044 * 2;
    }
}

export class DINA3EmissionUtil implements EmissionUtils{
    create(data: any): EmissionModule {
        let module = new DINA3EmissionModule();
        if(data.number){
            module.number = data.number;
        }
        return module;
    }
    save(module: EmissionModule) {
        if(module instanceof DINA3EmissionModule){
            let obj: DINA3EmissionModule = module as DINA3EmissionModule;
            return { type: obj.id, number: obj.number };
        }
        return undefined;
    }
}