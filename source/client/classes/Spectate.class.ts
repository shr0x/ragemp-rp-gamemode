import { Utils } from "../../shared/Utils.module";

class Spectator {
    is_spectating = false;
    spectating_player: Handle | null = null;
    spectating_player_id = -1;
    startPosition: Vector3;

    updateTimer: NodeJS.Timeout | null = null;

    constructor() {
        mp.events.add("client::spectate:start", this.start.bind(this));
        mp.events.add("client::spectate:stop", this.stop.bind(this));
        mp.events.add("entityStreamIn", this.entityStreamIn.bind(this));
        mp.events.add("render", this.onTick.bind(this));
        mp.events.add("playerQuit", this.onPlayerQuit.bind(this));
    }

    get getSpectatingData() {
        return {
            is_spectating: this.is_spectating,
            spectating_player: this.spectating_player,
            spectating_player_id: this.spectating_player_id
        };
    }

    public start(target: number) {
        const localPlayer = mp.players.local;
        const targetPlayer = mp.players.atRemoteId(target);
        if (!targetPlayer || !mp.players.exists(targetPlayer)) return;
        this.startPosition = localPlayer.position;

        const targetHandle = targetPlayer.vehicle ? targetPlayer.vehicle.handle : targetPlayer.handle;

        this.is_spectating = true;
        this.spectating_player = targetHandle;
        this.spectating_player_id = targetPlayer.remoteId;

        localPlayer.freezePosition(true);
        localPlayer.setAlpha(0);
        localPlayer.setCollision(false, false);
        localPlayer.setInvincible(true);

        mp.game.network.setInSpectatorMode(true, localPlayer.handle);
        this.updateTimer = setInterval(() => {
            if (mp.players.exists(targetPlayer)) {
                const position = targetPlayer.vehicle ? targetPlayer.vehicle.position : targetPlayer.position;
                if (Utils.distanceToPos(localPlayer.position, position) > 50) {
                    const { x, y, z } = position;
                    localPlayer.setCoordsNoOffset(x, y, z - 15, false, false, false);
                }
            }
        }, 500);
    }
    public stop() {
        this.is_spectating = false;
        this.spectating_player = null;
        this.spectating_player_id = -1;
        mp.game.network.setInSpectatorMode(false, mp.players.local.handle);
        mp.players.local.setInvincible(false);
        mp.players.local.setAlpha(255);
        mp.players.local.freezePosition(false);
        mp.players.local.setCollision(true, false);

        if (this.updateTimer) {
            clearInterval(this.updateTimer);
            this.updateTimer = null;
        }
    }

    public entityStreamIn(entity: EntityMp) {
        const streamedIn = <PlayerMp>entity;
        if (streamedIn.getVariable("isSpectating")) {
            streamedIn.setAlpha(0);
            streamedIn.setCollision(false, false);
            streamedIn.setInvincible(true);
        }
    }

    public onTick() {
        if (this.is_spectating && this.spectating_player_id >= 0 && mp.players.exists(this.spectating_player_id)) {
            const targetPlayer = mp.players.atRemoteId(this.spectating_player_id);
            if (!mp.players.exists(targetPlayer)) return;
            // const targetHandle = targetPlayer.vehicle ? targetPlayer.vehicle.handle : targetPlayer.handle;
            mp.game.cam.setGameplayFollowPedThisUpdate(targetPlayer.handle);
        }
    }

    public onPlayerQuit(player: PlayerMp) {
        if (player.remoteId === this.spectating_player_id) {
            mp.events.callRemote("server::spectate:stop");
        }
    }
}
export default new Spectator();
