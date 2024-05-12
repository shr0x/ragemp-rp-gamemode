import { CommandRegistry } from "../classes/Command.class";

CommandRegistry.add({
    name: "testchat",
    run: (player: PlayerMp, fullText) => {
        player.outputChatBox(fullText);
    }
});
CommandRegistry.add({
    name: "veh",
    run: (player: PlayerMp, fullText: string, vehicleModel: string) => {
        if (!fullText.length || !vehicleModel.length) return;

        mp.vehicles.new(mp.joaat(vehicleModel), player.position);
    }
});

CommandRegistry.add({
    name: "ped",
    run: (player: PlayerMp) => {
        const ped = mp.peds.new(mp.joaat("mp_m_freemode_01"), player.position, { dynamic: true, invincible: false, lockController: true, dimension: 0 });
        player.giveWeapon(mp.joaat("weapon_pistol"), 1000);
        ped.controller = player;
    }
});

CommandRegistry.add({
    name: "dim",
    run: (player: PlayerMp, full, dim) => {
        player.dimension = parseInt(dim);
    }
});
