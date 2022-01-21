import { FactorEmissionModule } from "../../emission-module";
import { ComputerEmissionModule } from "./computer_emission-module";
import { LaptopEmissionModule } from "./laptop_emission-module";
import { PlotterEmissionModule } from "./plotter_emission-module";
import { Printer3DEmissionModule } from "./printer_3d_emission-module";
import { PrinterEmissionModule } from "./printer_emission-module";
import { ServerEmissionModule } from "./server_emission-module";

describe('computer_emission-module', () => {
    it("factor should be 102.69", () => {
        let module: FactorEmissionModule = new ComputerEmissionModule();
        expect(module.factor).toBe(102.69);
    });
    it("emission should be 43027.11", () => {
        let module: FactorEmissionModule = new ComputerEmissionModule();
        module.number = 419;
        expect(module.calculate()).toBe(419 * 102.69);
    });
});

describe('laptop_emission-module', () => {
    it("factor should be 320/3", () => {
        let module: FactorEmissionModule = new LaptopEmissionModule();
        expect(module.factor).toBe(320/3);
    });
    it("emission should be 1280", () => {
        let module: FactorEmissionModule = new LaptopEmissionModule();
        module.number = 12;
        expect(module.calculate()).toBe(1280);
    });
});


describe('plotter_emission-module', () => {
    it("factor should be 102.69", () => {
        let module: FactorEmissionModule = new PlotterEmissionModule();
        expect(module.factor).toBe(102.69);
    });
    it("emission should be 102.69", () => {
        let module: FactorEmissionModule = new PlotterEmissionModule();
        module.number = 1;
        expect(module.calculate()).toBe(102.69);
    });
});

describe('printer_3d_emission-module', () => {
    it("factor should be 102.69", () => {
        let module: FactorEmissionModule = new Printer3DEmissionModule();
        expect(module.factor).toBe(102.69);
    });
    it("emission should be 102.69", () => {
        let module: FactorEmissionModule = new Printer3DEmissionModule();
        module.number = 2;
        expect(module.calculate()).toBe(2 * 102.69);
    });
});


describe('printer_emission-module', () => {
    it("factor should be 60", () => {
        let module: FactorEmissionModule = new PrinterEmissionModule();
        expect(module.factor).toBe(60);
    });
    it("emission should be 1020", () => {
        let module: FactorEmissionModule = new PrinterEmissionModule();
        module.number = 17; 
        expect(module.calculate()).toBe(1020);
    });
});

describe('server_emission-module', () => {
    it("factor should be 102.69", () => {
        let module: FactorEmissionModule = new ServerEmissionModule();
        expect(module.factor).toBe(102.69);
    });
    it("emission should be 513.45", () => {
        let module: FactorEmissionModule = new ServerEmissionModule();
        module.number = 5;
        expect(module.calculate()).toBe(513.45);
    });
});
