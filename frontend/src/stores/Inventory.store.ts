import { makeObservable, observable, action, set, values } from "mobx";

export interface IBaseItem {
    /*
     * Item Type
     */
    type: string;

    /*
     * Whether item is placed in clothes or not
     */
    isPlaced: boolean;

    /*
     * Item Quality Level -1 to 4
     */
    quality: number;

    /*
     * Item Image
     */
    image: string;

    /*
     * Unique item hash, also used as linked to a child item
     */
    hash: string;

    /*
     * Item key, contains clothes data such as component id, drawable and texture id.
     */
    key: string;

    /*
     * Item render image, shows when you click an item in the inventory slots
     */
    render: string;

    /*
     * Item name
     */
    name: string;

    /*
     * Item description
     */
    description: string;

    /*
     * Item count, also determines whether you can split an item up
     */
    count: number;

    /**
     * Item weight, how much an item weights
     */
    weight: number;

    /*
     * Item max stack, determines the count of an item that can be stacked together in one slot
     */
    maxStack: number;

    /*
     * Item options, used when you right click an item.
     */
    options: string[];

    /*
     * Item gender, used on clothes whether its for females or males.
     */
    gender: number | null;

    items?: { [key: number]: IBaseItem | null };
}

interface ICategory {
    [key: string]: { [key: number]: IBaseItem | null };
}

/**
 * Represents an inventory store.
 */
export default class InventoryStore {
    /** Indicates if the inventory is visible. */
    @observable
    isVisible: boolean = false;

    /** The current weight of the inventory. */
    @observable
    currentWeight = 0;

    /** The maximum allowed weight of the inventory. */
    @observable
    maxInventoryWeight = 40;

    /** The clothes items in the inventory. */
    @observable
    clothes: { [key: number]: IBaseItem | null } = observable.object({
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
    @observable
    quickUse: { [key: number]: { component: string; id: number } | null } = observable.object({
        0: null,
        1: null,
        2: null,
        3: null,
        4: null,
        5: null
    });

    /** The main inventory categorized by type. */
    @observable
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
    @observable
    sideInventory: { [key: number]: IBaseItem | null } = observable.object({
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
    @observable
    playersAround: any[] = [];

    constructor() {
        makeObservable(this);
        this.calcInventoryWeight();
    }

    /**
     * Sets the maximum weight of the inventory.
     * @param {number} number - The new maximum weight.
     */
    @action.bound
    setInventoryMaxWeight(number: number) {
        this.maxInventoryWeight = number;
    }

    /**
     * Sets the visibility of the inventory.
     * @param {boolean} bool - The new visibility state.
     */
    @action.bound
    setVisible(bool: boolean) {
        this.isVisible = bool;
    }

    /**
     * Checks if an item is in the quick use slots.
     * @param {number} id - The ID of the item.
     * @returns {boolean} True if the item is in quick use, otherwise false.
     */
    @action.bound
    public isItemInQuickUse(id: number): boolean {
        return values(this.quickUse).find((x) => x && x.id === id) ? true : false;
    }

    /**
     * Calculates the total weight of the items in the backpack.
     * @returns {number} The total backpack weight.
     */
    @action.bound
    public calculateBackpackWeight(): number {
        const backpackData = this.clothes[7];
        if (!backpackData || !backpackData.items) return 0;
        return 0;
    }

    /**
     * Calculates the total weight of the inventory.
     */
    @action.bound
    calcInventoryWeight() {
        const calculateWeight = (items: any[]) => items.reduce((acc, item) => acc + (item ? item.weight * item.count : 0), 0);
        const pocketsWeight = calculateWeight(Object.values(this.inventory.pockets).filter((el) => el && el.weight));
        const backpackWeight = this.calculateBackpackWeight();
        this.currentWeight = parseFloat((pocketsWeight + backpackWeight).toFixed(3));
    }

    /**
     * Gets the quality color of an item.
     * @param {IBaseItem | null} itemData - The item data.
     * @returns {string} The quality color in hex format.
     */
    public getItemQuality(itemData: IBaseItem | null) {
        const qualityColors: { [key: number]: string } = {
            0: "#B7C2F8",
            1: "#8A9EFF",
            2: "#C970FF",
            3: "#FF8888",
            4: "#FFD139"
        };
        return itemData ? qualityColors[itemData.quality] || "#FFFFFF00" : "#FFFFFF00";
    }

    @action.bound
    public findItemByUUID(uuid: string) {
        let data = values(this.inventory.pockets).find((x) => x && x.hash === uuid);
        if (!data) data = values(this.clothes).find((x) => x && x.hash === uuid);
        return data ?? null;
    }

    @action.bound
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
    @action.bound
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
    @action.bound
    fetchQuickUseItems(items: { [key: number]: { component: string; id: number } | null }) {
        this.quickUse = items;
    }

    /**
     * Fetches clothes data and recalculates inventory weight.
     * @param {{ [key: number]: IBaseItem }} obj - The clothes data.
     */
    @action.bound
    fetchClothesData(obj: { [key: number]: IBaseItem }) {
        this.clothes = obj;
        this.calcInventoryWeight();
    }

    /**
     * Sets the clothes data for a specific slot and recalculates inventory weight.
     * @param {number} id - The slot ID.
     * @param {IBaseItem} data - The item data.
     */
    @action.bound
    setClothesData(id: number, data: IBaseItem) {
        if (!(id in this.clothes)) return;
        this.clothes[id] = data;
        this.calcInventoryWeight();
    }

    /**
     * Fetches the inventory data and recalculates inventory weight.
     * @param {ICategory} obj - The inventory data.
     */
    @action.bound
    fetchInventoryData(obj: ICategory) {
        this.inventory = obj;
        this.calcInventoryWeight();
    }

    /**
     * Fetches a specific inventory item and recalculates inventory weight.
     * @param {string} component - The inventory component.
     * @param {number} slot - The slot number.
     * @param {IBaseItem | null} obj - The item data.
     */
    @action.bound
    fetchInventoryItem(component: string, slot: number, obj: IBaseItem | null) {
        this.inventory[component][slot] = obj;
        this.calcInventoryWeight();
    }

    /**
     * Fetches the players around the current player.
     * @param {any[]} array - The array of players.
     */
    @action.bound
    fetchPlayersAround(array: any[]) {
        this.playersAround = array;
    }

    /**
     * Fetches the ground items.
     * @param {typeof this.sideInventory} items - The ground items data.
     */
    @action.bound
    fetchGroundItems(items: typeof this.sideInventory) {
        this.sideInventory = items;
    }
}
