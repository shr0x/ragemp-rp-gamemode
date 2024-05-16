import { RAGERP } from "../api";

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
    name: "setpage",
    run: (player: PlayerMp, fulltext) => {
        player.call("client::creator:start");
        player.call("client::eventManager", ["cef::system:setPage", "creator"]);
    }
});
