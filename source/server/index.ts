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
import { RAGERP } from "@core/ragerp";
import "./bootstrap/register-commands";
import "./bootstrap/register-events";
import "./bootstrap/register-extensions";
import "./bootstrap/register-services";
import { blue, green, yellow } from "colorette";

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

