import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ModuleType } from 'src/app/emissionmodule/emission-module';
import { FactorManager } from 'src/app/emissionmodule/factor-manager';
import { AdvancedEmissionModule, AdvancedSubModule } from 'src/app/emissionmodule/modules/advanced-module';
import { MenuService } from 'src/app/shared';
import { CalculationService } from 'src/app/_services/calculation.service';
import { TranslationManagerService } from 'src/app/_services/translation-manager.service';
/**
 * It displays a list of all SubModules in use of the AdvancedEmissionModule.
 */
@Component({
  selector: 'app-type-emission-module',
  templateUrl: './type-emission-module.component.html',
  styleUrls: ['./type-emission-module.component.scss']
})
export class TypeEmissionModuleComponent implements OnInit {
  /**
   *  A FactorManager object that stores factors used in emission calculations.
   * This property is marked with the @Input decorator, which means that it receives its value from a parent component.
   */
  @Input() factorManager!: FactorManager;
  /**
   * A ModuleType object that stores the type of the module.
   * This property is marked with the @Input decorator, which means that it receives its value from a parent component.
   */
  @Input() module!: AdvancedEmissionModule | undefined;
  /**
   * id of calculation
   * This property is marked with the @Input decorator, which means that it receives its value from a parent component.
   */
  @Input() calculationID!: string;
  /**
   *  The currentUrl property stores the current url.
   */
  public currentUrl!:string;
  /** array of submodules in current module*/
  submodules!: AdvancedSubModule[];
  /**
   * Constructs a new TypeEmissionModuleComponent.
   * @param route   ActivatedRoute is used to get the current url.
   * @param calculationService CalculationService is used to get the calculation by id.
   * @param menuService MenuService is used to change the menu.
   * @param translateService TranslateService is used to translate.
   * @param translationManagerService TranslationManagerService is used to manage the translateService.
   */
  constructor(private route:ActivatedRoute,private calculationService:CalculationService, private menuService: MenuService, private translateService:TranslateService, private translationManagerService:TranslationManagerService) { }
  /**
   *  It initializes the currentUrl property with the correct value and subscribes to changes
   * in the route parameters to update it accordingly. It also sets the submodules property to
   * the correct value using the getData() method, and sets up the component's menu using the menuService and translationManagerService.
   */
  ngOnInit(): void {
    this.translateService.getTranslation(this.translationManagerService.lang).subscribe(translations => {
      this.menuService.changeMenu([
        {icon:"delete", menuPointName: this.translationManagerService.getTranslation(translations, "delete"), link:"/emission/"+this.calculationID, onClick: () => this.delete()}]);
    });
    this.route.params.subscribe(params=>{
      this.currentUrl="/emission/" + params.id +"/"+params.sptitle;
    });
    this.submodules = this.getData() || [];
  }
  /**
   *  A method that returns the list of submodules of the current module if it exists, or undefined if it does not.
   * This method is used to initialize the submodules property.
   * @returns AdvancedSubModule[] | undefined
   */
  getData(): AdvancedSubModule[] | undefined{
    return this.module?.list;
  }
  /**
   * A method that removes the current module from the calculation and logs a message to the console.
   */
  delete(){
    if(this.module) this.calculationService.getById(this.calculationID)?.removeModule(this.module);
    console.log("delete");
  }
}
