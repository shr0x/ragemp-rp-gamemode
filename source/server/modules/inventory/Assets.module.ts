import { RageShared } from "@shared/index";
import { inventoryAssets } from "./Items.module";

const defaultClothes: { [key: number]: Array<{ type: "props" | "clothing"; component: number; drawable: number; texture: number }> } = {
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

const backpackQuality: { [key: number]: number } = {
    0: 12, //level 0
    1: 24 //level 1
};

const backpackWeight: { [key: number]: number } = {
    0: 10.0,
    1: 15.0
};
const inventorydataPresset = {
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
    } as { [key: number]: RageShared.Inventory.Interfaces.IBaseItem | null },
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

const backpackDataPreset = {
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

export { defaultClothes, backpackQuality, backpackWeight, inventorydataPresset, backpackDataPreset };
