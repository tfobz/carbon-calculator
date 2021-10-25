import { EmissionModule, EmissionUtils, FactorEmissionModule } from "../../emission-module";

export const DINA4_EMISSION_MODULE_ID = "dina4_emission_module";

export default class DINA4EmissionModule extends FactorEmissionModule{
    constructor(){
        super(DINA4_EMISSION_MODULE_ID);
        super.factor = 0.0044;
    }
}

export class DINA4EmissionUtil implements EmissionUtils{
    create(data: any): EmissionModule {
        let module = new DINA4EmissionModule();
        if(data.number){
            module.number = data.number;
        }
        return module;
    }
    save(module: EmissionModule) {
        if(module instanceof DINA4EmissionModule){
            let obj: DINA4EmissionModule = module as DINA4EmissionModule;
            return { type: obj.id, number: obj.number };
        }
        return undefined;
    }
}