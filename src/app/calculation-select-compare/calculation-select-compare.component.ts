import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Calculation } from '../emissionmodule/calculation';
import { MenuService } from '../shared/menu.service';
import { NavigationService } from '../shared/navigation.service';
import { CalculationService } from '../_services/calculation.service';
/**
 * This is an Angular component that allows the user to select a calculation to compare with another calculation.
 */
@Component({
  selector: 'app-calculation-select-compare',
  templateUrl: './calculation-select-compare.component.html',
  styleUrls: ['./calculation-select-compare.component.scss']
})
export class CalculationSelectCompareComponent implements OnInit {
  /** The title of the calculation to be compared */
  title = "";
  /** The id of the calculation to be compared */
  id = "";
  /**
   * Constructs a new CalculationSelectCompareComponent.
   * @param navigation used to change the navigation message
   * @param calculationService used to retrieve the calculations
   * @param translateService used to retrieve translated strings
   * @param menuService  used to change the menu items
   * @param activatedRoute used to retrieve the route parameters.
   */
  constructor(
    private navigation:NavigationService,
    private calculationService: CalculationService,
    private translateService: TranslateService,
    private menuService:MenuService,
	private activatedRoute: ActivatedRoute,
  ){}
  /**
   * It subscribes to the route parameters using the ActivatedRoute, retrieves
   * the calculation with the given id using the CalculationService, and sets the title and id properties accordingly.
   * The method also retrieves a translated string using the TranslateService, and
   * changes the navigation message using the NavigationService. Finally, it clears the menu using the MenuService.
   */
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
  /**
   * It retrieves all the calculations from the CalculationService, and
   * filters out the calculation with the same name as the currently selected calculation.
   */
  get calculations(): Calculation[] {
    return this.calculationService.calculations.filter(calc => calc.name !== this.title);
  }
}
