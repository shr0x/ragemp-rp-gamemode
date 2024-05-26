import { FC } from "react";
import { observer } from "mobx-react-lite";
import { entries } from "mobx";
import cn from "classnames";

import InventoryStore from "store/Inventory.store";
import { ICurrentItem, IDropCell, ITargetCell } from "../../Interfaces";
import style from "./sideinventory.module.scss";
interface ISideInventoryProps {
    title: string;
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

const SideInventory: FC<ISideInventoryProps> = ({ title, store, setItem, currentItem, isCellDragged, setDropCell, setTargetCell, handleMouseDown, handleContextMenu, setSource }) => {
    return (
        <div className={style.sidepage}>
            <div className={style.header}>
                <div className={style.info}>
                    <div className={style.title}>{title}</div>
                </div>
            </div>
            <div className={style.content}>
                {entries(store.sideInventory).map(([key, el]) => {
                    const quality = store.getItemQuality(el);
                    return (
                        <div
                            key={key + el?.hash || key}
                            className={cn(style.cell, currentItem.component === "groundItems" && currentItem.id === parseInt(key) ? style.active : null)}
                            onClick={() => {
                                if (el) setItem({ component: "groundItems", id: parseInt(key), options: el?.options });
                            }}
                            onMouseDown={(e) => {
                                const timeout = setTimeout(() => {
                                    if (el?.type && e.button === 0) {
                                        handleMouseDown({ component: "groundItems", id: parseInt(key) });
                                        setTargetCell({ component: "groundItems", id: parseInt(key) });
                                        setDropCell({ component: "groundItems", id: parseInt(key) });
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
                                    handleContextMenu({ component: "groundItems", id: parseInt(key) }, e);
                                }
                            }}
                            onMouseEnter={() => isCellDragged && setDropCell({ component: "groundItems", id: parseInt(key) })}
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
                    );
                })}
            </div>
        </div>
    );
};

export default observer(SideInventory);
