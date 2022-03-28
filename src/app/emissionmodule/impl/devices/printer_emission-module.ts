import { EmissionModule, EmissionUtils, FactorEmissionModule } from "../../emission-module";

export const PRINTER_EMISSION_MODULE_ID = "printer_emission_module";

export class PrinterEmissionModule extends FactorEmissionModule{
    constructor(){
        super(PRINTER_EMISSION_MODULE_ID);
        super.factor = 60;
        super.unit="piece";
    }
}

export class PrinterEmissionUtil implements EmissionUtils{
    create(data: any): EmissionModule {
        let module = new PrinterEmissionModule();
        if(data.number){
            module.number = data.number;
        }
        return module;
    }
    save(module: EmissionModule) {
        if(module instanceof PrinterEmissionModule){
            let obj: PrinterEmissionModule = module as PrinterEmissionModule;
            return { type: obj.id, number: obj.number };
        }
        return undefined;
    }
}