import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Calculation } from '../emissionmodule/calculation';
import { CalculationService } from '../_services/calculation.service';
import { DiagramData } from './shared';

@Component({
  selector: 'app-calculation-diagram',
  templateUrl: './calculation-diagram.component.html',
  styleUrls: ['./calculation-diagram.component.scss']
})
export class CalculationDiagramComponent implements OnInit {

	private calculation: Calculation | undefined;
	isLoading = false;
	data: DiagramData[] = [];

	constructor(
		private calculationService: CalculationService,
		private activatedRoute: ActivatedRoute
	) {
	}

	ngOnInit() {
		this.isLoading = true;

		this.activatedRoute.params.subscribe(params => {
			const title = params['title'] as unknown;
			if (typeof title !== "string") throw new Error("Title not of type string (this should not occur)");
			this.calculation = this.calculationService.getByName(title);
			this.loadChart();
		});
	}

	loadChart() {
		if(this.calculation == null) {
			this.isLoading = true;
			this.data = [];
			return;
		}

		//TODO: case for 0 len
		this.data = this.calculation.modules.map((mod) => ({ name: mod.id, value: mod.calculate() }));
		this.isLoading = false;
	}
}
