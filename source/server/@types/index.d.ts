import { InteractionMenu } from "@classes/Interaction.class";
import { AccountEntity } from "@entities/Account.entity";
import { CharacterEntity } from "@entities/Character.entity";
import { NativeMenu } from "@classes/NativeMenu.class";

declare global {
    interface PlayerMpPool {
        getPlayerByName: (stringornumber: string) => PlayerMp | undefined;
    }

    type TaskMap = {
        taskAchieveHeading: [heading: number, timeout: number];

        taskAimGunAt: [entity: number, duration: number, instantBlendToAim: boolean];
        taskAimGunAtCoord: [
            x: number,
            y: number,
            z: number,
            duration: number,
            instantBlendToAim: boolean,
            unkUseAlternateDirection: boolean
        ];
        taskAimGunScripted: [
            scriptTaskHash: number,
            disableIdleAnimation: boolean,
            instantBlendToAim: boolean
        ];

        taskArrest: [targetPed: number];

        taskBoatMission: [
            boat: number,
            unkPedOrVehicle: any,
            unkTargetPed: any,
            x: number,
            y: number,
            z: number,
            missionType: any,
            cruiseSpeed: number,
            unkTargetReachedDist: any,
            unkStraightLineDist: number,
            unkDriveAgainstTraffic: any
        ];

        taskChatTo: [
            targetPed: number,
            unkFlags: any,
            duration: number,
            unkSpeechFlags: number,
            unkLookAtMode: number,
            unkFacialMode: number,
            unkSecondaryFlags: number
        ];

        taskClearLookAt: [];

        taskClimb: [unused: boolean];
        taskClimbLadder: [climbStyle: number];

        taskCombat: [targetPed: number, unkCombatFlags: number, unkThreatResponse: number];
        taskCombatHatedTargetsAround: [radius: number, unkCombatFlags: number];
        taskCombatHatedTargetsInArea: [
            x: number,
            y: number,
            z: number,
            radius: number,
            unkCombatFlags: any
        ];

        taskCower: [duration: number];

        taskDriveBy: [
            targetPed: number,
            targetVehicle: any,
            targetX: number,
            targetY: number,
            targetZ: number,
            distanceToShoot: number,
            pedAccuracy: any,
            firingPatternIsDefault: boolean,
            firingPattern: number
        ];

        taskEnterVehicle: [
            vehicle: number,
            timeout: number,
            seatIndex: number,
            speed: number,
            flag: number,
            p6: any
        ];

        taskFollowNavMeshToCoord: [
            x: number,
            y: number,
            z: number,
            moveBlendRatio: number,
            time: number,
            radius: number,
            flags: boolean,
            finalHeading: number
        ];

        taskFollowNavMeshToCoordAdvanced: [
            x: number,
            y: number,
            z: number,
            moveBlendRatio: number,
            time: number,
            radius: number,
            finalHeading: number,
            navMeshX: number,
            navMeshY: number,
            navMeshZ: number,
            unkFlags: number
        ];

        taskFollowPointRoute: [speed: number, unkMode: number];

        taskFollowToOffsetOf: [
            entity: number,
            offsetX: number,
            offsetY: number,
            offsetZ: number,
            moveBlendRatio: number,
            timeout: number,
            stoppingRange: number,
            persistFollowing: boolean
        ];

        taskForceMotionState: [motionStateHash: number, shouldResetImmediately: boolean];

        taskGetOffBoat: [boat: number];

        taskGoStraightToCoord: [
            x: number,
            y: number,
            z: number,
            speed: number,
            timeout: number,
            targetHeading: number,
            distanceToSlide: number
        ];

        taskGotoAiming: [
            targetEntity: number,
            distanceToStopAt: number,
            startAimingDist: number
        ];

        taskGoToCoordAndAimAtHatedEntitiesNearCoord: [
            gotoX: number,
            gotoY: number,
            gotoZ: number,
            aimNearX: number,
            aimNearY: number,
            aimNearZ: number,
            moveBlendRatio: number,
            shoot: boolean,
            unkPedAccuracy: number,
            unkShootRate: number,
            unkUseCover: boolean,
            unkFlags: number,
            useHeading: boolean,
            firingPattern: number
        ];

        taskGoToCoordAnyMeans: [
            x: number,
            y: number,
            z: number,
            moveBlendRatio: number,
            vehicle: any,
            useLongRangeVehiclePathing: boolean,
            drivingFlags: number,
            maxRangeToShootTargets: number
        ];

        taskGoToCoordAnyMeansExtraParams: [
            x: number,
            y: number,
            z: number,
            moveBlendRatio: number,
            vehicle: any,
            useLongRangeVehiclePathing: boolean,
            drivingFlags: number,
            maxRangeToShootTargets: number,
            extraParam1: any,
            extraParam2: any,
            extraParam3: any
        ];

        taskGoToCoordAnyMeansExtraParamsWithCruiseSpeed: [
            x: number,
            y: number,
            z: number,
            moveBlendRatio: number,
            vehicle: any,
            useLongRangeVehiclePathing: boolean,
            drivingFlags: number,
            maxRangeToShootTargets: number,
            extraParam1: any,
            extraParam2: any,
            extraParam3: any,
            cruiseSpeed: any
        ];

        taskGoToCoordWhileAimingAtCoord: [
            x: number,
            y: number,
            z: number,
            aimAtX: number,
            aimAtY: number,
            aimAtZ: number,
            moveBlendRatio: number,
            shoot: boolean,
            unkPedAccuracy: number,
            unkShootRate: number,
            unkUseCover: boolean,
            firingPatternFlags: any,
            unkForceAim: boolean,
            firingPattern: number
        ];

        taskGuardCurrentPosition: [
            maxPatrolProximity: number,
            defensiveAreaRadius: number,
            guardFlags: number
        ];

        taskGuardSphereDefensiveArea: [
            defensiveAreaX: number,
            defensiveAreaY: number,
            defensiveAreaZ: number,
            radius: number,
            waitTimeMs: number,
            unkPedToGuard: any,
            patrolRadius: number,
            unkFlags1: number,
            unkFlags2: number,
            unkFlags3: number
        ];

        taskHandsUp: [
            duration: number,
            facingPed: number,
            unkPedType: number,
            playLoopedAnimation: boolean
        ];

        taskHeliChase: [entityToFollow: number, x: number, y: number, z: number];

        taskHeliMission: [
            vehicle: number,
            unkPed: any,
            pedToFollow: number,
            destinationX: number,
            destinationY: number,
            destinationZ: number,
            missionType: number,
            cruiseSpeed: number,
            targetReachedDist: number,
            orientation: number,
            flightHeight: number,
            minHeightAboveTerrain: number,
            heliFlags: number,
            unkMissionFlags: number
        ];

        taskJump: [unused: boolean, unkFlag1: boolean, unkFlag2: boolean];

        taskLeaveAnyVehicle: [flags: number, timeout: number];
        taskLeaveVehicle: [vehicle: number, flags: number];

        taskLookAt: [lookAt: number, duration: number, flags: number, priority: number];

        taskMoveNetwork: [
            task: string,
            multiplier: number,
            disableCollision: boolean,
            animDictionary: string,
            flags: number
        ];

        taskMoveNetworkAdvanced: [
            task: string,
            x: number,
            y: number,
            z: number,
            rotX: number,
            rotY: number,
            rotZ: number,
            unkTarget: any,
            blendDuration: number,
            disableCollision: boolean,
            animDictionary: string,
            flags: number
        ];

        taskOpenVehicleDoor: [
            vehicle: number,
            timeout: number,
            doorIndex: number,
            openRatio: number
        ];

        taskParachute: [unkForceOpen: boolean];
        taskParachuteToTarget: [x: number, y: number, z: number];

        taskPatrol: [
            patrolRouteName: string,
            unkRouteIndex: any,
            canUseVehicles: boolean,
            canUseCover: boolean
        ];

        taskPause: [duration: number];

        taskPerformSequence: [taskSequenceId: number];

        taskPlaneChase: [entityToFollow: number, x: number, y: number, z: number];

        taskPlaneLand: [
            plane: number,
            runwayStartX: number,
            runwayStartY: number,
            runwayStartZ: number,
            runwayEndX: number,
            runwayEndY: number,
            runwayEndZ: number
        ];

        taskPlaneMission: [
            plane: number,
            targetVehicle: number,
            targetPed: number,
            destinationX: number,
            destinationY: number,
            destinationZ: number,
            missionType: number,
            cruiseSpeed: number,
            targetReachedDist: number,
            orientation: number,
            maxAltitude: number,
            minAltitude: number
        ];

        taskPlantBomb: [x: number, y: number, z: number, heading: number];

        taskPlayAnim: [
            animDictionary: string,
            animationName: string,
            blendInSpeed: number,
            blendOutSpeed: number,
            duration: number,
            flag: number,
            playbackRate: number,
            lockX: boolean,
            lockY: boolean,
            lockZ: boolean
        ];

        taskPlayAnimAdvanced: [
            animDictionary: string,
            animationName: string,
            posX: number,
            posY: number,
            posZ: number,
            rotX: number,
            rotY: number,
            rotZ: number,
            blendInSpeed: number,
            blendOutSpeed: number,
            duration: number,
            flag: any,
            animTime: number,
            p14: any,
            p15: any
        ];

        taskPlayPhoneGestureAnimation: [
            animDictionary: any,
            animationName: any,
            boneMaskType: any,
            duration: number,
            flag: number,
            loop: boolean,
            holdLastFrame: boolean
        ];

        taskPutDirectlyIntoCover: [
            x: number,
            y: number,
            z: number,
            timeout: any,
            shouldWarp: boolean,
            coverFlags: number,
            canPeekAndAim: boolean,
            canAttack: boolean,
            coverEntity: object,
            forceInitialFacing: boolean
        ];

        taskPutDirectlyIntoMelee: [
            meleeTarget: number,
            unkBlendIn: number,
            unkBlendOut: number,
            unkFlags: number,
            unkForceFatal: boolean
        ];

        taskRappelFromHeli: [minRappelHeight: number];

        taskReactAndFlee: [fleeTarget: number];

        taskReloadWeapon: [doReload: boolean];

        taskScriptedAnimation: [
            lowData: number,
            midData: number,
            highData: number,
            blendIn: number,
            blendOut: number
        ];

        taskSeekCoverFrom: [
            targetPed: number,
            duration: number,
            preferFrontCover: boolean
        ];

        taskSeekCoverToCoords: [
            fromX: number,
            fromY: number,
            fromZ: number,
            toX: number,
            toY: number,
            toZ: number,
            coverFlags: any,
            preferFrontCover: boolean
        ];

        taskSetBlockingOfNonTemporaryEvents: [toggle: boolean];

        taskSetDecisionMaker: [decisionMakerHash: number];

        taskShockingEventReact: [eventHandle: number];

        taskShootAtCoord: [
            x: number,
            y: number,
            z: number,
            duration: number,
            firingPattern: number
        ];

        taskShuffleToNextVehicleSeat: [vehicle: number];

        taskSkyDive: [];

        taskSlideToCoord: [
            x: number,
            y: number,
            z: number,
            heading: number,
            speed: number
        ];

        taskSlideToCoordHdgRate: [
            x: number,
            y: number,
            z: number,
            heading: number,
            speed: number,
            headingChangeRate: number
        ];

        taskSmartFlee: [
            fleeTarget: number,
            distance: number,
            fleeTime: any,
            preferPavements: boolean,
            updateToNearestHatedPed: boolean
        ];

        taskSmartFleeCoord: [
            x: number,
            y: number,
            z: number,
            distance: number,
            fleeTime: number,
            preferPavements: boolean,
            quitIfOutOfRange: boolean
        ];

        taskStandGuard: [
            x: number,
            y: number,
            z: number,
            heading: number,
            scenarioName: string
        ];

        taskStandStill: [time: number];

        taskStartScenarioAtPosition: [
            scenarioName: string,
            x: number,
            y: number,
            z: number,
            heading: number,
            duration: number,
            sittingScenario: boolean,
            teleport: boolean
        ];

        taskStartScenarioInPlace: [
            scenarioName: string,
            timeToLeave: number,
            playIntroClip: boolean
        ];

        taskStayInCover: [];

        taskStealthKill: [
            targetPed: number,
            killType: number,
            unkActionResult: number,
            unkForceStealth: boolean
        ];

        taskStopPhoneGestureAnimation: [];

        taskSwapWeapon: [unkInstantSwap: boolean];

        taskSweepAim: [
            animDictionary: string,
            animationName: string,
            unkBlendCurve: string,
            unkAimMode: string,
            duration: number,
            vehicle: number,
            unkSeatIndex: number,
            unkFlags: number
        ];

        taskSynchronizedScene: [
            scene: number,
            animDictionary: string,
            animationName: string,
            blendInSpeed: number,
            blendOutSpeed: number,
            duration: number,
            flag: number,
            playbackRate: number,
            unkPhase: any
        ];

        taskTurnToFace: [entity: number, duration: number];
        taskTurnToFaceCoord: [x: number, y: number, z: number, duration: number];

        taskUseMobilePhone: [mobilePhoneMode: number];
        taskUseMobilePhoneTimed: [duration: number];

        taskUseNearestScenarioToCoordWarp: [
            x: number,
            y: number,
            z: number,
            radius: number,
            unkScenarioFlags: any
        ];

        taskVehicleAimAt: [targetEntity: number];
        taskVehicleChase: [targetEnt: number];

        taskVehicleDriveToCoord: [
            vehicle: number,
            x: number,
            y: number,
            z: number,
            speed: number,
            unkVehicleModelOrTargetRadius: any,
            vehicleModel: number,
            drivingMode: number,
            stopRange: number,
            unkStraightLineDist: number
        ];

        taskVehicleDriveToCoordLongrange: [
            vehicle: number,
            x: number,
            y: number,
            z: number,
            speed: number,
            drivingMode: number,
            stopRange: number
        ];

        taskVehicleDriveWander: [
            vehicle: number,
            speed: number,
            drivingStyle: number
        ];

        taskVehicleEscort: [
            vehicle: number,
            targetVehicle: number,
            mode: number,
            speed: number,
            drivingStyle: number,
            minDistance: number,
            unkNoRoadsSpeed: number,
            noRoadsDistance: number
        ];

        taskVehicleFollow: [
            vehicle: number,
            targetEntity: number,
            drivingStyle: number,
            speed: number,
            minDistance: number
        ];

        taskVehicleFollowWaypointRecording: [
            vehicle: number,
            waypointRecording: string,
            unkDrivingMode: number,
            unkSpeed: number,
            unkStopRange: number,
            unkFlags1: number,
            unkFlags2: number,
            unkUseShortCutLinks: boolean,
            unkStraightLineDist: number
        ];

        taskVehicleGotoNavmesh: [
            vehicle: number,
            x: number,
            y: number,
            z: number,
            speed: number,
            behaviorFlag: number,
            stoppingRange: number
        ];

        taskVehicleHeliProtect: [
            vehicle: number,
            entityToFollow: number,
            targetSpeed: number,
            unkMissionFlags: number,
            radius: number,
            altitude: number,
            heliFlags: number
        ];

        taskVehicleMissionCoorsTarget: [
            vehicle: number,
            x: number,
            y: number,
            z: number,
            missionType: number,
            maxSpeed: number,
            drivingStyle: number,
            targetReachedDist: number,
            straightLineDist: number,
            driveAgainstTraffic: boolean
        ];

        taskVehicleMissionTarget: [
            vehicle: number,
            pedTarget: number,
            missionType: number,
            maxSpeed: number,
            drivingStyle: number,
            minDistance: number,
            straightLineDist: number,
            driveAgainstTraffic: boolean
        ];

        taskVehiclePark: [
            vehicle: number,
            x: number,
            y: number,
            z: number,
            heading: number,
            mode: number,
            radius: number,
            keepEngineOn: boolean
        ];

        taskVehicleTempAction: [
            vehicle: number,
            action: number,
            time: number
        ];

        taskWanderInArea: [
            x: number,
            y: number,
            z: number,
            radius: number,
            minimalLength: number,
            timeBetweenWalks: number
        ];

        taskWanderStandard: [unkMoveBlendRatio: number, unkFlags: number];

        taskWarpIntoVehicle: [vehicle: number, seatIndex: number];

        taskWrithe: [targetPed: number, time: number, unkCombatOutcome: number];

        uncuff: [];

        updateTaskAimGunScriptedTarget: [
            targetX: number,
            targetY: number,
            targetZ: number,
            duration: number,
            instantBlendToAim: boolean
        ];

        updateTaskHandsUpDuration: [duration: number];
    };
    type TaskCaller = {
        [K in keyof TaskMap]: (...args: TaskMap[K]) => void;
    };

    interface PlayerMp {
        this: PlayerMp;

        account: AccountEntity | null;
        character: CharacterEntity | null;
        lastPosition: Vector3 | null;
        interactionMenu: InteractionMenu | null;
        fastSlotActive: number | null;
        emoteTimeout: NodeJS.Timeout | null;

        nativemenu: NativeMenu | null;
        task: TaskCaller;


        cdata: any;
        giveWeaponEx: (weapon: number, totalAmmo: number, ammoInClip?: number | undefined) => void;

        showNotify(type: RageShared.Enums.NotifyType, message: string, skin?: "light" | "dark" | "colored"): void;
        setVariable<K extends keyof RageShared.Players.Interfaces.PlayerVars>(name: K, value: RageShared.Players.Interfaces.PlayerVars[K]): void;
        getVariable<K extends keyof RageShared.Players.Interfaces.PlayerVars>(key: K): RageShared.Players.Interfaces.PlayerVars[K];
        getAdminLevel(): number;
        getRoleplayName(checkmask: boolean = true): string;
        requestCollisionAt(x: number, y: number, z: number): Promise<boolean>;
        startScreenEffect(effectName: string, duration: number, looped: boolean): void;
        stopScreenEffect(effectName: string): void;
        setEmoteText(color: Array4d, text: string, time: number): void;
        giveMoney(amount: number, logMessage?: string): void;
        attachObject(name: string, attached: boolean): void;

        _attachments: number[];
        addAttachment: (model: number | string, remove: boolean) => void;
        hasAttachment: (model: number | string) => boolean;

        showInteractionButton: (button: string, header: string, description: string) => void;
        hideInteractionButton: () => void;
    }

    interface VehicleMp {
        _attachments: number[];
        addAttachment: (model: number | string, remove: boolean) => void;
        hasAttachment: (model: number | string) => boolean;
    }

    interface ColshapeMp {
        enterHandler: (player: PlayerMp) => void;
        exitHandler: (player: PlayerMp) => void;
    }
}
export { };
