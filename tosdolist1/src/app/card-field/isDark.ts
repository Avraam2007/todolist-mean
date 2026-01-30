export class IsDarkSingleton {
    #isDark :boolean = false;
    static #instance : IsDarkSingleton;
    constructor() {
        
    }
    static get instance() : IsDarkSingleton{
        if (!IsDarkSingleton.#instance) {
            IsDarkSingleton.#instance = new IsDarkSingleton();
        }

        return IsDarkSingleton.#instance;
    }
    get isDark() : boolean{
        return this.#isDark;
    }
    set isDark(newValue :boolean){
        this.#isDark = newValue;
    }
}
