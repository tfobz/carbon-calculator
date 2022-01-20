import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

export interface MenuPoint{
  //angular material icon name
  icon:string;
  menuPointName:string;
  link:string;

}

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(){}
  
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
