export type StringifiedObject<T> = string & { __stringifiedObjectTag: T };

export namespace RageShared {
    export namespace Interfaces {
        export interface IInteractButton {
            button: string;
            time: number;
            image: string;
            count: number;
            rarity: number;
            header: string;
            description: string;
            autoStart: boolean;
        }
        export interface IMenuItems {
            id: number;
            text: string;
            type: number;
            subItems?: IMenuItems[];
        }
        export interface InteractionData {
            isActive: boolean;
            items: RageShared.Interfaces.IMenuItems[];
        }

        export interface INativeMenuItem {
            uid: number;
            type: RageShared.Enums.NATIVEMENU_TYPES;
            name: string;
            data?: string[];
            value?: boolean | string | number;
        }

        export interface INativeMenu {
            id: number;
            isActive: boolean;
            header: { [key: string]: string };
            items: RageShared.Interfaces.INativeMenuItem[];
        }
    }

    export namespace Enums {
        export const enum NATIVEMENU_TYPES {
            TYPE_DEFAULT = 0,
            TYPE_CHECKBOX,
            TYPE_TABS
        }

        export const enum NotifyType {
            TYPE_LOADING = "loading",
            TYPE_PROMISE = "promise",
            TYPE_SUCCESS = "success",
            TYPE_INFO = "info",
            TYPE_ERROR = "error",
            TYPE_WARNING = "warning"
        }

        export const enum ADMIN_LEVELS {
            NONE = 0,
            LEVEL_ONE,
            LEVEL_TWO,
            LEVEL_THREE,
            LEVEL_FOUR,
            LEVEL_FIVE,
            LEVEL_SIX
        }
        export const enum HEXCOLORS {
            WALKIETALKIE = 0xb2ebe0aa,
            FACTIONCHAT = 0x01fcffaa,
            LIGHTGREEN = 0x9acd32aa,
            DARKGREEN = 0x00aa00aa,
            RUBY = 0xe91e63aa,
            LIGHTORANGE = 0xf7a763aa,
            PURPLE1 = 0x7514f6aa,
            WHITE = 0xffffffff,
            YELLOW = 0xffd200ff,
            YELLOW2 = 0xf5deb3ff,
            YELLOW3 = 0xffff90ff,
            LORANGE = 0xf7a763ff,
            AQUA = 0x33ccffff,
            GREEN = 0x32cd32ff,
            LIMEGREEN = 0x06ff00ff,
            GREY = 0xafafafff,
            GREY1 = 0xe6e6e6ff,
            GREY2 = 0xc8c8c8ff,
            GREY3 = 0xaaaaaaff,
            GREY4 = 0x8c8c8cff,
            GREY5 = 0x6e6e6eff,
            LIGHTRED = 0xff6347ff,
            ORANGE = 0xff9900ff,
            RED = 0xaa3333ff,
            PURPLE = 0xc2a2daff,
            NEWBIE = 0x7daeffff,
            BLUE = 0x233efaff,
            OLDSCHOOL = 0x9999ffff,
            DOCTOR = 0xff8282ff,
            DGREEN = 0x00aa00ff,
            DONATOR = 0x8abff5ff,
            NAVYBLUE = 0x089dceff,
            LIGREEN = 0x9acd32ff,
            GLOBAL = 0xffa500ff,
            ADMINCHAT = 0x089dceff,
            FCHAT = 0x01fcffc8,
            SYNTAX = 0xafafafff,
            RETIRED = 0xff69b5ff,
            SANMARINO = 0x2e9cd1ff,
            TEAL = 0x00aaaaaa,
            OFFWHITE = 0xf5deb3aa,
            DARKAQUA = 0x83bfbfaa
        }

