import { RAGERP } from "@api";
import { adminManager } from "@classes/Admin.class";

RAGERP.cef.register("admin", "inspectInventory", (player, data) => {
    const target = mp.players.at(data.targetId);
    if (!target || !mp.players.exists(target) || !target.character?.inventory) return;

    RAGERP.cef.emit(player, "admin", "setInventoryTarget", {
        id: target.id,
        name: target.name
    });

    RAGERP.cef.emit(player, "admin", "setInventoryClothes", target.character.inventory.items.clothes);
    RAGERP.cef.emit(player, "admin", "setInventoryQuickUse", target.character.inventory.quickUse);
    RAGERP.cef.emit(player, "admin", "setInventoryData", {
        pockets: target.character.inventory.items.pockets
    });
    RAGERP.cef.emit(player, "admin", "setInventoryMaxWeight", target.character.inventory.getWeight());
    RAGERP.cef.emit(player, "admin", "setInventoryVisible", true);
});
RAGERP.cef.register("admin", "removeInventoryItem", (player, data) => {
    const target = mp.players.at(data.targetId);
    if (!target || !mp.players.exists(target) || !target.character?.inventory) return;

    target.character.inventory.deleteItem(target, data.itemHash);

    RAGERP.cef.emit(player, "admin", "setInventoryClothes", target.character.inventory.items.clothes);
    RAGERP.cef.emit(player, "admin", "setInventoryQuickUse", target.character.inventory.quickUse);
    RAGERP.cef.emit(player, "admin", "setInventoryData", {
        pockets: target.character.inventory.items.pockets
    });
    RAGERP.cef.emit(player, "admin", "setInventoryMaxWeight", target.character.inventory.getWeight());
});
RAGERP.cef.register("admin", "requestOpen", (player) => {
    adminManager.openPanel(player);
});

RAGERP.cef.register("admin", "requestPlayers", (player) => {
    adminManager.refreshPlayers(player);
});

RAGERP.cef.register("admin", "selectPlayer", (player, targetId) => {
    adminManager.selectPlayer(player, targetId);
});

RAGERP.cef.register("admin", "kickPlayer", (player, targetId) => {

    adminManager
        .kickPlayer(player, targetId, "Kicked by admin.");

});

RAGERP.cef.register("admin", "freezePlayer", (player: PlayerMp, targetId: number, state: boolean) => {
    adminManager.freezePlayer(player, targetId, state);
});


RAGERP.cef.register("admin", "gotoPlayer", (player: PlayerMp, targetId: number) => {
    adminManager.gotoPlayer(player, targetId);
});

RAGERP.cef.register("admin", "bringPlayer", (player: PlayerMp, targetId: number) => {
    adminManager.bringPlayer(player, targetId);
});

RAGERP.cef.register("admin", "healPlayer", (player: PlayerMp, targetId: number) => {
    adminManager.healPlayer(player, targetId);
});