import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';



/**
 * This is an Angular component that is used to display an individual emission calculation.
 */
@Component({
  selector: 'app-emission-item',
  templateUrl: './emission-item.component.html',
  styleUrls: ['./emission-item.component.scss']
})
export class EmissionItemComponent {

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
  /**
   * "deleteItself" is an EventEmitter that emits a string. It's marked as Output,
   * which means it can be passed from the parent component as output.
   * It's used in the selfdestroy() method.
   * It emits the name of the item that should be deleted.
   */
  @Output() deleteItself = new EventEmitter<string>();

  /**
   * It inports the country name from the parent component.
   */
  @Input() factor_preset: string = "";


  /**
   * It emits the name of the item that should be deleted.
   */
  selfdestroy() {
    this.deleteItself.emit(this.name);
  }
}

