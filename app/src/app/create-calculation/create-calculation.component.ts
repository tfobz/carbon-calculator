import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Calculation } from '../emissionmodule/calculation';
import { EmissionModule } from '../emissionmodule/emission-module';
import EmissionsManager from '../emissionmodule/emissions_manager';
import { CoffeeEmissionModule } from '../emissionmodule/impl/fooddrinks/coffee_emission-module';
import { PizzaEmissionModule } from '../emissionmodule/impl/fooddrinks/pizza_emission-module';
import { CalculationService } from '../_services/calculation.service';

interface CalculationData{
  name: string
}

@Component({
  selector: 'app-create-calculation',
  templateUrl: './create-calculation.component.html',
  styleUrls: ['./create-calculation.component.scss']
})
export class CreateCalculationComponent implements OnInit {

  private _createForm!: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _calculationService: CalculationService,
    private _router: Router
    ) { }

  ngOnInit(): void {
    const data: CalculationData = { name: "" };
    
    this._createForm = this._fb.group({
      name: [data.name, [ Validators.required, Validators.minLength(4) ]]
    });
  }

  create(){
    const data: CalculationData = { name: "" };
    Object.assign(data, this._createForm.value);

    this._createForm.reset();

    const calculation = new Calculation(data.name);

    let rand: number = 1 + Math.floor(Math.random() * 10);
    for(let i = 0; i < rand; i++){
      calculation.modules.push(EmissionsManager.randomModule());
    }

    this._calculationService.addCalculation(calculation);
    this._router.navigate(["emission"]);
  }

  get createForm(): FormGroup{
    return this._createForm;
  }

}
