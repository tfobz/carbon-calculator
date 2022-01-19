import { EmissionModule, EmissionUtils } from "src/app/emissionmodule/emission-module";
import { MobilityTypeFactory } from "./mobility_types";

export const MOBILITY_EMISSION_MODULE_ID = "mobility_emission_module";

export interface MobilityType{
    id: string,
    factor: number
}

export class MobilityEmissionModule implements EmissionModule{
    public id: string = MOBILITY_EMISSION_MODULE_ID;
    public data: Map<MobilityType, number> = new Map();

    addMobilityType(mobilityType: string, number: number){
        try{
            this.data.set(MobilityTypeFactory.create(mobilityType), number);
        }catch(ex){
            console.log(ex)
        }
    }

    calculate(): number {
        let ret: number = 0;
        for( const [ type, number ] of this.data){
            ret += type.factor * number;
        }
        return ret;
    }
}

export class MobilityEmissionUtils implements EmissionUtils{
    create(data: any): EmissionModule {
        let module = new MobilityEmissionModule();
        if(data.data != null){
            for(const [ typeId, number ] of data.data){
                module.addMobilityType(typeId, number);
            }
        }
        return module;
    }
    save(module: EmissionModule): Object | undefined {
        if(module instanceof MobilityEmissionModule){
            let toner: MobilityEmissionModule = module as MobilityEmissionModule;

            let dataMap: Array<any> = new Array();
            for(const [ type, number ] of module.data){
                dataMap.push( [ type.id, number ] );
            }

            return { type: toner.id, data: dataMap };
        }
        return undefined;
    }
}