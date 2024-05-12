import { CefEvent } from "../classes/CEFEvent.class";

mp.Player.prototype.outputChatBox = function (message: string) {};

mp.Player.prototype.showNotify = function (type: "loading" | "promise" | "success" | "info" | "error" | "warning" | "warn" | "dark", message: string, skin: "light" | "dark" | "colored" = "dark") {
    return CefEvent.emit(this, "notify", "show", { type, message, skin });
};
mp.Player.prototype.taskAchieveHeading = function (heading: number, timeout: number) {
    this.call("client::task:taskAchieveHeading", [heading, timeout]);
};

mp.Player.prototype.taskAimGunAt = function (targetid: number, duration: number, p3: boolean) {
    this.call("client::task:taskAimGunAt", [targetid, duration, p3]);
};

mp.Player.prototype.taskAimGunAtCoord = function (x: number, y: number, z: number, time: number, p5: boolean, p6: boolean) {
    this.call("client::task:taskAimGunAtCoord", [x, y, z, time, p5, p6]);
};

mp.Player.prototype.taskAimGunScripted = function (scriptTask: number, p2: boolean, p3: boolean) {
    this.call("client::task:taskAimGunScripted", [scriptTask, p2, p3]);
};

mp.Player.prototype.taskArrest = function (target: number) {
    this.call("client::task:taskArrest", [target]);
};

mp.Player.prototype.taskBoatMission = function (boat: number, p2: any, p3: any, x: number, y: number, z: number, p7: any, maxSpeed: number, p9: any, p10: number, p11: any) {
    this.call("client::task:taskBoatMission", [boat, p2, p3, x, y, z, p7, maxSpeed, p9, p10, p11]);
};

mp.Player.prototype.taskChatTo = function (target: number, p2: any, p3: number, p4: number, p5: number, p6: number, p7: number) {
    this.call("client::task:taskChatTo", [target, p2, p3, p4, p5, p6, p7]);
};

mp.Player.prototype.taskClearLookAt = function () {
    this.call("client::task:taskClearLookAt", []);
};

mp.Player.prototype.taskClimb = function (unused: boolean) {
    this.call("client::task:taskClimb", [unused]);
};

mp.Player.prototype.taskClimbLadder = function (p1: number) {
    this.call("client::task:taskClimbLadder", [p1]);
};

mp.Player.prototype.taskCombat = function (targetPlayer: number, p2: number, p3: number) {
    this.call("client::task:taskCombat", [targetPlayer, p2, p3]);
};

mp.Player.prototype.taskCombatHatedTargetsAround = function (radius: number, p2: number) {
    this.call("client::task:taskCombatHatedTargetsAround", [radius, p2]);
};

mp.Player.prototype.taskCombatHatedTargetsInArea = function (x: number, y: number, z: number, radius: number, p5: any) {
    this.call("client::task:taskCombatHatedTargetsInArea", [x, y, z, radius, p5]);
};

mp.Player.prototype.taskCower = function (duration: number) {
    this.call("client::task:taskCower", [duration]);
};

mp.Player.prototype.taskDriveBy = function (targetPlayer: number, p2: any, targetX: number, targetY: number, targetZ: number, p6: number, p7: any, p8: boolean, firingPattern: number) {
    this.call("client::task:taskDriveBy", [targetPlayer, p2, targetX, targetY, targetZ, p6, p7, p8, firingPattern]);
};

mp.Player.prototype.taskEnterVehicle = function (vehicle: number, timeout: number, seat: number, speed: number, p5: number, p6: any) {
    this.call("client::task:taskEnterVehicle", [vehicle, timeout, seat, speed, p5, p6]);
};

mp.Player.prototype.taskFollowNavMeshToCoord = function (x: number, y: number, z: number, speed: number, timeout: number, stoppingRange: number, persistFollowing: boolean, unk: number) {
    this.call("client::task:taskFollowNavMeshToCoord", [x, y, z, speed, timeout, stoppingRange, persistFollowing, unk]);
};

