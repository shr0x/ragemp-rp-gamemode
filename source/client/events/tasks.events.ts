/* eslint-disable @typescript-eslint/no-explicit-any */

type TaskEventHandler<T extends any[] = any[]> = (...args: T) => void;

function registerTaskEvent<T extends any[]>(
    eventName: string,
    handler: TaskEventHandler<T>
): void {
    mp.events.add(eventName, (...args: T) => {
        try {
            handler(...args);
        } catch (error) {
            mp.console.logError(`[PlayerTasks] ${eventName} failed: ${String(error)}`);
        }
    });
}

function resolvePlayerHandle(remoteId: number): number | null {
    const player = mp.players.atRemoteId(remoteId);
    if (!player || !mp.players.exists(player)) return null;
    return player.handle;
}

function resolveVehicleHandle(remoteId: number): number | null {
    const vehicle = mp.vehicles.atRemoteId(remoteId);
    if (!vehicle || !mp.vehicles.exists(vehicle)) return null;
    return vehicle.handle;
}

function localPlayer(): PlayerMp {
    return mp.players.local;
}

/**
 * Helpers for common target patterns
 */
function withPlayerHandle(remoteId: number, cb: (handle: number) => void): void {
    const handle = resolvePlayerHandle(remoteId);
    if (handle === null) return;
    cb(handle);
}

function withVehicleHandle(remoteId: number, cb: (handle: number) => void): void {
    const handle = resolveVehicleHandle(remoteId);
    if (handle === null) return;
    cb(handle);
}

function withPlayerAndVehicleHandles(
    playerRemoteId: number,
    vehicleRemoteId: number,
    cb: (playerHandle: number, vehicleHandle: number) => void
): void {
    const playerHandle = resolvePlayerHandle(playerRemoteId);
    const vehicleHandle = resolveVehicleHandle(vehicleRemoteId);

    if (playerHandle === null || vehicleHandle === null) return;
    cb(playerHandle, vehicleHandle);
}

function withTwoVehicleHandles(
    vehicleRemoteIdA: number,
    vehicleRemoteIdB: number,
    cb: (vehicleHandleA: number, vehicleHandleB: number) => void
): void {
    const vehicleHandleA = resolveVehicleHandle(vehicleRemoteIdA);
    const vehicleHandleB = resolveVehicleHandle(vehicleRemoteIdB);

    if (vehicleHandleA === null || vehicleHandleB === null) return;
    cb(vehicleHandleA, vehicleHandleB);
}

/**
 * Local-only tasks
 */
registerTaskEvent<[heading: number, timeout: number]>(
    "client::task:taskAchieveHeading",
    (heading, timeout) => {
        localPlayer().taskAchieveHeading(heading, timeout);
    }
);

registerTaskEvent<[x: number, y: number, z: number, duration: number, instantBlendToAim: boolean, unkUseAlternateDirection: boolean]>(
    "client::task:taskAimGunAtCoord",
    (x, y, z, duration, instantBlendToAim, unkUseAlternateDirection) => {
        localPlayer().taskAimGunAtCoord(x, y, z, duration, instantBlendToAim, unkUseAlternateDirection);
    }
);

registerTaskEvent<[scriptTaskHash: Hash, disableIdleAnimation: boolean, instantBlendToAim: boolean]>(
    "client::task:taskAimGunScripted",
    (scriptTaskHash, disableIdleAnimation, instantBlendToAim) => {
        localPlayer().taskAimGunScripted(scriptTaskHash, disableIdleAnimation, instantBlendToAim);
    }
);

registerTaskEvent<[defensiveAreaX: number, defensiveAreaY: number, defensiveAreaZ: number, radius: number, waitTimeMs: number, unkPedToGuard: any, patrolRadius: number, unkFlags1: number, unkFlags2: number, unkFlags3: number]>(
    "client::task:taskGuardSphereDefensiveArea",
    (defensiveAreaX, defensiveAreaY, defensiveAreaZ, radius, waitTimeMs, unkPedToGuard, patrolRadius, unkFlags1, unkFlags2, unkFlags3) => {
        localPlayer().taskGuardSphereDefensiveArea(
            defensiveAreaX,
            defensiveAreaY,
            defensiveAreaZ,
            radius,
            waitTimeMs,
            unkPedToGuard,
            patrolRadius,
            unkFlags1,
            unkFlags2,
            unkFlags3
        );
    }
);

registerTaskEvent(
    "client::task:taskClearLookAt",
    () => {
        localPlayer().taskClearLookAt();
    }
);

registerTaskEvent<[unused: boolean]>(
    "client::task:taskClimb",
    (unused) => {
        localPlayer().taskClimb(unused);
    }
);

registerTaskEvent<[climbStyle: number]>(
    "client::task:taskClimbLadder",
    (climbStyle) => {
        localPlayer().taskClimbLadder(climbStyle);
    }
);

registerTaskEvent<[radius: number, unkCombatFlags: number]>(
    "client::task:taskCombatHatedTargetsAround",
    (radius, unkCombatFlags) => {
        localPlayer().taskCombatHatedTargetsAround(radius, unkCombatFlags);
    }
);

registerTaskEvent<[x: number, y: number, z: number, radius: number, unkCombatFlags: any]>(
    "client::task:taskCombatHatedTargetsInArea",
    (x, y, z, radius, unkCombatFlags) => {
        localPlayer().taskCombatHatedTargetsInArea(x, y, z, radius, unkCombatFlags);
    }
);

registerTaskEvent<[duration: number]>(
    "client::task:taskCower",
    (duration) => {
        localPlayer().taskCower(duration);
    }
);

registerTaskEvent<[x: number, y: number, z: number, moveBlendRatio: number, time: number, radius: number, flags: boolean, finalHeading: number]>(
    "client::task:taskFollowNavMeshToCoord",
    (x, y, z, moveBlendRatio, time, radius, flags, finalHeading) => {
        localPlayer().taskFollowNavMeshToCoord(x, y, z, moveBlendRatio, time, radius, flags, finalHeading);
    }
);

