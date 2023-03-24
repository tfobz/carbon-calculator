import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { CalculationService } from '../../_services/calculation.service';




/**
 * This is an Angular component that is used to display an individual emission calculation.
 */
@Component({
  selector: 'app-emission-item',
  templateUrl: './emission-item.component.html',
  styleUrls: ['./emission-item.component.scss']
})
export class EmissionItemComponent {
  constructor(private calculationService: CalculationService){}

  /**
   * "link" is an array of strings that represents the link of the item. It's marked as Input,
   * which means it can be passed from the parent component as input. It also has a Default value,
   * so if it's not passed from the parent component it will take this default value
   */
  @Input() link: string[] = [ "/emission" ];
  /**
   * "name" is a string that represents the name of the item. It's marked as Input,
   *  which means it can be passed from the parent component as input.
   */
  @Input() name!: string;
  /**
   * "emission" is a number that represents the emission of the item. It's marked as Input,
   * which means it can be passed from the parent component as input. It also has a Default value,
   * so if it's not passed from the parent component it will take this default value
   */
  @Input() emission: number = 0;

  @Output() deleteItself = new EventEmitter<string>();


  @Input() factor_preset: string = "";



  selfdestroy() {
    this.deleteItself.emit(this.name);
  }
}

