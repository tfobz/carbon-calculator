import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ui',
  templateUrl: './ui.component.html',
  styleUrls: ['./ui.component.scss']
})
export class UiComponent implements OnInit {

  public emissions: String = "Emissionen";

  constructor() { }

  ngOnInit(): void {
  }

}
