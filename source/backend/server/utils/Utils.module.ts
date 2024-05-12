export const Utils = {
    sleep: async (ms: number) => {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
};
