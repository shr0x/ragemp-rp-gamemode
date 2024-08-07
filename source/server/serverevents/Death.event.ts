import { hospitalSpawns } from "@assets/PlayerSpawn.asset";
import { RageShared } from "@shared/index";
import { Utils } from "@shared/utils.module";

const randomDeathAnimations = [
    { dict: "missfinale_c1@", anim: "lying_dead_player0" },
    { dict: "missprologueig_6", anim: "lying_dead_brad" },
    { dict: "misslamar1dead_body", anim: "dead_idle" }
];

export function setPlayerToInjuredState(player: PlayerMp) {
    if (!player || !mp.players.exists(player) || !player.character) return;
    player.character.deathState = RageShared.Players.Enums.DEATH_STATES.STATE_INJURED;
    player.character.setStoreData(player, "isDead", true);
    player.setVariable("isDead", true);
    const randomDeath = randomDeathAnimations[Math.floor(Math.random() * randomDeathAnimations.length)];
    player.playAnimation(randomDeath.dict, randomDeath.anim, 2, 9);
    player.setOwnVariable("deathAnim", { anim: randomDeath.anim, dict: randomDeath.dict });
    player.startScreenEffect("DeathFailMPIn", 0, true);
}

function findClosestHospital(player: PlayerMp) {
    let closestSpawn = null;
    let closestDistance = Infinity;
    for (const spawn of hospitalSpawns) {
        const distance = Utils.distanceToPos(player.position, spawn.position);
        if (distance < closestDistance) {
            closestDistance = distance;
            closestSpawn = spawn;
        }
    }
    return closestSpawn;
}

function playerAcceptedDeath(player: PlayerMp) {
    if (!player || !mp.players.exists(player) || !player.character) return;
    const hospitalData = findClosestHospital(player);
    if (!hospitalData) {
        const randomHospital = Utils.getRandomFromArray(hospitalSpawns);
        player.spawn(randomHospital.position);
        player.heading = randomHospital.heading;
        return;
    }
    player.character.setStoreData(player, "isDead", false);
    player.character.setStoreData(player, "deathTime", 30);
    player.setVariable("isDead", false);
    player.setOwnVariable("deathAnim", null);

    player.spawn(hospitalData.position);
    player.heading = hospitalData.heading;
    player.character.deathState = RageShared.Players.Enums.DEATH_STATES.STATE_NONE;
    player.stopScreenEffect("DeathFailMPIn");
}
async function playerDeath(player: PlayerMp, reason: number, killer: PlayerMp | undefined) {
    if (!player || !mp.players.exists(player) || !player.character) return;

    if (player.character.deathState === RageShared.Players.Enums.DEATH_STATES.STATE_NONE) {
        player.spawn(player.position);
        setPlayerToInjuredState(player);
        await player.character.save(player);
        return;
    }
    playerAcceptedDeath(player);
    return;
}
mp.events.add("playerDeath", playerDeath);
mp.events.add("server::player:acceptDeath", playerAcceptedDeath);
