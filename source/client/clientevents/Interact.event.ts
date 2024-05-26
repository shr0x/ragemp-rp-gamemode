import { Utils } from "../../shared/Utils.module";
import { Browser } from "../classes/Browser.class";

export let current_object: Handle | undefined = undefined;
let entity: EntityMp | null = null;

function addToVector3(vector1: { x: number; y: number; z: number }, vector2: { x: number; y: number; z: number }) {
    return {
        x: vector1.x + vector2.x,
        y: vector1.y + vector2.y,
        z: vector1.z + vector2.z
    };
}

function substractFromVector(vector1: { x: number; y: number; z: number }, vector2: { x: number; y: number; z: number }) {
    return {
        x: vector1.x - vector2.x,
        y: vector1.y - vector2.y,
        z: vector1.z - vector2.z
    };
}

function mulNumber(vector1: any, value: number) {
    let result = {
        x: vector1.x * value,
        y: vector1.y * value,
        z: vector1.z * value
    };
    return result;
}

function processCoordinates(x: number, y: number) {
    //@ts-ignore
    var res = mp.game.graphics.getActiveScreenResolution(0, 0);
    //@ts-ignore
    let screenX = res[1];
    //@ts-ignore
    let screenY = res[2];

    let relativeX = 1 - (x / screenX) * 1.0 * 2;
    let relativeY = 1 - (y / screenY) * 1.0 * 2;

    if (relativeX > 0.0) {
        relativeX = -relativeX;
    } else {
        relativeX = Math.abs(relativeX);
    }

    if (relativeY > 0.0) {
        relativeY = -relativeY;
    } else {
        relativeY = Math.abs(relativeY);
    }

    return { x: relativeX, y: relativeY };
}

function degToRad(deg: number) {
    return (deg * Math.PI) / 180.0;
}

function rotationToDirection(rotation: any) {
    let z = degToRad(rotation.z);
    let x = degToRad(rotation.x);
    let num = Math.abs(Math.cos(x));

    let result = { x: -1, y: -1, z: -1 };
    result.x = -Math.sin(z) * num;
    result.y = Math.cos(z) * num;
    result.z = Math.sin(x);
    return result;
}

function w2s(position: any) {
    let result: any = mp.game.graphics.getScreenCoordFromWorldCoord(position.x, position.y, position.z);

    if (!result[0]) {
        return undefined;
    }

    let newPos = { x: -1, y: -1, z: -1 };
    newPos.x = (result[1] - 0.5) * 2;
    newPos.y = (result[2] - 0.5) * 2;
    newPos.z = 0;
    return newPos;
}

function s2w(camPos: Vector3, relX: any, relY: any) {
    let camRot = mp.game.cam.getGameplayCamRot(0);
    let camForward = rotationToDirection(camRot);
    let rotUp = addToVector3(camRot, { x: 10, y: 0, z: 0 });
    let rotDown = addToVector3(camRot, { x: -10, y: 0, z: 0 });
    let rotLeft = addToVector3(camRot, { x: 0, y: 0, z: -10 });
    let rotRight = addToVector3(camRot, { x: 0, y: 0, z: 10 });

    let camRight = substractFromVector(rotationToDirection(rotRight), rotationToDirection(rotLeft));
    let camUp = substractFromVector(rotationToDirection(rotUp), rotationToDirection(rotDown));

    let rollRad = -degToRad(camRot.y);

    let camRightRoll = substractFromVector(mulNumber(camRight, Math.cos(rollRad)), mulNumber(camUp, Math.sin(rollRad)));
    let camUpRoll = addToVector3(mulNumber(camRight, Math.sin(rollRad)), mulNumber(camUp, Math.cos(rollRad)));

    let point3D = addToVector3(addToVector3(addToVector3(camPos, mulNumber(camForward, 10.0)), camRightRoll), camUpRoll);

    let point2D = w2s(point3D);

    if (point2D === undefined) {
        return addToVector3(camPos, mulNumber(camForward, 10.0));
    }

    let point3DZero = addToVector3(camPos, mulNumber(camForward, 10.0));
    let point2DZero = w2s(point3DZero);

    if (point2DZero === undefined) {
        return addToVector3(camPos, mulNumber(camForward, 10.0));
    }

    let eps = 0.001;

    if (Math.abs(point2D.x - point2DZero.x) < eps || Math.abs(point2D.y - point2DZero.y) < eps) {
        return addToVector3(camPos, mulNumber(camForward, 10.0));
    }

    let scaleX = (relX - point2DZero.x) / (point2D.x - point2DZero.x);
    let scaleY = (relY - point2DZero.y) / (point2D.y - point2DZero.y);
    let point3Dret = addToVector3(addToVector3(addToVector3(camPos, mulNumber(camForward, 10.0)), mulNumber(camRightRoll, scaleX)), mulNumber(camUpRoll, scaleY));

    return point3Dret;
}

