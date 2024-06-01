import { RAGERP } from "@api";
import { inventoryAssets } from "@modules/inventory/Items.module";

mp.Player.prototype.showNotify = function (type: RageShared.Enums.NotifyType, message: string, skin: "light" | "dark" | "colored" = "dark") {
    return RAGERP.cef.emit(this, "notify", "show", { type, message, skin });
};

mp.Player.prototype.getAdminLevel = function (): number {
    if (!this || !mp.players.exists(this) || !this.character) return 0;
    return this.character.adminlevel;
};

mp.Player.prototype.giveWeaponEx = function (this: PlayerMp, weapon: number, totalAmmo: number, ammoInClip?: number) {
    this.call("client::weapon:giveWeapon", [weapon, totalAmmo, ammoInClip]);
};

mp.Player.prototype.getRoleplayName = function (checkmask: boolean = true) {
    const player: PlayerMp = this;
    if (!player || !mp.players.exists(player) || !player.character) return "Unknown";
    if (checkmask && player.character.inventory && player.character.inventory.isWearingClothingType(inventoryAssets.INVENTORY_CLOTHING.TYPE_MASK)) {
        const itemData = player.character.inventory.items.clothes[inventoryAssets.INVENTORY_CLOTHING.TYPE_MASK];
        if (!itemData) return player.name;
        return `Stranger ${itemData.hash.split("-")[0]}`;
    }
    return this.name;
};

mp.Player.prototype.requestCollisionAt = async function (x: number, y: number, z: number) {
    const collision = await this.callProc("client::proc:requestCollisionAt", [x, y, z]);
    return collision;
};
