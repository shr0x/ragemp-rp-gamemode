import { useEffect } from "react";
import EventManager from "../utils/EventManager.util";
import InventoryStore, { IBaseItem } from "store/Inventory.store";

export const InitInventoryEvents = (store: InventoryStore) => {
    useEffect(() => {
        EventManager.addHandler("inventory", "setVisible", (enable: boolean) => store.setVisible(enable));
        EventManager.addHandler("inventory", "setClothes", (obj: { [key: number]: IBaseItem }) => store.fetchClothesData(obj));
        EventManager.addHandler("inventory", "setClothesItem", (id: number, data: IBaseItem) => store.setClothesData(id, data));

        EventManager.addHandler("inventory", "setInventory", (obj: { [key: string]: { [key: number]: IBaseItem | null } }) => store.fetchInventoryData(obj));
        EventManager.addHandler("inventory", "setQuickUseItems", (obj: { [key: number]: { component: string; id: number } | null }) => store.fetchQuickUseItems(obj));
        EventManager.addHandler("inventory", "setInventoryItem", (component: string, slot: number, obj: IBaseItem | null) => store.fetchInventoryItem(component, slot, obj));

        EventManager.addHandler("inventory", "setDroppedItems", (items: any) => store.fetchGroundItems(items));

        EventManager.addHandler("inventory", "setPlayersAround", (array: any) => store.fetchPlayersAround(array));
        EventManager.addHandler("inventory", "setMaxWeight", (weight: number) => store.setInventoryMaxWeight(weight));

        return () => EventManager.removeTargetHandlers("inventory");
    }, [store]);
};
