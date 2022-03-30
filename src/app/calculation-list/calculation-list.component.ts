import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Calculation } from '../emissionmodule/calculation';
import { EmissionModule } from '../emissionmodule/emission-module';
import { MenuService } from '../shared/menu.service';
import { NavigationService } from '../shared/navigation.service';
import { CalculationService } from '../_services/calculation.service';
import { TranslationManagerService } from '../_services/translation-manager.service';
import { MatDialog } from '@angular/material/dialog'; 
import { saveAs } from 'file-saver';
import { ImportData, ImportFileDialogComponent } from './import-file-dialog/import-file-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private translateService: TranslateService,
	private _dialog: MatDialog,
	private _snackbar: MatSnackBar
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
		const translationManager = this.translationManagerService;
		const translate = function(name: string){
			return translationManager.getTranslation(translations, name);
		}
		this.menuService.changeMenu([
			{icon:"bar_chart", menuPointName: translate("diagrams"), link:this.currentUrl+"/diagram"},
			{ icon: "file_download", menuPointName: translate("export"), link: undefined, onClick: () => { this.saveCalculation(); } },
			{ icon: "file_upload", menuPointName: translate("import"), link: undefined, onClick: () => { this.loadCalculation(); } },
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

  loadCalculation(){
  	const dialogRef = this._dialog.open(ImportFileDialogComponent, {
		minWidth: "30%",
	});

	dialogRef.afterClosed().subscribe(result => {
		if(result == null || result == "") return;
		const importData: ImportData = result as ImportData;

		importData.modules.forEach(module => {
			// CHECK IF MODULE ALREADY REGISTERED
			if(this._calculation.getModule(module.id) != null) return;

			this._calculation.modules.push(module);
		});

		// SAVE CALCULATION
		this.calculationService.save();

		this._snackbar.open("Imported file", "Close", {
			duration: 2000,
			panelClass: [ 'snackbar-custom' ]
		});
	});
  }

  delete(){
    this.calculationService.removeCalculation(this._calculation);
  }
}
