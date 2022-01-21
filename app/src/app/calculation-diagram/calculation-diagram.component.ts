import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';

import { Calculation } from '../emissionmodule/calculation';
import { CalculationService } from '../_services/calculation.service';
import { TranslationManagerService } from '../_services/translation-manager.service';
import { DiagramData, MenuService } from '../shared';
import { BarDiagramComponent } from './bar-diagram/bar-diagram.component';

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
			this.data = this.calculation.modules.map((mod) => ({ name: this.translationManager.getTranslation(translations, "modules." + mod.id), value: Math.floor(mod.calculate() * 100) / 100 }));
		});
	}

	openBarDialog() {
		this.dialog.open(BarDiagramComponent, { data: this.data });
	}

	openPieDialog() {

	}
	
	openTreeDialog() {

	}
}
