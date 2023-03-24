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
  /** number of CalculationCard */
  number: string,
  /** unit of CalculationCard @example m^3*/
  unit: string,
  /** result is the calculated number from all modules in the card */
  result: string
}
/**
 * A Calculation card is the component that holds the amount of CO2 condumed by paper for example
 * It always has a title, an amount and the result, whoch would be the amount of CO2 consumed
 * To see one you need to do the following:
 */
@Component({
  selector: 'app-calculation-card',
  templateUrl: './calculation-card.component.html',
  styleUrls: ['./calculation-card.component.scss']
})


export class CalculationCardComponent implements OnInit {
  /**
   * is a property of the component that is passed in from its parent component.
   * It determines whether the card can be edited or not.
   */
  @Input() edit: boolean = true;
  /**
   * is also a property that is passed in from the parent component. It is an instance of the
   * FactorManager class, which is responsible for managing the factors used in the calculation
   * of emissions.
   */
  @Input() factorManager!: FactorManager;
  /**
   * is another property that is passed in from the parent component. It is an instance of the
   * EmissionModule class, which is responsible for calculating the emissions for a specific module.
   */
  @Input() module!: EmissionModule;
  /**
   * @ignore
  */
  ngOnInit(): void {}

  /**
   * Is like a toString() method
   * @returns Every variable saved in this class, or unknown if not set
   */
  get data(): CalculationCardData[] {
    return [{ number: this.module?.number as unknown as string, unit: this.module?.unit, result: this.module?.calculate(this.factorManager).toFixed(2) as unknown as string }];
  }
}
