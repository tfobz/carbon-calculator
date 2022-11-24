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

interface TableData {
	name: string,
	one: number,
	two: number
}

@Component({
  selector: 'app-calculation-diagram-compare',
  templateUrl: './calculation-diagram-compare.component.html',
  styleUrls: ['./calculation-diagram-compare.component.scss']
})
export class CalculationDiagramCompareComponent implements OnInit {

	data: DiagramDataCompare = { one: [], two: [] };
	tableData: TableData[] = [];
	displayedColumns = ["name", "dataone", "datatwo", "diff"];
	titleOne = "Loading...";
	titleTwo = "Loading...";

	private calculationOne: Calculation | undefined;
	private calculationTwo: Calculation | undefined;

	constructor(
		private calculationService: CalculationService,
		private activatedRoute: ActivatedRoute,
		private translateService: TranslateService,
		private translationManager: TranslationManagerService,
		private dialog: MatDialog
	) { }

	ngOnInit(): void {
		this.activatedRoute.params.subscribe(params => {
			const idone = params['idone'] as unknown;
			const idtwo = params['idtwo'] as unknown;
			if (typeof idone !== "string" || typeof idtwo !== "string") throw new Error("Id not of type string (this should not occur)");

			this.calculationOne = this.calculationService.getById(idone);
			this.calculationTwo = this.calculationService.getById(idtwo);

			if(this.calculationOne != null && this.calculationTwo != null){
				this.titleOne = this.calculationOne.name;
				this.titleTwo = this.calculationTwo.name;
			}

			this.loadChart();
		});
	}

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

	diff(one: number, two: number): number{
		return Math.floor((one - two) * 100) / 100;
	}

	onResize(event: ResizedEvent){
		if(event.newRect.width <= 500){
			this.displayedColumns = ["name", "dataone", "datatwo"];
		}else{
			this.displayedColumns = ["name", "dataone", "datatwo", "diff"];
		}
	}

	openDialog(type: DialogDataType) {
		this.dialog.open(DiagramCompareDialogComponent, { width: "95%", data: { type, data: this.data } });
	}
}


type DialogDataType = 'bar-both'|'bar-compare';

interface DialogData{
	type: DialogDataType,
	data: DiagramDataCompare
}

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
	constructor(
		public dialogRef: MatDialogRef<DiagramCompareDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: DialogData
	){}
}
