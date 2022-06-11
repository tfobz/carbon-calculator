import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Calculation } from '../emissionmodule/calculation';
import { FactorManager } from '../emissionmodule/factor-manager';
import { FactorProvider, PRESET_FACTORS_LIST } from '../emissionmodule/factor_provider';
import { CalculationService } from '../_services/calculation.service';

interface CalculationData{
  name: string,
  factors: string
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
    const data: CalculationData = { name: "", factors: PRESET_FACTORS_LIST[0] };
    
    this._createForm = this._fb.group({
      name: [data.name, [ Validators.required, Validators.minLength(4) ]],
      factors: [ data.factors, Validators.required ]
    });
  }

  create(){
    const data: CalculationData = { name: "", factors: "" };
    Object.assign(data, this._createForm.value);

    this._createForm.reset();

    const factorManager: FactorManager = FactorProvider.get(data.factors);

    const calculation = new Calculation(data.name);
    calculation.factorManager = factorManager;
    this._calculationService.addCalculation(calculation);
    this._calculationService.save();
    this._router.navigate(["emission"]);
  }

  get createForm(): FormGroup{
    return this._createForm;
  }

  get PRESET_FACTORS_LIST(): string[] {
    return PRESET_FACTORS_LIST;
  }

}
