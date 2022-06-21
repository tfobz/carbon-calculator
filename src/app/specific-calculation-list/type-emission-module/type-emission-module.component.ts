import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ModuleType } from 'src/app/emissionmodule/emission-module';
import { MobilityEmissionModule } from 'src/app/emissionmodule/impl/transport/mobility/mobility_emission-module';
import { MenuService } from 'src/app/shared';
import { CalculationService } from 'src/app/_services/calculation.service';
import { TranslationManagerService } from 'src/app/_services/translation-manager.service';
import { ElectricityEmissionModule } from '../../emissionmodule/impl/electricity/electricity_emission-module';

@Component({
  selector: 'app-type-emission-module',
  templateUrl: './type-emission-module.component.html',
  styleUrls: ['./type-emission-module.component.scss']
})
export class TypeEmissionModuleComponent implements OnInit {

  @Input() module!: ElectricityEmissionModule | MobilityEmissionModule | undefined;
  @Input() calculationID!: string;
  public currentUrl!:string;

  constructor(private route:ActivatedRoute,private calculationService:CalculationService, private menuService: MenuService, private translateService:TranslateService, private translationManagerService:TranslationManagerService) { }

  ngOnInit(): void {
    this.translateService.getTranslation(this.translationManagerService.lang).subscribe(translations => {
      this.menuService.changeMenu([
        {icon:"delete", menuPointName: this.translationManagerService.getTranslation(translations, "delete"), link:"/emission/"+this.calculationID, onClick: () => this.delete()}]);
    });
    this.route.params.subscribe(params=>{
      this.currentUrl="/emission/" + params.id +"/"+params.sptitle;
    });
  }
  getData(): Map<ModuleType, number> | undefined{
    return this.module?.data;
  }
  delete(){
    if(this.module) this.calculationService.getById(this.calculationID)?.removeModule(this.module);
  }
}
