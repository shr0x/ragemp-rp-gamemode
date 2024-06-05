import { RAGERP } from "@api";
import { RageShared } from "@shared/index";

export class InteractionMenu {
    player: PlayerMp | null = null;
    acceptEvent: EventMp | null = null;
    refuseEvent: EventMp | null = null;

    constructor() {
        this.player = null;
        this.acceptEvent = null;
        this.refuseEvent = null;
        this.clearPromiseEvents();
    }

    /**
     * Display interaction menu to a player.
     * @param player the player which to show the interaction menu to
     * @param data Interaction menu data
     * @returns 'id' from the item player selected
     */
    new(player: PlayerMp, data: RageShared.Interfaces.InteractionData) {
        this.player = player;
        player.call("client::cef:start", ["interactionMenu"]);
        RAGERP.cef.emit(player, "hud", "setInteraction", data);

        return new Promise<number | null>((resolve) => {
            if (this.player?.id !== player.id) return;

            const onAccept = (player: PlayerMp, answer: string) => {
                if (this.player && this.player.id === player.id) {
                    answer = JSON.parse(answer);
                    this.clearPromiseEvents();
                    resolve(parseInt(answer));
                }
            };

            const onReject = (player: PlayerMp, cef: string) => {
                console.log("rejected");
                if (!this.player || this.player.id !== player.id) return;
                this.closeMenu(player);
                resolve(null);
            };

            this.setPromiseEvents(onAccept, onReject);
        });
    }
    /**
     * Set events which alter on will be triggered depending what player selects in the interaction menu.
     * @param accept
     * @param reject
     */
    setPromiseEvents(accept: (player: PlayerMp, answer: any) => void, reject: (player: PlayerMp, cef: string) => void) {
        this.acceptEvent = new mp.Event("server::hud:interactResult", accept);
        this.refuseEvent = new mp.Event("client::cef:close", reject);
    }
    /**
     *
     */
    clearPromiseEvents() {
        if (this.acceptEvent) this.acceptEvent.destroy();
        if (this.refuseEvent) this.refuseEvent.destroy();
    }
    /**
     * Close interaction menu for local player.
     * @returns void
     */
    closeMenu(player: PlayerMp) {
        if (!mp.players.exists(player)) return;
        this.clearPromiseEvents();
        player.call("client::cef:close");
    }
}
