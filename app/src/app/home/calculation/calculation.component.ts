import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-calculation',
  templateUrl: './calculation.component.html',
  styleUrls: ['./calculation.component.scss']
})
export class CalculationComponent {

  @Input() name: String = "";  
  @Input() emission: number = 0;

}
