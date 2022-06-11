import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Calculation } from '../emissionmodule/calculation';
import { EmissionModule } from '../emissionmodule/emission-module';
import { FactorManager } from '../emissionmodule/factor-manager';
import { AdvancedEmissionModule } from '../emissionmodule/modules/advanced-module';
import { FactorEmissionModule } from '../emissionmodule/modules/factor-module';
import { AdvancedSerializer } from '../emissionmodule/serializer/advanced-serializer';
import { NavigationService } from '../shared/navigation.service';
import { CalculationService } from '../_services/calculation.service';

@Component({
  selector: 'app-specific-calculation-list',
  templateUrl: './specific-calculation-list.component.html',
  styleUrls: ['./specific-calculation-list.component.scss']
})
export class SpecificCalculationListComponent implements OnInit {

  private _module!: EmissionModule;
  private _factorManager!: FactorManager;
  private _calculationID!:string;

  constructor(private route:ActivatedRoute,private navigation:NavigationService,private translateService: TranslateService, private calculationService:CalculationService){}

  ngOnInit(): void {

    this.route.params.subscribe(params=>{
      this.translateService.get("modules." + params?.sptitle).subscribe(translation => {
        this.navigation.changeMessage(translation);
      });
      this._calculationID = params.id;
      const calculation = this.calculationService.getById(params.id);
      if(calculation == null) return;
      this._factorManager = calculation.factorManager;
      let module = calculation.modules.find(module => module.id == params.sptitle);
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

  get factorManager(): FactorManager {
    return this._factorManager;
  }

  get calculationId(): string {
    return this._calculationID;
  }

  getFactorModule() : FactorEmissionModule {
    return this.module as FactorEmissionModule;
  }
  getTypeModule(): AdvancedEmissionModule | undefined{
    if(this.module instanceof AdvancedEmissionModule) return this.module as AdvancedEmissionModule;
    return undefined;
  }
}
