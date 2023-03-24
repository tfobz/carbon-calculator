import { EmissionModule } from "../emission-module";
import { Serializer } from "../emissions_manager";
import { AdvancedEmissionModule, AdvancedSubModule } from "../modules/advanced-module";
/**
 * The AdvancedSerializer class is an implementation of the Serializer interface, which is
 * used to save and load instances of the AdvancedEmissionModule class.
 */
export class AdvancedSerializer implements Serializer {
   /**
   * This method takes an instance of the EmissionModule class as an input, and converts it
   * into a JavaScript object. The method loops through the list of submodules in the advanced
   * module and converts it into an array of arrays containing the id and number of each submodule.
   * @param module
   * @returns JavaScript object
   */
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
    /**
     * This method takes a plain JavaScript object as an input and converts it back into an
     * instance of the AdvancedEmissionModule class. The method creates a new instance of
     * the AdvancedEmissionModule class, and then loops through the data property of the
     * input object and creates an array of AdvancedSubModule objects.
     * @param data
     * @returns
     */
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
/** Instance of the AdvancedSerializer class. */
export const advancedSerializer = new AdvancedSerializer();
