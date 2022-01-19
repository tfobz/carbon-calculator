import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Calculation } from '../emissionmodule/calculation';
import { EmissionModule } from '../emissionmodule/emission-module';
import EmissionsManager from '../emissionmodule/emissions_manager';

import { NavigationService } from '../shared/navigation.service';
import { CalculationService } from '../_services/calculation.service';

@Component({
  selector: 'app-create-module',
  templateUrl: './create-module.component.html',
  styleUrls: ['./create-module.component.scss']
})
export class CreateModuleComponent implements OnInit {

  private _calculation!:Calculation;
  ids!:string[];

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
        this._calculation = calculation;
        this.ids = EmissionsManager.getModuleIDs().filter(ids => !calculation?.modules.find(module => module.id == ids));
      }
    });
  }

  create(id:string){

    let module: EmissionModule | undefined = EmissionsManager.load( { type: id } );

    if(module != null){
      if(this._calculation.modules.find(module => module.id==id)){
        //Module already exists
      }else{
        this._calculation.modules.push(module);
        this.router.navigate(['../'+id], {relativeTo: this.route});
      }
    } 
    this.ids = EmissionsManager.getModuleIDs().filter(ids => !this._calculation?.modules.find(module => module.id == ids));
  }
}
