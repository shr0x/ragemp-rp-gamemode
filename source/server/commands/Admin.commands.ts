import { RAGERP } from "@api";
import { CharacterEntity } from "@entities/Character.entity";
import { inventoryAssets } from "@modules/inventory/Items.module";
import { RageShared } from "@shared/index";

RAGERP.commands.add({
    name: "ah",
    aliases: ["adminhelp", "admincmds", "acmds"],
    adminlevel: 1,
    run: (player: PlayerMp) => {
        const adminCommandsByLevel: { [level: number]: string[] } = {};

        const adminLevels: { [key: number]: string } = {
            1: "!{#14AA0B}LEVEL 1",
            2: "!{#14AA0B}LEVEL 2",
            3: "!{#14AA0B}LEVEL 3",
            4: "!{#0C66D8}LEVEL 4",
            5: "!{#0C66D8}LEVEL 5",
            6: "!{#fa0339}LEVEL 6"
        };

        RAGERP.commands
            .getallCommands()
            .filter((cmd) => {
                return player.character && typeof cmd.adminlevel === "number" && cmd.adminlevel > 0 && cmd.adminlevel <= player.character.adminlevel;
            })
            .forEach((cmd) => {
                if (!cmd.adminlevel) return;
                if (!adminCommandsByLevel[cmd.adminlevel]) {
                    adminCommandsByLevel[cmd.adminlevel] = [];
                }
                adminCommandsByLevel[cmd.adminlevel].push(`/${cmd.name}`);
            });

        player.outputChatBox("!{red}____________[ADMIN COMMANDS]____________");
        for (const level in adminCommandsByLevel) {
            if (adminCommandsByLevel.hasOwnProperty(level)) {
                const commands = adminCommandsByLevel[level];
                const itemsPerLog = 5;
                for (let i = 0; i < commands.length; i += itemsPerLog) {
                    const endIndex = Math.min(i + itemsPerLog, commands.length);
                    const currentItems = commands.slice(i, endIndex);

                    player.outputChatBox(`${adminLevels[level]}!{white}: ${currentItems.join(", ")}`);
                }
            }
        }
    }
});

RAGERP.commands.add({
    name: "a",
    aliases: ["adminchat"],
    adminlevel: RageShared.Enums.ADMIN_LEVELS.LEVEL_ONE,
    run: (player: PlayerMp, fulltext: string) => {
        if (!fulltext.length) return player.outputChatBox("Usage: /a [text]");

        const admins = mp.players.toArray().filter((x) => x.character && x.character.adminlevel > 0);

        admins.forEach((admin) => {
            admin.outputChatBox(`!{#ffff00}[A] ${player.name}: ${fulltext}`);
        });
    }
});

RAGERP.commands.add({
    name: "veh",
    aliases: ["vehicle", "spawnveh", "spawncar"],
    adminlevel: RageShared.Enums.ADMIN_LEVELS.LEVEL_ONE,
    run: (player: PlayerMp, fullText: string, vehicleModel: string) => {
        if (!fullText.length || !vehicleModel.length) return player.outputChatBox("Usage: /veh [vehiclemodel]");

        const vehicle = new RAGERP.entities.vehicles.new(RageShared.Vehicles.Enums.VEHICLETYPES.ADMIN, vehicleModel, player.position, player.heading, player.dimension);
        player.showNotify(RageShared.Enums.NotifyType.TYPE_SUCCESS, `Successfully spawned ${vehicleModel} (${vehicle.getId()})`);
        RAGERP.chat.sendAdminWarning(0xff6347ff, `AdmWarn: ${player.name} (${player.id}) has spawned a vehicle (Model: ${vehicleModel} | ID: ${vehicle.getId()}).`);
    }
});

RAGERP.commands.add({
    name: "dim",
    aliases: ["setdimension", "setdim"],
    adminlevel: RageShared.Enums.ADMIN_LEVELS.LEVEL_ONE,
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
    aliases: ["setadmin"],
    adminlevel: RageShared.Enums.ADMIN_LEVELS.LEVEL_SIX,
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

        RAGERP.chat.sendAdminWarning(
            0xff6347ff,
            adminLevel > 0
                ? `AdmWarn: ${player.name} (${player.id}) has made ${targetPlayer.name} (${targetPlayer.id}) a level ${adminLevel} admin.`
                : `AdmWarn: ${player.name} (${player.id}) has removed ${targetPlayer.name} admin level.`
        );

        RAGERP.commands.reloadCommands(targetPlayer);
    }
});

