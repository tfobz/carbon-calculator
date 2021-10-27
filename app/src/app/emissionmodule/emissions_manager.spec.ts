import EmissionsManager from "./emissions_manager";
import TonerEmissionModule, { TONER_EMISSION_MODULE_ID } from "./impl/toner_emission-module";
import SchoolCarEmissionModule, { SCHOOL_CAR_EMISSION_MODULE_ID } from "./impl/transport/school_car_emission-module";

describe('emissions_module', () => {
    it("should return module as object", () => {
        let expected = {
            type: SCHOOL_CAR_EMISSION_MODULE_ID,
            number: 10
        };
        let module = new SchoolCarEmissionModule();
        module.number = 10;

        let actual = EmissionsManager.save(module);
        expect(actual).toEqual(expected);
    });

    it("should load module from object", () => {
        let expected = new SchoolCarEmissionModule();
        expected.number = 25;

        let actual = EmissionsManager.load({
            type: SCHOOL_CAR_EMISSION_MODULE_ID,
            number: 25
        });
        expect(actual).toEqual(expected);
    });

    it("should load module from type TonerEmissionModule", () => {
        let actual = EmissionsManager.load({ type: TONER_EMISSION_MODULE_ID });
        expect(actual instanceof TonerEmissionModule).toBeTruthy();
    });
});