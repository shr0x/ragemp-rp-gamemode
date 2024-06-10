import { makeObservable, observable, action, set, values, makeAutoObservable } from "mobx";
import EventManager from "utils/EventManager.util";
import { RageShared } from "../../../source/shared";

interface ICategory {
    [key: string]: { [key: number]: RageShared.Inventory.Interfaces.IBaseItem | null };
}
/**
 * Represents an inventory store.
 */
class _InventoryStore {
    /** Indicates if the inventory is visible. */
    isVisible: boolean = false;

    /** The current weight of the inventory. */
    currentWeight = 0;

    /** The maximum allowed weight of the inventory. */
    maxInventoryWeight = 40;

    /** The clothes items in the inventory. */
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

    /** The quick use items in the inventory. */
    quickUse: { [key: number]: { component: string; id: number } | null } = observable.object({
        0: null,
        1: null,
        2: null,
        3: null,
        4: null,
        5: null
    });

    /** The main inventory categorized by type. */
    inventory: ICategory = observable.object({
        pockets: {
            "0": null,
            "1": null,
            //  {
            //     type: "weapon_dagger",
            //     typeCategory: "weapon",
            //     hash: "",
            //     key: "",
            //     quality: 0,
            //     image: "dagger.svg",
            //     render: "dagger.svg",
            //     name: "dagger",
            //     description: "",
            //     count: 1,
            //     weight: 0.6,
            //     maxStack: 1,
            //     options: ["drop", "trade", "fast"],

            //     gender: null,
            //     isPlaced: false,
            //     modelHash: "w_me_dagger"
            // },
            "2": null,
            // {
            //     type: "backpack",
            //     typeCategory: "clothing",
            //     hash: "123123-asdasd-123123",
            //     key: "",
            //     quality: 0,
            //     image: "backpack.svg",
            //     render: "backpack.svg",
            //     name: "Backpack",
            //     description: "Increases inventory capacity.",
            //     count: 1,
            //     weight: 5,
            //     maxStack: 1,
            //     isPlaced: false,
            //     options: ["open", "putOn", "drop", "trade"],
            //     gender: null,
            //     modelHash: "vw_prop_vw_backpack_01a",
            //     items: {
            //         0: null,
            //         1: null,
            //         2: null,
            //         3: null,
            //         4: null,
            //         5: null,
            //         6: null,
            //         7: null,
            //         8: null,
            //         9: null,
            //         10: null,
            //         11: null,
            //         12: null,
            //         13: null,
            //         14: null,
            //         15: null,
            //         16: null,
            //         17: null,
            //         18: null,
            //         19: null,
            //         20: null,
            //         21: null,
            //         22: null,
            //         23: null
            //     }
            // },
            "3": null,
            "4": null,
            "5": null,
            "6": null,
            "7": null,
            "8": null,
            "9": null,
            "10": null,
            "11": null,
            "12": null,
            "13": null,
            "14": null,
            "15": null,
            "16": null,
            "17": null
        }
    });

    /** The side inventory items. */
    sideInventory: { [key: number]: RageShared.Inventory.Interfaces.IBaseItem | null } = observable.object({
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
        17: null,
        18: null,
        19: null,
        20: null,
        21: null,
        22: null,
        23: null
    });

    /** The list of players around the current player. */
    playersAround: any[] = [];

    constructor() {
        makeAutoObservable(this);
        this.createEvents();
        this.calcInventoryWeight();
    }

    /**
     * Sets the maximum weight of the inventory.
     * @param {number} number - The new maximum weight.
     */
    setInventoryMaxWeight(number: number) {
        this.maxInventoryWeight = number;
    }

    /**
     * Sets the visibility of the inventory.
     * @param {boolean} bool - The new visibility state.
     */
    setVisible(bool: boolean) {
        this.isVisible = bool;
    }

    /**
     * Checks if an item is in the quick use slots.
     * @param {number} id - The ID of the item.
     * @returns {boolean} True if the item is in quick use, otherwise false.
     */
    public isItemInQuickUse(component: string, id: number): boolean {
        return values(this.quickUse).find((x) => x && x.id === id && x.component === component) ? true : false;
    }

    /**
     * Calculates the total weight of the items in the backpack.
     * @returns {number} The total backpack weight.
     */
    public calculateBackpackWeight(): number {
        const backpackData = this.clothes[7];
        if (!backpackData || !backpackData.items) return 0;
        return 0;
    }

    /**
     * Calculates the total weight of the inventory.
     */
    calcInventoryWeight() {
        const calculateWeight = (items: any[]) => items.reduce((acc, item) => acc + (item ? item.weight * item.count : 0), 0);
        const pocketsWeight = calculateWeight(Object.values(this.inventory.pockets).filter((el) => el && el.weight));
        const backpackWeight = this.calculateBackpackWeight();
        this.currentWeight = parseFloat((pocketsWeight + backpackWeight).toFixed(3));
    }

    /**
     * Gets the quality color of an item.
     * @param {RageShared.Inventory.IBaseItem | null} itemData - The item data.
     * @returns {string} The quality color in hex format.
     */
    public getItemQuality(itemData: RageShared.Inventory.Interfaces.IBaseItem | null) {
        const qualityColors: { [key: number]: string } = {
            0: "#B7C2F8",
            1: "#8A9EFF",
            2: "#C970FF",
            3: "#FF8888",
            4: "#FFD139"
        };
        return itemData ? qualityColors[itemData.quality] || "#FFFFFF00" : "#FFFFFF00";
    }