registerTaskEvent<[x: number, y: number, z: number, moveBlendRatio: number, time: number, radius: number, finalHeading: number, navMeshX: number, navMeshY: number, navMeshZ: number, unkFlags: number]>(
    "client::task:taskFollowNavMeshToCoordAdvanced",
    (x, y, z, moveBlendRatio, time, radius, finalHeading, navMeshX, navMeshY, navMeshZ, unkFlags) => {
        localPlayer().taskFollowNavMeshToCoordAdvanced(
            x,
            y,
            z,
            moveBlendRatio,
            time,
            radius,
            finalHeading,
            navMeshX,
            navMeshY,
            navMeshZ,
            unkFlags
        );
    }
);

registerTaskEvent<[speed: number, unkMode: number]>(
    "client::task:taskFollowPointRoute",
    (speed, unkMode) => {
        localPlayer().taskFollowPointRoute(speed, unkMode);
    }
);

registerTaskEvent<[motionStateHash: Hash, shouldResetImmediately: boolean]>(
    "client::task:taskForceMotionState",
    (motionStateHash, shouldResetImmediately) => {
        localPlayer().taskForceMotionState(motionStateHash, shouldResetImmediately);
    }
);

registerTaskEvent<[x: number, y: number, z: number, speed: number, timeout: number, targetHeading: number, distanceToSlide: number]>(
    "client::task:taskGoStraightToCoord",
    (x, y, z, speed, timeout, targetHeading, distanceToSlide) => {
        localPlayer().taskGoStraightToCoord(x, y, z, speed, timeout, targetHeading, distanceToSlide);
    }
);

registerTaskEvent<[gotoX: number, gotoY: number, gotoZ: number, aimNearX: number, aimNearY: number, aimNearZ: number, moveBlendRatio: number, shoot: boolean, unkPedAccuracy: number, unkShootRate: number, unkUseCover: boolean, unkFlags: number, useHeading: boolean, firingPattern: Hash]>(
    "client::task:taskGoToCoordAndAimAtHatedEntitiesNearCoord",
    (
        gotoX,
        gotoY,
        gotoZ,
        aimNearX,
        aimNearY,
        aimNearZ,
        moveBlendRatio,
        shoot,
        unkPedAccuracy,
        unkShootRate,
        unkUseCover,
        unkFlags,
        useHeading,
        firingPattern
    ) => {
        localPlayer().taskGoToCoordAndAimAtHatedEntitiesNearCoord(
            gotoX,
            gotoY,
            gotoZ,
            aimNearX,
            aimNearY,
            aimNearZ,
            moveBlendRatio,
            shoot,
            unkPedAccuracy,
            unkShootRate,
            unkUseCover,
            unkFlags,
            useHeading,
            firingPattern
        );
    }
);

registerTaskEvent<[x: number, y: number, z: number, moveBlendRatio: number, vehicle: any, useLongRangeVehiclePathing: boolean, drivingFlags: number, maxRangeToShootTargets: number]>(
    "client::task:taskGoToCoordAnyMeans",
    (x, y, z, moveBlendRatio, vehicle, useLongRangeVehiclePathing, drivingFlags, maxRangeToShootTargets) => {
        localPlayer().taskGoToCoordAnyMeans(
            x,
            y,
            z,
            moveBlendRatio,
            vehicle,
            useLongRangeVehiclePathing,
            drivingFlags,
            maxRangeToShootTargets
        );
    }
);

registerTaskEvent<[x: number, y: number, z: number, moveBlendRatio: number, vehicle: any, useLongRangeVehiclePathing: boolean, drivingFlags: number, maxRangeToShootTargets: number, extraParam1: any, extraParam2: any, extraParam3: any]>(
    "client::task:taskGoToCoordAnyMeansExtraParams",
    (x, y, z, moveBlendRatio, vehicle, useLongRangeVehiclePathing, drivingFlags, maxRangeToShootTargets, extraParam1, extraParam2, extraParam3) => {
        localPlayer().taskGoToCoordAnyMeansExtraParams(
            x,
            y,
            z,
            moveBlendRatio,
            vehicle,
            useLongRangeVehiclePathing,
            drivingFlags,
            maxRangeToShootTargets,
            extraParam1,
            extraParam2,
            extraParam3
        );
    }
);

registerTaskEvent<[x: number, y: number, z: number, moveBlendRatio: number, vehicle: any, useLongRangeVehiclePathing: boolean, drivingFlags: number, maxRangeToShootTargets: number, extraParam1: any, extraParam2: any, extraParam3: any, cruiseSpeed: any]>(
    "client::task:taskGoToCoordAnyMeansExtraParamsWithCruiseSpeed",
    (x, y, z, moveBlendRatio, vehicle, useLongRangeVehiclePathing, drivingFlags, maxRangeToShootTargets, extraParam1, extraParam2, extraParam3, cruiseSpeed) => {
        localPlayer().taskGoToCoordAnyMeansExtraParamsWithCruiseSpeed(
            x,
            y,
            z,
            moveBlendRatio,
            vehicle,
            useLongRangeVehiclePathing,
            drivingFlags,
            maxRangeToShootTargets,
            extraParam1,
            extraParam2,
            extraParam3,
            cruiseSpeed
        );
    }
);

registerTaskEvent<[x: number, y: number, z: number, aimAtX: number, aimAtY: number, aimAtZ: number, moveBlendRatio: number, shoot: boolean, unkPedAccuracy: number, unkShootRate: number, unkUseCover: boolean, firingPatternFlags: any, unkForceAim: boolean, firingPattern: Hash]>(
    "client::task:taskGoToCoordWhileAimingAtCoord",
    (x, y, z, aimAtX, aimAtY, aimAtZ, moveBlendRatio, shoot, unkPedAccuracy, unkShootRate, unkUseCover, firingPatternFlags, unkForceAim, firingPattern) => {
        localPlayer().taskGoToCoordWhileAimingAtCoord(
            x,
            y,
            z,
            aimAtX,
            aimAtY,
            aimAtZ,
            moveBlendRatio,
            shoot,
            unkPedAccuracy,
            unkShootRate,
            unkUseCover,
            firingPatternFlags,
            unkForceAim,
            firingPattern
        );
    }
);

