import { RAGERP } from "../api";
import { BanEntity } from "../database/entity/Ban.entity";
import { CharacterEntity } from "../database/entity/Character.entity";
import { Utils } from "../utils/Utils.module";

const onPlayerJoin = async (player: PlayerMp) => {
    try {
        const banData = await RAGERP.database.getRepository(BanEntity).findOne({
            where: [{ serial: player.serial }, { ip: player.ip }, { username: player.name }, { rsgId: player.rgscId }]
        });

        if (banData) {
            if (Utils.hasDatePassedTimestamp(parseInt(banData.lifttime))) {
                await RAGERP.database.getRepository(BanEntity).delete({ id: banData.id });
            } else {
                player.kick(`Banned: ${banData.reason}`);
                return;
            }
        }
        player.account = null;
        player.character = null;
        player.lastPosition = null;
        player.setVariable("loggedin", false);
        player.setVariable("isSpectating", false);
        player.setVariable("adminLevel", 0);
        player.cdata = {};
    } catch (err) {
        console.error(err);
    }
};

const onPlayerQuit = async (player: PlayerMp) => {
    const character = player.character;
    if (!character) return;
    const lastPosition = { ...player.position };

    await RAGERP.database.getRepository(CharacterEntity).update(character.id, {
        position: { x: lastPosition.x, y: lastPosition.y, z: lastPosition.z, heading: player.heading },
        lastlogin: character.lastlogin
    });
};

mp.events.add("playerJoin", onPlayerJoin);
mp.events.add("playerQuit", onPlayerQuit);

mp.events.add("server::spectate:stop", async (player: PlayerMp) => {
    if (!player || !mp.players.exists(player)) return;
    player.setVariable("isSpectating", false);
    player.call("client::spectate:stop");
});
