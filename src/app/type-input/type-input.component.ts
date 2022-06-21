import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ModuleType } from '../emissionmodule/emission-module';
import { ElectricityEmissionModule } from '../emissionmodule/impl/electricity/electricity_emission-module';
import { MobilityEmissionModule } from '../emissionmodule/impl/transport/mobility/mobility_emission-module';
import { MenuService } from '../shared';
import { NavigationService } from '../shared/navigation.service';
import { CalculationService } from '../_services/calculation.service';
import { TranslationManagerService } from '../_services/translation-manager.service';

@Component({
  selector: 'app-type-input',
  templateUrl: './type-input.component.html',
  styleUrls: ['./type-input.component.scss']
})
export class TypeInputComponent implements OnInit {

  module!: ElectricityEmissionModule | MobilityEmissionModule;
  type !: [ModuleType, number];

  constructor(private route:ActivatedRoute,private navigation:NavigationService, private calculationService:CalculationService, private menuService: MenuService, private translateService:TranslateService, private translationManagerService:TranslationManagerService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      this.translateService.get("types." + params?.typeID).subscribe(translation => {
        this.navigation.changeMessage(translation);
      });

      this.translateService.getTranslation(this.translationManagerService.lang).subscribe(translations => {
        this.menuService.changeMenu([
          {icon:"delete", menuPointName: this.translationManagerService.getTranslation(translations, "delete"), link:"/emission/" + params.id + "/" + module?.id, onClick: () => this.delete()}]);
      });

      let module = this.calculationService.getById(params.id)?.modules.find(module => module.id == params.sptitle);
      if(module){
        if(module instanceof MobilityEmissionModule) {
          this.module = module as MobilityEmissionModule;
          let type = module.getType(params.typeID);
          if(type) this.type = type;
        }else if(module instanceof ElectricityEmissionModule){
          this.module = module as ElectricityEmissionModule;
          let type = module.getType(params.typeID);
          if(type) this.type = type;
        }
      }
    })
  }
  save(){
    this.module.changeTypeValue(this.type[0], this.type[1]);
    this.calculationService.save();
  }
  delete(){
    this.module.removeType(this.type[0].id);
  }

}
