import { Client } from "../classes/Client.class";

mp.events.add("render", () => {
    if (!mp.players.local.getVariable("loggedin")) return;
    mp.game.cam.invalidateIdle();
    mp.game.cam.invalidateVehicleIdle();

    if (mp.players.local.vehicle && mp.players.local.vehicle.getPedInSeat(-1) === mp.players.local.handle) {
        const vehicleSpeed = mp.players.local.vehicle.getSpeed() * 3.6;

        Client.hud.setSpeedometerData("speed", vehicleSpeed);
        Client.hud.setSpeedometerData("gear", mp.players.local.vehicle.gear);
    }
});

mp.events.add("playerEnterVehicle", (vehicle, seat) => {
    if (seat === -1) {
        Client.hud.showVehicleSpeedometer(true);
    }
});

mp.events.add("playerLeaveVehicle", (vehicle, seat) => {
    Client.hud.showVehicleSpeedometer(false);
});
