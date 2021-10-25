import { EmissionModule, EmissionUtils, FactorEmissionModule } from "../../emission-module";

export const COFFEE_EMISSION_MODULE_ID = "coffee_emission_module";

export default class CoffeeEmissionModule extends FactorEmissionModule{
    constructor(){
        super(COFFEE_EMISSION_MODULE_ID);
        super.factor = 0.1;
    }
}

export class CoffeeEmissionUtil implements EmissionUtils{
    create(data: any): EmissionModule {
        let module = new CoffeeEmissionModule();
        if(data.number){
            module.number = data.number;
        }
        return module;
    }
    save(module: EmissionModule) {
        if(module instanceof CoffeeEmissionModule){
            let obj: CoffeeEmissionModule = module as CoffeeEmissionModule;
            return { type: obj.id, number: obj.number };
        }
        return undefined;
    }
}