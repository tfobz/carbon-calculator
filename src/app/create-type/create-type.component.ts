import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AdvancedEmissionModule, ELECTRICITY_MODULE_ID, ELECTRICITY_TYPES, MOBILITY_MODULE_ID, MOBILITY_TYPES } from '../emissionmodule/modules/advanced-module';
import { NavigationService } from '../shared/navigation.service';
import { CalculationService } from '../_services/calculation.service';

@Component({
  selector: 'app-create-type',
  templateUrl: './create-type.component.html',
  styleUrls: ['./create-type.component.scss']
})
export class CreateTypeComponent implements OnInit {
  
  private module!:AdvancedEmissionModule;
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
      let calculation = this.calculationService.getById(params.id);
      if(calculation){
        let module = calculation.modules.find(module => module.id == params.sptitle)
        if(module){
          if(module.id == ELECTRICITY_MODULE_ID){
            this.module = module as AdvancedEmissionModule;
            this.ids = ELECTRICITY_TYPES.filter(id => !this.module.getTypes().includes(id))
          }else if(module.id == MOBILITY_MODULE_ID){
            this.module = module as AdvancedEmissionModule;
            this.ids = MOBILITY_TYPES.filter(id => !this.module.getTypes().includes(id))
          }
        }
      }
    });
  }
  create(id:string){
    this.module.add({ id: id, number: 0 });
    this.calculationService.save();

    this.router.navigate(['../'+id], {relativeTo: this.route});
  }
}
