import { EmissionModule } from "../emission-module";
import { Serializer } from "../emissions_manager";
import { FactorEmissionModule } from "../modules/factor-module";
/**
 * The FactorSerializer class is used to handle the serialization and deserialization
 * of EmissionModule objects
 */
export class FactorSerializer implements Serializer {
  /**
   * takes an EmissionModule object and converts it into a JavaScript object that can be
   * easily stored in a file or database. In this case, it only stores the type and number
   * properties of the module.
   * @param module EmissionModule
   * @returns Javascript object
   */
    save(module: EmissionModule) {
        const data = {
            type: module.id,
            number: module.number
        };
        return data;
    }
    /**
     * takes a JavaScript object and converts it back into an EmissionModule object
     * @param data
     * @returns
     */
    load(data: any): EmissionModule {
        const module = new FactorEmissionModule(data.type);
        if(data.number) module.number = data.number;
        return module;
    }
}
/**
 *  It is an instance of FactorSerializer class.
 */
export const factorSerializer = new FactorSerializer();
