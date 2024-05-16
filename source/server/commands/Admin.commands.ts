import { RAGERP } from "../api";

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

        mp.vehicles.new(mp.joaat(vehicleModel), player.position);
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
