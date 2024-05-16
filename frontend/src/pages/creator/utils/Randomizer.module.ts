import CreatorStore from "store/CharCreator.store";
import EventManager from "utils/EventManager.util";

export const setRandomOptions = (store: CreatorStore) => {
    const getRandom = (min: number, max: number) => {
        return Math.floor(Math.random() * (max - min)) + min;
    };

    const eyesRandom = () => {
        let i = getRandom(0, 11);
        if (i <= 7) return i;
        else return 11;
    };

    store.data.parents.mother = getRandom(0, 21);
    store.data.parents.father = getRandom(0, 23);

    store.data.hair.head = getRandom(0, 22);
    store.data.hair.eyebrows = getRandom(0, 33);

    if (store.data.sex === 0) {
        store.data.hair.chest = getRandom(0, 16);
        store.data.hair.beard = getRandom(0, 28);
        store.data.color.chest = getRandom(0, 18);
        store.data.color.beard = getRandom(0, 18);
    }

    store.data.parents.leatherMix = getRandom(-100, 100);
    store.data.parents.similarity = getRandom(-100, 100);

    store.data.face.noseWidth = getRandom(-100, 100);
    store.data.face.nosePeakHeight = getRandom(-100, 100);
    store.data.face.nosePeakLength = getRandom(-100, 100);
    store.data.face.noseBoneHeight = getRandom(-100, 100);
    store.data.face.nosePeakLowering = getRandom(-100, 100);
    store.data.face.noseBoneTwist = getRandom(0, 100);
    store.data.face.eyebrowHeight = getRandom(-100, 100);
    store.data.face.eyebrowForward = getRandom(-100, 100);
    store.data.face.cheekboneHeight = getRandom(-100, 100);
    store.data.face.cheekboneWidth = getRandom(-100, 100);
    store.data.face.cheekWidth = getRandom(-100, 100);
    store.data.face.eyesWidth = getRandom(-100, 100);
    store.data.face.lips = getRandom(-100, 100);
    store.data.face.jawBoneWidth = getRandom(-100, 100);
    store.data.face.jawBoneBackLength = getRandom(-100, 100);
    store.data.face.ChimpBoneLowering = getRandom(-100, 100);
    store.data.face.ChimpBoneLength = getRandom(-100, 100);
    store.data.face.ChimpBoneWidth = getRandom(-100, 100);
    store.data.face.ChimpHole = getRandom(-100, 100);
    store.data.face.neckWidth = getRandom(-100, 100);

    store.data.color.head = getRandom(0, 18);
    store.data.color.eyebrows = getRandom(0, 18);
    store.data.color.eyes = eyesRandom();

    EventManager.emitClient("creator", "random", store.data);
};
