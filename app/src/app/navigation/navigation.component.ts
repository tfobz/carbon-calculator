import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
import { menuPoint, MenuService } from '../shared/menu.service';
import { NavigationService } from '../shared/navigation.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit{
  
  title: string = "";
  back: string = "";
  menuPoints!: menuPoint[];

  constructor(private router: Router, private navigation:NavigationService, private menuService:MenuService) {
    this.router.events.subscribe((e: Event) => {

      if(e instanceof NavigationEnd ){

        if(e.url.split("/").length>2)
          this.back = e.url.substring(0,e.url.lastIndexOf('/'));
        else
          this.back = "";

      }
    });
  }


  ngOnInit(): void {

    this.navigation.currentMessage.subscribe(params=>{

      this.title = params

    });
    this.menuService.currentMenu.subscribe(menu => this.menuPoints = menu);
  }
}
