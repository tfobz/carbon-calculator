import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculation-card',
  templateUrl: './calculation-card.component.html',
  styleUrls: ['./calculation-card.component.scss']
})
export class CalculationCardComponent implements OnInit {

    @Input() 
    title!:string;
    
    @Input()
    values!:string[];
    
  ngOnInit(): void {
  }

}
