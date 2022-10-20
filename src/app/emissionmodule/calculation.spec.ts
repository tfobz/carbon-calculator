import { Calculation } from "./calculation";
import { FactorEmissionModule } from "./modules/factor-module";

describe('calculation', () => {
    it('should return 0 there are no modules', () => {
        const calc: Calculation = new Calculation("Test");
        expect(calc.calculate() == 0).toBeTruthy();
    });

    it("should load calculation", ()=> {
        const expected: Calculation = new Calculation("test");
        expected.factorManager.register("school_car_emission_module", 10);
        const module = new FactorEmissionModule("school_car_emission_module");
        module.number = 1555;
        module.unit = "km";
        expected.modules.push(module);

        let data = {
            id: expected.id,
            name: "test",
            modules: [
              {
                type: "school_car_emission_module",
                number: 1555
              }
            ],
            factors: [
                [ "school_car_emission_module", 10 ]
            ]
        }

        const calc = Calculation.load(data);
        expect(calc).toEqual(expected);
    });

    it("should save calculation", ()=> {
        const calculation: Calculation = new Calculation("test");
        const expected = {
            id: calculation.id,
            name: calculation.name,
            modules: [
                {
                    type: "school_car_emission_module",
                    number: 1555
                }
            ],
            factors: [
                [ "school_car_emission_module", 10 ]
            ]
        }

        const module = new FactorEmissionModule("school_car_emission_module");
        module.number = 1555;

        calculation.modules.push(module);
        calculation.factorManager.register("school_car_emission_module", 10);

        const actual = calculation.save();
        expect(actual).toEqual(expected);
    }); 
});