import { useCallback } from "react";
import { values } from "mobx";
import { ICurrentItem } from "../Interfaces";
import { inventoryStore } from "store/Inventory.store";
import EventManager from "utils/EventManager.util";
import Notification from "utils/NotifyManager.util";

export const OnPlayerTakeItemOff = (setItem: (item: ICurrentItem) => void, currentItem: ICurrentItem, store: typeof inventoryStore) => {
    return useCallback(() => {
        if (currentItem.id === null) return;

        const clothesData = store.clothes[currentItem.id];
        if (!clothesData) return;
        let component;
        let id;
        const item = { ...clothesData };

        const pocketsFreeIndex = values(store.inventory.pockets).findIndex((el) => !el);

        if (item.type === "backpack" && values(store.inventory.backpack).findIndex((el) => el !== null) >= 0) {
            return Notification.error("Take the items off your backpack before taking it off.");
        }

        if (item.weight + store.currentWeight <= store.maxInventoryWeight) {
            if (pocketsFreeIndex >= 0) {
                store.changeInventoryData({ component: "pockets", id: pocketsFreeIndex }, { ...item }, true);
                id = pocketsFreeIndex;
                component = "pockets";
            } else if (store.clothes[7] && store.clothes[7].isPlaced) {
                const backpackFreeIndex = values(store.inventory.backpack).findIndex((el) => !el);
                if (item.type === "backpack") return Notification.error("Not enough inventory space");
                store.changeInventoryData({ component: "backpack", id: backpackFreeIndex }, { ...item }, true);
                id = backpackFreeIndex;
                component = "backpack";
            } else return Notification.error("Not enough inventory space");
        } else return Notification.error("Not enough inventory space");

        setItem({ component, id, options: item.options ?? null });
        store.changeInventoryData(currentItem, null, true);

        EventManager.emitServer("inventory", "onMoveItem", {
            item: item,
            source: { component: currentItem.component, slot: `${currentItem.id}` },
            target: { component: component, slot: `${id}`, item: null }
        });
    }, [currentItem, setItem, store]);
};
