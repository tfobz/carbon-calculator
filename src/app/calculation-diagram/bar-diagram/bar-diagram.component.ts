import { Component, OnInit, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import type { EChartsOption } from 'echarts';
import { TranslationManagerService } from 'src/app/_services/translation-manager.service';
import type { DiagramData } from '../../shared';

@Component({
  selector: 'app-bar-diagram',
  templateUrl: './bar-diagram.component.html',
  styleUrls: ['./bar-diagram.component.scss']
})
export class BarDiagramComponent implements OnInit {

	@Input()
	public set data(diagramData: DiagramData[]) {
		let name = [];
		let val = [];
		for(let pair of diagramData) {
			name.push(pair.name);
			val.push(pair.value);
		}
		this.merge = {
			xAxis: {
				data: name,
			},
			series: {
				data: val,
			}
		};
	}

	options: EChartsOption = {
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

	merge: EChartsOption = {
		xAxis: {
			data: [],
		},
		series: {
			data: [],
		}
	}

	constructor(
		private translateService: TranslateService,
		private translationManager: TranslationManagerService,
	) { }

	ngOnInit(): void {
	}
}
