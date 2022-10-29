import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Calculation } from '../emissionmodule/calculation';
import { CalculationService } from '../_services/calculation.service';
import { TranslationManagerService } from '../_services/translation-manager.service';
import { DiagramData, MenuService } from '../shared';

@Component({
  selector: 'app-calculation-diagram',
  templateUrl: './calculation-diagram.component.html',
  styleUrls: ['./calculation-diagram.component.scss']
})

/**
 * This class is the base class for each diagramm. It is actually the base site, where then every diagramm
 * is located on. To view this site you first need to select an entry and then in the top right corner
 * you will find the option "Diagrams" where you can look at this.
 */
export class CalculationDiagramComponent implements OnInit {

	private calculation: Calculation | undefined;
	data: DiagramData[] = [];

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
	 * Defines what happens when this page is opened, or more precisely when this component is started/initialized
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
	 * Opens the diagramm when clicking on it to display it in bigger size
	 * @param {DialogDataType} type Defines which diagram to open
	 */
	openDialog(type: DialogDataType) {
		this.dialog.open(DiagramDialogComponent, { width: "95%", data: { type, data: this.data } });
	}

	/**
	 * Unknown
	 * 
	 * Maybe a secret function? It is unclear what this should be
	 */
	openKonami() {
		this.dialog.open(KonamiDialogComponent, { width: "95%" });
	}
}

type DialogDataType = 'bar'|'pie';

interface DialogData{
	type: DialogDataType,
	data: DiagramData[]
}

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

/**
 * Defines the class which holds the bigger window for when you click on a diagram
 * It should just show a modal with diagram in a bigger size
 */
export class DiagramDialogComponent{
	constructor(
		public dialogRef: MatDialogRef<DiagramDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: DialogData
	){}
}
  
@Component({
	selector: 'app-konami-dialog',
	template: `<img src="assets/oxygen-carbon.gif"/>`,
	styles: ["img { width: 100%; height: auto; }"],
	styleUrls: []
  })

/**
 * Unknown
 * 
 *  Maybe a secret class? It is unclear what this should be
 */
export class KonamiDialogComponent{
	constructor(){}
}
  
