export const Utils = {
    hasDatePassedTimestamp(timestamp: number): boolean {
        const currentTimestamp = Date.now();
        return currentTimestamp > timestamp;
    }
};
