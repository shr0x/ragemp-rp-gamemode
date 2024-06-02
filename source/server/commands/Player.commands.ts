import { RAGERP } from "@api";

RAGERP.commands.add({
    name: "me",
    run: (player: PlayerMp, fulltext) => {
        if (!fulltext.length) return player.outputChatBox("Usage: /me [action text]");

        mp.players.forEachInRange(player.position, 15, (target) => {
            if (target.dimension !== player.dimension) return;
            target.outputChatBox(`!{#C2A2DA}* ${player.getRoleplayName()} ${fulltext}`);
        });
    }
});

RAGERP.commands.add({
    name: "b",
    description: "Local ooc chat",
    run: (player: PlayerMp, fulltext: string) => {
        if (!fulltext.length) return player.outputChatBox("Usage: /b [message]");

        mp.players.forEachInRange(player.position, 15, (target) => {
            if (target.dimension !== player.dimension) return;
            target.outputChatBox(`!{#afafaf}(( ${player.name} [${player.id}]: ${fulltext} ))`);
        });
    }
});
