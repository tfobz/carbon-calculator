import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Calculation } from '../emissionmodule/calculation';
import { FactorManager } from '../emissionmodule/factor-manager';
import { FactorProvider, PRESET_FACTORS_LIST } from '../emissionmodule/factor_provider';
import { CalculationService } from '../_services/calculation.service';

/**
 * This is an interface that defines the structure of the data that will be used to
 * create a new calculation.
 */
interface CalculationData{
  /** "name" is a string that will store the name of the calculation. */
  name: string,
  /** "factors" is a string that will store the factors of the calculation. */
  factors: string
}
/**
 * This is an Angular component that is used to create a new emission calculation.
 */
@Component({
  selector: 'app-create-calculation',
  templateUrl: './create-calculation.component.html',
  styleUrls: ['./create-calculation.component.scss']
})
export class CreateCalculationComponent implements OnInit {
  private calculation!: Calculation;
  /**
   * This is a private class property of the "CreateCalculationComponent" class. It's an
   * instance of the "UntypedFormGroup" class. It's used to hold the instance of the form
   * group that is used to create the form fields in the template. The form group is used
   * to manage the form fields and validate the form data.
   * The "!" after the property name means that this property is non-nullable, it has to be
   * assigned a value before it's used.
   * It's used in the ngOnInit method and the create() method.
   */
  private _createForm!: UntypedFormGroup;
  /**
   * The constructor assigns these services to private variables,
   * so that they can be used throughout the component.
   * @param _fb The "UntypedFormBuilder" is used to create a form group that will be used to collect user input.
   * @param _calculationService  The "CalculationService" is used to manage the list of calculations.
   * @param _router The "Router" is used to navigate to different pages in the application.
   */
  constructor(
    private _fb: UntypedFormBuilder,
    private _calculationService: CalculationService,
    private _router: Router
    ) { }

  /**
   *  It creates a form group and sets its initial values and validators. It also sets up any
   *  other necessary state or variables that the component needs when it starts.
   */
  ngOnInit(): void {
    const data: CalculationData = { name: "", factors: PRESET_FACTORS_LIST[0] };

    this._createForm = this._fb.group({
      name: [data.name, [ Validators.required, Validators.minLength(4) ]],
      factors: [ data.factors, Validators.required ]
    });
  }
  /**
   * The create method is called when the user submits the form. It first retrieves data from
   * the form, then resets the form, creates a new calculation with the data and a FactorManager,
   * adds the calculation to the list of calculation, saves the list of calculations, and navigates
   * to the emission page.
   */
  create(){
    const data: CalculationData = { name: "", factors: "" };
    Object.assign(data, this._createForm.value);

    this._createForm.reset();

    const factorManager: FactorManager = FactorProvider.get(data.factors);

    const calculation = new Calculation(data.name,data.factors);
    calculation.factorManager = factorManager;
    this._calculationService.addCalculation(calculation);
    this._calculationService.save();
    this._router.navigate(["emission/"+calculation.id+"/create"]);

  }
  /**
   * The getter method is returning the value of the private property "_createForm"
   * which is an instance of the "UntypedFormGroup"
   */
  get createForm(): UntypedFormGroup{
    return this._createForm;
  }
  /**
   * The getter method is returning the value of the "PRESET_FACTORS_LIST" constant that is
   * imported from the "factor_provider" class.
   */
  get PRESET_FACTORS_LIST(): string[] {
    return PRESET_FACTORS_LIST;
  }

}