mp.Player.prototype.taskFollowNavMeshToCoordAdvanced = function (
    x: number,
    y: number,
    z: number,
    speed: number,
    timeout: number,
    unkFloat: number,
    unkInt: number,
    unkX: number,
    unkY: number,
    unkZ: number,
    unk2: number
) {
    this.call("client::task:taskFollowNavMeshToCoordAdvanced", [x, y, z, speed, timeout, unkFloat, unkInt, unkX, unkY, unkZ, unk2]);
};

mp.Player.prototype.taskFollowPointRoute = function (speed: number, unknown: number) {
    this.call("client::task:taskFollowPointRoute", [speed, unknown]);
};

mp.Player.prototype.taskFollowToOffsetOf = function (
    entity: number,
    offsetX: number,
    offsetY: number,
    offsetZ: number,
    movementSpeed: number,
    timeout: number,
    stoppingRange: number,
    persistFollowing: boolean
) {
    this.call("client::task:taskFollowToOffsetOf", [entity, offsetX, offsetY, offsetZ, movementSpeed, timeout, stoppingRange, persistFollowing]);
};

mp.Player.prototype.taskForceMotionState = function (state: number, p2: boolean) {
    this.call("client::task:taskForceMotionState", [state, p2]);
};

mp.Player.prototype.taskGetOffBoat = function (boat: number) {
    this.call("client::task:taskGetOffBoat", [boat]);
};

mp.Player.prototype.taskGoStraightToCoord = function (x: number, y: number, z: number, speed: number, timeout: number, targetHeading: number, distanceToSlide: number) {
    this.call("client::task:taskGoStraightToCoord", [x, y, z, speed, timeout, targetHeading, distanceToSlide]);
};

mp.Player.prototype.taskGotoAiming = function (target: number, distanceToStopAt: number, StartAimingDist: number) {
    this.call("client::task:taskGotoAiming", [target, distanceToStopAt, StartAimingDist]);
};

mp.Player.prototype.taskGoToCoordAndAimAtHatedEntitiesNearCoord = function (
    gotoX: number,
    gotoY: number,
    gotoZ: number,
    aimNearX: number,
    aimNearY: number,
    aimNearZ: number,
    speed: number,
    shoot: boolean,
    unknown1: number,
    unknown2: number,
    unkTrue: boolean,
    unknown3: number,
    heading: boolean,
    firingPattern: number
) {
    this.call("client::task:taskGoToCoordAndAimAtHatedEntitiesNearCoord", [
        gotoX,
        gotoY,
        gotoZ,
        aimNearX,
        aimNearY,
        aimNearZ,
        speed,
        shoot,
        unknown1,
        unknown2,
        unkTrue,
        unknown3,
        heading,
        firingPattern
    ]);
};

mp.Player.prototype.taskGoToCoordAnyMeans = function (x: number, y: number, z: number, speed: number, p5: any, p6: boolean, walkingStyle: number, p8: number) {
    this.call("client::task:taskGoToCoordAnyMeans", [x, y, z, speed, p5, p6, walkingStyle, p8]);
};

mp.Player.prototype.taskGoToCoordAnyMeansExtraParams = function (x: number, y: number, z: number, speed: number, p5: any, p6: boolean, walkingStyle: number, p8: number, p9: any, p10: any, p11: any) {
    this.call("client::task:taskGoToCoordAnyMeansExtraParams", [x, y, z, speed, p5, p6, walkingStyle, p8, p9, p10, p11]);
};

mp.Player.prototype.taskGoToCoordAnyMeansExtraParamsWithCruiseSpeed = function (
    x: number,
    y: number,
    z: number,
    speed: number,
    p5: any,
    p6: boolean,
    walkingStyle: number,
    p8: number,
    p9: any,
    p10: any,
    p11: any,
    p12: any
) {
    this.call("client::task:taskGoToCoordAnyMeansExtraParamsWithCruiseSpeed", [x, y, z, speed, p5, p6, walkingStyle, p8, p9, p10, p11, p12]);
};

