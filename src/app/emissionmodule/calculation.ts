import { generateId } from "../shared/utils";
import { EmissionModule } from "./emission-module";
import EmissionsManager from "./emissions_manager";
import { FactorManager } from "./factor-manager";
import { FactorProvider, PRESET_FACTORS_LIST } from "./factor_provider";

export class Calculation{
    private _id: string = "";
    public modules: EmissionModule[] = [];
    public factorManager: FactorManager = new FactorManager();

    constructor(public name: string){ this._id = generateId(); }

    calculate(): number{
        let sum: number = 0;
        for(let module of this.modules){
            sum += module.calculate(this.factorManager);
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
        let factors_obj = this.factorManager.save();
        return { id: this.id, name: this.name, modules: modules_obj, factors: factors_obj }
    }

	getModule(id: string): EmissionModule | undefined{
		return this.modules.find(module => module.id == id);
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
        if(data.factors){
            ret.factorManager = FactorManager.load(data.factors);
        }else{
            ret.factorManager = FactorProvider.get(PRESET_FACTORS_LIST[0]);
        }
        return ret;
    }

    get id(): string{
        return this._id;
    }

}
