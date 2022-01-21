import { generateId } from "../shared/utils";
import { EmissionModule } from "./emission-module";
import EmissionsManager from "./emissions_manager";

export class Calculation{
    private _id: string = "";
    public modules: EmissionModule[] = [];

    constructor(public name: string){ this._id = generateId(); }

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
        return { id: this.id, name: this.name, modules: modules_obj }
    }

    removeModule(module: EmissionModule){
        const index = this.modules.indexOf(module);
        if(index === -1) return;
        this.modules.splice(index, 1);
    }

    public static load(data: any): Calculation{
        let ret: Calculation = new Calculation("");

        if(data === undefined) throw new Error("Data is undefined");
        ret._id = data.id != null ? data.id : generateId();
        if(data.name) ret.name = data.name;
        if(data.modules){
            if(data.modules instanceof Array){
                data.modules.forEach((moduleData: any) => {
                    let module = EmissionsManager.load(moduleData);
                    if(module === undefined) return;
                    ret.modules.push(module);
                });
            }
        }
        return ret;
    }

    get id(): string{
        return this._id;
    }

}
