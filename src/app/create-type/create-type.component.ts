import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AdvancedEmissionModule, ELECTRICITY_MODULE_ID, ELECTRICITY_TYPES, MOBILITY_MODULE_ID, MOBILITY_TYPES } from '../emissionmodule/modules/advanced-module';
import { NavigationService } from '../shared/navigation.service';
import { CalculationService } from '../_services/calculation.service';
/**
 * is an Angular component responsible for handling the creation of new emission types in the advanced emission module.
 */
@Component({
  selector: 'app-create-type',
  templateUrl: './create-type.component.html',
  styleUrls: ['./create-type.component.scss']
})
export class CreateTypeComponent implements OnInit {
  /**
   * instance of the AdvancedEmissionModule
   */
  module!:AdvancedEmissionModule;
  /**
   * array of strings that holds the ids of the types that can be created
   */
  ids:string[] = [];
  /**
   * array of strings that holds the ids of the types that have already been created
   */
  modules!:string[];
  /**
   * Constructs a new CreateTypeComponent
   * @param navigation used for updating the navigation message
   * @param route used for reading the URL parameters
   * @param calculationService used for saving the updated calculation.
   * @param translateService used for translating
   * @param router used for navigating to the next page
   */
  constructor(private navigation:NavigationService,
    private route:ActivatedRoute,
    private calculationService:CalculationService,
    private translateService:TranslateService,
    private router:Router) { }

  /**
   * Subscribes to route parameters to obtain the calculation and module for which
   * the new emission type is being created, and initializes the ids and modules properties accordingly.
   */
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
            this.modules = this.module.getTypes();
          }else if(module.id == MOBILITY_MODULE_ID){
            this.module = module as AdvancedEmissionModule;
            this.ids = MOBILITY_TYPES.filter(id => !this.module.getTypes().includes(id))
          }
        }
      }
    });
  }
  /**
   * Method called when the user creates a new emission type. Calls the add method of the AdvancedEmissionModule class
   * to add the new emission type to the module, saves the updated calculation, and navigates to the newly created emission type.
   * @param id the id of the new emission type
   */
  create(id:string){
    this.module.add({ id: id, number: 0 });
    this.calculationService.save();

    this.router.navigate(['../'+id], {relativeTo: this.route});
  }
}
