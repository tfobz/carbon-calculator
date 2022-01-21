import { Calculation } from "./calculation";
import { FactorEmissionModule } from "./emission-module";
import { PizzaEmissionModule } from "./impl/fooddrinks/pizza_emission-module";
import { TonerEmissionModule } from "./impl/toner_emission-module";
import { WaterEmissionModule } from "./impl/water_emission-module";

describe('calculation', () => {
    it('should return 0 there are no modules', () => {
        const calc: Calculation = new Calculation("Test");
        expect(calc.calculate() == 0).toBeTruthy();
    });
    it('should return 400 from calculation', () => {
        const calc: Calculation = new Calculation("Test");
        
        // 150
        const module1: FactorEmissionModule = new PizzaEmissionModule();
        module1.number = 100;

        // 250
        const module2: FactorEmissionModule = new TonerEmissionModule();
        module2.number = 50;
        
        calc.modules.push(module1);
        calc.modules.push(module2);

        expect(calc.calculate() === 400).toBeTruthy();
    });
    it('check save for calculation without modules', () => {
        const calc: Calculation = new Calculation("Test");
        
        const expected = {
            name: "Test",
            modules: []
        };

        expect(JSON.stringify(calc.save()) === JSON.stringify(expected)).toBeTruthy();
    });
    it('check save for calculation with two modules', () => {
        const calc: Calculation = new Calculation("Test");

        let pizzaModule: FactorEmissionModule = new PizzaEmissionModule();
        pizzaModule.number = 500;

        let waterModule: FactorEmissionModule = new WaterEmissionModule();
        waterModule.number = 100;

        calc.modules.push(pizzaModule);
        calc.modules.push(waterModule);

        const expected = {
            name: "Test",
            modules: [
                {
                    type: "pizza_emission_module",
                    number: 500
                },
                {
                    type: "water_emission_module",
                    number: 100
                }
            ]
        };

        expect(JSON.stringify(calc.save()) === JSON.stringify(expected)).toBeTruthy();
    });
    it('check if calculation loads correctly', () => {
        const expected: Calculation = new Calculation("Test");

        const pizzaModule: FactorEmissionModule = new PizzaEmissionModule();
        pizzaModule.number = 500;

        const waterModule: FactorEmissionModule = new WaterEmissionModule();
        waterModule.number = 100;

        expected.modules.push(pizzaModule);
        expected.modules.push(waterModule);

        const data = {
            name: "Test",
            modules: [
                {
                    type: "pizza_emission_module",
                    number: 500
                },
                {
                    type: "water_emission_module",
                    number: 100
                }
            ]
        };
        const actual: Calculation = Calculation.load(data);
        expect(JSON.stringify(expected) === JSON.stringify(actual)).toBeTruthy();
    });
});