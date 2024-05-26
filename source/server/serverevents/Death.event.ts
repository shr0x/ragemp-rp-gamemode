async function playerDeath(player: PlayerMp, reason: number, killer: PlayerMp | undefined) {
    player.spawn(player.position);
}
mp.events.add("playerDeath", playerDeath);
