import InventoryStore, { IBaseItem } from "store/Inventory.store";
import { ICurrentItem } from "../Interfaces";
import { useCallback } from "react";
import EventManager from "utils/EventManager.util";
import Notification from "utils/NotifyManager.util";
import { values } from "mobx";

export const OnPlayerPutItemOn = (setItem: (item: ICurrentItem) => void, gender: number, currentItem: ICurrentItem, store: InventoryStore, viewingBackpack: string | null) => {
    return useCallback(
        (item?: IBaseItem) => {
            if (currentItem.id === null || currentItem.component === null) return;

            const target = item ? item : { ...store.inventory[currentItem.component][currentItem.id] };
            if (target.gender && target.gender !== gender) return Notification.error("This clothing type is not suitable for you.");

            const items: { [key: string]: number } = {
                hat: 0,
                mask: 1,
                glasses: 2,
                earRings: 3,
                chain: 4,
                tShirt: 5,
                top: 6,
                backpack: 7,
                wallet: 8,
                armour: 9,
                watch: 10,
                gloves: 11,
                pants: 12,
                shoes: 13
            };
            const id = items[target.type ?? ""];

            const drop = { ...store.clothes[id] };

            const freeIndex =
                currentItem.component === "backpack"
                    ? (viewingBackpack && values(store.findItemByUUID(viewingBackpack)?.items).findIndex((el) => !el)) || -1
                    : currentItem.component === "groundItems"
                    ? values(store.sideInventory).findIndex((el) => !el)
                    : values(store.inventory[currentItem.component]).findIndex((el) => !el);

            if (target.hash === drop.hash) return Notification.error("You are already wearing this item.");

            if (target.count === 1) {
                if (drop.isPlaced) store.changeInventoryData(currentItem, { ...drop }, false, viewingBackpack);
                else store.changeInventoryData(currentItem, null, false, viewingBackpack);

                store.changeInventoryData({ component: "clothes", id }, { ...target, isPlaced: true }, true);

                const moveItemData = {
                    item: target,
                    source: { component: currentItem.component, slot: `${currentItem.id}` },
                    target: { component: "clothes", slot: `${id}`, item: drop.isPlaced ? drop : null }
                };
                EventManager.emitServer("inventory", "onMoveItem", moveItemData);
            } else {
                if (drop.isPlaced) {
                    if (freeIndex < 0) return Notification.error("Not enough inventory space");
                    store.changeInventoryData({ component: currentItem.component, id: freeIndex }, { ...drop }, false, viewingBackpack);
                }

                const item = store.inventory[currentItem.component][currentItem.id];
                if (!item) return Notification.error(">> !item is null");
                item.count -= 1;
                store.changeInventoryData({ component: "clothes", id }, { ...target, count: 1, isPlaced: true }, true, viewingBackpack);

                const splitItemData = {
                    item: target,
                    source: { component: currentItem.component, slot: `${currentItem.id}` },
                    target: { component: "clothes", count: 1, slot: `${id}` }
                };
                EventManager.emitServer("inventory", "onSplitItem", splitItemData);
            }
            setItem({ component: "clothes", id, options: store.clothes[id]?.options ?? [] });
        },
        [currentItem, gender, setItem, store, viewingBackpack]
    );
};
