// import { RageShared } from "@shared/index";
// import { inventoryAssets } from "./Items.module";

// /**
//  * Interface for item event handlers.
//  */
// export interface ItemHandlers {
//     onUse?: (player: PlayerMp) => void | Promise<void>;
//     onDrop?: (player: PlayerMp) => void | Promise<void>;
//     onEquip?: (player: PlayerMp) => void | Promise<void>;
// }

// /**
//  * Inventory item class to handle item properties and events.
//  */
// export class InventoryItem {
//     static list: Record<string, InventoryItem> = {};

//     // Item properties
//     readonly type: RageShared.Inventory.Enums.ITEM_TYPES;
//     readonly typeCategory: RageShared.Inventory.Enums.ITEM_TYPE_CATEGORY;
//     readonly name: string;
//     readonly description: string;
//     readonly image: string;
//     readonly weight: number;
//     readonly maxStack: number;

//     quality: number;
//     count: number;
//     isPlaced: boolean;
//     options: string[];
//     gender: number | null;
//     items?: Record<number, RageShared.Inventory.Interfaces.IBaseItem | null>;
//     modelHash?: string;
//     ammoType?: string;
//     ammoInClip?: number;
//     amount?: number;
//     effect?: Record<string, number>;
//     components?: number[];

//     // Event handlers
//     onUse: (player: PlayerMp) => void | Promise<void>;
//     onDrop: (player: PlayerMp) => void | Promise<void>;
//     onEquip: (player: PlayerMp) => void | Promise<void>;

//     constructor(
//         item: RageShared.Inventory.Interfaces.IBaseItem,
//         handlers: ItemHandlers = {}
//     ) {
//         // Assign item properties
//         const {
//             type, typeCategory, name, description, image, weight, maxStack,
//             quality, count, isPlaced, options, gender, items, modelHash,
//             ammoType, ammoInClip, amount, effect, components,
//         } = item;

//         Object.assign(this, {
//             type, typeCategory, name, description, image, weight, maxStack,
//             quality, count, isPlaced, options, gender, items, modelHash,
//             ammoType, ammoInClip, amount, effect, components,
//         });

//         // Assign handlers with defaults
//         this.onUse = handlers.onUse || (() => { });
//         this.onDrop = handlers.onDrop || (() => { });
//         this.onEquip = handlers.onEquip || (() => { });

//         // Register the item in the static list
//         InventoryItem.list[type] = this;
//     }

//     /**
//      * Static method to create and register a new inventory item.
//      */
//     static register(
//         item: RageShared.Inventory.Interfaces.IBaseItem,
//         handlers: ItemHandlers = {}
//     ): InventoryItem {
//         return new InventoryItem(item, handlers);
//     }
// }

// export class InventoryItemBuilder {
//     private item: Partial<RageShared.Inventory.Interfaces.IBaseItem> = {};
//     private handlers: ItemHandlers = { onDrop: () => { }, onEquip: () => { }, onUse: () => { } };

//     // Core setters
//     setType(type: RageShared.Inventory.Enums.ITEM_TYPES): this {
//         this.item.type = type;
//         return this;
//     }

//     setCategory(category: RageShared.Inventory.Enums.ITEM_TYPE_CATEGORY): this {
//         this.item.typeCategory = category;
//         return this;
//     }

//     setName(name: string): this {
//         this.item.name = name;
//         return this;
//     }

//     setDescription(description: string): this {
//         this.item.description = description;
//         return this;
//     }

//     setImage(image: string): this {
//         this.item.image = image;
//         return this;
//     }

//     setWeight(weight: number): this {
//         this.item.weight = weight;
//         return this;
//     }

//     setMaxStack(maxStack: number): this {
//         this.item.maxStack = maxStack;
//         return this;
//     }

//     // Optional properties setters
//     setQuality(quality: number): this {
//         this.item.quality = quality;
//         return this;
//     }

//     setCount(count: number): this {
//         this.item.count = count;
//         return this;
//     }

//     setGender(gender: number | null): this {
//         this.item.gender = gender;
//         return this;
//     }

//     setItems(items: Record<number, RageShared.Inventory.Interfaces.IBaseItem | null>): this {
//         this.item.items = items;
//         return this;
//     }

//     setModelHash(modelHash: string): this {
//         this.item.modelHash = modelHash;
//         return this;
//     }

//     setAmmoType(ammoType: string): this {
//         this.item.ammoType = ammoType;
//         return this;
//     }

//     setAmmoInClip(ammoInClip: number): this {
//         this.item.ammoInClip = ammoInClip;
//         return this;
//     }

//     setAmount(amount: number): this {
//         this.item.amount = amount;
//         return this;
//     }

//     setEffect(effect: Record<string, number>): this {
//         this.item.effect = effect;
//         return this;
//     }

//     setComponents(components: number[]): this {
//         this.item.components = components;
//         return this;
//     }

//     setOptions(options: string[]): this {
//         this.item.options = options;
//         return this;
//     }

//     setIsPlaced(isPlaced: boolean): this {
//         this.item.isPlaced = isPlaced;
//         return this;
//     }

//     // Handlers setters
//     setHandlers(handlers: ItemHandlers): this {
//         this.handlers = handlers;
//         return this;
//     }

//     register(): InventoryItem {
//         return InventoryItem.register(this.item as RageShared.Inventory.Interfaces.IBaseItem, this.handlers);
//     }
// }
// Object.values(inventoryAssets.items).forEach(item => {
//     new InventoryItemBuilder()
//         .setType(item.type)
//         .setCategory(item.typeCategory)
//         .setName(item.name)
//         .setDescription(item.description || "")
//         .setImage(item.image)
//         .setWeight(item.weight)
//         .setMaxStack(item.maxStack)
//         .setOptions(item.options || [])
//         .setQuality(item.quality || 0)
//         .setCount(item.count || 1)
//         .setGender(item.gender || null)
//         .setModelHash(item.modelHash || "")
//         .setHandlers({
//             onUse: (player) => player.outputChatBox(`Used ${item.name}`),
//             onDrop: (player) => player.outputChatBox(`Dropped ${item.name}`),
//             onEquip: (player) => player.outputChatBox(`Equipped ${item.name}`),
//         })
//         .register();
// });
