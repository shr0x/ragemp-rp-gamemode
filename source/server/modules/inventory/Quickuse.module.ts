import { RageShared } from "@shared/index";
import { weaponHash } from "../../assets/Weapons.assets";
import { inventoryAssets } from "./Items.module";
async function giveWeaponByType(player: PlayerMp, item: RageShared.Inventory.Interfaces.IBaseItem, weaponGroup: number, itemType: RageShared.Inventory.Enums.ITEM_TYPES) {
    if (!mp.players.exists(player) || !player.character || !player.character.inventory) return;

    if (item.type === null) return;
    const fullAmmo = player.character.inventory.getAllCountByItemType(itemType);

    if (fullAmmo && fullAmmo.items.length) {
        const ammoCount = fullAmmo.count;
        player.giveWeaponEx(mp.joaat(item.type), ammoCount, item.ammoInClip);
        player.setVariable("ammoHash", fullAmmo);
        player.setVariable("itemAsAmmo", fullAmmo.items[0]);
    } else {
        player.giveWeaponEx(mp.joaat(item.type), 0);
        player.setVariable("ammoHash", null);
        player.setVariable("itemAsAmmo", null);
    }
}

export const manageInventoryFastSlot = async (player: PlayerMp, event: string[]) => {
    try {
        if (!mp.players.exists(player) || !player.character || !player.character.inventory) return;
        if (event.indexOf("k_fastslot") === -1) return;
        const key = parseInt(event[event.length - 1]);
        const fastslot = player.character.inventory.quickUse[key - 1];
        if (!fastslot) return null;

        const item = player.character.inventory.items[fastslot.component as "pockets"][fastslot.id];
        if (!item) return;

        if (player.character.inventory.isWeapon(item) && item.type) {
            if (player.cdata.quckUseDelay === true) return;

            if (player.weapon !== mp.joaat(item.type)) {
                player.removeAllWeapons();
                const weaponGroup = await player.callProc("client::proc:getWeaponTypeGroup", [mp.joaat(item.type)]);
                player.fastSlotActive = key - 1;

                if (weaponGroup) {
                    switch (weaponGroup) {
                        case RageShared.Inventory.Enums.WEAPON_GROUP.UNKNOWN: {
                            player.giveWeaponEx(mp.joaat(item.type), 0);
                            return;
                        }
                        case RageShared.Inventory.Enums.WEAPON_GROUP.HANDGUNS: {
                            await giveWeaponByType(player, item, weaponGroup, RageShared.Inventory.Enums.ITEM_TYPES.ITEM_TYPE_PISTOLAMMO);
                            break;
                        }
                        case RageShared.Inventory.Enums.WEAPON_GROUP.SUBMACHINE: {
                            await giveWeaponByType(player, item, weaponGroup, RageShared.Inventory.Enums.ITEM_TYPES.ITEM_TYPE_SMGAMMO);
                            break;
                        }
                        case RageShared.Inventory.Enums.WEAPON_GROUP.SHOTGUN: {
                            await giveWeaponByType(player, item, weaponGroup, RageShared.Inventory.Enums.ITEM_TYPES.ITEM_TYPE_SHOTGUNAMMO);
                            break;
                        }
                        case RageShared.Inventory.Enums.WEAPON_GROUP.ASSAULTRIFLE: {
                            await giveWeaponByType(player, item, weaponGroup, RageShared.Inventory.Enums.ITEM_TYPES.ITEM_TYPE_RIFLEAMMO);
                            break;
                        }
                        case RageShared.Inventory.Enums.WEAPON_GROUP.LIGHTMACHINE: {
                            await giveWeaponByType(player, item, weaponGroup, RageShared.Inventory.Enums.ITEM_TYPES.ITEM_TYPE_MGAMMO);
                            break;
                        }
                        case RageShared.Inventory.Enums.WEAPON_GROUP.SNIPER: {
                            await giveWeaponByType(player, item, weaponGroup, RageShared.Inventory.Enums.ITEM_TYPES.ITEM_TYPE_RIFLEAMMO);
                            break;
                        }
                        default:
                            return;
                    }
                }

                player.setVariable("ammoType", inventoryAssets.items[item.type].ammoType || "pistol");
                player.cdata.quckUseDelay = true;

                player.cdata.qucikSlotTimeout = setTimeout(() => {
                    if (!mp.players.exists(player)) return;
                    player.cdata.quckUseDelay = false;
                    clearTimeout(player.cdata.qucikSlotTimeout);
                }, 3000);
            } else {
                const currentAmmoInClip = await player.callProc("client::proc:getAmmoInClip", [player.weapon]);
                if (currentAmmoInClip >= 0) {
                    item.ammoInClip = currentAmmoInClip;
                    console.log(`Ammo in clip for ${player.name} is ${currentAmmoInClip} || ${item.ammoInClip}`);
                }
                // player.removeAllWeaponComponents(item.type);
                player.removeAllWeapons();
                player.setVariable("ammoHash", null);
                player.fastSlotActive = null;
                player.giveWeapon(weaponHash["unarmed"], 0);
            }
            return;
        }

        player.character.inventory.useItem(player, JSON.stringify({ item: item, source: { component: fastslot.component, slot: fastslot.id } }));
    } catch (err) {
        console.log("manageInventoryFastSlot err: ", err);
    }
};
