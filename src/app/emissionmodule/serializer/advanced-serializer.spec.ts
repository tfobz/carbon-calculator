import { AdvancedModule } from "../modules/advanced-module";
import { advancedSerializer } from "./advanced-serializer";
describe("advanced-serializer", () => {
    it("should save module", () => {
        const module = new AdvancedModule("test");
        module.add({ id: "WIND_ELECTRICITY_TYPE", number: 26510 })

        const expected = {
            type: "test",
            data: [
                [
                    "WIND_ELECTRICITY_TYPE",
                    26510
                ]
            ]
        };

        const serializer = advancedSerializer;
        expect(serializer.save(module)).toEqual(expected);
    });
    it("should load module", () => {
        const module = {
            type: "test",
            data: [
                [
                    "WIND_ELECTRICITY_TYPE",
                    26510
                ]
            ]
        };

        const expected = new AdvancedModule("test");
        expected.add({ id: "WIND_ELECTRICITY_TYPE", number: 26510 })

        const serializer = advancedSerializer;
        expect(serializer.load(module)).toEqual(expected);
    });
})