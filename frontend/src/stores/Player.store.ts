import { makeAutoObservable, observable } from "mobx";
import EventManager from "utils/EventManager.util";
import { RageShared } from "../../../source/shared";

interface ISettings {
    email: string;
    buttons: { [key: string]: Array<{ id: number; type: string; name: string; keyCode: number; event?: string }> };
    display: Array<{ id: number; type: string; name: string; action: boolean }>;
}

class _PlayerStore {
    nowPlaying: number = 0;

    bankData: { accountnumber: number; balance: number; pincode: number } | null = {
        accountnumber: 0,
        balance: 1,
        pincode: 1234
    };

    data: RageShared.Players.Interfaces.IPlayerData = observable.object({
        id: 3000,
        gender: 0,
        ping: 47,
        isDead: false,
        cash: 0,
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

    settings: ISettings = {
        email: "",
        buttons: {
            general: [{ id: 1, type: "default", name: "Inventory", event: "k_open_inv", keyCode: 9 }],
            vehicle: [{ id: 16, type: "default", name: "seat belt", keyCode: 75 }],
            fastslots: [{ id: 24, type: "fast", name: "action one", keyCode: 49 }]
        },

        display: [
            { id: 0, type: "player", name: "Show Nametags", action: false },
            { id: 8, type: "hud", name: "Display HUD", action: false }
        ]
    };

    isQueuePaused = false;

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
    setKeybindings(array: typeof this.settings.buttons) {
        this.settings.buttons = array;
    }
    setDisplaySettings(array: typeof this.settings.display) {
        this.settings.display = array;
    }

    setSettingsData(obj: typeof this.settings) {
        this.settings = obj;
    }

    public createEvents() {
        EventManager.addHandler("player", "setCharacters", (data: any[]) => this.setCharacters(data));
        EventManager.addHandler("player", "setNowPlaying", (amount: number) => this.setNowPlaying(amount));
        EventManager.addHandler("player", "setPlayerData", (data: any, key: any) => this.setData(data, key));
        EventManager.addHandler("player", "setKeybindData", (keys: { [key: string]: string }) => this.setKeybindData(keys));

        EventManager.addHandler("player", "setSettings", (obj: typeof this.settings) => this.setSettingsData(obj));
        EventManager.addHandler("player", "setKeybindings", (arr: typeof this.settings.buttons) => this.setKeybindings(arr));
        EventManager.addHandler("player", "setDisplaySettings", (arr: typeof this.settings.display) => this.setDisplaySettings(arr));

        EventManager.stopAddingHandler("player");
    }
}

export const playerStore = new _PlayerStore();
