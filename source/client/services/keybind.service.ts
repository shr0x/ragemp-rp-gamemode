/**
 * Type representing either a synchronous or asynchronous key action.
 */
type KeybindType = () => void | Promise<void>;

/**
 * Interface representing a keybind configuration.
 */
interface Keybind {
    keyCode: number;
    up: boolean;
    action: KeybindType;
    description: string;
}

/**
 * Class responsible for managing player keybinds.
 */
class _PlayerKeybind {
    private keybinds: Map<number, Keybind>;

    constructor() {
        this.keybinds = new Map<number, Keybind>();
    }

    /**
     * Adds a new keybind.
     *
     * @param keyCode - The key code of the keybind.
     * @param up - Boolean indicating whether the keybind is for the key up event.
     * @param action - The action to be performed when the keybind is triggered.
     * @param description - A description of the keybind.
     */
    public addKeybind(data: { keyCode: number; up: boolean }, action: KeybindType, description: string): void {
        this.keybinds.set(data.keyCode, { keyCode: data.keyCode, up: data.up, action, description });
        mp.keys.bind(data.keyCode, data.up, action);
    }

    /**
     * Removes an existing keybind.
     *
     * @param keyCode - The key code of the keybind to be removed.
     * @param up - Boolean indicating whether the keybind is for the key up event.
     */
    public removeKeybind(keyCode: number, up: boolean): void {
        const keybind = this.keybinds.get(keyCode);
        if (keybind) {
            mp.keys.unbind(keyCode, up, keybind.action);
            this.keybinds.delete(keyCode);
        }
    }

    /**
     * Updates an existing keybind with a new action and description.
     *
     * @param keyCode - The key code of the keybind to be updated.
     * @param up - Boolean indicating whether the keybind is for the key up event.
     * @param newAction - The new action to be performed when the keybind is triggered.
     * @param newDescription - The new description of the keybind.
     */
    public updateKeybind(keyCode: number, up: boolean, newAction: KeybindType, newDescription: string): void {
        this.removeKeybind(keyCode, up);
        this.addKeybind({ keyCode, up }, newAction, newDescription);
    }

    /**
     * Retrieves the description of a keybind.
     *
     * @param keyCode - The key code of the keybind.
     * @param up - Boolean indicating whether the keybind is for the key up event.
     * @returns The description of the keybind, or undefined if the keybind does not exist.
     */
    public getKeybindDescription(keyCode: number, up: boolean): string | undefined {
        const keybind = this.keybinds.get(keyCode);
        return keybind ? keybind.description : undefined;
    }

    /**
     * Retrieves all keybinds.
     *
     * @returns A map of all keybinds.
     */
    public getAllKeybinds(): Map<number, Keybind> {
        return new Map(this.keybinds);
    }
}

/**
 * Singleton instance of the _PlayerKeybind class.
 */
export const PlayerKeybind = new _PlayerKeybind();
