import EmissionsManager from "./emissions_manager";
import { ComputerEmissionModule, COMPUTER_EMISSION_MODULE_ID } from "./impl/devices/computer_emission-module";
import { LaptopEmissionModule, LAPTOP_EMISSION_MODULE_ID } from "./impl/devices/laptop_emission-module";
import { PlotterEmissionModule, PLOTTER_EMISSION_MODULE_ID } from "./impl/devices/plotter_emission-module";
import { Printer3DEmissionModule, PRINTER_3D_EMISSION_MODULE_ID } from "./impl/devices/printer_3d_emission-module";
import { PrinterEmissionModule, PRINTER_EMISSION_MODULE_ID } from "./impl/devices/printer_emission-module";
import { ServerEmissionModule, SERVER_EMISSION_MODULE_ID } from "./impl/devices/server_emission-module";
import { ElectricityEmissionModule, ELECTRICITY_EMISSION_MODULE_ID } from "./impl/electricity/electricity_emission-module";
import { CoffeeEmissionModule, COFFEE_EMISSION_MODULE_ID } from "./impl/fooddrinks/coffee_emission-module";
import { Drinks500mlEmissionModule, DRINKS_500ML_EMISSION_MODULE_ID } from "./impl/fooddrinks/drinks_500ml_emission-module";
import { PizzaEmissionModule, PIZZA_EMISSION_MODULE_ID } from "./impl/fooddrinks/pizza_emission-module";
import { HeatingEmissionModule, HEATING_EMISSION_MODULE_ID } from "./impl/heating/heating_emission-module";
import { DINA3EmissionModule, DINA3_EMISSION_MODULE_ID } from "./impl/paper/DINA3_emission-module";
import { DINA4EmissionModule, DINA4_EMISSION_MODULE_ID } from "./impl/paper/DINA4_emission-module";
import { TonerEmissionModule, TONER_EMISSION_MODULE_ID } from "./impl/toner_emission-module";
import { MobilityEmissionModule, MOBILITY_EMISSION_MODULE_ID } from "./impl/transport/mobility/mobility_emission-module";
import { SchoolCarEmissionModule, SCHOOL_CAR_EMISSION_MODULE_ID } from "./impl/transport/school_car_emission-module";
import { WaterEmissionModule, WATER_EMISSION_MODULE_ID } from "./impl/water_emission-module";

