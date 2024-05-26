import { useCallback } from "react";
import { CenterComponent, ICurrentItem } from "../Interfaces";

import InventoryStore from "store/Inventory.store";
import Notification from "utils/NotifyManager.util";
import EventManager from "utils/EventManager.util";

export const OnPlayerDropItem = (
    currentItem: ICurrentItem,
    store: InventoryStore,
    viewingBackpack: string | null,
    setItem: (item: ICurrentItem) => void,
    setMiddleComponent: (comp: CenterComponent) => void
) => {
    return useCallback(
        (isAccepted?: boolean) => {
            if (currentItem.id === null || currentItem.component === null) return;
            if (currentItem.component === "quickUse") return Notification.error("You cannot drop an item from fast slots.");
            if (currentItem.component === "groundItems") return Notification.error("You cant drop an item that's already dropped.");

            const item =
                currentItem.component === "backpack"
                    ? (viewingBackpack && store.backpackData[viewingBackpack][currentItem.id]) || null
                    : currentItem.component === "clothes"
                    ? store.clothes[currentItem.id]
                    : store.inventory[currentItem.component][currentItem.id];
            if (!item) return;

            if (item.quality >= 3 && !isAccepted) {
                setMiddleComponent("confirmDrop");
                EventManager.emitServer("inventory", "confirmItemDrop");
            } else {
                setMiddleComponent("dropZone");
                setItem({ component: null, id: null, options: null });

                const dropItemData = {
                    item: item,
                    source:
                        currentItem.component === "backpack" && viewingBackpack
                            ? { component: currentItem.component, slot: `${currentItem.id}`, viewingBackpack }
                            : { component: currentItem.component, slot: `${currentItem.id}` }
                };
                EventManager.emitServer("inventory", "onDropItem", dropItemData);
            }
        },
        [currentItem.component, currentItem.id, setItem, setMiddleComponent, store.backpackData, store.clothes, store.inventory, viewingBackpack]
    );
};
