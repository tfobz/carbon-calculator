import { Component, OnInit, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Calculation } from '../emissionmodule/calculation';
import { MenuService } from '../shared/menu.service';
import { NavigationService } from '../shared/navigation.service';
import { CalculationService } from '../_services/calculation.service';
import { TranslationManagerService } from '../_services/translation-manager.service';

// Defines where to search for styling and HTML of this page
@Component({
  selector: 'app-emission-list',
  templateUrl: './emission-list.component.html',
  styleUrls: ['./emission-list.component.scss']
})

// Is like a constructor for this page, defining variables and other things that can then be defined
// in the HTML file
export class EmissionListComponent implements OnInit {
  // Custom variable to make Hints disappear once an entry got created
  empty_hint = true;
  constructor(
    private navigation:NavigationService,
    private calculationService: CalculationService,
    private translateService: TranslateService,
    private translationManagerService: TranslationManagerService,
    private menuService:MenuService,
  ){}

  // This function triggers every time you open this page
  ngOnInit(): void {
    this.translateService.get("emission").subscribe(translation => {
      this.navigation.changeMessage(translation);
    });

    // Check if there is an emission item and change the visibility of the hints accordingly
    // calculationService.calculations will retrieve nothing if there is no calculation, and something else if there is
    if (this.calculationService.calculations.toString() && this.calculationService.calculations.toString().trim()) {
      this.empty_hint = false;
    }

    // Defines the menu of the website
    this.translateService.getTranslation(this.translationManagerService.lang).subscribe(translations => {
      this.menuService.changeMenu([{icon:"settings", menuPointName: this.translationManagerService.getTranslation(translations, "settings"), link: `/emission/settings`}])
    });
  }

  // Retrieves the list of all created calculations
  get calculations(): Calculation[] {
    this.calculationService.save()
    return this.calculationService.calculations;
  }
}
