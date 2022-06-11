import { FactorManager } from "../factor-manager";
import { AdvancedEmissionModule } from "./advanced-module";

describe("advanced-module", () => {
    let factorManager: FactorManager = new FactorManager();

    beforeAll(() => {
        factorManager.register("brum_bus", 1);
        factorManager.register("brum_auto", 5);
    });
    it("should calculate emission", () => {
        const module: AdvancedEmissionModule = new AdvancedEmissionModule("brum");

        module.add({ id: "bus", number: 5 });

        expect(module.calculate(factorManager)).toBe(5);
    });

    it("should calculate with multiple submodules", () => {
        const module: AdvancedEmissionModule = new AdvancedEmissionModule("brum");
        module.add({ id: "bus", number: 2 });
        module.add({ id: "auto", number: 10 });

        expect(module.calculate(factorManager)).toBe(52);
    })
});