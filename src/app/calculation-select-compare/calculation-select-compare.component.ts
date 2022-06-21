import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Calculation } from '../emissionmodule/calculation';
import { MenuService } from '../shared/menu.service';
import { NavigationService } from '../shared/navigation.service';
import { CalculationService } from '../_services/calculation.service';

@Component({
  selector: 'app-calculation-select-compare',
  templateUrl: './calculation-select-compare.component.html',
  styleUrls: ['./calculation-select-compare.component.scss']
})
export class CalculationSelectCompareComponent implements OnInit {

  title = "";
  id = "";

  constructor(
    private navigation:NavigationService,
    private calculationService: CalculationService,
    private translateService: TranslateService,
    private menuService:MenuService,
	private activatedRoute: ActivatedRoute,
  ){}

  ngOnInit(): void {
	  this.activatedRoute.params.subscribe((params) => {
      let id = params["id"] as unknown;
      if(typeof id !== "string") throw new Error("Title is no string");
      let calculation = this.calculationService.getById(id);
      if(calculation == null){ this.title = ""; return; }
      this.title = calculation.name;
      this.id = calculation.id;
	  });

    this.translateService.get("emission").subscribe(translation => {
      this.navigation.changeMessage(translation);
    });
    //Menu 
    this.menuService.changeMenu([])
  }

  get calculations(): Calculation[] {
    return this.calculationService.calculations.filter(calc => calc.name !== this.title);
  }
}