mp.Player.prototype.taskGoToCoordWhileAimingAtCoord = function (
    x: number,
    y: number,
    z: number,
    aimAtX: number,
    aimAtY: number,
    aimAtZ: number,
    moveSpeed: number,
    p8: boolean,
    p9: number,
    p10: number,
    p11: boolean,
    flags: any,
    p13: boolean,
    firingPattern: number
) {
    this.call("client::task:taskGoToCoordWhileAimingAtCoord", [x, y, z, aimAtX, aimAtY, aimAtZ, moveSpeed, p8, p9, p10, p11, flags, p13, firingPattern]);
};

mp.Player.prototype.taskGuardCurrentPosition = function (p1: number, p2: number, p3: number) {
    this.call("client::task:taskGuardCurrentPosition", [p1, p2, p3]);
};

mp.Player.prototype.taskGuardSphereDefensiveArea = function (p1: number, p2: number, p3: number, p4: number, p5: number, p6: any, p7: number, p8: number, p9: number, p10: number) {
    this.call("client::task:taskGuardSphereDefensiveArea", [p1, p2, p3, p4, p5, p6, p7, p8, p9, p10]);
};

mp.Player.prototype.taskHandsUp = function (duration: number, facingPed: number, p3: number, p4: boolean) {
    this.call("client::task:taskHandsUp", [duration, facingPed, p3, p4]);
};

mp.Player.prototype.taskHeliChase = function (entityToFollow: number, x: number, y: number, z: number) {
    this.call("client::task:taskHeliChase", [entityToFollow, x, y, z]);
};

mp.Player.prototype.taskHeliMission = function (
    vehicle: number,
    p2: any,
    pedToFollow: number,
    posX: number,
    posY: number,
    posZ: number,
    mode: number,
    speed: number,
    radius: number,
    angle: number,
    p11: number,
    height: number,
    p13: number,
    p14: number
) {
    this.call("client::task:taskHeliMission", [vehicle, p2, pedToFollow, posX, posY, posZ, mode, speed, radius, angle, p11, height, p13, p14]);
};

mp.Player.prototype.taskJump = function (unused: boolean, flag1: boolean, flag2: boolean) {
    this.call("client::task:taskJump", [unused, flag1, flag2]);
};

mp.Player.prototype.taskLeaveAnyVehicle = function (p1: number, p2: number) {
    this.call("client::task:taskLeaveAnyVehicle", [p1, p2]);
};

mp.Player.prototype.taskLeaveVehicle = function (vehicle: number, flags: number) {
    this.call("client::task:taskLeaveVehicle", [vehicle, flags]);
};

mp.Player.prototype.taskLookAt = function (lookAt: number, duration: number, unknown1: number, unknown2: number) {
    this.call("client::task:taskLookAt", [lookAt, duration, unknown1, unknown2]);
};

mp.Player.prototype.taskMoveNetwork = function (task: string, multiplier: number, p3: boolean, animDict: string, flags: number) {
    this.call("client::task:taskMoveNetwork", [task, multiplier, p3, animDict, flags]);
};

mp.Player.prototype.taskMoveNetworkAdvanced = function (
    p1: string,
    p2: number,
    p3: number,
    p4: number,
    p5: number,
    p6: number,
    p7: number,
    p8: any,
    p9: number,
    p10: boolean,
    animDict: string,
    flags: number
) {
    this.call("client::task:taskMoveNetworkAdvanced", [p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, animDict, flags]);
};

mp.Player.prototype.taskOpenVehicleDoor = function (vehicle: number, timeOut: number, doorIndex: number, speed: number) {
    this.call("client::task:taskOpenVehicleDoor", [vehicle, timeOut, doorIndex, speed]);
};

mp.Player.prototype.taskParachute = function (p1: boolean) {
    this.call("client::task:taskParachute", [p1]);
};

