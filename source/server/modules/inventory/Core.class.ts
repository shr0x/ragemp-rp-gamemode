import { v4 as uuidv4 } from "uuid";
import { RAGERP } from "@api";

import { RageShared, StringifiedObject } from "@shared/index";
import { splitInventoryItem } from "./SplitItem.module";
import { moveInventoryItem } from "./MoveItem.module";
import { useInventoryItem } from "./UseItem.module";
import { manageInventoryFastSlot } from "./Quickuse.module";
import { backpackWeight, defaultClothes } from "./Assets.module";
import { inventoryAssets } from "./Items.module";

import { InventoryItemsEntity } from "@entities/Inventory.entity";
import { Utils } from "@shared/utils.module";
import { dropInventoryItem } from "./DropItem.module";
import { ItemObject } from "./ItemObject.class";

import * as maleClothes from "../../json/maleTorso.json";
import * as femaleClothes from "../../json/femaleTorso.json";

type IClothesData = Record<number, Record<number, { BestTorsoDrawable: number; BestTorsoTexture: number }>>;
const torsoDataMale: IClothesData = maleClothes;
const femaleTorsos: IClothesData = femaleClothes;

interface IUsingItemData {
    item: RageShared.Inventory.Interfaces.IBaseItem;
    animDict?: string;
    animName?: string;
    flag?: number;
    attachObject?: string;
}

class InventoryBase {
    private readonly _player: PlayerMp;

    public items: {
        pockets: { [key: number]: Omit<RageShared.Inventory.Interfaces.IBaseItem, "components"> | null };
        clothes: { [key: number]: RageShared.Inventory.Interfaces.IBaseItem | null };
    } = { clothes: {}, pockets: {} };

    public quickUse: { [key: number]: { component: "pockets"; id: number } | null };
    public weight: number = 40.0;

    public equippedWeapons: { [key: number]: { weaponhash: number; isActive: boolean } } = {};

    constructor(
        p: PlayerMp,
        clothes: { [key: number]: RageShared.Inventory.Interfaces.IBaseItem | null },
        pockets: { [key: number]: RageShared.Inventory.Interfaces.IBaseItem | null },
        quickUse: { [key: number]: { component: "pockets"; id: number } | null }
    ) {
        this._player = p;
        this.items.clothes = clothes;
        this.items.pockets = pockets;
        this.quickUse = quickUse;
        this.weight = 40.0;
    }

    get player() {
        return this._player;
    }
}

class InventoryItem extends InventoryBase {
    /**
     * Sets a inventory item slot to empty
     * @param component which component to reset the item data to
     * @param slotid slot id to reset the data
     */
    public resetItemData(component: "pockets", slotid: number) {
        this.items[component][slotid] = null;
    }

    /**
     * Resets a clothing slot back to its default state.
     * @param slot Clothing slot (0-13)
     */
    public resetClothingItemData(slot: number): void {
        this.items.clothes[slot] = null;
    }

    /**
     * Get a free available inventory item slot
     * @returns itemIndex (slot index) && type: category type
     */
    public getFreeSlot(): { itemIndex: number; type: inventoryAssets.INVENTORY_CATEGORIES.POCKETS } {
        let type: inventoryAssets.INVENTORY_CATEGORIES = inventoryAssets.INVENTORY_CATEGORIES.POCKETS;
        let itemIndex = Object.values(this.items.pockets).findIndex((e) => !e);
        return { itemIndex, type };
    }

    public getTotalFreeSlots() {
        return Object.values(this.items.pockets).filter((e) => !e).length;
    }

    public getClothingIndex(type: RageShared.Inventory.Enums.ITEM_TYPES) {
        const clothingList: { [key: string]: number } = {
            [RageShared.Inventory.Enums.ITEM_TYPES.ITEM_TYPE_HAT]: 0,
            [RageShared.Inventory.Enums.ITEM_TYPES.ITEM_TYPE_MASK]: 1,
            [RageShared.Inventory.Enums.ITEM_TYPES.ITEM_TYPE_GLASSES]: 2,
            [RageShared.Inventory.Enums.ITEM_TYPES.ITEM_TYPE_EARRINGS]: 3,
            [RageShared.Inventory.Enums.ITEM_TYPES.ITEM_TYPE_CHAIN]: 4,
            [RageShared.Inventory.Enums.ITEM_TYPES.ITEM_TYPE_TSHIRT]: 5,
            [RageShared.Inventory.Enums.ITEM_TYPES.ITEM_TYPE_TOP]: 6,
            [RageShared.Inventory.Enums.ITEM_TYPES.ITEM_TYPE_BACKPACK]: 7,
            [RageShared.Inventory.Enums.ITEM_TYPES.ITEM_TYPE_WALLET]: 8,
            [RageShared.Inventory.Enums.ITEM_TYPES.ITEM_TYPE_ARMOUR]: 9,
            [RageShared.Inventory.Enums.ITEM_TYPES.ITEM_TYPE_WATCH]: 10,
            [RageShared.Inventory.Enums.ITEM_TYPES.ITEM_TYPE_GLOVES]: 11,
            [RageShared.Inventory.Enums.ITEM_TYPES.ITEM_TYPE_PANTS]: 12,
            [RageShared.Inventory.Enums.ITEM_TYPES.ITEM_TYPE_SHOES]: 13
        };
        return clothingList[type] ?? -1;
    }

