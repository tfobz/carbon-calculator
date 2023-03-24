import { FactorManager } from "./factor-manager";
/**
 * The interface EmissionModule defines a structure for an emission module,
 * with properties id, unit, number, and a calculate method which takes in a FactorManager
 * object and returns a number.
 */
interface EmissionModule{
  /** ID property of an EmissionModule */
    id: string;
    /** unit of measurment */
    unit: string;
    /** amount of transmission that is calculated */
    number: number;
    /** a function that takes in a FactorManager object as its parameter and returns a number
     *  representing the emissions calculated by the module, based on the factors and emissions
     *  data provided by the FactorManager. */
    calculate(factorManager: FactorManager): number;
}

/**
 * The interface ModuleType defines a structure for a module type with properties id and factor.
 */
export interface ModuleType{
  /** ID of a Module */
    id: string,
    /** faktor of a Module */
    factor: number
}

export { EmissionModule };
