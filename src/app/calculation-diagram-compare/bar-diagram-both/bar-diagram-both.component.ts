import { Component, OnInit, Input } from '@angular/core';
import type { EChartsOption } from 'echarts';
import type { DiagramDataCompare } from '../../shared';
/**
 * This angular component is used to create a bar chart for comparing data from two sources
 */
@Component({
  selector: 'app-bar-diagram-both',
  templateUrl: './bar-diagram-both.component.html',
  styleUrls: ['./bar-diagram-both.component.scss']
})
export class BarDiagramBothComponent {
  /**
   * The set data() method processes the input data and prepares it for display.
   * It extracts the names and values of the data points for each set, and creates
   * a data object containing two arrays (one and two) with the respective values. The names of the data points are stored in the names array.
   */
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
  /**
   * The options property defines the default configuration for the chart.
   */
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
  /**
   * The merge property is used to merge the default options with the input data.
   * It is initialized with an empty object.
   */
	merge: EChartsOption = {
		xAxis: {
			data: []
		},
		series: [{
			data: []
		}]
	};


}
