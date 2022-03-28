import { EmissionModule, FactorEmissionModule } from "./emission-module";

describe('factor-module', () => {
    it('should return 0, because was left unchanged', () => {
        let module: FactorEmissionModule = new FactorEmissionModule("test");
        expect(module.calculate()).toBe(0);
    });
    it('should return 1 * 1 = 1', () => {
        let module: FactorEmissionModule = new FactorEmissionModule("test");
        module.factor = 1;
        module.number = 1;
        expect(module.calculate()).toBe(1);
    });
    
    it('should return 0.5 * 4 = 2', () => {
        let module: FactorEmissionModule = new FactorEmissionModule("test");
        module.factor = 0.5;
        module.number = 4;
        expect(module.calculate()).toBe(2);
    });
    it('should be cast to EmissionModule and return 2', () => {
        let temp_module: FactorEmissionModule = new FactorEmissionModule("test");
        temp_module.factor = 1;
        temp_module.number = 1;
        
        let module: EmissionModule = temp_module;
        expect(module.calculate()).toBe(1);
    });
});