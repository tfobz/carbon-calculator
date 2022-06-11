import { FactorManager } from "../factor-manager";
import { FactorEmissionModule } from "./factor-module";

describe('factor-module', () => {
    let factorManager: FactorManager = new FactorManager();

    beforeAll(() => {
        factorManager.register("test", 5);
    });
    it('should return 0, because was left unchanged', () => {
        let module: FactorEmissionModule = new FactorEmissionModule("test");
        expect(module.calculate(factorManager)).toBe(0);
    });
    it('should return 1 * 5 = 5', () => {
        let module: FactorEmissionModule = new FactorEmissionModule("test");
        module.number = 1;
        expect(module.calculate(factorManager)).toBe(5);
    });

    it("should not find factor", () => {
        let module: FactorEmissionModule = new FactorEmissionModule("asd");
        module.number = 1;
        expect(module.calculate(factorManager)).toBe(0);
    });
});