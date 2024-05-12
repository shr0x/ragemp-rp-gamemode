// namespace global {
//     interface PlayerMp {
//         lastPosition: Vector3 | null;
//     }
// }

mp.events.add("server::spectate:stop", async (player: PlayerMp) => {
    if (!player || !mp.players.exists(player)) return;
    player.setVariable("is_spectating", false);
    player.call("client::spectate:stop");
});

mp.events.add('playerJoin', (player: PlayerMp) => {
    player.lastPosition = null;
    player.setVariable("is_spectating", false);
})


mp.events.addCommand('spectate', (player: PlayerMp, fullText: string, target) => {
    if (fullText.length === 0) return player.outputChatBox("Usage: /spectate [target/off]");

    const parsedTarget = parseInt(target);

    if (isNaN(parsedTarget) && target === "off") {
        player.call("client::spectate:stop");
        player.setVariable("is_spectating", false);
        player.position = player.lastPosition;
        return;
    }

    const targetPlayer = mp.players.at(parsedTarget);
    if (!targetPlayer || !mp.players.exists(targetPlayer)) return;

    if (targetPlayer.id === player.id) return player.outputChatBox("You can't spectate yourself.");

    if (!player || !mp.players.exists(player)) return;

    if (player.getVariable("is_spectating")) {
        player.call("client::spectate:stop");
        player.position = player.lastPosition;
    } else {
        player.lastPosition = player.position;
        player.position = new mp.Vector3(targetPlayer.position.x, targetPlayer.position.y, targetPlayer.position.z - 15);
        if (!player || !mp.players.exists(player) || !targetPlayer || !mp.players.exists(targetPlayer)) return;
        player.call("client::spectate:start", [target]);
    }
    player.setVariable("is_spectating", !player.getVariable("is_spectating"));
})
