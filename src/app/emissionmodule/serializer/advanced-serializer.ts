import { EmissionModule } from "../emission-module";
import { Serializer } from "../emissions_manager";
import { AdvancedEmissionModule, AdvancedSubModule } from "../modules/advanced-module";

export class AdvancedSerializer implements Serializer {
    save(module: EmissionModule) {
        const amodule = module as AdvancedEmissionModule;
        
        let list: any[] = [];
        amodule.list.forEach(subModule => {
            list.push([ subModule.id, subModule.number ]);
        });
        const data = {
            type: amodule.id,
            data: list
        };
        return data;
    }
    load(data: any): EmissionModule {
        const module = new AdvancedEmissionModule(data.type);

        let list: AdvancedSubModule[] = [];
        if(data.data){
            data.data.forEach((subModule:any) => {
                if(subModule.length != 2) return;
                list.push({ id: subModule[0], number: subModule[1] });
            })
        }
        
        module.list = list;
        return module;
    }
}

export const advancedSerializer = new AdvancedSerializer();