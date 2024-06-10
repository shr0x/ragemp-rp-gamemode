import React, { FC, useCallback } from "react";
import { observer } from "mobx-react-lite";
import { entries } from "mobx";
import cn from "classnames";

import error from "assets/images/error.svg";

import { ICurrentItem, IDropCell, ITargetCell } from "../../Interfaces";

import style from "./clothes.module.scss";
import { inventoryStore } from "store/Inventory.store";

interface IClothesProps {
    store: typeof inventoryStore;
    currentItem: ICurrentItem;
    setItem: (item: ICurrentItem) => void;
    setTargetCell: (target: ITargetCell) => void;
    setDropCell: (data: IDropCell) => void;
    isCellDragged: boolean;
    handleMouseDown: (data: IDropCell) => void;
    handleContextMenu: (_targetCell: IDropCell, e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const Clothes: FC<IClothesProps> = ({ store, currentItem, setItem, setTargetCell, setDropCell, isCellDragged, handleMouseDown, handleContextMenu }) => {
    const setSource = useCallback((img: string) => {
        try {
            return new URL(`../../../../../assets/images/hud/inventory/items/${img}`, import.meta.url).href;
        } catch (err) {
            return error;
        }
    }, []);

    const getEmptyClothesSlotImage = (idx: number) => {
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

        try {
            return new URL(`../../../../../assets/images/hud/inventory/items/${items[idx]}.svg`, import.meta.url).href;
        } catch (err) {
            return error;
        }
    };

    return (
        <div className={style.inventoryclothes}>
            {entries(store.clothes).map(([key, el]) => {
                return (
                    <div key={key} className={style.slot}>
                        <div
                            style={{ "--color": store.getItemQuality(el) } as React.CSSProperties}
                            className={cn(style.content, currentItem.component === "clothes" && currentItem.id && currentItem.id === parseInt(key) ? style.active : null)}
                            onClick={() => {
                                if (el?.isPlaced) setItem({ component: "clothes", id: parseInt(key), options: el.options ?? [] });
                            }}
                            onMouseDown={(e) => {
                                const timeout = setTimeout(() => {
                                    if (el && el.isPlaced && e.button === 0) {
                                        handleMouseDown({ component: "clothes", id: parseInt(key) });
                                        setTargetCell({ component: "clothes", id: parseInt(key) });
                                        setDropCell({ component: "clothes", id: parseInt(key) });
                                    }
                                }, 100);

                                document.body.onmouseup = () => {
                                    clearTimeout(timeout);
                                    document.body.onmouseup = null;
                                };
                            }}
                            onContextMenu={(e) => {
                                e.preventDefault();
                                if (el && el.isPlaced) {
                                    handleContextMenu({ component: "clothes", id: parseInt(key) }, e);
                                }
                            }}
                            onMouseEnter={() => isCellDragged && setDropCell({ component: "clothes", id: parseInt(key) })}
                            onMouseLeave={() => setDropCell({ component: null, id: null })}
                        >
                            <img
                                className={style.icon}
                                src={el === null ? getEmptyClothesSlotImage(parseInt(key)) : setSource(`${el.image}`)}
                                alt="#"
                                style={el?.isPlaced ? { opacity: 1, filter: `drop-shadow(0 0 0.4629629629629629vh ${store.getItemQuality(el)})` } : { opacity: 0.3, filter: "none" }}
                            />
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default observer(Clothes);
