type EventHandlerAsync = (...args: any[]) => Promise<void>;
type EventHandler = (...args: any[]) => void;

interface EventEntry {
    target: string;
    name: string;
    handler: EventHandler;
    _event: EventMp;
}

const MpEvent = <K extends keyof IServerEvents | string>(eventName: K) => {
    return function (target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
        mp.events.add(eventName, descriptor.value.bind(target));
    };
};

class Cef_Event {
    private eventsInMemory: EventEntry[] = [];

    constructor() {
        this.eventsInMemory = [];
        console.log("Cef event handler initialised!");
    }

    public get poolSize() {
        return this.eventsInMemory.length;
    }

    /**
     * Registers a new event that's being called from CEF (frontend)
     * @param page page where the event is coming from
     * @param pointer pointer thats coming from page
     * @param handler event handler
     */
    register(page: string, pointer: string, handler: EventHandler | EventHandlerAsync): void {
        if (!this.eventsInMemory.some((event) => event.target === page && event.name === pointer)) {
            const _event = new mp.Event(`server::${page}:${pointer}`, handler);
            this.eventsInMemory.push({ target: page, name: pointer, handler, _event });
        } else {
            console.log("------------------------------------------------------------");
            throw new Error(`Event: "${page}", "${pointer}" was found duplicated`);
        }
    }

    /**
     * Removes page events that were registered using .register
     * @param page page which you'd like to remove events from
     * @returns void
     */
    remove(page: string): void {
        const targetInEvent = this.eventsInMemory.find((x) => x.target === page);
        if (!targetInEvent) return;

        if (targetInEvent._event) {
            targetInEvent._event.destroy();
        }
        this.eventsInMemory.splice(this.eventsInMemory.indexOf(targetInEvent), 1);
    }

    /**
     * Updates page:pointer handler.
     * @param page page name which to update handler from
     * @param pointer page pointer which to update handle
     * @param handler new handle that you'd like to attach
     */
    updateHandler(page: string, pointer: string, handler: EventHandler): void {
        const index = this.eventsInMemory.findIndex((event) => event.target === page && event.name === pointer);
        if (index !== -1) {
            this.eventsInMemory[index].handler = handler;
        }
    }

    /**
     * Emits a CEF(frontend) event, such as when sending data to a specified page given
     * @example
     * ```
     * Cef_Event.emit(mp.players.at(0), "hud", "setData", {level: 1});
     * ```
     * @param player The player to emit data to
     * @param page Which page to update
     * @param pointer Which pointer to call
     * @param data Data to send
     * @returns void
     */
    emit<T extends keyof RageShared.Interfaces.CefEventMap, K extends keyof RageShared.Interfaces.CefEventMap[T]>(
        player: PlayerMp,
        page: T,
        pointer: K,
        data: RageShared.Interfaces.CefEventMap[T][K]
    ): void {
        if (!mp.players.exists(player)) return;
        const eventName = `cef::${page}:${String(pointer)}`;
        return player.call("client::eventManager", [eventName, data]);
    }
    /**
     * Emits a CEF(frontend) event, such as when sending data to a specified page given
     * Same as .emit but supports async
     * @example
     * ```
     * await Cef_Event.emitAsync(mp.players.at(0), "hud", "setData", {level: 1});
     * ```
     * @param player The player to emit data to
     * @param page Which page to update
     * @param pointer Which pointer to call
     * @param data Data to send
     * @returns void
     */
    async emitAsync<T extends keyof RageShared.Interfaces.CefEventMap, K extends keyof RageShared.Interfaces.CefEventMap[T]>(
        player: PlayerMp,
        target: T,
        name: K,
        obj: RageShared.Interfaces.CefEventMap[T][K]
    ): Promise<void> {
        if (!mp.players.exists(player)) return;
        const eventName = `cef::${target}:${String(name)}`;
        return player.call("client::eventManager", [eventName, obj]);
    }
}

const CefEvent = new Cef_Event();
export { CefEvent, MpEvent };
