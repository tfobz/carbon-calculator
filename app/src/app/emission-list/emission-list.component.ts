import { Component, OnInit, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Calculation } from '../emissionmodule/calculation';
import { MenuService } from '../shared/menu.service';
import { NavigationService } from '../shared/navigation.service';
import { CalculationService } from '../_services/calculation.service';


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
    private menuService:MenuService,
  ){}

  ngOnInit(): void {
    this.translateService.get("emission").subscribe(translation => {
      this.navigation.changeMessage(translation);
    });
    //Menu 
    this.translateService.get("settings").subscribe(translation => {
      this.menuService.changeMenu([{icon:"settings", menuPointName: translation, link: `/emission/settings`}])
    });
  }

  get calculations(): Calculation[] {
    this.calculationService.save()
    return this.calculationService.calculations;
  }
}
