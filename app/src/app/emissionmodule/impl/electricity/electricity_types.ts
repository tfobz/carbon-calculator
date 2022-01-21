import { ModuleType } from "../../emission-module";


const WIND_ELECTRICITY_TYPE_ID: string = "WIND_ELECTRICITY_TYPE";
const HYDRO_POWER_ELECTRICITY_TYPE_ID: string = "HYDRO_POWER_ELECTRICITY_TYPE";
const NATURAL_GAS_ELECTRICITY_TYPE_ID: string = "NATURAL_GAS_ELECTRICITY_TYPE";
const OIL_ELECTRICITY_TYPE_ID: string = "OIL_ELECTRICITY_TYPE";
const COAL_ELECTRICITY_TYPE_ID: string = "COAL_ELECTRICITY_TYPE";

export class ElectricityTypeFactory{
    static create(id: string): ModuleType{
        switch(id){
            case WIND_ELECTRICITY_TYPE_ID: return new WindElectricityType();
            case HYDRO_POWER_ELECTRICITY_TYPE_ID: return new HydroPowerElectricityType();
            case NATURAL_GAS_ELECTRICITY_TYPE_ID: return new NaturalGasElectricityType();
            case OIL_ELECTRICITY_TYPE_ID: return new OilElectricityType();
            case COAL_ELECTRICITY_TYPE_ID: return new CoalElectricityType();
            default: throw new Error("ElectricityType doesn't exist");
        }
    }
    static getAllIDs(): string[]{
        return [
            WIND_ELECTRICITY_TYPE_ID,
            HYDRO_POWER_ELECTRICITY_TYPE_ID,
            NATURAL_GAS_ELECTRICITY_TYPE_ID,
            OIL_ELECTRICITY_TYPE_ID,
            COAL_ELECTRICITY_TYPE_ID
        ];
    }
}

class WindElectricityType implements ModuleType{
    id: string = WIND_ELECTRICITY_TYPE_ID;
    factor: number = 0.02;
}

class HydroPowerElectricityType implements ModuleType{
    id: string = HYDRO_POWER_ELECTRICITY_TYPE_ID;
    factor: number = 0.02;
}

class NaturalGasElectricityType implements ModuleType{
    id: string = NATURAL_GAS_ELECTRICITY_TYPE_ID;
    factor: number = 0.33;
}

class OilElectricityType implements ModuleType{
    id: string = OIL_ELECTRICITY_TYPE_ID;
    factor: number = 0.65;
}

class CoalElectricityType implements ModuleType{
    id: string = COAL_ELECTRICITY_TYPE_ID;
    factor: number = 0.85;
}