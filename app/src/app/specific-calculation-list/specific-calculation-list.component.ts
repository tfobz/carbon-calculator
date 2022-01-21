import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { EmissionModule, FactorEmissionModule } from '../emissionmodule/emission-module';
import { ElectricityEmissionModule } from '../emissionmodule/impl/electricity/electricity_emission-module';
import { MobilityEmissionModule } from '../emissionmodule/impl/transport/mobility/mobility_emission-module';
import { NavigationService } from '../shared/navigation.service';
import { CalculationService } from '../_services/calculation.service';

@Component({
  selector: 'app-specific-calculation-list',
  templateUrl: './specific-calculation-list.component.html',
  styleUrls: ['./specific-calculation-list.component.scss']
})
export class SpecificCalculationListComponent implements OnInit {

  _module!: EmissionModule;
  _calculationID!:string;

  constructor(private route:ActivatedRoute,private navigation:NavigationService,private translateService: TranslateService, private calculationService:CalculationService){}

  ngOnInit(): void {

    this.route.params.subscribe(params=>{
      this.translateService.get("modules." + params?.sptitle).subscribe(translation => {
        this.navigation.changeMessage(translation);
      });
      this._calculationID = params.id;
      let module = this.calculationService.getById(params.id)?.modules.find(module => module.id == params.sptitle);
      if(module) this.module = module;
    })
  }

  get isFactorModule(): boolean{
    return this._module instanceof FactorEmissionModule;
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
  getTypeModule(): ElectricityEmissionModule | MobilityEmissionModule | undefined{
    
    if(this.module instanceof ElectricityEmissionModule)
      return this.module as ElectricityEmissionModule;
    else 
    if(this.module instanceof MobilityEmissionModule)
      return this.module as MobilityEmissionModule;
    
    return undefined;
  }
}
