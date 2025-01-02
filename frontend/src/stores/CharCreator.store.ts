import { observable, makeAutoObservable } from "mobx";
import EventManager from "utils/EventManager.util";

const defaultData = {
    sex: 0,
    name: { firstname: "", lastname: "" },
    parents: { father: 0, mother: 0, leatherMix: 0, similarity: 0 },
    hair: { head: 0, eyebrows: 0, chest: 0, beard: 0 },
    face: {
        0: 0, // 0 > noseWidth
        1: 0, // 1 > nosePeakHeight
        2: 0, // 2 > nosePeakLength
        3: 0, // 3 > noseBoneHeight
        4: 0, // 4 > nosePeakLowering
        5: 0, // 5 > noseBoneTwist
        6: 0, // 6 > eyebrowHeight
        7: 0, // 7 > eyebrowForward
        8: 0, // 8 > cheekboneHeight
        9: 0, // 9 > cheekboneWidth
        10: 0, // 10 > cheekWidth
        11: 0, // 11 > eyesWidth
        12: 0, // 12 > lips
        13: 0, // 13 > jawBoneWidth
        14: 0, // 14 > jawBoneBackLength
        15: 0, // 15 > ChimpBoneLowering
        16: 0, // 16 > ChimpBoneLength
        17: 0, // 17 > ChimpBoneWidth
        18: 0, // 18 > ChimpHole
        19: 0 // 19 > neckWidth
    },
    clothes: {
        hats: {
            drawable: 0 as number,
            texture: 0 as number,
        },
        tops: {
            drawable: 0 as number,
            texture: 0 as number,
        },
        pants: {
            drawable: 0 as number,
            texture: 0 as number,
        },
        shoes: {
            drawable: 0 as number,
            texture: 0 as number,
        } as any,
    },
    color: { head: 0, eyebrows: 0, eyes: 0, chest: 0, beard: 0 }
};

class _CreatorStore {
    data = observable.object(defaultData);
    lastFather = 0;
    lastMother = 0;
    constructor() {
        makeAutoObservable(this);
        this.createEvents();
    }

    fetchData(data: any) {
        return (this.data = data);
    }

    resetData() {
        this.data = defaultData;
        this.lastFather = 0;
        this.lastMother = 0;
    }

    public createEvents() {
        EventManager.addHandler("creator", "resetData", () => this.resetData());
        EventManager.addHandler("creator", "setData", (data: typeof this.data) => this.fetchData(data));
        EventManager.stopAddingHandler("creator");
    }
}
export const creatorStore = new _CreatorStore();
