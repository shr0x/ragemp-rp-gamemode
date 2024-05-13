async function playerDeath(player: PlayerMp, reason: number, killer: PlayerMp | undefined) {}
mp.events.add("playerDeath", playerDeath);
