class CountSingleton {
    #count : Number = 0;
    static #instance : CountSingleton;
    constructor() {
        
    }
    static get instance() : CountSingleton{
        if (!CountSingleton.#instance) {
            CountSingleton.#instance = new CountSingleton();
        }

        return CountSingleton.#instance;
    }
    get count() : Number{
        return this.#count
    }
    set count(num : Number){
        this.#count = num;
    }
}

export = { CountSingleton }; 