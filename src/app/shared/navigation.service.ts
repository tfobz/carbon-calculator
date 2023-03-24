import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
/**
 * This is an Angular service that is used to manage navigation data
 */
@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  /**@ignore */
  constructor(){}
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
   * It is passed the value of "editDataDetails" as an initial value.
   */
  private messageSource = new BehaviorSubject(this.editDataDetails);
  /**
   * "currentMessage" is a public property that is an observable of the "messageSource" property.
   *  It can be subscribed to in order to receive updates when the value of "messageSource" changes.
   */
  currentMessage = this.messageSource.asObservable();
  /**
   * The method takes in a single parameter "message" which is a string. Inside the method,
   * the "next" method of the "messageSource" property is called and passed the "message" parameter.
   * This updates the value of "messageSource" to the new "message" value and emits the new value
   * to any subscribers of the "currentMessage" observable. This allows other parts of the
   * application to be notified of changes to the navigation data and respond accordingly.
   * @param message
   */
  changeMessage(message: string) {

   this.messageSource.next(message)

  }

}
