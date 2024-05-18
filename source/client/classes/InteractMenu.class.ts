import BrowserClass from "./Browser.class";

class _Interaction {
    acceptEvent: EventMp | null = null;
    refuseEvent: EventMp | null = null;

    constructor() {}

    /**
     * Display interaction menu to local player.
     * @param data Interaction menu data
     * @returns 'id' from the item player selected
     */
    new(data: RageShared.Interfaces.InteractionData) {
        return new Promise<number | undefined>((resolve, reject) => {
            if (!mp.players.exists(mp.players.local)) return;
            BrowserClass.startPage("interactionMenu");
            BrowserClass.processEvent("cef::hud:setInteraction", JSON.stringify(data));

            const onAccept = (answer: number) => {
                this.clearPromiseEvents();
                resolve(answer);
            };
            const onReject = (cef: string) => {
                this.closeMenu();
                resolve(undefined);
            };
            this.setPromiseEvents(onAccept, onReject);
        });
    }
    /**
     *
     * @param accept
     * @param reject
     */
    setPromiseEvents(accept: (answer: number) => void, reject: (cef: string) => void) {
        this.acceptEvent = new mp.Event("client::hud:interactResult", accept);
        this.refuseEvent = new mp.Event("server::player:closeCEF", reject);
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
    closeMenu() {
        if (!mp.players.exists(mp.players.local)) return;
        this.clearPromiseEvents();
        mp.events.call("client::cef:close");
    }
}

export const InteractionMenu = new _Interaction();
