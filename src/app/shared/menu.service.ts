import { Injectable } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
/**
 * The "MenuPoint" interface defines the structure of the menu items.
 * Each menu point has an icon, a name and an optional link and onClick function.
 */
export interface MenuPoint{
  /** "icon" is a string that represents the name of the icon. */
  icon:string;
  /** "menuPointName" is a string that represents the name of the menu point. */
  menuPointName:string;
  /** "link" is an optional string that represents the link of the menu point. */
  link?:string;
  /** "onClick" is an optional function that will be executed when the menu point is clicked. */
  onClick?: () => void ;
}
/**
 * This is an Angular service that is used to manage the menu of the application
 */
@Injectable({
  providedIn: 'root'
})
export class MenuService {

  /**
   * The constructor of the class injects the Router service and subscribes to the router events
   * in order to listen for NavigationStart events, when NavigationStart event is fired the method
   * changeMenu is called with an empty array as the parameter.
   * @param _router
   */
  constructor(private _router: Router ){
    this._router.events.subscribe(event => {
      if(event instanceof NavigationStart){
        this.changeMenu([]);
      }
    });
  }
  /**
   * "editDataDetails" is a public property that is initialized as an empty array.
   *  It holds data that can be used for editing.
   */
  public editDataDetails: any = [];

  /**
   * "subject" is a public property that is initialized as a new Subject object.
   *  It is used to emit events.
   */
  public subject = new Subject<any>();

  /**
   * "messageSource" is a private property that is initialized as a new BehaviorSubject.
   *  It is passed the value of "editDataDetails" as an initial value.
   */
  private messageSource = new BehaviorSubject(this.editDataDetails);

  /**
   * "_currentMenu" is a private property that is an observable of the "messageSource" property.
   * It can be subscribed to in order to receive updates when the value of "messageSource" changes.
   */
  private _currentMenu = this.messageSource.asObservable();

  /**
   * get method that returns the property currentMenu
   * @return currentMenu
   */
  get currentMenu(){
    return this._currentMenu;
  }
  /**
   *The method takes in a single parameter "message" which is an array of "MenuPoint" interface.
    Inside the method, the "next" method of the "messageSource" property is called and passed the
   "message" parameter. This updates the value of "messageSource" to the new "message" value and
    emits the new value to any subscribers of the "currentMenu" observable. This allows other parts
    of the application to be notified of changes to the menu and respond accordingly.
   * @param message
   */
  changeMenu(message: MenuPoint[]) {
   this.messageSource.next(message)
  }
}
