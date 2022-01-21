import { EmissionModule, EmissionUtils, FactorEmissionModule } from "../../emission-module";

export const COMPUTER_EMISSION_MODULE_ID = "computer_emission_module";

export class ComputerEmissionModule extends FactorEmissionModule{
    constructor(){
        super(COMPUTER_EMISSION_MODULE_ID);
        super.factor = 102.69;
    }
}

export class ComputerEmissionUtil implements EmissionUtils{
    create(data: any): EmissionModule {
        let module = new ComputerEmissionModule();
        if(data.number){
            module.number = data.number;
        }
        return module;
    }
    save(module: EmissionModule) {
        if(module instanceof ComputerEmissionModule){
            let computer: ComputerEmissionModule = module as ComputerEmissionModule;
            return { type: computer.id, number: computer.number };
        }
        return undefined;
    }
}