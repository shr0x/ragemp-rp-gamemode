mp.events.add("render", () => {
    mp.game.cam.invalidateIdle();
    mp.game.cam.invalidateVehicleIdle();
});
