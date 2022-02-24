import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Calculation } from '../emissionmodule/calculation';
import { EmissionModule } from '../emissionmodule/emission-module';
import { MenuService } from '../shared/menu.service';
import { NavigationService } from '../shared/navigation.service';
import { CalculationService } from '../_services/calculation.service';
import { TranslationManagerService } from '../_services/translation-manager.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-calculation-list',
  templateUrl: './calculation-list.component.html',
  styleUrls: ['./calculation-list.component.scss']
})
export class CalculationListComponent implements OnInit{
  
  private _calculation!: Calculation;
  public currentUrl!:string;

  constructor(
    private route:ActivatedRoute,
    private navigation:NavigationService,
    private calculationService: CalculationService,
    private menuService:MenuService,
    private translationManagerService: TranslationManagerService,
    private translateService: TranslateService
    ){}

  get modules(): EmissionModule[] {
    this.calculationService.save()
    return this._calculation?.modules;
  }

  ngOnInit(): void {

    this.route.params.subscribe(params=>{
      let calculation = this.calculationService.getById(params.id);
      if(calculation) this._calculation = calculation;
      this.navigation.changeMessage(calculation == null ? "" : calculation.name);
      this.currentUrl="/emission/" + params.id;
    });

    this.translateService.getTranslation(this.translationManagerService.lang).subscribe(translations => {
      this.menuService.changeMenu([
        {icon:"bar_chart", menuPointName: this.translationManagerService.getTranslation(translations, "diagrams"), link:this.currentUrl+"/diagram"},
		{ icon: "file_download", menuPointName: "Export", link: undefined, onClick: () => { this.saveCalculation(); } },
        {icon:"delete", menuPointName: this.translationManagerService.getTranslation(translations, "delete"), link:"/emission/", onClick: () => this.delete()}]);
    });
  }

  saveCalculation(){
	const saveData = this._calculation.save();

	// We don't want these properties
	delete saveData.id;
	delete saveData.name;

	let jsonString = JSON.stringify(saveData, null, 2);

	const blob = new Blob([jsonString]);
	const filename = this._calculation.name;
	saveAs(blob, filename + ".json");
  }

  delete(){
    this.calculationService.removeCalculation(this._calculation);
  }
}
