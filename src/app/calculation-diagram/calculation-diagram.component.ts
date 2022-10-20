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

	ngOnInit() {
		this.activatedRoute.params.subscribe(params => {
			const id = params['id'] as unknown;
			this.translateService.get("compare").subscribe(translation => {
				this.menuService.changeMenu([{icon:"bar_chart", menuPointName: translation, link: `/emission/${id}/diagram/compare`}]);
			});
			if (typeof id !== "string") throw new Error("Id not of type string (this should not occur)");
			this.calculation = this.calculationService.getById(id);
			this.loadChart();
		});
	}

	loadChart() {
		if(this.calculation == null) {
			this.data = [];
			return;
		}
		this.translateService.getTranslation(this.translationManager.lang).subscribe(translations => {
			//TODO: case for 0 len
			if(this.calculation == null) return;
			const factorManager = this.calculation.factorManager;
			this.data = this.calculation.modules.map((mod) => ({ name: this.translationManager.getTranslation(translations, "modules." + mod.id), value: Math.floor(mod.calculate(factorManager) * 100) / 100 }));
		});
	}

	openDialog(type: DialogDataType) {
		this.dialog.open(DiagramDialogComponent, { width: "95%", data: { type, data: this.data } });
	}

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
export class KonamiDialogComponent{
	constructor(){}
}
  
