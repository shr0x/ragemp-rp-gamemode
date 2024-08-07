import { Utils } from "@shared/Utils.module";
import { CEFPages } from "@assets/CEFPages.asset";

const disabledControls = [
    0, 30, 31, 21, 36, 22, 44, 38, 71, 72, 59, 60, 42, 43, 85, 86, 75, 15, 14, 228, 37, 229, 348, 156, 199, 204, 172, 173, 37, 199, 44, 178, 244, 220, 221, 218, 219, 16, 17, 200, 202, 322
];

/**
 * Manages the browser interface and related operations.
 */
class _Browser {
    private readonly url: string = "http://package2/dist/index.html";
    mainUI: BrowserMp;
    currentPage: string | undefined;

    /**
     * Initializes the browser and sets up event handlers.
     */
    constructor() {
        mp.console.logWarning("Browser && background initialized!");
        mp.gui.chat.show(false);

        this.mainUI = mp.browsers.new(this.url);
        this.mainUI.markAsChat();
        this.currentPage = undefined;
        mp.gui.chat.activate(true);
        this.processEvent("cef::chat:setActive", true);

        mp.events.add("client::eventManager::emitServer", this.emitServer.bind(this));
        mp.events.add("client::eventManager::emitClient", this.emitClient.bind(this));
        mp.events.add("client::eventManager", this.processEvent.bind(this));

        mp.events.add("client::cef:start", this.startPage.bind(this));
        mp.events.add("client::cef:close", this.closePage.bind(this));

        mp.events.add("render", this.onTick.bind(this));
    }

    /**
     * Called every frame to apply disable control actions.
     */
    onTick() {
        mp.game.controls.applyDisableControlActionBatch();
    }

    /**
     * Activates or deactivates the main browser UI.
     * @param {boolean} toggle - Whether to activate or deactivate the UI.
     * @returns {boolean} - The current active state of the UI.
     */
    activate(toggle: boolean): boolean {
        if (!this.mainUI) return false;
        this.mainUI.active = toggle;
        return this.mainUI.active;
    }

    /**
     * Processes an event by name and forwards arguments to the browser UI.
     * @param {string} eventName - The name of the event to process.
     * @param {...any} args - The arguments to pass to the event handler.
     */
    processEvent(eventName: string, ...args: any): void {
        if (!eventName || !this.mainUI) return;

        if (eventName === "cef::system:setPage") {
            this.startPage(args[0]);
        }

        if (this.mainUI && eventName.indexOf("cef::") != -1) {
            const event = eventName.split("cef::")[1];
            const argsString = args.map((arg: string) => JSON.stringify(arg)).join(", ");

            const script = `
                window.callHandler("${event}", ${argsString})
            `;
            this.mainUI.execute(script);
        } else return mp.console.logWarning("Error calling event: " + eventName + " it does not exists.");
    }

    /**
     * Closes the current page in the browser UI.
     */
    closePage(): void {
        if (!this.mainUI || !mp.browsers.exists(this.mainUI)) return;
        const page = this.currentPage;
        if (!page) return;

        const pageData = CEFPages[page];
        this.currentPage = undefined;

        mp.events.callRemote("server::player:closeCEF", page);
        if (pageData.blur) {
            mp.game.graphics.transitionFromBlurred(1);
        }

        mp.game.ui.displayRadar(true);
        mp.gui.cursor.show(false, false);

        mp.game.controls.setDisableControlActionBatch(false, []);
        if (!mp.players.local.getVariable("noclip")) mp.players.local.freezePosition(false);

        if (this.mainUI && mp.browsers.exists(this.mainUI)) {
            this.mainUI.call("cef::eventManager", "system:setPage", "hud");
        }
    }

    /**
     * Starts a new page in the browser UI.
     * @param {string} pageName - The name of the page to start.
     */
    startPage(pageName: string): void {
        const params = CEFPages[pageName];

        if (typeof params.radar !== "undefined") mp.game.ui.displayRadar(params.radar);
        if (params.controls) mp.game.controls.setDisableControlActionBatch(false, disabledControls);
        if (params.freezeCamera) mp.players.local.freezePosition(params.freezeCamera);
        mp.gui.cursor.show(true, true);

        setTimeout(() => {
            if (params.blur) {
                mp.game.graphics.transitionToBlurred(1);
            } else mp.game.graphics.transitionFromBlurred(1);
        }, 100);

        this.currentPage = pageName;
        mp.events.callRemote("server::player:setCefPage", pageName);
    }

    /**
     * Emits an event to the server with the given data.
     * @param {any} receivedData - The data to send to the server.
     */
    emitServer(receivedData: any): void {
        let data = Utils.tryParse(receivedData);
        let { event, args } = data;
        Array.isArray(args) ? (args.length === 1 ? mp.events.callRemote(event, JSON.stringify(args[0])) : mp.events.callRemote(event, JSON.stringify(args))) : mp.events.callRemote(event, args);
        Utils.clientDebug(`[SERVER EMIT]: "${event.split(":")[2]}", "${event.split(":")[3]}" -> ${JSON.stringify(args)}`);
    }

    /**
     * Emits an event to the client with the given data.
     * @param {any} receivedData - The data to send to the client.
     */
    emitClient(receivedData: any): void {
        let data = Utils.tryParse(receivedData);
        let { event, args } = data;
        if (Array.isArray(args)) {
            mp.events.call(event, ...args);
        } else {
            mp.events.call(event, args);
        }
        Utils.clientDebug("[CLIENT EMIT]: " + event + " " + JSON.stringify(args));
    }

    /**
     * Blocks or unblocks a page.
     * @param {string} pagename - The name of the page to block or unblock.
     * @param {boolean} block - Whether to block or unblock the page.
     */
    blockPage(pagename: string, block: boolean) {}
}

export const Browser = new _Browser();
