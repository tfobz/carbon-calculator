import { EmissionModule } from "../../emission-module";
import { ElectricityEmissionModule, ElectricityEmissionUtils } from "./electricity_emission-module";

describe('electricity_emission_module', () => {
    it("emission should be 0", () => {
        let module: EmissionModule = new ElectricityEmissionModule();
        expect(module.calculate()).toBe(0);
    });
    it("emission should be 85", () => {
        let module: ElectricityEmissionModule = new ElectricityEmissionModule();
        module.addElectricityType("COAL_ELECTRICITY_TYPE", 100);
        expect(module.calculate()).toBe(85);
    });
    it("emission should be 415", () => {
        let module: ElectricityEmissionModule = new ElectricityEmissionModule();
        module.addElectricityType("COAL_ELECTRICITY_TYPE", 100);
        module.addElectricityType("NATURAL_GAS_ELECTRICITY_TYPE", 1000);
        expect(module.calculate()).toBe(415);
    });
});
