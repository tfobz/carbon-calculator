import { Component, OnInit, Input } from '@angular/core';
import type { EChartsOption } from 'echarts';
import type { DiagramData } from '../../shared';

/**
 * Defines the Pie diagramm. This diagram showcases the amount of CO2 each entry produces, but in a pie
 * form. It is especially useful to showcase which entry produces more or less CO2 compared to all others.
 */
@Component({
  selector: 'app-pie-diagram',
  templateUrl: './pie-diagram.component.html',
  styleUrls: ['./pie-diagram.component.scss']
})

export class PieDiagramComponent implements OnInit {

	/**
	 * Imports data for the diagram from somewhere
	 * @param {DiagramData} diagramData The data to import
	 */
	@Input()
	public set data(diagramData: DiagramData[]) {
		this.merge = {
			series: {
				data: diagramData.sort((a, b) => a.value - b.value),
			}
		};
	}

	/**
	 * Same as the bar-diagramm, this showcases styling options for the diagramm,
	 * this could also be set in an external styling file, like CSS
	 */
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
  /**
   * specifies the data to be displayed in the pie chart.
   */
	merge: EChartsOption = {
		series: {
			data: [],
		}
	}
  /** @ignore */
	constructor() { }
  /** @ignore */
	ngOnInit(): void {
	}
}
