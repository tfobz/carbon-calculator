import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
import { MenuPoint, MenuService } from '../shared/menu.service';
import { NavigationService } from '../shared/navigation.service';
/**
 * This component is responsible for displaying a navigation bar at the top of the application,
 * which includes a back button, a logo, and a menu.
 */
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})

export class NavigationComponent implements OnInit{
  /** title property is used to display the title of the current page   */
  maintitle: string = "CF Train in VET - Carbon Footprint Calculator";
  title: string = "";
  /** back property is used to determine whether the back button should be displayed or not */
  back: string = "";
  /** menuPoints property is used to determine which menu items should be displayed in the menu */
  menuPoints!: MenuPoint[];
  /**
   *  It subscribes to the events emitted by the router service and listens for a NavigationEnd
   *  event. When a NavigationEnd event is emitted, the code checks the length of the URL split
   *  by the '/' character. If the length is greater than 2, it sets the back property to the
   *  substring of the URL up to the last occurrence of '/'. This will effectively remove the
   *  last segment of the URL and give the previous page. If the length is not greater than 2,
   *  it sets the back property to an empty string. This indicates that there is no previous page,
   *  and the back button should not be visible in the UI.
   * @param router
   * @param navigation
   * @param menuService
   */
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
  /**
   *This code defines a function handleClick that takes a menuPoint object as a parameter. The
    function first checks if the onClick property of the menuPoint object is not null. If it
    is not null, it calls the function stored in the onClick property.Then it checks if the
    link property of the menuPoint object is not null. If it is not null, it uses the router.navigate
    method to navigate to the route specified in the link property. It is called when the user
    clicks on a menu item, this function gets called and based on whether onClick and link
    properties are null or not, it either calls the callback function or navigate to the specified
    link. This allows you to navigate to different pages or execute some logic when the menu point
    is clicked.
   * @param menuPoint
   */
  handleClick(menuPoint: MenuPoint){
  	  if(menuPoint.onClick != null){
		  menuPoint.onClick();
	  }
	  if(menuPoint.link != null){
      console.log(menuPoint.link);
	  	this.router.navigate([ menuPoint.link ]);

	  }
  }
  /**
   * In this ngOnInit method, the component subscribes to two observables: currentMessage of
   * navigation service and currentMenu of menuService. It assigns the value emitted by
   * currentMessage observable to the title property and the value emitted by currentMenu
   * observable to the menuPoints property.
   */
  ngOnInit(): void {

    this.navigation.currentMessage.subscribe(params=>{
      this.maintitle = "CF Train in VET - Carbon Footprint Calculator - ";
      this.title = params;
    });
    this.menuService.currentMenu.subscribe(menu => this.menuPoints = menu);
  }
}
