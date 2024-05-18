import { RAGERP } from "../api";
import { InteractionMenu } from "../classes/Interaction.class";

RAGERP.commands.add({
    name: "savepos",
    aliases: ["getpos", "mypos"],
    run: (player: PlayerMp) => {
        const [{ x, y, z }, heading] = [player.position, player.heading];
        console.log(`Position: new mp.Vector3(${x}, ${y}, ${z})`);
        console.log(`Heading: ${heading}`);
    }
});

RAGERP.commands.add({
    name: "interact",
    run: async (player: PlayerMp, fulltext) => {
        const data = {
            isActive: true,
            items: [
                { type: 0, id: 0, text: "Whatever" },
                { type: 0, id: 1, text: "Whatever 1" },
                { type: 0, id: 2, text: "Whatever 2" }
            ]
        };

        player.interactionMenu = new InteractionMenu();
        await player.interactionMenu.new(player, data).then((res) => {
            console.log(res);
        });
    }
});

RAGERP.commands.add({
    name: "poop",
    run: (player: PlayerMp) => {
        player.call("client::needs:poop");
    }
});
