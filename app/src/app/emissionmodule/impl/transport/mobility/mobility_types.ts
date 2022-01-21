import { ModuleType } from "src/app/emissionmodule/emission-module";


const PKW_MOBILITY_TYPE_ID: string = "PKW_MOBILITY_TYPE";
const BUS_MOBILITY_TYPE_ID: string = "BUS_MOBILITY_TYPE";
const TRAIN_MOBILITY_TYPE_ID: string = "TRAIN_MOBILITY_TYPE";
const CITY_BUS_MOBILITY_TYPE_ID: string = "CITY_BUS_MOBILITY_TYPE";

export class MobilityTypeFactory{
    static create(id: string): ModuleType{
        switch(id){
            case PKW_MOBILITY_TYPE_ID: return new PkwMobilityType();
            case BUS_MOBILITY_TYPE_ID: return new BusMobilityType();
            case TRAIN_MOBILITY_TYPE_ID: return new TrainMobilityType();
            case CITY_BUS_MOBILITY_TYPE_ID: return new CityBusMobilityType();
            default: throw new Error("MobilityType doesn't exist");
        }
    }
    static getAllIDs(): string[]{
        return [
            PKW_MOBILITY_TYPE_ID,
            BUS_MOBILITY_TYPE_ID,
            TRAIN_MOBILITY_TYPE_ID,
            CITY_BUS_MOBILITY_TYPE_ID
        ];
    }
}

class PkwMobilityType implements ModuleType{
    id: string = PKW_MOBILITY_TYPE_ID;
    factor: number = 0.22;
}


class BusMobilityType implements ModuleType{
    id: string = BUS_MOBILITY_TYPE_ID;
    factor: number = 0.055;
}


class TrainMobilityType implements ModuleType{
    id: string = TRAIN_MOBILITY_TYPE_ID;
    factor: number = 0.008;
}


class CityBusMobilityType implements ModuleType{
    id: string = CITY_BUS_MOBILITY_TYPE_ID;
    factor: number = 0.037;
}