registerTaskEvent<[maxPatrolProximity: number, defensiveAreaRadius: number, guardFlags: number]>(
    "client::task:taskGuardCurrentPosition",
    (maxPatrolProximity, defensiveAreaRadius, guardFlags) => {
        localPlayer().taskGuardCurrentPosition(maxPatrolProximity, defensiveAreaRadius, guardFlags);
    }
);

registerTaskEvent<[unused: boolean, unkFlag1: boolean, unkFlag2: boolean]>(
    "client::task:taskJump",
    (unused, unkFlag1, unkFlag2) => {
        localPlayer().taskJump(unused, unkFlag1, unkFlag2);
    }
);

registerTaskEvent<[flags: number, timeout: number]>(
    "client::task:taskLeaveAnyVehicle",
    (flags, timeout) => {
        localPlayer().taskLeaveAnyVehicle(flags, timeout);
    }
);

registerTaskEvent<[task: string, multiplier: number, disableCollision: boolean, animDictionary: string, flags: number]>(
    "client::task:taskMoveNetwork",
    (task, multiplier, disableCollision, animDictionary, flags) => {
        localPlayer().taskMoveNetwork(task, multiplier, disableCollision, animDictionary, flags);
    }
);

registerTaskEvent<[task: string, x: number, y: number, z: number, rotX: number, rotY: number, rotZ: number, unkTarget: any, blendDuration: number, disableCollision: boolean, animDictionary: string, flags: number]>(
    "client::task:taskMoveNetworkAdvanced",
    (task, x, y, z, rotX, rotY, rotZ, unkTarget, blendDuration, disableCollision, animDictionary, flags) => {
        localPlayer().taskMoveNetworkAdvanced(
            task,
            x,
            y,
            z,
            rotX,
            rotY,
            rotZ,
            unkTarget,
            blendDuration,
            disableCollision,
            animDictionary,
            flags
        );
    }
);

registerTaskEvent<[unkForceOpen: boolean]>(
    "client::task:taskParachute",
    (unkForceOpen) => {
        localPlayer().taskParachute(unkForceOpen);
    }
);

registerTaskEvent<[x: number, y: number, z: number]>(
    "client::task:taskParachuteToTarget",
    (x, y, z) => {
        localPlayer().taskParachuteToTarget(x, y, z);
    }
);

registerTaskEvent<[patrolRouteName: string, unkRouteIndex: any, canUseVehicles: boolean, canUseCover: boolean]>(
    "client::task:taskPatrol",
    (patrolRouteName, unkRouteIndex, canUseVehicles, canUseCover) => {
        localPlayer().taskPatrol(patrolRouteName, unkRouteIndex, canUseVehicles, canUseCover);
    }
);

registerTaskEvent<[duration: number]>(
    "client::task:taskPause",
    (duration) => {
        localPlayer().taskPause(duration);
    }
);

registerTaskEvent<[x: number, y: number, z: number, heading: number]>(
    "client::task:taskPlantBomb",
    (x, y, z, heading) => {
        localPlayer().taskPlantBomb(x, y, z, heading);
    }
);

registerTaskEvent<[animDictionary: string, animationName: string, blendInSpeed: number, blendOutSpeed: number, duration: number, flag: number, playbackRate: number, lockX: boolean, lockY: boolean, lockZ: boolean]>(
    "client::task:taskPlayAnim",
    (animDictionary, animationName, blendInSpeed, blendOutSpeed, duration, flag, playbackRate, lockX, lockY, lockZ) => {
        localPlayer().taskPlayAnim(
            animDictionary,
            animationName,
            blendInSpeed,
            blendOutSpeed,
            duration,
            flag,
            playbackRate,
            lockX,
            lockY,
            lockZ
        );
    }
);

registerTaskEvent<[animDictionary: string, animationName: string, posX: number, posY: number, posZ: number, rotX: number, rotY: number, rotZ: number, blendInSpeed: number, blendOutSpeed: number, duration: number, flag: any, animTime: number, p14: any, p15: any]>(
    "client::task:taskPlayAnimAdvanced",
    (animDictionary, animationName, posX, posY, posZ, rotX, rotY, rotZ, blendInSpeed, blendOutSpeed, duration, flag, animTime, p14, p15) => {
        localPlayer().taskPlayAnimAdvanced(
            animDictionary,
            animationName,
            posX,
            posY,
            posZ,
            rotX,
            rotY,
            rotZ,
            blendInSpeed,
            blendOutSpeed,
            duration,
            flag,
            animTime,
            p14,
            p15
        );
    }
);

registerTaskEvent<[animDictionary: any, animationName: any, boneMaskType: any, duration: number, flag: number, loop: boolean, holdLastFrame: boolean]>(
    "client::task:taskPlayPhoneGestureAnimation",
    (animDictionary, animationName, boneMaskType, duration, flag, loop, holdLastFrame) => {
        localPlayer().taskPlayPhoneGestureAnimation(
            animDictionary,
            animationName,
            boneMaskType,
            duration,
            flag,
            loop,
            holdLastFrame
        );
    }
);

registerTaskEvent<[x: number, y: number, z: number, timeout: any, shouldWarp: boolean, coverFlags: number, canPeekAndAim: boolean, canAttack: boolean, coverEntity: object, forceInitialFacing: boolean]>(
    "client::task:taskPutDirectlyIntoCover",
    (x, y, z, timeout, shouldWarp, coverFlags, canPeekAndAim, canAttack, coverEntity, forceInitialFacing) => {
        localPlayer().taskPutDirectlyIntoCover(
            x,
            y,
            z,
            timeout,
            shouldWarp,
            coverFlags,
            canPeekAndAim,
            canAttack,
            coverEntity,
            forceInitialFacing
        );
    }
);

