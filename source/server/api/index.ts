import { Utils } from "../../shared/utils.module";
import { CefEvent } from "../classes/CEFEvent.class";
import { CommandRegistry } from "../classes/Command.class";
import { DynamicPoint, dynamicPointPool } from "../classes/Point.class";
import { Vehicle, vehicleManager, vehiclePool } from "../classes/Vehicle.class";
import { MainDataSource } from "../database/Database.module";

/**
 * Namespace for the RAGERP system.
 * @namespace RAGERP
 */
export namespace RAGERP {
    /**
     * Main data source for the application.
     * @type {object}
     */
    export const database = MainDataSource;

    /**
     * Pools for different entities.
     * @type {object}
     */
    export const pools = {
        /**
         * Pool for vehicle entities.
         * @type {object}
         */
        vehicles: vehiclePool,

        /**
         * Pool for dynamic points.
         * @type {object}
         */
        points: dynamicPointPool
    };

    /**
     * Entities available in the system.
     * @type {object}
     */
    export const entities = {
        /**
         * Dynamic Points management.
         * @type {object}
         */
        points: {
            /**
             * Pool for dynamic points.
             * @type {object}
             */
            pool: dynamicPointPool,

            /**
             * Constructor for new dynamic points.
             * @type {DynamicPoint}
             */
            new: DynamicPoint
        },

        /**
         * Vehicle system management.
         * @type {object}
         */
        vehicles: {
            /**
             * Pool for vehicle entities.
             * @type {object}
             */
            pool: vehiclePool,

            /**
             * Manager for vehicle operations.
             * @type {object}
             */
            manager: vehicleManager,

            /**
             * Constructor for new vehicles.
             * @type {Vehicle}
             */
            new: Vehicle,

            /**
             * Alias for getting a vehicle by ID.
             * @type {function}
             */
            at: vehicleManager.at,

            /**
             * Alias for getting a vehicle by SQL ID.
             * @type {function}
             */
            atSQL: vehicleManager.atSQL,

            /**
             * Method for getting the nearest vehicle.
             * @type {function}
             */
            getNearest: vehicleManager.getNearest
        },

        /**
         * Placeholder for door controller.
         * @type {undefined}
         */
        doors: undefined,

        /**
         * Placeholder for gates controller.
         * @type {undefined}
         */
        gates: undefined
    };

    /**
     * Utility functions.
     * @type {object}
     */
    export const utils = Utils;

    /**
     * Client Event Framework events.
     * @type {object}
     */
    export const cef = CefEvent;

    /**
     * Command registry.
     * @type {object}
     */
    export const commands = CommandRegistry;
}
