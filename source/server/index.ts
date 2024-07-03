/*

        ██████╗  █████╗  ██████╗ ███████╗███╗   ███╗██████╗     ██████╗ ██████╗      ██████╗  █████╗ ███╗   ███╗███████╗███╗   ███╗ ██████╗ ██████╗ ███████╗
        ██╔══██╗██╔══██╗██╔════╝ ██╔════╝████╗ ████║██╔══██╗    ██╔══██╗██╔══██╗    ██╔════╝ ██╔══██╗████╗ ████║██╔════╝████╗ ████║██╔═══██╗██╔══██╗██╔════╝
        ██████╔╝███████║██║  ███╗█████╗  ██╔████╔██║██████╔╝    ██████╔╝██████╔╝    ██║  ███╗███████║██╔████╔██║█████╗  ██╔████╔██║██║   ██║██║  ██║█████╗  
        ██╔══██╗██╔══██║██║   ██║██╔══╝  ██║╚██╔╝██║██╔═══╝     ██╔══██╗██╔═══╝     ██║   ██║██╔══██║██║╚██╔╝██║██╔══╝  ██║╚██╔╝██║██║   ██║██║  ██║██╔══╝  
        ██║  ██║██║  ██║╚██████╔╝███████╗██║ ╚═╝ ██║██║         ██║  ██║██║         ╚██████╔╝██║  ██║██║ ╚═╝ ██║███████╗██║ ╚═╝ ██║╚██████╔╝██████╔╝███████╗
        ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚═╝     ╚═╝╚═╝         ╚═╝  ╚═╝╚═╝          ╚═════╝ ╚═╝  ╚═╝╚═╝     ╚═╝╚══════╝╚═╝     ╚═╝ ╚═════╝ ╚═════╝ ╚══════╝
                                                                        Author: shr0x
                                                                      ~How beasts do it~

*/
import { RAGERP } from "@api";
//---------------------------------------//
import "@commands/index";
//---------------------------------------//
import "@prototype/Player.prototype";
//---------------------------------------//
import "@classes/WorldManager.class";
//---------------------------------------//
import "@events/Auth.event";
import "@events/Chat.event";
import "@events/Server.event";
import "@events/Character.event";
import "@events/Player.event";
import "@events/Inventory.event";
import "@events/Death.event";
import "@events/Vehicle.event";
import "@events/Point.event";
//---------------------------------------//
import { blue, green, yellow } from "colorette";
//---------------------------------------//
async function initGamemode() {
    mp.events.delayInitialization = true;
    await RAGERP.database
        .initialize()
        .then(() => console.log("Database connected!"))
        .catch((err) => {
            throw new Error(err);
        });
    console.log(yellow("======================================================================================================"));
    console.log(green(" ██████╗  █████╗ ███╗   ███╗███████╗███╗   ███╗ ██████╗ ██████╗ ███████╗    ██╗███╗   ██╗██╗████████╗"));
    console.log(green("██╔════╝ ██╔══██╗████╗ ████║██╔════╝████╗ ████║██╔═══██╗██╔══██╗██╔════╝    ██║████╗  ██║██║╚══██╔══╝"));
    console.log(green("██║  ███╗███████║██╔████╔██║█████╗  ██╔████╔██║██║   ██║██║  ██║█████╗      ██║██╔██╗ ██║██║   ██║   "));
    console.log(green("██║   ██║██╔══██║██║╚██╔╝██║██╔══╝  ██║╚██╔╝██║██║   ██║██║  ██║██╔══╝      ██║██║╚██╗██║██║   ██║   "));
    console.log(green("╚██████╔╝██║  ██║██║ ╚═╝ ██║███████╗██║ ╚═╝ ██║╚██████╔╝██████╔╝███████╗    ██║██║ ╚████║██║   ██║   "));
    console.log(green(" ╚═════╝ ╚═╝  ╚═╝╚═╝     ╚═╝╚══════╝╚═╝     ╚═╝ ╚═════╝ ╚═════╝ ╚══════╝    ╚═╝╚═╝  ╚═══╝╚═╝   ╚═╝   "));
    console.log(yellow("======================================================================================================"));
    //@ts-ignore
    console.log(blue(`Server Events: ${Object.values(mp.events.binded).length}`));
    console.log(blue(`Cef Events: ${RAGERP.cef.poolSize}`));
    console.log(blue(`Total Commands: ${RAGERP.commands._commands.size}`));
    mp.events.delayInitialization = false;
}
(async () => {
    await initGamemode().then(() => console.log("[SHROX FRAMEWORK] Gamemode Initialized"));
})();
