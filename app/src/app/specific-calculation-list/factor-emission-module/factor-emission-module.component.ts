import { Component, Input, OnInit } from '@angular/core';
import { FactorEmissionModule } from 'src/app/emissionmodule/emission-module';

@Component({
  selector: 'app-factor-emission-module',
  templateUrl: './factor-emission-module.component.html',
  styleUrls: ['./factor-emission-module.component.scss']
})
export class FactorEmissionModuleComponent implements OnInit {

  @Input() module!:FactorEmissionModule;

  constructor() { }

  ngOnInit(): void {
  }

}
