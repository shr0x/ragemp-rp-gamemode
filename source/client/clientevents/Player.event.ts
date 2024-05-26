import { Utils } from "../../shared/Utils.module";
import { Inventory } from "../classes/Inventory.class";

mp.events.add("playerReady", () => {
    mp.players.local.setCanRagdoll(true);

    mp.players.local.setConfigFlag(2, true);
    mp.players.local.setConfigFlag(248, true);
    mp.players.local.setConfigFlag(241, false);
    mp.players.local.setConfigFlag(429, false);

    mp.game.stats.statSetInt(mp.game.joaat("MP0_SHOOTING_ABILITY"), 100, true);

    mp.game.gameplay.disableAutomaticRespawn(true);
    mp.game.gameplay.ignoreNextRestart(true);
    mp.game.gameplay.setFadeInAfterDeathArrest(false);
    mp.game.gameplay.setFadeInAfterLoad(false);

    mp.game.player.setHealthRechargeMultiplier(0);

    mp.game.ui.setHudComponentPosition(0, 0, 0);
    mp.game.ui.setMinimapComponent(15, true, 0);

    mp.game.stats.statSetProfileSetting(0, 0);

    mp.game.player.setVehicleDefenseModifier(0.1);
    mp.game.player.setVehicleDamageModifier(0.1);

    mp.game.weapon.unequipEmptyWeapons = false;
});

mp.events.add("client::inventory:setVisible", async (enable) => {
    enable ? await Inventory.open() : Inventory.close();
});

mp.events.add("client::weapon:giveWeapon", async (weapon: number, totalAmmo: number, ammoInClip?: number) => {
    await Inventory.giveWeapon(weapon, totalAmmo, ammoInClip).catch((err) => Utils.clientDebug("An error occurred giving weapon to player " + mp.players.local.name));
});