mp.Player.prototype.taskParachuteToTarget = function (x: number, y: number, z: number) {
    this.call("client::task:taskParachuteToTarget", [x, y, z]);
};

mp.Player.prototype.taskPatrol = function (p1: string, p2: any, p3: boolean, p4: boolean) {
    this.call("client::task:taskPatrol", [p1, p2, p3, p4]);
};

mp.Player.prototype.taskPause = function (ms: number) {
    this.call("client::task:taskPause", [ms]);
};

mp.Player.prototype.taskPerformSequence = function (taskSequence: number) {
    this.call("client::task:taskPerformSequence", [taskSequence]);
};

mp.Player.prototype.taskPlaneChase = function (entityToFollow: number, x: number, y: number, z: number) {
    this.call("client::task:taskPlaneChase", [entityToFollow, x, y, z]);
};

mp.Player.prototype.taskPlaneLand = function (plane: number, runwayStartX: number, runwayStartY: number, runwayStartZ: number, runwayEndX: number, runwayEndY: number, runwayEndZ: number) {
    this.call("client::task:taskPlaneLand", [plane, runwayStartX, runwayStartY, runwayStartZ, runwayEndX, runwayEndY, runwayEndZ]);
};

mp.Player.prototype.taskPlaneMission = function (
    plane: number,
    targetVehicle: number,
    targetPlayer: number,
    destinationX: number,
    destinationY: number,
    destinationZ: number,
    p7: number,
    physicsSpeed: number,
    p9: number,
    p10: number,
    maxAltitude: number,
    minAltitude: number
) {
    this.call("client::task:taskPlaneMission", [plane, targetVehicle, targetPlayer, destinationX, destinationY, destinationZ, p7, physicsSpeed, p9, p10, maxAltitude, minAltitude]);
};

mp.Player.prototype.taskPlantBomb = function (x: number, y: number, z: number, heading: number) {
    this.call("client::task:taskPlantBomb", [x, y, z, heading]);
};

mp.Player.prototype.taskPlayAnim = function (
    animDictionary: string,
    animationName: string,
    speed: number,
    speedMultiplier: number,
    duration: number,
    flag: number,
    playbackRate: number,
    lockX: boolean,
    lockY: boolean,
    lockZ: boolean
) {
    this.call("client::task:taskPlayAnim", [animDictionary, animationName, speed, speedMultiplier, duration, flag, playbackRate, lockX, lockY, lockZ]);
};

mp.Player.prototype.taskPlayAnimAdvanced = function (
    animDict: string,
    animName: string,
    posX: number,
    posY: number,
    posZ: number,
    rotX: number,
    rotY: number,
    rotZ: number,
    speed: number,
    speedMultiplier: number,
    duration: number,
    flag: any,
    animTime: number,
    p14: any,
    p15: any
) {
    this.call("client::task:taskPlayAnimAdvanced", [animDict, animName, posX, posY, posZ, rotX, rotY, rotZ, speed, speedMultiplier, duration, flag, animTime, p14, p15]);
};

mp.Player.prototype.taskPlayPhoneGestureAnimation = function (p1: any, p2: any, p3: any, p4: number, p5: number, p6: boolean, p7: boolean) {
    this.call("client::task:taskPlayPhoneGestureAnimation", [p1, p2, p3, p4, p5, p6, p7]);
};

mp.Player.prototype.taskPutDirectlyIntoCover = function (x: number, y: number, z: number, timeout: any, p5: boolean, p6: number, p7: boolean, p8: boolean, p9: object, p10: boolean) {
    this.call("client::task:taskPutDirectlyIntoCover", [x, y, z, timeout, p5, p6, p7, p8, p9, p10]);
};

mp.Player.prototype.taskPutDirectlyIntoMelee = function (meleeTarget: number, p2: number, p3: number, p4: number, p5: boolean) {
    this.call("client::task:taskPutDirectlyIntoMelee", [meleeTarget, p2, p3, p4, p5]);
};

mp.Player.prototype.taskRappelFromHeli = function (p1: number) {
    this.call("client::task:taskRappelFromHeli", [p1]);
};

