import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../shared/navigation.service';


@Component({
  selector: 'app-emission-list',
  templateUrl: './emission-list.component.html',
  styleUrls: ['./emission-list.component.scss']
})
export class EmissionListComponent implements OnInit{

  //TESTING
  calculations: string[] = ["Testing", "LOL", "xD"];


  constructor(private navigation:NavigationService){}

  ngOnInit(): void {
      
    this.navigation.changeMessage("Emission");

  }


}