        export const enum STRINGCOLORS {
            WALKIETALKIE = "!{#b2ebe0}",
            FACTIONCHAT = "!{#01fcff}",
            LIGHTGREEN = "!{#9acd32}",
            DARKGREEN = "!{#00aa00}",
            RUBY = "!{#e91e63}",
            LIGHTORANGE = "!{#f7a763}",
            PURPLE1 = "!{#7514f6}",
            WHITE = "!{#ffffff}",
            YELLOW = "!{#ffd200}",
            YELLOW2 = "!{#f5deb3}",
            YELLOW3 = "!{#ffff90}",
            LORANGE = "!{#f7a763}",
            AQUA = "!{#33ccff}",
            GREEN = "!{#32cd32}",
            LIMEGREEN = "!{#06ff00}",
            GREY = "!{#afafaf}",
            GREY1 = "!{#e6e6e6}",
            GREY2 = "!{#c8c8c8}",
            GREY3 = "!{#aaaaaa}",
            GREY4 = "!{#8c8c8c}",
            GREY5 = "!{#6e6e6e}",
            LIGHTRED = "!{#ff6347}",
            ORANGE = "!{#ff9900}",
            RED = "!{#aa3333}",
            PURPLE = "!{#c2a2da}",
            NEWBIE = "!{#7daeff}",
            BLUE = "!{#233efa}",
            OLDSCHOOL = "!{#9999ff}",
            DOCTOR = "!{#ff8282}",
            DGREEN = "!{#00aa00}",
            DONATOR = "!{#8abff5}",
            NAVYBLUE = "!{#089dce}",
            LIGREEN = "!{#9acd32}",
            GLOBAL = "!{#ffa500}",
            ADMINCHAT = "!{#089dce}",
            FCHAT = "!{#01fcff}",
            SYNTAX = "!{#afafaf}",
            RETIRED = "!{#ff69b5}",
            SANMARINO = "!{#2e9cd1}",
            TEAL = "!{#00aaaa}",
            OFFWHITE = "!{#f5deb3}",
            DARKAQUA = "!{#83bfbf}"
        }
    }

    export namespace Vehicles {
        export namespace Interfaces {
            export interface SpeedometerData {
                isActive: boolean;
                gear: number;
                speed: number;
                engine: boolean;
                locked: boolean;
                lights: boolean;
                maxSpeed: number;
            }

            export interface IVehicleData {
                locked: boolean;
                engine: boolean;
                numberplate: string;
                fuel: number;

                sqlid: number | null;

                faction: string | null;
                keyhole: string | null;

                owner: number | null;
                ownerName: string | null;

                trunkState: boolean;
                hoodState: boolean;

                primaryColor: [number, number, number];
                secondaryColor: [number, number, number];

                inventory: any | null;

                price: number;

                impoundState: number;
            }
            export interface IVehicleMods {
                tunningMods: { [key: number]: number };

                plateColor: number;
                wheelType: number;
                wheelMod: number;

                neonColor: [number, number, number] | null;
                hasNeon: boolean;
                primaryColorType: number;
                secondaryColorType: number;

                smokecolor: { r: number; g: number; b: number };

                interiorcolor: number;
                dashboardcolor: number;
                dirtlevel: number;
                windows: { 0: boolean; 1: boolean; 2: boolean; 3: boolean };
            }
        }

        export namespace Enums {
            export const enum VEHICLETYPES {
                NONE = 0,
                OWNED = 1,
                FACTION = 2,
                RENTAL = 3,
                JOB = 4,
                ADMIN = 5
            }

            export const enum VEHICLE_CLASS {
                COMPACTS,
                SEDANS,
                SUVS,
                COUPES,
                MUSCLE,
                SPORTS_CLASSIC,
                SPORTS,
                SUPER,
                MOTORCYCLES,
                OFF_ROAD,
                INDUSTRIAl,
                UTILITY,
                VANS,
                CYCLES,
                BOATS,
                HELICOPTERS,
                PLANES,
                SERVICE,
                EMERGENCY,
                MILITARY,
                COMMERCIAl,
                TRAINS,
                OPEN_WHEEL
            }