describe('emissions_module', () => {
    it("should return module as object", () => {
        let expected = {
            type: SCHOOL_CAR_EMISSION_MODULE_ID,
            number: 10
        };
        let module = new SchoolCarEmissionModule();
        module.number = 10;

        let actual = EmissionsManager.save(module);
        expect(actual).toEqual(expected);
    });

    it("should save electricity module to object", () => {
        let expected = {
            type: ELECTRICITY_EMISSION_MODULE_ID,
            data: [
                [ "WIND_ELECTRICITY_TYPE", 10 ]
            ]
        };

        let module = new ElectricityEmissionModule();
        module.addElectricityType("WIND_ELECTRICITY_TYPE", 10);

        expect(EmissionsManager.save(module)).toEqual(expected);
    });

    it("should save mobility module to object", () => {
        let expected = {
            type: MOBILITY_EMISSION_MODULE_ID,
            data: [
                [ "PKW_MOBILITY_TYPE", 10 ]
            ]
        };

        let module = new MobilityEmissionModule();
        module.addMobilityType("PKW_MOBILITY_TYPE", 10);

        expect(EmissionsManager.save(module)).toEqual(expected);
    });

    it("should load module from object", () => {
        let expected = new SchoolCarEmissionModule();
        expected.number = 25;

        let actual = EmissionsManager.load({
            type: SCHOOL_CAR_EMISSION_MODULE_ID,
            number: 25
        });
        expect(actual).toEqual(expected);
    });

    it("should load module from type ElectricityEmissionModule", () => {
        const actual = EmissionsManager.load({ type: ELECTRICITY_EMISSION_MODULE_ID });
        expect(actual instanceof ElectricityEmissionModule).toBeTruthy();
    });

    it("should load module from type MobilityEmissionModule", () => {
        const actual = EmissionsManager.load({ type: MOBILITY_EMISSION_MODULE_ID });
        expect(actual instanceof MobilityEmissionModule).toBeTruthy();
    });

    it("should load module from type TonerEmissionModule", () => {
        let actual = EmissionsManager.load({ type: TONER_EMISSION_MODULE_ID });
        expect(actual instanceof TonerEmissionModule).toBeTruthy();
    });
    it("should load module from type WaterEmissionModule", () => {
        let actual = EmissionsManager.load({ type: WATER_EMISSION_MODULE_ID });
        expect(actual instanceof WaterEmissionModule).toBeTruthy();
    });
    it("should load module from type SchoolCarEmissionModule", () => {
        let actual = EmissionsManager.load({ type: SCHOOL_CAR_EMISSION_MODULE_ID });
        expect(actual instanceof SchoolCarEmissionModule).toBeTruthy();
    });
    it("should load module from type DINA4EmissionModule", () => {
        let actual = EmissionsManager.load({ type: DINA4_EMISSION_MODULE_ID });
        expect(actual instanceof DINA4EmissionModule).toBeTruthy();
    });
    it("should load module from type DINA3EmissionModule", () => {
        let actual = EmissionsManager.load({ type: DINA3_EMISSION_MODULE_ID });
        expect(actual instanceof DINA3EmissionModule).toBeTruthy();
    });
    it("should load module from type PizzaEmissionModule", () => {
        let actual = EmissionsManager.load({ type: PIZZA_EMISSION_MODULE_ID });
        expect(actual instanceof PizzaEmissionModule).toBeTruthy();
    });
    it("should load module from type Drinks500mlEmissionModule", () => {
        let actual = EmissionsManager.load({ type: DRINKS_500ML_EMISSION_MODULE_ID });
        expect(actual instanceof Drinks500mlEmissionModule).toBeTruthy();
    });
    it("should load module from type CoffeeEmissionModule", () => {
        let actual = EmissionsManager.load({ type: COFFEE_EMISSION_MODULE_ID });
        expect(actual instanceof CoffeeEmissionModule).toBeTruthy();
    });
    it("should load module from type ServerEmissionModule", () => {
        let actual = EmissionsManager.load({ type: SERVER_EMISSION_MODULE_ID });
        expect(actual instanceof ServerEmissionModule).toBeTruthy();
    });
    it("should load module from type PrinterEmissionModule", () => {
        let actual = EmissionsManager.load({ type: PRINTER_EMISSION_MODULE_ID });
        expect(actual instanceof PrinterEmissionModule).toBeTruthy();
    });
    it("should load module from type Printer3DEmissionModule", () => {
        let actual = EmissionsManager.load({ type: PRINTER_3D_EMISSION_MODULE_ID });
        expect(actual instanceof Printer3DEmissionModule).toBeTruthy();
    });
    it("should load module from type PlotterEmissionModule", () => {
        let actual = EmissionsManager.load({ type: PLOTTER_EMISSION_MODULE_ID });
        expect(actual instanceof PlotterEmissionModule).toBeTruthy();
    });
    it("should load module from type LaptopEmissionModule", () => {
        let actual = EmissionsManager.load({ type: LAPTOP_EMISSION_MODULE_ID});
        expect(actual instanceof LaptopEmissionModule).toBeTruthy();
    });
    it("should load module from type ComputerEmissionModule", () => {
        let actual = EmissionsManager.load({ type: COMPUTER_EMISSION_MODULE_ID });
        expect(actual instanceof ComputerEmissionModule).toBeTruthy();
    });
    it("should load module from type HeatingEmissionModule", () => {
        let actual = EmissionsManager.load({ type: HEATING_EMISSION_MODULE_ID });
        expect(actual instanceof HeatingEmissionModule).toBeTruthy();
    });
});