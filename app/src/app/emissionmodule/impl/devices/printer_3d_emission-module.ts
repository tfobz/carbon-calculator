import { EmissionModule, EmissionUtils, FactorEmissionModule } from "../../emission-module";

export const PRINTER_3D_EMISSION_MODULE_ID = "printer_3d_emission_module";

export default class Printer3DEmissionModule extends FactorEmissionModule{
    constructor(){
        super(PRINTER_3D_EMISSION_MODULE_ID);
        super.factor = 102.69;
    }
}

export class Printer3DEmissionUtil implements EmissionUtils{
    create(data: any): EmissionModule {
        let module = new Printer3DEmissionModule();
        if(data.number){
            module.number = data.number;
        }
        return module;
    }
    save(module: EmissionModule) {
        if(module instanceof Printer3DEmissionModule){
            let obj: Printer3DEmissionModule = module as Printer3DEmissionModule;
            return { type: obj.id, number: obj.number };
        }
        return undefined;
    }
}