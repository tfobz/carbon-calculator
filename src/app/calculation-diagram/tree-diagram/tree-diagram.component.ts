import { Component, OnInit, Input } from '@angular/core';
import type { DiagramData } from '../../shared';

/**
 * Defines a simple "tree" which will then be duplicated in the diagramm
 */
interface Tree {
	position: { x: number, y: number },
	size: number
}

@Component({
  selector: 'app-tree-diagram',
  templateUrl: './tree-diagram.component.html',
  styleUrls: ['./tree-diagram.component.scss']
})

/**
 * This diagramm showcses how many trees one should plant to equivalent the amount of CO2 produced
 * The amount is then showcased graphically with trees and a big black number over it
 */
export class TreeDiagramComponent implements OnInit {
	public trees: Tree[] = [];
	public requiredTrees: number = 0;

	/**
	 * Sets the data of the diagramm, this is then used to calculate the amount of trees needed
	 * @param {DiagramData} diagramData Data to import into the diagram
	 */
	@Input()
	public set data(diagramData: DiagramData[]) {
		// Gets the amount of CO2 produced
		const co2sum = diagramData.reduce((sum, current) => sum + current.value, 0);
		// Calculates the amount of required trees
		this.requiredTrees = Math.ceil(co2sum / 31.5);
		const requiredTrees = Math.min(Math.max(this.requiredTrees / 100, 0), 500);
		
		// Adds the trees to the diagramm
		this.trees = [];
		for(let i = 0; i < requiredTrees; i++) {
			const size = Math.min(Math.max(19 / Math.log10(requiredTrees) + (Math.random() * 3 - 1.5), 3), 8);
			this.trees.push({
				// Sets the position of each tree individually
				position: {
					x: Math.round(Math.random() * 90 + 5),
					y: Math.min(Math.max(Math.round(Math.random() * 85), 30), 100 )
				},
				size
			});
		}
	}

	constructor() { }

	ngOnInit(): void {
	}

}
