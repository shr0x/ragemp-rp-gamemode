import { makeObservable, observable, action, set } from "mobx";

export interface IBaseItem {
    type: string; //item type
    isPlaced: boolean; //whether item is 'placed' in clothes
    quality: number; //item quality level
    image: string; //item image
    hash: string; //unique item hash, also used as linked to a child item
    key: string; //item key which contains clothes data only (such as texture,comp, etc)
    render: string; //item render image which later on can be used in CDN if you have plenty items.
    name: string; //item name
    description: string; //item description
    count: number; //item count, also determines whether you can split an item up
    weight: number; //item weight
    maxStack: number; //max stack determines how many items can be stacked in one slot
    options: string[]; //item options (to be used when you right click an item) such
    gender: number | null; //item gender, used on clothes whether the clothe is for female or male
}

interface IInventory {
    [key: string]: { [key: number]: IBaseItem | null };
}

export default class InventoryStore {
    @observable
    isVisible: boolean = true;

    @observable
    currentWeight = 0;

    @observable
    maxInventoryWeight = 40;

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
        12: {
            type: "pants",
            hash: "f38fdbfb-fee5-4298-849e-222222",
            key: 'pants {"component":4,"drawable":1,"texture":0}',
            quality: -1,
            image: "pants.svg",
            render: "male/c_m_4_1_0.webp",
            name: "Pants",
            description: "Beast Pants Eva",
            count: 11,
            weight: 1,
            maxStack: 1,
            options: ["putOn", "drop", "trade", "split"],
            modelHash: "bkr_prop_duffel_bag_01a",
            isPlaced: true,
            gender: 0
        },
        13: null
    });

    @observable
    quickUse: { [key: number]: { component: string; id: number } | null } = observable.object({
        0: null,
        1: null,
        2: null,
        3: null,
        4: null,
        5: null
    });
    @observable
    inventory: IInventory = observable.object({
        pockets: {
            "0": null,
            "1": null,
            "2": null,
            "3": null,
            "4": null,
            "5": null,
            "6": null,
            "7": null,
            "8": null,
            "9": null,
            "10": null,
            "11": null,
            "12": {
                type: "pants",
                hash: "f38fdbfb-fee5-4298-849e-222222",
                key: 'pants {"component":4,"drawable":1,"texture":0}',
                quality: -1,
                image: "pants.svg",
                render: "male/c_m_4_1_0.webp",
                name: "Pants",
                description: "Beast Pants Eva",
                count: 1,
                weight: 1,
                maxStack: 1,
                options: ["putOn", "drop", "trade"],
                modelHash: "bkr_prop_duffel_bag_01a",
                isPlaced: false,
                gender: 0
            },
            "13": null,
            "14": null,
            "15": null,
            "16": null,
            "17": null
        }

        //  "2": { "type": null }, "3": { "type": null }, "4": { "type": null }, "5": { "type": null }
    });

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
        15: {
            type: "pants",
            hash: "f38fdbfb-fee5-4298-849e-222222",
            key: 'pants {"component":4,"drawable":1,"texture":0}',
            quality: -1,
            image: "pants.svg",
            render: "male/c_m_4_1_0.webp",
            name: "Pants",
            description: "Beast Pants Eva",
            count: 1,
            weight: 1,
            maxStack: 1,
            options: ["putOn", "drop", "trade"],
            modelHash: "bkr_prop_duffel_bag_01a",
            isPlaced: false,
            gender: 0
        },
        16: null,
        17: null,
        18: null,
        19: null,
        20: null,
        21: null,
        22: null,
        23: null
    });

    @observable
    backpackData: { [key: string]: { [key: number]: IBaseItem | null } } = observable.object({
        "77773377727777": {
            0: {
                type: "weapon",
                class: 1,
                hash: "496b4e3e-afa8-4633-b3cc-d54748dx3ad1f",
                key: "",
                quality: 4,
                image: "pistol_mk2.svg",
                render: "pistol_mk2.svg",
                name: "Pistol MK2",
                description: "A quick use handgun",
                count: 5,
                weight: 1,
                maxStack: 5,
                options: ["drop", "trade", "fast", "split"],
                gender: null,
                isPlaced: false
            },
            1: {
                type: "weapon",
                class: 1,
                hash: "496b4e3e-afa8-4633-b3cc-d54748dx3ad1f",
                key: "",
                quality: -1,
                image: "assaultrifle.svg",
                render: "",
                name: "Assault Rifle",
                description: "A heavy assault rifle",
                count: 1,
                weight: 1,
                maxStack: 2,
                options: ["drop", "trade", "fast", "split"],
                gender: null,
                isPlaced: false
            },
            2: {
                type: "weapon",
                class: 1,
                hash: "496b4e3e-afa8-4633-b3cc-d54748dx3ad1f",
                key: "",
                quality: -1,
                image: "assaultrifle.svg",
                render: "",
                name: "Whatever",
                description: "whatever desc",
                count: 1,
                weight: 1,
                maxStack: 1,
                options: ["drop", "trade", "fast"],
                gender: null,
                isPlaced: false
            },
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
        }
    });

    @observable
    playersAround: any[] = [];

    constructor() {
        makeObservable(this);
    }

    @action.bound
    setInventoryMaxWeight(number: number) {
        this.maxInventoryWeight = number;
    }

    @action.bound
    setVisible(bool: boolean) {
        this.isVisible = bool;
    }

    @action.bound
    public isItemInQuickUse(id: number): boolean {
        return Object.values(this.quickUse).find((x) => x && x.id === id) ? true : false;
    }

    @action.bound
    public calculateBackpackWeight(): number {
        return Object.values(this.backpackData).reduce((totalWeight, items) => {
            return (
                totalWeight +
                Object.values(items).reduce((sum, item) => {
                    return sum + (item?.weight ?? 0) * (item?.count ?? 0);
                }, 0)
            );
        }, 0);
    }

    @action.bound
    calcInventoryWeight() {
        const calculateWeight = (items: any[]) => items.reduce((acc, item) => acc + (item ? item.weight * item.count : 0), 0);
        const pocketsWeight = calculateWeight(Object.values(this.inventory.pockets).filter((el) => el && el.weight));
        const backpackWeight = this.calculateBackpackWeight();
        this.currentWeight = parseFloat((pocketsWeight + backpackWeight).toFixed(3));
    }

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
    changeInventoryData(data: { component: string | null; id: number | null }, obj: any, recalculateWeight: boolean, linkedBackpack: string | null = null) {
        if (data.component === null || data.id === null) return;
        if (data.component === "clothes") {
            set(this.clothes, data.id, obj);
        } else if (data.component === "quickUse") {
            set(this.quickUse, data.id, obj);
        } else if (data.component === "backpack" && linkedBackpack) {
            this.backpackData[linkedBackpack][data.id] = obj;
        } else if (data.component === "groundItems") {
            this.sideInventory[data.id] = obj;
        } else this.inventory[data.component][data.id] = obj;
        if (recalculateWeight) this.calcInventoryWeight();
    }

    @action.bound
    fetchQuickUseItems(items: { [key: number]: { component: string; id: number } | null }) {
        this.quickUse = items;
    }

    @action.bound
    fetchClothesData(obj: { [key: number]: IBaseItem }) {
        this.clothes = obj;
        this.calcInventoryWeight();
    }

    @action.bound
    setClothesData(id: number, data: IBaseItem) {
        if (!(id in this.clothes)) return;
        this.clothes[id] = data;
        this.calcInventoryWeight();
    }

    @action.bound
    fetchInventoryData(obj: IInventory) {
        this.inventory = obj;
        this.calcInventoryWeight();
    }

    @action.bound
    fetchInventoryItem(component: string, slot: number, obj: IBaseItem | null) {
        this.inventory[component][slot] = obj;
        this.calcInventoryWeight();
    }

    @action.bound
    fetchBackpackData(backpack: string, data: { [key: number]: IBaseItem | null }) {
        this.backpackData[backpack] = data;
        this.calcInventoryWeight();
    }

    @action.bound
    fetchPlayersAround(array: any[]) {
        this.playersAround = array;
    }

    @action.bound
    fetchGroundItems(items: typeof this.sideInventory) {
        this.sideInventory = items;
    }
}
