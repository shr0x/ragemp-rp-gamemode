import { FC, useCallback, useEffect, useRef } from "react";
import EventManager from "utils/EventManager.util";
import { CenterComponent, ICurrentItem } from "../../Interfaces";
import style from "./modal.module.scss";
import Notification from "utils/NotifyManager.util";

import { RageShared } from "../../../../../../../source/shared";
import { inventoryStore } from "store/Inventory.store";

interface IModalProps {
    store: typeof inventoryStore;
    currentItem: ICurrentItem;
    viewingBackpack: string | null;
    setViewingBackpack: (key: string | null) => void;
    takeItemOff: () => void;
    putItemOn: (item?: RageShared.Inventory.Interfaces.IBaseItem) => void;
    handleDrop: (isAccepted?: boolean) => void;
    giveItemAway: (id?: number) => void;
    setMiddleComponent: (component: CenterComponent) => void;
    showModal: boolean;
    setShowModal: (enable: boolean) => void;
    modalCoords: { x: number; y: number };
}

const Modal: FC<IModalProps> = ({
    store,
    currentItem,
    viewingBackpack,
    setViewingBackpack,
    takeItemOff,
    putItemOn,
    handleDrop,
    giveItemAway,
    setMiddleComponent,
    showModal,
    setShowModal,
    modalCoords
}) => {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let timeout: NodeJS.Timeout;

        function handleClickOutside(event: any) {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setShowModal(false);
            }
        }

        function handleClickInside(event: any) {
            if (modalRef.current && modalRef.current.contains(event.target)) {
                timeout = setTimeout(() => {
                    setShowModal(false);
                }, 100);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("mouseup", handleClickInside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("mouseup", handleClickInside);
            clearTimeout(timeout);
        };
    }, [modalRef]); // eslint-disable-line

    const ensureOptionsIsArray = useCallback(() => {
        let item = JSON.parse(JSON.stringify(currentItem.options));
        if (item === null || item === undefined) return [];
        if (typeof item === "object") return Object.values(item);
        if (Array.isArray(item)) return item;
        return [];
    }, [currentItem.options]);

    const getItem = useCallback(
        (id: number | null, component: string | null) => {
            if (id === null || !component) return null;
            if (component === "quickUse") {
                const fastSlot = store.quickUse[id];
                if (!fastSlot || !fastSlot.component || fastSlot.id === null) return null;
                return store.inventory[fastSlot.component][fastSlot.id];
            } else if (component === "backpack") {
                if (!viewingBackpack) return null;
                const backpackdata = store.findItemByUUID(viewingBackpack);
                if (!backpackdata || !backpackdata.items) return null;
                return backpackdata.items[id];
            } else if (component === "clothes") {
                return store.clothes[id];
            }
            return store.inventory[component][id];
        },
        [store.clothes, store.inventory, store.quickUse, viewingBackpack]
    );

    const useItem = useCallback(() => {
        if (currentItem.id === null || !currentItem.component) return;

        const item = getItem(currentItem.id, currentItem.component);
        if (!item) return;

        EventManager.emitServer("inventory", "onUseItem", { item, source: { component: currentItem.component, slot: `${currentItem.id}` } });
    }, [currentItem.id, currentItem.component, getItem]);

    const splitItem = useCallback(
        (itemData: ICurrentItem) => {
            if (itemData.id === null || itemData.component === null) return;

            const item = getItem(itemData.id, itemData.component);
            if (!item) return;
            if (item.count > 1) setMiddleComponent("split");
        },
        [getItem, setMiddleComponent]
    );

    const openItem = useCallback(() => {
        if (currentItem.id === null || !currentItem.component) return;

        const item = getItem(currentItem.id, currentItem.component);
        if (!item) return;
        if (item.type === "backpack") {
            if (viewingBackpack) return setViewingBackpack(null);
            if (!item.items) return Notification.error("Something is wrong with this backpack, contact an admin!");
            return setViewingBackpack(item.hash);
        }
        const itemData = { item, source: { component: currentItem.component, slot: `${currentItem.id}` } };
        EventManager.emitServer("inventory", "onOpenItem", itemData);
    }, [currentItem.id, currentItem.component, getItem, setViewingBackpack]);

    const renderOption = (option: string, handler: () => void, label: string) =>
        ensureOptionsIsArray().includes(option) && (
            <div className={style.box} onClick={handler}>
                {label}
            </div>
        );

    if (!showModal) return null;

    return (
        <div className={style.itemoptions} ref={modalRef} style={{ top: `${modalCoords.y}px`, left: `${modalCoords.x}px` }}>
            {renderOption(RageShared.Inventory.Enums.ACTIONS.USE_ITEM, useItem, "Use Item")}
            {renderOption(RageShared.Inventory.Enums.ACTIONS.OPEN_ITEM, openItem, "Open")}
            {renderOption(RageShared.Inventory.Enums.ACTIONS.WEAR_ITEM, () => (currentItem.component === "clothes" ? takeItemOff() : putItemOn()), currentItem.component === "clothes" ? "Take off" : "Put on")}
            {renderOption(RageShared.Inventory.Enums.ACTIONS.DROP_ITEM, handleDrop, "Drop Item")}
            {renderOption(RageShared.Inventory.Enums.ACTIONS.TRADE_ITEM, giveItemAway, "Trade Item")}
            {renderOption(RageShared.Inventory.Enums.ACTIONS.SPLIT_ITEM, () => splitItem(currentItem), "Split Item")}
        </div>
    );
};

export default Modal;
