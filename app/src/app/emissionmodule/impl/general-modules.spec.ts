import { FactorEmissionModule } from "../emission-module";
import { TonerEmissionModule } from "./toner_emission-module";
import { WaterEmissionModule } from "./water_emission-module";

describe('water_emission-module', () => {
    it("factor should be 0.4", () => {
        let module: FactorEmissionModule = new WaterEmissionModule();
        expect(module.factor).toBe(0.4);
    });
    it("emission should be 12352 * 0.4", () => {
        let module: FactorEmissionModule = new WaterEmissionModule();
        module.number = 12352;
        expect(module.calculate()).toBe(12352 * 0.4);
    });
});

describe('toner_emission-module', () => {
    it("factor should be 5", () => {
        let module: FactorEmissionModule = new TonerEmissionModule();
        expect(module.factor).toBe(5);
    });
    it("emission should be 45", () => {
        let module: FactorEmissionModule = new TonerEmissionModule();
        module.number = 9;
        expect(module.calculate()).toBe(45);
    });
});
