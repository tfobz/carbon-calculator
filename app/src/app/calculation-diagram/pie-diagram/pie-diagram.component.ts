import { Component, OnInit, Input } from '@angular/core';
import type { EChartsOption } from 'echarts';
import type { DiagramData } from '../shared';

@Component({
  selector: 'app-pie-diagram',
  templateUrl: './pie-diagram.component.html',
  styleUrls: ['./pie-diagram.component.scss']
})
export class PieDiagramComponent implements OnInit {

	@Input()
	public set data(diagramData: DiagramData[]) {
		this.merge = {
			series: {
				data: diagramData.sort((a, b) => a.value - b.value),
			}
		};
	}

	options: EChartsOption = {
	  tooltip: {
		trigger: 'item'
	  },
	  legend: {
		top: '5%',
		left: 'center'
	  },
	  series: {
		  type: 'pie',
		  radius: ['40%', '70%'],
		  avoidLabelOverlap: false,
		  itemStyle: {
			borderRadius: 10,
			borderColor: '#fff',
			borderWidth: 2
		  },
		  label: {
			show: false,
			position: 'center'
		  },
		  emphasis: {
			label: {
			  show: false,
			  fontSize: '12',
			  fontWeight: 'bold'
			}
		  },
		  labelLine: {
			show: false
		  },
		  data: []
		}
	};

	merge: EChartsOption = {
		series: {
			data: [],
		}
	}

	constructor() { }

	ngOnInit(): void {
	}
}
