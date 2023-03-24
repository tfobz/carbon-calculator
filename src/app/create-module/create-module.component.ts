import { FactorEmissionModule } from 'src/app/emissionmodule/modules/factor-module';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Calculation } from '../emissionmodule/calculation';
import { EmissionModule } from '../emissionmodule/emission-module';
import EmissionsManager from '../emissionmodule/emissions_manager';

import { NavigationService } from '../shared/navigation.service';
import { CalculationService } from '../_services/calculation.service';
/**
 *  It allows a user to create a new EmissionModule for a specific Calculation
 */
@Component({
  selector: 'app-create-module',
  templateUrl: './create-module.component.html',
  styleUrls: ['./create-module.component.scss']
})
export class CreateModuleComponent implements OnInit {

  /**
   * _calculation is a private variable of type Calculation that is used to store a calculation object.
   */
  private _calculation!:Calculation;
  /**
   * ids is a variable of type string[] that will store the ids of the modules that are available 7
   * to be added to the calculation.
   */
  ids!:string[];
  /**
   * modules is a variable of type EmissionModule[] that will store the list of modules that are
   * already added to the calculation.
  */
  modules!:string[];
  /**
   * Inside the constructor, several services are being injected, such as NavigationService,
   * ActivatedRoute, CalculationService, TranslateService, and Router.
   * @param navigation
   * @param route
   * @param calculationService
   * @param translateService
   * @param router
   */
  constructor(private navigation:NavigationService,
    private route:ActivatedRoute,
    private calculationService:CalculationService,
    private translateService:TranslateService,
    private router:Router) { }

  /**
   * In the ngOnInit method, the component subscribes to the activated route's params observable to
   * get the id of the calculation. It then uses the CalculationService to get the Calculation
   * object by id and assigns it to the _calculation property. It also gets the list of available
   * module ids and filters out the ones that are already added to the calculation and assigns it
   * to the ids property.
   */
  ngOnInit(): void {
    this.translateService.get("add_button").subscribe(translation => {
      this.navigation.changeMessage(translation);
    });

    this.route.params.subscribe(params=>{
      let calculation = this.calculationService.getById(params.id);
      if(calculation){
        this._calculation = calculation;
        this.ids = EmissionsManager.getModuleIDs().filter(ids => !calculation?.modules.find(module => module.id == ids));
        this.modules = EmissionsManager.getModuleUnits(this.ids);
        console.log(this.modules);
      }
    });
  }
  /**
   * The create method is called when the user clicks on the "add" button. It takes an id as
   * an argument, which represents the id of the module the user wants to add. It uses the
   * EmissionsManager to load the module by id and add it to the _calculation object's modules
   * array. Finally, it uses the CalculationService to save the changes to the local storage
   * and navigate to the newly added module's page.
   * @param id moduleID
   */
  create(id:string){

    let module: EmissionModule | undefined = EmissionsManager.load( { type: id } );

    if(module != null){
      if(this._calculation.modules.find(module => module.id==id)){
        //Module already exists
      }else{
        this._calculation.modules.push(module);
        this.calculationService.save();
        this.router.navigate(['../'+id], {relativeTo: this.route});
      }
    }
    this.ids = EmissionsManager.getModuleIDs().filter(ids => !this._calculation?.modules.find(module => module.id == ids));
  }
}
