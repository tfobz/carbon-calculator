import { Component, Input, OnInit } from '@angular/core';
import { Calculation } from '../emissionmodule/calculation';
import { EmissionModule } from '../emissionmodule/emission-module';
import { FactorManager } from '../emissionmodule/factor-manager';

interface CalculationCardData{
  number: string,
  unit: string,
  result: string
}

@Component({
  selector: 'app-calculation-card',
  templateUrl: './calculation-card.component.html',
  styleUrls: ['./calculation-card.component.scss']
})
export class CalculationCardComponent implements OnInit {

  @Input() edit: boolean = true;

  @Input() factorManager!: FactorManager;
  @Input() module!: EmissionModule;
  
  ngOnInit(): void {}

  get data(): CalculationCardData[] {
    return [{ number: this.module?.number as unknown as string, unit: this.module?.unit, result: this.module?.calculate(this.factorManager).toFixed(2) as unknown as string }];
  }
}
