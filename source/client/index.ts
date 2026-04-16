import "./bootstrap/register-services";
import "./bootstrap/register-events";
import "./bootstrap/register-handlers";
import "./bootstrap/register-systems";
import "./bootstrap/register-procedures";
import "./bootstrap/register-extensions";
import { InteractablePed } from "@services/interactable-ped.service";

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

