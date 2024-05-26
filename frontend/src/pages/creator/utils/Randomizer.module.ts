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

    for (let i = 0; i < 20; i++) {
        //@ts-ignore
        store.data.face[i] = getRandom(-100, 100);
    }

    store.data.color.head = getRandom(0, store.data.sex === 0 ? 82 : 86);
    store.data.color.eyebrows = getRandom(0, 18);
    store.data.color.eyes = eyesRandom();

    EventManager.emitClient("creator", "random", store.data);
};
