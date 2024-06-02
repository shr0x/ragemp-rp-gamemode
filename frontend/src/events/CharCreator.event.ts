import { useEffect } from "react";
import CreatorStore from "../stores/CharCreator.store";
import EventManager from "utils/EventManager.util";

export const InitCreatorEvents = (creatorStore: CreatorStore) => {
    return useEffect(() => {
        EventManager.addHandler("creator", "resetData", () => creatorStore.resetData());
        EventManager.addHandler("creator", "setData", (data: any) => creatorStore.fetchData(data));
        EventManager.stopAddingHandler("creator");
        return () => EventManager.removeTargetHandlers("creator");
    }, [creatorStore]);
};
