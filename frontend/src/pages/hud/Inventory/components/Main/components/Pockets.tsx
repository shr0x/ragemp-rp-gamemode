import { FC } from "react";
import { observer } from "mobx-react-lite";
import { entries, values } from "mobx";
import cn from "classnames";

import InventoryStore from "store/Inventory.store";
import { ICurrentItem, IDropCell, ITargetCell } from "pages/hud/Inventory/Interfaces";
import Notification from "utils/NotifyManager.util";

import style from "./pockets.module.scss";
interface IPocketsProps {
    store: InventoryStore;
    setItem: (item: ICurrentItem) => void;
    currentItem: ICurrentItem;
    isCellDragged: boolean;
    setDropCell: (data: IDropCell) => void;
    setTargetCell: (data: ITargetCell) => void;
    handleMouseDown: (_targetCell: IDropCell) => void;
    handleContextMenu: (_targetCell: IDropCell, e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    setShowModal?: (enable: boolean) => void;
    setSource: (img: string) => any;
}

const Pockets: FC<IPocketsProps> = ({ store, setItem, currentItem, isCellDragged, setDropCell, setTargetCell, handleMouseDown, handleContextMenu, setSource }) => {
    return (
        <div className={style.pockets}>
            <div className={style.header}>
                <div className={style.info}>
                    <div className={style.title}>POCKETS</div>
                </div>
            </div>
            <div className={style.content}>
                {entries(store.inventory.pockets).map(([key, el]) => {
                    return (
                        <div
                            key={key + el?.hash || key}
                            onDoubleClick={() => {
                                Notification.info(`Heyo why u double clicking me?1`);
                            }}
                            className={cn(style.cell, currentItem.component === "pockets" && currentItem.id === parseInt(key) ? style.active : null)}
                            style={
                                values(store.quickUse).filter((fastslot) => fastslot && fastslot.component === "pockets" && fastslot.id === parseInt(key)).length > 0
                                    ? { border: "0.18518518518518517vh dashed #B8B8B8" }
                                    : undefined
                            }
                            onClick={() => {
                                if (el?.type) {
                                    setItem({ component: "pockets", id: parseInt(key), options: el?.options });
                                }
                            }}
                            onMouseDown={(e) => {
                                const timeout = setTimeout(() => {
                                    if (el?.type && e.button === 0) {
                                        handleMouseDown({ component: "pockets", id: parseInt(key) });
                                        setTargetCell({ component: "pockets", id: parseInt(key) });
                                        setDropCell({ component: "pockets", id: parseInt(key) });
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
                                    handleContextMenu({ component: "pockets", id: parseInt(key) }, e);
                                }
                            }}
                            onMouseEnter={() => {
                                if (isCellDragged) setDropCell({ component: "pockets", id: parseInt(key) });
                            }}
                            onMouseLeave={() => setDropCell({ component: null, id: null })}
                        >
                            {el?.type && (
                                <>
                                    <div className={style.level} style={{ background: `linear-gradient(to top, ${store.getItemQuality(el)}, #C373F360 60%, #C373F300)` }} />
                                    <img className={style.image} src={setSource(`${el?.image}`)} alt="#" />
                                    {el?.count > 1 && <div className={style.count}>{el?.count}</div>}
                                    <div className={style.gender}>{el?.gender !== undefined && el?.gender !== null ? (el?.gender === 0 ? "M" : "F") : null}</div>
                                </>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default observer(Pockets);
