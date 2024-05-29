import { Utils } from "../../shared/Utils.module";

class _EntityRaycast {
    entity: EntityMp | null = null;

    rayCastInterval: NodeJS.Timer | null = null;
    renderEvent: EventMp | null = null;

    constructor() {
        this.rayCastInterval = setInterval(this.process.bind(this), 100);
        this.renderEvent = new mp.Event("render", this.render.bind(this));
    }

    private render() {
        if (!mp.players.local.getVariable("loggedin") || this.entity == null) return;
        if (Utils.distanceToPos(this.entity.position, mp.players.local.position) > 3 || !mp.game.controls.isControlPressed(0, 19)) return;

        const foundEntity = this.entity.type === "vehicle" ? mp.vehicles : mp.players;
        if (this.entity.type === "vehicle" && mp.vehicles.atHandle(this.entity.handle).getEngineHealth() < 0) return;
        const coords = foundEntity.atHandle(this.entity.handle).getCoords(false);

        mp.game.graphics.setDrawOrigin(coords.x, coords.y, coords.z, 0);

        if (this.entity.type === "player" && mp.players.atHandle(this.entity.handle)) {
            mp.game.graphics.drawMarker(0, coords.x, coords.y, coords.z + 2, 0, 0, 0, 0, 0, 0, 1.0, 1.0, 1.0, 255, 255, 255, 255, true, false, 2, false, null, null, false);
            mp.game.graphics.drawText("[G]", [0, 0], { font: 4, color: [255, 255, 255, 255], outline: true, centre: true });
        } else if (this.entity.type === "vehicle") {
            mp.game.graphics.drawMarker(0, coords.x, coords.y, coords.z + 2, 0, 0, 0, 0, 0, 0, 1.0, 1.0, 1.0, 255, 0, 0, 255, true, false, 2, false, null, null, false);
            mp.game.graphics.drawText("[G]", [0, 0], { font: 4, color: [255, 255, 255, 255], outline: true, centre: true });
        }
        mp.game.graphics.clearDrawOrigin();
    }

    private process() {
        if (!mp.players.local.getVariable("loggedin") || mp.players.local.isSittingInAnyVehicle()) {
            this.entity = null;
            return;
        }
        const cameraMode = mp.game.cam.getFollowPedViewMode();
        switch (cameraMode) {
            case 1:
                this.entity = this.pointingAtWithRadius(7.0);
                break;
            case 2:
                this.entity = this.pointingAtWithRadius(9.0);
                break;
            case 4:
                this.entity = this.pointingAtWithRadius(3.0);
                break;
            default:
                this.entity = this.pointingAtWithRadius(5.0);
                break;
        }
    }

    private pointingAt(distance: number) {
        const camera = mp.cameras.new("gameplay");
        const position = camera.getCoord();
        const direction = camera.getDirection();

        let farAway = new mp.Vector3(direction.x * distance + position.x, direction.y * distance + position.y, direction.z * distance + position.z);
        return mp.raycasting.testPointToPoint(position, farAway, mp.players.local, 2 | 4 | 8 | 16);
    }

    private pointingAtWithRadius(distance: number, radius: number = 0.2) {
        const camera = mp.cameras.new("gameplay");
        let position = camera.getCoord();
        let direction = camera.getDirection();
        let farAway = new mp.Vector3(direction.x * distance + position.x, direction.y * distance + position.y, direction.z * distance + position.z);
        const raycastResult = mp.raycasting.testCapsule(position, farAway, radius, mp.players.local);
        if (!raycastResult || !raycastResult.entity) return null;

        return typeof raycastResult.entity === "number" ? null : raycastResult.entity;
    }
}
export const EntityRaycast = new _EntityRaycast();
