import { ItemObject } from "./ItemObject.class";
import { inventoryAssets } from "./Items.module";

/**
 * Drops an inventory item from the player's inventory.
 *
 * @param {PlayerMp} player - The player dropping the item.
 * @param {string} itemData - The data of the item to drop.
 */
export const dropInventoryItem = async (player: PlayerMp, itemData: string) => {
    try {
        if (!player.character || !player.character.inventory) return;

        const { item, source }: { item: RageShared.Interfaces.Inventory.IInventoryItem; source: { component: inventoryAssets.INVENTORY_CATEGORIES; slot: string } } = JSON.parse(itemData);

        if (!item) return;

        if (player.vehicle) {
            player.showNotify(RageShared.Enums.NotifyType.TYPE_ERROR, "You cannot drop an item while in a vehicle.");
            return;
        }

        const playerItem = player.character.inventory.getItemByUUID(item.hash);

        if (!playerItem) {
            player.character.inventory.setInventory(player);
            return player.showNotify(RageShared.Enums.NotifyType.TYPE_ERROR, "The item you're trying to drop is invalid.");
        }

        if (source.component === "clothes" && item.type === RageShared.Enums.ITEM_TYPES.ITEM_TYPE_ARMOUR && item.isPlaced) {
            player.armour = 0;
        }

        const itemInQuickUse = player.character.inventory.isItemInQuickUse(source.component, parseInt(source.slot));

        if (itemInQuickUse !== -1) {
            player.character.inventory.quickUse[itemInQuickUse] = null;

            if (player.fastSlotActive === itemInQuickUse) {
                player.removeAllWeapons();
                player.setVariable("ammoHash", null);
                player.setVariable("itemAsAmmo", null);
                player.fastSlotActive = null;
            }
        }

        if (player.character.inventory.isAmmoItem(playerItem)) {
            let ammoHash = player.getVariable("ammoHash");
            if (ammoHash?.items.includes(playerItem.hash)) {
                ammoHash.items.splice(ammoHash.items.indexOf(playerItem.hash), 1);
                player.setWeaponAmmo(player.weapon, player.weaponAmmo - playerItem.count);
                player.setVariable("ammoHash", ammoHash);
                player.setVariable("itemAsAmmo", ammoHash.items.length ? ammoHash.items[0] : null);
            }
        }

        const { x, y, z } = player.position;

        new ItemObject({
            hash: playerItem.hash,
            coords: new mp.Vector3(x, y, z - 1),
            rotation: player.character.inventory.isWeapon(playerItem) ? new mp.Vector3(-90, 0, 0) : new mp.Vector3(0, 0, 0),
            collision: false,
            range: 10,
            itemData: { ...playerItem, isPlaced: false }
        });

        if (source.component !== "clothes") {
            player.character.inventory.resetItemData(source.component, parseInt(source.slot));
        } else {
            player.character.inventory.resetClothingItemData(parseInt(source.slot));
            player.character.inventory.reloadClothes(player);
        }
        player.character.inventory.setInventory(player);
    } catch (err) {
        console.log("dropInventoryItem error: ", err);
    }
};
