import { makeObservable, observable, action } from "mobx";

export default class CreatorStore {
    constructor() {
        makeObservable(this);
    }
}
