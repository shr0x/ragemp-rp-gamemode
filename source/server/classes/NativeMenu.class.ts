import { RageShared, StringifiedObject } from "@shared/index";
import { CefEvent } from "@classes/CEFEvent.class";

/**
 * Represents a native menu for a player.
 */
export class NativeMenu {
    /** The unique identifier for the menu. */
    id: number;

    /** The header title of the menu. */
    header: string;

    /** The description of the menu. */
    desc: string;

    /** The player who owns the menu. */
    player: PlayerMp;

    /** The items displayed in the menu. */
    items: RageShared.Interfaces.INativeMenuItem[] = [];

    /** The event triggered when an item is selected. */
    private onSelectEvent: EventMp | null = null;

    /** The event triggered when a checkbox item is changed. */
    private onCheckboxEvent: EventMp | null = null;

    /** The event triggered when a switch item is toggled. */
    private onSwitchEvent: EventMp | null = null;

    /**
     * Creates a new NativeMenu instance.
     *
     * @param player - The player who owns the menu.
     * @param id - The unique identifier for the menu.
     * @param header - The header title of the menu.
     * @param desc - The description of the menu.
     * @param items - The items displayed in the menu.
     */
    constructor(player: PlayerMp, id: number, header: string, desc: string, items: RageShared.Interfaces.INativeMenuItem[]) {
        this.id = id;
        this.header = header;
        this.desc = desc;
        this.items = items;
        this.player = player;

        CefEvent.emit(this.player, "nativemenu", "setData", { id: this.id, isActive: true, header: { title: this.header, desc: this.desc }, items: this.items });
        CefEvent.startPage(this.player, "nativemenu");
    }

    /**
     * Handles the selection of an item in the menu.
     *
     * @param target - The player who selected the item.
     * @returns A promise that resolves with the selected item's data, or null if the player is not valid.
     */
    public onItemSelected(target: PlayerMp): Promise<StringifiedObject<{ id: number; listitem: number; name: string; uid: number }> | null> {
        return new Promise((res) => {
            if (!this.player || !mp.players.exists(this.player) || this.player.id !== target.id) {
                return;
            }
            this.onSelectEvent = new mp.Event("server::nativemenu:onSelectItem", (player: PlayerMp, data: StringifiedObject<{ id: number; listitem: number; name: string; uid: number }>) => {
                if (!this.player || this.player.id !== player.id) return;
                res(data);
                this.destroy(player);
            });
        });
    }

    /**
     * Destroys the menu and cleans up associated events.
     *
     * @param player - The player for whom the menu is being destroyed.
     */
    public destroy(player: PlayerMp): void {
        this.onSelectEvent?.destroy();
        this.onCheckboxEvent?.destroy();
        this.onSwitchEvent?.destroy();

        CefEvent.emit(player, "nativemenu", "setData", { id: -1, isActive: false, header: { title: "", desc: "" }, items: [] });
        player.call("client::cef:close");
        player.nativemenu = null;
    }
}
