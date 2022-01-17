import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavigationService } from '../shared/navigation.service';



@Component({
  selector: 'app-calculation-list',
  templateUrl: './calculation-list.component.html',
  styleUrls: ['./calculation-list.component.scss']
})
export class CalculationListComponent implements OnInit{

  title!:string;

  //TESTING
  names:string[]=["Heizung", "Elektrizität"];
  values: string[] = ["300 m2;2", "500 W;4", "700 KW;6"];
  

  constructor(private route:ActivatedRoute,private navigation:NavigationService){}

  ngOnInit(): void {

    this.route.params.subscribe(params=>{

      this.navigation.changeMessage(params?.title);

    })
  }

}