function Screen2dToWorld3dPosition(absoluteX: number, absoluteY: number, flags: number, ignore: number) {
    let camPos = mp.game.invoke("0x14D6F5678D8F1B37");
    let processedCoords = processCoordinates(absoluteX, absoluteY);
    let target = s2w(camPos, processedCoords.x, processedCoords.y);

    let dir = substractFromVector(target, camPos);
    let from = addToVector3(camPos, mulNumber(dir, 0.05));
    let to = addToVector3(camPos, mulNumber(dir, 300));

    let ray = mp.game.invoke("0x377906D8A31E5586", from.x, from.y, from.z, to.x, to.y, to.z, flags, ignore, 0);
    //@ts-ignore
    let result = mp.game.shapetest.getShapeTestResult(ray, undefined, undefined, undefined, undefined);
    return result;
}

function getLookingAtEntity() {
    let startPosition = mp.players.local.getBoneCoords(12844, 0.5, 0, 0);
    //@ts-ignore
    var resolution = mp.game.graphics.getScreenActiveResolution(1, 1);
    //@ts-ignore
    let secondPoint = mp.game.graphics.screen2dToWorld3d([resolution.x / 2, resolution.y / 2, 2 | 4 | 8]);
    if (secondPoint == undefined) return null;

    startPosition.z -= 0.3;
    const result: any = mp.raycasting.testPointToPoint(startPosition, secondPoint, mp.players.local, 2 | 4 | 8 | 16);
    if (typeof result !== "undefined") {
        if (typeof result.entity.type === "undefined") return null;
        if (result.entity.type == "object" && result.entity.getVariable("TYPE") == undefined) return null;

        let entPos = result.entity.position;
        let lPos = mp.players.local.position;
        if (mp.game.gameplay.getDistanceBetweenCoords(entPos.x, entPos.y, entPos.z, lPos.x, lPos.y, lPos.z, true) > 8) return null;
        if (result.entity.type == "ped" || result.entity.type == "object") return;
        if (mp.players.local.isInAnyVehicle(false)) return;
        return result.entity;
    }
    return null;
}

function drawInteraction() {
    if (entity == null) return;

    let foundEntity = entity.type === "vehicle" ? mp.vehicles : mp.players;
    if (entity && entity.type === "vehicle" && mp.vehicles.atHandle(entity.handle).getEngineHealth() < 0) return;

    let coords = foundEntity.atHandle(entity.handle).getCoords(false);

    mp.game.graphics.setDrawOrigin(coords.x, coords.y, coords.z, 0);

    if (entity.type === "player" && mp.players.atHandle(entity.handle)) {
        mp.game.graphics.drawMarker(0, coords.x, coords.y, coords.z + 2, 0, 0, 0, 0, 0, 0, 1.0, 1.0, 1.0, 255, 255, 255, 255, true, false, 2, false, null, null, false);
        mp.game.graphics.drawText("[G]", [0, 0], { font: 4, color: [255, 255, 255, 255], outline: true, centre: true });
    } else if (entity.type === "vehicle") {
        mp.game.graphics.drawMarker(0, coords.x, coords.y, coords.z + 2, 0, 0, 0, 0, 0, 0, 1.0, 1.0, 1.0, 255, 255, 255, 255, true, false, 2, false, null, null, false);
        mp.game.graphics.drawText("[G]", [0, 0], { font: 4, color: [255, 255, 255, 255], outline: true, centre: true });
    }
    mp.game.graphics.clearDrawOrigin();
}

mp.events.add("render", () => {
    if (Browser.currentPage || mp.game.ui.isPauseMenuActive()) return;

    if (!mp.players.local.isInAnyVehicle(false)) {
        entity = getLookingAtEntity();
        if (entity != null) {
            let entityPos: Vector3 | null = null;

            if (entity.type === "vehicle" && mp.vehicles.exists(mp.vehicles.atHandle(entity.handle)) && mp.vehicles.atHandle(entity.handle).getEngineHealth() > 0) {
                entityPos = mp.vehicles.atHandle(entity.handle).position;
            } else if (entity.type === "player" && mp.players.exists(mp.players.atHandle(entity.handle))) {
                entityPos = mp.players.atHandle(entity.handle).position;
            }
            if (entityPos != null && Utils.distanceToPos(entityPos, mp.players.local.position) < 3 && mp.game.controls.isControlPressed(0, 19)) {
                drawInteraction();
                current_object = entity.handle;
            } else {
                if (current_object) current_object = undefined;
            }
        } else if (entity == null && current_object) {
            current_object = undefined;
        }
    }
});

mp.events.add("render", () => {
    if (Browser.currentPage || mp.game.ui.isPauseMenuActive()) return;
    //@ts-ignore
    const { x, y } = mp.game.graphics.getActiveScreenResolution(0, 0);
    const test = Screen2dToWorld3dPosition(x / 2, y / 2, -1, mp.players.local.handle);
    const coords = test.surfaceNormal;
    const cast: any = mp.game.shapetest.getShapeTestResult(
        mp.game.invoke("0x377906D8A31E5586", mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z, coords.x, coords.y, coords.z, -1, mp.players.local.handle, 0)
    );

    if (coords) {
        let dist = mp.game.gameplay.getDistanceBetweenCoords(coords.x, coords.y, coords.z, mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z, false);
        if (dist < 3) {
            current_object = cast[4];
        }
    }
});
