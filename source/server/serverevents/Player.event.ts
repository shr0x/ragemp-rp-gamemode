import { RAGERP } from "../api";
import { BanEntity } from "../database/entity/Ban.entity";
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
                //todo a ban detail page
                /*
                    player.disableOutgoingSync = true;
                    player.dimension = 2000 + player.id;
                    
                    setTimeout(() => {
                        if (!player || !mp.players.exists(player)) return;
                        player.kick(`Banned: ${banData.reason}`);
                    }, 5000);
                */
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

mp.events.add("playerJoin", onPlayerJoin);

mp.events.add("server::spectate:stop", async (player: PlayerMp) => {
    if (!player || !mp.players.exists(player)) return;
    player.setVariable("isSpectating", false);
    player.call("client::spectate:stop");
});
