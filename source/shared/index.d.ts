declare namespace RageShared {
    namespace Interfaces {
        interface IPlayerData {
            id: number;
            ping: number;
            wantedLevel: number;
            weapondata: {
                weapon: string;
                ammo: number;
                maxammo: number;
            } | null;
        }

        interface IVehicleData {
            isActive: boolean;
            gear: number;
            speed: number;
            engine: boolean;
            locked: boolean;
            lights: boolean;
            maxSpeed: number;
        }

        interface IMenuItems {
            id: number;
            text: string;
            type: number;
            subItems?: IMenuItems[];
        }
        interface InteractionData {
            isActive: boolean;
            items: RageShared.Interfaces.IMenuItems[];
        }

        interface PlayerVars {
            adminLevel: number;
            isSpectating: boolean;
            loggedin: boolean;
        }

        interface CreatorFace {
            noseWidth: number;
            nosePeakHeight: number;
            nosePeakLength: number;
            noseBoneHeight: number;
            nosePeakLowering: number;
            noseBoneTwist: number;
            eyebrowHeight: number;
            eyebrowForward: number;
            cheekboneHeight: number;
            cheekboneWidth: number;
            cheekWidth: number;
            eyesWidth: number;
            lips: number;
            jawBoneWidth: number;
            jawBoneBackLength: number;
            ChimpBoneLowering: number;
            ChimpBoneLength: number;
            ChimpBoneWidth: number;
            ChimpHole: number;
            neckWidth: number;
            eyeMakeup: number;
            faceMakeup: number;
            lipstickID: number;
        }
        interface CreatorData {
            sex: number;
            name: { firstname: string; lastname: string };
            parents: {
                father: number;
                mother: number;
                leatherMix: number;
                similarity: number;
            };
            hair: {
                head: number;
                eyebrows: number;
                chest: number;
                beard: number;
            };
            face: RageShared.Interfaces.CreatorFace;
            color: {
                head: number;
                head_secondary: number;
                eyebrows: number;
                eyes: number;
                chest: number;
                beard: number;
                eyeMakeup: number;
                faceMakeup: number;
                lipstick: number;
            };
        }

        interface CefEventMap {
            notify: {
                show: { type: RageShared.Enums.NotifyType; message: string; skin: "light" | "dark" | "colored" };
            };
            player: {
                setCharacters: any[];
            };
            hud: {
                setInteraction: RageShared.Interfaces.InteractionData;
                setVehicleData: { key: keyof IVehicleData; data: any };
            };
            auth: {};
        }
    }

    namespace Enums {
        const enum NotifyType {
            TYPE_LOADING = "loading",
            TYPE_PROMISE = "promise",
            TYPE_SUCCESS = "success",
            TYPE_INFO = "info",
            TYPE_ERROR = "error",
            TYPE_WARNING = "warning"
        }
        const enum CharacterType {
            TYPE_CREATE = 0,
            TYPE_CREATED,
            TYPE_BANNED
        }
    }
}
