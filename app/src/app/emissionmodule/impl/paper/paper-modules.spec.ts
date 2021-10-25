import { FactorEmissionModule } from "../../emission-module";
import DINA4EmissionModule from "./DINA4_emission-module";
import DINA3EmissionModule from "./DINA3_emission-module";


describe('DINA4_emission-module', () => {
    it("factor should be 0.0044", () => {
        let module: FactorEmissionModule = new DINA4EmissionModule();
        expect(module.factor).toBe(0.0044);
    });
    it("emission should be 44", () => {
        let module: FactorEmissionModule = new DINA4EmissionModule();
        module.number = 10000;
        expect(module.calculate()).toBe(44);
    });
});

describe('DINA3_emission-module', () => {
    it("factor should be 0.0088", () => {
        let module: FactorEmissionModule = new DINA3EmissionModule();
        expect(module.factor).toBe(0.0088);
    });
    it("emission should be 88", () => {
        let module: FactorEmissionModule = new DINA3EmissionModule();
        module.number = 10000;
        expect(module.calculate()).toBe(88);
    });
});