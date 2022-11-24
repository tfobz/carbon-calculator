import EmissionsManager from "./emissions_manager";
import { AdvancedEmissionModule } from "./modules/advanced-module";
import { FactorEmissionModule } from "./modules/factor-module";

describe('emissions_module', () => {
    it("should create module with type school_car_emission_module", () => {
        const data = {
            type: "school_car_emission_module",
            number: 10
        };

        const expected = new FactorEmissionModule("school_car_emission_module");
        expected.number = 10;
        expected.unit = "km";

        const module = EmissionsManager.load(data);
        expect(module).toEqual(expected);
    });
    it("should create module with type electricity_emission_module", () => {
        const data = {
            type: "electricity_emission_module",
            data: [
                [
                    "WIND_ELECTRICITY_TYPE",
                    26510
                ],
                [
                    "HYDRO_POWER_ELECTRICITY_TYPE",
                    248712
                ]
            ]
        }

        const expected = new AdvancedEmissionModule("electricity_emission_module");
        expected.add({ id: "WIND_ELECTRICITY_TYPE", number: 26510 });
        expected.add({ id: "HYDRO_POWER_ELECTRICITY_TYPE", number: 248712 });
        expected.unit = "kWh";

        const module = EmissionsManager.load(data);
        expect(module).toEqual(expected);
    });
});