let headingInterval: NodeJS.Timeout | null = null;

/**
 * Represents a camera with a name and a camera handle.
 */
class ICamera {
    name: string;
    cam: CameraMp;

    /**
     * Creates an instance of ICamera.
     * @param {string} name - The name of the camera.
     * @param {CameraMp} cam - The camera handle.
     */
    constructor(name: string, cam: CameraMp) {
        this.name = name;
        this.cam = cam;
    }
}

/**
 * Manages a list of cameras and their operations.
 */
class CameraManager {
    list: ICamera[] = [];
    enableRotation: boolean = false;
    entityToRotate: PlayerMp | VehicleMp = mp.players.local;

    /**
     * Creates a new camera and adds it to the list.
     * @param {string} name - The name of the camera.
     * @param {Vector3} position - The position of the camera.
     */
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

    /**
     * Checks if a camera with the given name is active.
     * @param {string} name - The name of the camera.
     * @returns {boolean} - True if the camera is active, false otherwise.
     */
    public isActive(name: string): boolean {
        return this.list.some((element) => element.name === name);
    }

    /**
     * Sets a camera active or inactive.
     * @param {string} name - The name of the camera.
     * @param {boolean} toggle - Whether to activate or deactivate the camera.
     * @param {number} [time=0] - The transition time.
     */
    setCameraActive(name: string, toggle: boolean, time: number = 0) {
        const camera = this.list.find((element) => element.name === name);
        if (camera && mp.cameras.exists(camera.cam)) {
            camera.cam.setActive(toggle);
            mp.game.cam.renderScriptCams(true, true, time, true, false, 0);
        }
    }

    /**
     * Renders the script cameras.
     * @param {number} time - The transition time.
     */
    renderCamera(time: number) {
        mp.game.cam.renderScriptCams(true, true, time, true, false, 0);
    }

    /**
     * Attaches a camera to an entity.
     * @param {string} name - The name of the camera.
     * @param {PlayerMp | VehicleMp} entity - The entity to attach to.
     */
    attachToEntity(name: string, entity: PlayerMp | VehicleMp) {
        const camera = this.list.find((element) => element.name === name);
        if (camera && mp.cameras.exists(camera.cam)) {
            camera.cam.attachTo(entity.handle, 0, 0, 2.0, false);
            mp.game.cam.renderScriptCams(true, false, 0, true, false);
        }
    }

    /**
     * Sets the camera to point at an entity.
     * @param {string} name - The name of the camera.
     * @param {PlayerMp | VehicleMp} entity - The entity to point at.
     */
    setCameraEntity(name: string, entity: PlayerMp | VehicleMp) {
        const camera = this.list.find((element) => element.name === name);
        if (camera && entity && mp.cameras.exists(camera.cam)) {
            camera.cam.pointAt(entity.handle, 0.0, 0.0, 0.0, true);
        }
    }

    /**
     * Sets the camera to look at a specific bone of an entity.
     * @param {string} name - The name of the camera.
     * @param {PlayerMp | VehicleMp} entity - The entity to look at.
     * @param {number} bone - The bone to point at.
     */
    setCameraLookAtBone(name: string, entity: PlayerMp | VehicleMp, bone: number) {
        const camera = this.list.find((element) => element.name === name);
        if (camera && entity && mp.cameras.exists(camera.cam)) {
            camera.cam.pointAtPedBone(entity.handle, bone, 0.0, 0.0, 0.0, true);
        }
    }

    /**
     * Attaches a camera to a ped bone.
     * @param {string} name - The name of the camera.
     * @param {PlayerMp} ped - The ped to attach to.
     * @param {number} bone - The bone to attach to.
     */
    attachCamToPedBone(name: string, ped: PlayerMp, bone: number) {
        const camera = this.list.find((element) => element.name === name);
        if (camera && mp.cameras.exists(camera.cam)) {
            camera.cam.attachToPedBone(ped.handle, bone, 0.0, 0.0, 0.0, false);
        }
    }

    /**
     * Sets the position of a camera.
     * @param {string} name - The name of the camera.
     * @param {Vector3} position - The new position of the camera.
     */
    setCameraPosition(name: string, position: Vector3) {
        const camera = this.list.find((element) => element.name === name);
        if (camera && mp.cameras.exists(camera.cam)) {
            camera.cam.setCoord(position.x, position.y, position.z);
        }
    }

