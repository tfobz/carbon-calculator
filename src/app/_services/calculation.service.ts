import { Injectable } from '@angular/core';
import { Calculation } from '../emissionmodule/calculation';

/**
 * It is responsible for managing the calculations in the application
 */
@Injectable({
  providedIn: 'root'
})
export class CalculationService {
  /**
   * An array of Calculation objects, which is the list of all calculations created in the application.
   */
  private _calculations: Calculation[] = [];
  /**
   * loads the _calculations array from local storage when the service is instantiated.
   */
  constructor(){
    this.load();
  }
  /**
   * A getter that returns the _calculations array.
   */
  get calculations(): Calculation[] {
    return this._calculations;
  }
  /**
   * A method that adds a new Calculation object to the _calculations array.
   * @param calculation
   */
  addCalculation(calculation: Calculation){
    this._calculations.push(calculation);
    this.save();
  }

  /**
   * A method that removes a Calculation object from the _calculations array.
   * @param calculation
   */
  removeCalculation(calculation: Calculation){
    const index: number = this._calculations.indexOf(calculation);
    if(index === -1) return;
    this._calculations.splice(index, 1);
  }
  /**
   * A method that returns a Calculation object from the _calculations array based on its id
   * @param id id of calculation
   * @returns Calculation
   */
  getById(id: string): Calculation | undefined{
    return this._calculations.find(calc => calc.id == id);
  }
  /**
   * A method that returns a Calculation object from the _calculations array based on its name
   * @param name name of calculation
   * @returns Calculation
   */
	getByName(name: string): Calculation{
		let calculation = this._calculations.find(c => c.name === name);
    if(calculation === undefined){
        throw new Error("Calculation not found");
    }
    return calculation;
	}
  /**
   * A method that loads the _calculations array from the local storage and assigns it to
   * the _calculations array.
   */
  load(){
    const calculations: string | null = localStorage.getItem("calculations");
    if(!calculations) return;

    const calculationsData = JSON.parse(calculations);
    if(!calculationsData) return;
    if(!(calculationsData instanceof Array)) return;

    const temp: Calculation[] = [];
    calculationsData.forEach((data: any) => {
      temp.push(Calculation.load(data));
    });
    this._calculations = temp;
  }
  /**
   * A method that saves the _calculations array to the local storage.
   */
  save(){
    const saveList: any = [];
    this._calculations.forEach((calculation: Calculation) => {
      saveList.push(calculation.save());
    });
    const json = JSON.stringify(saveList);
    localStorage.setItem("calculations", json);
  }

}
