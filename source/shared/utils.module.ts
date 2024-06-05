import { StringifiedObject } from "./index";
/**
 * Utility functions used throughout the client and server side
 */
export const Utils = {
    /**
     * Delays execution for a specified number of milliseconds.
     * @param {number} ms - The number of milliseconds to sleep.
     * @returns {Promise<void>} A promise that resolves after the specified delay.
     */
    sleep: function (ms: number): Promise<void> {
        return new Promise((res) => setTimeout(res, ms));
    },

    /**
     * Checks if the current date has passed a given timestamp.
     * @param {number} timestamp - The timestamp to compare against the current date.
     * @returns {boolean} True if the current date has passed the timestamp, otherwise false.
     */
    hasDatePassedTimestamp: function (timestamp: number): boolean {
        const currentTimestamp = Date.now();
        return currentTimestamp > timestamp;
    },

    /**
     * Attempts to parse a JSON string.
     * @param {any} obj - The object to parse.
     * @returns {any} The parsed object if successful, otherwise the original object.
     */
    tryParse: function (obj: any): any {
        try {
            return JSON.parse(obj);
        } catch (_err) {
            return obj;
        }
    },

    /**
     * Merges two objects into one.
     * @template T
     * @param {T} obj1 - The first object.
     * @param {T} obj2 - The second object.
     * @returns {T} A new object containing properties from both input objects.
     */
    mergeObjects: function <T extends object, K extends keyof T>(obj1: T, obj2: T): T {
        const newObj: T = {} as T;
        Object.keys(obj1).forEach((key) => {
            newObj[key as K] = obj1[key as K];
        });
        let startIndex = Object.keys(obj1).length + 1;
        Object.keys(obj2).forEach((key) => {
            if (Object.prototype.hasOwnProperty.call(newObj, key)) {
                newObj[(startIndex++).toString() as K] = obj2[key as K];
            } else {
                newObj[key as K] = obj2[key as K];
            }
        });
        return newObj;
    },

    /**
     * Calculates the distance between two 3D points.
     * @param {Vector3} first - The first point.
     * @param {Vector3} second - The second point.
     * @returns {number} The distance between the two points.
     */
    distanceToPos: function (first: Vector3, second: Vector3): number {
        return Math.abs(Math.sqrt(Math.pow(second.x - first.x, 2) + Math.pow(second.y - first.y, 2) + Math.pow(second.z - first.z, 2)));
    },

    /**
     * Converts an object to a JSON string.
     * @template T
     * @param {T} obj - The object to stringify.
     * @returns {StringifiedObject<T>} The JSON string representation of the object.
     */
    stringifyObject: function <T>(obj: T): StringifiedObject<T> {
        return JSON.stringify(obj) as StringifiedObject<T>;
    },

    /**
     * Parses a JSON string back into an object.
     * @template T
     * @param {StringifiedObject<T>} str - The JSON string to parse.
     * @returns {T} The parsed object.
     */
    parseObject: function <T>(str: StringifiedObject<T>): T {
        return JSON.parse(str);
    },

    /**
     * Sends a debug message to the server.
     * @param {string} message - The debug message.
     * @param {...any} args - Additional arguments to include with the message.
     */
    clientDebug: function (message: string, ...args: any): void {
        //@ts-ignore
        mp.events.callRemote("server::client:debug", message, ...args);
    },

    /**
     * Returns a random element from an array.
     * @template T
     * @param {Array<T>} array - The array to sample from.
     * @returns {T} A random element from the array.
     */
    getRandomFromArray: function <T>(array: Array<T>): T {
        return array[Math.floor(Math.random() * array.length)];
    }
};