RAGERP.commands.add({
    name: "spectate",
    aliases: ["spec"],
    adminlevel: RageShared.Enums.ADMIN_LEVELS.LEVEL_ONE,
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

RAGERP.commands.add({
    name: "destroyveh",
    aliases: ["destroyvehicles", "destroycar", "destroycars"],
    description: "Destroy admin spawned vehicles",
    adminlevel: RageShared.Enums.ADMIN_LEVELS.LEVEL_ONE,
    run: (player: PlayerMp) => {
        if (player.vehicle) {
            const vehicleData = RAGERP.entities.vehicles.manager.at(player.vehicle.id);
            if (!vehicleData) return;
            vehicleData.destroy();
            return;
        }
        const adminVehicles = RAGERP.entities.vehicles.pool.filter((x) => x.type === RageShared.Vehicles.Enums.VEHICLETYPES.ADMIN);
        adminVehicles.forEach((vehicle) => vehicle.destroy());
        player.showNotify(RageShared.Enums.NotifyType.TYPE_SUCCESS, `You've successfully deleted all admin spawned vehicles.`);
    }
});

RAGERP.commands.add({
    name: "revive",
    adminlevel: RageShared.Enums.ADMIN_LEVELS.LEVEL_ONE,
    description: "Revive a player",
    run: async (player: PlayerMp, fulltext: string, target: string) => {
        if (!fulltext.length || !target.length) return player.outputChatBox("Usage: /revive [targetplayer]");

        const parseTarget = parseInt(target);
        if (isNaN(parseTarget)) return player.outputChatBox("Usage: /revive [targetplayer]");

        const targetPlayer = mp.players.getPlayerByName(target);

        if (!targetPlayer || !mp.players.exists(targetPlayer) || !targetPlayer.character) return player.showNotify(RageShared.Enums.NotifyType.TYPE_ERROR, "Invalid player specified.");
        if (targetPlayer.character.deathState !== RageShared.Players.Enums.DEATH_STATES.STATE_INJURED) return player.showNotify(RageShared.Enums.NotifyType.TYPE_ERROR, "That player is not injured.");

        targetPlayer.spawn(targetPlayer.position);
        targetPlayer.character.deathState = RageShared.Players.Enums.DEATH_STATES.STATE_NONE;

        targetPlayer.character.setStoreData(player, "isDead", false);
        targetPlayer.setVariable("isDead", false);
        targetPlayer.stopScreenEffect("DeathFailMPIn");
        targetPlayer.stopAnimation();

        await targetPlayer.character.save(targetPlayer);
        player.showNotify(RageShared.Enums.NotifyType.TYPE_SUCCESS, `You successfully revived ${targetPlayer.name}`);
        targetPlayer.showNotify(RageShared.Enums.NotifyType.TYPE_SUCCESS, `You were revived by admin ${player.name}`);
        RAGERP.chat.sendAdminWarning(0xff6347ff, `AdmWarn: ${player.name} (${player.id}) has revived player ${targetPlayer.name} (${targetPlayer.id}).`);
    }
});

RAGERP.commands.add({
    name: "giveclothes",
    adminlevel: RageShared.Enums.ADMIN_LEVELS.LEVEL_SIX,
    run: (player: PlayerMp, fulltext: string, target: string, item: RageShared.Inventory.Enums.ITEM_TYPES, comp: string, drawable: string, texture: string) => {
        if (!fulltext.length || !target.length || !item.length || !comp.length || !drawable.length || !texture.length) {
            player.outputChatBox(`Usage: /giveclothes [player] [cloth_name] [component] [drawable] [texture]`);
            player.outputChatBox(
                `Clothing Names: ${Object.values(inventoryAssets.items)
                    .filter((x) => x.typeCategory === RageShared.Inventory.Enums.ITEM_TYPE_CATEGORY.TYPE_CLOTHING)
                    .map((e) => e.type.toLowerCase())
                    .join(", ")}`
            );
            return;
        }

        const targetplayer = mp.players.getPlayerByName(target);
        if (!targetplayer || !mp.players.exists(targetplayer) || !targetplayer.character || !targetplayer.character.inventory)
            return player.showNotify(RageShared.Enums.NotifyType.TYPE_ERROR, "Invalid player specified.");

        const itemData = targetplayer.character.inventory.addClothingItem(item, { component: parseInt(comp), drawable: parseInt(drawable), texture: parseInt(texture) });

        targetplayer.showNotify(
            itemData ? RageShared.Enums.NotifyType.TYPE_SUCCESS : RageShared.Enums.NotifyType.TYPE_ERROR,
            itemData ? `You received a ${itemData.name}` : `An error occurred giving u the item.`
        );
        player.showNotify(
            itemData ? RageShared.Enums.NotifyType.TYPE_SUCCESS : RageShared.Enums.NotifyType.TYPE_ERROR,
            itemData ? `You gave a ${itemData.name} to ${targetplayer.name} (${targetplayer.id})` : `An error occurred giving the item to ${targetplayer.name}.`
        );
    }
});

RAGERP.commands.add({
    name: "giveitem",
    adminlevel: RageShared.Enums.ADMIN_LEVELS.LEVEL_SIX,
    run: (player: PlayerMp, fulltext: string, target: string, item: RageShared.Inventory.Enums.ITEM_TYPES, count: string) => {
        if (!fulltext.length || !target.length || !item.length) return player.outputChatBox("Usage: /giveitem [player] [item type] [count]");

        const targetplayer = mp.players.getPlayerByName(target);

        if (!targetplayer || !mp.players.exists(targetplayer) || !targetplayer.character || !targetplayer.character.inventory) {
            return player.showNotify(RageShared.Enums.NotifyType.TYPE_ERROR, "Invalid player specified.");
        }
        const itemData = targetplayer.character.inventory.addItem(item);

        if (itemData) {
            itemData.count = isNaN(parseInt(count)) ? 0 : parseInt(count);
            if (!itemData.options.includes("split") && itemData.count > 1) itemData.options.push("split");
        }
        targetplayer.showNotify(
            itemData ? RageShared.Enums.NotifyType.TYPE_SUCCESS : RageShared.Enums.NotifyType.TYPE_ERROR,
            itemData ? `You received a ${itemData.name} (x${itemData.count}) from admin ${player.name}` : `An error occurred giving u the item.`
        );
        player.showNotify(
            itemData ? RageShared.Enums.NotifyType.TYPE_SUCCESS : RageShared.Enums.NotifyType.TYPE_ERROR,
            itemData ? `You spawned a ${itemData.name} (x${itemData.count}) to ${targetplayer.name} (${targetplayer.id})` : `An error occurred giving the item.`
        );
    }
});