            export const enum VEHICLEMODS {
                SPOILERS = 0,
                FRONT_BUMPER = 1,
                REAR_BUMPER = 2,
                SIDE_SKIRT = 3,
                EXHAUST = 4,
                FRAME = 5,
                GRILLE = 6,
                HOOD = 7,
                FENDER = 8,
                RIGHT_FENDER = 9,
                ROOF = 10,
                ENGINE = 11,
                BRAKES = 12,
                TRANSMISSION = 13,
                /** 0 to 51 */
                HORNS = 14,
                SUSPENSION = 15,
                ARMOR = 16,
                TURBO = 18,
                XENON = 22,
                FRONT_WHEELS = 23,
                UTIL_SHADOW_SILVER = 20,
                /** Only for Motorcycles */
                BACK_WHEELS = 24,
                PLATE_HOLDERS = 25,
                VANITY_PLATES = 26,
                TRIM_DESIGN = 27,
                ORNAMENTS = 28,
                DASHBOARD = 29,
                DIAL_DESIGN = 30,
                DOOR_SPEAKER = 31,
                SEATS = 32,
                STEERING_WHEEL = 33,
                SHIFT_LEVER = 34,
                PLAQUES = 35,
                SPEAKERS = 36,
                TRUNK = 37,
                HYDRAULICS = 38,
                ENGINE_BLOCK = 39,
                BOOST = 40,
                STRUTS = 41,
                ARCH_COVER = 42,
                AERIALS = 43,
                TANK = 45,
                WINDOW_TINT = 55,
                LIVERY = 48,
                PLATE = 62,
                /** 0 to 74 */
                COLOUR_1 = 66,
                /** 0 to 74 */
                COLOUR_2 = 67
            }

            export const enum VEHICLE_MOD_NAMES {
                SUSPENSION = "suspension",
                ENGINE = "engine",
                TRANSMISSION = "transmission",
                BRAKES = "brakes",
                PAINTING = "painting",
                WINDOW_TINT = "windowtint",
                EXHAUST = "exhaustpipe",
                WHEEL = "wheels",
                TURBO = "turbocharging",
                HORN = "horn",
                THRESHOLD = "threshold",
                FRONT_BUMPER = "frontbumper",
                HEADLIGHTS = "headlights",
                HOOD = "hood",
                BACK_BUMPER = "backbumper",
                NUMBERPLATE = "numberplate",
                GRILLE = "radiatorgrille",
                LIVERY = "wings",
                ROOF = "roof",
                SPOILER = "spoiler",
                TRIM = "trim",
                DASHBOARD = "dashboard",
                DIAL = "dial",
                ENGINE_BLOCK = "engine block",
                STRUTS = "struts",
                ARCH_COVER = "arch cover",
                AERIALS = "aerials",
                PRIMARY_COLOR = "primarycolor",
                SECONDARY_COLOR = "secondarycolor",
                NEON = "neon",
                PLATE_HOLDERS = "plateholder",
                ORNAMENTS = "ornaments"
            }

            export const enum VEHICLE_COLOR_TYPES {
                TYPE_NORMAL = 0, //           0: Normal
                TYPE_METALIC = 1, // 1: Metallic
                TYPE_PEARL = 2, //2: Pearl
                TYPE_MATTE = 3, //3: Matte
                TYPE_METAL = 4, //: Metal
                TYPE_CHROME = 5 //: Chrome
            }
        }
    }

    export namespace Players {
        export namespace Interfaces {
            export interface ICharacters {
                id: number;
                name: string;
                level: number;
                type: 0 | 1 | 2;
                money: number;
                bank: number;
                lastlogin: string;
            }
            export interface IPlayerData {
                id: number;
                ping: number;
                wantedLevel: number;
                isDead: boolean;
                gender: number;
                cash: number;
                weapondata: {
                    weapon: string;
                    ammo: number;
                    maxammo: number;
                } | null;
                deathTime: number;
            }
            export const enum CharacterType {
                TYPE_CREATE = 0,
                TYPE_CREATED,
                TYPE_BANNED
            }
            export interface PlayerVars {
                adminLevel: number;
                isSpectating: boolean;
                isDead: boolean;
                loggedin: boolean;
                ammoType: string;
                ammoHash: { items: string[]; count: number } | null;
                itemAsAmmo: string | null;
                noclip: boolean;
            }

