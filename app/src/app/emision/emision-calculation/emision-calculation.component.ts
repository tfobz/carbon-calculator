import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-emision-calculation',
  templateUrl: './emision-calculation.component.html',
  styleUrls: ['./emision-calculation.component.scss']
})
export class EmisionCalculationComponent {

  @Input() name!: string;  
  @Input() emission: number = 0;

}
