import { EmissionModule } from "./emission-module";
import EmissionsManager from "./emissions_manager";

export class Calculation{
    public name: string = "";
    public modules: EmissionModule[] = [];

    constructor(name?: string){
        if(name) this.name = name;
    }

    calculate(): number{
        let sum: number = 0;
        for(let module of this.modules){
            sum += module.calculate();
        }
        return sum;
    }

    save(): any{
        let modules_obj = [];
        for(let module of this.modules){
            let obj = EmissionsManager.save(module);
            if(obj === undefined) continue;

            modules_obj.push(obj);
        }
        return { name: this.name, modules: modules_obj }
    }

    load(data: any): Calculation{
        if(data === undefined) return this;
        if(data.name) this.name = data.name;
        if(data.modules){
            if(data.modules instanceof Array){
                data.modules.forEach((moduleData: any) => {
                    let module = EmissionsManager.load(moduleData);
                    if(module === undefined) return;
                    this.modules.push(module);
                });
            }
        }
        return this;
    }

}