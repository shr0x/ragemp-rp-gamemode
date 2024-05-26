import { inventoryAssets } from "./Items.module";

export const defaultClothes: { [key: number]: Array<{ type: "props" | "clothing"; component: number; drawable: number; texture: number }> } = {
    [inventoryAssets.INVENTORY_CLOTHING.TYPE_HAT]: [
        { type: "props", component: 0, drawable: 11, texture: 0 },
        { type: "props", component: 0, drawable: 120, texture: 0 }
    ],

    [inventoryAssets.INVENTORY_CLOTHING.TYPE_MASK]: [
        { type: "clothing", component: 1, drawable: 0, texture: 0 },
        { type: "clothing", component: 1, drawable: 0, texture: 0 }
    ],
    [inventoryAssets.INVENTORY_CLOTHING.TYPE_GLASSES]: [
        { type: "props", component: 1, drawable: 0, texture: 0 },
        { type: "props", component: 1, drawable: 12, texture: 0 }
    ],
    [inventoryAssets.INVENTORY_CLOTHING.TYPE_EARRINGS]: [
        { type: "props", component: 2, drawable: 0, texture: -1 },
        { type: "props", component: 2, drawable: 0, texture: -1 }
    ],
    [inventoryAssets.INVENTORY_CLOTHING.TYPE_CHAIN]: [
        { type: "clothing", component: 7, drawable: 0, texture: 0 },
        { type: "clothing", component: 7, drawable: 0, texture: 0 }
    ],
    [inventoryAssets.INVENTORY_CLOTHING.TYPE_TSHIRT]: [
        { type: "clothing", component: 8, drawable: 0, texture: -1 },
        { type: "clothing", component: 8, drawable: 0, texture: -1 }
    ],
    [inventoryAssets.INVENTORY_CLOTHING.TYPE_JACKET]: [
        { type: "clothing", component: 11, drawable: 15, texture: 0 },
        { type: "clothing", component: 11, drawable: 15, texture: 0 }
    ],
    [inventoryAssets.INVENTORY_CLOTHING.TYPE_BACKPACK]: [
        { type: "clothing", component: 5, drawable: 0, texture: 0 },
        { type: "clothing", component: 5, drawable: 0, texture: 0 }
    ],
    [inventoryAssets.INVENTORY_CLOTHING.TYPE_WALLET]: [
        { type: "props", component: 12, drawable: 0, texture: 0 },
        { type: "props", component: 12, drawable: 0, texture: 0 }
    ],
    [inventoryAssets.INVENTORY_CLOTHING.TYPE_ARMOUR]: [
        { type: "clothing", component: 9, drawable: 0, texture: 0 },
        { type: "clothing", component: 9, drawable: 0, texture: 0 }
    ],
    [inventoryAssets.INVENTORY_CLOTHING.TYPE_WATCH]: [
        { type: "props", component: 6, drawable: 0, texture: -1 },
        { type: "props", component: 6, drawable: 0, texture: -1 }
    ],
    [inventoryAssets.INVENTORY_CLOTHING.TYPE_GLOVES]: [
        { type: "clothing", component: 3, drawable: 15, texture: 0 },
        { type: "clothing", component: 3, drawable: 15, texture: 0 }
    ],
    [inventoryAssets.INVENTORY_CLOTHING.TYPE_PANTS]: [
        { type: "clothing", component: 4, drawable: 21, texture: 0 },
        { type: "clothing", component: 4, drawable: 15, texture: 0 }
    ],
    [inventoryAssets.INVENTORY_CLOTHING.TYPE_SHOES]: [
        { type: "clothing", component: 6, drawable: 34, texture: 0 },
        { type: "clothing", component: 6, drawable: 35, texture: 0 }
    ]
};

type IclothesPresset = Record<
    number,
    {
        componentId: number;
        class: string;
        type: RageShared.Enums.ITEM_TYPES;
        isPlaced: boolean;
        quality: number;
        image: string;
    }
>;

//eventually it'll send the rest of the data
export const clothesPresset: IclothesPresset = {
    0: { componentId: 0, class: "prop", type: RageShared.Enums.ITEM_TYPES.ITEM_TYPE_HAT, isPlaced: false, quality: -1, image: "hat.svg" },
    1: { componentId: 1, class: "clothes", type: RageShared.Enums.ITEM_TYPES.ITEM_TYPE_MASK, isPlaced: false, quality: -1, image: "mask.svg" },
    2: { componentId: 1, class: "prop", type: RageShared.Enums.ITEM_TYPES.ITEM_TYPE_GLASSES, isPlaced: false, quality: -1, image: "glasses.svg" },
    3: { componentId: 2, class: "prop", type: RageShared.Enums.ITEM_TYPES.ITEM_TYPE_EARRINGS, isPlaced: false, quality: -1, image: "earRings.svg" },
    4: { componentId: 7, class: "clothes", type: RageShared.Enums.ITEM_TYPES.ITEM_TYPE_CHAIN, isPlaced: false, quality: -1, image: "chain.svg" },
    5: { componentId: 8, class: "clothes", type: RageShared.Enums.ITEM_TYPES.ITEM_TYPE_TSHIRT, isPlaced: false, quality: -1, image: "tShirt.svg" },
    6: { componentId: 11, class: "clothes", type: RageShared.Enums.ITEM_TYPES.ITEM_TYPE_TOP, isPlaced: false, quality: -1, image: "top.svg" },
    7: { componentId: 5, class: "clothes", type: RageShared.Enums.ITEM_TYPES.ITEM_TYPE_BACKPACK, isPlaced: false, quality: -1, image: "backpack.svg" },
    8: { componentId: 5, class: "misc", type: RageShared.Enums.ITEM_TYPES.ITEM_TYPE_WALLET, isPlaced: false, quality: -1, image: "wallet.svg" },
    9: { componentId: 9, class: "clothes", type: RageShared.Enums.ITEM_TYPES.ITEM_TYPE_ARMOUR, isPlaced: false, quality: -1, image: "armour.svg" },
    10: { componentId: 6, class: "prop", type: RageShared.Enums.ITEM_TYPES.ITEM_TYPE_WATCH, isPlaced: false, quality: -1, image: "watch.svg" },
    11: { componentId: 3, class: "prop", type: RageShared.Enums.ITEM_TYPES.ITEM_TYPE_GLOVES, isPlaced: false, quality: -1, image: "gloves.svg" },
    12: { componentId: 4, class: "clothes", type: RageShared.Enums.ITEM_TYPES.ITEM_TYPE_PANTS, isPlaced: false, quality: -1, image: "pants.svg" },
    13: { componentId: 6, class: "clothes", type: RageShared.Enums.ITEM_TYPES.ITEM_TYPE_SHOES, isPlaced: false, quality: -1, image: "shoes.svg" }
};

export const backpackQuality: { [key: number]: number } = {
    0: 12, //level 0
    1: 24 //level 1
};

export const backpackWeight: { [key: number]: number } = {
    0: 10.0,
    1: 15.0
};

export const inventorydataPresset = {
    clothes: {
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
    } as { [key: number]: RageShared.Interfaces.Inventory.IInventoryItem | null },
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
    },

    quickUse: {
        0: null,
        1: null,
        2: null,
        3: null,
        4: null,
        5: null
    }
};
export const backpackDataPreset = {
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
};
