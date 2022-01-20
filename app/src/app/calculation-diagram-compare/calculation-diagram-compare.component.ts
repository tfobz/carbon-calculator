import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { Calculation } from '../emissionmodule/calculation';
import { CalculationService } from '../_services/calculation.service';
import { TranslationManagerService } from '../_services/translation-manager.service';
import { DiagramDataCompare } from '../shared';

import { ResizedEvent } from 'angular-resize-event'; 

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
		private translationManager: TranslationManagerService
	) { }

	ngOnInit(): void {
		this.activatedRoute.params.subscribe(params => {
			const titleone = params['titleone'] as unknown;
			const titletwo = params['titletwo'] as unknown;
			if (typeof titleone !== "string" || typeof titletwo !== "string") throw new Error("Title not of type string (this should not occur)");
			this.titleOne = titleone;
			this.titleTwo = titletwo;

			this.calculationOne = this.calculationService.getByName(titleone);
			this.calculationTwo = this.calculationService.getByName(titletwo);
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
			const dataOne = this.calculationOne.modules.map((mod) => ({ name: this.translationManager.getTranslation(translations, "modules." + mod.id), value: Math.floor(mod.calculate() * 100) / 100 }));
			const dataTwo = this.calculationTwo.modules.map((mod) => ({ name: this.translationManager.getTranslation(translations, "modules." + mod.id), value: Math.floor(mod.calculate() * 100) / 100 }));

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

	onResize(event: ResizedEvent){
		if(event.newRect.width <= 500){
			this.displayedColumns = ["name", "dataone", "datatwo"];
		}else{
			this.displayedColumns = ["name", "dataone", "datatwo", "diff"];
		}
	}
}
