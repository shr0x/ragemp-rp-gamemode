import { makeObservable, observable, action } from "mobx";

export default class TattooShopStore {
    constructor() {
        makeObservable(this);
    }
}
