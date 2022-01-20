import { Injectable } from '@angular/core';
import { Calculation } from '../emissionmodule/calculation';

@Injectable({
  providedIn: 'root'
})
export class CalculationService {

  private _calculations: Calculation[] = [];

  constructor(){

    /*
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
    const calculation: Calculation = Calculation.load(data);

    for(let i = 0; i < 10; i++){
      this._calculations.push(calculation);
    }
    */
  
    this.load();
  }

  get calculations(): Calculation[] {
    return this._calculations;
  }

  addCalculation(calculation: Calculation){
    this._calculations.push(calculation);
    this.save();
  }

  getById(id: string): Calculation | undefined{
    return this._calculations.find(calc => calc.id == id);
  }

	getByName(name: string): Calculation | undefined{
		return this._calculations.find(c => c.name === name);
	}

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

  save(){
    const saveList: any = [];
    this._calculations.forEach((calculation: Calculation) => {
      saveList.push(calculation.save());
    });
    const json = JSON.stringify(saveList);
    localStorage.setItem("calculations", json);
  }

}