registerTaskEvent<[minRappelHeight: number]>(
    "client::task:taskRappelFromHeli",
    (minRappelHeight) => {
        localPlayer().taskRappelFromHeli(minRappelHeight);
    }
);

registerTaskEvent<[doReload: boolean]>(
    "client::task:taskReloadWeapon",
    (doReload) => {
        localPlayer().taskReloadWeapon(doReload);
    }
);

registerTaskEvent<[lowData: number, midData: number, highData: number, blendIn: number, blendOut: number]>(
    "client::task:taskScriptedAnimation",
    (lowData, midData, highData, blendIn, blendOut) => {
        localPlayer().taskScriptedAnimation(lowData, midData, highData, blendIn, blendOut);
    }
);

registerTaskEvent<[fromX: number, fromY: number, fromZ: number, toX: number, toY: number, toZ: number, coverFlags: any, preferFrontCover: boolean]>(
    "client::task:taskSeekCoverToCoords",
    (fromX, fromY, fromZ, toX, toY, toZ, coverFlags, preferFrontCover) => {
        localPlayer().taskSeekCoverToCoords(
            fromX,
            fromY,
            fromZ,
            toX,
            toY,
            toZ,
            coverFlags,
            preferFrontCover
        );
    }
);

registerTaskEvent<[toggle: boolean]>(
    "client::task:taskSetBlockingOfNonTemporaryEvents",
    (toggle) => {
        localPlayer().taskSetBlockingOfNonTemporaryEvents(toggle);
    }
);

registerTaskEvent<[decisionMakerHash: Hash]>(
    "client::task:taskSetDecisionMaker",
    (decisionMakerHash) => {
        localPlayer().taskSetDecisionMaker(decisionMakerHash);
    }
);

registerTaskEvent<[eventHandle: number]>(
    "client::task:taskShockingEventReact",
    (eventHandle) => {
        localPlayer().taskShockingEventReact(eventHandle);
    }
);

registerTaskEvent<[x: number, y: number, z: number, duration: number, firingPattern: Hash]>(
    "client::task:taskShootAtCoord",
    (x, y, z, duration, firingPattern) => {
        localPlayer().taskShootAtCoord(x, y, z, duration, firingPattern);
    }
);

registerTaskEvent(
    "client::task:taskSkyDive",
    () => {
        localPlayer().taskSkyDive();
    }
);

registerTaskEvent<[x: number, y: number, z: number, heading: number, speed: number]>(
    "client::task:taskSlideToCoord",
    (x, y, z, heading, speed) => {
        localPlayer().taskSlideToCoord(x, y, z, heading, speed);
    }
);

registerTaskEvent<[x: number, y: number, z: number, heading: number, speed: number, headingChangeRate: number]>(
    "client::task:taskSlideToCoordHdgRate",
    (x, y, z, heading, speed, headingChangeRate) => {
        localPlayer().taskSlideToCoordHdgRate(x, y, z, heading, speed, headingChangeRate);
    }
);

registerTaskEvent<[x: number, y: number, z: number, distance: number, fleeTime: number, preferPavements: boolean, quitIfOutOfRange: boolean]>(
    "client::task:taskSmartFleeCoord",
    (x, y, z, distance, fleeTime, preferPavements, quitIfOutOfRange) => {
        localPlayer().taskSmartFleeCoord(x, y, z, distance, fleeTime, preferPavements, quitIfOutOfRange);
    }
);

registerTaskEvent<[x: number, y: number, z: number, heading: number, scenarioName: string]>(
    "client::task:taskStandGuard",
    (x, y, z, heading, scenarioName) => {
        localPlayer().taskStandGuard(x, y, z, heading, scenarioName);
    }
);

registerTaskEvent<[time: number]>(
    "client::task:taskStandStill",
    (time) => {
        localPlayer().taskStandStill(time);
    }
);

registerTaskEvent<[scenarioName: string, x: number, y: number, z: number, heading: number, duration: number, sittingScenario: boolean, teleport: boolean]>(
    "client::task:taskStartScenarioAtPosition",
    (scenarioName, x, y, z, heading, duration, sittingScenario, teleport) => {
        localPlayer().taskStartScenarioAtPosition(
            scenarioName,
            x,
            y,
            z,
            heading,
            duration,
            sittingScenario,
            teleport
        );
    }
);

registerTaskEvent<[scenarioName: string, timeToLeave: number, playIntroClip: boolean]>(
    "client::task:taskStartScenarioInPlace",
    (scenarioName, timeToLeave, playIntroClip) => {
        localPlayer().taskStartScenarioInPlace(scenarioName, timeToLeave, playIntroClip);
    }
);

registerTaskEvent(
    "client::task:taskStayInCover",
    () => {
        localPlayer().taskStayInCover();
    }
);

registerTaskEvent(
    "client::task:taskStopPhoneGestureAnimation",
    () => {
        localPlayer().taskStopPhoneGestureAnimation();
    }
);

registerTaskEvent<[unkInstantSwap: boolean]>(
    "client::task:taskSwapWeapon",
    (unkInstantSwap) => {
        localPlayer().taskSwapWeapon(unkInstantSwap);
    }
);

registerTaskEvent<[scene: number, animDictionary: string, animationName: string, blendInSpeed: number, blendOutSpeed: number, duration: number, flag: number, playbackRate: number, unkPhase: any]>(
    "client::task:taskSynchronizedScene",
    (scene, animDictionary, animationName, blendInSpeed, blendOutSpeed, duration, flag, playbackRate, unkPhase) => {
        localPlayer().taskSynchronizedScene(
            scene,
            animDictionary,
            animationName,
            blendInSpeed,
            blendOutSpeed,
            duration,
            flag,
            playbackRate,
            unkPhase
        );
    }
);

registerTaskEvent<[x: number, y: number, z: number, duration: number]>(
    "client::task:taskTurnToFaceCoord",
    (x, y, z, duration) => {
        localPlayer().taskTurnToFaceCoord(x, y, z, duration);
    }
);

