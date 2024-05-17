let headingInterval: NodeJS.Timeout | null = null;

class ICamera {
    name: string;
    cam: CameraMp;

    constructor(name: string, cam: CameraMp) {
        this.name = name;
        this.cam = cam;
    }
}

class CameraManager {
    list: ICamera[] = [];
    enableRotation: boolean = false;
    entityToRotate: PlayerMp | VehicleMp = mp.players.local;

    constructor() {}

    createCamera(name: string, position: Vector3) {
        let camera = this.list.find((element) => element.name === name);
        if (camera) {
            if (mp.cameras.exists(camera.cam)) camera.cam.destroy();
            camera.cam = mp.cameras.new(name, position, new mp.Vector3(0, 0, 0), 50);
            camera.name = name;
        } else {
            this.list.push(new ICamera(name, mp.cameras.new(name, position, new mp.Vector3(0, 0, 0), 50)));
        }
    }

    public isActive(name: string) {
        let camera = this.list.find((element) => element.name === name);
        return camera !== undefined;
    }

    setCameraActive(name: string, toggle: boolean, time = 0) {
        let camera = this.list.find((element) => element.name === name);
        if (camera) {
            if (!mp.cameras.exists(camera.cam)) return false;
            camera.cam.setActive(toggle);
            mp.game.cam.renderScriptCams(true, true, time, true, false, 0);
        }
    }

    renderCamera(time: number) {
        mp.game.cam.renderScriptCams(true, true, time, true, false, 0);
    }

    attachToEntity(name: string, entity: PlayerMp | VehicleMp) {
        let camera = this.list.find((element) => element.name === name);
        if (camera) {
            if (!mp.cameras.exists(camera.cam)) return false;
            camera.cam.attachTo(entity.handle, 0, 0, 2.0, false);
            mp.game.cam.renderScriptCams(true, false, 0, true, false);
        }
    }

    setCameraEntity(name: string, entity: PlayerMp | VehicleMp) {
        if (entity === undefined) return false;

        let camera = this.list.find((element) => element.name === name);
        if (camera) {
            if (mp.cameras.exists(camera.cam)) camera.cam.pointAt(entity.handle, 0.0, 0.0, 0.0, true);
        }
    }

    setCameraLookAtBone(name: string, entity: PlayerMp | VehicleMp, bone: number) {
        if (entity === undefined) return false;

        let camera = this.list.find((element) => element.name === name);
        if (camera) {
            if (!mp.cameras.exists(camera.cam)) return false;
            camera.cam.pointAtPedBone(entity.handle, bone, 0.0, 0.0, 0.0, true);
            // camera.cam.setActiveWithInterp( camera.cam.handle, 3000, 0, 0 );
        }
    }

    attachCamToPedBone(name: string, ped: PlayerMp, bone: number) {
        let camera = this.list.find((element) => element.name === name);
        if (camera) {
            if (!mp.cameras.exists(camera.cam)) return false;
            camera.cam.attachToPedBone(ped.handle, bone, 0.0, 0.0, 0.0, false);
        }
    }

    setCameraPosition(name: string, position: Vector3) {
        let camera = this.list.find((element) => element.name === name);
        if (camera) if (mp.cameras.exists(camera.cam)) camera.cam.setCoord(position.x, position.y, position.z);
    }

    getCameraPosition(name: string) {
        let camera = this.list.find((element) => element.name === name);
        if (camera) if (mp.cameras.exists(camera.cam)) return camera.cam.getCoord();
    }

    getCameraFarClip(name: string) {
        let camera = this.list.find((element) => element.name === name);
        if (camera) if (mp.cameras.exists(camera.cam)) return camera.cam.getFarClip();
    }
    getCameraFov(name: string) {
        let camera = this.list.find((element) => element.name === name);
        if (camera) if (mp.cameras.exists(camera.cam)) return camera.cam.getFov();
    }
    getCameraRotation(name: string) {
        let camera = this.list.find((element) => element.name === name);
        if (camera) if (mp.cameras.exists(camera.cam)) return camera.cam.getRot(0);
    }
    startInterpolate(name: string, position: Vector3, toPosition: Vector3, rotation: Vector3, fov: number, duration: number, unk: number) {
        let camera = this.list.find((element) => element.name === name);
        if (camera) {
            if (!mp.cameras.exists(camera.cam)) return false;
            let currentFov = camera.cam.getFov();

            camera.cam.setParams(position.x, position.y, position.z, rotation.x, rotation.y, rotation.z, currentFov, duration, unk, 1, 2);
            camera.cam.setParams(toPosition.x, toPosition.y, toPosition.z, rotation.x, rotation.y, rotation.z, fov, duration, unk, 1, 2);
        }
    }

    setRotationActive(toggle: boolean) {
        this.enableRotation = toggle;
        if (!toggle && headingInterval) {
            clearInterval(headingInterval);
            headingInterval = null;
        }
    }