mp.Player.prototype.taskReactAndFlee = function (fleeTarget: number) {
    this.call("client::task:taskReactAndFlee", [fleeTarget]);
};

mp.Player.prototype.taskReloadWeapon = function (doReload: boolean) {
    this.call("client::task:taskReloadWeapon", [doReload]);
};

mp.Player.prototype.taskScriptedAnimation = function (lowData: number, midData: number, highData: number, blendIn: number, blendOut: number) {
    this.call("client::task:taskScriptedAnimation", [lowData, midData, highData, blendIn, blendOut]);
};

mp.Player.prototype.taskSeekCoverFrom = function (target: number, duration: number, p3: boolean) {
    this.call("client::task:taskSeekCoverFrom", [target, duration, p3]);
};

mp.Player.prototype.taskSeekCoverToCoords = function (x1: number, y1: number, z1: number, x2: number, y2: number, z2: number, p7: any, p8: boolean) {
    this.call("client::task:taskSeekCoverToCoords", [x1, y1, z1, x2, y2, z2, p7, p8]);
};

mp.Player.prototype.taskSetBlockingOfNonTemporaryEvents = function (toggle: boolean) {
    this.call("client::task:taskSetBlockingOfNonTemporaryEvents", [toggle]);
};

mp.Player.prototype.taskSetDecisionMaker = function (p1: number) {
    this.call("client::task:taskSetDecisionMaker", [p1]);
};

mp.Player.prototype.taskShockingEventReact = function (eventnumber: number) {
    this.call("client::task:taskShockingEventReact", [eventnumber]);
};

mp.Player.prototype.taskShootAtCoord = function (x: number, y: number, z: number, duration: number, firingPattern: number) {
    this.call("client::task:taskShootAtCoord", [x, y, z, duration, firingPattern]);
};

mp.Player.prototype.taskShuffleToNextVehicleSeat = function (vehicle: number) {
    this.call("client::task:taskShuffleToNextVehicleSeat", [vehicle]);
};

mp.Player.prototype.taskSkyDive = function () {
    this.call("client::task:taskSkyDive", []);
};

mp.Player.prototype.taskSlideToCoord = function (x: number, y: number, z: number, heading: number, speed: number) {
    this.call("client::task:taskSlideToCoord", [x, y, z, heading, speed]);
};

mp.Player.prototype.taskSlideToCoordHdgRate = function (x: number, y: number, z: number, heading: number, speed: number, headingChangeRate: number) {
    this.call("client::task:taskSlideToCoordHdgRate", [x, y, z, heading, speed, headingChangeRate]);
};

mp.Player.prototype.taskSmartFlee = function (fleeTarget: number, distance: number, fleeTime: any, preferPavements: boolean, updateToNearestHatedPed: boolean) {
    this.call("client::task:taskSmartFlee", [fleeTarget, distance, fleeTime, preferPavements, updateToNearestHatedPed]);
};

mp.Player.prototype.taskSmartFleeCoord = function (x: number, y: number, z: number, distance: number, time: number, preferPavements: boolean, quitIfOutOfRange: boolean) {
    this.call("client::task:taskSmartFleeCoord", [x, y, z, distance, time, preferPavements, quitIfOutOfRange]);
};

mp.Player.prototype.taskStandGuard = function (x: number, y: number, z: number, heading: number, scenarioName: string) {
    this.call("client::task:taskStandGuard", [x, y, z, heading, scenarioName]);
};

mp.Player.prototype.taskStandStill = function (time: number) {
    this.call("client::task:taskStandStill", [time]);
};

mp.Player.prototype.taskStartScenarioAtPosition = function (scenarioName: string, x: number, y: number, z: number, heading: number, duration: number, sittingScenario: boolean, teleport: boolean) {
    this.call("client::task:taskStartScenarioAtPosition", [scenarioName, x, y, z, heading, duration, sittingScenario, teleport]);
};

