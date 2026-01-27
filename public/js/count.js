export class CountSingleton {
    #count = 0;
    static #instance;
    constructor(parameters) {
        
    }
    static get instance() {
        if (!CountSingleton.#instance) {
            CountSingleton.#instance = new CountSingleton();
        }

        return CountSingleton.#instance;
    }
    get count(){
        return this.#count
    }
    set count(num){
        this.#count = num;
    }
}