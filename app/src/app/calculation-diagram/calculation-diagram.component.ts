import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import type { EChartsOption } from 'echarts';

import { Calculation } from '../emissionmodule/calculation';
import { CalculationService } from '../_services/calculation.service';

@Component({
  selector: 'app-calculation-diagram',
  templateUrl: './calculation-diagram.component.html',
  styleUrls: ['./calculation-diagram.component.scss']
})
export class CalculationDiagramComponent implements OnInit {

	private calculation: Calculation | undefined;

	initOpts = {
		renderer: 'svg',
		width: 300,
		height: 300
	};

	options: EChartsOption = {
		color: ['#3398DB'],
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'shadow'
			}
		},
		grid: {
			left: '3%',
			right: '4%',
			bottom: '3%',
			containLabel: true
		},
		xAxis: [
			{
				type: 'category',
				data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
				axisTick: {
				  alignWithLabel: true
				}
			}
		],
		yAxis: [{
			type: 'value'
		}],
		series: [{
			name: 'Counters',
			type: 'bar',
			barWidth: '60%',
			data: [10, 52, 200, 334, 390, 330, 220]
		}]
	};

	constructor(
		private calculationService: CalculationService,
		private activatedRoute: ActivatedRoute
	) { }

	ngOnInit(): void {
		//TODO: error if not found and loading indication
		this.activatedRoute.params.subscribe(params => {
			const title = params['title'] as unknown;
			if (typeof title !== "string") throw new Error("Title not of type string (this should not occur)");
			this.calculation = this.calculationService.getByName(title);
		});
	}
}
