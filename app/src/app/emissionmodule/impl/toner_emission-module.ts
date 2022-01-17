import { EmissionModule, EmissionUtils, FactorEmissionModule } from "../emission-module";

export const TONER_EMISSION_MODULE_ID = "toner_emission_module";

export class TonerEmissionModule extends FactorEmissionModule{
    constructor(){
        super(TONER_EMISSION_MODULE_ID);
        super.factor = 5;
    }
}

export class TonerEmissionUtils implements EmissionUtils{
    create(data: any): EmissionModule {
        let module = new TonerEmissionModule();
        if(data.number){
            module.number = data.number;
        }
        return module;
    }
    save(module: EmissionModule) {
        if(module instanceof TonerEmissionModule){
            let toner: TonerEmissionModule = module as TonerEmissionModule;
            return { type: toner.id, number: toner.number };
        }
        return undefined;
    }
}