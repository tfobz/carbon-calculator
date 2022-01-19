import { EmissionModule, EmissionUtils, FactorEmissionModule } from "../../emission-module";

export const HEATING_EMISSION_MODULE_ID = "heating_emission_module";

export class HeatingEmissionModule extends FactorEmissionModule{
    constructor(){
        super(HEATING_EMISSION_MODULE_ID);
        super.factor = 2.74;
    }
}

export class HeatingEmissionUtils implements EmissionUtils{
    create(data: any): EmissionModule {
        let module = new HeatingEmissionModule();
        if(data.number != null){
            module.number = data.number;
        }
        return module;
    }
    save(module: EmissionModule): Object | undefined {
        if(module instanceof HeatingEmissionModule){
            let toner: HeatingEmissionModule = module as HeatingEmissionModule;

            return { type: toner.id, number: module.number };
        }
        return undefined;
    }
}