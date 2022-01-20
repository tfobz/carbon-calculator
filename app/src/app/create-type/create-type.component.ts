import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ElectricityEmissionModule } from '../emissionmodule/impl/electricity/electricity_emission-module';
import { ElectricityTypeFactory } from '../emissionmodule/impl/electricity/electricity_types';
import { MobilityEmissionModule } from '../emissionmodule/impl/transport/mobility/mobility_emission-module';
import { MobilityTypeFactory } from '../emissionmodule/impl/transport/mobility/mobility_types';
import { NavigationService } from '../shared/navigation.service';
import { CalculationService } from '../_services/calculation.service';

@Component({
  selector: 'app-create-type',
  templateUrl: './create-type.component.html',
  styleUrls: ['./create-type.component.scss']
})
export class CreateTypeComponent implements OnInit {
  
  private module!:ElectricityEmissionModule | MobilityEmissionModule;
  ids:string[] = [];

  constructor(private navigation:NavigationService, 
    private route:ActivatedRoute, 
    private calculationService:CalculationService, 
    private translateService:TranslateService,
    private router:Router) { }

  ngOnInit(): void {
    this.translateService.get("add_button").subscribe(translation => {
      this.navigation.changeMessage(translation);
    });
    
    this.route.params.subscribe(params=>{
      let calculation = this.calculationService.getByName(params.title);
      if(calculation){
        let module = calculation.modules.find(module => module.id == params.sptitle)
        if(module){
          if(module instanceof ElectricityEmissionModule){
            this.module = module as ElectricityEmissionModule;
            this.ids = ElectricityTypeFactory.getAllIDs().filter(id => !this.module.getIDs().includes(id))
          }else if(module instanceof MobilityEmissionModule){
            this.module = module as MobilityEmissionModule;
            this.ids = MobilityTypeFactory.getAllIDs().filter(id => !this.module.getIDs().includes(id))
          }
        }
      }
    });
  }
  create(id:string){
    if(this.module instanceof ElectricityEmissionModule)
      (this.module as ElectricityEmissionModule).addElectricityType(id);
    if(this.module instanceof MobilityEmissionModule)
      (this.module as MobilityEmissionModule).addMobilityType(id);

    this.router.navigate(['../'+id], {relativeTo: this.route});
  }

}
