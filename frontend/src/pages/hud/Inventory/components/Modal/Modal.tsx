import { FC, useCallback, useEffect, useRef } from "react";
import InventoryStore, { IBaseItem } from "store/Inventory.store";
import EventManager from "utils/EventManager.util";
import { CenterComponent, ICurrentItem } from "../../Interfaces";
import style from "./modal.module.scss";
import Notification from "utils/NotifyManager.util";
interface IModalProps {
    store: InventoryStore;
    currentItem: ICurrentItem;
    viewingBackpack: string | null;
    setViewingBackpack: (key: string | null) => void;
    takeItemOff: () => void;
    putItemOn: (item?: IBaseItem) => void;
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
                return store.backpackData[viewingBackpack][id];
            } else if (component === "clothes") {
                return store.clothes[id];
            }
            return store.inventory[component][id];
        },
        [store.backpackData, store.clothes, store.inventory, store.quickUse, viewingBackpack]
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
            if (!store.backpackData[item.hash]) return Notification.error("Something is wrong with this backpack, contact an admin!");
            return setViewingBackpack(item.hash);
        }
        const itemData = { item, source: { component: currentItem.component, slot: `${currentItem.id}` } };
        EventManager.emitServer("inventory", "onOpenItem", itemData);
    }, [currentItem.id, currentItem.component, getItem, store.backpackData, setViewingBackpack]);

    const renderOption = (option: string, handler: any, label: string) =>
        ensureOptionsIsArray().includes(option) && (
            <div className={style.box} onClick={handler}>
                {label}
            </div>
        );

    if (!showModal) return null;

    return (
        <div className={style.itemoptions} ref={modalRef} style={{ top: `${modalCoords.y}px`, left: `${modalCoords.x}px` }}>
            {renderOption("use", useItem, "Use Item")}
            {renderOption("open", openItem, "Open")}
            {renderOption("putOn", () => (currentItem.component === "clothes" ? takeItemOff() : putItemOn()), currentItem.component === "clothes" ? "Take off" : "Put on")}
            {renderOption("drop", handleDrop, "Drop Item")}
            {renderOption("trade", giveItemAway, "Trade Item")}
            {renderOption("split", () => splitItem(currentItem), "Split Item")}
        </div>
    );
};

export default Modal;
