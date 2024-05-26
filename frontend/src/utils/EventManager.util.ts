const isDev = process.env.NODE_ENV === "development";
type EventHandler = (...args: any[]) => void;

interface EventEntry {
    target: string;
    name: string;
    handler: EventHandler;
}

class EventManager {
    private static eventsInMemory: EventEntry[] = [];

    static addHandler(target: string, name: string, handler: EventHandler): void {
        if (!this.eventsInMemory.some((event) => event.target === target && event.name === name)) {
            this.eventsInMemory.push({ target, name, handler });
        }
    }

    static get events() {
        return this.eventsInMemory;
    }

    static updateHandler(target: string, name: string, handler: EventHandler): void {
        const index = this.eventsInMemory.findIndex((event) => event.target === target && event.name === name);
        if (index !== -1) {
            this.eventsInMemory[index].handler = handler;
        }
    }

    static callHandler(event: string, ...args: any[]): void {
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

    static stopAddingHandlers(target: string): void {
        if (isDev) this.eventsInMemory.filter((event) => event.target === target).forEach((event) => console.log(`Event ${event.target}:${event.name} loaded`));

        if (isDev) {
            console.log(`${target} events loaded`);
        }
        if (target === "app") {
            console.log("All events loaded");
        }
    }

    static removeTargetHandlers(target: string, logRemainingEvents: boolean = false): void {
        const removedEvents = this.eventsInMemory.filter((event) => event.target === target);
        this.eventsInMemory = this.eventsInMemory.filter((event) => event.target !== target);

        if (isDev) {
            removedEvents.forEach((event) => console.log(`Unsubscribed from ${event.target}:${event.name}`));
        }
        if (isDev && logRemainingEvents) {
            console.log("Remaining events: ", this.eventsInMemory);
        }
    }

    static emitServer(target: string, name: string, ...args: any[]): void {
        if (typeof target !== "string" || typeof name !== "string") {
            throw new Error("Event address must be a string");
        }
        const event = `server::${target}:${name}`;
        const sendData = { event, args };
        mp.trigger("client::eventManager::emitServer", JSON.stringify(sendData));
        if (isDev) console.log(`Emitted: ${event}\n`, JSON.stringify(args));
    }

    static emitClient(target: string, name: string, ...args: any[]): void {
        if (typeof target !== "string" || typeof name !== "string") {
            throw new Error("Event address must be a string");
        }
        const event = `client::${target}:${name}`;
        const sendData = { event, args };
        mp.trigger("client::eventManager::emitClient", JSON.stringify(sendData));
        if (isDev) console.log(`Emitted: ${event}\n`, ...args);
    }
}

export default EventManager;
