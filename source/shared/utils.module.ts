export const Utils = {
    distanceToPos: (v1: Vector3, v2: Vector3) => {
        return Math.abs(Math.sqrt(Math.pow(v2.x - v1.x, 2) + Math.pow(v2.y - v1.y, 2) + Math.pow(v2.z - v1.z, 2)));
    },
    parseObject(obj: any) {
        try {
            return JSON.parse(obj);
        } catch (_err) {
            return obj;
        }
    },
    clientDebug(message: string, ...args: any) {
        mp.events.callRemote("server::client:debug", message, ...args);
    }
};
