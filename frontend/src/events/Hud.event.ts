import { useEffect } from "react";
import EventManager from "../utils/EventManager.util";
import HudStore from "store/Hud.store";

export const InitHudEvents = (store: HudStore) => {
    useEffect(() => {
        EventManager.addHandler("hud", "setInteraction", (data: any) => store.setInteractionMenu(data));
        EventManager.addHandler("hud", "setVehicleData", (data: any) => store.setVehicleData(data));
        EventManager.addHandler("hud", "setAreaData", (data: { area: string; street: string }) => store.setAreaData(data));

        EventManager.stopAddingHandlers("hud");
        return () => EventManager.removeTargetHandlers("hud");
    }, [store]);
};
