export class IsSyncSingleton {
    #isSync :boolean = true;
    static #instance : IsSyncSingleton;
    constructor() {
        
    }
    static get instance() : IsSyncSingleton{
        if (!IsSyncSingleton.#instance) {
            IsSyncSingleton.#instance = new IsSyncSingleton();
        }

        return IsSyncSingleton.#instance;
    }
    get isSync() : boolean{
        return this.#isSync;
    }
    set isSync(newValue :boolean){
        this.#isSync = newValue;
    }
}
