import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModuleType } from 'src/app/emissionmodule/emission-module';
import { MobilityEmissionModule } from 'src/app/emissionmodule/impl/transport/mobility/mobility_emission-module';
import { ElectricityEmissionModule } from '../../emissionmodule/impl/electricity/electricity_emission-module';

@Component({
  selector: 'app-type-emission-module',
  templateUrl: './type-emission-module.component.html',
  styleUrls: ['./type-emission-module.component.scss']
})
export class TypeEmissionModuleComponent implements OnInit {

  @Input() module!: ElectricityEmissionModule | MobilityEmissionModule | undefined;
  public currentUrl!:string;

  constructor(private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      this.currentUrl="/emission/" + params.id +"/"+params.sptitle;
    });
  }

  getData(): Map<ModuleType, number> | undefined{
    return this.module?.data;
  }
}
