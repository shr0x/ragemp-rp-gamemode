import { RAGERP } from "@api";
import { RageShared } from "@shared/index";


interface IAdminPlayer {
    id: number;
    name: string;
    ping: number;
    health: number;
    armour: number;
    adminLevel?: number;
}

interface IAdminStats {
    onlinePlayers: number;
    onlineAdmins: number;
    serverUptime: string;
}


type AdminPanelPlayer = IAdminPlayer;
type AdminPanelStats = IAdminStats;
class _AdminManager {
    public hasPermission(player: PlayerMp): boolean {
        if (!mp.players.exists(player) || !player.character) return false;
        return player.character.adminlevel > 0;
    }

    public getOnlineAdmins(): PlayerMp[] {
        return mp.players.toArray().filter((target) => this.hasPermission(target));
    }

    public getStats(): AdminPanelStats {
        return {
            onlinePlayers: mp.players.length,
            onlineAdmins: this.getOnlineAdmins().length,
            serverUptime: "" // This can be implemented later with a server start timestamp
        };
    }

    public getPlayers(): AdminPanelPlayer[] {
        return mp.players.toArray().map((target) => ({
            id: target.id,
            name: target.name,
            ping: target.ping,
            health: target.health,
            armour: target.armour,
            adminLevel: target.character?.adminlevel ?? 0
        }));
    }

    public getPlayerById(id: number): PlayerMp | null {
        const target = mp.players.at(id);
        if (!target || !mp.players.exists(target)) return null;
        return target;
    }

    public openPanel(player: PlayerMp) {
        if (!this.hasPermission(player)) {
            player.showNotify(RageShared.Enums.NotifyType.TYPE_ERROR, "You do not have permission to access the admin panel.");
            return;
        }

        RAGERP.cef.startPage(player, "admin");
        RAGERP.cef.emit(player, "system", "setPage", "admin");
        RAGERP.cef.emit(player, "admin", "setVisible", true);
        RAGERP.cef.emit(player, "admin", "setStats", this.getStats());
        RAGERP.cef.emit(player, "admin", "setPlayers", this.getPlayers());
        RAGERP.cef.emit(player, "admin", "setSelectedPlayer", null);
        RAGERP.cef.emit(player, "admin", "setLoading", false);
    }

    public refreshPlayers(player: PlayerMp) {
        if (!this.hasPermission(player)) return;
        RAGERP.cef.emit(player, "admin", "setPlayers", this.getPlayers());
        RAGERP.cef.emit(player, "admin", "setStats", this.getStats());
    }

    public selectPlayer(player: PlayerMp, targetId: number) {
        if (!this.hasPermission(player)) return;

        const target = this.getPlayerById(targetId);
        if (!target) {
            player.showNotify(RageShared.Enums.NotifyType.TYPE_ERROR, "Could not find that player.");
            RAGERP.cef.emit(player, "admin", "setSelectedPlayer", null);
            return;
        }

        RAGERP.cef.emit(player, "admin", "setSelectedPlayer", {
            id: target.id,
            name: target.name,
            ping: target.ping,
            health: target.health,
            armour: target.armour,
            adminLevel: target.character?.adminlevel ?? 0
        });
    }

    public kickPlayer(player: PlayerMp, targetId: number, reason: string) {
        if (!this.hasPermission(player)) return;

        const target = this.getPlayerById(targetId);
        if (!target) {
            return player.showNotify(RageShared.Enums.NotifyType.TYPE_ERROR, "Could not find that player.");
        }

        const finalReason = reason?.trim().length ? reason.trim() : "No reason specified";

        player.showNotify(RageShared.Enums.NotifyType.TYPE_SUCCESS, `You kicked ${target.name}.`);
        target.kick(`Kicked by admin: ${finalReason}`);
    }

    public freezePlayer(player: PlayerMp, targetId: number, state: boolean) {
        if (!this.hasPermission(player)) return;

        const target = this.getPlayerById(targetId);
        if (!target) {
            return player.showNotify(RageShared.Enums.NotifyType.TYPE_ERROR, "Could not find that player.");
        }

        // target.freezePosition(state);
        player.showNotify(
            RageShared.Enums.NotifyType.TYPE_SUCCESS,
            `${state ? "Froze" : "Unfroze"} ${target.name}.`
        );
    }

    public gotoPlayer(player: PlayerMp, targetId: number) {
        if (!this.hasPermission(player)) return;

        const target = this.getPlayerById(targetId);
        if (!target) {
            return player.showNotify(RageShared.Enums.NotifyType.TYPE_ERROR, "Could not find that player.");
        }

        player.position = new mp.Vector3(target.position.x, target.position.y, target.position.z + 1);
        player.dimension = target.dimension;
        player.showNotify(RageShared.Enums.NotifyType.TYPE_SUCCESS, `Teleported to ${target.name}.`);
    }

    public bringPlayer(player: PlayerMp, targetId: number) {
        if (!this.hasPermission(player)) return;

        const target = this.getPlayerById(targetId);
        if (!target) {
            return player.showNotify(RageShared.Enums.NotifyType.TYPE_ERROR, "Could not find that player.");
        }

        target.position = new mp.Vector3(player.position.x, player.position.y, player.position.z + 1);
        target.dimension = player.dimension;

        player.showNotify(RageShared.Enums.NotifyType.TYPE_SUCCESS, `Brought ${target.name}.`);
        target.showNotify(RageShared.Enums.NotifyType.TYPE_INFO, `You were brought by ${player.name}.`);
    }

    public healPlayer(player: PlayerMp, targetId: number) {
        if (!this.hasPermission(player)) return;

        const target = this.getPlayerById(targetId);
        if (!target) {
            return player.showNotify(RageShared.Enums.NotifyType.TYPE_ERROR, "Could not find that player.");
        }

        target.health = 100;
        player.showNotify(RageShared.Enums.NotifyType.TYPE_SUCCESS, `Healed ${target.name}.`);
    }

    public armourPlayer(player: PlayerMp, targetId: number) {
        if (!this.hasPermission(player)) return;

        const target = this.getPlayerById(targetId);
        if (!target) {
            return player.showNotify(RageShared.Enums.NotifyType.TYPE_ERROR, "Could not find that player.");
        }

        target.armour = 100;
        player.showNotify(RageShared.Enums.NotifyType.TYPE_SUCCESS, `Gave armour to ${target.name}.`);
    }
}

export const adminManager = new _AdminManager();