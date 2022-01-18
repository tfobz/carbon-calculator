import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Calculation } from '../emissionmodule/calculation';
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
    private translateService: TranslateService
  ){}

  ngOnInit(): void {
    this.translateService.get("emission").subscribe(translation => {
      this.navigation.changeMessage(translation);
    });
  }

  get calculations(): Calculation[] {
    return this.calculationService.calculations;
  }
}