mp.Player.prototype.taskStartScenarioInPlace = function (scenarioName: string, unkDelay: number, playEnterAnim: boolean) {
    this.call("client::task:taskStartScenarioInPlace", [scenarioName, unkDelay, playEnterAnim]);
};

mp.Player.prototype.taskStayInCover = function () {
    this.call("client::task:taskStayInCover", []);
};

mp.Player.prototype.taskStealthKill = function (target: number, killType: number, p3: number, p4: boolean) {
    this.call("client::task:taskStealthKill", [target, killType, p3, p4]);
};

mp.Player.prototype.taskStopPhoneGestureAnimation = function () {
    this.call("client::task:taskStopPhoneGestureAnimation", []);
};

mp.Player.prototype.taskSwapWeapon = function (p1: boolean) {
    this.call("client::task:taskSwapWeapon", [p1]);
};

mp.Player.prototype.taskSweepAim = function (anim: string, p2: string, p3: string, p4: string, p5: number, vehicle: number, p7: number, p8: number) {
    this.call("client::task:taskSweepAim", [anim, p2, p3, p4, p5, vehicle, p7, p8]);
};

mp.Player.prototype.taskSynchronizedScene = function (
    scene: number,
    animDictionary: string,
    animationName: string,
    speed: number,
    speedMultiplier: number,
    duration: number,
    flag: number,
    playbackRate: number,
    p9: any
) {
    this.call("client::task:taskSynchronizedScene", [scene, animDictionary, animationName, speed, speedMultiplier, duration, flag, playbackRate, p9]);
};

mp.Player.prototype.taskTurnToFace = function (entity: number, duration: number) {
    this.call("client::task:taskTurnToFace", [entity, duration]);
};

mp.Player.prototype.taskTurnToFaceCoord = function (x: number, y: number, z: number, duration: number) {
    this.call("client::task:taskTurnToFaceCoord", [x, y, z, duration]);
};

mp.Player.prototype.taskUseMobilePhone = function (p1: number) {
    this.call("client::task:taskUseMobilePhone", [p1]);
};

mp.Player.prototype.taskUseMobilePhoneTimed = function (duration: number) {
    this.call("client::task:taskUseMobilePhoneTimed", [duration]);
};

mp.Player.prototype.taskUseNearestScenarioToCoordWarp = function (x: number, y: number, z: number, radius: number, p5: any) {
    this.call("client::task:taskUseNearestScenarioToCoordWarp", [x, y, z, radius, p5]);
};

mp.Player.prototype.taskVehicleAimAt = function (target: number) {
    this.call("client::task:taskVehicleAimAt", [target]);
};

mp.Player.prototype.taskVehicleChase = function (targetEnt: number) {
    this.call("client::task:taskVehicleChase", [targetEnt]);
};

mp.Player.prototype.taskVehicleDriveToCoord = function (
    vehicle: number,
    x: number,
    y: number,
    z: number,
    speed: number,
    p6: any,
    vehicleModel: number,
    drivingMode: number,
    stopRange: number,
    p10: number
) {
    this.call("client::task:taskVehicleDriveToCoord", [vehicle, x, y, z, speed, p6, vehicleModel, drivingMode, stopRange, p10]);
};

mp.Player.prototype.taskVehicleDriveToCoordLongrange = function (vehicle: number, x: number, y: number, z: number, speed: number, driveMode: number, stopRange: number) {
    this.call("client::task:taskVehicleDriveToCoordLongrange", [vehicle, x, y, z, speed, driveMode, stopRange]);
};

mp.Player.prototype.taskVehicleDriveWander = function (vehicle: number, speed: number, drivingStyle: number) {
    this.call("client::task:taskVehicleDriveWander", [vehicle, speed, drivingStyle]);
};

mp.Player.prototype.taskVehicleEscort = function (vehicle: number, targetVehicle: number, mode: number, speed: number, drivingStyle: number, minDistance: number, p7: number, noRoadsDistance: number) {
    this.call("client::task:taskVehicleEscort", [vehicle, targetVehicle, mode, speed, drivingStyle, minDistance, p7, noRoadsDistance]);
};

