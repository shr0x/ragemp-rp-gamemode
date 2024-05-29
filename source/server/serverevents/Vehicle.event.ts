import { RAGERP } from "../api";

/**
 * This events are triggered from client-side
 */
mp.events.add("server::vehicle:setTrunkState", (player: PlayerMp, vehicleid: number, state: boolean) => {
    const vehicle = RAGERP.entities.vehicle.at(vehicleid);
    if (!vehicle || !mp.vehicles.exists(vehicle._vehicle)) return;
    vehicle.setData("trunkState", state);
});

mp.events.add("server::vehicle:setHoodState", (player: PlayerMp, vehicleid: number, state: boolean) => {
    const vehicle = RAGERP.entities.vehicle.at(vehicleid);
    if (!vehicle || mp.vehicles.exists(vehicle._vehicle)) return;
    vehicle.setData("hoodState", state);
});
