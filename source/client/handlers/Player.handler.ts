import { Client } from "@classes/Client.class";

mp.events.addDataHandler("isDead", (entity, value, oldvalue) => {
    if (entity !== mp.players.local) return;
    if (value === true) Client.deathAnimChecker(true);
    else Client.deathAnimChecker(false);
});
