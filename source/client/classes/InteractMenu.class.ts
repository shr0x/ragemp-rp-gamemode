import BrowserClass from "./Browser.class";

interface IMenuItems {
    id: number;
    text: string;
    type: number;
    subItems?: IMenuItems[];
}

interface IInteractionMenu {
    isActive: boolean;
    items: IMenuItems[];
}
class _Interaction {
    acceptEvent: EventMp | null = null;
    refuseEvent: EventMp | null = null;

    constructor() {}

    new(data: IInteractionMenu) {
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

    setPromiseEvents(accept: (answer: number) => void, reject: (cef: string) => void) {
        this.acceptEvent = new mp.Event("client::hud:interactResult", accept);
        this.refuseEvent = new mp.Event("server::player:closeCEF", reject);
    }

    clearPromiseEvents() {
        if (this.acceptEvent) this.acceptEvent.destroy();
        if (this.refuseEvent) this.refuseEvent.destroy();
    }

    closeMenu() {
        if (!mp.players.exists(mp.players.local)) return;
        this.clearPromiseEvents();
        mp.events.call("client::cef:close");
    }

    destroyCamera(player: PlayerMp) {
        player.call("client::dialog:destroyForwardCamera");
    }
}

export const InteractionMenu = new _Interaction();
