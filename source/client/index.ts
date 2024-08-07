//-----------------------------------------//
import "@classes/Browser.class";
import "@classes/Chat.class";
import "@classes/Creator.class";
import "@classes/Vehicle.class";
import "@classes/Spectate.class";
//-----------------------------------------//
import "@events/Auth.event";
import "@events/Render.event";
import "@events/Player.event";
//-----------------------------------------//
import "@handlers/Player.handler";
import "@handlers/Object.handler";
//-----------------------------------------//
import "@proc/Player.proc";
//-----------------------------------------//
import "@modules/GameData.module";
import "@modules/Keybinding.module";
import "@modules/Noclip.module";
//-----------------------------------------//
import "@prototype/Player.prototype";
//-----------------------------------------//
import { InteractablePed } from "@classes/InteractablePed.class";
//-----------------------------------------//
async function initClientSide() {
    mp.console.clear();

    mp.nametags.enabled = false;

    mp.gui.chat.activate(false);
    mp.gui.chat.show(false);

    InteractablePed.init();
}

(async () => {
    mp.console.logInfo("[RAGEMP GAMEMODE]: Initializing client-side.");
    await initClientSide()
        .then(() => mp.console.logInfo("[RAGEMP GAMEMODE]: Initialized client-side."))
        .catch((err) => mp.console.logError(`${err.message}`));
})();
