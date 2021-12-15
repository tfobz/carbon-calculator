import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-emission-calculation',
  templateUrl: './emission-calculation.component.html',
  styleUrls: ['./emission-calculation.component.scss']
})
export class EmissionCalculationComponent {

  @Input() name!: string;  
  @Input() emission: number = 0;

}
