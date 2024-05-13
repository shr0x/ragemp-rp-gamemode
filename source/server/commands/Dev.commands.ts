import { CommandRegistry } from "../classes/Command.class";

CommandRegistry.add({
    name: "savepos",
    aliases: ["getpos", "mypos"],
    run: (player: PlayerMp) => {
        const [{ x, y, z }, heading] = [player.position, player.heading];
        console.log(`Position: new mp.Vector3(${x}, ${y}, ${z})`);
        console.log(`Heading: ${heading}`);
    }
});
