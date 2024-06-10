import { makeObservable, observable, action, makeAutoObservable } from "mobx";

class _TattooShopStore {
    constructor() {
        makeAutoObservable(this);
    }
}

export const tattooShopStore = new _TattooShopStore();
