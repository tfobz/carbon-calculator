import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

export interface menuPoint{

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

  currentMenu = this.messageSource.asObservable();

  changeMenu(message: menuPoint[]) {

   this.messageSource.next(message)

  }
}
