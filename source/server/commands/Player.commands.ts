import { RAGERP } from "../api";

RAGERP.commands.add({
    name: "me",
    run: (player: PlayerMp, fulltext) => {
        mp.players.forEachInRange(player.position, 15, (target) => {
            if (target.dimension !== player.dimension) return;
            target.outputChatBox(`!{#C2A2DA}* ${player.getRoleplayName()} ${fulltext}`);
        });
    }
});
