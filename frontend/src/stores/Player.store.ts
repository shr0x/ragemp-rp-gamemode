import { action, makeObservable, observable } from "mobx";
import EventManager from "utils/EventManager.util";
export interface ICharacters {
    id: number;
    name: string;
    level: number;
    type: 0 | 1 | 2;
    money: number;
    bank: number;
    lastlogin: string;
}

interface IPlayerData {
    id: number;
    gender: number;
    ping: number;
    isDead: boolean;
    weapondata: {
        weapon: string;
        ammo: number;
        maxammo: number;
    } | null;
    wantedLevel: number;
}

export default class PlayerStore {
    @observable
    nowPlaying: number = 0;

    @observable
    data: IPlayerData = observable.object({
        id: 3000,
        gender: 0,
        ping: 47,
        isDead: false,
        weapondata: {
            ammo: 30,
            maxammo: 260,
            weapon: "weapon_assaultrifle"
        },
        wantedLevel: 5
    });

    @observable
    keybindGuide: { [key: string]: string } = {
        E: "Inventory",
        B: "Main Menu",
        C: "Voice Chat",
        D: "Interaction"
    };

    @observable
    characters: ICharacters[] = observable.array([
        // { type: 1, bank: 2322, id: 0, lastlogin: "12/12/2024", level: 233, money: 232, name: "Daddyss dev" },
        // { type: 1, bank: 2322, id: 1, lastlogin: "12/12/2024", level: 2, money: 232, name: "Daddyss dev" },
        // { type: 0, bank: 2322, id: 1, lastlogin: "12/12/2024", level: 2, money: 232, name: "Daddyss dev" }
    ]);

    constructor() {
        makeObservable(this);
    }

    @action.bound
    setCharacters(characters: any) {
        this.characters = characters;
    }

    @action.bound
    setData<K extends keyof IPlayerData>(data: K, value: any) {
        this.data[data] = value;
    }

    @action.bound
    setKeybindData(data: { [key: string]: string }) {
        this.keybindGuide = data;
    }

    @action.bound
    setNowPlaying(data: number) {
        this.nowPlaying = data;
    }

    public createEvents() {
        EventManager.addHandler("player", "setCharacters", (data: any[]) => this.setCharacters(data));
        EventManager.addHandler("player", "setNowPlaying", (amount: number) => this.setNowPlaying(amount));
        EventManager.addHandler("player", "setPlayerData", (data: any, key: any) => this.setData(data, key));
        EventManager.addHandler("player", "setKeybindData", (keys: { [key: string]: string }) => this.setKeybindData(keys));

        EventManager.stopAddingHandler("player");
    }
}
