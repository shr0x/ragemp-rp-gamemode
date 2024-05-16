import { makeObservable, observable, action } from "mobx";

const defaultData = {
    sex: 0,
    name: { firstname: "", lastname: "" },
    parents: { father: 0, mother: 0, leatherMix: 0, similarity: 0 },
    hair: { head: 0, eyebrows: 0, chest: 0, beard: 0 },
    face: {
        noseWidth: 0, // 0
        nosePeakHeight: 0, // 1
        nosePeakLength: 0, // 2
        noseBoneHeight: 0, // 3
        nosePeakLowering: 0, // 4
        noseBoneTwist: 0, // 5
        eyebrowHeight: 0, // 6
        eyebrowForward: 0, // 7
        cheekboneHeight: 0, // 8
        cheekboneWidth: 0, // 9
        cheekWidth: 0, // 10
        eyesWidth: 0, // 11
        lips: 0, // 12
        jawBoneWidth: 0, // 13
        jawBoneBackLength: 0, // 14
        ChimpBoneLowering: 0, // 15
        ChimpBoneLength: 0, // 16
        ChimpBoneWidth: 0, // 17
        ChimpHole: 0, // 18
        neckWidth: 0 // 19
    },
    color: { head: 0, eyebrows: 0, eyes: 0, chest: 0, beard: 0 }
};

export default class CreatorStore {
    data = defaultData;

    lastFather = 0;
    lastMother = 0;

    constructor() {
        makeObservable(this, {
            data: observable,
            lastFather: observable,
            lastMother: observable,

            fetchData: action.bound,
            resetData: action.bound
        });
    }

    fetchData(data: any) {
        return (this.data = data);
    }

    resetData() {
        this.data = defaultData;
        this.lastFather = 0;
        this.lastMother = 0;
    }

    destroy() {
        this.data = defaultData;
        this.lastFather = 0;
        this.lastMother = 0;
    }
}
