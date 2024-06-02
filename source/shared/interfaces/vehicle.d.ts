declare namespace RageShared.Vehicles {
    namespace Interfaces {
        interface IVehicleData {
            isActive: boolean;
            gear: number;
            speed: number;
            engine: boolean;
            locked: boolean;
            lights: boolean;
            maxSpeed: number;
        }
    }

    namespace Enums {
        const enum VEHICLETYPES {
            NONE = 0,
            OWNED = 1,
            FACTION = 2,
            RENTAL = 3,
            JOB = 4,
            ADMIN = 5
        }

        const enum VEHICLE_CLASS {
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

        const enum VEHICLEMODS {
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

        const enum VEHICLE_MOD_NAMES {
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

        const enum VEHICLE_COLOR_TYPES {
            TYPE_NORMAL = 0, //           0: Normal
            TYPE_METALIC = 1, // 1: Metallic
            TYPE_PEARL = 2, //2: Pearl
            TYPE_MATTE = 3, //3: Matte
            TYPE_METAL = 4, //: Metal
            TYPE_CHROME = 5 //: Chrome
        }
    }
}
