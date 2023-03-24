/**
 * The FactorManager class is a utility class that allows for the registration and retrieval of
 * factors for certain emissions types
 */
export class FactorManager {
    /**
    * is used to store the factors. Each factor is a key-value pair, where the key is a string
    * and the value is a number. The Map object is a simple key-value map where keys are unique
    */
    private _factors: Map<string, number> = new Map();

    /**
     * Allows for the addition of a new factor to the manager
     * @param type key
     * @param factor value
     */
    register(type: string, factor: number): void{
        this._factors.set(type, factor);
    }
    /**
     * Retrieves the factor for a specific type
     * @param type key
     * @returns specific factor
     */
    get(type: string): number{
        if(!this._factors.has(type)) return 0;
        const factor = this._factors.get(type);
        return factor ? factor : 0;
    }
    /**
     * returns the whole map of Factors
     */
    get factors(): Map<string, number>{
        return this._factors;
    }
    /**
     * converts the map of factors into an array of arrays, where each inner array
     * contains the type and factor
     * @returns array of Factors
     */
    save(): any[]{
        let list: any[] = [];
        this._factors.forEach((value: number, key: string) => {
            list.push([ key, value ]);
        });
        return list;
    }
    /**
     * converts the array back into a map, and creates a new instance of the FactorManager class.
     * @param data factors
     * @returns new instance of FactorManager
     */
    static load(data: any): FactorManager{
        const factorManager = new FactorManager();
        data.forEach((row: any) => {
            factorManager.register(row[0], row[1]);
        })
        return factorManager;
    }
}
