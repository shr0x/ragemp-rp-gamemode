import { Client } from "@classes/Client.class";

mp.events.addDataHandler("isDead", (entity, value, oldvalue) => {
    if (entity !== mp.players.local) return;

    mp.console.logInfo(`Player death state changed from ${oldvalue} to ${value}`);

    if (value === true) Client.deathAnimChecker(true);
    else Client.deathAnimChecker(false);
});
