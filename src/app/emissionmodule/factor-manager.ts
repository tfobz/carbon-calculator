export class FactorManager {
    private _factors: Map<string, number> = new Map();

    register(type: string, factor: number): void{
        this._factors.set(type, factor);
    }

    get(type: string): number{
        if(!this._factors.has(type)) return 0;
        const factor = this._factors.get(type);
        return factor ? factor : 0;
    }

    get factors(): Map<string, number>{
        return this._factors;
    }

    save(): any[]{
        let list: any[] = [];
        this._factors.forEach((value: number, key: string) => {
            list.push([ key, value ]);
        });
        return list;
    }

    static load(data: any): FactorManager{
        const factorManager = new FactorManager();
        data.forEach((row: any) => {
            factorManager.register(row[0], row[1]);
        })
        return factorManager;
    }
}