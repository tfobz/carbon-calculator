import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SharedDataService } from "../shared/shared-data-service";

@Component({
  selector: 'app-calculation',
  templateUrl: './calculation.component.html',
  styleUrls: ['./calculation.component.scss']
})
export class CalculationComponent implements OnInit, OnDestroy{

  title:string = "";
  subscription: Subscription = new Subscription;

  constructor(private data: SharedDataService) { }

  ngOnInit(): void {

    this.subscription = this.data.currentMessage.subscribe(title => this.title = title)

  }

  ngOnDestroy(): void {
    
    this.subscription.unsubscribe();

  }

  

}