    /**
     * Gets the position of a camera.
     * @param {string} name - The name of the camera.
     * @returns {Vector3 | undefined} - The position of the camera or undefined if not found.
     */
    getCameraPosition(name: string): Vector3 | undefined {
        const camera = this.list.find((element) => element.name === name);
        return camera && mp.cameras.exists(camera.cam) ? camera.cam.getCoord() : undefined;
    }

    /**
     * Gets the far clip distance of a camera.
     * @param {string} name - The name of the camera.
     * @returns {number | undefined} - The far clip distance or undefined if not found.
     */
    getCameraFarClip(name: string): number | undefined {
        const camera = this.list.find((element) => element.name === name);
        return camera && mp.cameras.exists(camera.cam) ? camera.cam.getFarClip() : undefined;
    }

    /**
     * Gets the field of view of a camera.
     * @param {string} name - The name of the camera.
     * @returns {number | undefined} - The field of view or undefined if not found.
     */
    getCameraFov(name: string): number | undefined {
        const camera = this.list.find((element) => element.name === name);
        return camera && mp.cameras.exists(camera.cam) ? camera.cam.getFov() : undefined;
    }

    /**
     * Gets the rotation of a camera.
     * @param {string} name - The name of the camera.
     * @returns {Vector3 | undefined} - The rotation or undefined if not found.
     */
    getCameraRotation(name: string): Vector3 | undefined {
        const camera = this.list.find((element) => element.name === name);
        return camera && mp.cameras.exists(camera.cam) ? camera.cam.getRot(0) : undefined;
    }

    /**
     * Starts interpolating a camera.
     * @param {string} name - The name of the camera.
     * @param {Vector3} position - The starting position.
     * @param {Vector3} toPosition - The ending position.
     * @param {Vector3} rotation - The rotation during interpolation.
     * @param {number} fov - The field of view.
     * @param {number} duration - The duration of interpolation.
     * @param {number} unk - Unknown parameter.
     */
    startInterpolate(name: string, position: Vector3, toPosition: Vector3, rotation: Vector3, fov: number, duration: number, unk: number) {
        const camera = this.list.find((element) => element.name === name);
        if (camera && mp.cameras.exists(camera.cam)) {
            const currentFov = camera.cam.getFov();
            camera.cam.setParams(position.x, position.y, position.z, rotation.x, rotation.y, rotation.z, currentFov, duration, unk, 1, 2);
            camera.cam.setParams(toPosition.x, toPosition.y, toPosition.z, rotation.x, rotation.y, rotation.z, fov, duration, unk, 1, 2);
        }
    }

    /**
     * Enables or disables rotation.
     * @param {boolean} toggle - Whether to enable or disable rotation.
     */
    setRotationActive(toggle: boolean) {
        this.enableRotation = toggle;
        if (!toggle && headingInterval) {
            clearInterval(headingInterval);
            headingInterval = null;
        }
    }

    /**
     * Rotates an entity based on cursor position.
     * @param {number} [_x=0] - The x-coordinate of the cursor.
     */
    rotateEntity(_x: number = 0) {
        let handleEntity: PlayerMp | VehicleMp = this.entityToRotate || mp.players.local;
        //@ts-ignore
        const resolution = mp.game.graphics.getScreenActiveResolution();
        const width = resolution.y;
        const cursor = mp.gui.cursor.position;
        _x = cursor[0];
        let oldHeading = handleEntity.getHeading() || 0;
        if (oldHeading == null) return mp.console.logWarning("error oldheading");
        const delCount = handleEntity.type === "player" ? 4 : 2;

        if (_x < width / delCount + width / 2) {
            handleEntity.setHeading((oldHeading -= 2));
        } else if (_x > width / delCount + width / 2) {
            handleEntity.setHeading((oldHeading += 2));
        }
    }

    /**
     * Sets the camera to look at a specific position.
     * @param {string} name - The name of the camera.
     * @param {Vector3} position - The position to look at.
     */
    setCameraLookAt(name: string, position: Vector3) {
        const camera = this.list.find((element) => element.name === name);
        if (camera && mp.cameras.exists(camera.cam)) {
            camera.cam.pointAtCoord(position.x, position.y, position.z);
        }
    }

    /**
     * Sets the field of view of a camera.
     * @param {string} name - The name of the camera.
     * @param {number} fov - The new field of view.
     */
    setCameraFov(name: string, fov: number) {
        const camera = this.list.find((element) => element.name === name);
        if (camera && mp.cameras.exists(camera.cam)) {
            camera.cam.setFov(fov);
        }
    }