    public addItem(type: RageShared.Inventory.Enums.ITEM_TYPES): RageShared.Inventory.Interfaces.IBaseItem | null {
        const itemData = inventoryAssets.items[type];
        const { itemIndex } = this.getFreeSlot();
        if (!itemData || itemIndex < 0) return null;

        this.items.pockets[itemIndex] = { ...itemData, quality: 4, hash: uuidv4(), count: 1 };
        return this.items.pockets[itemIndex];
    }

    /**
     * Adds a clothing item to player's inventory with the option to equip it right away
     * @param type Clothing type
     * @param data Clothing data, such as component, drawable and texture
     * @param equipNow Whether to equip it right away or not (rewrites current item if any)
     * @returns InventoryItem | null
     */
    public addClothingItem(
        type: RageShared.Inventory.Enums.ITEM_TYPES,
        data: { component: number; drawable: number; texture: number },
        equipNow: boolean = false
    ): RageShared.Inventory.Interfaces.IBaseItem | null {
        const [itemData, itemIndex] = [inventoryAssets.items[type], equipNow ? this.getFreeSlot().itemIndex : this.getClothingIndex(type)];
        if (!itemData || itemIndex < 0) return null;
        const items = equipNow ? this.items.clothes : this.items.pockets;
        items[itemIndex] = { ...itemData, key: `${type} ${JSON.stringify({ ...data })}`, hash: uuidv4() };
        return items[itemIndex];
    }

