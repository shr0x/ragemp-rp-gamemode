import { useEffect } from "react";
import EventManager from "../utils/EventManager.util";
import PlayerStore from "store/Player.store";

export const InitPlayerEvents = (store: PlayerStore) => {
    return useEffect(() => {
        EventManager.addHandler("player", "setCharacters", (data: any[]) => store.setCharacters(data));
        EventManager.addHandler("player", "setNowPlaying", (amount: number) => store.setNowPlaying(amount));
        EventManager.addHandler("player", "setPlayerData", (data: any, key: any) => store.setData(data, key));

        EventManager.stopAddingHandlers("player");
        return () => EventManager.removeTargetHandlers("player");
    }, [store]);
};
