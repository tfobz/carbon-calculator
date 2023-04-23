import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ModuleType } from '../emissionmodule/emission-module';
import { FactorManager } from '../emissionmodule/factor-manager';
import { AdvancedEmissionModule, AdvancedSubModule, ELECTRICITY_MODULE_ID, MOBILITY_MODULE_ID } from '../emissionmodule/modules/advanced-module';
import { MenuService } from '../shared';
import { NavigationService } from '../shared/navigation.service';
import { CalculationService } from '../_services/calculation.service';
import { TranslationManagerService } from '../_services/translation-manager.service';
/**
 * This is an Angular component that displays one SubModule of the AdvancedEmissionModule.
*/
@Component({
  selector: 'app-type-input',
  templateUrl: './type-input.component.html',
  styleUrls: ['./type-input.component.scss']
})
export class TypeInputComponent implements OnInit {
  /**
   *  A private property that holds an instance of the FactorManager class, which manages the factors for the calculation
   */
  private _factorManager: FactorManager = new FactorManager();
  /**
   * instance of the AdvancedEmissionModule
  */
  module!: AdvancedEmissionModule;
  /**
   * instance of the AdvancedSubModule
   */
  type !: AdvancedSubModule;
  /**
   * Constructs a new TypeInputComponent.
   * @param route The ActivatedRoute for the current route.
   * @param navigation The NavigationService used to set the page title.
   * @param calculationService The CalculationService used to retrieve the current calculation.
   * @param menuService The MenuService used to set the menu.
   * @param translateService The TranslateService used to translate.
   * @param translationManagerService The TranslationManagerService manages the translations.
   */
  constructor(private route:ActivatedRoute,private navigation:NavigationService, private calculationService:CalculationService, private menuService: MenuService, private translateService:TranslateService, private translationManagerService:TranslationManagerService) { }
  /**
   * This method is called when the component is initialized.
   *  It subscribes to the ActivatedRoute to read the URL parameters, sets the page header with the NavigationService, updates the navigation
   * menu with the MenuService, and retrieves the calculation data from the CalculationService.
   * It then initializes the module and type properties based on the URL parameters.
   */
  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      this.translateService.get("types." + params?.typeID).subscribe(translation => {
        this.navigation.changeMessage(translation);
      });

      this.translateService.getTranslation(this.translationManagerService.lang).subscribe(translations => {
        this.menuService.changeMenu([
          {icon:"delete", menuPointName: this.translationManagerService.getTranslation(translations, "delete"), link:"/emission/" + params.id + "/" + module?.id, onClick: () => this.delete()}]);
      });

      const calculation = this.calculationService.getById(params.id);
      if(calculation == null) return;
      this._factorManager = calculation.factorManager;
      let module = calculation?.modules.find(module => module.id == params.sptitle) as AdvancedEmissionModule;
      if(module){
        if(module.id == MOBILITY_MODULE_ID) {
          this.module = module as AdvancedEmissionModule;
          let type = module.getType(params.typeID);
          if(type) this.type = type;
        }else if(module.id == ELECTRICITY_MODULE_ID){
          this.module = module as AdvancedEmissionModule;
          let type = module.getType(params.typeID);
          if(type) this.type = type;
        }
      }
    })
  }
  /**
   * It updates the AdvancedSubModule value with the new number value and saves the calculation data to the CalculationService.
   */
  save(){
    this.module.changeTypeValue(this.type.id, this.type.number);
    this.calculationService.save();
  }
  /**
   * It removes the AdvancedSubModule from the AdvancedEmissionModule
   */
  delete(){
    this.module.removeType(this.type.id);
  }
  /**
   *  A getter method that returns the _factorManager
   */
  get factorManager(): FactorManager{
    return this._factorManager;
  }

}
