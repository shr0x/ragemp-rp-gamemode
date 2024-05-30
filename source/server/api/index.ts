import { Utils } from "../../shared/utils.module";
import { CefEvent } from "../classes/CEFEvent.class";
import { CommandRegistry } from "../classes/Command.class";
import { DynamicPoint } from "../classes/Point.class";
import { Vehicle } from "../classes/Vehicle.class";
import { MainDataSource } from "../database/Database.module";

export namespace RAGERP {
    export const database = MainDataSource;
    export const entities = {
        dynamicPoint: DynamicPoint,
        vehicle: Vehicle,
        doors: undefined,
        gates: undefined
    };
    export const utils = Utils;
    export const cef = CefEvent;
    export const commands = CommandRegistry;
}