    rotateEntity(_x: number = 0) {
        let handleEntity: PlayerMp | VehicleMp = this.entityToRotate;
        if (!handleEntity) handleEntity = mp.players.local;
        //@ts-ignore
        const resolution = mp.game.graphics.getScreenActiveResolution();
        let width = resolution.y;
        const cursor = mp.gui.cursor.position;
        _x = cursor[0];
        let oldHeading = handleEntity.getHeading() || 0;
        if (oldHeading == null) return mp.console.logWarning("error oldheading");
        let delCount = handleEntity.type === "player" ? 4 : 2;

        if (_x < width / delCount + width / 2) {
            const newHeading = (oldHeading -= 2);
            handleEntity.setHeading(newHeading);
        }

        if (_x > width / delCount + width / 2) {
            const newHeading = (oldHeading += 2);
            handleEntity.setHeading(newHeading);
        }
    }

    setCameraLookAt(name: string, position: Vector3) {
        let camera = this.list.find((element) => element.name === name);
        if (camera && mp.cameras.exists(camera.cam)) {
            camera.cam.pointAtCoord(position.x, position.y, position.z);
        }
    }

    setCameraFov(name: string, fov: number) {
        let camera = this.list.find((element) => element.name === name);
        if (camera && mp.cameras.exists(camera.cam)) {
            camera.cam.setFov(fov);
        }
    }

    setCameraRot(name: string, rot: Vector3) {
        let camera = this.list.find((element) => element.name === name);
        if (camera && mp.cameras.exists(camera.cam)) {
            camera.cam.setRot(rot.x, rot.y, rot.z, 2);
        }
    }

    setCameraInterpolate(name: string, position: Vector3, _endPosition: Vector3, pointAt: Vector3, duration: number) {
        let camera = this.list.find((element) => element.name === name);
        if (camera) {
            let tempCamera = mp.cameras.new("InterpolateCamera", position, new mp.Vector3(0, 0, 0), camera.cam.getFov());
            // tempCamera.setCoord( endPosition.x, endPosition.y, endPosition.z );
            tempCamera.pointAtCoord(pointAt.x, pointAt.y, pointAt.z);
            tempCamera.setActiveWithInterp(camera.cam.handle, duration, 0, 0);
            mp.game.cam.renderScriptCams(true, false, 0, false, false);
            camera.cam = tempCamera;
        }
    }

    destroyCamera(name: string) {
        let camera = this.list.find((element) => element.name === name);
        if (camera) {
            if (!mp.cameras.exists(camera.cam)) return false;
            camera.cam.setActive(false);
            camera.cam.destroy();
            mp.game.cam.renderScriptCams(false, false, 0, false, false, 0);
        }
    }

    createLoginCamera(fromPos: Vector3, toPos: Vector3, rot: number) {
        mp.players.local.position = new mp.Vector3(toPos.x, toPos.y, toPos.z - 3);
        Camera.createCamera("login_camera", fromPos);
        Camera.setCameraActive("login_camera", true);
        Camera.startInterpolate("login_camera", fromPos, toPos, new mp.Vector3(0, 0, 0), 30, 20000, 0);
        Camera.setCameraLookAt("login_camera", toPos);

        mp.game.invoke("0x428CA6DBD1094446", mp.players.local.handle, true);
    }

    async switchinOut(handle: Handle, moveTo: string, switchType: any) {
        if (moveTo === "up") {
            mp.game.audio.playSoundFrontend(-1, "Short_Transition_Out", "PLAYER_SWITCH_CUSTOM_SOUNDSET", false);
            mp.players.local.freezePosition(true);
            setTimeout(() => {
                mp.players.local.freezePosition(true);
            }, 1000);
            // mp.game.streaming.startPlayerSwitch( handle, handle, 0, 1 );
            mp.game.streaming.switchOutPlayer(handle, 0, parseInt(switchType));
            mp.game.audio.playSoundFrontend(-1, "Short_Transition_Out", "PLAYER_SWITCH_CUSTOM_SOUNDSET", false);
        } else if (moveTo === "down") {
            mp.game.streaming.switchInPlayer(handle);
        }
    }

    stopSwitch() {
        mp.game.streaming.stopPlayerSwitch();
    }

    getOffset(pos: Vector3, angle: number, dist: number) {
        angle = angle * 0.0174533;
        pos.y = pos.y + dist * Math.sin(angle);
        pos.x = pos.x + dist * Math.cos(angle);
        return pos;
    }
}

mp.events.add("client::camera:setEntity", (data: any) => {
    let [type, id] = JSON.parse(data);
    type === "player" ? (Camera.entityToRotate = mp.players.local) : (Camera.entityToRotate = mp.vehicles.at(id));
});

mp.events.add("click", (x, _y, upOrDown, leftOrRight, _relativeX, _relativeY, _worldPosition, _hitEntity) => {
    if (!Camera.enableRotation) return;
    if (upOrDown === "up" && leftOrRight === "right") {
        if (headingInterval) clearInterval(headingInterval);
        headingInterval = null;
    }
    if (upOrDown === "down" && leftOrRight === "right") {
        if (!headingInterval) {
            headingInterval = setInterval(() => Camera.rotateEntity(x), 0);
        }
    }
});

const Camera = new CameraManager();
export default Camera;
