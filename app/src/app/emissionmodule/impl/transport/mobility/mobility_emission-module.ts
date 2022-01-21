import { EmissionModule, EmissionUtils, ModuleType } from "src/app/emissionmodule/emission-module";
import { MobilityTypeFactory } from "./mobility_types";

export const MOBILITY_EMISSION_MODULE_ID = "mobility_emission_module";


export class MobilityEmissionModule implements EmissionModule{
    public id: string = MOBILITY_EMISSION_MODULE_ID;
    public unit: string = "km";
    public data: Map<ModuleType, number> = new Map();

    addMobilityType(mobilityType: string, number: number = 0){
        try{
            this.data.set(MobilityTypeFactory.create(mobilityType), number);
        }catch(ex){
            console.log(ex)
        }
    }

    removeType(mobilityType: string){
        try{
            const asd = this.getType(mobilityType);
            if(asd == null) return;
            this.data.delete(asd[0]);
        }catch(ex){
            console.log(ex)
        }
    }

    changeTypeValue(type:ModuleType, value:number){
        if(this.data.has(type))
            this.data.delete(type);
        this.data.set(type,value);
    }
    calculate(): number {
        let ret: number = 0;
        for( const [ type, number ] of this.data){
            ret += type.factor * number;
        }
        return ret;
    }
    getIDs():string[]{
        let ret:string[] = [];
        this.data.forEach((l, electricityType) => {
            ret.push(electricityType.id);
        })
        return ret;
    }
    getType(id:string):[ModuleType, number] | undefined{
        for(let cuple of this.data){
            if(cuple[0].id == id)
                return cuple; 
        }
        return undefined;
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