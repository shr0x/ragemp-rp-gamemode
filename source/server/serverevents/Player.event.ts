mp.events.add("playerJoin", (player: PlayerMp) => {
    player.account = null;
    player.character = null;
    player.lastPosition = null;
    player.setVariable("is_spectating", false);
});

mp.events.add("server::spectate:stop", async (player: PlayerMp) => {
    if (!player || !mp.players.exists(player)) return;
    player.setVariable("is_spectating", false);
    player.call("client::spectate:stop");
});
