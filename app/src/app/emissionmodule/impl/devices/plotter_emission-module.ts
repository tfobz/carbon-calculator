import { EmissionModule, EmissionUtils, FactorEmissionModule } from "../../emission-module";

export const PLOTTER_EMISSION_MODULE_ID = "plotter_emission_module";

export class PlotterEmissionModule extends FactorEmissionModule{
    constructor(){
        super(PLOTTER_EMISSION_MODULE_ID);
        super.factor = 102.69;
    }
}

export class PlotterEmissionUtil implements EmissionUtils{
    create(data: any): EmissionModule {
        let module = new PlotterEmissionModule();
        if(data.number){
            module.number = data.number;
        }
        return module;
    }
    save(module: EmissionModule) {
        if(module instanceof PlotterEmissionModule){
            let obj: PlotterEmissionModule = module as PlotterEmissionModule;
            return { type: obj.id, number: obj.number };
        }
        return undefined;
    }
}