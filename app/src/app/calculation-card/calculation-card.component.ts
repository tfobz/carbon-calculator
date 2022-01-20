import { Component, Input, OnInit } from '@angular/core';
import { EmissionModule, FactorEmissionModule } from '../emissionmodule/emission-module';
import { MobilityEmissionModule } from '../emissionmodule/impl/transport/mobility/mobility_emission-module';
import { CalculationService } from '../_services/calculation.service';

interface CalculationCardData{
  number: string,
  result: string
}

@Component({
  selector: 'app-calculation-card',
  templateUrl: './calculation-card.component.html',
  styleUrls: ['./calculation-card.component.scss']
})
export class CalculationCardComponent implements OnInit {

  @Input() module!: EmissionModule;
  
  ngOnInit(): void {}

  get data(): CalculationCardData[] {

    let number: number = 0;
    
    if(this.module instanceof FactorEmissionModule){
      number = (this.module as FactorEmissionModule).number;
    }else{
      number = (this.module as MobilityEmissionModule).calculate();
    }

    return [{ number: number as unknown as string, result: this.module?.calculate() as unknown as string }];
  }
}
