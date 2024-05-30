import { FC, useMemo } from "react";
import { observer } from "mobx-react-lite";
import { entries, values } from "mobx";
import cn from "classnames";

import InventoryStore from "store/Inventory.store";
import { ICurrentItem, IDropCell, ITargetCell } from "../../Interfaces";
import style from "./sideinventory.module.scss";
interface IBackpackProps {
    store: InventoryStore;
    viewingBackpack: string | null;
    setItem: (item: ICurrentItem) => void;
    currentItem: ICurrentItem;
    isCellDragged: boolean;
    setDropCell: (data: IDropCell) => void;
    setTargetCell: (data: ITargetCell) => void;
    handleMouseDown: (_targetCell: IDropCell) => void;
    handleContextMenu: (_targetCell: IDropCell, e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    setSource: (img: string) => any;
}

const Backpack: FC<IBackpackProps> = ({ viewingBackpack, store, setItem, currentItem, isCellDragged, setDropCell, setTargetCell, handleMouseDown, handleContextMenu, setSource }) => {
    const getItemsInBackpack = useMemo(() => {
        if (!viewingBackpack) return null;
        const itemData = store.findItemByUUID(viewingBackpack);

        if (!itemData || !itemData.items) return null;
        return itemData.items;
    }, [viewingBackpack]);

    const getBackpackData = useMemo(() => {
        if (!viewingBackpack) return null;
        return store.findItemByUUID(viewingBackpack);
    }, [viewingBackpack]);

    const getBackpackAsItem = useMemo(() => {
        if (!viewingBackpack) return null;
        return store.findItemByUUID(viewingBackpack);
    }, [currentItem.component, store.clothes, store.inventory.pockets, viewingBackpack]);

    if (!getItemsInBackpack || !getBackpackAsItem) {
        return;
    }

    return (
        <div className={style.sidepage}>
            <div className={style.header}>
                <div className={style.info}>
                    <div className={style.title}>BACKPACK</div>
                </div>
            </div>
            <div className={style.content}>
                {entries(getItemsInBackpack).map(([key, el]) => {
                    const quality = store.getItemQuality(el);
                    const backpackLvl = getBackpackAsItem?.quality;

                    return backpackLvl === 0 && parseInt(key) <= 11 ? (
                        <div
                            key={key + el?.hash || key}
                            className={cn(style.cell, currentItem.component === "backpack" && currentItem.id === parseInt(key) ? style.active : null)}
                            style={
                                values(store.quickUse).filter((fastslot) => fastslot && fastslot.component === "backpack" && fastslot.id === parseInt(key)).length > 0
                                    ? { border: "0.18518518518518517vh dashed #B8B8B8" }
                                    : undefined
                            }
                            onClick={() => {
                                if (el?.type && backpackLvl >= 0) setItem({ component: "backpack", id: parseInt(key), options: el?.options });
                            }}
                            onMouseDown={(e) => {
                                const timeout = setTimeout(() => {
                                    if (el?.type && e.button === 0) {
                                        handleMouseDown({ component: "backpack", id: parseInt(key) });
                                        setTargetCell({ component: "backpack", id: parseInt(key) });
                                        setDropCell({ component: "backpack", id: parseInt(key) });
                                    }
                                }, 100);

                                document.body.onmouseup = () => {
                                    clearTimeout(timeout);
                                    document.body.onmouseup = null;
                                };
                            }}
                            onContextMenu={(e) => {
                                e.preventDefault();
                                if (el?.type) {
                                    handleContextMenu({ component: "backpack", id: parseInt(key) }, e);
                                }
                            }}
                            onMouseEnter={() => isCellDragged && setDropCell({ component: "backpack", id: parseInt(key) })}
                            onMouseLeave={() => setDropCell({ component: null, id: null })}
                        >
                            {el?.type && (
                                <>
                                    <div className={style.quality} style={{ background: `linear-gradient(to top, ${quality}, #C373F360 60%, #C373F300)` }} />
                                    <img className={style.image} src={setSource(`${el?.image}`)} alt="#" />
                                    {el?.count > 1 && <div className={style.count}>{el?.count}</div>}
                                    <div className={style.gender}>{el?.gender !== undefined && el?.gender !== null ? (el?.gender === 0 ? "M" : "F") : null}</div>
                                </>
                            )}
                        </div>
                    ) : backpackLvl >= 1 && parseInt(key) <= 23 ? (
                        <div
                            key={key + el?.hash || key}
                            className={cn(style.cell, currentItem.component === "backpack" && currentItem.id === parseInt(key) ? style.active : null)}
                            style={
                                values(store.quickUse).filter((fastslot) => fastslot && fastslot.component === "backpack" && fastslot.id === parseInt(key)).length > 0
                                    ? { border: "0.18518518518518517vh dashed #B8B8B8" }
                                    : undefined
                            }
                            onClick={() => {
                                if (el?.type && backpackLvl >= 0) setItem({ component: "backpack", id: parseInt(key), options: el?.options });
                            }}
                            onMouseDown={(e) => {
                                const timeout = setTimeout(() => {
                                    if (el?.type && e.button === 0) {
                                        handleMouseDown({ component: "backpack", id: parseInt(key) });
                                        setTargetCell({ component: "backpack", id: parseInt(key) });
                                        setDropCell({ component: "backpack", id: parseInt(key) });
                                    }
                                }, 100);

                                document.body.onmouseup = () => {
                                    clearTimeout(timeout);
                                    document.body.onmouseup = null;
                                };
                            }}
                            onContextMenu={(e) => {
                                e.preventDefault();
                                if (el?.type) {
                                    handleContextMenu({ component: "backpack", id: parseInt(key) }, e);
                                }
                            }}
                            onMouseEnter={() => isCellDragged && setDropCell({ component: "backpack", id: parseInt(key) })}
                            onMouseLeave={() => setDropCell({ component: null, id: null })}
                        >
                            {el?.type && (
                                <>
                                    <div className={style.quality} style={{ background: `linear-gradient(to top, ${quality}, #C373F360 60%, #C373F300)` }} />
                                    <img className={style.image} src={setSource(`${el?.image}`)} alt="#" />
                                    {el?.count > 1 && <div className={style.count}>{el?.count}</div>}
                                    <div className={style.gender}>{el?.gender !== undefined && el?.gender !== null ? (el?.gender === 0 ? "м" : "ж") : null}</div>
                                </>
                            )}
                        </div>
                    ) : (
                        <div key={key + el?.hash || key} className={style.locked} />
                    );
                })}
                {getBackpackData && getBackpackData.quality < 1 && (
                    <div className={style.second_lock}>
                        <div className={style.title}>Buy a level 2 backpack</div>
                        <div className={style.subtitle}>to unlock additional slots</div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default observer(Backpack);
