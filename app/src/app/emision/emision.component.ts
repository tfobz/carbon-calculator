import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './emision.component.html',
  styleUrls: ['./emision.component.scss']
})
export class EmisionComponent {

  //TESTING
  @Input() calculations: string[] = ["Testing", "LOL", "xD"];

  title : string = "Emisionen"; 

}
