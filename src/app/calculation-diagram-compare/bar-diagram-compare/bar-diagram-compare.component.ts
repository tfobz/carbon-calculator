import { Component, OnInit, Input } from '@angular/core';
import type { EChartsOption } from 'echarts';
import type { DiagramDataCompare } from '../../shared';
/**
 * This angular component is used to create a bar chart for comparing data from two sources
 */
@Component({
  selector: 'app-bar-diagram-compare',
  templateUrl: './bar-diagram-compare.component.html',
  styleUrls: ['./bar-diagram-compare.component.scss']
})
export class BarDiagramCompareComponent {
  /**using @Input() decorator it takes in a property called data of type DiagramDataCompare */
	@Input()
  /**
   * In the set data() method, it first initializes two arrays, names and data.
   * Then it loops through diagramData.one and diagramData.two, and if the name property of the
   * two objects is not the same, it continues to the next iteration of the loop. Otherwise, it
   * calculates the difference between the value properties of the two objects, formats the value
   *  to two decimal places using Math.floor((d1.value - d2.value) * 100) / 100, and pushes the
   * result object into the data array. It also adds the name to the names array. Finally, it sets
   * the merge property to an object containing the yAxis and series properties of an EChartsOption
   * object. The yAxis property is set to an array of the names, and the series property is set to an array of the data.
   */
	public set data(diagramData: DiagramDataCompare) {
		let names = [];
		let data = [];

		for(let d1 of diagramData.one) {
			for(let d2 of diagramData.two) {
				if(d1.name !== d2.name) continue;
				data.push({value: Math.floor((d1.value - d2.value) * 100) / 100, label: { position: "right" }});
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
/**
   * It initializes an EChartsOption object called options with default options for the bar chart.
   */
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
  /**
   * It initializes an EChartsOption object called merge, it will be used to merge with the default options when the data property is set.
   */
	merge: EChartsOption = {
		yAxis: {
			data: []
		},
		series: {
			data: []
		}
	};

}