registerTaskEvent<[mobilePhoneMode: number]>(
    "client::task:taskUseMobilePhone",
    (mobilePhoneMode) => {
        localPlayer().taskUseMobilePhone(mobilePhoneMode);
    }
);

registerTaskEvent<[duration: number]>(
    "client::task:taskUseMobilePhoneTimed",
    (duration) => {
        localPlayer().taskUseMobilePhoneTimed(duration);
    }
);

registerTaskEvent<[x: number, y: number, z: number, radius: number, unkScenarioFlags: any]>(
    "client::task:taskUseNearestScenarioToCoordWarp",
    (x, y, z, radius, unkScenarioFlags) => {
        localPlayer().taskUseNearestScenarioToCoordWarp(x, y, z, radius, unkScenarioFlags);
    }
);

registerTaskEvent<[x: number, y: number, z: number, radius: number, minimalLength: number, timeBetweenWalks: number]>(
    "client::task:taskWanderInArea",
    (x, y, z, radius, minimalLength, timeBetweenWalks) => {
        localPlayer().taskWanderInArea(x, y, z, radius, minimalLength, timeBetweenWalks);
    }
);

registerTaskEvent<[unkMoveBlendRatio: number, unkFlags: number]>(
    "client::task:taskWanderStandard",
    (unkMoveBlendRatio, unkFlags) => {
        localPlayer().taskWanderStandard(unkMoveBlendRatio, unkFlags);
    }
);

registerTaskEvent(
    "client::task:uncuff",
    () => {
        localPlayer().uncuff();
    }
);

registerTaskEvent<[duration: number]>(
    "client::task:updateTaskHandsUpDuration",
    (duration) => {
        localPlayer().updateTaskHandsUpDuration(duration);
    }
);

/**
 * Player-targeted tasks
 */
registerTaskEvent<[entity: number, duration: number, instantBlendToAim: boolean]>(
    "client::task:taskAimGunAt",
    (entity, duration, instantBlendToAim) => {
        withPlayerHandle(entity, handle => {
            localPlayer().taskAimGunAt(handle, duration, instantBlendToAim);
        });
    }
);

registerTaskEvent<[targetPed: number]>(
    "client::task:taskArrest",
    (targetPed) => {
        withPlayerHandle(targetPed, handle => {
            localPlayer().taskArrest(handle);
        });
    }
);

registerTaskEvent<[targetPed: number, unkCombatFlags: number, unkThreatResponse: number]>(
    "client::task:taskCombat",
    (targetPed, unkCombatFlags, unkThreatResponse) => {
        withPlayerHandle(targetPed, handle => {
            localPlayer().taskCombat(handle, unkCombatFlags, unkThreatResponse);
        });
    }
);

registerTaskEvent<[targetPed: number, unkFlags: any, duration: number, unkSpeechFlags: number, unkLookAtMode: number, unkFacialMode: number, unkSecondaryFlags: number]>(
    "client::task:taskChatTo",
    (targetPed, unkFlags, duration, unkSpeechFlags, unkLookAtMode, unkFacialMode, unkSecondaryFlags) => {
        withPlayerHandle(targetPed, handle => {
            localPlayer().taskChatTo(
                handle,
                unkFlags,
                duration,
                unkSpeechFlags,
                unkLookAtMode,
                unkFacialMode,
                unkSecondaryFlags
            );
        });
    }
);

registerTaskEvent<[targetPed: number, targetVehicle: any, targetX: number, targetY: number, targetZ: number, distanceToShoot: number, pedAccuracy: any, firingPatternIsDefault: boolean, firingPattern: Hash]>(
    "client::task:taskDriveBy",
    (targetPed, targetVehicle, targetX, targetY, targetZ, distanceToShoot, pedAccuracy, firingPatternIsDefault, firingPattern) => {
        withPlayerHandle(targetPed, handle => {
            localPlayer().taskDriveBy(
                handle,
                targetVehicle,
                targetX,
                targetY,
                targetZ,
                distanceToShoot,
                pedAccuracy,
                firingPatternIsDefault,
                firingPattern
            );
        });
    }
);

registerTaskEvent<[targetEntity: number, distanceToStopAt: number, startAimingDist: number]>(
    "client::task:taskGotoAiming",
    (targetEntity, distanceToStopAt, startAimingDist) => {
        withPlayerHandle(targetEntity, handle => {
            localPlayer().taskGotoAiming(handle, distanceToStopAt, startAimingDist);
        });
    }
);

registerTaskEvent<[duration: number, facingPed: number, unkPedType: number, playLoopedAnimation: boolean]>(
    "client::task:taskHandsUp",
    (duration, facingPed, unkPedType, playLoopedAnimation) => {
        withPlayerHandle(facingPed, handle => {
            localPlayer().taskHandsUp(duration, handle, unkPedType, playLoopedAnimation);
        });
    }
);

registerTaskEvent<[entityToFollow: number, x: number, y: number, z: number]>(
    "client::task:taskHeliChase",
    (entityToFollow, x, y, z) => {
        withPlayerHandle(entityToFollow, handle => {
            localPlayer().taskHeliChase(handle, x, y, z);
        });
    }
);

registerTaskEvent<[lookAt: number, duration: number, flags: number, priority: number]>(
    "client::task:taskLookAt",
    (lookAt, duration, flags, priority) => {
        withPlayerHandle(lookAt, handle => {
            localPlayer().taskLookAt(handle, duration, flags, priority);
        });
    }
);

registerTaskEvent<[entityToFollow: number, x: number, y: number, z: number]>(
    "client::task:taskPlaneChase",
    (entityToFollow, x, y, z) => {
        withPlayerHandle(entityToFollow, handle => {
            localPlayer().taskPlaneChase(handle, x, y, z);
        });
    }
);

