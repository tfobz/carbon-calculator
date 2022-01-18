import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  constructor(private _fb: FormBuilder) { }

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
  }

  get createForm(): FormGroup{
    return this._createForm;
  }

}
