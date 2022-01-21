import { Injectable } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';

export interface MenuPoint{
  //angular material icon name
  icon:string;
  menuPointName:string;
  link:string;
  onClick?: () => void ;
}

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(
    private _router: Router
  ){
    this._router.events.subscribe(event => {
      if(event instanceof NavigationStart){
        this.changeMenu([]);
      }
    });
  }
  
  public editDataDetails: any = [];

  public subject = new Subject<any>();

  private messageSource = new BehaviorSubject(this.editDataDetails);

  private _currentMenu = this.messageSource.asObservable();

  get currentMenu(){

    return this._currentMenu;

  }

  changeMenu(message: MenuPoint[]) {
   this.messageSource.next(message)
  }
}
