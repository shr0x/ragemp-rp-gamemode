import { DynamicPoint } from "@classes/Point.class";

mp.events.add("server::player:pressE", async (player: PlayerMp) => {
    try {
        if (!mp.players.exists(player)) return;
        const point = DynamicPoint.getNearestPoint(player);
        if (!point) return;
        point.onKeyPress.constructor.name === "AsyncFunction" ? await point.onKeyPress(player) : point.onKeyPress(player);
    } catch (err) {
        console.error("dynamic point event err: ", err);
    }
});

mp.events.add("playerEnterColshape", (player: PlayerMp, shape: ColshapeMp): void => {
    if (typeof shape.enterHandler !== "undefined") shape.enterHandler(player);
});

mp.events.add("playerExitColshape", (player: PlayerMp, shape: ColshapeMp): void => {
    if (typeof shape.exitHandler !== "undefined") shape.exitHandler(player);
});
