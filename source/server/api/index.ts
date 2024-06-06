import { Utils } from "../../shared/utils.module";
import { CefEvent } from "../classes/CEFEvent.class";
import { CommandRegistry } from "../classes/Command.class";
import { DynamicPoint, dynamicPointPool } from "../classes/Point.class";
import { Vehicle, vehicleManager, vehiclePool } from "../classes/Vehicle.class";
import { MainDataSource } from "../database/Database.module";

export namespace RAGERP {
    export const database = MainDataSource;
    export const pools = {
        vehicles: vehiclePool
    };
    export const entities = {
        points: {
            pool: dynamicPointPool,
            new: DynamicPoint
        },
        vehicles: {
            pool: vehiclePool,
            manager: vehicleManager,
            new: Vehicle,

            /* aliases */
            at: vehicleManager.at,
            atSQL: vehicleManager.atSQL,
            getNearest: vehicleManager.getNearest
        },
        doors: undefined,
        gates: undefined
    };
    export const utils = Utils;
    export const cef = CefEvent;
    export const commands = CommandRegistry;
}
