import { RAGERP } from "../api";

//-------------------------------------------------------//
// mp.events.add("server::player:inventory:load", (player: PlayerMp) => {
//     if (!mp.players.exists(player) || !player.character) return;
//     if (player.character.inventory) player.character.inventory.loadInventory(player);
// });
//-------------------------------------------------------//
RAGERP.cef.register("inventory", "onMoveItem", async (player: PlayerMp, data: any) => {
    if (!mp.players.exists(player) || !player.character || !player.character.inventory) return;
    await player.character.inventory.moveItem(player, data);
});
//-------------------------------------------------------//
RAGERP.cef.register("inventory", "onUseITem", (player: PlayerMp, data: any) => {
    if (!mp.players.exists(player) || !player.character) return;
    if (player.character.inventory) player.character.inventory.useItem(player, data);
});
//-------------------------------------------------------//
mp.events.add("server::inventory:quickUse", (player: PlayerMp, event: any) => {
    if (!mp.players.exists(player) || !player.character) return;
    if (player.character.inventory) player.character.inventory.manageFastSlots(player, event);
});
//-------------------------------------------------------//
RAGERP.cef.register("inventory", "onSplitItem", (player: PlayerMp, data: any) => {
    if (!mp.players.exists(player) || !player.character) return;
    if (player.character.inventory) player.character.inventory.splitStack(player, data);
});
//-------------------------------------------------------//
RAGERP.cef.register("inventory", "onDropItem", (player: PlayerMp, itemData: any) => {
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
RAGERP.cef.register("interactionButton", "sendCount", async (player: PlayerMp, data: string) => {
    if (!mp.players.exists(player) || !player.character) return;
    if (player.character.inventory) {
        await player.character.inventory.pickupItem(player, data);
    }
});
//-------------------------------------------------------//
RAGERP.cef.register("inventory", "openItem", (player: PlayerMp, data: any) => {
    if (!mp.players.exists(player) || !player.character) return;
    if (player.character.inventory) player.character.inventory.openItem(player, data);
});

//-------------------------------------------------------//
mp.events.add("server::player:closeCEF", (player: PlayerMp, key: string) => {
    if (key === "inventory") {
    }
});
RAGERP.cef.register("mainMenu", "openInventory", (player: PlayerMp) => player.call("client::mainMenu:openInventory"));
//-------------------------------------------------------//
//-------------------------------------------------------//
//-------------------------------------------------------//
//-------------------------------------------------------//

//-------------------------------------------------------//

//-------------------------------------------------------//

//-------------------------------------------------------//
RAGERP.cef.register("inventory", "cancelAction", (player: PlayerMp) => {});
