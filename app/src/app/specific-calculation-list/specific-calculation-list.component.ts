import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmissionModule, FactorEmissionModule } from '../emissionmodule/emission-module';
import { NavigationService } from '../shared/navigation.service';
import { CalculationService } from '../_services/calculation.service';

@Component({
  selector: 'app-specific-calculation-list',
  templateUrl: './specific-calculation-list.component.html',
  styleUrls: ['./specific-calculation-list.component.scss']
})
export class SpecificCalculationListComponent implements OnInit {

  private _module!: EmissionModule;
  public factorEmissionModuleExists:boolean = false;

  constructor(private route:ActivatedRoute,private navigation:NavigationService, private calculationService:CalculationService){}

  ngOnInit(): void {

    this.route.params.subscribe(params=>{

      this.navigation.changeMessage(params?.sptitle);

      let module = this.calculationService.getByName(params.title)?.modules.find(module => module.id == params.sptitle);
      if(module) this.module = module;
      if(this.module instanceof FactorEmissionModule)
        this.factorEmissionModuleExists = true;
    })
  }

  get module() : EmissionModule {

    return this._module;

  }
  set module(module:EmissionModule){

    this._module = module;

  }

  getFactorModule() : FactorEmissionModule {

    return this.module as FactorEmissionModule;

  }
}
