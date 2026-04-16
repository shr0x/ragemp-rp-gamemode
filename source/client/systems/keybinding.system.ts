import { RAGERP } from "@core/client-api";
import { InteractablePed } from "@services/interactable-ped.service";
import { ChatAPI } from "@services/chat.service";
import { Client } from "@services/client.service";
import { Inventory } from "@services/inventory.service";
import { PlayerKeybind } from "@services/keybind.service";
import { EntityRaycast } from "@services/raycast.service";
import { CEFPages } from "@assets/cef-pages.assets";


let lastPress: number = 0;

function playerPressEscape() {
    if (mp.game.ui.isPauseMenuActive() && RAGERP.Client.browser.currentPage !== "inventory") return;

    if (mp.players.local.getVariable("usingItem")) {
        return mp.events.callRemote("server::inventory:cancelAction");
    }

    mp.console.logInfo(`Player's browser page is: ${RAGERP.Client.browser.currentPage}`);
    if (!RAGERP.Client.browser.currentPage) return;

    switch (RAGERP.Client.browser.currentPage) {
        case "interactionMenu": {
            RAGERP.Client.browser.processEvent("cef::hud:setInteraction", { isActive: false, items: [] });
            RAGERP.Client.browser.closePage();
            break;
        }
        case "inventory": {
            Inventory.close();
            return;
        }
        case "chat": {
            if (ChatAPI.chatOpen) ChatAPI.close();
            return;
        }
        default: {
            if (CEFPages[RAGERP.Client.browser.currentPage].close) {
                RAGERP.Client.browser.closePage();
            }
        }
    }
}

PlayerKeybind.addKeybind({ keyCode: 27, up: false }, playerPressEscape, "Close Pages");

/**
 * Adds a keybind for toggling inventory fast slots.
 * @param keyCode - The key code for the keybind.
 * @param slot - The inventory slot number to toggle.
 */
function addQuickUseSlotKeybind(keyCode: number, slot: number) {
    PlayerKeybind.addKeybind(
        { keyCode, up: false },
        () => {
            if (!mp.players.local.getVariable("loggedin") || Client.isDead) return;
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
        if (!mp.players.local.getVariable("loggedin") || Client.isDead) return;
        await Inventory.open();
    },
    "Open or close Inventory"
);

PlayerKeybind.addKeybind(
    { keyCode: 71, up: false },
    async () => {
        if (RAGERP.Client.browser.currentPage && RAGERP.Client.browser.currentPage !== "interactionMenu") return;
        if (mp.players.local.vehicle && mp.players.local.vehicle.getPedInSeat(-1) === mp.players.local.handle) {
            mp.events.callRemote("server::interaction:vehicle", mp.players.local.vehicle.remoteId);
        } else {
            if (!EntityRaycast.entity) return;
            mp.events.callRemote(EntityRaycast.entity.type === "player" ? "server::interaction:player" : "server::interaction:vehicle", EntityRaycast.entity.remoteId);
        }
    },
    "Interact with an entity"
);


PlayerKeybind.addKeybind(
    { keyCode: 69, up: false },
    async () => {
        if (ChatAPI.chatOpen || RAGERP.Client.browser.currentPage || mp.players.local.getVariable("isDead") || mp.players.local.vehicle) return;
        const ped = InteractablePed.getClosest();
        if (!ped) return;
        ped.onKeyPress.constructor.name === "AsyncFunction" ? await ped.onKeyPress() : ped.onKeyPress();
    },
    "Interact with NPC"
);

PlayerKeybind.addKeybind(
    { keyCode: 69, up: false },
    () => {
        if (ChatAPI.chatOpen || RAGERP.Client.browser.currentPage || !Client.canAcceptDeath || !mp.players.local.getVariable("isDead")) return;
        mp.events.callRemote("server::player:acceptDeath");
        Client.canAcceptDeath = false;
    },
    "Accept death"
);

//* Keybinds that should not be changed

mp.keys.bind(69, false, () => {
    if (new Date().getTime() - lastPress < 500) return;
    lastPress = new Date().getTime();
    mp.events.callRemote("server::player:pressE");
});