    /**
     * Sets the rotation of a camera.
     * @param {string} name - The name of the camera.
     * @param {Vector3} rot - The new rotation.
     */
    setCameraRot(name: string, rot: Vector3) {
        const camera = this.list.find((element) => element.name === name);
        if (camera && mp.cameras.exists(camera.cam)) {
            camera.cam.setRot(rot.x, rot.y, rot.z, 2);
        }
    }

    /**
     * Sets camera interpolation.
     * @param {string} name - The name of the camera.
     * @param {Vector3} position - The starting position.
     * @param {Vector3} _endPosition - The ending position.
     * @param {Vector3} pointAt - The point to look at.
     * @param {number} duration - The duration of interpolation.
     */
    setCameraInterpolate(name: string, position: Vector3, _endPosition: Vector3, pointAt: Vector3, duration: number) {
        const camera = this.list.find((element) => element.name === name);
        if (camera) {
            const tempCamera = mp.cameras.new("InterpolateCamera", position, new mp.Vector3(0, 0, 0), camera.cam.getFov());
            tempCamera.pointAtCoord(pointAt.x, pointAt.y, pointAt.z);
            tempCamera.setActiveWithInterp(camera.cam.handle, duration, 0, 0);
            mp.game.cam.renderScriptCams(true, false, 0, false, false);
            camera.cam = tempCamera;
        }
    }

    /**
     * Destroys a camera by name.
     * @param {string} name - The name of the camera.
     */
    destroyCamera(name: string) {
        const camera = this.list.find((element) => element.name === name);
        if (camera && mp.cameras.exists(camera.cam)) {
            camera.cam.setActive(false);
            camera.cam.destroy();
            mp.game.cam.renderScriptCams(false, false, 0, false, false, 0);
        }
    }

    /**
     * Creates a login camera with a transition.
     * @param {Vector3} fromPos - The starting position.
     * @param {Vector3} toPos - The ending position.
     * @param {number} rot - The rotation during transition.
     */
    createLoginCamera(fromPos: Vector3, toPos: Vector3, rot: number) {
        mp.players.local.position = new mp.Vector3(toPos.x, toPos.y, toPos.z - 3);
        this.createCamera("login_camera", fromPos);
        this.setCameraActive("login_camera", true);
        this.startInterpolate("login_camera", fromPos, toPos, new mp.Vector3(0, 0, 0), 30, 20000, 0);
        this.setCameraLookAt("login_camera", toPos);
        mp.game.invoke("0x428CA6DBD1094446", mp.players.local.handle, true);
    }

    /**
     * Switches in or out a player.
     * @param {Handle} handle - The player handle.
     * @param {string} moveTo - The direction to switch ("up" or "down").
     * @param {any} switchType - The switch type.
     */
    async switchinOut(handle: Handle, moveTo: string, switchType: any) {
        if (moveTo === "up") {
            mp.game.audio.playSoundFrontend(-1, "Short_Transition_Out", "PLAYER_SWITCH_CUSTOM_SOUNDSET", false);
            mp.players.local.freezePosition(true);
            setTimeout(() => {
                mp.players.local.freezePosition(true);
            }, 1000);
            mp.game.streaming.switchOutPlayer(handle, 0, parseInt(switchType));
            mp.game.audio.playSoundFrontend(-1, "Short_Transition_Out", "PLAYER_SWITCH_CUSTOM_SOUNDSET", false);
        } else if (moveTo === "down") {
            mp.game.streaming.switchInPlayer(handle);
        }
    }

    /**
     * Stops the player switch.
     */
    stopSwitch() {
        mp.game.streaming.stopPlayerSwitch();
    }

    /**
     * Gets the offset position based on angle and distance.
     * @param {Vector3} pos - The starting position.
     * @param {number} angle - The angle in degrees.
     * @param {number} dist - The distance.
     * @returns {Vector3} - The offset position.
     */
    getOffset(pos: Vector3, angle: number, dist: number): Vector3 {
        angle = angle * 0.0174533;
        pos.y = pos.y + dist * Math.sin(angle);
        pos.x = pos.x + dist * Math.cos(angle);
        return pos;
    }
}
/**
 * This two events need to be moved out of here
 */
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

export const Camera = new CameraManager();
