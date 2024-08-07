import { Utils } from "@shared/Utils.module";
let overlayParams = {
    enableDepth: false,
    deleteWhenUnused: false,
    keepNonBlurred: true,
    processAttachments: true,
    fill: { enable: false, color: 0xffffffff },
    noise: { enable: false, size: 0.0, speed: 0.0, intensity: 0.0 },
    outline: { enable: true, color: 0x00aa00aa, width: 2.0, blurRadius: 1.0, blurIntensity: 1.0 },
    wireframe: { enable: false }
};

class _EntityRaycast {
    entity: EntityMp | null = null;

    rayCastInterval: NodeJS.Timer | null = null;
    renderEvent: EventMp | null = null;
    batch: any;

    constructor() {
        this.rayCastInterval = setInterval(this.process.bind(this), 100);
        this.renderEvent = new mp.Event("render", this.render.bind(this));
        //@ts-ignore
        mp.game.graphics.setEntityOverlayPassEnabled(true);
        //@ts-ignore
        this.batch = mp.game.graphics.createEntityOverlayBatch(overlayParams);
        mp.console.logWarning(`overlayhandle: ${this.batch.handle}`);
    }

    private render() {
        if (!mp.players.local.getVariable("loggedin") || this.entity == null || this.entity.type === "ped") return;
        if (Utils.distanceToPos(this.entity.position, mp.players.local.position) > 3 || !mp.game.controls.isControlPressed(0, 19)) return;

        const foundEntity = this.entity.type === "vehicle" ? mp.vehicles : this.entity.type === "object" ? mp.objects : mp.players;
        if (this.entity.type === "vehicle" && mp.vehicles.atHandle(this.entity.handle).getEngineHealth() < 0) return;

        const entity = foundEntity.atHandle(this.entity.handle);

        const coords = entity.getCoords(false);

        mp.game.graphics.setDrawOrigin(coords.x, coords.y, coords.z, 0);

        switch (this.entity.type) {
            case "player": {
                if (!mp.players.atHandle(this.entity.handle)) return;
                mp.game.graphics.drawMarker(0, coords.x, coords.y, coords.z + 2, 0, 0, 0, 0, 0, 0, 1.0, 1.0, 1.0, 255, 255, 255, 255, true, false, 2, false, null, null, false);
                mp.game.graphics.drawText("[G]", [0, 0], { font: 4, color: [255, 255, 255, 255], outline: true, centre: true });
                break;
            }
            case "vehicle": {
                if (!mp.vehicles.atHandle(this.entity.handle)) return;
                mp.game.graphics.drawMarker(0, coords.x, coords.y, coords.z + 2, 0, 0, 0, 0, 0, 0, 1.0, 1.0, 1.0, 255, 0, 0, 255, true, false, 2, false, null, null, false);
                mp.game.graphics.drawText("[G]", [0, 0], { font: 4, color: [255, 255, 255, 255], outline: true, centre: true });
                this.batch.addThisFrame(entity);
                this.batch.update(overlayParams);
                break;
            }
            // case "object" :{
            //     if (!mp.objects.atHandle(this.entity.handle)) return;
            //     mp.game.graphics.drawText("[G]", [0, 0], { font: 4, color: [255, 255, 255, 255], outline: true, centre: true });
            //     this.batch.addThisFrame(entity);
            //     this.batch.update(overlayParams);
            //     break;
            // }
            default: {
                break;
            }
        }

        mp.game.graphics.clearDrawOrigin();
    }

    private process() {
        if (!mp.players.local.getVariable("loggedin") || mp.players.local.isSittingInAnyVehicle()) {
            this.entity = null;
            return;
        }
        const cameraMode = mp.game.cam.getFollowPedViewMode();
        const cameraModeValues: { [key: number]: number } = { 1: 7.0, 2: 9.0, 4: 3.0 };
        this.entity = this.pointingAtWithRadius(cameraModeValues[cameraMode] ?? 5.0);
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
