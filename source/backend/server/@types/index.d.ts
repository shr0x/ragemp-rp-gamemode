import { AccountEntity } from "../database/entity/Account.entity";

declare global {
    interface PlayerMp {
        account: AccountEntity | null;
        lastPosition: Vector3 | null;

        showNotify(type: "loading" | "promise" | "success" | "info" | "error" | "warning" | "warn" | "dark", message: string, skin: "light" | "dark" | "colored" = "dark"): void;
        taskAchieveHeading(heading: number, timeout: number): void;
        taskAimGunAt(targetid: number, duration: number, p3: boolean): void;
        taskAimGunAtCoord(x: number, y: number, z: number, time: number, p5: boolean, p6: boolean): void;
        taskAimGunScripted(scriptTask: number, p2: boolean, p3: boolean): void;
        taskArrest(target: number): void;
        taskBoatMission(boat: number, p2: any, p3: any, x: number, y: number, z: number, p7: any, maxSpeed: number, p9: any, p10: number, p11: any): void;
        taskChatTo(target: number, p2: any, p3: number, p4: number, p5: number, p6: number, p7: number): void;
        taskClearLookAt(): void;
        taskClimb(unused: boolean): void;
        taskClimbLadder(p1: number): void;
        taskCombat(targetPlayer: number, p2: number, p3: number): void;
        taskCombatHatedTargetsAround(radius: number, p2: number): void;
        taskCombatHatedTargetsInArea(x: number, y: number, z: number, radius: number, p5: any): void;
        taskCower(duration: number): void;
        taskDriveBy(targetPlayer: number, p2: any, targetX: number, targetY: number, targetZ: number, p6: number, p7: any, p8: boolean, firingPattern: number): void;
        taskEnterVehicle(vehicle: number, timeout: number, seat: number, speed: number, p5: number, p6: any): void;
        taskFollowNavMeshToCoord(x: number, y: number, z: number, speed: number, timeout: number, stoppingRange: number, persistFollowing: boolean, unk: number): void;
        taskFollowNavMeshToCoordAdvanced(
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
        ): void;
        taskFollowPointRoute(speed: number, unknown: number): void;
        taskFollowToOffsetOf(entity: number, offsetX: number, offsetY: number, offsetZ: number, movementSpeed: number, timeout: number, stoppingRange: number, persistFollowing: boolean): void;
        taskForceMotionState(state: number, p2: boolean): void;
        taskGetOffBoat(boat: number): void;
        taskGoStraightToCoord(x: number, y: number, z: number, speed: number, timeout: number, targetHeading: number, distanceToSlide: number): void;
        taskGotoAiming(target: number, distanceToStopAt: number, StartAimingDist: number): void;
        taskGoToCoordAndAimAtHatedEntitiesNearCoord(
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
        ): void;
        taskGoToCoordAnyMeans(x: number, y: number, z: number, speed: number, p5: any, p6: boolean, walkingStyle: number, p8: number): void;
        taskGoToCoordAnyMeansExtraParams(x: number, y: number, z: number, speed: number, p5: any, p6: boolean, walkingStyle: number, p8: number, p9: any, p10: any, p11: any): void;
        taskGoToCoordAnyMeansExtraParamsWithCruiseSpeed(
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
        ): void;
        taskGoToCoordWhileAimingAtCoord(
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
        ): void;
        taskGuardCurrentPosition(p1: number, p2: number, p3: number): void;
        taskGuardSphereDefensiveArea(p1: number, p2: number, p3: number, p4: number, p5: number, p6: any, p7: number, p8: number, p9: number, p10: number): void;
        taskHandsUp(duration: number, facingPed: number, p3: number, p4: boolean): void;
        taskHeliChase(entityToFollow: number, x: number, y: number, z: number): void;
        taskHeliMission(
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
        ): void;
        taskJump(unused: boolean, flag1: boolean, flag2: boolean): void;
        taskLeaveAnyVehicle(p1: number, p2: number): void;
        taskLeaveVehicle(vehicle: number, flags: number): void;
        taskLookAt(lookAt: number, duration: number, unknown1: number, unknown2: number): void;
        taskMoveNetwork(task: string, multiplier: number, p3: boolean, animDict: string, flags: number): void;
        taskMoveNetworkAdvanced(p1: string, p2: number, p3: number, p4: number, p5: number, p6: number, p7: number, p8: any, p9: number, p10: boolean, animDict: string, flags: number): void;
        taskOpenVehicleDoor(vehicle: number, timeOut: number, doorIndex: number, speed: number): void;
        taskParachute(p1: boolean): void;
        taskParachuteToTarget(x: number, y: number, z: number): void;
        taskPatrol(p1: string, p2: any, p3: boolean, p4: boolean): void;
        taskPause(ms: number): void;
        taskPerformSequence(taskSequence: number): void;
        taskPlaneChase(entityToFollow: number, x: number, y: number, z: number): void;
        taskPlaneLand(plane: number, runwayStartX: number, runwayStartY: number, runwayStartZ: number, runwayEndX: number, runwayEndY: number, runwayEndZ: number): void;
        taskPlaneMission(
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
        ): void;
        taskPlantBomb(x: number, y: number, z: number, heading: number): void;
        taskPlayAnim(
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
        ): void;
        taskPlayAnimAdvanced(
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
        ): void;
        taskPlayPhoneGestureAnimation(p1: any, p2: any, p3: any, p4: number, p5: number, p6: boolean, p7: boolean): void;
        taskPutDirectlyIntoCover(x: number, y: number, z: number, timeout: any, p5: boolean, p6: number, p7: boolean, p8: boolean, p9: object, p10: boolean): void;
        taskPutDirectlyIntoMelee(meleeTarget: number, p2: number, p3: number, p4: number, p5: boolean): void;
        taskRappelFromHeli(p1: number): void;
        taskReactAndFlee(fleeTarget: number): void;
        taskReloadWeapon(doReload: boolean): void;
        taskScriptedAnimation(lowData: number, midData: number, highData: number, blendIn: number, blendOut: number): void;
        taskSeekCoverFrom(target: number, duration: number, p3: boolean): void;
        taskSeekCoverToCoords(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number, p7: any, p8: boolean): void;
        taskSetBlockingOfNonTemporaryEvents(toggle: boolean): void;
        taskSetDecisionMaker(p1: number): void;
        taskShockingEventReact(eventnumber: number): void;
        taskShootAtCoord(x: number, y: number, z: number, duration: number, firingPattern: number): void;
        taskShuffleToNextVehicleSeat(vehicle: number): void;
        taskSkyDive(): void;
        taskSlideToCoord(x: number, y: number, z: number, heading: number, speed: number): void;
        taskSlideToCoordHdgRate(x: number, y: number, z: number, heading: number, speed: number, headingChangeRate: number): void;
        taskSmartFlee(fleeTarget: number, distance: number, fleeTime: any, preferPavements: boolean, updateToNearestHatedPed: boolean): void;
        taskSmartFleeCoord(x: number, y: number, z: number, distance: number, time: number, preferPavements: boolean, quitIfOutOfRange: boolean): void;
        taskStandGuard(x: number, y: number, z: number, heading: number, scenarioName: string): void;
        taskStandStill(time: number): void;
        taskStartScenarioAtPosition(scenarioName: string, x: number, y: number, z: number, heading: number, duration: number, sittingScenario: boolean, teleport: boolean): void;
        taskStartScenarioInPlace(scenarioName: string, unkDelay: number, playEnterAnim: boolean): void;
        taskStayInCover(): void;
        taskStealthKill(target: number, killType: number, p3: number, p4: boolean): void;
        taskStopPhoneGestureAnimation(): void;
        taskSwapWeapon(p1: boolean): void;
        taskSweepAim(anim: string, p2: string, p3: string, p4: string, p5: number, vehicle: number, p7: number, p8: number): void;
        taskSynchronizedScene(
            scene: number,
            animDictionary: string,
            animationName: string,
            speed: number,
            speedMultiplier: number,
            duration: number,
            flag: number,
            playbackRate: number,
            p9: any
        ): void;
        taskTurnToFace(entity: number, duration: number): void;
        taskTurnToFaceCoord(x: number, y: number, z: number, duration: number): void;
        taskUseMobilePhone(p1: number): void;
        taskUseMobilePhoneTimed(duration: number): void;
        taskUseNearestScenarioToCoordWarp(x: number, y: number, z: number, radius: number, p5: any): void;
        taskVehicleAimAt(target: number): void;
        taskVehicleChase(targetEnt: number): void;
        taskVehicleDriveToCoord(vehicle: number, x: number, y: number, z: number, speed: number, p6: any, vehicleModel: number, drivingMode: number, stopRange: number, p10: number): void;
        taskVehicleDriveToCoordLongrange(vehicle: number, x: number, y: number, z: number, speed: number, driveMode: number, stopRange: number): void;
        taskVehicleDriveWander(vehicle: number, speed: number, drivingStyle: number): void;
        taskVehicleEscort(vehicle: number, targetVehicle: number, mode: number, speed: number, drivingStyle: number, minDistance: number, p7: number, noRoadsDistance: number): void;
        taskVehicleFollow(vehicle: number, targetEntity: number, drivingStyle: number, speed: number, minDistance: number): void;
        taskVehicleFollowWaypointRecording(vehicle: number, WPRecording: string, p3: number, p4: number, p5: number, p6: number, p7: number, p8: boolean, p9: number): void;
        taskVehicleGotoNavmesh(vehicle: number, x: number, y: number, z: number, speed: number, behaviorFlag: number, stoppingRange: number): void;
        taskVehicleHeliProtect(vehicle: number, entityToFollow: number, targetSpeed: number, p4: number, radius: number, altitude: number, p7: number): void;
        taskVehicleMissionCoorsTarget(vehicle: number, x: number, y: number, z: number, p5: number, p6: number, p7: number, p8: number, p9: number, p10: boolean): void;
        taskVehicleMissionTarget(vehicle: number, pedTarget: number, mode: number, maxSpeed: number, drivingStyle: number, minDistance: number, p7: number, p8: boolean): void;
        taskVehiclePark(vehicle: number, x: number, y: number, z: number, heading: number, mode: number, radius: number, keepEngineOn: boolean): void;
        taskVehicleTempAction(vehicle: number, action: number, time: number): void;
        taskWanderInArea(x: number, y: number, z: number, radius: number, minimalLength: number, timeBetweenWalks: number): void;
        taskWanderStandard(p1: number, p2: number): void;
        taskWarpIntoVehicle(vehicle: number, seat: number): void;
        taskWrithe(target: number, time: number, p3: number): void;
        uncuff(): void;
        updateTaskAimGunScriptedTarget(p1: number, p2: number, p3: number, p4: number, p5: boolean): void;
        updateTaskHandsUpDuration(duration: number): void;
    }
}

export {};
