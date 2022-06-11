import { FactorManager } from "./factor-manager";

describe('factor-manager', () => {
    it("should register a factor", () => {
        const manager: FactorManager = new FactorManager();
        manager.register("test", 5);
        expect(manager.factors.get("test")).toBe(5)
    })
    it("should get a factor", () => {
        const manager: FactorManager = new FactorManager();
        manager.factors.set("test", 1);

        expect(manager.get("test")).toBe(1);
        expect(manager.get("asd")).toBe(0);
    });
});