import { FactorManager } from "./factor-manager";

interface EmissionModule{
    id: string;
    unit: string;
    number: number;
    calculate(factorManager: FactorManager): number;   
}

export interface ModuleType{
    id: string,
    factor: number
}

export { EmissionModule };