import { Client } from "@classes/Client.class";
import { Utils } from "@shared/Utils.module";

let maxDistance = 15;

mp.events.add("render", () => {
    if (!mp.players.local.getVariable("loggedin")) return;

    mp.players.toArray().forEach((player: PlayerMp, i: number) => {
        if (player.getVariable("isSpectating") || !mp.players.exists(player) || i > 50) return;

        let loadDistTemp = i > 25 ? 5 : maxDistance;

        const target_position = player.position;

        const distance = Utils.distanceToPos(mp.players.local.position, target_position);

        if (distance <= loadDistTemp && player.dimension === mp.players.local.dimension) {
            if (!player.hasClearLosTo(mp.players.local.handle, 17) || player.getVariable("noclip")) return;

            const headPosition = player.getBoneCoords(12844, 0, 0, 0);
            const entity = player.vehicle ? player.vehicle : player;
            const vector = entity.getVelocity();
            const frameTime = Client.getFrameTime();
            const drawPosition = { x: headPosition.x + vector.x * frameTime, y: headPosition.y + vector.y * frameTime, z: headPosition.z + vector.z * frameTime };

            /* Player emote text */

            if (player.getVariable("emoteTextData")) {
                const { color, text } = Utils.tryParse(player.getVariable("emoteTextData"));
                Client.drawText3D(text, drawPosition.x, drawPosition.y, drawPosition.z + 0.3, 0.3, color);
            }

            /* Player name stuff */
            let playerName = `~n~${player.name}`;
            if (mp.players.local.isTypingInTextChat) {
                playerName = `~c~(( ~o~Typing...~c~ ))~n~~w~${player.name}`;
            }
            const fullName = `~w~${playerName} (${player.remoteId})`;
            Client.drawText3D(fullName, drawPosition.x, drawPosition.y, drawPosition.z + 0.2);
        }
    });
});
