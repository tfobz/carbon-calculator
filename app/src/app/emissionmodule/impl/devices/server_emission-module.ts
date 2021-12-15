import { EmissionModule, EmissionUtils, FactorEmissionModule } from "../../emission-module";

export const SERVER_EMISSION_MODULE_ID = "server_emission_module";

export class ServerEmissionModule extends FactorEmissionModule{
    constructor(){
        super(SERVER_EMISSION_MODULE_ID);
        super.factor = 102.69;
    }
}

export class ServerEmissionUtil implements EmissionUtils{
    create(data: any): EmissionModule {
        let module = new ServerEmissionModule();
        if(data.number){
            module.number = data.number;
        }
        return module;
    }
    save(module: EmissionModule) {
        if(module instanceof ServerEmissionModule){
            let obj: ServerEmissionModule = module as ServerEmissionModule;
            return { type: obj.id, number: obj.number };
        }
        return undefined;
    }
}