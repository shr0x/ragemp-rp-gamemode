import { RAGERP } from "@core/client-api";


mp.events.addDataHandler("isDead", (entity, value, oldvalue) => {
    if (entity !== mp.players.local) return;
    if (value === true) RAGERP.Client.local.deathAnimChecker(true);
    else RAGERP.Client.local.deathAnimChecker(false);
});
