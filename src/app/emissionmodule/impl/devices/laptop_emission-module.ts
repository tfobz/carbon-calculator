import { EmissionModule, EmissionUtils, FactorEmissionModule } from "../../emission-module";

export const LAPTOP_EMISSION_MODULE_ID = "laptop_emission_module";

export class LaptopEmissionModule extends FactorEmissionModule{
    constructor(){
        super(LAPTOP_EMISSION_MODULE_ID);
        super.factor = 320/3;
        super.unit="piece";
    }
}

export class LaptopEmissionUtil implements EmissionUtils{
    create(data: any): EmissionModule {
        let module = new LaptopEmissionModule();
        if(data.number){
            module.number = data.number;
        }
        return module;
    }
    save(module: EmissionModule) {
        if(module instanceof LaptopEmissionModule){
            let laptop: LaptopEmissionModule = module as LaptopEmissionModule;
            return { type: laptop.id, number: laptop.number };
        }
        return undefined;
    }
}