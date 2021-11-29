import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.scss']
})
export class HeadComponent {

  @Input() title: String = "";
  @Input() back: String = "";

}
