import { RAGERP } from "../api";

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
RAGERP.cef.register("inventory", "onSplitItem", (player: PlayerMp, data: any) => {
    if (!mp.players.exists(player) || !player.character) return;
    if (player.character.inventory) player.character.inventory.splitStack(player, data);
});
//-------------------------------------------------------//
RAGERP.cef.register("inventory", "onDropItem", (player: PlayerMp, itemData) => {
    if (!mp.players.exists(player) || !player.character) return;
    if (player.character.inventory) player.character.inventory.dropItem(player, itemData);
});
//-------------------------------------------------------//
RAGERP.cef.register("inventory", "deleteItem", (player: PlayerMp, itemData: any) => {
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
RAGERP.cef.register("inventory", "openItem", (player: PlayerMp, data: any) => {
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
