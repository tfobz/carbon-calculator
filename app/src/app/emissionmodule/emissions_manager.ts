import { EmissionModule, EmissionUtils } from "./emission-module";
import { ComputerEmissionUtil, COMPUTER_EMISSION_MODULE_ID } from "./impl/devices/computer_emission-module";
import { LaptopEmissionUtil, LAPTOP_EMISSION_MODULE_ID } from "./impl/devices/laptop_emission-module";
import { PlotterEmissionUtil, PLOTTER_EMISSION_MODULE_ID } from "./impl/devices/plotter_emission-module";
import { Printer3DEmissionUtil, PRINTER_3D_EMISSION_MODULE_ID } from "./impl/devices/printer_3d_emission-module";
import { PrinterEmissionUtil, PRINTER_EMISSION_MODULE_ID } from "./impl/devices/printer_emission-module";
import { ServerEmissionUtil, SERVER_EMISSION_MODULE_ID } from "./impl/devices/server_emission-module";
import { CoffeeEmissionUtil, COFFEE_EMISSION_MODULE_ID } from "./impl/fooddrinks/coffee_emission-module";
import { Drinks500mlEmissionUtil, DRINKS_500ML_EMISSION_MODULE_ID } from "./impl/fooddrinks/drinks_500ml_emission-module";
import { PizzaEmissionUtil, PIZZA_EMISSION_MODULE_ID } from "./impl/fooddrinks/pizza_emission-module";
import { DINA3EmissionUtil, DINA3_EMISSION_MODULE_ID } from "./impl/paper/DINA3_emission-module";
import { DINA4EmissionUtil, DINA4_EMISSION_MODULE_ID } from "./impl/paper/DINA4_emission-module";
import { TonerEmissionUtils, TONER_EMISSION_MODULE_ID } from "./impl/toner_emission-module";
import { SchoolCarEmissionUtils, SCHOOL_CAR_EMISSION_MODULE_ID } from "./impl/transport/school_car_emission-module";
import { WaterEmissionUtil, WATER_EMISSION_MODULE_ID } from "./impl/water_emission-module";

const emissions: Map<string, EmissionUtils> = new Map([
    [TONER_EMISSION_MODULE_ID, new TonerEmissionUtils()],
    [WATER_EMISSION_MODULE_ID, new WaterEmissionUtil()],
    [SCHOOL_CAR_EMISSION_MODULE_ID, new SchoolCarEmissionUtils()],
    [DINA4_EMISSION_MODULE_ID, new DINA4EmissionUtil()],
    [DINA3_EMISSION_MODULE_ID, new DINA3EmissionUtil()],
    [PIZZA_EMISSION_MODULE_ID, new PizzaEmissionUtil()],
    [DRINKS_500ML_EMISSION_MODULE_ID, new Drinks500mlEmissionUtil()],
    [COFFEE_EMISSION_MODULE_ID, new CoffeeEmissionUtil()],
    [SERVER_EMISSION_MODULE_ID, new ServerEmissionUtil()],
    [PRINTER_EMISSION_MODULE_ID, new PrinterEmissionUtil()],
    [PRINTER_3D_EMISSION_MODULE_ID, new Printer3DEmissionUtil()],
    [PLOTTER_EMISSION_MODULE_ID, new PlotterEmissionUtil()],
    [LAPTOP_EMISSION_MODULE_ID, new LaptopEmissionUtil()],
    [COMPUTER_EMISSION_MODULE_ID, new ComputerEmissionUtil()],
]);

export default class EmissionsManager{
    /*
        Loads an object with unknown type
    */
    static load(data: any): EmissionModule|undefined{
        if(data.type){
            let utils: EmissionUtils|undefined = emissions.get(data.type);
            if(utils){
                return utils.create(data);
            }
        }
        return undefined;
    }
    
    static save(module: EmissionModule): any{
        let utils: EmissionUtils|undefined = emissions.get(module.id);
        if(utils){
            return utils.save(module);
        }
        return undefined;
    }

    
  /**
   * Returns a random EmissionModule with random number (only for testing)
   * 
   * @returns Random EmissionModule
   */
  static randomModule(): EmissionModule{
    const index: number = Math.floor(Math.random() * EmissionsManager.getModuleIDs().length);
    const number: number = Math.floor(Math.random() * 1000);

    const data = {
      type: EmissionsManager.getModuleIDs()[index],
      number: number
    };

    const module = EmissionsManager.load(data);
    if(module == null){
      throw new Error("Module couldn't be loaded");
    }
    return module;
  }

    static getModuleIDs(): string[] {
        return Array.from(emissions.keys());
    }
}