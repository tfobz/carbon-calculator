import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Calculation } from '../emissionmodule/calculation';
import { CalculationService } from '../_services/calculation.service';
import { TranslationManagerService } from '../_services/translation-manager.service';
import { DiagramData, MenuService } from '../shared';
/**
* This class is the base class for each diagramm. It is actually the base site, where then every diagramm
* is located on. To view this site you first need to select an entry and then in the top right corner
* you will find the option "Diagrams" where you can look at this.
*/
@Component({
  selector: 'app-calculation-diagram',
  templateUrl: './calculation-diagram.component.html',
  styleUrls: ['./calculation-diagram.component.scss']
})

export class CalculationDiagramComponent implements OnInit {
  /**
   * This is a private variable that holds the Calculation object for the current route.
   */
	private calculation: Calculation | undefined;
  /** This variable is an array of DiagramData objects. Each object contains the name and value of a calculation. */
	data: DiagramData[] = [];

  /**
   *  It is the constructor of the class that injects the required services.
   * @param calculationService
   * @param activatedRoute
   * @param translateService
   * @param translationManager
   * @param menuService
   * @param dialog
   */
	constructor(
		private calculationService: CalculationService,
		private activatedRoute: ActivatedRoute,
		private translateService: TranslateService,
		private translationManager: TranslationManagerService,
		private menuService: MenuService,
		private dialog: MatDialog
	) {
	}

	/**
	 * In this method, the component subscribes to the params property of the ActivatedRoute object,
   * which is used to extract the id parameter from the current route. It uses this id to fetch
   * the corresponding Calculation object from the CalculationService and sets it to the calculation
   * variable. It also changes the menu entry when someone clicks on "compare" in the menu and
   * loads the chart.
	 * @returns void
	 */
	ngOnInit() {
		this.activatedRoute.params.subscribe(params => {
			const id = params['id'] as unknown;
			// Changes the menu entry when someone clicks on "compare" in the menu
			this.translateService.get("compare").subscribe(translation => {
				this.menuService.changeMenu([{icon:"bar_chart", menuPointName: translation, link: `/emission/${id}/diagram/compare`}]);
			});
			// Issue forecasting
			if (typeof id !== "string") throw new Error("Id not of type string (this should not occur)");
			// Gets all calculations associated with the entry and loads its diagrams
			this.calculation = this.calculationService.getById(id);
			this.loadChart();
		});
	}

	/**
	 * Loads the charts using the calculated value. The value gets then passed on to each individual chart.
	 * This function can also break earlier, if exceptions occur
	 * @returns void
	 */
	loadChart() {
		// Checks if a calculation for this entry exists, else breaks the loading
		if(this.calculation == null) {
			this.data = [];
			return;
		}
		// Basically sums together all the co2 expenses recorded in the entry
		this.translateService.getTranslation(this.translationManager.lang).subscribe(translations => {
			// TODO: case for 0 len: If the expense is null, it is still displayed, but it should actually not
			if(this.calculation == null) return;
			const factorManager = this.calculation.factorManager;
			this.data = this.calculation.modules.map((mod) => ({ name: this.translationManager.getTranslation(translations, "modules." + mod.id), value: Math.floor(mod.calculate(factorManager) * 100) / 100 }));
		});
	}
	/**
	 * This method is used to open the dialog when clicking on it to display it in bigger size.
	 * @param {DialogDataType} type Defines which diagram to open
	 */
	openDialog(type: DialogDataType) {
		this.dialog.open(DiagramDialogComponent, { width: "95%", data: { type, data: this.data } });
	}

	/**
   * @ignore
	 */
	openKonami() {
		this.dialog.open(KonamiDialogComponent, { width: "95%" });
	}
}
/**
 * This is a type alias for a string. It is used to define the type of the dialog that
 * should be opened.
 */
type DialogDataType = 'bar'|'pie';
/**
 * This is an interface that defines the data that is passed to the DiagramDialogComponent when
 * it is opened by the openDialog method of the CalculationDiagramComponent class
 */
interface DialogData{
  /** It is of the type DialogDataType, which is an enumeration used to define the type of
   * diagram that should be displayed in the dialog. */
	type: DialogDataType,
  /**
   * It is an array of DiagramData, which is an interface that contains the data that needs
   * to be displayed in the diagram. It has two properties name and value
   */
	data: DiagramData[]
}

/**
 * Defines the class which holds the bigger window for when you click on a diagram
 * It should just show a modal with diagram in a bigger size
 */
@Component({
	selector: 'app-diagram-dialog',
	template: `
	<div [ngSwitch]="data.type">
		<div *ngSwitchCase="'bar'"> <app-bar-diagram [data]="data.data"></app-bar-diagram> </div>
		<div *ngSwitchCase="'pie'"> <app-pie-diagram [data]="data.data"></app-pie-diagram> </div>
	</div>
	`,
	styleUrls: []
  })


export class DiagramDialogComponent{
  /**
   * It is the constructor of the class that receives the data that is passed to the dialog when it is opened.
   * @param dialogRef  is a property of type MatDialogRef<DiagramDialogComponent>. It is used to
   * interact with the dialog that is currently open. It can be used to close the dialog,
   * access the data that was passed to it when it was opened, and to receive events when the
   * dialog is closed.
   * @param data s an input variable of type DialogData. It is passed to the dialog when it is opened
   * and it contains the type of the diagram and the data that will be displayed on the diagram.
   */
	constructor(
		public dialogRef: MatDialogRef<DiagramDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: DialogData
	){}
}

/**
 * @ignore
 */
@Component({
	selector: 'app-konami-dialog',
	template: `<img src="assets/oxygen-carbon.gif"/>`,
	styles: ["img { width: 100%; height: auto; }"],
	styleUrls: []
  })

export class KonamiDialogComponent{
	constructor(){}
}

