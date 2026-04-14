import { RageShared } from "@shared/index";
import { Item } from "../inventory.types";

export const ammoItems: Item = {
    [RageShared.Inventory.Enums.ITEM_TYPES.ITEM_TYPE_PISTOLAMMO]: {
        type: RageShared.Inventory.Enums.ITEM_TYPES.ITEM_TYPE_PISTOLAMMO,
        typeCategory: RageShared.Inventory.Enums.ITEM_TYPE_CATEGORY.TYPE_AMMO,
        hash: "",
        key: "",
        quality: 0,
        image: "pistol_ammo.svg",
        render: "pistol_ammo.svg",
        name: "Pistol Ammo",
        description: "",
        count: 1,
        weight: 1,
        maxStack: 60,
        options: ["drop", "trade", "fast"],

        gender: null,
        isPlaced: false,
        modelHash: "prop_box_ammo01a"
    },
    [RageShared.Inventory.Enums.ITEM_TYPES.ITEM_TYPE_SMGAMMO]: {
        type: RageShared.Inventory.Enums.ITEM_TYPES.ITEM_TYPE_SMGAMMO,
        typeCategory: RageShared.Inventory.Enums.ITEM_TYPE_CATEGORY.TYPE_AMMO,
        hash: "",
        key: "",
        quality: 0,
        image: "smg_ammo.svg",
        render: "smg_ammo.svg",
        name: "SMG Ammo",
        description: "Ammunition to be used on Sub Machine Guns",
        count: 1,
        weight: 1,
        maxStack: 60,
        options: ["drop", "trade", "fast"],

        gender: null,
        isPlaced: false,
        modelHash: "prop_box_ammo01a"
    },
    [RageShared.Inventory.Enums.ITEM_TYPES.ITEM_TYPE_SHOTGUNAMMO]: {
        type: RageShared.Inventory.Enums.ITEM_TYPES.ITEM_TYPE_SHOTGUNAMMO,
        typeCategory: RageShared.Inventory.Enums.ITEM_TYPE_CATEGORY.TYPE_AMMO,
        hash: "",
        key: "",
        quality: 0,
        image: "shotgun_ammo.svg",
        render: "shotgun_ammo.svg",
        name: "Shotgun Ammo",
        description: "",
        count: 1,
        weight: 1,
        maxStack: 30,
        options: ["drop", "trade", "fast"],

        gender: null,
        isPlaced: false,
        modelHash: "prop_box_ammo01a"
    },
    [RageShared.Inventory.Enums.ITEM_TYPES.ITEM_TYPE_MGAMMO]: {
        type: RageShared.Inventory.Enums.ITEM_TYPES.ITEM_TYPE_MGAMMO,
        typeCategory: RageShared.Inventory.Enums.ITEM_TYPE_CATEGORY.TYPE_AMMO,
        hash: "",
        key: "",
        quality: 0,
        image: "mg_ammo.svg",
        render: "mg_ammo.svg",
        name: "Machine Gun Ammo",
        description: "",
        count: 1,
        weight: 10,
        maxStack: 100,
        options: ["drop", "trade", "fast"],

        gender: null,
        isPlaced: false,
        modelHash: "prop_box_ammo01a"
    },
    [RageShared.Inventory.Enums.ITEM_TYPES.ITEM_TYPE_RIFLEAMMO]: {
        type: RageShared.Inventory.Enums.ITEM_TYPES.ITEM_TYPE_RIFLEAMMO,
        typeCategory: RageShared.Inventory.Enums.ITEM_TYPE_CATEGORY.TYPE_AMMO,
        hash: "",
        key: "",
        quality: 0,
        image: "rifle_ammo.svg",
        render: "rifle_ammo.svg",
        name: "Rifle Ammo",
        description: "",
        count: 1,
        weight: 1,
        maxStack: 100,
        options: ["drop", "trade", "fast"],
        gender: null,
        isPlaced: false,
        modelHash: "prop_box_ammo01a"
    }
}