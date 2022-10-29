import { Component, Input, OnInit } from '@angular/core';
import { Calculation } from '../emissionmodule/calculation';
import { EmissionModule } from '../emissionmodule/emission-module';
import { FactorManager } from '../emissionmodule/factor-manager';

/**
 * Defines the interface of the CalculationCardData.
 * Every card has its own number, unit (for example m^3) and a result.
 * The result is the calculated number from all modules in the card
 */
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

/**
 * Defines the CalculationCard component.
 * A Calculation card is the component that holds the amount of CO2 condumed by paper for example
 * It always has a title, an amount and the result, whoch would be the amount of CO2 consumed
 * To see one you need to do the following:
 * 
 * Create a new entry > click on it > click on the plus > add an entry > CalculationCard
 */
export class CalculationCardComponent implements OnInit {

  @Input() edit: boolean = true;

  @Input() factorManager!: FactorManager;
  @Input() module!: EmissionModule;
  
  ngOnInit(): void {}

  /**
   * Is like a toString() method
   * @returns Every variable saved in this class, or unknown if not set
   */
  get data(): CalculationCardData[] {
    return [{ number: this.module?.number as unknown as string, unit: this.module?.unit, result: this.module?.calculate(this.factorManager).toFixed(2) as unknown as string }];
  }
}
