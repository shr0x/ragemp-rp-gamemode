import { RAGERP } from "@api";
import { adminManager } from "@classes/Admin.class";

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