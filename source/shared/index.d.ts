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
            0: number;
            1: number;
            2: number;
            3: number;
            4: number;
            5: number;
            6: number;
            7: number;
            8: number;
            9: number;
            10: number;
            11: number;
            12: number;
            13: number;
            14: number;
            15: number;
            16: number;
            17: number;
            18: number;
            19: number;
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
