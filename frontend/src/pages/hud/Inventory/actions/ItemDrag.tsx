import { useCallback } from "react";
import { values } from "mobx";

import { ICurrentItem, IDropCell, ITargetCell } from "../Interfaces";
import Notification from "utils/NotifyManager.util";
import EventManager from "utils/EventManager.util";
import { RageShared } from "../../../../../../source/shared";
import { inventoryStore } from "store/Inventory.store";

export const OnPlayerDragItem = (
    gender: number,
    isCellDragged: boolean,
    targetCell: ITargetCell,
    store: typeof inventoryStore,
    dropCell: IDropCell,
    viewingBackpack: string | null,
    setItem: (item: ICurrentItem) => void,
    setTargetCell: (target: ITargetCell) => void,
    setDropCell: (slot: IDropCell) => void,
    setCellDragged: (enable: boolean) => void,
    handleDrop: () => void,
    putItemOn: (target: RageShared.Inventory.Interfaces.IBaseItem) => void
) => {
    return useCallback(() => {
        if (!isCellDragged) return;

        const getTargetItem = () => {
            const { id, component } = targetCell;
            if (id === null || component === null) {
                return null;
            }

            let targetItem: RageShared.Inventory.Interfaces.IBaseItem | null = null;
            if (component === "quickUse") {
                const quickUseData = store.quickUse[id];
                if (quickUseData && quickUseData.component && quickUseData.id !== null) {
                    targetItem = store.inventory[quickUseData.component]?.[quickUseData.id];
                }
            } else if (component === "backpack" && viewingBackpack) {
                targetItem = store.getBackpackItemData(viewingBackpack, id);
            } else if (component === "groundItems") {
                targetItem = store.sideInventory[id];
            } else {
                targetItem = component === "clothes" ? store.clothes[id] : store.inventory[component][id];
            }
            return targetItem;
        };

        const target = getTargetItem();

        const getItemOptions = (targetCell: ITargetCell) => {
            const { id, component } = targetCell;
            if (id === null || component === null) return [];

            const componentMapping: { [key: string]: string[] | undefined } = {
                clothes: store.clothes[id]?.options,
                pockets: store.inventory.pockets[id]?.options,
                backpack: viewingBackpack ? store.getBackpackItemData(viewingBackpack, id)?.options : [],
                quickUse: (() => {
                    const quickUseData = store.quickUse[id];
                    if (quickUseData && quickUseData.component && quickUseData.id !== null) {
                        return store.inventory[quickUseData.component]?.[quickUseData.id]?.options;
                    }
                    return [];
                })()
            };

            return componentMapping[component] ?? [];
        };

        const handleAction = (options: any, notification?: string) => {
            if (targetCell.id === null || targetCell.component === null) return;
            setItem({ ...options });
            setTargetCell({ component: null, id: null });
            setDropCell({ component: null, id: null });
            setCellDragged(false);
            if (notification) {
                Notification.error(notification);
            }
        };

        const error = (subtitle: string) => {
            const options = getItemOptions(targetCell);
            handleAction({ ...targetCell, options }, subtitle);
        };

        const cancel = (notification?: string) => {
            const options = getItemOptions(targetCell);
            handleAction({ ...targetCell, options }, notification);
        };

        const success = () => {
            if (dropCell.id === null || dropCell.component === null) return;
            const options = getItemOptions(dropCell);
            handleAction({ ...dropCell, options });
            if (targetCell.component === dropCell.component && targetCell.id === dropCell.id) return;

            const sendData = {
                item: target,
                source: { component: targetCell.component, slot: `${targetCell.id}` },
                target: {
                    component: dropCell.component,
                    slot: `${dropCell.id}`,
                    item: dropCell.component === "clothes" && itemDropData && !itemDropData.isPlaced ? null : dropCell.component === "quickUse" ? null : itemDropData
                },
                backpackHash: viewingBackpack
            };
            EventManager.emitServer("inventory", "onMoveItem", sendData);
            return;
        };

        if (dropCell.id === targetCell.id && dropCell.component === targetCell.component) return cancel();
        if (!targetCell.component || targetCell.id === null) return cancel();

        if (!target || !dropCell.component) return cancel();

        if (targetCell.component === "quickUse") {
            if (!dropCell.component || dropCell.id === null) return cancel();
            if (dropCell.component === "quickUse") {
                const item = store.quickUse[targetCell.id];
                store.changeInventoryData({ component: "quickUse", id: targetCell.id }, store.quickUse[dropCell.id], false);
                store.changeInventoryData({ component: "quickUse", id: dropCell.id }, item, true);
                return success();
            }
            if (dropCell.component !== "pockets") return cancel("You can't move a quick use item here!");
            const quickUseData = store.quickUse[targetCell.id];
            if (!quickUseData || !quickUseData.component || quickUseData.id === null) return cancel("Invalid quick use item! > contact an admin.");
            const linkedQuickUseItem = store.inventory[quickUseData.component][quickUseData.id];
            if (!linkedQuickUseItem) return cancel("This quick use item isn't valid! Contact an admin");
            const slotIndex = Object.values(store.inventory[quickUseData.component]).findIndex((_x, e) => e === quickUseData.id);
            store.changeInventoryData({ component: "quickUse", id: targetCell.id }, null, false);
            setItem({ component: dropCell.component, id: slotIndex, options: linkedQuickUseItem.options });
            setTargetCell({ component: null, id: null });
            setDropCell({ component: null, id: null });
            setCellDragged(false);
            const sendData = {
                item: linkedQuickUseItem,
                source: { component: targetCell.component, slot: `${targetCell.id}` },
                target: { component: dropCell.component, slot: `${slotIndex}`, item: null }
            };
            return EventManager.emitServer("inventory", "onMoveItem", sendData);
        }

        if (targetCell.component !== "pockets" && dropCell.component === "quickUse") {
            return cancel("You can only put an item to quick use from your pocket.");
        }

        if (dropCell.component !== "pockets" && store.isItemInQuickUse(targetCell.component, targetCell.id)) {
            return cancel("This item is placed in quick use, remove it from there before moving it elsewhere.");
        }

        if (dropCell.component === "backpack" && target.type === "backpack") {
            return cancel("You can't put a backpack inside a backpack.");
        }

        // if (dropCell.component === "trade") {
        //     if (targetCell.component === "quickUse") {
        //         return cancel("Remove the item from the fast slots first.");
        //     }
        //     EventManager.emitServer("inventory", "onGiveItemAway");
        //     setTargetCell({ component: null, id: null });
        //     setDropCell({ component: null, id: null });
        //     setCellDragged(false);
        //     return giveItemAway();
        // }

        if (dropCell.component === "remove") {
            if (targetCell.component === "quickUse") return cancel("Remove the item from the fast slots first.");
            setTargetCell({ component: null, id: null });
            setDropCell({ component: null, id: null });
            setCellDragged(false);
            return handleDrop();
        }

        if (dropCell.component === "putOn") {
            const clothes = ["hat", "glasses", "tShirt", "mask", "top", "backpack", "armour", "watch", "gloves", "pants", "shoes", "wallet"];
            if (target.isPlaced) return error("You are already wearing this item 2");

            if (clothes.includes(target.type)) {
                if (target.gender && target.gender !== gender) return error("Gender mismatch");
                setTargetCell({ component: null, id: null });
                setDropCell({ component: null, id: null });
                setCellDragged(false);
                return putItemOn(target);
            } else return error("The item cannot be equipped");
        }
        if (dropCell.id === null) return cancel("ERROR #303, contact an admin!");

        if (dropCell.component === "quickUse") {
            if (values(store.quickUse).findIndex((el) => el && el.component === targetCell.component && el.id === targetCell.id) >= 0) return error("This item is already on quick use.");
            if (target.options.indexOf("fast") >= 0) {
                store.changeInventoryData({ component: "quickUse", id: dropCell.id }, targetCell, true);
                return success();
            } else return error("The item cannot be placed into quick access");
        }

        if (dropCell.component === "groundItems") return error("You cant move items here, use the drop zone to drop them.");

        const itemDropData =
            dropCell.component === "backpack"
                ? store.getBackpackItemData(viewingBackpack, dropCell.id) || null
                : dropCell.component === "clothes"
                ? store.clothes[dropCell.id]
                : store.inventory[dropCell.component][dropCell.id];

        if (
            (targetCell.component !== dropCell.component && targetCell.component === "pockets" && dropCell.component !== "backpack") ||
            (targetCell.component === "backpack" && dropCell.component !== "pockets")
        ) {
            if (target.weight * target.count + Number(store.currentWeight) > store.maxInventoryWeight) return error("You dont have any more space in your inventory here");
        }

        if (dropCell.component === "clothes") {
            const items: { [key: number]: string } = {
                0: "hat",
                1: "mask",
                2: "glasses",
                3: "earRings",
                4: "chain",
                5: "tShirt",
                6: "top",
                7: "backpack",
                8: "wallet",
                9: "armour",
                10: "watch",
                11: "gloves",
                12: "pants",
                13: "shoes"
            };
            if (targetCell.component !== "clothes" && target.type === items[dropCell.id]) {
                if (target.hash === itemDropData?.hash) return error("You are already wearing this item.");
                if (target.gender && target.gender !== gender) return error("Gender mismatch");
                if (itemDropData?.isPlaced) store.changeInventoryData(targetCell, { ...itemDropData }, false, viewingBackpack);
                else store.changeInventoryData(targetCell, null, false, viewingBackpack);
                store.changeInventoryData(dropCell, { ...target, isPlaced: true }, true);
                return success();
            } else return error("The item cannot be placed in this location");
        }

        if (targetCell.component === "clothes") {
            if (dropCell.component !== "clothes" && dropCell.component !== "quickUse") {
                if (target.type === "backpack" && dropCell.component === "backpack") return error("You cant put a backpack inside a backpack");
                if (target.weight * target.count + Number(store.currentWeight) > store.maxInventoryWeight) return error("You cant hold any more items");
                if (itemDropData !== null) {
                    if (itemDropData.type !== target.type || itemDropData.key !== target.key || itemDropData.quality !== target.quality) return error("The item cannot be placed in this location");
                    else if (itemDropData.count + target.count <= itemDropData.maxStack) {
                        store.changeInventoryData(dropCell, { ...target, count: target.count + itemDropData.count }, true);
                    } else {
                        const freeIndex = values(store.inventory[dropCell.component]).findIndex((el) => !el);
                        if (freeIndex < 0) return error("Not enough inventory space");
                        store.changeInventoryData({ component: dropCell.component, id: freeIndex }, { ...target }, true);
                    }
                } else {
                    store.changeInventoryData(dropCell, { ...target, isPlaced: false }, false, viewingBackpack);
                }
                store.changeInventoryData(targetCell, { type: target.type, isPlaced: false, quality: -1, image: target.image }, true);
                return success();
            }
        }

        const isTargetInQuickUse = values(store.quickUse).findIndex((el) => el && el.component === targetCell.component && el.id === targetCell.id);
        const isDropToInQuickUse = values(store.quickUse).findIndex((el) => el && el.component === dropCell.component && el.id === dropCell.id);
        const isTargetEqualsDrop =
            target.key === itemDropData?.key &&
            target.type === itemDropData.type &&
            target.quality === itemDropData.quality &&
            (dropCell.component !== targetCell.component || dropCell.id !== targetCell.id);

        if (isTargetInQuickUse >= 0) store.quickUse[isTargetInQuickUse] = { component: dropCell.component, id: dropCell.id };
        if (isDropToInQuickUse >= 0) store.quickUse[isDropToInQuickUse] = { component: targetCell.component, id: targetCell.id };

        if (!isTargetEqualsDrop) {
            if (isTargetInQuickUse >= 0) store.quickUse[isTargetInQuickUse] = { component: dropCell.component, id: dropCell.id };
            if (isDropToInQuickUse >= 0) store.quickUse[isDropToInQuickUse] = { component: targetCell.component, id: targetCell.id };
            store.changeInventoryData(targetCell, itemDropData, false, viewingBackpack);
            store.changeInventoryData(dropCell, target, true, viewingBackpack);
        }
        return success();
    }, [dropCell, gender, handleDrop, isCellDragged, putItemOn, setCellDragged, setDropCell, setItem, setTargetCell, store, targetCell, viewingBackpack]);
};
