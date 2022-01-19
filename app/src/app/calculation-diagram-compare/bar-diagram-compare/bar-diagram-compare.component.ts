import { Component, OnInit, Input } from '@angular/core';
import type { EChartsOption } from 'echarts';
import type { DiagramDataCompare } from '../../shared';

@Component({
  selector: 'app-bar-diagram-compare',
  templateUrl: './bar-diagram-compare.component.html',
  styleUrls: ['./bar-diagram-compare.component.scss']
})
export class BarDiagramCompareComponent implements OnInit {
	@Input()
	public set data(diagramData: DiagramDataCompare) {
		let names = [];
		let data = [];

		for(let d1 of diagramData.one) {
			for(let d2 of diagramData.two) {
				if(d1.name !== d2.name) continue;
				data.push({value: d1.value - d2.value, label: { position: "right" }});
				names.push(d1.name);
				break;
			}
		}

		this.merge = {
			yAxis: {
				data: names
			},
			series: {
				data
			}
		};
	}

	options: EChartsOption = {
	  tooltip: {
		trigger: 'axis',
		axisPointer: {
		  type: 'shadow'
		}
	  },
	  grid: {
		top: 80,
		bottom: 30
	  },
	  xAxis: {
		type: 'value',
		position: 'top',
		splitLine: {
		  lineStyle: {
			type: 'dashed'
		  }
		}
	  },
	  yAxis: {
		type: 'category',
		axisLine: { show: false },
		axisLabel: { show: false },
		axisTick: { show: false },
		splitLine: { show: false },
		data: []
	  },
	  series: {
		  name: 'kg CO²',
		  type: 'bar',
		  stack: 'Total',
		  label: {
			show: true,
			formatter: '{b}'
		  },
		  data: []
		}
	};

	merge: EChartsOption = {
		yAxis: {
			data: []
		},
		series: {
			data: []
		}
	};

	constructor() { }

	ngOnInit(): void {
	}
}
