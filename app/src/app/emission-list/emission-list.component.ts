import { Component, OnInit } from '@angular/core';
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
    private menuService:MenuService,
  ){}

  ngOnInit(): void {
      
    this.navigation.changeMessage("Emission");
    //Menu 
    this.menuService.changeMenu([])

  }

  get calculations(): Calculation[] {
    return this.calculationService.calculations;
  }
}
