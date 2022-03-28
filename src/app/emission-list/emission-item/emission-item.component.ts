import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-emission-item',
  templateUrl: './emission-item.component.html',
  styleUrls: ['./emission-item.component.scss']
})
export class EmissionItemComponent{
  @Input() link: string[] = [ "/emission" ];
  @Input() name!: string;  
  @Input() emission: number = 0;
}
