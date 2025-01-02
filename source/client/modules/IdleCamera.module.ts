/**
 * Current active camera in use.
 */
let currentCamera: CameraMp | null = null;

/**
 * The next camera to transition to.
 */
let nextCamera: CameraMp | null = null;

/**
 * Vehicle that the cameras will focus on.
 */
let activeVehicle: VehicleMp | null = null;

/**
 * Indicates whether the camera system is inactive.
 */
let inactive = false;

/**
 * List of predefined camera configurations.
 */
const cameraList = [
    { distance: 4.0, fovFrom: 20.0, fovTo: 35.0, from: "front-middle", to: "front-left" },
    { distance: 5.0, fovFrom: 30.0, fovTo: 40.0, from: "front-left", to: "left" },
    { distance: 6.0, fovFrom: 40.0, fovTo: 35.0, from: "back-middle", to: "back-right" },
    { distance: 5.0, fovFrom: 30.0, fovTo: 30.0, from: "back-right", to: "right" },
    { distance: 5.0, fovFrom: 35.0, fovTo: 40.0, from: "right", to: "front-right" },
    { distance: 8.0, fovFrom: 50.0, fovTo: 50.0, from: "top-middle", to: "front-middle" },
];

/**
 * Starts a camera transition between two positions.
 *
 * @param fromPos - Starting position of the camera.
 * @param toPos - Ending position of the camera.
 * @param fovFrom - Initial field of view (FOV).
 * @param fovTo - Final field of view (FOV).
 * @param duration - Duration of the transition in milliseconds.
 */
function startCameraTransition(
    fromPos: Vector3,
    toPos: Vector3,
    fovFrom: number,
    fovTo: number,
    duration: number
) {
    if (currentCamera) currentCamera.destroy();
    if (nextCamera) nextCamera.destroy();

    currentCamera = mp.cameras.new("default", fromPos, new mp.Vector3(0, 0, 0), fovFrom);
    nextCamera = mp.cameras.new("default", toPos, new mp.Vector3(0, 0, 0), fovTo);

    currentCamera.setFov(fovFrom);
    nextCamera.setFov(fovTo);
    currentCamera.setActive(true);
    mp.game.cam.renderScriptCams(true, false, 0, true, false, 0);

    nextCamera.setActiveWithInterp(currentCamera.handle, duration, 100, 100);

    mp.events.add("render", pointCamerasAtVehicle);
}

/**
 * Points the active cameras at the active vehicle.
 */
function pointCamerasAtVehicle() {
    if (currentCamera && activeVehicle) {
        currentCamera.pointAt(activeVehicle.handle, 0, 0, 0, false);
    }
    if (nextCamera && activeVehicle) {
        nextCamera.pointAt(activeVehicle.handle, 0, 0, 0, false);
    }
}

/**
 * Calculates a position relative to a vehicle based on direction and distance.
 *
 * @param vehicle - The target vehicle.
 * @param position - The relative position (e.g., "front-left").
 * @param distance - The distance from the vehicle.
 * @returns The calculated relative position.
 */
function getRelativePosition(vehicle: VehicleMp, position: string, distance: number): Vector3 {
    const coords = vehicle.position;
    const forward = vehicle.getForwardVector();
    const up = new mp.Vector3(0, 0, 1);
    const right = new mp.Vector3(-forward.y, forward.x, 0);

    const multiplyVector = (vec: Vector3, scalar: number): Vector3 =>
        new mp.Vector3(vec.x * scalar, vec.y * scalar, vec.z * scalar);

    const addVectors = (vec1: Vector3, vec2: Vector3): Vector3 =>
        new mp.Vector3(vec1.x + vec2.x, vec1.y + vec2.y, vec1.z + vec2.z);

    const subtractVectors = (vec1: Vector3, vec2: Vector3): Vector3 =>
        new mp.Vector3(vec1.x - vec2.x, vec1.y - vec2.y, vec1.z - vec2.z);

    const offsets: Record<string, Vector3> = {
        "front-middle": addVectors(coords, multiplyVector(forward, distance)),
        "front-left": addVectors(
            coords,
            subtractVectors(multiplyVector(forward, distance), multiplyVector(right, distance * 0.5))
        ),
        "front-right": addVectors(
            coords,
            addVectors(multiplyVector(forward, distance), multiplyVector(right, distance * 0.5))
        ),
        "back-middle": addVectors(coords, multiplyVector(forward, -distance)),
        "back-left": addVectors(
            coords,
            subtractVectors(multiplyVector(forward, -distance), multiplyVector(right, distance * 0.5))
        ),
        "back-right": addVectors(
            coords,
            addVectors(multiplyVector(forward, -distance), multiplyVector(right, distance * 0.5))
        ),
        "left": addVectors(coords, multiplyVector(right, -distance)),
        "right": addVectors(coords, multiplyVector(right, distance)),
        "top-middle": addVectors(coords, multiplyVector(up, distance)),
    };

    return offsets[position] || coords;
}

/**
 * Stops and cleans up the current camera transition.
 */
function stopCamera() {
    if (currentCamera) {
        currentCamera.destroy();
        currentCamera = null;
    }
    if (nextCamera) {
        nextCamera.destroy();
        nextCamera = null;
    }

    mp.events.remove("render", pointCamerasAtVehicle);

    mp.game.cam.renderScriptCams(false, true, 1500, true, false, 0);
}

/**
 * Starts an idle camera mode, cycling through camera configurations around a vehicle.
 *
 * @param vehicle - The target vehicle.
 * @param randomPositions - Whether to randomize camera positions.
 * @param duration - Duration of each camera transition in milliseconds.
 */
function startIdleCamera(vehicle: VehicleMp, randomPositions: boolean, duration: number) {
    if (cameraList.length < 2) {
        mp.console.logError("At least two camera configurations are required.");
        return;
    }

    activeVehicle = vehicle;

    let cameraIndex = randomPositions
        ? Math.floor(Math.random() * cameraList.length)
        : 0;

    const loopCameras = () => {
        if (!inactive) {
            stopCamera();
            return;
        }

        const camConfig = cameraList[cameraIndex];
        const fromPos = getRelativePosition(vehicle, camConfig.from, camConfig.distance);
        const toPos = getRelativePosition(vehicle, camConfig.to, camConfig.distance);

        startCameraTransition(fromPos, toPos, camConfig.fovFrom, camConfig.fovTo, duration);

        setTimeout(() => {
            cameraIndex = (cameraIndex + 1) % cameraList.length;
            if (randomPositions) {
                cameraIndex = Math.floor(Math.random() * cameraList.length);
            }
            loopCameras();
        }, duration);
    };

    loopCameras();
}
