import { Component, OnInit, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Calculation } from '../emissionmodule/calculation';
import { MenuService } from '../shared/menu.service';
import { NavigationService } from '../shared/navigation.service';
import { CalculationService } from '../_services/calculation.service';
import { TranslationManagerService } from '../_services/translation-manager.service';


@Component({
  selector: 'app-emission-list',
  templateUrl: './emission-list.component.html',
  styleUrls: ['./emission-list.component.scss']
})
export class EmissionListComponent implements OnInit{
  constructor(
    private navigation:NavigationService,
    private calculationService: CalculationService,
    private translateService: TranslateService,
    private translationManagerService: TranslationManagerService,
    private menuService:MenuService,
  ){}

  ngOnInit(): void {
    this.translateService.get("emission").subscribe(translation => {
      this.navigation.changeMessage(translation);
    });
    //Menu 
    this.translateService.getTranslation(this.translationManagerService.lang).subscribe(translations => {
      this.menuService.changeMenu([{icon:"settings", menuPointName: this.translationManagerService.getTranslation(translations, "settings"), link: `/emission/settings`}])
    });
  }

  get calculations(): Calculation[] {
    this.calculationService.save()
    return this.calculationService.calculations;
  }
}
