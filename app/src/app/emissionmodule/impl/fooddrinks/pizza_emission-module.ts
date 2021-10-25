import { EmissionModule, EmissionUtils, FactorEmissionModule } from "../../emission-module";

export const PIZZA_EMISSION_MODULE_ID = "pizza_emission_module";

export default class PizzaEmissionModule extends FactorEmissionModule{
    constructor(){
        super(PIZZA_EMISSION_MODULE_ID);
        super.factor = 1.5; // Excel has * 200
    }
}

export class PizzaEmissionUtil implements EmissionUtils{
    create(data: any): EmissionModule {
        let module = new PizzaEmissionModule();
        if(data.number){
            module.number = data.number;
        }
        return module;
    }
    save(module: EmissionModule) {
        if(module instanceof PizzaEmissionModule){
            let obj: PizzaEmissionModule = module as PizzaEmissionModule;
            return { type: obj.id, number: obj.number };
        }
        return undefined;
    }
}