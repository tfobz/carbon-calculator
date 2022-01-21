import { EmissionModule } from "src/app/emissionmodule/emission-module";
import { MobilityEmissionModule } from "./mobility_emission-module";


describe('mobility_emission_module', () => {
    it("emission should be 0", () => {
        let module: EmissionModule = new MobilityEmissionModule();
        expect(module.calculate()).toBe(0);
    });
    it("emission should be 22", () => {
        let module: MobilityEmissionModule = new MobilityEmissionModule();
        module.addMobilityType("PKW_MOBILITY_TYPE", 100);
        expect(module.calculate()).toBe(22);
    });
    it("emission should be 77", () => {
        let module: MobilityEmissionModule = new MobilityEmissionModule();
        module.addMobilityType("PKW_MOBILITY_TYPE", 100);
        module.addMobilityType("BUS_MOBILITY_TYPE", 1000);
        expect(module.calculate()).toBe(77);
    });
});