registerTaskEvent<[meleeTarget: number, unkBlendIn: number, unkBlendOut: number, unkFlags: number, unkForceFatal: boolean]>(
    "client::task:taskPutDirectlyIntoMelee",
    (meleeTarget, unkBlendIn, unkBlendOut, unkFlags, unkForceFatal) => {
        withPlayerHandle(meleeTarget, handle => {
            localPlayer().taskPutDirectlyIntoMelee(handle, unkBlendIn, unkBlendOut, unkFlags, unkForceFatal);
        });
    }
);

registerTaskEvent<[fleeTarget: number]>(
    "client::task:taskReactAndFlee",
    (fleeTarget) => {
        withPlayerHandle(fleeTarget, handle => {
            localPlayer().taskReactAndFlee(handle);
        });
    }
);

registerTaskEvent<[targetPed: number, duration: number, preferFrontCover: boolean]>(
    "client::task:taskSeekCoverFrom",
    (targetPed, duration, preferFrontCover) => {
        withPlayerHandle(targetPed, handle => {
            localPlayer().taskSeekCoverFrom(handle, duration, preferFrontCover);
        });
    }
);

registerTaskEvent<[fleeTarget: number, distance: number, fleeTime: any, preferPavements: boolean, updateToNearestHatedPed: boolean]>(
    "client::task:taskSmartFlee",
    (fleeTarget, distance, fleeTime, preferPavements, updateToNearestHatedPed) => {
        withPlayerHandle(fleeTarget, handle => {
            localPlayer().taskSmartFlee(
                handle,
                distance,
                fleeTime,
                preferPavements,
                updateToNearestHatedPed
            );
        });
    }
);

registerTaskEvent<[targetPed: number, killType: Hash, unkActionResult: number, unkForceStealth: boolean]>(
    "client::task:taskStealthKill",
    (targetPed, killType, unkActionResult, unkForceStealth) => {
        withPlayerHandle(targetPed, handle => {
            localPlayer().taskStealthKill(handle, killType, unkActionResult, unkForceStealth);
        });
    }
);

registerTaskEvent<[entity: number, duration: number]>(
    "client::task:taskTurnToFace",
    (entity, duration) => {
        withPlayerHandle(entity, handle => {
            localPlayer().taskTurnToFace(handle, duration);
        });
    }
);

registerTaskEvent<[targetEntity: number]>(
    "client::task:taskVehicleAimAt",
    (targetEntity) => {
        withPlayerHandle(targetEntity, handle => {
            localPlayer().taskVehicleAimAt(handle);
        });
    }
);

registerTaskEvent<[targetEnt: number]>(
    "client::task:taskVehicleChase",
    (targetEnt) => {
        withPlayerHandle(targetEnt, handle => {
            localPlayer().taskVehicleChase(handle);
        });
    }
);

registerTaskEvent<[targetPed: number, time: number, unkCombatOutcome: number]>(
    "client::task:taskWrithe",
    (targetPed, time, unkCombatOutcome) => {
        withPlayerHandle(targetPed, handle => {
            localPlayer().taskWrithe(handle, time, unkCombatOutcome);
        });
    }
);

/**
 * Vehicle-targeted tasks
 */
registerTaskEvent<[boat: number, unkPedOrVehicle: any, unkTargetPed: any, x: number, y: number, z: number, missionType: any, cruiseSpeed: number, unkTargetReachedDist: any, unkStraightLineDist: number, unkDriveAgainstTraffic: any]>(
    "client::task:taskBoatMission",
    (boat, unkPedOrVehicle, unkTargetPed, x, y, z, missionType, cruiseSpeed, unkTargetReachedDist, unkStraightLineDist, unkDriveAgainstTraffic) => {
        withVehicleHandle(boat, handle => {
            localPlayer().taskBoatMission(
                handle,
                unkPedOrVehicle,
                unkTargetPed,
                x,
                y,
                z,
                missionType,
                cruiseSpeed,
                unkTargetReachedDist,
                unkStraightLineDist,
                unkDriveAgainstTraffic
            );
        });
    }
);

registerTaskEvent<[vehicle: number, timeout: number, seatIndex: number, speed: number, flag: number, p6: any]>(
    "client::task:taskEnterVehicle",
    (vehicle, timeout, seatIndex, speed, flag, p6) => {
        withVehicleHandle(vehicle, handle => {
            localPlayer().taskEnterVehicle(handle, timeout, seatIndex, speed, flag, p6);
        });
    }
);

registerTaskEvent<[entity: number, offsetX: number, offsetY: number, offsetZ: number, moveBlendRatio: number, timeout: number, stoppingRange: number, persistFollowing: boolean]>(
    "client::task:taskFollowToOffsetOf",
    (entity, offsetX, offsetY, offsetZ, moveBlendRatio, timeout, stoppingRange, persistFollowing) => {
        withVehicleHandle(entity, handle => {
            localPlayer().taskFollowToOffsetOf(
                handle,
                offsetX,
                offsetY,
                offsetZ,
                moveBlendRatio,
                timeout,
                stoppingRange,
                persistFollowing
            );
        });
    }
);

registerTaskEvent<[boat: number]>(
    "client::task:taskGetOffBoat",
    (boat) => {
        withVehicleHandle(boat, handle => {
            localPlayer().taskGetOffBoat(handle);
        });
    }
);

registerTaskEvent<[vehicle: number, timeout: number, doorIndex: number, openRatio: number]>(
    "client::task:taskOpenVehicleDoor",
    (vehicle, timeout, doorIndex, openRatio) => {
        withVehicleHandle(vehicle, handle => {
            localPlayer().taskOpenVehicleDoor(handle, timeout, doorIndex, openRatio);
        });
    }
);

registerTaskEvent<[vehicle: number]>(
    "client::task:taskShuffleToNextVehicleSeat",
    (vehicle) => {
        withVehicleHandle(vehicle, handle => {
            localPlayer().taskShuffleToNextVehicleSeat(handle);
        });
    }
);

