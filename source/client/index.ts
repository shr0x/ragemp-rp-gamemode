//-----------------------------------------//
import "./classes/Browser.class";
import "./classes/Chat.class";
import "./classes/Creator.class";
//-----------------------------------------//
import "./clientevents/Auth.event";
import "./clientevents/Render.event";
import "./clientevents/Interact.event";
import "./clientevents/Player.event";
//-----------------------------------------//
import "./modules/GameData.module";
//-----------------------------------------//
import "./prototype/Player.prototype";
//-----------------------------------------//
import "./classes/Spectate.class";
//-----------------------------------------//

async function initClientSide() {
    mp.console.clear();

    mp.nametags.enabled = false;

    mp.gui.chat.activate(false);
    mp.gui.chat.show(false);
}

(async () => {
    mp.console.logInfo("[SHR0X FRAMEWORK]: Initializing client-side.");
    await initClientSide()
        .then(() => mp.console.logInfo("[SHR0X FRAMEWORK]: Initialized client-side."))
        .catch((err) => mp.console.logError(`${err.message}`));
})();
