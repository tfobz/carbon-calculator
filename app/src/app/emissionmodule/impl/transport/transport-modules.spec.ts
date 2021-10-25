import { FactorEmissionModule } from "../../emission-module";
import SchoolCarEmissionModule from "./school_car_emission-module";

describe('school_car_emission-module', () => {
    it("factor should be 0.31", () => {
        let module: FactorEmissionModule = new SchoolCarEmissionModule();
        expect(module.factor).toBe(0.31);
    });
    it("emission should be 648.83", () => {
        let module: FactorEmissionModule = new SchoolCarEmissionModule();
        module.number = 2093;
        expect(module.calculate()).toBe(648.83);
    });
});
