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
	public requiredTrees: number = 0;

	@Input()
	public set data(diagramData: DiagramData[]) {
		const co2sum = diagramData.reduce((sum, current) => sum + current.value, 0);
		this.requiredTrees = Math.ceil(co2sum / 31.5);
		//this.requiredTrees = 10000;
		const requiredTrees = Math.min(Math.max(this.requiredTrees / 100, 0), 500);
		
		this.trees = [];
		for(let i = 0; i < requiredTrees; i++) {
			const size = Math.min(Math.max(19 / Math.log10(requiredTrees) + (Math.random() * 3 - 1.5), 3), 8);
			this.trees.push({
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
