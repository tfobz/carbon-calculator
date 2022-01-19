import { Component, OnInit, Input } from '@angular/core';
import type { EChartsOption } from 'echarts';
import type { DiagramDataCompare } from '../../shared';

@Component({
  selector: 'app-bar-diagram-both',
  templateUrl: './bar-diagram-both.component.html',
  styleUrls: ['./bar-diagram-both.component.scss']
})
export class BarDiagramBothComponent implements OnInit {
	@Input()
	public set data(diagramData: DiagramDataCompare) {
		let names = [];
		let data: { one: number[], two: number[] } = { one: [], two: [] };

		for(let d1 of diagramData.one) {
			names.push(d1.name);
			data.one.push(d1.value);
			for(let d2 of diagramData.two) {
				if(d1.name !== d2.name) continue;
				data.two.push(d2.value);
				break;
			}
		}

		this.merge = {
			xAxis: {
				data: names
			},
			series: [{
				data: data.one
			},{
				data: data.two
			}]
		};
	}

	options: EChartsOption = {
	  tooltip: {
		trigger: 'axis'
	  },
	  toolbox: {
		show: true,
	  },
	  calculable: true,
	  xAxis: {
		  type: 'category',
		  data: []
	  },
	  yAxis: {
		  type: 'value'
	  },
	  series: [
		{
		  name: 'kg CO²',
		  type: 'bar',
		  data: [],
		  markLine: {
			data: [{ type: 'average', name: 'Avg' }]
		  }
		},
		{
		  name: 'kg CO²',
		  type: 'bar',
		  data: [],
		  markLine: {
			data: [{ type: 'average', name: 'Avg' }]
		  }
		}
	  ]
	};

	merge: EChartsOption = {
		xAxis: {
			data: []
		},
		series: [{
			data: []
		}]
	};

	constructor() { }

	ngOnInit(): void {
	}
}