mp.Player.prototype.taskVehicleFollow = function (vehicle: number, targetEntity: number, drivingStyle: number, speed: number, minDistance: number) {
    this.call("client::task:taskVehicleFollow", [vehicle, targetEntity, drivingStyle, speed, minDistance]);
};

mp.Player.prototype.taskVehicleFollowWaypointRecording = function (vehicle: number, WPRecording: string, p3: number, p4: number, p5: number, p6: number, p7: number, p8: boolean, p9: number) {
    this.call("client::task:taskVehicleFollowWaypointRecording", [vehicle, WPRecording, p3, p4, p5, p6, p7, p8, p9]);
};

mp.Player.prototype.taskVehicleGotoNavmesh = function (vehicle: number, x: number, y: number, z: number, speed: number, behaviorFlag: number, stoppingRange: number) {
    this.call("client::task:taskVehicleGotoNavmesh", [vehicle, x, y, z, speed, behaviorFlag, stoppingRange]);
};

mp.Player.prototype.taskVehicleHeliProtect = function (vehicle: number, entityToFollow: number, targetSpeed: number, p4: number, radius: number, altitude: number, p7: number) {
    this.call("client::task:taskVehicleHeliProtect", [vehicle, entityToFollow, targetSpeed, p4, radius, altitude, p7]);
};

mp.Player.prototype.taskVehicleMissionCoorsTarget = function (vehicle: number, x: number, y: number, z: number, p5: number, p6: number, p7: number, p8: number, p9: number, p10: boolean) {
    this.call("client::task:taskVehicleMissionCoorsTarget", [vehicle, x, y, z, p5, p6, p7, p8, p9, p10]);
};

mp.Player.prototype.taskVehicleMissionTarget = function (vehicle: number, pedTarget: number, mode: number, maxSpeed: number, drivingStyle: number, minDistance: number, p7: number, p8: boolean) {
    this.call("client::task:taskVehicleMissionTarget", [vehicle, pedTarget, mode, maxSpeed, drivingStyle, minDistance, p7, p8]);
};

mp.Player.prototype.taskVehiclePark = function (vehicle: number, x: number, y: number, z: number, heading: number, mode: number, radius: number, keepEngineOn: boolean) {
    this.call("client::task:taskVehiclePark", [vehicle, x, y, z, heading, mode, radius, keepEngineOn]);
};

mp.Player.prototype.taskVehicleTempAction = function (vehicle: number, action: number, time: number) {
    this.call("client::task:taskVehicleTempAction", [vehicle, action, time]);
};

mp.Player.prototype.taskWanderInArea = function (x: number, y: number, z: number, radius: number, minimalLength: number, timeBetweenWalks: number) {
    this.call("client::task:taskWanderInArea", [x, y, z, radius, minimalLength, timeBetweenWalks]);
};

mp.Player.prototype.taskWanderStandard = function (p1: number, p2: number) {
    this.call("client::task:taskWanderStandard", [p1, p2]);
};

mp.Player.prototype.taskWarpIntoVehicle = function (vehicle: number, seat: number) {
    this.call("client::task:taskWarpIntoVehicle", [vehicle, seat]);
};

mp.Player.prototype.taskWrithe = function (target: number, time: number, p3: number) {
    this.call("client::task:taskWrithe", [target, time, p3]);
};

mp.Player.prototype.uncuff = function () {
    this.call("client::task:uncuff");
};

mp.Player.prototype.updateTaskAimGunScriptedTarget = function (p1: number, p2: number, p3: number, p4: number, p5: boolean) {
    this.call("client::task:updateTaskAimGunScriptedTarget", [p1, p2, p3, p4, p5]);
};

mp.Player.prototype.updateTaskHandsUpDuration = function (duration: number) {
    this.call("client::task:updateTaskHandsUpDuration", [duration]);
};
