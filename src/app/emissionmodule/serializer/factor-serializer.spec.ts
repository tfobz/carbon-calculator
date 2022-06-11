import { FactorEmissionModule } from "../modules/factor-module";
import { factorSerializer } from "./factor-serializer";

describe("factor-serializer", () => {
    it("should save module", () => {
        const module = new FactorEmissionModule("test");
        module.number = 10;

        const expected = {
            type: "test",
            number: 10
        };

        const serializer = factorSerializer;

        expect(serializer.save(module)).toEqual(expected);
    });
    it("should load module", () => {
        const module = {
            type: "test",
            number: 10
        };

        const expected = new FactorEmissionModule("test");
        expected.number = 10;

        const serializer = factorSerializer;
        expect(serializer.load(module)).toEqual(expected);
    });
})