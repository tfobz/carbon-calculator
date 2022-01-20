import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModuleType } from 'src/app/emissionmodule/emission-module';
import { MobilityEmissionModule } from 'src/app/emissionmodule/impl/transport/mobility/mobility_emission-module';
import { ElectricityEmissionModule } from '../../emissionmodule/impl/electricity/electricity_emission-module';

interface TypeData{
  type: ModuleType,
  number: number
}

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
      this.currentUrl="/emission/" + params.title +"/"+params.sptitle;
    });
  }

  getData(): TypeData[]{
    let ret: TypeData[] = [];
    if(this.module)
      for(const [type, number] of this.module.data){
        ret.push({ type: type, number: number });
      }
    return ret;
  }

}
