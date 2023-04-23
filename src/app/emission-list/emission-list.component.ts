import { Component, OnInit, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Calculation } from '../emissionmodule/calculation';
import { MenuService } from '../shared/menu.service';
import { NavigationService } from '../shared/navigation.service';
import { CalculationService } from '../_services/calculation.service';
import { TranslationManagerService } from '../_services/translation-manager.service';

/**
 * The EmissionListComponent is used to display a list of emissions calculations
 */
@Component({
  selector: 'app-emission-list',
  templateUrl: './emission-list.component.html',
  styleUrls: ['./emission-list.component.scss']
})


export class EmissionListComponent implements OnInit {
  /** is a boolean property that is used to control the visibility of a hint message in the view. */
  empty_hint_status = true;
  /** is a string property that holds the message that will be displayed as the hint.
   *  The default value of this property is an empty string
  */
  empty_hint_msg = "";

  /**
   * The constructor assigns these services to private variables with the same name,
   * so that they can be used throughout the component.
   * @param navigation is used to change the navigation data displayed in the header of the application.
   * @param calculationService is used to retrieve the list of calculations.
   * @param translateService is used to handle translations in the application.
   * @param translationManagerService is used to manage translations in the application.
   * @param menuService  is used to change the menu items displayed in the application.
   */
  constructor(
    private navigation:NavigationService,
    private calculationService: CalculationService,
    private translateService: TranslateService,
    private translationManagerService: TranslationManagerService,
    private menuService:MenuService,
  ){}

  /**
   * The method is called when the component is first initialized and it performs several tasks:
   *  1. It uses the "translateService" to get the translation of the word "emission" and then it
   *     calls the "changeMessage" method of the "navigation" service to update the navigation data
   *  2. It uses the "translateService" to get the translation of the "main_page_starting_hint"
   *     and assigns the translation to the "empty_hint_msg" property.
   *  3. It uses the "calculationService" to check if there are any calculations, if there are,
   *     it sets the "empty_hint_status" property to false, which means that the hint message will
   *     not be shown.
   *  4. It uses the "translateService" and "translationManagerService" to get the translation of
   *     the word "settings" and calls the "changeMenu" method of the "menuService" to update the
   *     menu items.
   */
  ngOnInit(): void {
    this.translateService.get("emission").subscribe(translation => {
      this.navigation.changeMessage(translation);
    });

    this.translateService.get("main_page_starting_hint").subscribe(translation => {
      this.empty_hint_msg = translation;
    })

    /**
     * Check if there is an emission item and change the visibility of the hints accordingly
     * calculationService.calculations will retrieve nothing if there is no calculation, and
     * something else if there is
     */
    if (this.calculationService.calculations.toString() && this.calculationService.calculations.toString().trim()) {
      this.empty_hint_status = false;
    }

    /* Defines the menu of the website */
    this.translateService.getTranslation(this.translationManagerService.lang).subscribe(translations => {
      this.menuService.changeMenu([{icon:"settings", menuPointName: this.translationManagerService.getTranslation(translations, "settings"), link: `/emission/settings`}])
    });

  }
  /**
   * The method is called when the user clicks on the delete button of a calculation.
   * @param $event is the name of the calculation that will be deleted
   */
  deleteCalculation($event:string){
    console.log($event);
    this.calculationService.removeCalculation(this.calculationService.getByName($event));
  }
  /**
   * Retrieves the list of all created calculations
   */
  get calculations(): Calculation[] {
    this.calculationService.save()
    return this.calculationService.calculations;
  }
}
