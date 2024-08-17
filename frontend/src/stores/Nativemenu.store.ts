import { makeAutoObservable } from "mobx";
import EventManager from "utils/EventManager.util";
import { RageShared } from "../../../source/shared";

class NativemenuStore {
    menu: RageShared.Interfaces.INativeMenu = {
        id: -1,
        isActive: false,
        header: { title: "", desc: "" },
        items: []
    };

    constructor() {
        makeAutoObservable(this);
        this.createEvents();
    }

    changeValue(uid: number, newValue: any) {
        const itemdata = this.menu.items.find((x) => x.uid === uid);
        if (!itemdata) return;
        itemdata.value = newValue;
    }

    setMenu(data: RageShared.Interfaces.INativeMenu) {
        this.menu = data;
    }

    public emitChange(action: string, data: any) {}

    public createEvents() {
        EventManager.addHandler("nativemenu", "setData", (data: RageShared.Interfaces.INativeMenu) => this.setMenu(data));
        EventManager.stopAddingHandler("nativemenu");
    }
}
export const nativemenuStore = new NativemenuStore();
