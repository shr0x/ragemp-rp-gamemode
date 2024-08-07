import { RAGERP } from "@api";

//-------------------------------------------------------//
RAGERP.cef.register("inventory", "onMoveItem", async (player, data) => {
    if (!mp.players.exists(player) || !player.character || !player.character.inventory) return;
    await player.character.inventory.moveItem(player, data);
});
//-------------------------------------------------------//
RAGERP.cef.register("inventory", "onUseItem", (player, data) => {
    if (!mp.players.exists(player) || !player.character) return;
    if (player.character.inventory) player.character.inventory.useItem(player, data);
});
//-------------------------------------------------------//
RAGERP.cef.register("inventory", "onSplitItem", (player: PlayerMp, data) => {
    if (!mp.players.exists(player) || !player.character) return;
    if (player.character.inventory) player.character.inventory.splitStack(player, data);
});
//-------------------------------------------------------//
RAGERP.cef.register("inventory", "onDropItem", (player: PlayerMp, itemData) => {
    if (!mp.players.exists(player) || !player.character) return;
    if (player.character.inventory) player.character.inventory.dropItem(player, itemData);
});
//-------------------------------------------------------//
RAGERP.cef.register("inventory", "deleteItem", (player: PlayerMp, itemData) => {
    if (!mp.players.exists(player) || !player.character) return;
    if (player.character.inventory) player.character.inventory.deleteItem(player, itemData);
});
//-------------------------------------------------------//
mp.events.add("server::player:loadInventory", (player: PlayerMp) => {
    if (!mp.players.exists(player) || !player.character) return;
    if (player.character.inventory) player.character.inventory.setInventory(player);
});
//-------------------------------------------------------//
RAGERP.cef.register("inventory", "onGiveItemAway", (player) => player.call("client::inventory:deletePedScreen"));
//-------------------------------------------------------//
RAGERP.cef.register("inventory", "confirmItemDrop", (player) => player.call("client::inventory:deletePedScreen"));
//-------------------------------------------------------//
RAGERP.cef.register("inventory", "openItem", (player: PlayerMp, data) => {
    if (!mp.players.exists(player) || !player.character) return;
    if (player.character.inventory) player.character.inventory.openItem(player, data);
});
//-------------------------------------------------------//
mp.events.add("server::inventory:quickUse", (player: PlayerMp, event: any) => {
    if (!mp.players.exists(player) || !player.character) return;
    if (player.character.inventory) player.character.inventory.manageFastSlots(player, event);
});
//-------------------------------------------------------//
RAGERP.cef.register("inventory", "cancelAction", (player: PlayerMp) => {});

//-------------------------------------------------------//
mp.events.add("server::player:weaponShot", async (player: PlayerMp) => {
    try {
        if (!player || !mp.players.exists(player) || !player.character || !player.character.inventory) return;

        let ammoHash = player.getVariable("ammoHash");
        let loadedin = player.getVariable("itemAsAmmo");

        if (!ammoHash || !loadedin) return;

        let findAmmoItem = player.character.inventory.getItemByUUID(loadedin);
        if (!findAmmoItem) return;

        findAmmoItem.count--;

        if (findAmmoItem.count === 0) {
            let finditem = await player.character.inventory.getItemSlotComponentByHashKey(loadedin);
            if (finditem) {
                player.character.inventory.items[finditem.component as "pockets"][finditem.slot] = null;
                player.character.inventory.setInventory(player);
            }
            ammoHash.items.splice(ammoHash.items.indexOf(loadedin), 1);

            if (ammoHash.items.length) {
                player.setVariable("itemAsAmmo", ammoHash.items[0]);
                player.setVariable("ammoHash", ammoHash);
            } else {
                player.setVariable("itemAsAmmo", null);
                player.setVariable("ammoHash", null);
            }
        }
    } catch (err) {
        console.error("server::player:weaponShot: err", err);
    }
});
