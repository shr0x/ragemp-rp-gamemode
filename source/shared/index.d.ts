/// <reference path="./interfaces/index.d.ts" />

declare type StringifiedObject<T> = string & { __stringifiedObjectTag: T };
declare namespace RageShared {
    namespace Players {}
    namespace Vehicles {}
    namespace Cef {}

    namespace Interfaces {
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

        const enum ITEM_TYPE_CATEGORY {
            TYPE_CLOTHING = 0, //clothing item
            TYPE_PROP, //prop item

            TYPE_WEAPON, //weapon item
            TYPE_AMMO,
            TYPE_FOOD, //food item
            TYPE_DRINK, //drink item

            TYPE_MISC //misc
        }

        const enum ITEM_TYPES {
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
        const enum WEAPON_GROUP {
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
}
