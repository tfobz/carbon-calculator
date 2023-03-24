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
import { FactorManager } from '../emissionmodule/factor-manager';

/**
 * The CalculationListComponent is a component that displays a list of calculations and allows
 * the user to perform various actions on them, such as viewing diagrams, exporting, importing,
 * and deleting calculations
 */
@Component({
  selector: 'app-calculation-list',
  templateUrl: './calculation-list.component.html',
  styleUrls: ['./calculation-list.component.scss']
})
export class CalculationListComponent implements OnInit{
  /**
   * The _calculation variable is a private member variable that is used to store the current
   * calculation object, which contains all the data for the calculation.
   */
  private _calculation!: Calculation;
  /**
   * The currentUrl variable is a public member variable that is used to store the current URL of
   * the application, this is used to construct the links for the menu items in the component.
   */
  public currentUrl!:string;
  /**
   * Inside the constructor, several services are being injected
   * @param route ActivatedRoute is an Angular service that is used to get information about the
   * current route and navigate to new routes.
   * @param navigation  NavigationService is a custom service that is used to change the text in the header.
   * @param calculationService CalculationService is a custom service that is used to
   * manage calculations.
   * @param menuService MenuService is a custom service that is used to change the options in the menu.
   * @param translationManagerService TranslationManagerService is a custom service that is used to manage the translations.
   * @param translateService TranslateService is a service provided by the ngx-translate library that is used to translate strings.
   * @param _dialog MatDialog is a service provided by the Angular Material library that is used to open dialogs.
   * @param _snackbar MatSnackbar is a service provided by the Angular Material library that is used to open snackbars.
   */
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
  /**
   * returns an array of the EmissionModule objects that are associated with the current calculation.
   */
  get modules(): EmissionModule[] {
    this.calculationService.save()
    return this._calculation?.modules;
  }
  /**
   * returns the FactorManager associated with the current calculation.
   */
  get factorManager(): FactorManager {
	  return this._calculation.factorManager;
  }
  /**
   * the component subscribes to the route parameters and assigns the calculation to the
   * _calculation property, it also update the navigation bar with the name of the calculation.
   * It also assigns the currentUrl property to the appropriate URL. It also sets the menu
   * options for the component by calling the changeMenu method of the menuService,
   * passing an array of menu options, with the menuPointName translated to the current
   * language, and the link and onClick properties set as appropriate.
   */
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
        {icon:"delete", menuPointName: this.translationManagerService.getTranslation(translations, "delete"), link:"/emission/", onClick: () => this.delete() }
      ]);
	  });
  }
  /**
   * exports the current calculation to a JSON file, which can be saved to
   * the user's local file system.
   */
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

  /**
   * It opens a dialog box (ImportFileDialogComponent) with a form to select the file to import.
   * When the dialog box is closed, the method subscribes to the afterClosed() event and checks
   * if the result is null or an empty string. If it is, the method ends. If it is not, it assigns
   * the result to the variable importData of type ImportData. Then, it iterates through the
   * modules in the importData and checks if the module is already registered in the current
   * calculation. If it is, it skips this module. If not, it pushes the imported module to the
   * current calculation's modules. Then, it saves the calculation and shows a snackbar message
   * to the user to indicate that the import was successful
   */
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


      this.translateService.getTranslation(this.translationManagerService.lang).subscribe(translations => {
        const translationManager = this.translationManagerService;
        const translate = function(name: string){
          return translationManager.getTranslation(translations, name);
        }

        this._snackbar.open(translate("import_success"), translate("close"), {
          duration: 2000,
          panelClass: [ 'snackbar-custom' ]
        });
      });
	  });
  }
  /**
   * deletes the current calculation from the list of calculations and from the local storage,
   * and redirects the user to the emission route.
   */
  delete(){
    this.calculationService.removeCalculation(this._calculation);
  }
}
