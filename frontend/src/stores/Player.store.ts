import { makeAutoObservable, observable } from "mobx";
import EventManager from "utils/EventManager.util";
import { RageShared } from "../../../source/shared";

class _PlayerStore {
    nowPlaying: number = 0;

    data: RageShared.Players.Interfaces.IPlayerData = observable.object({
        id: 3000,
        gender: 0,
        ping: 47,
        isDead: false,
        weapondata: {
            ammo: 30,
            maxammo: 260,
            weapon: "weapon_assaultrifle"
        },
        wantedLevel: 5,

        deathTime: 30
    });
    keybindGuide: { [key: string]: string } = {
        E: "Inventory",
        B: "Main Menu",
        C: "Voice Chat",
        D: "Interaction"
    };

    characters: RageShared.Players.Interfaces.ICharacters[] = observable.array([
        // { type: 1, bank: 2322, id: 0, lastlogin: "12/12/2024", level: 233, money: 232, name: "Daddyss dev" },
        // { type: 1, bank: 2322, id: 1, lastlogin: "12/12/2024", level: 2, money: 232, name: "Daddyss dev" },
        // { type: 0, bank: 2322, id: 1, lastlogin: "12/12/2024", level: 2, money: 232, name: "Daddyss dev" }
    ]);

    constructor() {
        makeAutoObservable(this);
        this.createEvents();
    }

    setCharacters(characters: any) {
        this.characters = characters;
    }

    setData<K extends keyof RageShared.Players.Interfaces.IPlayerData>(data: K, value: any) {
        this.data[data] = value;
    }

    setKeybindData(data: { [key: string]: string }) {
        this.keybindGuide = data;
    }

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

export const playerStore = new _PlayerStore();
