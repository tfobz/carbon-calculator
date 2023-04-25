import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { Calculation } from '../emissionmodule/calculation';
import { CalculationService } from '../_services/calculation.service';
import { TranslationManagerService } from '../_services/translation-manager.service';
import { DiagramDataCompare } from '../shared';

import { ResizedEvent } from 'angular-resize-event';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FactorManager } from '../emissionmodule/factor-manager';
/**
 * It defines the structure of the data that will be displayed in a comparison table.
 */
interface TableData {
  /** a string representing the name of the item being compared. */
	name: string,
  /**  a number representing the value of the first item being compared. */
	one: number,
  /** a number representing the value of the second item being compared */
	two: number
}
/**
 * CalculationDiagramCompareComponent is a component that displays a comparison between two emissions calculations in a diagram form.
 * The component loads the data of the two calculations from a calculation service, and displays the data as two columns in a bar chart,
 * with an option to open a larger diagram in a dialog box.
 * The component also displays a table that lists the difference in emissions of each module between the two calculations.
 */
@Component({
  selector: 'app-calculation-diagram-compare',
  templateUrl: './calculation-diagram-compare.component.html',
  styleUrls: ['./calculation-diagram-compare.component.scss']
})
export class CalculationDiagramCompareComponent implements OnInit {
  /** An object containing the data for the two calculations to be compared */
	data: DiagramDataCompare = { one: [], two: [] };
  /** An array of objects containing the data for each module of the two calculations to be displayed in a table */
	tableData: TableData[] = [];
  /**  An array of strings containing the names of the columns in the table */
	displayedColumns = ["name", "dataone", "datatwo", "diff"];
  /** The title of the first calculation to be displayed in the chart */
	titleOne = "Loading...";
  /** The title of the second calculation to be displayed in the chart */
	titleTwo = "Loading...";
  /** The Calculation object for the first calculation to be compared */
	private calculationOne: Calculation | undefined;
  /** The Calculation object for the second calculation to be compared */
	private calculationTwo: Calculation | undefined;
  /**
   *  Constructs a new CalculationDiagramCompareComponent.
   * @param calculationService The CalculationService used to load the data for the two calculations to be compared
   * @param activatedRoute The ActivatedRoute used to retrieve the parameters of the URL to identify the two calculations to be compared
   * @param translateService  The TranslateService used to translate the names of the modules in the table
   * @param translationManager The TranslationManagerService used to manage the translations of the application
   * @param dialog The MatDialog used to open the dialog box containing the larger chart
   */
	constructor(
		private calculationService: CalculationService,
		private activatedRoute: ActivatedRoute,
		private translateService: TranslateService,
		private translationManager: TranslationManagerService,
		private dialog: MatDialog
	) { }
  /**
   * Called when the component is initialized.
   * Loads the data for the two calculations to be compared, and initializes the chart and the table with the data.
   */
	ngOnInit(): void {
     // Retrieves the IDs of the two calculations to be compared from the parameters of the URL
		this.activatedRoute.params.subscribe(params => {
			const idone = params['idone'] as unknown;
			const idtwo = params['idtwo'] as unknown;
			if (typeof idone !== "string" || typeof idtwo !== "string") throw new Error("Id not of type string (this should not occur)");
      // Loads the Calculation objects for the two calculations from the CalculationService
			this.calculationOne = this.calculationService.getById(idone);
			this.calculationTwo = this.calculationService.getById(idtwo);
      // Updates the titles of the chart with the names of the calculations
			if(this.calculationOne != null && this.calculationTwo != null){
				this.titleOne = this.calculationOne.name;
				this.titleTwo = this.calculationTwo.name;
			}
      // Initializes the chart and the table with the data of the two calculations
			this.loadChart();
		});
	}
/**
 * A method that loads the chart with data from the two calculations.
 */
	loadChart() {
		if(this.calculationOne == null || this.calculationTwo == null) {
			this.data = { one: [], two: [] };
			return;
		}
		this.translateService.getTranslation(this.translationManager.lang).subscribe(translations => {
			//TODO: case for 0 len
			if(this.calculationOne == null || this.calculationTwo == null) return;
			const factorManagerOne: FactorManager = this.calculationOne.factorManager;
			const factorManagerTwo: FactorManager = this.calculationTwo.factorManager;
			const dataOne = this.calculationOne.modules.map((mod) => ({ name: this.translationManager.getTranslation(translations, "modules." + mod.id), value: Math.floor(mod.calculate(factorManagerOne) * 100) / 100 }));
			const dataTwo = this.calculationTwo.modules.map((mod) => ({ name: this.translationManager.getTranslation(translations, "modules." + mod.id), value: Math.floor(mod.calculate(factorManagerTwo) * 100) / 100 }));

			this.data = { one: dataOne, two: dataTwo };

			this.tableData = [];
			for(let d1 of this.data.one) {
				let val: TableData = { name: d1.name, one: 0, two: 0 };
				val.one = d1.value;
				for(let d2 of this.data.two) {
					if(d1.name !== d2.name) continue;
					val.two = d2.value;
					break;
				}
				this.tableData.push(val);
			}
		});
	}
  /**
   *  A method that calculates the difference between two numbers.
   * @param one The first number
   * @param two The second number
   */
	diff(one: number, two: number): number{
		return Math.floor((one - two) * 100) / 100;
	}
  /**
   *  A method that runs when the diagram is resized. It adjusts the columns displayed in the table based on the new width of the diagram.
   * @param event The ResizedEvent containing the new width of the diagram
   */
	onResize(event: ResizedEvent){
		if(event.newRect.width <= 500){
			this.displayedColumns = ["name", "dataone", "datatwo"];
		}else{
			this.displayedColumns = ["name", "dataone", "datatwo", "diff"];
		}
	}
  /**
   * A method that opens a dialog displaying a different type of diagram.
   * @param type
   */
	openDialog(type: DialogDataType) {
		this.dialog.open(DiagramCompareDialogComponent, { width: "95%", data: { type, data: this.data } });
	}
}

/** Dialog data type defined */
type DialogDataType = 'bar-both'|'bar-compare';
/**
 * The data to be passed to the dialog box containing the diagram.
 */
interface DialogData{
  /** type of dialog */
	type: DialogDataType,
  /** data to be displayed in the diagram */
	data: DiagramDataCompare
}
/**
 *  A component that displays a dialog box containing a diagram.
 *  If data.type is 'bar-both', then the app-bar-diagram-both component will be displayed,
 *  and if data.type is 'bar-compare', then the app-bar-diagram-compare component will be displayed.
 */
@Component({
	selector: 'app-diagram-dialog',
	template: `
	<div [ngSwitch]="data.type">
		<div *ngSwitchCase="'bar-both'"> <app-bar-diagram-both [data]="data.data"></app-bar-diagram-both> </div>
		<div *ngSwitchCase="'bar-compare'"> <app-bar-diagram-compare [data]="data.data"></app-bar-diagram-compare> </div>
	</div>
	`,
	styleUrls: []
  })
export class DiagramCompareDialogComponent{
  /**
   * The DialogData containing the data to be displayed in the dialog box
   * @param dialogRef The MatDialogRef used to close the dialog box
   * @param data The DialogData containing the data to be displayed in the dialog box
   */
	constructor(
		public dialogRef: MatDialogRef<DiagramCompareDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: DialogData
	){}
}
