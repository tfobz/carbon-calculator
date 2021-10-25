import { EmissionUtils, EmissionModule, FactorEmissionModule } from "../../emission-module";

export const SCHOOL_CAR_EMISSION_MODULE_ID = "school_car_emission_module";

export default class SchoolCarEmissionModule extends FactorEmissionModule{
    constructor(){
        super(SCHOOL_CAR_EMISSION_MODULE_ID);
        super.factor = 0.31;
    }
}

class SchoolCarEmissionUtils implements EmissionUtils{
    create(data: any): EmissionModule {
        let module = new SchoolCarEmissionModule();
        if(data.number){
            module.number = data.number;
        }
        return module;
    }
    save(module: EmissionModule) {
        if(module instanceof SchoolCarEmissionModule){
            let schoolcar: SchoolCarEmissionModule = module as SchoolCarEmissionModule;
            return { type: schoolcar.id, number: schoolcar.number };
        }
        return undefined;
    }
}

export { SchoolCarEmissionUtils };