registerTaskEvent<[vehicle: number, x: number, y: number, z: number, speed: number, unkVehicleModelOrTargetRadius: any, vehicleModel: Hash, drivingMode: number, stopRange: number, unkStraightLineDist: number]>(
    "client::task:taskVehicleDriveToCoord",
    (vehicle, x, y, z, speed, unkVehicleModelOrTargetRadius, vehicleModel, drivingMode, stopRange, unkStraightLineDist) => {
        withVehicleHandle(vehicle, handle => {
            localPlayer().taskVehicleDriveToCoord(
                handle,
                x,
                y,
                z,
                speed,
                unkVehicleModelOrTargetRadius,
                vehicleModel,
                drivingMode,
                stopRange,
                unkStraightLineDist
            );
        });
    }
);

registerTaskEvent<[vehicle: number, x: number, y: number, z: number, speed: number, drivingMode: number, stopRange: number]>(
    "client::task:taskVehicleDriveToCoordLongrange",
    (vehicle, x, y, z, speed, drivingMode, stopRange) => {
        withVehicleHandle(vehicle, handle => {
            localPlayer().taskVehicleDriveToCoordLongrange(handle, x, y, z, speed, drivingMode, stopRange);
        });
    }
);

registerTaskEvent<[vehicle: number, speed: number, drivingStyle: number]>(
    "client::task:taskVehicleDriveWander",
    (vehicle, speed, drivingStyle) => {
        withVehicleHandle(vehicle, handle => {
            localPlayer().taskVehicleDriveWander(handle, speed, drivingStyle);
        });
    }
);

registerTaskEvent<[vehicle: number, waypointRecording: string, unkDrivingMode: number, unkSpeed: number, unkStopRange: number, unkFlags1: number, unkFlags2: number, unkUseShortCutLinks: boolean, unkStraightLineDist: number]>(
    "client::task:taskVehicleFollowWaypointRecording",
    (vehicle, waypointRecording, unkDrivingMode, unkSpeed, unkStopRange, unkFlags1, unkFlags2, unkUseShortCutLinks, unkStraightLineDist) => {
        withVehicleHandle(vehicle, handle => {
            localPlayer().taskVehicleFollowWaypointRecording(
                handle,
                waypointRecording,
                unkDrivingMode,
                unkSpeed,
                unkStopRange,
                unkFlags1,
                unkFlags2,
                unkUseShortCutLinks,
                unkStraightLineDist
            );
        });
    }
);

registerTaskEvent<[vehicle: number, x: number, y: number, z: number, speed: number, behaviorFlag: number, stoppingRange: number]>(
    "client::task:taskVehicleGotoNavmesh",
    (vehicle, x, y, z, speed, behaviorFlag, stoppingRange) => {
        withVehicleHandle(vehicle, handle => {
            localPlayer().taskVehicleGotoNavmesh(handle, x, y, z, speed, behaviorFlag, stoppingRange);
        });
    }
);

registerTaskEvent<[vehicle: number, x: number, y: number, z: number, missionType: number, maxSpeed: number, drivingStyle: number, targetReachedDist: number, straightLineDist: number, driveAgainstTraffic: boolean]>(
    "client::task:taskVehicleMissionCoorsTarget",
    (vehicle, x, y, z, missionType, maxSpeed, drivingStyle, targetReachedDist, straightLineDist, driveAgainstTraffic) => {
        withVehicleHandle(vehicle, handle => {
            localPlayer().taskVehicleMissionCoorsTarget(
                handle,
                x,
                y,
                z,
                missionType,
                maxSpeed,
                drivingStyle,
                targetReachedDist,
                straightLineDist,
                driveAgainstTraffic
            );
        });
    }
);

registerTaskEvent<[vehicle: number, x: number, y: number, z: number, heading: number, mode: number, radius: number, keepEngineOn: boolean]>(
    "client::task:taskVehiclePark",
    (vehicle, x, y, z, heading, mode, radius, keepEngineOn) => {
        withVehicleHandle(vehicle, handle => {
            localPlayer().taskVehiclePark(handle, x, y, z, heading, mode, radius, keepEngineOn);
        });
    }
);

registerTaskEvent<[vehicle: number, action: number, time: number]>(
    "client::task:taskVehicleTempAction",
    (vehicle, action, time) => {
        withVehicleHandle(vehicle, handle => {
            localPlayer().taskVehicleTempAction(handle, action, time);
        });
    }
);

registerTaskEvent<[vehicle: number, seatIndex: number]>(
    "client::task:taskWarpIntoVehicle",
    (vehicle, seatIndex) => {
        withVehicleHandle(vehicle, handle => {
            localPlayer().taskWarpIntoVehicle(handle, seatIndex);
        });
    }
);

registerTaskEvent<[vehicle: number, flags: number]>(
    "client::task:taskLeaveVehicle",
    (vehicle, flags) => {
        withVehicleHandle(vehicle, handle => {
            localPlayer().taskLeaveVehicle(handle, flags);
        });
    }
);

/**
 * Mixed target tasks
 */
registerTaskEvent<[heli: number, unkPed: any, pedToFollow: number, destinationX: number, destinationY: number, destinationZ: number, missionType: number, cruiseSpeed: number, targetReachedDist: number, orientation: number, flightHeight: number, minHeightAboveTerrain: number, heliFlags: number, unkMissionFlags: number]>(
    "client::task:taskHeliMission",
    (
        heli,
        unkPed,
        pedToFollow,
        destinationX,
        destinationY,
        destinationZ,
        missionType,
        cruiseSpeed,
        targetReachedDist,
        orientation,
        flightHeight,
        minHeightAboveTerrain,
        heliFlags,
        unkMissionFlags
    ) => {
        withPlayerAndVehicleHandles(pedToFollow, heli, (pedHandle, heliHandle) => {
            localPlayer().taskHeliMission(
                heliHandle,
                unkPed,
                pedHandle,
                destinationX,
                destinationY,
                destinationZ,
                missionType,
                cruiseSpeed,
                targetReachedDist,
                orientation,
                flightHeight,
                minHeightAboveTerrain,
                heliFlags,
                unkMissionFlags
            );
        });
    }
);