    public findItemByUUID(uuid: string) {
        let data = values(this.inventory.pockets).find((x) => x && x.hash === uuid);
        if (!data) data = values(this.clothes).find((x) => x && x.hash === uuid);
        return data ?? null;
    }

    public getBackpackItemData(hash: string | null, slot: number) {
        if (!hash) return null;

        const item = this.findItemByUUID(hash);
        if (!item || !item.items) return null;
        return item.items[slot];
    }

    /**
     * Changes the inventory data and optionally recalculates the weight.
     * @param {{ component: string | null; id: number | null }} data - The data to change.
     * @param {any} obj - The new object data.
     * @param {boolean} recalculateWeight - Whether to recalculate the weight.
     * @param {string | null} [linkedBackpack=null] - The linked backpack ID if applicable.
     */
    changeInventoryData(data: { component: string | null; id: number | null }, obj: any, recalculateWeight: boolean, linkedBackpack: string | null = null) {
        if (data.component === null || data.id === null) return;
        if (data.component === "clothes") {
            set(this.clothes, data.id, obj);
        } else if (data.component === "quickUse") {
            set(this.quickUse, data.id, obj);
        } else if (data.component === "backpack" && linkedBackpack) {
            const backpack = this.findItemByUUID(linkedBackpack);
            if (!backpack || !backpack.items) return;
            backpack.items[data.id] = obj;
        } else if (data.component === "groundItems") {
            this.sideInventory[data.id] = obj;
        } else this.inventory[data.component][data.id] = obj;
        if (recalculateWeight) this.calcInventoryWeight();
    }

    /**
     * Fetches quick use items.
     * @param {{ [key: number]: { component: string; id: number } | null }} items - The quick use items.
     */
    fetchQuickUseItems(items: { [key: number]: { component: string; id: number } | null }) {
        this.quickUse = items;
    }

    /**
     * Fetches clothes data and recalculates inventory weight.
     * @param {{ [key: number]: RageShared.Inventory.IBaseItem }} obj - The clothes data.
     */
    fetchClothesData(obj: { [key: number]: RageShared.Inventory.Interfaces.IBaseItem }) {
        this.clothes = obj;
        this.calcInventoryWeight();
    }

    /**
     * Sets the clothes data for a specific slot and recalculates inventory weight.
     * @param {number} id - The slot ID.
     * @param {RageShared.Inventory.IBaseItem} data - The item data.
     */
    setClothesData(id: number, data: RageShared.Inventory.Interfaces.IBaseItem) {
        if (!(id in this.clothes)) return;
        this.clothes[id] = data;
        this.calcInventoryWeight();
    }

    /**
     * Fetches the inventory data and recalculates inventory weight.
     * @param {ICategory} obj - The inventory data.
     */
    fetchInventoryData(obj: ICategory) {
        this.inventory = obj;
        this.calcInventoryWeight();
    }

    /**
     * Fetches a specific inventory item and recalculates inventory weight.
     * @param {string} component - The inventory component.
     * @param {number} slot - The slot number.
     * @param {RageShared.Inventory.IBaseItem | null} obj - The item data.
     */
    fetchInventoryItem(component: string, slot: number, obj: RageShared.Inventory.Interfaces.IBaseItem | null) {
        this.inventory[component][slot] = obj;
        this.calcInventoryWeight();
    }

    /**
     * Fetches the players around the current player.
     * @param {any[]} array - The array of players.
     */
    fetchPlayersAround(array: any[]) {
        this.playersAround = array;
    }

    /**
     * Fetches the ground items.
     * @param {typeof this.sideInventory} items - The ground items data.
     */
    fetchGroundItems(items: typeof this.sideInventory) {
        this.sideInventory = items;
    }

    public createEvents() {
        EventManager.addHandler("inventory", "setVisible", (enable: boolean) => this.setVisible(enable));
        EventManager.addHandler("inventory", "setClothes", (obj: { [key: number]: RageShared.Inventory.Interfaces.IBaseItem }) => this.fetchClothesData(obj));
        EventManager.addHandler("inventory", "setClothesItem", (id: number, data: RageShared.Inventory.Interfaces.IBaseItem) => this.setClothesData(id, data));

        EventManager.addHandler("inventory", "setInventory", (obj: { [key: string]: { [key: number]: RageShared.Inventory.Interfaces.IBaseItem | null } }) => this.fetchInventoryData(obj));
        EventManager.addHandler("inventory", "setQuickUseItems", (obj: { [key: number]: { component: string; id: number } | null }) => this.fetchQuickUseItems(obj));
        EventManager.addHandler("inventory", "setInventoryItem", (component: string, slot: number, obj: RageShared.Inventory.Interfaces.IBaseItem | null) =>
            this.fetchInventoryItem(component, slot, obj)
        );

        EventManager.addHandler("inventory", "setDroppedItems", (items: any) => this.fetchGroundItems(items));

        EventManager.addHandler("inventory", "setPlayersAround", (array: any) => this.fetchPlayersAround(array));
        EventManager.addHandler("inventory", "setMaxWeight", (weight: number) => this.setInventoryMaxWeight(weight));
    }
}

export const inventoryStore = new _InventoryStore();
