import { Browser } from "../classes/Browser.class";
import { Inventory } from "../classes/Inventory.class";
import { PlayerKeybind } from "../classes/Keybind.class";
import { EntityRaycast } from "../classes/Raycast.class";

/**
 * Adds a keybind for toggling inventory fast slots.
 * @param keyCode - The key code for the keybind.
 * @param slot - The inventory slot number to toggle.
 */
function addQuickUseSlotKeybind(keyCode: number, slot: number) {
    PlayerKeybind.addKeybind(
        { keyCode, up: false },
        () => {
            if (!mp.players.local.getVariable("loggedin")) return;
            Inventory.toggleFastSlot(slot);
        },
        "Toggle Inventory FastSlot"
    );
}
// Add keybinds for quick use slots 1 to 6
for (let i = 1; i <= 6; i++) {
    addQuickUseSlotKeybind(48 + i, i); // 48 is the keyCode for '0', so 49 ('1') to 54 ('6') are the target keyCodes
}

PlayerKeybind.addKeybind(
    { keyCode: 73, up: false },
    async () => {
        if (!mp.players.local.getVariable("loggedin")) return;
        await Inventory.open();
    },
    "Open or close Inventory"
);

PlayerKeybind.addKeybind(
    { keyCode: 71, up: false },
    async () => {
        if ((Browser.currentPage && Browser.currentPage !== "interactionMenu") || !EntityRaycast.entity) return;
        mp.events.callRemote(EntityRaycast.entity.type === "player" ? "server::interaction:player" : "server::interaction:vehicle", EntityRaycast.entity.remoteId);
    },
    "Interact with an entity"
);
