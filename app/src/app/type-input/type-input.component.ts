import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ModuleType } from '../emissionmodule/emission-module';
import { ElectricityEmissionModule } from '../emissionmodule/impl/electricity/electricity_emission-module';
import { MobilityEmissionModule } from '../emissionmodule/impl/transport/mobility/mobility_emission-module';
import { NavigationService } from '../shared/navigation.service';
import { CalculationService } from '../_services/calculation.service';

@Component({
  selector: 'app-type-input',
  templateUrl: './type-input.component.html',
  styleUrls: ['./type-input.component.scss']
})
export class TypeInputComponent implements OnInit {

  type!:[ModuleType, number];

  constructor(private route:ActivatedRoute,private navigation:NavigationService,private translateService: TranslateService, private calculationService:CalculationService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      this.translateService.get("types." + params?.typeID).subscribe(translation => {
        this.navigation.changeMessage(translation);
      });

      let module = this.calculationService.getByName(params.title)?.modules.find(module => module.id == params.sptitle);
      if(module instanceof MobilityEmissionModule) {
        let type = (module as MobilityEmissionModule).getType(params.typeID)
        if(type)
          this.type = type;
      }else if(module instanceof ElectricityEmissionModule){
        let type = (module as ElectricityEmissionModule).getType(params.typeID)
        if(type)
          this.type = type;
      }
    })
  }
}
