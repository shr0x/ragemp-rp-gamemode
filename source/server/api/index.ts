import { CefEvent } from "../classes/CEFEvent.class";
import { CommandRegistry } from "../classes/Command.class";
import { DynamicPoint } from "../classes/DynamicPoint.class";
import { MainDataSource } from "../database/Database.module";

export namespace RAGERP {
    export const database = MainDataSource;
    export const entities = {
        dynamicPoint: DynamicPoint,
        doors: undefined,
        gates: undefined
    };

    export const cef = CefEvent;
    export const commands = CommandRegistry;
}
