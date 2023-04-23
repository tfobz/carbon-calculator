import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FactorManager } from 'src/app/emissionmodule/factor-manager';
import { FactorEmissionModule } from 'src/app/emissionmodule/modules/factor-module';
import { MenuService } from 'src/app/shared';
import { CalculationService } from 'src/app/_services/calculation.service';
import { TranslationManagerService } from 'src/app/_services/translation-manager.service';
/**
 * The FactorEmissionModuleComponent is used to display the UI for the Factor Emission Module
 */
@Component({
  selector: 'app-factor-emission-module',
  templateUrl: './factor-emission-module.component.html',
  styleUrls: ['./factor-emission-module.component.scss']
})

export class FactorEmissionModuleComponent implements OnInit {
  /** id of calculation */
  @Input() calculationID!: string;
  /** FactorManager */
  @Input() factorManager!: FactorManager;
  /** FactorEmissionModule */
  @Input() module!: FactorEmissionModule;
  /**
   * Constructs a new FactorEmissionModuleComponent.
   * @param calculationService The CalculationService used to retrieve the current calculation.
   * @param menuService The MenuService used to set the menu.
   * @param translateService The TranslateService used to translate.
   * @param translationManagerService The TranslationManagerService manages the translations.
   * @returns void
   */
  constructor(private calculationService:CalculationService, private menuService: MenuService, private translateService:TranslateService, private translationManagerService:TranslationManagerService) { }
  /**
   * The ngOnInit method is called after the component is initialized. It subscribes to the translation
   * service and gets the translation for the menu label. Then, it adds a delete menu item to the menu using the menuService.changeMenu method.
   */
  ngOnInit(): void {
    this.translateService.getTranslation(this.translationManagerService.lang).subscribe(translations => {
      this.menuService.changeMenu([
        {icon:"delete", menuPointName: this.translationManagerService.getTranslation(translations, "delete"), link:"/emission/"+this.calculationID, onClick: () => this.delete()}]);
    });
  }
  /**
   * The save method saves the current calculation by calling the calculationService.save() method.
   */
  save(){
    this.calculationService.save();
  }
  /**
   * The delete method removes the current module from the current calculation
   */
  delete(){
    this.calculationService.getById(this.calculationID)?.removeModule(this.module);
  }
}
