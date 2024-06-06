import { RAGERP } from "@api";
import { InteractionMenu } from "@classes/Interaction.class";

/**
 * This events are triggered from client-side
 */
mp.events.add("server::vehicle:setTrunkState", (player: PlayerMp, vehicleid: number, state: boolean) => {
    const vehicle = RAGERP.entities.vehicles.at(vehicleid);
    if (!vehicle || !mp.vehicles.exists(vehicle._vehicle)) return;
    vehicle.setData("trunkState", state);
});

mp.events.add("server::vehicle:setHoodState", (player: PlayerMp, vehicleid: number, state: boolean) => {
    const vehicle = RAGERP.entities.vehicles.at(vehicleid);
    if (!vehicle || mp.vehicles.exists(vehicle._vehicle)) return;
    vehicle.setData("hoodState", state);
});

mp.events.add("server::interaction:vehicle", async (player: PlayerMp, vehicleId: number) => {
    const vehicle = RAGERP.entities.vehicles.at(vehicleId);
    if (!vehicle || !vehicle._vehicle) return;

    player.interactionMenu = new InteractionMenu();

    const interactionData = [
        { id: 0, text: "Toggle Hood", type: 0 },
        { id: 1, text: "Toggle Trunk", type: 1 },
        { id: 2, text: "Lock Vehicle", type: 2 }
    ];

    const result = await player.interactionMenu.new(player, { isActive: true, items: interactionData });

    if (result === null) return player.interactionMenu?.closeMenu(player);
    switch (result) {
        case 0: {
            vehicle.setData("hoodState", !vehicle.getData("hoodState"));
            break;
        }
        case 1: {
            vehicle.setData("trunkState", !vehicle.getData("trunkState"));
            break;
        }
        case 2: {
            vehicle.setData("locked", !vehicle.getData("locked"));
            break;
        }
        default:
            return player.interactionMenu?.closeMenu(player);
    }
    player.interactionMenu?.closeMenu(player);
});
