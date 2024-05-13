type StringifiedObject<T> = string & { __stringifiedObjectTag: T };

export const Utils = {
    tryParse(obj: any): any {
        try {
            return JSON.parse(obj);
        } catch (_err) {
            return obj;
        }
    },
    distanceToPos(first: Vector3, second: Vector3): number {
        return Math.abs(Math.sqrt(Math.pow(second.x - first.x, 2) + Math.pow(second.y - first.y, 2) + Math.pow(second.z - first.z, 2)));
    },
    stringifyObject<T>(obj: T): StringifiedObject<T> {
        return JSON.stringify(obj) as StringifiedObject<T>;
    },
    parseObject<T>(str: StringifiedObject<T>): T {
        return JSON.parse(str);
    },

    clientDebug: (message: string, ...args: any): void => {
        mp.events.callRemote("server::client:debug", message, ...args);
    }
};
