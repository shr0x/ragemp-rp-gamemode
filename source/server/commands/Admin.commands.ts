import { RAGERP } from "../api";
import { CharacterEntity } from "../database/entity/Character.entity";

RAGERP.commands.add({
    name: "veh",
    aliases: ["vehicle", "spawnveh", "spawncar"],
    adminlevel: 1,
    run: (player: PlayerMp, fullText: string, vehicleModel: string) => {
        if (!fullText.length || !vehicleModel.length) return player.outputChatBox("Usage: /veh [vehiclemodel]");

        const vehicle = new RAGERP.entities.vehicle(RageShared.Vehicle.Enums.VEHICLETYPES.ADMIN, vehicleModel, player.position, player.heading, player.dimension);
        player.showNotify(RageShared.Enums.NotifyType.TYPE_SUCCESS, `Successfully spawned ${vehicleModel} (${vehicle.getId()})`);
    }
});

RAGERP.commands.add({
    name: "dim",
    aliases: ["setdimension", "setdim"],
    adminlevel: 1,
    run: (player: PlayerMp, fullText: string, target: string, dimension: string) => {
        if (!fullText.length || !target.length || !dimension.length) return player.outputChatBox("Usage: /setdimension [target] [dimension]");

        const parseTarget = parseInt(target);
        if (isNaN(parseTarget)) return player.outputChatBox("Usage: /setdimension [target] [dimension]");

        const parseDimension = parseInt(dimension);
        if (isNaN(parseDimension)) return player.outputChatBox("Usage: /setdimension [target] [dimension]");

        const targetPlayer = mp.players.at(parseTarget);
        if (!targetPlayer || !mp.players.exists(targetPlayer)) return player.outputChatBox("Usage: /setdimension [target] [dimension]");

        targetPlayer.dimension = parseDimension;

        player.showNotify(RageShared.Enums.NotifyType.TYPE_SUCCESS, `You've successfully changed ${targetPlayer.name} dimension to ${parseDimension}`);
        targetPlayer.showNotify(RageShared.Enums.NotifyType.TYPE_INFO, `Administrator ${player.name} changed your dimension to ${parseDimension}`);
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
        targetPlayer.setVariable("adminLevel", targetPlayer.character.adminlevel);
        await RAGERP.database.getRepository(CharacterEntity).update(targetPlayer.character.id, { adminlevel: adminLevel });
        player.showNotify(RageShared.Enums.NotifyType.TYPE_SUCCESS, `You've successfully made ${targetPlayer.name} an admin level ${adminLevel}`);
        targetPlayer.showNotify(RageShared.Enums.NotifyType.TYPE_INFO, `${player.name} has made you an admin level ${adminLevel}`);
        RAGERP.commands.reloadCommands(targetPlayer);
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
