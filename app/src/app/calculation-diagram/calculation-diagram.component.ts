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

	isLoading = false;

	//chartLoading: boolean = true;
	chartOptions: EChartsOption = {
			//TODO: read from stylesheet?
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
			xAxis: {
				type: 'category',
				data: [],
				axisTick: {
				  alignWithLabel: true
				}
			},
			yAxis: {
				type: 'value'
			},
			series: [{
				name: 'Counters',
				type: 'bar',
				barWidth: '60%',
				data: []
			}]
		};
	
	chartUpdateOptions: EChartsOption = {
		isLoading: true,
		xAxis: {
			data: [],
		},
		series: {
			data: [],
		}
	}

	constructor(
		private calculationService: CalculationService,
		private activatedRoute: ActivatedRoute
	) {
	}

	ngOnInit(): void {}

	onChartInit() {
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
			this.chartUpdateOptions = {
				xAxis: {
					data: [],
				},
				series: {
					data: [],
				}
			};
			return;
		}

		//TODO: case for 0 len
		let names = [];
		let data = [];
		for(let module of this.calculation.modules) {
			names.push(module.id);
			data.push(module.calculate());
		}

		this.isLoading = false;
		this.chartUpdateOptions = {
			xAxis: {
				data: names,
			},
			series: {
				data: data,
			}
		};
	}
}
