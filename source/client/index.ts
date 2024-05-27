//-----------------------------------------//
import "./classes/Browser.class";
import "./classes/Chat.class";
import "./classes/Creator.class";
//-----------------------------------------//
import "./clientevents/Auth.event";
import "./clientevents/Render.event";
import "./clientevents/Interact.event";
import "./clientevents/Player.event";
import "./clientevents/Keybinds.event";
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

    // const ped = new InteractablePed({
    //     id: 0,
    //     coords: new mp.Vector3(-541.0401611328125, -1287.0777587890625, 26.901586532592773),
    //     heading: -118.70496368408203,
    //     name: "Daniel Mordasty",
    //     model: "a_m_m_genfat_02",
    //     key: "job_taxi",
    //     event: "job_taxi",
    //     type: 0
    // });

    mp.gui.chat.activate(false);
    mp.gui.chat.show(false);
}

(async () => {
    mp.console.logInfo("[SHR0X FRAMEWORK]: Initializing client-side.");
    await initClientSide()
        .then(() => mp.console.logInfo("[SHR0X FRAMEWORK]: Initialized client-side."))
        .catch((err) => mp.console.logError(`${err.message}`));
})();
