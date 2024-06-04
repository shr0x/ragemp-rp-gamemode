declare namespace RageShared.Players {
    namespace Interfaces {
        interface IPlayerData {
            id: number;
            ping: number;
            wantedLevel: number;
            isDead: boolean;
            gender: number;
            weapondata: {
                weapon: string;
                ammo: number;
                maxammo: number;
            } | null;
        }

        interface PlayerVars {
            adminLevel: number;
            isSpectating: boolean;
            isDead: boolean;
            loggedin: boolean;
            ammoType: string;
            ammoHash: { items: string[]; count: number } | null;
            itemAsAmmo: string | null;
        }

        //#region CHARACTER CREATOR DATA
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

        interface CreatorParents {
            father: number;
            mother: number;
            leatherMix: number;
            similarity: number;
        }
        interface CreatorHair {
            head: number;
            eyebrows: number;
            chest: number;
            beard: number;
        }
        interface CreatorColor {
            head: number;
            head_secondary: number;
            eyebrows: number;
            eyes: number;
            chest: number;
            beard: number;
            lipstick: number;
        }

        interface CreatorName {
            firstname: string;
            lastname: string;
        }

        interface CreatorData {
            sex: number;
            name: CreatorName;
            parents: CreatorParents;
            hair: CreatorHair;
            face: CreatorFace;
            color: CreatorColor;
        }
        //#endregion
    }

    namespace Enums {
        const enum DEATH_STATES {
            STATE_NONE = 0,
            STATE_INJURED
        }

        const enum ADMIN_LEVELS {
            LEVEL_NONE = 0,
            LEVEL_ONE,
            LEVEL_TWO,
            LEVEL_THREE,
            LEVEL_FOUR,
            LEVEL_FIVE,
            LEVEL_SIX
        }
    }
}
