// import { inventoryAssets } from "../Items.module";

// type onUse = (player: PlayerMp) => void | Promise<void>;
// type onDrop = (player: PlayerMp) => void | Promise<void>;

// export class ItemRegistry implements RageShared.Interfaces.Inventory.IBaseItem {
//     static List: Map<RageShared.Enums.ITEM_TYPES, RageShared.Interfaces.Inventory.IBaseItem> = new Map();

//     type: RageShared.Enums.ITEM_TYPES;
//     typeCategory: RageShared.Enums.ITEM_TYPE_CATEGORY;
//     isPlaced: boolean;
//     quality: number;
//     image: string;
//     hash: string;
//     key: string;
//     render: string;
//     name: string;
//     description: string;
//     count: number;
//     weight: number;
//     maxStack: number;
//     options: string[];
//     gender: number | null;

//     modelHash?: string | undefined;
//     ammoType?: string | undefined;
//     ammoInClip?: number | undefined;
//     amount?: number | undefined;

//     effect?: { [key: string]: number } | undefined;
//     data?: { [key: string]: string | number | null } | undefined;
//     components?: number[] | undefined;

//     onUse?: onUse;
//     onDrop?: onDrop;

//     constructor(itemData: RageShared.Interfaces.Inventory.IBaseItem, functionality?: { onUse?: onUse; onDrop?: onDrop }) {
//         const { type, typeCategory, image, render, name, description, weight, maxStack, options, modelHash } = itemData;

//         this.type = type;
//         this.typeCategory = typeCategory;
//         this.image = image;
//         this.render = render;
//         this.name = name;
//         this.description = description;
//         this.weight = weight;
//         this.maxStack = maxStack;
//         this.options = options;
//         this.modelHash = modelHash;
//         this.count = 0; // Default count to 0
//         this.quality = -1; // Default quality
//         this.gender = null; // Default gender
//         this.isPlaced = false; // Default isPlaced

//         this.onUse = functionality?.onUse;
//         this.onDrop = functionality?.onDrop;

//         ItemRegistry.List.set(type, itemData);
//     }
// }
