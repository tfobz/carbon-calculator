import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FactorManager } from 'src/app/emissionmodule/factor-manager';
import { FactorEmissionModule } from 'src/app/emissionmodule/modules/factor-module';
import { MenuService } from 'src/app/shared';
import { CalculationService } from 'src/app/_services/calculation.service';
import { TranslationManagerService } from 'src/app/_services/translation-manager.service';

@Component({
  selector: 'app-factor-emission-module',
  templateUrl: './factor-emission-module.component.html',
  styleUrls: ['./factor-emission-module.component.scss']
})
export class FactorEmissionModuleComponent implements OnInit {

  @Input() calculationID!: string;
  @Input() factorManager!: FactorManager;
  @Input() module!: FactorEmissionModule;

  constructor(private calculationService:CalculationService, private menuService: MenuService, private translateService:TranslateService, private translationManagerService:TranslationManagerService) { }

  ngOnInit(): void {
    this.translateService.getTranslation(this.translationManagerService.lang).subscribe(translations => {
      this.menuService.changeMenu([
        {icon:"delete", menuPointName: this.translationManagerService.getTranslation(translations, "delete"), link:"/emission/"+this.calculationID, onClick: () => this.delete()}]);
    });
  }
  save(){
    this.calculationService.save();
  }
  delete(){
    this.calculationService.getById(this.calculationID)?.removeModule(this.module);
  }
}
