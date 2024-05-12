//-----------------------------------------//
import "./classes/Browser.class";
import "./classes/Chat.class";
//-----------------------------------------//
import "./clientevents/Auth.event";
import "./clientevents/Render.event";
import "./clientevents/Interact.event";
//-----------------------------------------//
import "./modules/spectate.client";
//-----------------------------------------//
import { serverConfig } from "../../shared/constants";
import spectateClient from "./modules/spectate.client";

async function initClientSide() {
    mp.console.clear();

    mp.gui.chat.activate(false);
    mp.gui.chat.show(false);

    mp.discord.update("the restaurant", "is open.");

    mp.game.graphics.notify(`~r~${serverConfig.name} ~w~loaded as version ~g~${serverConfig.version}`);
}

(async () => {
    mp.console.logInfo("[SHR0X FRAMEWORK]: Initializing client-side.");
    await initClientSide()
        .then(() => mp.console.logInfo("[SHR0X FRAMEWORK]: Initialized client-side."))
        .catch((err) => mp.console.logError(`${err.message}`));
})();
