import { useEffect } from "react";
import EventManager from "../utils/EventManager.util";
import HudStore from "store/Hud.store";

export const InitHudEvents = (store: HudStore) => {
    return useEffect(() => {
        EventManager.addHandler("hud", "setInteraction", (data: any) => store.setInteractionMenu(data))
        return () => EventManager.removeTargetHandlers("hud");
    }, [store]);
};
