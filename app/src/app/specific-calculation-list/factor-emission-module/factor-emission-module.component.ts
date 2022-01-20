import { Component, Input, OnInit } from '@angular/core';
import { FactorEmissionModule } from 'src/app/emissionmodule/emission-module';
import { CalculationService } from 'src/app/_services/calculation.service';

@Component({
  selector: 'app-factor-emission-module',
  templateUrl: './factor-emission-module.component.html',
  styleUrls: ['./factor-emission-module.component.scss']
})
export class FactorEmissionModuleComponent implements OnInit {

  @Input() module!:FactorEmissionModule;

  constructor(private calculationService:CalculationService) { }

  ngOnInit(): void {
  }
  save(){
    this.calculationService.save();
  }
}
