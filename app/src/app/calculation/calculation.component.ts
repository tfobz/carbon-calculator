import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-calculation',
  templateUrl: './calculation.component.html',
  styleUrls: ['./calculation.component.scss']
})
export class CalculationComponent implements OnInit{

  title!:string;

  //TESTING
  names:string[]=["Heizung", "Elektrizität"];
  values: string[] = ["300 m2;2", "500 W;4", "700 KW;6"];
  

  constructor(private route: ActivatedRoute){}

  ngOnInit(): void {

    let tilte;

    this.route.paramMap.subscribe(params => {

      tilte = params.get('title');

      if(tilte!=null){

        this.title = tilte;

      }

    });

    console.log(this.title);

  }

 


}
