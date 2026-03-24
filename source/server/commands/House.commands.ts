import { RAGERP } from "@api";
import { House } from "@classes/House.class";
import { RageShared } from "@shared/index";



RAGERP.commands.add({
    name: "createhouse",
    adminlevel: RageShared.Enums.ADMIN_LEVELS.LEVEL_FOUR,
    run: async (player: PlayerMp, _, price: string) => {
        if (!_ || !price.length) return RAGERP.chat.sendSyntaxError(player, "/createhouse [price]");

        const housePrice = parseInt(price);
        if (isNaN(housePrice)) return player.showNotify(RageShared.Enums.NotifyType.TYPE_ERROR, "Invalid price.");

        const house = await House.create(player.position, player.position, housePrice, 0, "State", 0);

        if (!house) return player.outputChatBox("Error creating house");
        player.outputChatBox(`House created with id ${house.houseId}`);
    }
});

RAGERP.commands.add({
    name: "deletehouse",
    adminlevel: RageShared.Enums.ADMIN_LEVELS.LEVEL_FOUR,
    run: async (player: PlayerMp, args: [string]) => {
        const houseId = parseInt(args[0]);
        if (isNaN(houseId)) return player.outputChatBox("Invalid house ID.");

        const house = House.getHouse(houseId);
        if (!house) return player.outputChatBox("House not found.");

        await House.destroy(houseId);
        player.outputChatBox(`House with id ${houseId} has been deleted.`);
    }
});

RAGERP.commands.add({
    name: "gotohouse",
    adminlevel: RageShared.Enums.ADMIN_LEVELS.LEVEL_FOUR,
    run: (player: PlayerMp, args: [string]) => {
        const houseId = parseInt(args[0]);
        if (isNaN(houseId)) return player.outputChatBox("Invalid house ID.");

        const house = House.getHouse(houseId);
        if (!house) return player.outputChatBox("House not found.");

        player.position = house.enterPosition;
        player.dimension = house.dimension;
        player.outputChatBox(`Teleported to house with id ${houseId}.`);
    }
});

RAGERP.commands.add({
    name: "alockhouse",
    adminlevel: RageShared.Enums.ADMIN_LEVELS.LEVEL_FOUR,
    run: (player: PlayerMp, args: [string]) => {
        const houseId = parseInt(args[0]);
        if (isNaN(houseId)) return RAGERP.chat.sendSyntaxError(player, "Usage: /alockhouse [houseId]");

        const house = House.getHouse(houseId);
        if (!house) return player.outputChatBox("House not found.");

        house.toggleLock();
        player.outputChatBox(`House with id ${houseId} is now ${house.locked ? "locked" : "unlocked"}.`);
    }
});

RAGERP.commands.add({
    name: 'asellhouse',
    adminlevel: RageShared.Enums.ADMIN_LEVELS.LEVEL_FOUR,
    run: async (player: PlayerMp, args: [string]) => {
        const houseId = parseInt(args[0]);
        if (isNaN(houseId)) return player.outputChatBox("Invalid house ID.");

        const house = House.getHouse(houseId);
        if (!house) return player.outputChatBox("House not found.");

        house.owner = -1;
        house.ownerName = "State";

        await house.save();
        player.outputChatBox(`House with id ${houseId} has been sold.`);
    }
})