registerTaskEvent<[taskSequenceId: number]>(
    "client::task:taskPerformSequence",
    (taskSequenceId) => {
        localPlayer().taskPerformSequence(taskSequenceId);
    }
);

registerTaskEvent<[plane: number, runwayStartX: number, runwayStartY: number, runwayStartZ: number, runwayEndX: number, runwayEndY: number, runwayEndZ: number]>(
    "client::task:taskPlaneLand",
    (plane, runwayStartX, runwayStartY, runwayStartZ, runwayEndX, runwayEndY, runwayEndZ) => {
        withVehicleHandle(plane, handle => {
            localPlayer().taskPlaneLand(
                handle,
                runwayStartX,
                runwayStartY,
                runwayStartZ,
                runwayEndX,
                runwayEndY,
                runwayEndZ
            );
        });
    }
);

registerTaskEvent<[plane: number, targetVehicle: number, targetPed: number, destinationX: number, destinationY: number, destinationZ: number, missionType: number, cruiseSpeed: number, targetReachedDist: number, orientation: number, maxAltitude: number, minAltitude: number]>(
    "client::task:taskPlaneMission",
    (
        plane,
        targetVehicle,
        targetPed,
        destinationX,
        destinationY,
        destinationZ,
        missionType,
        cruiseSpeed,
        targetReachedDist,
        orientation,
        maxAltitude,
        minAltitude
    ) => {
        const planeHandle = resolveVehicleHandle(plane);
        const vehicleHandle = resolveVehicleHandle(targetVehicle);
        const pedHandle = resolvePlayerHandle(targetPed);

        if (planeHandle === null || vehicleHandle === null || pedHandle === null) return;

        localPlayer().taskPlaneMission(
            planeHandle,
            vehicleHandle,
            pedHandle,
            destinationX,
            destinationY,
            destinationZ,
            missionType,
            cruiseSpeed,
            targetReachedDist,
            orientation,
            maxAltitude,
            minAltitude
        );
    }
);

registerTaskEvent<[animDictionary: string, animationName: string, unkBlendCurve: string, unkAimMode: string, duration: number, vehicle: number, unkSeatIndex: number, unkFlags: number]>(
    "client::task:taskSweepAim",
    (animDictionary, animationName, unkBlendCurve, unkAimMode, duration, vehicle, unkSeatIndex, unkFlags) => {
        withVehicleHandle(vehicle, handle => {
            localPlayer().taskSweepAim(
                animDictionary,
                animationName,
                unkBlendCurve,
                unkAimMode,
                duration,
                handle,
                unkSeatIndex,
                unkFlags
            );
        });
    }
);

registerTaskEvent<[vehicle: number, targetVehicle: number, mode: number, speed: number, drivingStyle: number, minDistance: number, unkNoRoadsSpeed: number, noRoadsDistance: number]>(
    "client::task:taskVehicleEscort",
    (vehicle, targetVehicle, mode, speed, drivingStyle, minDistance, unkNoRoadsSpeed, noRoadsDistance) => {
        withTwoVehicleHandles(vehicle, targetVehicle, (vehicleHandle, targetVehicleHandle) => {
            localPlayer().taskVehicleEscort(
                vehicleHandle,
                targetVehicleHandle,
                mode,
                speed,
                drivingStyle,
                minDistance,
                unkNoRoadsSpeed,
                noRoadsDistance
            );
        });
    }
);

registerTaskEvent<[vehicle: number, targetEntity: number, drivingStyle: number, speed: number, minDistance: number]>(
    "client::task:taskVehicleFollow",
    (vehicle, targetEntity, drivingStyle, speed, minDistance) => {
        withPlayerAndVehicleHandles(targetEntity, vehicle, (playerHandle, vehicleHandle) => {
            localPlayer().taskVehicleFollow(
                vehicleHandle,
                playerHandle,
                drivingStyle,
                speed,
                minDistance
            );
        });
    }
);

registerTaskEvent<[vehicle: number, entityToFollow: number, targetSpeed: number, unkMissionFlags: number, radius: number, altitude: number, heliFlags: number]>(
    "client::task:taskVehicleHeliProtect",
    (vehicle, entityToFollow, targetSpeed, unkMissionFlags, radius, altitude, heliFlags) => {
        withPlayerAndVehicleHandles(entityToFollow, vehicle, (playerHandle, vehicleHandle) => {
            localPlayer().taskVehicleHeliProtect(
                vehicleHandle,
                playerHandle,
                targetSpeed,
                unkMissionFlags,
                radius,
                altitude,
                heliFlags
            );
        });
    }
);

registerTaskEvent<[vehicle: number, pedTarget: number, missionType: number, maxSpeed: number, drivingStyle: number, minDistance: number, straightLineDist: number, driveAgainstTraffic: boolean]>(
    "client::task:taskVehicleMissionTarget",
    (vehicle, pedTarget, missionType, maxSpeed, drivingStyle, minDistance, straightLineDist, driveAgainstTraffic) => {
        withPlayerAndVehicleHandles(pedTarget, vehicle, (playerHandle, vehicleHandle) => {
            localPlayer().taskVehicleMissionTarget(
                vehicleHandle,
                playerHandle,
                missionType,
                maxSpeed,
                drivingStyle,
                minDistance,
                straightLineDist,
                driveAgainstTraffic
            );
        });
    }
);

/**
 * Update tasks
 * Note: this one was wrong in your original version.
 * It updates target coordinates, not a remote player handle.
 */
registerTaskEvent<[targetX: number, targetY: number, targetZ: number, duration: number, instantBlendToAim: boolean]>(
    "client::task:updateTaskAimGunScriptedTarget",
    (targetX, targetY, targetZ, duration, instantBlendToAim) => {
        localPlayer().updateTaskAimGunScriptedTarget(
            targetX,
            targetY,
            targetZ,
            duration,
            instantBlendToAim
        );
    }
);