import { Component, OnInit, Input } from '@angular/core';
import type { DiagramData } from '../../shared';

interface Tree {
	position: { x: number, y: number },
	size: number
}

@Component({
  selector: 'app-tree-diagram',
  templateUrl: './tree-diagram.component.html',
  styleUrls: ['./tree-diagram.component.scss']
})
export class TreeDiagramComponent implements OnInit {
	public trees: Tree[] = [];

	@Input()
	public set data(diagramData: DiagramData[]) {
		const co2sum = diagramData.reduce((sum, current) => sum + current.value, 0);
		const requiredTrees = Math.ceil(co2sum / 31.5);
		const size = Math.min(10 / Math.log10(requiredTrees), 10);

		for(let i = 0; i < requiredTrees; i++) {
			this.trees.push({
				position: {
					x: Math.round(Math.random() * 90 + 5),
					y: Math.round(Math.random() * 90 + 5) 
				},
				size
			});
		}
	}

	constructor() { }

	ngOnInit(): void {
	}

}
