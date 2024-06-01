const isDev = process.env.NODE_ENV === "development";
type EventHandler = (...args: any[]) => void;

interface EventEntry {
    target: string;
    name: string;
    handler: EventHandler;
}

/**
 * Class to manage events, including adding, updating, and calling event handlers.
 */
class _EventManager {
    private eventsInMemory: EventEntry[] = [];

    /**
     * Adds an event handler if it does not already exist.
     *
     * @param {string} target - The target of the event.
     * @param {string} name - The name of the event.
     * @param {EventHandler} handler - The handler function for the event.
     */
    public addHandler(target: string, name: string, handler: EventHandler): void {
        if (!this.eventsInMemory.some((event) => event.target === target && event.name === name)) {
            this.eventsInMemory.push({ target, name, handler });
        }
    }

    /**
     * Gets all events in memory.
     *
     * @returns {EventEntry[]} - The array of events in memory.
     */
    public get events(): EventEntry[] {
        return this.eventsInMemory;
    }

    /**
     * Updates an event handler if the event exists.
     *
     * @param {string} target - The target of the event.
     * @param {string} name - The name of the event.
     * @param {EventHandler} handler - The new handler function for the event.
     */
    public updateHandler(target: string, name: string, handler: EventHandler): void {
        const index = this.eventsInMemory.findIndex((event) => event.target === target && event.name === name);
        if (index !== -1) {
            this.eventsInMemory[index].handler = handler;
        }
    }

    /**
     * Calls the handler for a specific event with provided arguments.
     *
     * @param {string} event - The event in the format "target:name".
     * @param {...any[]} args - Arguments to pass to the event handler.
     */
    public callHandler(event: string, ...args: any[]): void {
        const [target, name] = event.split(":");
        const matchedEvent = this.eventsInMemory.find((event) => event.target === target && event.name === name);
        if (matchedEvent) {
            matchedEvent.handler(...args);
            if (isDev) {
                console.log(`Event ${event} called`);
            }
        } else {
            console.error(`Event ${event} does not exist`);
        }
    }

    /**
     * Logs loaded events for a specific target in development mode.
     *
     * @param {string} target - The target for which to stop adding handlers.
     */
    public stopAddingHandler(target: string): void {
        if (isDev) this.eventsInMemory.filter((event) => event.target === target).forEach((event) => console.log(`Event ${event.target}:${event.name} loaded`));

        if (isDev) {
            console.log(`${target} events loaded`);
        }
        if (target === "app") {
            console.log("All events loaded");
        }
    }

    /**
     * Removes all handlers for a specific target.
     *
     * @param {string} target - The target for which to remove handlers.
     * @param {boolean} [logRemainingEvents=false] - Whether to log remaining events after removal in development mode.
     */
    public removeTargetHandlers(target: string, logRemainingEvents: boolean = false): void {
        const removedEvents = this.eventsInMemory.filter((event) => event.target === target);
        this.eventsInMemory = this.eventsInMemory.filter((event) => event.target !== target);

        if (isDev) {
            removedEvents.forEach((event) => console.log(`Unsubscribed from ${event.target}:${event.name}`));
        }
        if (isDev && logRemainingEvents) {
            console.log("Remaining events: ", this.eventsInMemory);
        }
    }

    /**
     * Emits an event to the server.
     *
     * @param {string} target - The target of the event.
     * @param {string} name - The name of the event.
     * @param {...any[]} args - Arguments to pass with the event.
     * @throws Will throw an error if the target or name is not a string.
     */
    public emitServer(target: string, name: string, ...args: any[]): void {
        if (typeof target !== "string" || typeof name !== "string") {
            throw new Error("Event address must be a string");
        }
        const event = `server::${target}:${name}`;
        const sendData = { event, args };
        //@ts-ignore
        mp.trigger("client::eventManager::emitServer", JSON.stringify(sendData));
        if (isDev) console.log(`Emitted: ${event}\n`, JSON.stringify(args));
    }

    /**
     * Emits an event to the client.
     *
     * @param {string} target - The target of the event.
     * @param {string} name - The name of the event.
     * @param {...any[]} args - Arguments to pass with the event.
     * @throws Will throw an error if the target or name is not a string.
     */
    public emitClient(target: string, name: string, ...args: any[]): void {
        if (typeof target !== "string" || typeof name !== "string") {
            throw new Error("Event address must be a string");
        }
        const event = `client::${target}:${name}`;
        const sendData = { event, args };
        //@ts-ignore
        mp.trigger("client::eventManager::emitClient", JSON.stringify(sendData));
        if (isDev) console.log(`Emitted: ${event}\n`, ...args);
    }
}

const EventManager = new _EventManager();
export default EventManager;
