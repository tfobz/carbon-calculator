import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Calculation } from '../emissionmodule/calculation';
import { EmissionModule } from '../emissionmodule/emission-module';
import { NavigationService } from '../shared/navigation.service';
import { CalculationService } from '../_services/calculation.service';



@Component({
  selector: 'app-calculation-list',
  templateUrl: './calculation-list.component.html',
  styleUrls: ['./calculation-list.component.scss']
})
export class CalculationListComponent implements OnInit{
  
  private _calculation!: Calculation;

  constructor(
    private route:ActivatedRoute,
    private navigation:NavigationService,
    private calculationService: CalculationService
    ){}

  get modules(): EmissionModule[] {
    return this._calculation?.modules;
  }

  ngOnInit(): void {

    this.route.params.subscribe(params=>{
      let calculation = this.calculationService.getByName(params.title);
      if(calculation) this._calculation = calculation;
      
      this.navigation.changeMessage(params?.title);

    })
  }

}
