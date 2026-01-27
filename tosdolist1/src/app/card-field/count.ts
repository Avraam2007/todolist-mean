export class CountSingleton {
    #count :number = 0;
    static #instance : CountSingleton;
    constructor() {
        
    }
    static get instance() : CountSingleton{
        if (!CountSingleton.#instance) {
            CountSingleton.#instance = new CountSingleton();
        }

        return CountSingleton.#instance;
    }
    get count() : number{
        return this.#count
    }
    set count(num :number){
        this.#count = num;
    }
}
