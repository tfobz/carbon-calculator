import { EmissionModule, EmissionUtils, FactorEmissionModule } from "../../emission-module";

export const DRINKS_500ML_EMISSION_MODULE_ID = "drinks_500ml_emission_module";

export default class Drinks500mlEmissionModule extends FactorEmissionModule{
    constructor(){
        super(DRINKS_500ML_EMISSION_MODULE_ID);
        super.factor = 0.8; // Excel has * 300
    }
}

export class Drinks500mlEmissionUtil implements EmissionUtils{
    create(data: any): EmissionModule {
        let module = new Drinks500mlEmissionModule();
        if(data.number){
            module.number = data.number;
        }
        return module;
    }
    save(module: EmissionModule) {
        if(module instanceof Drinks500mlEmissionModule){
            let obj: Drinks500mlEmissionModule = module as Drinks500mlEmissionModule;
            return { type: obj.id, number: obj.number };
        }
        return undefined;
    }
}