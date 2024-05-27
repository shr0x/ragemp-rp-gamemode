function getPlayerByRemoteId(remoteId: number) {
    const player = mp.players.atRemoteId(remoteId);
    if (player && mp.players.exists(player)) {
        return player;
    }
    return null;
}

function getVehicleByRemoteId(remoteId: number) {
    const vehicle = mp.vehicles.atRemoteId(remoteId);
    if (vehicle && mp.vehicles.exists(vehicle)) {
        return vehicle;
    }
    return null;
}

mp.events.add("client::task:taskAchieveHeading", (heading: number, timeout: number) => {
    mp.players.local.taskAchieveHeading(heading, timeout);
});
//-----------------------------------------------------------//

mp.events.add("client::task:taskAimGunAt", (entity: number, duration: number, p3: boolean) => {
    const target = getPlayerByRemoteId(entity);
    if (!target) return;
    mp.players.local.taskAimGunAt(target.handle, duration, p3);
});
//-----------------------------------------------------------//

mp.events.add("client::task:taskAimGunAtCoord", (x: number, y: number, z: number, time: number, p5: boolean, p6: boolean) => {
    mp.players.local.taskAimGunAtCoord(x, y, z, time, p5, p6);
});
//-----------------------------------------------------------//
mp.events.add("client::task:taskAimGunScripted", (scriptTask: Hash, p2: boolean, p3: boolean) => {
    mp.players.local.taskAimGunScripted(scriptTask, p2, p3);
});
//-----------------------------------------------------------//
mp.events.add("client::task:taskArrest", (entity: number) => {
    const target = getPlayerByRemoteId(entity);
    if (!target) return;

    mp.players.local.taskArrest(target.handle);
});
//-----------------------------------------------------------//
mp.events.add("client::task:taskBoatMission", (boat: number, p2: any, p3: any, x: number, y: number, z: number, p7: any, maxSpeed: number, p9: any, p10: number, p11: any) => {
    const target = getVehicleByRemoteId(boat);
    if (!target) return;

    mp.players.local.taskBoatMission(target.handle, p2, p3, x, y, z, p7, maxSpeed, p9, p10, p11);
});
//-----------------------------------------------------------//
mp.events.add("client::task:taskChatTo", (targetid: number, p2: any, p3: number, p4: number, p5: number, p6: number, p7: number) => {
    const target = getPlayerByRemoteId(targetid);
    if (!target) return;
    mp.players.local.taskChatTo(target.handle, p2, p3, p4, p5, p6, p7);
});
//-----------------------------------------------------------//
mp.events.add("client::task:taskClearLookAt", () => {
    mp.players.local.taskClearLookAt();
});
//-----------------------------------------------------------//
mp.events.add("client::task:taskClimb", (unused: boolean) => {
    mp.players.local.taskClimb(unused);
});
//-----------------------------------------------------------//
mp.events.add("client::task:taskClimbLadder", (p1: number) => {
    mp.players.local.taskClimbLadder(p1);
});
//-----------------------------------------------------------//
mp.events.add("client::task:taskCombat", (targetPlayer: number, p2: number, p3: number) => {
    const target = getPlayerByRemoteId(targetPlayer);
    if (!target) return;
    mp.players.local.taskCombat(target.handle, p2, p3);
});
//-----------------------------------------------------------//
mp.events.add("client::task:taskCombatHatedTargetsAround", (radius: number, p2: number) => {
    mp.players.local.taskCombatHatedTargetsAround(radius, p2);
});
//-----------------------------------------------------------//
mp.events.add("client::task:taskCombatHatedTargetsInArea", (x: number, y: number, z: number, radius: number, p5: any) => {
    mp.players.local.taskCombatHatedTargetsInArea(x, y, z, radius, p5);
});
//-----------------------------------------------------------//
mp.events.add("client::task:taskCower", (duration: number) => {
    mp.players.local.taskCower(duration);
});
//-----------------------------------------------------------//
mp.events.add("client::task:taskDriveBy", (targetid: number, p2: any, targetX: number, targetY: number, targetZ: number, p6: number, p7: any, p8: boolean, firingPattern: Hash) => {
    const target = getPlayerByRemoteId(targetid);
    if (!target) return;
    mp.players.local.taskDriveBy(target.handle, p2, targetX, targetY, targetZ, p6, p7, p8, firingPattern);
});
//-----------------------------------------------------------//
mp.events.add("client::task:taskEnterVehicle", (vehicleid: number, timeout: number, seat: number, speed: number, p5: number, p6: any) => {
    const target = getVehicleByRemoteId(vehicleid);
    if (!target) return;
    mp.players.local.taskEnterVehicle(target.handle, timeout, seat, speed, p5, p6);
});
//-----------------------------------------------------------//
mp.events.add("client::task:taskFollowNavMeshToCoord", (x: number, y: number, z: number, speed: number, timeout: number, stoppingRange: number, persistFollowing: boolean, unk: number) => {
    mp.players.local.taskFollowNavMeshToCoord(x, y, z, speed, timeout, stoppingRange, persistFollowing, unk);
});
//-----------------------------------------------------------//
mp.events.add(
    "client::task:taskFollowNavMeshToCoordAdvanced",
    (x: number, y: number, z: number, speed: number, timeout: number, unkFloat: number, unkInt: number, unkX: number, unkY: number, unkZ: number, unk2: number) => {
        mp.players.local.taskFollowNavMeshToCoordAdvanced(x, y, z, speed, timeout, unkFloat, unkInt, unkX, unkY, unkZ, unk2);
    }
);
//-----------------------------------------------------------//
mp.events.add("client::task:taskFollowPointRoute", (speed: number, unknown: number) => {
    mp.players.local.taskFollowPointRoute(speed, unknown);
});
//-----------------------------------------------------------//
mp.events.add(
    "client::task:taskFollowToOffsetOf",
    (vehicleid: number, offsetX: number, offsetY: number, offsetZ: number, movementSpeed: number, timeout: number, stoppingRange: number, persistFollowing: boolean) => {
        const target = getVehicleByRemoteId(vehicleid);
        if (!target) return;
        mp.players.local.taskFollowToOffsetOf(target.handle, offsetX, offsetY, offsetZ, movementSpeed, timeout, stoppingRange, persistFollowing);
    }
);
//-----------------------------------------------------------//
mp.events.add("client::task:taskForceMotionState", (state: Hash, p2: boolean) => {
    mp.players.local.taskForceMotionState(state, p2);
});
//-----------------------------------------------------------//
mp.events.add("client::task:taskGetOffBoat", (boat: number) => {
    const target = getVehicleByRemoteId(boat);
    if (!target) return;
    mp.players.local.taskGetOffBoat(target.handle);
});
//-----------------------------------------------------------//
mp.events.add("client::task:taskGoStraightToCoord", (x: number, y: number, z: number, speed: number, timeout: number, targetHeading: number, distanceToSlide: number) => {
    mp.players.local.taskGoStraightToCoord(x, y, z, speed, timeout, targetHeading, distanceToSlide);
});
//-----------------------------------------------------------//
mp.events.add("client::task:taskGotoAiming", (targetid: number, distanceToStopAt: number, StartAimingDist: number) => {
    const target = getPlayerByRemoteId(targetid);
    if (!target) return;
    mp.players.local.taskGotoAiming(target.handle, distanceToStopAt, StartAimingDist);
});
//-----------------------------------------------------------//
mp.events.add(
    "client::task:taskGoToCoordAndAimAtHatedEntitiesNearCoord",
    (
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
        firingPattern: Hash
    ) => {
        mp.players.local.taskGoToCoordAndAimAtHatedEntitiesNearCoord(gotoX, gotoY, gotoZ, aimNearX, aimNearY, aimNearZ, speed, shoot, unknown1, unknown2, unkTrue, unknown3, heading, firingPattern);
    }
);
//-----------------------------------------------------------//
mp.events.add("client::task:taskGoToCoordAnyMeans", (x: number, y: number, z: number, speed: number, p5: any, p6: boolean, walkingStyle: number, p8: number) => {
    mp.players.local.taskGoToCoordAnyMeans(x, y, z, speed, p5, p6, walkingStyle, p8);
});
//-----------------------------------------------------------//
mp.events.add(
    "client::task:taskGoToCoordAnyMeansExtraParams",
    (x: number, y: number, z: number, speed: number, p5: any, p6: boolean, walkingStyle: number, p8: number, p9: any, p10: any, p11: any) => {
        mp.players.local.taskGoToCoordAnyMeansExtraParams(x, y, z, speed, p5, p6, walkingStyle, p8, p9, p10, p11);
    }
);
//-----------------------------------------------------------//
mp.events.add(
    "client::task:taskGoToCoordAnyMeansExtraParamsWithCruiseSpeed",
    (x: number, y: number, z: number, speed: number, p5: any, p6: boolean, walkingStyle: number, p8: number, p9: any, p10: any, p11: any, p12: any) => {
        mp.players.local.taskGoToCoordAnyMeansExtraParamsWithCruiseSpeed(x, y, z, speed, p5, p6, walkingStyle, p8, p9, p10, p11, p12);
    }
);
//-----------------------------------------------------------//
mp.events.add(
    "client::task:taskGoToCoordWhileAimingAtCoord",
    (
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
        firingPattern: Hash
    ) => {
        mp.players.local.taskGoToCoordWhileAimingAtCoord(x, y, z, aimAtX, aimAtY, aimAtZ, moveSpeed, p8, p9, p10, p11, flags, p13, firingPattern);
    }
);
//-----------------------------------------------------------//
mp.events.add("client::task:taskGuardCurrentPosition", (p1: number, p2: number, p3: number) => {
    mp.players.local.taskGuardCurrentPosition(p1, p2, p3);
});
//-----------------------------------------------------------//
mp.events.add("client::task:taskGuardSphereDefensiveArea", (p1: number, p2: number, p3: number, p4: number, p5: number, p6: any, p7: number, p8: number, p9: number, p10: number) => {
    mp.players.local.taskGuardSphereDefensiveArea(p1, p2, p3, p4, p5, p6, p7, p8, p9, p10);
});
//-----------------------------------------------------------//
mp.events.add("client::task:taskHandsUp", (duration: number, facingPed: number, p3: number, p4: boolean) => {
    const targetPlayer = getPlayerByRemoteId(facingPed);
    if (!targetPlayer) return;
    mp.players.local.taskHandsUp(duration, targetPlayer.handle, p3, p4);
});
//-----------------------------------------------------------//
mp.events.add("client::task:taskHeliChase", (targetid: number, x: number, y: number, z: number) => {
    const target = getPlayerByRemoteId(targetid);
    if (!target) return;
    mp.players.local.taskHeliChase(target.handle, x, y, z);
});
//-----------------------------------------------------------//
mp.events.add(
    "client::task:taskHeliMission",
    (
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
    ) => {
        const heli = mp.vehicles.atRemoteId(vehicle);
        const player = mp.players.atRemoteId(pedToFollow);
        if (!heli || !mp.vehicles.exists(heli) || !player || !mp.players.exists(player)) return;
        mp.players.local.taskHeliMission(heli.handle, p2, player.handle, posX, posY, posZ, mode, speed, radius, angle, p11, height, p13, p14);
    }
);
//-----------------------------------------------------------//
mp.events.add("client::task:taskJump", (unused: boolean, flag1: boolean, flag2: boolean) => {
    mp.players.local.taskJump(unused, flag1, flag2);
});
//-----------------------------------------------------------//
mp.events.add("client::task:taskLeaveAnyVehicle", (p1: number, p2: number) => {
    mp.players.local.taskLeaveAnyVehicle(p1, p2);
});
//-----------------------------------------------------------//
mp.events.add("client::task:taskLeaveVehicle", (targetvehicle: number, flags: number) => {
    const target = getVehicleByRemoteId(targetvehicle);
    if (!target) return;
    mp.players.local.taskLeaveVehicle(target.handle, flags);
});
//-----------------------------------------------------------//
mp.events.add("client::task:taskLookAt", (targetid: number, duration: number, unknown1: number, unknown2: number) => {
    const target = getPlayerByRemoteId(targetid);
    if (!target) return;
    mp.players.local.taskLookAt(target.handle, duration, unknown1, unknown2);
});
//-----------------------------------------------------------//
mp.events.add("client::task:taskMoveNetwork", (task: string, multiplier: number, p3: boolean, animDict: string, flags: number) => {
    mp.players.local.taskMoveNetwork(task, multiplier, p3, animDict, flags);
});
//-----------------------------------------------------------//
mp.events.add(
    "client::task:taskMoveNetworkAdvanced",
    (p1: string, p2: number, p3: number, p4: number, p5: number, p6: number, p7: number, p8: any, p9: number, p10: boolean, animDict: string, flags: number) => {
        mp.players.local.taskMoveNetworkAdvanced(p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, animDict, flags);
    }
);
//-----------------------------------------------------------//
mp.events.add("client::task:taskOpenVehicleDoor", (targetvehicle: number, timeOut: number, doorIndex: number, speed: number) => {
    const target = getVehicleByRemoteId(targetvehicle);
    if (!target) return;
    mp.players.local.taskOpenVehicleDoor(target.handle, timeOut, doorIndex, speed);
});
//-----------------------------------------------------------//
mp.events.add("client::task:taskParachute", (p1: boolean) => {
    mp.players.local.taskParachute(p1);
});
//-----------------------------------------------------------//
mp.events.add("client::task:taskParachuteToTarget", (x: number, y: number, z: number) => {
    mp.players.local.taskParachuteToTarget(x, y, z);
});
//-----------------------------------------------------------//
mp.events.add("client::task:taskPatrol", (p1: string, p2: any, p3: boolean, p4: boolean) => {
    mp.players.local.taskPatrol(p1, p2, p3, p4);
});
//-----------------------------------------------------------//
mp.events.add("client::task:taskPause", (ms: number) => {
    mp.players.local.taskPause(ms);
});
//-----------------------------------------------------------//
mp.events.add("client::task:taskPerformSequence", (targetid: number) => {
    const target = getPlayerByRemoteId(targetid);
    if (!target) return;
    mp.players.local.taskPerformSequence(target.handle);
});
//-----------------------------------------------------------//
mp.events.add("client::task:taskPlaneChase", (targetid: number, x: number, y: number, z: number) => {
    const target = getPlayerByRemoteId(targetid);
    if (!target) return;
    mp.players.local.taskPlaneChase(target.handle, x, y, z);
});
//-----------------------------------------------------------//
mp.events.add("client::task:taskPlaneLand", (plane: number, runwayStartX: number, runwayStartY: number, runwayStartZ: number, runwayEndX: number, runwayEndY: number, runwayEndZ: number) => {
    const target = getVehicleByRemoteId(plane);
    if (!target) return;
    mp.players.local.taskPlaneLand(target.handle, runwayStartX, runwayStartY, runwayStartZ, runwayEndX, runwayEndY, runwayEndZ);
});
//-----------------------------------------------------------//
mp.events.add(
    "client::task:taskPlaneMission",
    (
        plane: number,
        vehicleid: number,
        playerid: number,
        destinationX: number,
        destinationY: number,
        destinationZ: number,
        p7: number,
        physicsSpeed: number,
        p9: number,
        p10: number,
        maxAltitude: number,
        minAltitude: number
    ) => {
        const targetPlane = mp.vehicles.atRemoteId(plane);
        if (!targetPlane || !mp.vehicles.exists(targetPlane)) return;

        const targetVehicle = mp.vehicles.atRemoteId(vehicleid);
        if (!targetVehicle || !mp.vehicles.exists(targetVehicle)) return;

        const targetPlayer = getPlayerByRemoteId(playerid);
        if (!targetPlayer) return;

        mp.players.local.taskPlaneMission(targetPlane.handle, targetVehicle.handle, targetPlayer.handle, destinationX, destinationY, destinationZ, p7, physicsSpeed, p9, p10, maxAltitude, minAltitude);
    }
);
//-----------------------------------------------------------//
mp.events.add("client::task:taskPlantBomb", (x: number, y: number, z: number, heading: number) => {
    mp.players.local.taskPlantBomb(x, y, z, heading);
});
//-----------------------------------------------------------//
mp.events.add(
    "client::task:taskPlayAnim",
    (animDictionary: string, animationName: string, speed: number, speedMultiplier: number, duration: number, flag: number, playbackRate: number, lockX: boolean, lockY: boolean, lockZ: boolean) => {
        mp.players.local.taskPlayAnim(animDictionary, animationName, speed, speedMultiplier, duration, flag, playbackRate, lockX, lockY, lockZ);
    }
);
//-----------------------------------------------------------//
mp.events.add(
    "client::task:taskPlayAnimAdvanced",
    (
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
    ) => {
        mp.players.local.taskPlayAnimAdvanced(animDict, animName, posX, posY, posZ, rotX, rotY, rotZ, speed, speedMultiplier, duration, flag, animTime, p14, p15);
    }
);
//-----------------------------------------------------------//
mp.events.add("client::task:taskPlayPhoneGestureAnimation", (p1: any, p2: any, p3: any, p4: number, p5: number, p6: boolean, p7: boolean) => {
    mp.players.local.taskPlayPhoneGestureAnimation(p1, p2, p3, p4, p5, p6, p7);
});
//-----------------------------------------------------------//
mp.events.add("client::task:taskPutDirectlyIntoCover", (x: number, y: number, z: number, timeout: any, p5: boolean, p6: number, p7: boolean, p8: boolean, p9: object, p10: boolean) => {
    mp.players.local.taskPutDirectlyIntoCover(x, y, z, timeout, p5, p6, p7, p8, p9, p10);
});
//-----------------------------------------------------------//
mp.events.add("client::task:taskPutDirectlyIntoMelee", (meleeTarget: number, p2: number, p3: number, p4: number, p5: boolean) => {
    const target = getPlayerByRemoteId(meleeTarget);
    if (!target) return;
    mp.players.local.taskPutDirectlyIntoMelee(target.handle, p2, p3, p4, p5);
});
//-----------------------------------------------------------//
mp.events.add("client::task:taskRappelFromHeli", (p1: number) => {
    mp.players.local.taskRappelFromHeli(p1);
});
//-----------------------------------------------------------//
mp.events.add("client::task:taskReactAndFlee", (fleeTarget: number) => {
    const target = getPlayerByRemoteId(fleeTarget);
    if (!target) return;
    mp.players.local.taskReactAndFlee(target.handle);
});
//-----------------------------------------------------------//
mp.events.add("client::task:taskReloadWeapon", (doReload: boolean) => {
    mp.players.local.taskReloadWeapon(doReload);
});
//-----------------------------------------------------------//
mp.events.add("client::task:taskScriptedAnimation", (lowData: number, midData: number, highData: number, blendIn: number, blendOut: number) => {
    mp.players.local.taskScriptedAnimation(lowData, midData, highData, blendIn, blendOut);
});
//-----------------------------------------------------------//
mp.events.add("client::task:taskSeekCoverFrom", (fleeTarget: number, duration: number, p3: boolean) => {
    const target = getPlayerByRemoteId(fleeTarget);
    if (!target) return;
    mp.players.local.taskSeekCoverFrom(target.handle, duration, p3);
});
//-----------------------------------------------------------//
mp.events.add("client::task:taskSeekCoverToCoords", (x1: number, y1: number, z1: number, x2: number, y2: number, z2: number, p7: any, p8: boolean) => {
    mp.players.local.taskSeekCoverToCoords(x1, y1, z1, x2, y2, z2, p7, p8);
});
//-----------------------------------------------------------//
mp.events.add("client::task:taskSetBlockingOfNonTemporaryEvents", (toggle: boolean) => {
    mp.players.local.taskSetBlockingOfNonTemporaryEvents(toggle);
});
//-----------------------------------------------------------//
mp.events.add("client::task:taskSetDecisionMaker", (p1: Hash) => {
    mp.players.local.taskSetDecisionMaker(p1);
});
//-----------------------------------------------------------//
mp.events.add("client::task:taskShockingEventReact", (eventHandle: number) => {
    mp.players.local.taskShockingEventReact(eventHandle);
});
//-----------------------------------------------------------//
mp.events.add("client::task:taskShootAtCoord", (x: number, y: number, z: number, duration: number, firingPattern: Hash) => {
    mp.players.local.taskShootAtCoord(x, y, z, duration, firingPattern);
});
//-----------------------------------------------------------//
mp.events.add("client::task:taskShuffleToNextVehicleSeat", (vehicle: number) => {
    const targetVehicle = mp.vehicles.atRemoteId(vehicle);
    if (!targetVehicle || !mp.vehicles.exists(targetVehicle)) return;
    mp.players.local.taskShuffleToNextVehicleSeat(targetVehicle.handle);
});
//-----------------------------------------------------------//
mp.events.add("client::task:taskSkyDive", () => {
    mp.players.local.taskSkyDive();
});
//-----------------------------------------------------------//
mp.events.add("client::task:taskSlideToCoord", (x: number, y: number, z: number, heading: number, speed: number) => {
    mp.players.local.taskSlideToCoord(x, y, z, heading, speed);
});
//-----------------------------------------------------------//
mp.events.add("client::task:taskSlideToCoordHdgRate", (x: number, y: number, z: number, heading: number, speed: number, headingChangeRate: number) => {
    mp.players.local.taskSlideToCoordHdgRate(x, y, z, heading, speed, headingChangeRate);
});
//-----------------------------------------------------------//
mp.events.add("client::task:taskSmartFlee", (fleeTarget: number, distance: number, fleeTime: any, preferPavements: boolean, updateToNearestHatedPed: boolean) => {
    const target = getPlayerByRemoteId(fleeTarget);
    if (!target) return;
    mp.players.local.taskSmartFlee(target.handle, distance, fleeTime, preferPavements, updateToNearestHatedPed);
});
//-----------------------------------------------------------//
mp.events.add("client::task:taskSmartFleeCoord", (x: number, y: number, z: number, distance: number, time: number, preferPavements: boolean, quitIfOutOfRange: boolean) => {
    mp.players.local.taskSmartFleeCoord(x, y, z, distance, time, preferPavements, quitIfOutOfRange);
});
//-----------------------------------------------------------//
mp.events.add("client::task:taskStandGuard", (x: number, y: number, z: number, heading: number, scenarioName: string) => {
    mp.players.local.taskStandGuard(x, y, z, heading, scenarioName);
});
//-----------------------------------------------------------//
mp.events.add("client::task:taskStandStill", (time: number) => {
    mp.players.local.taskStandStill(time);
});
//-----------------------------------------------------------//
mp.events.add("client::task:taskStartScenarioAtPosition", (scenarioName: string, x: number, y: number, z: number, heading: number, duration: number, sittingScenario: boolean, teleport: boolean) => {
    mp.players.local.taskStartScenarioAtPosition(scenarioName, x, y, z, heading, duration, sittingScenario, teleport);
});
//-----------------------------------------------------------//
mp.events.add("client::task:taskStartScenarioInPlace", (scenarioName: string, unkDelay: number, playEnterAnim: boolean) => {
    mp.players.local.taskStartScenarioInPlace(scenarioName, unkDelay, playEnterAnim);
});
//-----------------------------------------------------------//
mp.events.add("client::task:taskStayInCover", () => {
    mp.players.local.taskStayInCover();
});
//-----------------------------------------------------------//
mp.events.add("client::task:taskStealthKill", (targetid: number, killType: Hash, p3: number, p4: boolean) => {
    const target = getPlayerByRemoteId(targetid);
    if (!target) return;
    mp.players.local.taskStealthKill(target.handle, killType, p3, p4);
});
//-----------------------------------------------------------//
mp.events.add("client::task:taskStopPhoneGestureAnimation", () => {
    mp.players.local.taskStopPhoneGestureAnimation();
});
//-----------------------------------------------------------//
mp.events.add("client::task:taskSwapWeapon", (p1: boolean) => {
    mp.players.local.taskSwapWeapon(p1);
});
//-----------------------------------------------------------//
mp.events.add("client::task:taskSweepAim", (anim: string, p2: string, p3: string, p4: string, p5: number, vehicle: number, p7: number, p8: number) => {
    const targetVehicle = mp.vehicles.atRemoteId(vehicle);
    if (!targetVehicle || !mp.vehicles.exists(vehicle)) return;
    mp.players.local.taskSweepAim(anim, p2, p3, p4, p5, targetVehicle.handle, p7, p8);
});
//-----------------------------------------------------------//
mp.events.add(
    "client::task:taskSynchronizedScene",
    (scene: number, animDictionary: string, animationName: string, speed: number, speedMultiplier: number, duration: number, flag: number, playbackRate: number, p9: any) => {
        mp.players.local.taskSynchronizedScene(scene, animDictionary, animationName, speed, speedMultiplier, duration, flag, playbackRate, p9);
    }
);
//-----------------------------------------------------------//
mp.events.add("client::task:taskTurnToFace", (entity: number, duration: number) => {
    const target = getPlayerByRemoteId(entity);
    if (!target) return;
    mp.players.local.taskTurnToFace(target.handle, duration);
});
//-----------------------------------------------------------//
mp.events.add("client::task:taskTurnToFaceCoord", (x: number, y: number, z: number, duration: number) => {
    mp.players.local.taskTurnToFaceCoord(x, y, z, duration);
});
//-----------------------------------------------------------//
mp.events.add("client::task:taskUseMobilePhone", (p1: number) => {
    mp.players.local.taskUseMobilePhone(p1);
});
//-----------------------------------------------------------//
mp.events.add("client::task:taskUseMobilePhoneTimed", (duration: number) => {
    mp.players.local.taskUseMobilePhoneTimed(duration);
});
//-----------------------------------------------------------//
mp.events.add("client::task:taskUseNearestScenarioToCoordWarp", (x: number, y: number, z: number, radius: number, p5: any) => {
    mp.players.local.taskUseNearestScenarioToCoordWarp(x, y, z, radius, p5);
});
//-----------------------------------------------------------//
mp.events.add("client::task:taskVehicleAimAt", (entity: number) => {
    const target = getPlayerByRemoteId(entity);
    if (!target) return;
    mp.players.local.taskVehicleAimAt(target.handle);
});
//-----------------------------------------------------------//
mp.events.add("client::task:taskVehicleChase", (targetEnt: number) => {
    const target = getPlayerByRemoteId(targetEnt);
    if (!target) return;
    mp.players.local.taskVehicleChase(target.handle);
});
//-----------------------------------------------------------//
mp.events.add(
    "client::task:taskVehicleDriveToCoord",
    (vehicle: number, x: number, y: number, z: number, speed: number, p6: any, vehicleModel: Hash, drivingMode: number, stopRange: number, p10: number) => {
        const target = getVehicleByRemoteId(vehicle);
        if (!target) return;
        mp.players.local.taskVehicleDriveToCoord(target.handle, x, y, z, speed, p6, vehicleModel, drivingMode, stopRange, p10);
    }
);
//-----------------------------------------------------------//
mp.events.add("client::task:taskVehicleDriveToCoordLongrange", (vehicle: number, x: number, y: number, z: number, speed: number, driveMode: number, stopRange: number) => {
    const target = getVehicleByRemoteId(vehicle);
    if (!target) return;
    mp.players.local.taskVehicleDriveToCoordLongrange(target.handle, x, y, z, speed, driveMode, stopRange);
});
//-----------------------------------------------------------//
mp.events.add("client::task:taskVehicleDriveWander", (vehicle: number, speed: number, drivingStyle: number) => {
    const target = getVehicleByRemoteId(vehicle);
    if (!target) return;
    mp.players.local.taskVehicleDriveWander(target.handle, speed, drivingStyle);
});
//-----------------------------------------------------------//
mp.events.add("client::task:taskVehicleEscort", (vehicle: number, targetveh: number, mode: number, speed: number, drivingStyle: number, minDistance: number, p7: number, noRoadsDistance: number) => {
    const target = getVehicleByRemoteId(vehicle);
    const targetvehicle = mp.vehicles.at(targetveh);
    if (!target || !targetvehicle || !mp.vehicles.exists(targetvehicle)) return;
    mp.players.local.taskVehicleEscort(target.handle, targetvehicle.handle, mode, speed, drivingStyle, minDistance, p7, noRoadsDistance);
});
//-----------------------------------------------------------//
mp.events.add("client::task:taskVehicleFollow", (vehicle: number, targetEntity: number, drivingStyle: number, speed: number, minDistance: number) => {
    const target = getVehicleByRemoteId(vehicle);
    const targetPlayer = getPlayerByRemoteId(targetEntity);
    if (!target || !targetPlayer) return;
    mp.players.local.taskVehicleFollow(target.handle, targetPlayer.handle, drivingStyle, speed, minDistance);
});
//-----------------------------------------------------------//
mp.events.add("client::task:taskVehicleFollowWaypointRecording", (vehicle: number, WPRecording: string, p3: number, p4: number, p5: number, p6: number, p7: number, p8: boolean, p9: number) => {
    const target = getVehicleByRemoteId(vehicle);
    if (!target) return;
    mp.players.local.taskVehicleFollowWaypointRecording(target.handle, WPRecording, p3, p4, p5, p6, p7, p8, p9);
});
//-----------------------------------------------------------//
mp.events.add("client::task:taskVehicleGotoNavmesh", (vehicle: number, x: number, y: number, z: number, speed: number, behaviorFlag: number, stoppingRange: number) => {
    const target = getVehicleByRemoteId(vehicle);
    if (!target) return;
    mp.players.local.taskVehicleGotoNavmesh(target.handle, x, y, z, speed, behaviorFlag, stoppingRange);
});
//-----------------------------------------------------------//
mp.events.add("client::task:taskVehicleHeliProtect", (vehicle: number, entityToFollow: number, targetSpeed: number, p4: number, radius: number, altitude: number, p7: number) => {
    const target = getVehicleByRemoteId(vehicle);
    if (!target) return;

    const targetPlayer = getPlayerByRemoteId(entityToFollow);
    if (!targetPlayer) return;

    mp.players.local.taskVehicleHeliProtect(target.handle, targetPlayer.handle, targetSpeed, p4, radius, altitude, p7);
});
//-----------------------------------------------------------//
mp.events.add("client::task:taskVehicleMissionCoorsTarget", (vehicle: number, x: number, y: number, z: number, p5: number, p6: number, p7: number, p8: number, p9: number, p10: boolean) => {
    const target = getVehicleByRemoteId(vehicle);
    if (!target) return;
    mp.players.local.taskVehicleMissionCoorsTarget(target.handle, x, y, z, p5, p6, p7, p8, p9, p10);
});
//-----------------------------------------------------------//
mp.events.add("client::task:taskVehicleMissionTarget", (vehicle: number, pedTarget: number, mode: number, maxSpeed: number, drivingStyle: number, minDistance: number, p7: number, p8: boolean) => {
    const targetVehicle = mp.vehicles.atRemoteId(vehicle);
    const targetPlayer = getPlayerByRemoteId(pedTarget);
    if (!targetVehicle || !mp.vehicles.exists(targetVehicle) || !targetPlayer) return;
    mp.players.local.taskVehicleMissionTarget(targetVehicle.handle, targetPlayer.handle, mode, maxSpeed, drivingStyle, minDistance, p7, p8);
});
//-----------------------------------------------------------//
mp.events.add("client::task:taskVehiclePark", (vehicle: number, x: number, y: number, z: number, heading: number, mode: number, radius: number, keepEngineOn: boolean) => {
    const targetVehicle = mp.vehicles.atRemoteId(vehicle);
    if (!targetVehicle || !mp.vehicles.exists(targetVehicle)) return;
    mp.players.local.taskVehiclePark(targetVehicle.handle, x, y, z, heading, mode, radius, keepEngineOn);
});
//-----------------------------------------------------------//
mp.events.add("client::task:taskVehicleTempAction", (vehicle: number, action: number, time: number) => {
    const target = getVehicleByRemoteId(vehicle);
    if (!target) return;
    mp.players.local.taskVehicleTempAction(target.handle, action, time);
});
//-----------------------------------------------------------//
mp.events.add("client::task:taskWanderInArea", (x: number, y: number, z: number, radius: number, minimalLength: number, timeBetweenWalks: number) => {
    mp.players.local.taskWanderInArea(x, y, z, radius, minimalLength, timeBetweenWalks);
});
//-----------------------------------------------------------//
mp.events.add("client::task:taskWanderStandard", (p1: number, p2: number) => {
    mp.players.local.taskWanderStandard(p1, p2);
});
//-----------------------------------------------------------//
mp.events.add("client::task:taskWarpIntoVehicle", (vehicle: number, seat: number) => {
    const target = getVehicleByRemoteId(vehicle);
    if (!target) return;
    mp.players.local.taskWarpIntoVehicle(target.handle, seat);
});
//-----------------------------------------------------------//
mp.events.add("client::task:taskWrithe", (targetid: number, time: number, p3: number) => {
    const target = getPlayerByRemoteId(targetid);
    if (!target) return;
    mp.players.local.taskWrithe(target.handle, time, p3);
});
//-----------------------------------------------------------//
mp.events.add("client::task:uncuff", () => {
    mp.players.local.uncuff();
});
//-----------------------------------------------------------//
mp.events.add("client::task:updateTaskAimGunScriptedTarget", (p1: number, p2: number, p3: number, p4: number, p5: boolean) => {
    const target = getPlayerByRemoteId(p1);
    if (!target) return;
    mp.players.local.updateTaskAimGunScriptedTarget(target.handle, p2, p3, p4, p5);
});
//-----------------------------------------------------------//
mp.events.add("client::task:updateTaskHandsUpDuration", (duration: number) => {
    mp.players.local.updateTaskHandsUpDuration(duration);
});
//-----------------------------------------------------------//
