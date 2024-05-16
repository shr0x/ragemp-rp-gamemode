import { action, makeObservable, observable } from "mobx";
export interface ICharacters {
    id: number;
    name: string;
    level: number;
    type: 0 | 1 | 2;

    money: number;
    bank: number;

    lastlogin: string;
}
export default class PlayerStore {
    @observable characters: ICharacters[] = observable.array([
        { type: 0, bank: 2322, id: 0, lastlogin: "12/12/2024", level: 2, money: 232, name: "Daddyss dev" },
        { type: 0, bank: 2322, id: 1, lastlogin: "12/12/2024", level: 2, money: 232, name: "Daddyss dev" },
        { type: 0, bank: 2322, id: 1, lastlogin: "12/12/2024", level: 2, money: 232, name: "Daddyss dev" }
    ]);

    constructor() {
        makeObservable(this);
    }

    @action.bound setCharacters(characters: any) {
        this.characters = characters;
    }
}
