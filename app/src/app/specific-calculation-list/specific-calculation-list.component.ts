import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavigationService } from '../shared/navigation.service';

@Component({
  selector: 'app-specific-calculation-list',
  templateUrl: './specific-calculation-list.component.html',
  styleUrls: ['./specific-calculation-list.component.scss']
})
export class SpecificCalculationListComponent implements OnInit {

  names:string[]=["Wasserkraft", "Atomkraft"];
  values: string[] = ["300 W;2", "500 W;4", "700 KW;6"];
  

  constructor(private route:ActivatedRoute,private navigation:NavigationService){}

  ngOnInit(): void {

    this.route.params.subscribe(params=>{

      this.navigation.changeMessage(params?.sptitel);

    })
  }
}
