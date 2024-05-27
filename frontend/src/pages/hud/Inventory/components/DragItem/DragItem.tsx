import { FC, useCallback, useMemo, RefObject } from "react";
import { observer } from "mobx-react-lite";
import error from "assets/images/error.svg";

import InventoryStore from "store/Inventory.store";
import { ITargetCell } from "../../Interfaces";

import style from "./dragitem.module.scss";

interface IDragItemProps {
    viewingBackpack: string | null;
    mouseData: RefObject<HTMLDivElement>;
    store: InventoryStore;
    targetCell: ITargetCell;
}
const DragItem: FC<IDragItemProps> = ({ viewingBackpack, mouseData, store, targetCell }) => {
    const setImageSource = useCallback((img: string) => {
        try {
            return new URL(`../../../../../assets/images/hud/inventory/items/${img}`, import.meta.url).href;
        } catch (err) {
            return error;
        }
    }, []);

    const getItemFromFastSlots = useCallback(
        (id: number) => {
            const fastSlot = store.quickUse[id];
            if (!fastSlot || !fastSlot.component || fastSlot.id === null) return null;
            return store.inventory[fastSlot.component][fastSlot.id];
        },
        [store.inventory, store.quickUse]
    );

    const getItemFromStore = useCallback(
        (component: string | null, id: number | null) => {
            if (!component || id === null) return null;
            if (component === "backpack") {
                if (!viewingBackpack) return null;
                return store.backpackData[viewingBackpack][id];
            } else if (component === "groundItems") {
                return store.sideInventory[id];
            }
            return store.inventory[component][id];
        },
        [store.backpackData, store.inventory, store.sideInventory, viewingBackpack]
    );

    const item = useMemo(() => {
        if (!targetCell || !targetCell.component || targetCell.id === null) return null;

        if (targetCell.component === "quickUse") {
            return getItemFromFastSlots(targetCell.id);
        }

        if (targetCell.component === "clothes") {
            return store.clothes[targetCell.id];
        }

        return getItemFromStore(targetCell.component, targetCell.id);
    }, [targetCell, getItemFromStore, getItemFromFastSlots, store.clothes]);

    const itemQualityStyle = item && item.quality >= 0 && item.quality <= 4 ? `linear-gradient(to top, ${store.getItemQuality(item)}, #C373F360 60%, #C373F300)` : "none";
    const itemClassNames = style.itemdrag;
    const displayStyle = targetCell.component ? { display: "flex" } : { display: "none" };

    return (
        <div className={itemClassNames} ref={mouseData} style={displayStyle}>
            <div className={style.quality} style={{ background: itemQualityStyle }} />
            {item?.image && <img className={style.image} src={setImageSource(item.image)} alt="#" />}
            {item && item.count > 1 && <div className={style.count}>{item.count}</div>}
            {item?.gender !== undefined && item?.gender !== null && <div className={style.gender}>{item.gender === 0 ? "M" : "F"}</div>}
        </div>
    );
};

export default observer(DragItem);
