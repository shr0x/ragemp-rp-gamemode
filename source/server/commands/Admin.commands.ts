import { RAGERP } from "../api";
import { CharacterEntity } from "../database/entity/Character.entity";

RAGERP.commands.add({
    name: "testchat",
    run: (player: PlayerMp, fullText) => {
        player.outputChatBox(fullText);
    }
});
RAGERP.commands.add({
    name: "veh",
    run: (player: PlayerMp, fullText: string, vehicleModel: string) => {
        if (!fullText.length || !vehicleModel.length) return;

        const vehicle = new RAGERP.entities.vehicle(RageShared.Vehicle.Enums.VEHICLETYPES.ADMIN, vehicleModel, player.position, player.heading, player.dimension);
        player.showNotify(RageShared.Enums.NotifyType.TYPE_SUCCESS, `Successfully spawned ${vehicleModel} (${vehicle.getId()})`);

        vehicle._vehicle.setVariable("test", 123);

        player.setOwnVariable("test", 123);
        console.log(player.getOwnVariable("test"));
    }
});

RAGERP.commands.add({
    name: "ped",
    run: (player: PlayerMp) => {
        const ped = mp.peds.new(mp.joaat("mp_m_freemode_01"), player.position, { dynamic: true, invincible: false, lockController: true, dimension: 0 });
        player.giveWeapon(mp.joaat("weapon_pistol"), 1000);
        ped.controller = player;
    }
});

RAGERP.commands.add({
    name: "dim",
    run: (player: PlayerMp, full, dim) => {
        player.dimension = parseInt(dim);
    }
});

RAGERP.commands.add({
    name: "makeadmin",
    adminlevel: 6,
    description: "Make a player admin",
    run: async (player: PlayerMp, fullText: string, target: string, level: string) => {
        if (!fullText.length || !target.length || !level.length) return player.outputChatBox("Usage: /makeadmin [target] [level]");
        const targetId = parseInt(target);
        const adminLevel = parseInt(level);

        if (adminLevel < 0 || adminLevel > 6) return player.showNotify(RageShared.Enums.NotifyType.TYPE_ERROR, "Admin level must be between 0 and 6");

        const targetPlayer = mp.players.at(targetId);
        if (!targetPlayer || !mp.players.exists(targetPlayer) || !targetPlayer.character) return player.showNotify(RageShared.Enums.NotifyType.TYPE_ERROR, "Invalid player specified.");

        targetPlayer.character.adminlevel = adminLevel;

        await RAGERP.database.getRepository(CharacterEntity).update(targetPlayer.character.id, { adminlevel: adminLevel });

        player.showNotify(RageShared.Enums.NotifyType.TYPE_SUCCESS, `You've successfully made ${targetPlayer.name} an admin level ${adminLevel}`);
        targetPlayer.showNotify(RageShared.Enums.NotifyType.TYPE_INFO, `${player.name} has made you an admin level ${adminLevel}`);
    }
});

RAGERP.commands.add({
    name: "spectate",
    aliases: ["spec"],
    adminlevel: 1,
    description: "Spectate a player",
    run: (player: PlayerMp, fullText: string, target) => {
        if (fullText.length === 0) return player.outputChatBox("Usage: /spectate [target/off]");

        const parsedTarget = parseInt(target);

        if (isNaN(parsedTarget) && target === "off") {
            player.call("client::spectate:stop");
            player.setVariable("isSpectating", false);
            if (player.lastPosition) player.position = player.lastPosition;
            return;
        }

        const targetPlayer = mp.players.at(parsedTarget);
        if (!targetPlayer || !mp.players.exists(targetPlayer)) return;

        if (targetPlayer.id === player.id) return player.outputChatBox("You can't spectate yourself.");

        if (!player || !mp.players.exists(player)) return;

        if (player.getVariable("isSpectating")) {
            player.call("client::spectate:stop");
            if (player.lastPosition) player.position = player.lastPosition;
        } else {
            player.lastPosition = player.position;
            player.position = new mp.Vector3(targetPlayer.position.x, targetPlayer.position.y, targetPlayer.position.z - 15);
            if (!player || !mp.players.exists(player) || !targetPlayer || !mp.players.exists(targetPlayer)) return;
            player.call("client::spectate:start", [target]);
        }
        player.setVariable("isSpectating", !player.getVariable("isSpectating"));
    }
});