            //#region CHARACTER CREATOR DATA
            export interface CreatorFace {
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

            export interface CreatorParents {
                father: number;
                mother: number;
                leatherMix: number;
                similarity: number;
            }
            export interface CreatorHair {
                head: number;
                eyebrows: number;
                chest: number;
                beard: number;
            }
            export interface CreatorColor {
                head: number;
                head_secondary: number;
                eyebrows: number;
                eyes: number;
                chest: number;
                beard: number;
                lipstick: number;
            }

            export interface CreatorName {
                firstname: string;
                lastname: string;
            }

            export interface CreatorData {
                sex: number;
                name: CreatorName;
                parents: CreatorParents;
                hair: CreatorHair;
                face: CreatorFace;
                color: CreatorColor;
            }
            //#endregion
        }

        export namespace Enums {
            export const enum DEATH_STATES {
                STATE_NONE = 0,
                STATE_INJURED
            }

            export const enum ADMIN_LEVELS {
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

    export namespace Inventory {
        export namespace Enums {
            export const enum ACTIONS {
                USE_ITEM = "use",
                OPEN_ITEM = "open",
                WEAR_ITEM = "putOn",
                DROP_ITEM = "drop",
                TRADE_ITEM = "trade",
                SPLIT_ITEM = "split",
            }

            export const enum INVENTORY_CLOTHING {
                TYPE_HAT = 0,
                TYPE_MASK = 1,
                TYPE_GLASSES = 2,
                TYPE_EARRINGS = 3,
                TYPE_CHAIN = 4,
                TYPE_TSHIRT = 5,
                TYPE_JACKET = 6,
                TYPE_BACKPACK = 7,
                TYPE_WALLET = 8,
                TYPE_ARMOUR = 9,
                TYPE_WATCH = 10,
                TYPE_GLOVES = 11,
                TYPE_PANTS = 12,
                TYPE_SHOES = 13
            }
            export const INVENTORY_EQUIPMENTS: Record<string, string> = {
                hat: "0",
                mask: "1",
                glasses: "2",
                earRings: "3",
                chain: "4",
                tShirt: "5",
                top: "6",
                backpack: "7",
                wallet: "8",
                armour: "9",
                watch: "10",
                gloves: "11",
                pants: "12",
                shoes: "13"
            };

            export enum INVENTORY_CATEGORIES {
                CLOTHES = "clothes",
                POCKETS = "pockets"
            }

            export const enum ITEM_TYPE_CATEGORY {
                TYPE_CLOTHING = 0, //clothing item
                TYPE_PROP, //prop item

                TYPE_WEAPON, //weapon item
                TYPE_AMMO,
                TYPE_FOOD, //food item
                TYPE_DRINK, //drink item

                TYPE_MISC //misc
            }

            export const enum ITEM_TYPES {
                ITEM_TYPE_HAT = "hat",
                ITEM_TYPE_MASK = "mask",
                ITEM_TYPE_GLASSES = "glasses",
                ITEM_TYPE_EARRINGS = "earRings",
                ITEM_TYPE_CHAIN = "chain",
                ITEM_TYPE_TSHIRT = "tShirt",
                ITEM_TYPE_TOP = "top",
                ITEM_TYPE_ARMOUR = "armour",
                ITEM_TYPE_WATCH = "watch",
                ITEM_TYPE_GLOVES = "gloves",
                ITEM_TYPE_PANTS = "pants",
                ITEM_TYPE_SHOES = "shoes",
                ITEM_TYPE_BACKPACK = "backpack",
                ITEM_TYPE_WALLET = "wallet",

                ITEM_TYPE_DAGGER = "weapon_dagger",
                ITEM_TYPE_BAT = "weapon_bat",
                ITEM_TYPE_BOTTLE = "weapon_bottle",
                ITEM_TYPE_CROWBAR = "weapon_crowbar",
                ITEM_TYPE_FLASHLIGHT = "weapon_flashlight",
                ITEM_TYPE_GOLFCLUB = "weapon_golfclub",
                ITEM_TYPE_HAMMER = "weapon_hammer",
                ITEM_TYPE_HATCHET = "weapon_hatchet",
                ITEM_TYPE_KNUCKLEDUSTER = "weapon_knuckleduster",
                ITEM_TYPE_KNIFE = "weapon_knife",
                ITEM_TYPE_MACHETE = "weapon_machete",
                ITEM_TYPE_SWITCHBLADE = "weapon_switchblade",
                ITEM_TYPE_NIGHTSTICK = "weapon_nightstick",
                ITEM_TYPE_WRENCH = "weapon_wrench",
                ITEM_TYPE_BATTLEAXE = "weapon_battleaxe",
                ITEM_TYPE_POOLCUE = "weapon_poolcue",
                ITEM_TYPE_PISTOL = "weapon_pistol",
                ITEM_TYPE_PISTOL_MK2 = "weapon_pistol_mk2",
                ITEM_TYPE_COMBATPISTOL = "weapon_combatpistol",
                ITEM_TYPE_APPISTOL = "weapon_appistol",
                ITEM_TYPE_STUNGUN = "weapon_stungun",
                ITEM_TYPE_PISTOL50 = "weapon_pistol50",
                ITEM_TYPE_SNSPISTOL = "weapon_snspistol",
                ITEM_TYPE_SNSPISTOL_MK2 = "weapon_snspistol_mk2",
                ITEM_TYPE_HEAVYPISTOL = "weapon_heavypistol",
                ITEM_TYPE_VINTAGEPISTOL = "weapon_vintagepistol",
                ITEM_TYPE_FLAREGUN = "weapon_flaregun",
                ITEM_TYPE_MARKSMANPISTOL = "weapon_marksmanpistol",
                ITEM_TYPE_REVOLVER = "weapon_revolver",
                ITEM_TYPE_REVOLVERMK2 = "weapon_revolvermk2",
                ITEM_TYPE_DOUBLEACTION = "weapon_doubleaction",
                ITEM_TYPE_RAYPISTOL = "weapon_raypistol",
                ITEM_TYPE_CERAMICPISTOL = "weapon_ceramicpistol",
                ITEM_TYPE_NAVYREVOLVER = "weapon_navyrevolver",
                ITEM_TYPE_GADGETPISTOL = "weapon_gadgetpistol",
                ITEM_TYPE_STUNGUNMP = "weapon_stungunmp",
                ITEM_TYPE_MICROSMG = "weapon_microsmg",
                ITEM_TYPE_SMG = "weapon_smg",
                ITEM_TYPE_SMG_MK2 = "weapon_smg_mk2",
                ITEM_TYPE_ASSAULTSMG = "weapon_assaultsmg",
                ITEM_TYPE_COMBATPDW = "weapon_combatpdw",
                ITEM_TYPE_MACHINEPISTOL = "weapon_machinepistol",
                ITEM_TYPE_MINISMG = "weapon_minismg",
                ITEM_TYPE_RAYCARBINE = "weapon_raycarbine",
                ITEM_TYPE_PUMPSHOTGUN = "weapon_pumpshotgun",
                ITEM_TYPE_PUMPSHOTGUN_MK2 = "weapon_pumpshotgun_mk2",
                ITEM_TYPE_SAWNOFFSHOTGUN = "weapon_sawnoffshotgun",
                ITEM_TYPE_ASSAULTSHOTGUN = "weapon_assaultshotgun",
                ITEM_TYPE_BULLPUPSHOTGUN = "weapon_bullpupshotgun",
                ITEM_TYPE_MUKSET = "weapon_mukset",
                ITEM_TYPE_HEAVYSHOTGUN = "weapon_heavyshotgun",
                ITEM_TYPE_DBSHOTGUN = "weapon_dbshotgun",
                ITEM_TYPE_AUTOSHOTGUN = "weapon_autoshotgun",
                ITEM_TYPE_COMBATSHOTGUN = "weapon_combatshotgun",
                ITEM_TYPE_ASSAULTRIFLE = "weapon_assaultrifle",
                ITEM_TYPE_ASSAULTRIFLE_MK2 = "weapon_assaultrifle_mk2",
                ITEM_TYPE_CARBINERIFLE = "weapon_carbinerifle",
                ITEM_TYPE_CARBINERIFLE_MK2 = "weapon_carbinerifle_mk2",
                ITEM_TYPE_ADVANCEDRIFLE = "weapon_advancedrifle",
                ITEM_TYPE_SPECIALCARBINE = "weapon_specialcarbine",
                ITEM_TYPE_SPECIALCARBINE_MK2 = "weapon_specialcarbine_mk2",
                ITEM_TYPE_BULLPUPRIFLE = "weapon_bullpuprifle",
                ITEM_TYPE_BULLPUPRIFLE_MK2 = "weapon_bullpuprifle_mk2",
                ITEM_TYPE_COMPACTRIFLE = "weapon_compactrifle",
                ITEM_TYPE_MILITARYRIFLE = "weapon_militaryrifle",
                ITEM_TYPE_HEAVYRIFLE = "weapon_heavyrifle",
                ITEM_TYPE_TACTICALRIFLE = "weapon_tacticalrifle",
                ITEM_TYPE_MG = "weapon_mg",
                ITEM_TYPE_COMBATMG = "weapon_combatmg",
                ITEM_TYPE_COMBATMGMK2 = "weapon_combatmgmk2",
                ITEM_TYPE_GUSENBERG = "weapon_gusenberg",
                ITEM_TYPE_SNIPERRIFLE = "weapon_sniperrifle",
                ITEM_TYPE_HEAVYSNIPER = "weapon_heavysniper",
                ITEM_TYPE_HEAVYSNIPERMK2 = "weapon_heavysnipermk2",
                ITEM_TYPE_MARKSMANRIFLE = "weapon_marksmanrifle",
                ITEM_TYPE_MARKSMANRIFLEMK2 = "weapon_marksmanriflemk2",
                ITEM_TYPE_PRECISIONRIFLE = "weapon_precisionrifle",
                ITEM_TYPE_COMPACTLAUNCHER = "weapon_compactlauncher",
                ITEM_TYPE_FIREWORK = "weapon_firework",
                ITEM_TYPE_GRENADELAUNCHERSMOKE = "weapon_grenadelaunchersmoke",
                ITEM_TYPE_GRENADELAUNCHER = "weapon_grenadelauncher",
                ITEM_TYPE_HOMINGLAUNCHER = "weapon_hominglauncher",
                ITEM_TYPE_MINIGUN = "weapon_minigun",
                ITEM_TYPE_RAILGUN = "weapon_railgun",
                ITEM_TYPE_RPG = "weapon_rpg",
                ITEM_TYPE_BALL = "weapon_ball",
                ITEM_TYPE_BZGAS = "weapon_bzgas",
                ITEM_TYPE_SMOKEGRENADE = "weapon_smokegrenade",
                ITEM_TYPE_FLARE = "weapon_flare",
                ITEM_TYPE_GRENADE = "weapon_grenade",
                ITEM_TYPE_MOLOTOV = "weapon_molotov",
                ITEM_TYPE_PROXIMITYMINE = "weapon_proximitymine",
                ITEM_TYPE_PIPEBOMB = "weapon_pipebomb",
                ITEM_TYPE_SNOWBALL = "weapon_snowball",
                ITEM_TYPE_STICKYBOMB = "weapon_stickybomb",

                ITEM_TYPE_PISTOLAMMO = "pistol_ammo",
                ITEM_TYPE_SMGAMMO = "smg_ammo",
                ITEM_TYPE_SHOTGUNAMMO = "shotgun_ammo",
                ITEM_TYPE_MGAMMO = "mg_ammo",
                ITEM_TYPE_RIFLEAMMO = "rifle_ammo"
            }
            export const enum WEAPON_GROUP {
                UNKNOWN = 3566412288,
                MELEE = 2685387236,
                HANDGUNS = 416676503,
                SUBMACHINE = 3337201152,
                SHOTGUN = 860033945,
                ASSAULTRIFLE = 970310034,
                LIGHTMACHINE = 1159398588,
                SNIPER = 3082541095,
                HEAVYWEAPON = 2725924767,
                THROWABLES = 1548507267,
                MISC = 4257178988
            }
        }
        export namespace Interfaces {
            export interface IMoveItem {
                item: RageShared.Inventory.Interfaces.IBaseItem;
                source: { component: "pockets" | "clothes" | "quickUse" | "backpack" | "groundItems"; slot: string };
                target: {
                    component: "pockets" | "clothes" | "quickUse" | "backpack" | "groundItems";
                    slot: string;
                    item: RageShared.Inventory.Interfaces.IBaseItem | null;
                };
                backpackHash: string | null;
            }
            export interface IUseItem {
                item: RageShared.Inventory.Interfaces.IBaseItem;
                source: { component: "pockets" | "clothes"; slot: string };
            }

            export interface IDropItem {
                item: RageShared.Inventory.Interfaces.IBaseItem;
                source: { component: "pockets" | "clothes" | "backpack"; slot: string; viewingBackpack?: string };
            }

            export interface ISplitItem {
                item: RageShared.Inventory.Interfaces.IBaseItem;
                source: { component: "pockets" | "backpack"; slot: string };
                target: { component: "pockets" | "backpack"; count: number; slot: string };
            }
            export interface IOpenItem {
                item: RageShared.Inventory.Interfaces.IBaseItem;
                source: { component: "backpack" | "pockets"; slot: string };
            }

            export interface IBaseItem {
                /*
                 * Item Type
                 */
                type: RageShared.Inventory.Enums.ITEM_TYPES;

                typeCategory: RageShared.Inventory.Enums.ITEM_TYPE_CATEGORY;

                /*
                 * Whether item is placed in clothes or not
                 */
                isPlaced: boolean;

                /*
                 * Item Quality Level -1 to 4
                 */
                quality: number;

                /*
                 * Item Image
                 */
                image: string;

                /*
                 * Unique item hash, also used as linked to a child item
                 */
                hash: string;

                /*
                 * Item key, contains clothes data such as component id, drawable and texture id.
                 */
                key: string;

                /*
                 * Item render image, shows when you click an item in the inventory slots
                 */
                render: string;

                /*
                 * Item name
                 */
                name: string;

                /*
                 * Item description
                 */
                description: string;

                /*
                 * Item count, also determines whether you can split an item up
                 */
                count: number;

                /**
                 * Item weight, how much an item weights
                 */
                weight: number;

                /*
                 * Item max stack, determines the count of an item that can be stacked together in one slot
                 */
                maxStack: number;

                /*
                 * Item options, used when you right click an item.
                 */
                options: string[];

                /*
                 * Item gender, used on clothes whether its for females or males.
                 */
                gender: number | null;

                /**
                 * Items within item, used on backpacks
                 */
                items?: { [key: number]: RageShared.Inventory.Interfaces.IBaseItem | null };

                /**
                 * Prop model name or hash that will be used to create object when dropping item
                 */
                modelHash?: string;

                /**
                 * Ammo type, setting item ammo type will check later on whether the ammo fits the weapon player is using.
                 */
                ammoType?: string;

                /**
                 * Used to store how many ammo player's weapon has in clip, so later on can force-set them when the player re-equip the weapon.
                 */
                ammoInClip?: number; //ammo in weapon clip

                /**
                 * Used for armour only, contains the amount of armour an item has.
                 */
                amount?: number; //used for armor to contain its amount

                //a feature to be developed whether the item will have an effect or not
                effect?: {
                    [key: string]: number;
                };

                //will be used for weapon attachments in future
                components?: Array<number>;
            }
        }
    }
}
