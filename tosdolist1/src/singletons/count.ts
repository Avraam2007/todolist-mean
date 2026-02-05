import { signal, WritableSignal } from "@angular/core";

export class CountSingleton {
    #count :number = 0;
    static #instance : CountSingleton;
    totalCards: WritableSignal<number> = signal(0);
    deletedCards: WritableSignal<number> = signal(0);
    doneCards: WritableSignal<number> = signal(0);
    activeCards: WritableSignal<number> = signal(0);
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
        if(num >= 0) {
            this.#count = num;
        }
    }
}
