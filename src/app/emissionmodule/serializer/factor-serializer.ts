import { EmissionModule } from "../emission-module";
import { Serializer } from "../emissions_manager";
import { FactorEmissionModule } from "../modules/factor-module";

export class FactorSerializer implements Serializer {
    save(module: EmissionModule) {
        const data = {
            type: module.id,
            number: module.number
        };
        return data;
    }
    load(data: any): EmissionModule {
        const module = new FactorEmissionModule(data.type);
        if(data.number) module.number = data.number;
        return module;
    }
}

export const factorSerializer = new FactorSerializer();