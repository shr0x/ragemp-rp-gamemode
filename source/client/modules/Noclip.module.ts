import { PlayerKeybind } from "@classes/Keybind.class";

type flyType = "speed" | "hSpeed" | "vSpeed" | "lSpeed" | "point_distance";

interface IFly {
    flying: boolean;
    speed: number;
    hSpeed: number;
    vSpeed: number;
    lSpeed: number;
    point_distance: number;
}

const controlsIds = {
    W: 32,
    S: 33,
    A: 34,
    D: 35,
    Space: 321,
    LCtrl: 326,
    Shift: 21,
    LAlt: 19
};

const fly: IFly = {
    flying: false,
    speed: 2.0,
    hSpeed: 2.0,
    vSpeed: 2.0,
    lSpeed: 0.0,
    point_distance: 1000
};

const gameplayCam = mp.cameras.new("gameplay");

let direction: Vector3;

const setPlayerState = (player: PlayerMp, state: boolean): void => {
    player.freezePosition(state);
    player.setCanBeTargetted(!state);
    player.setAlpha(state ? 0 : 255);
    player.setVisible(!state, false);
};

const getGroundZ = (position: Vector3): Vector3 => {
    //@ts-ignore
    position.z = mp.game.gameplay.getGroundZFor3dCoord(position.x, position.y, position.z, 0.0, false);
    return position;
};

mp.events.add("client::noclip:stop", () => {
    if (!fly.flying) return;

    fly.flying = false;
    setPlayerState(mp.players.local, fly.flying);
    mp.events.callRemote("server::player:noclip", fly.flying);

    if (!fly.flying) {
        let position = mp.players.local.position;
        position = getGroundZ(position);
        mp.players.local.setCoordsNoOffset(position.x, position.y, position.z, false, false, false);
    }
});

PlayerKeybind.addKeybind(
    { up: false, keyCode: 116 },
    () => {
        if (!mp.players.local.getVariable("adminLevel") || mp.players.local.isTypingInTextChat) return;

        direction = gameplayCam.getDirection();
        fly.flying = !fly.flying;
        setPlayerState(mp.players.local, fly.flying);
        mp.events.callRemote("server::player:noclip", fly.flying);

        if (!fly.flying && !mp.game.controls.isControlPressed(0, controlsIds.Space)) {
            let position = mp.players.local.position;
            position = getGroundZ(position);
            mp.players.local.setCoordsNoOffset(position.x, position.y, position.z, false, false, false);
        }
    },
    "Noclip"
);

mp.events.add("client::player:noclip", (remote: number, status: boolean) => {
    const targetplayer = mp.players.atRemoteId(remote);
    if (!targetplayer) return;

    targetplayer.setInvincible(status);
    setPlayerState(targetplayer, status);
});

mp.events.add("entityStreamIn", (entity: PlayerMp) => {
    if (entity.type === "player") {
        const isflying = entity.getVariable("noclip");
        setPlayerState(entity, isflying);
        entity.setInvincible(isflying);
    }
});

mp.events.add("render", () => {
    if (!mp.players.local.getVariable("adminLevel") || !fly.flying) return;

    const controls = mp.game.controls;
    direction = gameplayCam.getDirection();
    let updated = false;
    const position = mp.players.local.position;
    let speed = controls.isControlPressed(0, controlsIds.Shift) ? 1.0 : 0.1;
    speed = controls.isControlPressed(0, controlsIds.LAlt) ? 0.05 : speed;
    if (controls.isControlPressed(0, controlsIds.Shift) && controls.isControlPressed(0, controlsIds.LAlt)) speed = 0.01;

    const movePlayer = (axis: flyType, speedFactor: number, maxSpeed: number): void => {
        if (fly[axis] < maxSpeed) {
            fly[axis] *= 1.025;
        }
        position.x += direction.x * fly[axis] * speedFactor * speed;
        position.y += direction.y * fly[axis] * speedFactor * speed;
        position.z += direction.z * fly[axis] * speedFactor * speed;
        updated = true;
    };

    if (controls.isControlPressed(0, controlsIds.W)) movePlayer("speed", 1.0, 8.0);
    else if (controls.isControlPressed(0, controlsIds.S)) movePlayer("speed", -1.0, 8.0);
    else fly.speed = 2.0;

    if (controls.isControlPressed(0, controlsIds.A)) movePlayer("lSpeed", -1.0, 8.0);
    else if (controls.isControlPressed(0, controlsIds.D)) movePlayer("lSpeed", 1.0, 8.0);
    else fly.lSpeed = 2.0;

    if (controls.isControlPressed(0, controlsIds.Space)) movePlayer("vSpeed", 1.0, 8.0);
    else if (controls.isControlPressed(0, controlsIds.LCtrl)) movePlayer("vSpeed", -1.0, 8.0);
    else fly.vSpeed = 2.0;

    if (updated) {
        mp.players.local.setCoordsNoOffset(position.x, position.y, position.z, false, false, false);
    }
});
