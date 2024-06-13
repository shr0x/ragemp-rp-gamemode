import { Client } from "@classes/Client.class";

mp.events.addDataHandler("isDead", (entity, oldvalue, newvalue) => {
    if (entity !== mp.players.local) return;

    if (newvalue === true) Client.deathAnimChecker(true);
    else Client.deathAnimChecker(false);
});
