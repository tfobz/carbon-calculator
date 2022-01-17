import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavigationService } from '../shared/navigation.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit{
  
  title: String = "";
  back: String = "/";

  constructor(private route: ActivatedRoute, private navigation:NavigationService){}

  ngOnInit(): void {

   this.navigation.currentMessage.subscribe(params=>{

    this.title = params

  });

  }


}
