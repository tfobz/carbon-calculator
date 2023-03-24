import { Component, OnInit, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import type { EChartsOption } from 'echarts';
import { TranslationManagerService } from 'src/app/_services/translation-manager.service';
import type { DiagramData } from '../../shared';
/**
 * Defines the bar-diagramm and its purpose is to showcase how much CO2 each module creates.
 * It especially also shows the value on the y-axis and each bar has a specific place on the x-axis
 */
@Component({
  selector: 'app-bar-diagram',
  templateUrl: './bar-diagram.component.html',
  styleUrls: ['./bar-diagram.component.scss']
})

export class BarDiagramComponent implements OnInit {

	/**
	 * A function to import data and display it on the diagram
	 * @param {DiagramData} diagramData Data to be set on the diagramm
	 */
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

	/**
   * The options variable is an instance of the EChartsOption class, which is a class provided by
   * the ECharts library to configure chart options. It sets the color of the chart, the tooltip,
   * grid and axis properties of the chart. xAxis and yAxis are objects that define the x and y
   * axis of the chart respectively. series is an array of objects that define the data that will
   * be displayed on the chart.
   * */
	options: EChartsOption = {
		// One could also save this in an external stylesheet
		// TODO: Test reading the values below from a stylesheet
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
  /**
   * The merge variable is also an instance of the EChartsOption class, it is used to merge new
   * data into the options variable. It updates the data property of xAxis and series in options
   * variable.
   */
	merge: EChartsOption = {
		xAxis: {
			data: [],
		},
		series: {
			data: [],
		}
	}
  /** Injects required Services */
	constructor(
		private translateService: TranslateService,
		private translationManager: TranslationManagerService,
	) { }

	/**
	 * DEfines what happens on creation of this component, in this case nothing happens
	 * @returns void
	 */
	ngOnInit(): void {
	}
}
