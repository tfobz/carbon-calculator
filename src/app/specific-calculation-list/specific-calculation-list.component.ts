import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Calculation } from '../emissionmodule/calculation';
import { EmissionModule } from '../emissionmodule/emission-module';
import { FactorManager } from '../emissionmodule/factor-manager';
import { AdvancedEmissionModule } from '../emissionmodule/modules/advanced-module';
import { FactorEmissionModule } from '../emissionmodule/modules/factor-module';
import { AdvancedSerializer } from '../emissionmodule/serializer/advanced-serializer';
import { NavigationService } from '../shared/navigation.service';
import { CalculationService } from '../_services/calculation.service';
/**
 * The SpecificCalculationListComponent is used to display a list of emissions calculations
 */
@Component({
  selector: 'app-specific-calculation-list',
  templateUrl: './specific-calculation-list.component.html',
  styleUrls: ['./specific-calculation-list.component.scss']
})

export class SpecificCalculationListComponent implements OnInit {
  /** EmmissionModule */
  private _module!: EmissionModule;
  /** FactorManager */
  private _factorManager!: FactorManager;
  /** ido of calculation */
  private _calculationID!:string;
  /**
   * Constructs a new SpecificCalculationListComponent.
   *
   * @param route The ActivatedRoute for the current route.
   * @param navigation The NavigationService used to set the page title.
   * @param translateService The TranslateService used to translate the page title.
   * @param calculationService The CalculationService used to retrieve the current calculation.
   */
  constructor(private route:ActivatedRoute,private navigation:NavigationService,private translateService: TranslateService, private calculationService:CalculationService){}
  /**
   * Initializes the component by retrieving the current calculation and module, and setting the page title.
   * It also sets up any other necessary state or variables that the component needs when it starts.
   * @returns void
   */
  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      // Translate and set the page title based on the route parameter
      this.translateService.get("modules." + params?.sptitle).subscribe(translation => {
        this.navigation.changeMessage(translation);
      });
      // Get the ID of the current calculation from the route parameter
      this._calculationID = params.id;
      // Retrieve the Calculation object from the CalculationService
      const calculation = this.calculationService.getById(params.id);
      if(calculation == null) return;
      // Set the FactorManager and EmissionModule associated with the current calculation
      this._factorManager = calculation.factorManager;
      let module = calculation.modules.find(module => module.id == params.sptitle);
      if(module) this.module = module;
    })
  }
  /**
   * Returns true if the current module is a FactorEmissionModule, false otherwise.
   */
  get isFactorModule(): boolean{
    return this._module instanceof FactorEmissionModule;
  }
  /**
   * Returns whether the current EmissionModule is a FactorEmissionModule.
   *
   * @returns Whether the current EmissionModule is a FactorEmissionModule.
   */
  get module() : EmissionModule {
    return this._module;
  }
   /**
   * Sets the current EmissionModule.
   *
   * @param module The new EmissionModule to set.
   */
  set module(module:EmissionModule){
    this._module = module;
  }
   /**
   * Returns the FactorManager associated with the current calculation.
   *
   * @returns The FactorManager associated with the current calculation.
   */
  get factorManager(): FactorManager {
    return this._factorManager;
  }
  /**
   * Returns the ID of the current calculation.
   *
   * @returns The ID of the current calculation.
   */
  get calculationId(): string {
    return this._calculationID;
  }
  /**
   * Returns the current EmissionModule, cast as a FactorEmissionModule.
   *
   * @returns The current EmissionModule, cast as a FactorEmissionModule.
   */
  getFactorModule() : FactorEmissionModule {
    return this.module as FactorEmissionModule;
  }
  /**
   * Returns the current EmissionModule instance as an AdvancedEmissionModule, if it is one. Otherwise returns undefined.
   * @returns the current EmissionModule instance as an AdvancedEmissionModule, if it is one. Otherwise returns undefined.
   */
  getTypeModule(): AdvancedEmissionModule | undefined{
    if(this.module instanceof AdvancedEmissionModule) return this.module as AdvancedEmissionModule;
    return undefined;
  }
}
