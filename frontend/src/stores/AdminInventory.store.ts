import { makeAutoObservable, observable } from "mobx";
import EventManager from "utils/EventManager.util";
import { RageShared } from "../../../source/shared";

interface ICategory {
    [key: string]: { [key: number]: RageShared.Inventory.Interfaces.IBaseItem | null };
}

interface IAdminInventoryTarget {
    id: number;
    name: string;
}

class _AdminInventoryStore {
    isVisible = false;

    target: IAdminInventoryTarget | null = null;

    currentWeight = 0;
    maxInventoryWeight = 40;

    clothes: { [key: number]: RageShared.Inventory.Interfaces.IBaseItem | null } = observable.object({
        0: null,
        1: null,
        2: null,
        3: null,
        4: null,
        5: null,
        6: null,
        7: null,
        8: null,
        9: null,
        10: null,
        11: null,
        12: null,
        13: null
    });

    quickUse: { [key: number]: { component: string; id: number } | null } = observable.object({
        0: null,
        1: null,
        2: null,
        3: null,
        4: null,
        5: null
    });

    inventory: ICategory = observable.object({
        pockets: {
            0: null,
            1: null,
            2: null,
            3: null,
            4: null,
            5: null,
            6: null,
            7: null,
            8: null,
            9: null,
            10: null,
            11: null,
            12: null,
            13: null,
            14: null,
            15: null,
            16: null,
            17: null
        }
    });

    selectedItem: RageShared.Inventory.Interfaces.IBaseItem | null = null;
    selectedBackpackHash: string | null = null;

    constructor() {
        makeAutoObservable(this);
        this.createEvents();
    }

    setVisible(state: boolean) {
        this.isVisible = state;
    }

    setTarget(target: IAdminInventoryTarget | null) {
        this.target = target;
    }

    setMaxWeight(weight: number) {
        this.maxInventoryWeight = weight;
    }

    setClothes(data: { [key: number]: RageShared.Inventory.Interfaces.IBaseItem | null }) {
        this.clothes = data;
        this.calcInventoryWeight();
    }

    setQuickUse(data: { [key: number]: { component: string; id: number } | null }) {
        this.quickUse = data;
    }

    setInventory(data: ICategory) {
        this.inventory = data;
        this.calcInventoryWeight();
    }

    setSelectedItem(item: RageShared.Inventory.Interfaces.IBaseItem | null) {
        this.selectedItem = item;
    }

    setSelectedBackpackHash(hash: string | null) {
        this.selectedBackpackHash = hash;
    }

    close() {
        this.isVisible = false;
        this.target = null;
        this.selectedItem = null;
        this.selectedBackpackHash = null;
    }

    calcInventoryWeight() {
        const calculateWeight = (items: any[]) =>
            items.reduce((acc, item) => acc + (item ? item.weight * item.count : 0), 0);

        const pocketsWeight = calculateWeight(Object.values(this.inventory.pockets).filter((el) => el && el.weight));
        this.currentWeight = parseFloat(pocketsWeight.toFixed(3));
    }

    getItemQuality(itemData: RageShared.Inventory.Interfaces.IBaseItem | null) {
        const qualityColors: { [key: number]: string } = {
            0: "#B7C2F8",
            1: "#8A9EFF",
            2: "#C970FF",
            3: "#FF8888",
            4: "#FFD139"
        };
        return itemData ? qualityColors[itemData.quality] || "#FFFFFF00" : "#FFFFFF00";
    }

    findItemByUUID(uuid: string) {
        let data = Object.values(this.inventory.pockets).find((x) => x && x.hash === uuid);
        if (!data) data = Object.values(this.clothes).find((x) => x && x.hash === uuid);
        return data ?? null;
    }

    getBackpackItemData(hash: string | null, slot: number) {
        if (!hash) return null;

        const item = this.findItemByUUID(hash);
        if (!item || !item.items) return null;
        return item.items[slot];
    }

    inspectPlayerInventory(targetId: number) {
        EventManager.emitServer("admin", "inspectInventory", { targetId });
    }

    removeSelectedItem() {
        if (!this.target || !this.selectedItem) return;

        EventManager.emitServer("admin", "removeInventoryItem", {
            targetId: this.target.id,
            itemHash: this.selectedItem.hash
        });
    }

    createEvents() {
        EventManager.addHandler("admin", "setInventoryVisible", (state: boolean) => this.setVisible(state));
        EventManager.addHandler("admin", "setInventoryTarget", (target: IAdminInventoryTarget | null) => this.setTarget(target));
        EventManager.addHandler("admin", "setInventoryClothes", (data: { [key: number]: RageShared.Inventory.Interfaces.IBaseItem | null }) => this.setClothes(data));
        EventManager.addHandler("admin", "setInventoryQuickUse", (data: { [key: number]: { component: string; id: number } | null }) => this.setQuickUse(data));
        EventManager.addHandler("admin", "setInventoryData", (data: ICategory) => this.setInventory(data));
        EventManager.addHandler("admin", "setInventoryMaxWeight", (weight: number) => this.setMaxWeight(weight));
        EventManager.stopAddingHandler("admin");
    }
}

export const adminInventoryStore = new _AdminInventoryStore();