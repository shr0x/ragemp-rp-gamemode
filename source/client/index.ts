//-----------------------------------------//
import "./classes/Browser.class";
import "./classes/Chat.class";
import "./classes/Creator.class";
import "./classes/Vehicle.class";
//-----------------------------------------//
import "./clientevents/Auth.event";
import "./clientevents/Render.event";
import "./clientevents/Player.event";
//-----------------------------------------//
import "./handlers/Object.handler";
//-----------------------------------------//
import "./clientprocs/Player.proc";
//-----------------------------------------//
import "./modules/GameData.module";
import "./modules/Keybinding.module";
//-----------------------------------------//
import "./prototype/Player.prototype";
//-----------------------------------------//
import "./classes/Spectate.class";
import { InteractablePed } from "./classes/InteractablePed.class";
//-----------------------------------------//
async function initClientSide() {
    mp.console.clear();

    mp.nametags.enabled = false;

    InteractablePed.init();

    mp.gui.chat.activate(false);
    mp.gui.chat.show(false);
}

(async () => {
    mp.console.logInfo("[SHR0X FRAMEWORK]: Initializing client-side.");
    await initClientSide()
        .then(() => mp.console.logInfo("[SHR0X FRAMEWORK]: Initialized client-side."))
        .catch((err) => mp.console.logError(`${err.message}`));
})();
