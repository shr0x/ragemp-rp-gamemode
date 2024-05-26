import { FC, useState, useMemo, useRef, useCallback } from "react";
import { observer } from "mobx-react-lite";
import InventoryStore, { IBaseItem } from "store/Inventory.store";
import { CenterComponent, ICurrentItem } from "../../Interfaces";

import error from "assets/images/error.svg";
import style from "./splititem.module.scss";

interface ISplitProps {
    store: InventoryStore;
    viewingBackpack: string | null;
    handleSplit: (item: IBaseItem, value: number) => void;
    setMiddleComponent: (comp: CenterComponent) => void;
    currentItem: ICurrentItem;
}

const Split: FC<ISplitProps> = ({ store, viewingBackpack, handleSplit, setMiddleComponent, currentItem }) => {
    const [value, setValue] = useState(1);

    const screen = useRef<HTMLDivElement>(null);

    const setSource = useCallback((img: string) => {
        try {
            return require(`assets/images/hud/inventory/items/${img}`);
        } catch (err) {
            return error;
        }
    }, []);

    const item = useMemo(() => {
        if (currentItem.id === null || !currentItem.component) return null;

        if (currentItem.component === "quickUse") {
            const quickSlotData = store.quickUse[currentItem.id];
            if (!quickSlotData || !quickSlotData.component || quickSlotData.id === null) return null;

            const itemData = store.inventory[quickSlotData.component][quickSlotData.id];
            return itemData;
        } else if (currentItem.component === "backpack") {
            if (!viewingBackpack) return null;
            return store.backpackData[viewingBackpack][currentItem.id];
        }
        return currentItem.component === "clothes" ? store.clothes[currentItem.id] : store.inventory[currentItem.component][currentItem.id];
    }, [currentItem.component, currentItem.id, store.backpackData, store.clothes, store.inventory, store.quickUse, viewingBackpack]);

    const changeSplitValue = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            if (!item) return;

            let inputValue = parseInt(e.target.value, 10);
            let newValue;
            if (isNaN(inputValue) || inputValue < 1) {
                newValue = 1;
            } else if (inputValue > item.count - 1) {
                newValue = item.count - 1;
            } else {
                newValue = inputValue;
            }
            setValue(newValue);
        },
        [item]
    );

    if (!item) return null;
    return (
        <div ref={screen} className={style.itemsplit}>
            <div className={style.header}>
                <div className={style.left}>
                    <div className={style.line} style={{ "--color": store.getItemQuality(item) } as React.CSSProperties}></div>
                    <div className={style.text}>split item</div>
                </div>
                <div className={style.close} onClick={() => setMiddleComponent("dropZone")}></div>
            </div>
            <div className={style.main}>
                <div className={style.name}>{item?.name}</div>
                <img src={setSource(`${item?.image}`)} alt="#" />
                <div className={style.range}>
                    <div className={style.slider}>
                        <input type="range" max={item?.count - 1} min={1} value={value} onChange={(value) => setValue(Number(value.target.value))} />
                    </div>
                </div>
                <input type="number" name="splitItem" value={value} onKeyDown={(b) => ["e", "E", "+", "-", ".", ","].includes(b.key) && b.preventDefault()} onChange={(e) => changeSplitValue(e)} />
                <div className={style.text}>Use the slider or insert the value.</div>
                <div className={style.button} onClick={() => handleSplit(item, value)}>
                    SPLIT ITEM
                </div>
            </div>
        </div>
    );
};

export default observer(Split);
