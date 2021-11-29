import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { SharedDataService } from "../../shared/shared-data-service";


@Component({
  selector: 'app-emision-calculation',
  templateUrl: './emision-calculation.component.html',
  styleUrls: ['./emision-calculation.component.scss']
})
export class EmisionCalculationComponent {

  @Input() name: string = "";  
  @Input() emission: number = 0;

  titleForSibling:string = "";
  subscription: Subscription = new Subscription;

  constructor(private data: SharedDataService){}

  ngOnInit(): void {

    this.subscription = this.data.currentMessage.subscribe(newTitle => this.titleForSibling = newTitle);

  }

  ngOnDestroy():void {

    this.subscription.unsubscribe();

  }

  setTitleForSibling(titleForSibling:string){

    this.titleForSibling = titleForSibling;
    this.data.changeMessage(titleForSibling);

  }

}
