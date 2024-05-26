import { FC } from "react";
import { observer } from "mobx-react-lite";
import { entries } from "mobx";
import cn from "classnames";

import InventoryStore, { IBaseItem } from "store/Inventory.store";
import { ICurrentItem, IDropCell, ITargetCell } from "pages/hud/Inventory/Interfaces";

import style from "./quickuse.module.scss";
interface IFastSlotProps {
    store: InventoryStore;
    setItem: (item: ICurrentItem) => void;
    currentItem: ICurrentItem;
    isCellDragged: boolean;
    setDropCell: (data: IDropCell) => void;
    setTargetCell: (data: ITargetCell) => void;
    handleMouseDown: (_targetCell: IDropCell) => void;
    handleContextMenu: (_targetCell: IDropCell, e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    setSource: (img: string) => any;
}

const FastSlots: FC<IFastSlotProps> = ({ store, setItem, currentItem, isCellDragged, setDropCell, setTargetCell, handleMouseDown, handleContextMenu, setSource }) => {
    return (
        <div className={style.quickuse}>
            <div className={style.header}>
                <div className={style.title}>QUICK USE</div>
            </div>
            <div className={style.content}>
                {entries(store.quickUse).map(([key, el]) => {
                    const itemData: IBaseItem | null = el?.component && el.id !== null ? store.inventory[el.component][el.id] : null;

                    const quality = store.getItemQuality(itemData);

                    return (
                        <div
                            key={key + itemData?.hash || key}
                            className={cn(style.cell, currentItem.component === "quickUse" && currentItem.id === parseInt(key) ? style.active : null)}
                            onClick={() => {
                                if (el && el.id >= 0 && el.component) setItem({ component: "quickUse", id: parseInt(key), options: null });
                            }}
                            onMouseDown={(e) => {
                                const timeout = setTimeout(() => {
                                    if (el !== null && e.button === 0) {
                                        handleMouseDown({ component: "quickUse", id: parseInt(key) });
                                        setTargetCell({ component: "quickUse", id: parseInt(key) });
                                        setDropCell({ component: "quickUse", id: parseInt(key) });
                                    }
                                }, 100);

                                document.body.onmouseup = () => {
                                    clearTimeout(timeout);
                                    document.body.onmouseup = null;
                                };
                            }}
                            onContextMenu={(e) => {
                                e.preventDefault();
                                if (el?.component) {
                                    handleContextMenu({ component: "quickUse", id: parseInt(key) }, e);
                                }
                            }}
                            onMouseEnter={() => isCellDragged && setDropCell({ component: "quickUse", id: parseInt(key) })}
                            onMouseLeave={() => setDropCell({ component: null, id: null })}
                        >
                            {el && el.id >= 0 && el.component && (
                                <>
                                    <div className={style.level} style={{ background: `linear-gradient(to top, ${quality}, #C373F360 60%, #C373F300)` }} />
                                    <img className={style.image} src={setSource(`${itemData?.image}`)} alt="#" />
                                </>
                            )}
                            <div className={style.id}>{parseInt(key) + 1}</div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default observer(FastSlots);