    async addPlayerItem(item: RageShared.Inventory.Interfaces.IBaseItem) {
        try {
            let { itemIndex, type } = this.getFreeSlot();
            if (itemIndex === -1) return false;
            this.items[type][itemIndex] = item;
            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    async addPlayerItemEx(item: RageShared.Inventory.Interfaces.IBaseItem, category: inventoryAssets.INVENTORY_CATEGORIES, slot: number) {
        try {
            if (this.items[category][slot] !== null) return false;
            this.items[category][slot] = item;
            return true;
        } catch (err) {
            return false;
        }
    }

    async addMultipleItems(items: RageShared.Inventory.Interfaces.IBaseItem[]) {
        try {
            let itemCount = items.length;
            let { itemIndex, type } = this.getFreeSlot();
            if (itemIndex === -1) return false;
            for (let i = 0; i < itemCount; i++) {
                this.items[type][itemIndex] = items[i];
                itemIndex++;
            }
            return true;
        } catch (err) {
            console.log(err);
        }
    }
}

class QuickUse extends InventoryItem {
    public clearQuickUseSlot() {}

    /**
     * Checks if an item is in quick use by component and id.
     *
     * @param {string} component - The component to check.
     * @param {number} id - The id to check.
     * @returns {number} - The index of the item in quick use or -1 if not found.
     */
    public isItemInQuickUse(component: string, id: number): number {
        for (const index in this.quickUse) {
            const item = this.quickUse[index];
            if (item && item.component === component && item.id === id) {
                return Number(index);
            }
        }
        return -1;
    }
}

class InventoryClothes extends QuickUse {
    /**
     * Returns whether a player is wearing a specified clothing index or not.
     * @param type Clothing Index
     * @returns {boolean}
     */
    public isWearingClothingType(type: inventoryAssets.INVENTORY_CLOTHING): boolean {
        return this.items.clothes[type]?.isPlaced ?? false;
    }

    /**
     * Updates on-screen ped for a specified player.
     * @param type
     * @param componentid clothing component id
     * @param drawableid clothing drawable id
     * @param texture clothing texture id
     * @param palette clothing palette id
     * @returns void
     */
    public updateOnScreenPed(type: "prop" | "clothes", componentid: number, drawableid: number, texture: number, palette: number = 2) {
        if (!this.player || !mp.players.exists(this.player)) return;
        return this.player.call(type === "prop" ? "client:inventory:updatePedProp" : "client:inventory:updatePedComponent", [componentid, drawableid, texture, palette]);
    }

    /**
     * 'Fixes' player body undershirts (gaps and showing body part issues), special thanks to rootcause for v-besttorso
     * @param player Player to update torso to
     * @param drawable clothing drawable id
     * @param texture clothing texture id
     * @returns void
     */
    public updatePlayerTorso(player: PlayerMp, drawable: number, texture: number) {
        try {
            const freemodeModels = [mp.joaat("mp_m_freemode_01"), mp.joaat("mp_f_freemode_01")];
            const isMaleModel = player.model === freemodeModels[0];
            const torsoData = isMaleModel ? torsoDataMale : femaleTorsos;
            if (torsoData[drawable]?.[texture]) {
                const { BestTorsoDrawable, BestTorsoTexture } = torsoData[drawable][texture];

                if (BestTorsoDrawable !== undefined && BestTorsoTexture !== undefined && BestTorsoDrawable !== -1) {
                    player.setClothes(RageEnums.ClothesComponent.TORSO, BestTorsoDrawable, BestTorsoTexture, 2);
                    this.updateOnScreenPed("clothes", RageEnums.ClothesComponent.TORSO, BestTorsoDrawable, BestTorsoTexture);
                }
            }
        } catch (err) {
            console.log(err);
        }
    }

    /**
     * Remove props or clothes from given player.
     * @param player the player to remove clothes from
     * @param slotnumber slot number based on INVENTORY_CLOTHING
     * @returns void
     */
    public removeClothes(player: PlayerMp, slotnumber: number): void {
        if (!player || !mp.players.exists(player) || !player.character || slotnumber === inventoryAssets.INVENTORY_CLOTHING.TYPE_WALLET) return;
        const sex = player.character.gender;
        const default_clothes = defaultClothes[slotnumber][sex];
        const { type, component, drawable, texture } = default_clothes;

        if (type === "props") {
            player.setProp(component, drawable, texture);
            this.updateOnScreenPed("prop", component, drawable, texture);
        } else {
            player.setClothes(component, drawable, texture, 2);
            this.updateOnScreenPed("clothes", component, drawable, texture);
        }
    }

    public convertUndershirtToShirt(undershirtid: number): number {
        return -1;
    }

    /**
     * Loads clothes or removes clothes based on the provided data.
     * @param {PlayerMp} player The player to load or remove clothes for.
     * @param {number} slotnumber The slot number indicating the type of clothing.
     * @param {{ component: number; drawable: number; texture: number } | null} data The data containing component, drawable, and texture information, or null to remove clothes.
     * @returns {void}
     */
    public loadClothes(player: PlayerMp, slotnumber: number, data: { component: number; drawable: number; texture: number } | null): void {
        data === null ? this.removeClothes(player, slotnumber) : this.setClothes(player, slotnumber, data);
    }

    /**
     * Sets clothes or props for a player based on the slot number and provided data.
     * @param {PlayerMp} player The player to set clothes or props for.
     * @param {number} slotnumber The slot number indicating the type of clothing or prop.
     * @param {{ component: number; drawable: number; texture: number }} data The data containing component, drawable, and texture information.
     * @returns {void}
     */
    public setClothes(player: PlayerMp, slotnumber: number, data: { component: number; drawable: number; texture: number }): void {
        if (!mp.players.exists(player) || !player.getVariable("loggedin") || !player.character || !player.character.inventory) return;
        if (typeof data.component == "undefined" || isNaN(data.component) || isNaN(data.drawable) || isNaN(data.texture)) return;

        const itemData = player.character.inventory.items.clothes[slotnumber];
        if (!itemData) return;

        if (itemData.typeCategory === RageShared.Inventory.Enums.ITEM_TYPE_CATEGORY.TYPE_PROP) {
            player.setProp(data.component, data.drawable, data.texture);
            this.updateOnScreenPed("prop", data.component, data.drawable, data.texture);
            return;
        }

        switch (slotnumber) {
            case inventoryAssets.INVENTORY_CLOTHING.TYPE_TSHIRT: {
                if (this.items.clothes[inventoryAssets.INVENTORY_CLOTHING.TYPE_JACKET]?.isPlaced) {
                    data = { ...data, drawable: data.drawable, texture: data.texture };
                    player.setClothes(8, data.drawable, data.texture, 2);
                    return;
                }
                let converted = this.convertUndershirtToShirt(data.drawable);
                data = { ...data, drawable: converted, texture: data.texture };
                player.setClothes(11, data.drawable, data.texture, 2);
                this.updatePlayerTorso(player, data.drawable, data.texture);
                this.updateOnScreenPed("clothes", data.component, data.drawable, data.texture, 0);
                return;
            }
            case inventoryAssets.INVENTORY_CLOTHING.TYPE_JACKET: {
                if (itemData.isPlaced) {
                    const shirtData = itemData.key.replace(RageShared.Inventory.Enums.ITEM_TYPES.ITEM_TYPE_TOP, "");
                    const undershirtDrawable = JSON.parse(shirtData);
                    if (typeof undershirtDrawable == "undefined" || typeof undershirtDrawable.drawable == "undefined") {
                        return;
                    }
                    player.setClothes(8, undershirtDrawable.drawable, undershirtDrawable.texture, 2);
                    player.setClothes(data.component, data.drawable, data.texture, 2);
                    this.updatePlayerTorso(player, data.drawable, data.texture);
                    return;
                }
                data = { ...data, component: 11, drawable: data.drawable, texture: data.texture };
                if (typeof data.component == "undefined" || typeof data.drawable == "undefined" || isNaN(data.drawable) || isNaN(data.texture)) {
                    return;
                }
                player.setClothes(3, 15, 0, 0);
                player.setClothes(8, 0, -1, 2);

                player.setClothes(data.component, data.drawable, data.texture, 2);
                this.updatePlayerTorso(player, data.drawable, data.texture);
                this.updateOnScreenPed("clothes", data.component, data.drawable, data.texture, 0);
                return;
            }
            case inventoryAssets.INVENTORY_CLOTHING.TYPE_BACKPACK: {
                player.setClothes(data.component, data.drawable, data.texture, 2);
                this.updateOnScreenPed("clothes", data.component, data.drawable, data.texture, 0);
                return;
            }
            case inventoryAssets.INVENTORY_CLOTHING.TYPE_ARMOUR: {
                if (this.items.clothes[inventoryAssets.INVENTORY_CLOTHING.TYPE_ARMOUR]?.isPlaced) {
                    let item = this.items.clothes[inventoryAssets.INVENTORY_CLOTHING.TYPE_ARMOUR];
                    player.armour = item.amount ?? 0;
                }
                player.setClothes(data.component, data.drawable, data.texture, 2);
                this.updateOnScreenPed("clothes", data.component, data.drawable, data.texture, 0);
                return;
            }
            default: {
                player.setClothes(data.component, data.drawable, data.texture, 2);
                this.updateOnScreenPed("clothes", data.component, data.drawable, data.texture, 0);
                return;
            }
        }
    }
    /**
     * Reloads clothes for the player based on the items stored in the inventory.
     * @param {PlayerMp} player The player whose clothes need to be reloaded.
     * @returns {void}
     */
    public reloadClothes(player: PlayerMp): void {
        Object.entries(this.items.clothes).forEach(([index, clothing]) => {
            if (!clothing) return this.removeClothes(player, parseInt(index));
            const clothingKey = clothing.key?.replace(clothing.type, "");
            const parsedKey = clothingKey ? Utils.tryParse(clothingKey) : null;
            this.loadClothes(player, parseInt(index), clothing.isPlaced ? parsedKey : null);
        });
    }
    /**
     * Resets all clothes for the player, removing all equipped clothes.
     * @param {PlayerMp} player The player whose clothes need to be reset.
     * @returns {void}
     */
    public resetClothes(player: PlayerMp): void {
        Object.values(this.items.clothes).forEach((e, i) => {
            this.removeClothes(player, i);
        });
    }
    /**
     * Resets all props for the player, removing all equipped props.
     * @param {PlayerMp} player The player whose props need to be reset.
     * @returns {void}
     */
    public resetProps(player: PlayerMp): void {
        Object.values(this.items.clothes)
            .filter((x) => x && x.typeCategory === RageShared.Inventory.Enums.ITEM_TYPE_CATEGORY.TYPE_PROP)
            .forEach((e, i) => {
                this.removeClothes(player, i);
            });
    }
}

class InventoryAction extends InventoryClothes {
    async moveItem(player: PlayerMp, data: StringifiedObject<RageShared.Inventory.Interfaces.IMoveItem>): Promise<void> {
        await moveInventoryItem(player, data);
    }

    openItem(player: PlayerMp, data: any): void {
        try {
        } catch (err) {
            console.log("openInventoryItem err: ", err);
        }
    }

    async useItem(player: PlayerMp, data: string): Promise<void> {
        await useInventoryItem(player, data);
    }

    public deleteItemStack(player: PlayerMp, data: string): void {
        if (!player.character || !mp.players.exists(player) || !player.character.inventory) return;

        try {
            const { item }: { item: RageShared.Inventory.Interfaces.IBaseItem } = JSON.parse(data);

            const source = player.character.inventory.getItemSlotComponentByHash(item.hash) as {
                component: inventoryAssets.INVENTORY_CATEGORIES | null;
                slot: number | null;
            } | null;

            if (!source || !source.component || source.slot === null) return;

            const itemData = player.character.inventory.items[source.component][source.slot];
            if (!itemData) return;

            const count = itemData.count;

            if (count > 1) {
                player.character.inventory.items[source.component][source.slot] = { ...item, count: count - 1 };
                player.character.inventory.setInventory(player);
            } else {
                const fastSlotIndex = Object.values(player.character.inventory.quickUse).findIndex((e) => e && e.component === source.component && Utils.tryParse(e.id) === source.slot);
                if (fastSlotIndex !== -1) {
                    player.character.inventory.quickUse[fastSlotIndex] = null;
                }

                player.character.inventory.deleteItem(player, item.hash);
            }

            if (source.component === "clothes") {
                player.character.inventory.loadInventory(player);
            }
        } catch (err) {
            console.error("deleteInventoryItemStack err: ", err);
        }
    }

    deleteItem(player: PlayerMp, uuid: string): void {
        if (!player.character || !mp.players.exists(player) || !player.character.inventory) return;

        try {
            const { items, quickUse } = player.character.inventory;

            for (const category in items) {
                if (Object.prototype.hasOwnProperty.call(items, category)) {
                    const categoryItems = items[category as inventoryAssets.INVENTORY_CATEGORIES];

                    for (const [slot, item] of Object.entries(categoryItems)) {
                        if (!item) continue;

                        if (item.hash === uuid) {
                            const parsedSlot = Utils.tryParse(slot);
                            const fastSlotIndex = Object.values(quickUse).findIndex((e) => e && e.component === category && Utils.tryParse(e.id) === parsedSlot);

                            if (fastSlotIndex !== -1) {
                                quickUse[fastSlotIndex] = null;
                            }
                            items[category as inventoryAssets.INVENTORY_CATEGORIES][parsedSlot] = null;
                            player.character.inventory.setInventory(player);

                            if (category === "clothes") {
                                player.character.inventory.loadInventory(player);
                            }
                            return;
                        }
                    }
                }
            }
        } catch (err) {
            console.error("deleteInventoryItem err: ", err);
        }
    }
}

export class Inventory extends InventoryAction {
    public getItemModel(itemType: RageShared.Inventory.Enums.ITEM_TYPES) {
        const item = inventoryAssets.items[itemType];
        if (!item) return null;
        return item.modelHash;
    }

    getItemAndStack(itemType: RageShared.Inventory.Enums.ITEM_TYPES) {
        return this.getItemsInCategoryByType([inventoryAssets.INVENTORY_CATEGORIES.POCKETS], itemType);
    }

    /**
     * Get items by hash name.
     * @warning This function will also check if the item count is not maxed out.
     * @param {string} itemHash -> Item hash name
     * @returns -> An array of items.
     */
    getItemsByHashName(itemHash: RageShared.Inventory.Enums.ITEM_TYPES): RageShared.Inventory.Interfaces.IBaseItem[] {
        let foundItems: RageShared.Inventory.Interfaces.IBaseItem[] = [];

        for (const getcategory in this.items) {
            let category = getcategory as inventoryAssets.INVENTORY_CATEGORIES;
            for (const item of Object.values(this.items[category])) {
                if (!item) continue;
                if (item.type !== null && item.count !== item.maxStack && item.type === itemHash) {
                    foundItems.push(item);
                }
            }
        }
        return foundItems;
    }

    /**
     * Get items in the specified categories by their type name.
     *
     * @param {inventoryAssets.INVENTORY_CATEGORIES[]} category - The categories to search within.
     * @param {RageShared.Inventory.Enums.ITEM_TYPES} type - The item type to search for.
     * @returns {RageShared.Inventory.Interfaces.IBaseItem[]} An array of found items.
     */
    public getItemsInCategoryByType(category: inventoryAssets.INVENTORY_CATEGORIES[], type: RageShared.Inventory.Enums.ITEM_TYPES): RageShared.Inventory.Interfaces.IBaseItem[] {
        const foundItems: RageShared.Inventory.Interfaces.IBaseItem[] = [];

        for (const [categoryName, items] of Object.entries(this.items)) {
            if (!category.includes(categoryName as inventoryAssets.INVENTORY_CATEGORIES)) {
                continue;
            }
            for (const item of Object.values(items)) {
                if (item && item.type === type) {
                    foundItems.push(item);
                }
            }
        }
        return foundItems;
    }

    /**
     * Get an item by UUID
     * This method also looks for the item in clothes
     * @param hashKey Item hash key (.hash)
     * @returns RageShared.Inventory.Interfaces.IBaseItem | null
     */
    public getItemByUUID(hashKey: string): RageShared.Inventory.Interfaces.IBaseItem | null {
        let item = Object.values(this.items.pockets).find((x) => x && x.hash === hashKey);
        if (!item) item = Object.values(this.items.clothes).find((x) => x && x.hash === hashKey);
        return item ?? null;
    }

    /**
     *
     * @param backpackHash backpack hash which the item will be looked on to
     * @param uuid item hash
     * @returns RageShared.Inventory.Interfaces.IBaseItem | null
     */
    public getBackpackItemByUUID(backpackHash: string, uuid: string) {
        const itemData = this.getItemByUUID(backpackHash);
        if (!itemData || !itemData.items) return null;

        const itemInBackpack = Object.values(itemData.items).find((x) => x && x.hash === uuid);
        return itemInBackpack ?? null;
    }

    /**
     * Get the total count of items by the specified item type.
     *
     * @param {RageShared.Inventory.Enums.ITEM_TYPES} itemType - The type of item to count.
     * @returns {{ items: string[], count: number }} An object containing an array of item hashes involved and the total count of the items.
     */
    public getAllCountByItemType(itemType: RageShared.Inventory.Enums.ITEM_TYPES): { items: string[]; count: number } {
        let foundCount: number = 0;
        let itemsInvolved: string[] = [];

        for (const [key, value] of Object.entries(this.items)) {
            if (key === "clothes" || key === "quickUse") continue;

            const entryValue = Object.values(value);
            for (let i = 0; i < entryValue.length; i++) {
                const item = entryValue[i];

                if (item && item.type === itemType) {
                    foundCount += item.count;
                    itemsInvolved.push(item.hash);
                }
            }
        }
        return { items: itemsInvolved, count: foundCount };
    }

    getItemSlotComponentByHash(hashKey: string): { component: string; slot: number } | null {
        let foundItem: null | { component: string; slot: number } = null;

        for (const [key, value] of Object.entries(this.items)) {
            for (let i = 0; i < Object.values(value).length; i++) {
                const itemData = value[i];
                if (!itemData) continue;
                if (!itemData.hash) continue;
                if (itemData.hash === hashKey) {
                    foundItem = { component: key, slot: i };
                    break;
                }
            }
        }
        return foundItem;
    }

    async getItemSlotComponentByHashKey(hashKey: string): Promise<{ component: string; slot: number } | null> {
        for (const [key, value] of Object.entries(this.items)) {
            for (let i = 0; i < Object.values(value).length; i++) {
                const item = value[i];
                if (!item) continue;
                if (item.hash === hashKey) {
                    return { component: key, slot: i };
                }
            }
        }
        return null;
    }

    getCountStack(item: RageShared.Inventory.Interfaces.IBaseItem) {
        if (item.type === null) return -1;

        let presset = inventoryAssets.items[item.type];
        let count = item.count;
        let result = [];
        let length = Math.ceil(count / presset.maxStack);
        if (length <= 1) return [item];
        else
            for (let index = 0; index < length; index++) {
                count -= presset.maxStack;
                if (count > 0) result.push({ ...item, count: presset.maxStack });
                else result.push({ ...item, count: presset.maxStack + count });
            }
        return result;
    }

    public loadInventory(player: PlayerMp): void {
        if (!player || !player.character || !this.items) return;

        for (let i = 0; i <= 13; i++) {
            if (this.items.clothes[i]) {
                const playerClothes = this.items.clothes[i];
                if (playerClothes && playerClothes.key && playerClothes.isPlaced && playerClothes.type !== null) {
                    const data = playerClothes.key.replace(playerClothes.type, "");
                    this.loadClothes(player, i, Utils.tryParse(data));
                }
            } else {
                this.removeClothes(player, i);
            }
        }
    }

    setInventory(player: PlayerMp): void {
        try {
            let data = { pockets: this.items.pockets };

            RAGERP.cef.emit(player, "inventory", "setMaxWeight", this.getWeight());
            RAGERP.cef.emit(player, "inventory", "setInventory", data);
            RAGERP.cef.emit(player, "inventory", "setQuickUseItems", this.quickUse);
            RAGERP.cef.emit(player, "inventory", "setClothes", this.items.clothes);

            const droppedItems = ItemObject.fetchInRange(player, 2);
            const groundItems: { [key: number]: RageShared.Inventory.Interfaces.IBaseItem | null } = {};

            for (let i = 0; i < 24; i++) {
                groundItems[i] = droppedItems[i] ?? null;
            }
            RAGERP.cef.emit(player, "inventory", "setDroppedItems", groundItems);

            this.save(player);
        } catch (err) {
            console.error("error at inventory.setInventory | ", err);
        }
    }

    async save(player: PlayerMp): Promise<void> {
        if (!player.character) return;

        await RAGERP.database
            .getRepository(InventoryItemsEntity)
            .update({ id: player.character.items.id }, { pockets: this.items.pockets, clothes: this.items.clothes, quickUse: this.quickUse })
            .catch((err) => console.log(err.message));
    }

    //#region Weapon
    isWeapon(item: RageShared.Inventory.Interfaces.IBaseItem): boolean {
        return item.typeCategory === RageShared.Inventory.Enums.ITEM_TYPE_CATEGORY.TYPE_WEAPON;
    }

    isAmmoItem(item: RageShared.Inventory.Interfaces.IBaseItem): boolean {
        return item.typeCategory === RageShared.Inventory.Enums.ITEM_TYPE_CATEGORY.TYPE_AMMO;
    }

    async reloadWeaponAmmo(player: PlayerMp, itemHash: RageShared.Inventory.Enums.ITEM_TYPES) {
        try {
            if (player.fastSlotActive === null || player.fastSlotActive < 0) return;

            let ammoHash = player.getVariable("ammoHash") as { items: string[]; count: number };
            const weaponGroup: number = await player.callProc("client::proc:getWeaponTypeGroup", [player.weapon]);

            if (!weaponGroup || weaponGroup === RageShared.Inventory.Enums.WEAPON_GROUP.UNKNOWN) return;

            const ammoTypeMap: { [key: number]: string } = {
                [RageShared.Inventory.Enums.WEAPON_GROUP.HANDGUNS]: RageShared.Inventory.Enums.ITEM_TYPES.ITEM_TYPE_PISTOLAMMO,
                [RageShared.Inventory.Enums.WEAPON_GROUP.SUBMACHINE]: RageShared.Inventory.Enums.ITEM_TYPES.ITEM_TYPE_SMGAMMO,
                [RageShared.Inventory.Enums.WEAPON_GROUP.SHOTGUN]: RageShared.Inventory.Enums.ITEM_TYPES.ITEM_TYPE_SHOTGUNAMMO,
                [RageShared.Inventory.Enums.WEAPON_GROUP.ASSAULTRIFLE]: RageShared.Inventory.Enums.ITEM_TYPES.ITEM_TYPE_RIFLEAMMO,
                [RageShared.Inventory.Enums.WEAPON_GROUP.LIGHTMACHINE]: RageShared.Inventory.Enums.ITEM_TYPES.ITEM_TYPE_MGAMMO,
                [RageShared.Inventory.Enums.WEAPON_GROUP.SNIPER]: RageShared.Inventory.Enums.ITEM_TYPES.ITEM_TYPE_RIFLEAMMO
            };

            const expectedItemHash = ammoTypeMap[weaponGroup];
            if (itemHash !== expectedItemHash) return;

            const fullAmmo = this.getAllCountByItemType(itemHash);
            if (!fullAmmo || !fullAmmo.items || !fullAmmo.items.length) return;

            if (ammoHash) {
                ammoHash.items = fullAmmo.items;
                ammoHash.count = fullAmmo.count;
            } else {
                ammoHash = fullAmmo;
            }

            player.setVariable("ammoHash", ammoHash);
            player.setVariable("itemAsAmmo", fullAmmo.items[0]);
            player.setWeaponAmmo(player.weapon, fullAmmo.count);
        } catch (err) {
            console.error("error at inventory.reloadWeaponAmmo | ", err);
        }
    }

    hasPistolItem() {
        let pistols = new Set([
            "weapon_pistol",
            "weapon_pistol_mk2",
            "weapon_combatpistol",
            "weapon_appistol",
            "weapon_stungun",
            "weapon_pistol50",
            "weapon_snspistol",
            "weapon_snspistol_mk2",
            "weapon_heavypistol",
            "weapon_vintagepistol",
            "weapon_flaregun",
            "weapon_marksmanpistol",
            "weapon_revolver",
            "weapon_revolvermk2",
            "weapon_doubleaction",
            "weapon_raypistol",
            "weapon_ceramicpistol",
            "weapon_navyrevolver",
            "weapon_gadgetpistol"
        ]);

        for (const [category, categoryItems] of Object.entries(this.items)) {
            if (category === "clothes" || category === "quickUse") continue;
            for (const item of Object.values(categoryItems)) {
                if (item === null) continue;
                if (pistols.has(item.type)) {
                    return true;
                }
            }
        }
        return false;
    }

    hasShotgun() {
        let shotguns = new Set([
            "weapon_pumpshotgun",
            "weapon_pumpshotgun_mk2",
            "weapon_sawnoffshotgun",
            "weapon_assaultshotgun",
            "weapon_bullpupshotgun",
            "weapon_mukset",
            "weapon_heavyshotgun",
            "weapon_doublebarrelshotgun",
            "weapon_autoshotgun",
            "weapon_combatshotgun"
        ]);

        for (const [category, categoryItems] of Object.entries(this.items)) {
            if (category === "clothes" || category === "quickUse") continue;
            for (const item of Object.values(categoryItems)) {
                if (item === null) continue;
                if (shotguns.has(item.type)) {
                    return true;
                }
            }
        }
        return false;
    }

    hasAssault() {
        const assaultrifles = new Set([
            "weapon_assaultrifle",
            "weapon_assaultrifle_mk2",
            "weapon_carbinerifle",
            "weapon_carbinerifle_mk2",
            "weapon_advancedrifle",
            "weapon_specialcarbine",
            "weapon_specialcarbine_mk2",
            "weapon_bullpuprifle",
            "weapon_bullpuprifle_mk2",
            "weapon_compactrifle"
        ]);
        let foundAssaultRifle = false;
        for (const [category, categoryItems] of Object.entries(this.items)) {
            if (category === "clothes" || category === "quickUse") continue;
            for (const itemValue of Object.values(categoryItems)) {
                if (itemValue === null) continue;
                if (assaultrifles.has(itemValue.type)) {
                    foundAssaultRifle = true;
                    break;
                }
            }
        }
        return foundAssaultRifle;
    }

    hasSMG() {
        const smg = new Set(["weapon_microsmg", "weapon_smg", "weapon_smg_mk2", "weapon_assaultsmg", "weapon_combatpdw", "weapon_machinepistol", "weapon_minismg", "weapon_raycarbine"]);
        let foundPistol = false;
        for (const [category, categoryItems] of Object.entries(this.items)) {
            if (category === "clothes" || category === "quickUse") continue;
            for (const itemValue of Object.values(categoryItems)) {
                if (itemValue === null) continue;
                if (smg.has(itemValue.type)) {
                    foundPistol = true;
                    break;
                }
            }
        }
        return foundPistol;
    }
    hasWeaponInFastSlot(type: RageShared.Inventory.Enums.ITEM_TYPES): boolean {
        for (const itemInFastSlot of Object.values(this.quickUse)) {
            if (!itemInFastSlot) {
                return false;
            }
            const item = this.items[itemInFastSlot.component][itemInFastSlot.id];
            if (item && item.type === type) {
                return true;
            }
        }
        return false;
    }

    //#endregion

    getWeight(): number {
        let weight = this.weight;
        if (this.items.clothes[inventoryAssets.INVENTORY_CLOTHING.TYPE_BACKPACK]?.isPlaced) {
            weight += backpackWeight[this.items.clothes[inventoryAssets.INVENTORY_CLOTHING.TYPE_BACKPACK].quality];
        }
        return weight;
    }

    getItemsWeight() {
        let weight = 0;

        let pocketItems = Object.values(this.items["pockets"]);
        for (let i = 0; i < pocketItems.length; i++) {
            const item = pocketItems[i];
            if (item !== null) {
                weight += item.weight;
            }
        }
        return weight;
    }

    checkWeight(newaddition: number): boolean {
        let totalweight = this.getWeight();
        let takenweight = this.getItemsWeight();
        let difference = totalweight - takenweight;
        if (difference < newaddition) return true;
        return false;
    }

    async dropItem(player: PlayerMp, itemData: string) {
        return await dropInventoryItem(player, itemData).catch((err) => console.log("dropItem: ", err));
    }

    splitStack(player: PlayerMp, data: any) {
        return splitInventoryItem(player, data);
    }

    async addCountToPlayerItem(player: PlayerMp, item: RageShared.Inventory.Interfaces.IBaseItem, count: number) {
        try {
            if (item.type === null) return;

            const findItem = this.getItemAndStack(item.type);

            if (findItem && findItem.length) {
                const playerItem = findItem.find((e) => e.count < e.maxStack) || findItem[0];
                const currentCount = playerItem.count;
                const maxStack = playerItem.maxStack;
                const remainingCount = Math.max(0, currentCount + count - maxStack);
                const newCount = Math.min(currentCount + count, maxStack);

                playerItem.count = newCount;

                if (remainingCount > 0) {
                    const newItem = { ...item, hash: uuidv4(), count: remainingCount };
                    await this.addPlayerItem(newItem);
                }
            } else {
                item = { ...item, hash: uuidv4(), count: count };
                const result = await this.addPlayerItem(item);
                if (!result) return false;
            }

            this.setInventory(player);
            return true;
        } catch (err) {
            console.error("An error occurred at inventory.addPlayerItemCount: ", err);
            return false;
        }
    }

    async manageFastSlots(player: PlayerMp, event: any) {
        await manageInventoryFastSlot(player, event);
    }

    public checkQuickUse(component: string, slot: number) {
        let fastSlot = -1;
        for (let [index, e] of Object.entries(this.quickUse)) {
            if (!e) continue;
            if (e.component === component && e.id === slot) {
                fastSlot = parseInt(index);
                break;
            }
        }
        return fastSlot;
    }

    async startUsingItem(player: PlayerMp, description: string = "Using a big dildo", time: number, data: IUsingItemData, handler: () => void) {}
}
