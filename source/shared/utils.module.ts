export const Utils = {
    sleep: function (ms: number) {
        return new Promise((res) => setTimeout(res, ms));
    },

    tryParse(obj: any): any {
        try {
            return JSON.parse(obj);
        } catch (_err) {
            return obj;
        }
    },
    mergeObjects<T extends object, K extends keyof T>(obj1: T, obj2: T): T {
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
        //@ts-ignore
        mp.events.callRemote("server::client:debug", message, ...args);
    },
    getRandomFromArray: <T>(array: Array<T>) => {
        return array[Math.floor(Math.random() * array.length)];
    }
};
