import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ui',
  templateUrl: './ui.component.html',
  styleUrls: ['./ui.component.scss']
})
export class UiComponent implements OnInit {

  public title: String = "Emissionen";
  public back: String = "";

  constructor() { }

  ngOnInit(): void {
  }

}
