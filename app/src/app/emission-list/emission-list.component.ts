import { Component } from '@angular/core';


@Component({
  selector: 'app-emission-list',
  templateUrl: './emission-list.component.html',
  styleUrls: ['./emission-list.component.scss']
})
export class EmissionListComponent {

  //TESTING
  calculations: string[] = ["Testing", "LOL", "xD"];

  title : string = "Emissions"; 

}
