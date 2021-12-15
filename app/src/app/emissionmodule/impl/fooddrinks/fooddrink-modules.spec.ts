import { FactorEmissionModule } from "../../emission-module";
import { CoffeeEmissionModule } from "./coffee_emission-module";
import { Drinks500mlEmissionModule } from "./drinks_500ml_emission-module";
import { PizzaEmissionModule } from "./pizza_emission-module";

describe('coffee_emission-module', () => {
    it("factor should be 0.1", () => {
        let module: FactorEmissionModule = new CoffeeEmissionModule();
        expect(module.factor).toBe(0.1);
    });
    it("emission should be 12000", () => {
        let module: FactorEmissionModule = new CoffeeEmissionModule();
        module.number = 12000;
        expect(module.calculate()).toBe(1200);
    });
});

describe('drinks_500ml_emission-module', () => {
    it("factor should be 0.8", () => {
        let module: FactorEmissionModule = new Drinks500mlEmissionModule();
        expect(module.factor).toBe(0.8);
    });
    it("emission should be 40", () => {
        let module: FactorEmissionModule = new Drinks500mlEmissionModule();
        module.number = 50;
        expect(module.calculate()).toBe(40);
    });
});

describe('pizza_emission-module', () => {
    it("factor should be 1.5", () => {
        let module: FactorEmissionModule = new PizzaEmissionModule();
        expect(module.factor).toBe(1.5);
    });
    it("emission should be 45", () => {
        let module: FactorEmissionModule = new PizzaEmissionModule();
        module.number = 30;
        expect(module.calculate()).toBe(45);
    });
});