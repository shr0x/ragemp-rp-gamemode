import { FC, useCallback, useMemo } from "react";
import { observer } from "mobx-react-lite";
import cn from "classnames";

import Pockets from "./components/Pockets";
import FastSlots from "./components/Quickuse";

import InventoryStore from "store/Inventory.store";

import style from "./main.module.scss";

import { IItemImage, ICurrentItem, ITargetCell, IDropCell } from "../../Interfaces";

import DeleteItem from "./components/DeleteItem";
import errorIcon from "assets/images/error.svg";
interface IMainProps {
    store: InventoryStore;
    itemInformation: IItemImage | null;
    currentItem: ICurrentItem;
    setItem: (item: ICurrentItem) => void;
    setTargetCell: (target: ITargetCell) => void;
    setDropCell: (dropcell: IDropCell) => void;
    isCellDragged: boolean;
    handleMouseDown: (targetCell: IDropCell) => void;
    handleContextMenu: (_targetCell: IDropCell, e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    setShowModal: (enable: boolean) => void;
    setSource: (img: string) => any;
}

const Main: FC<IMainProps> = ({ store, itemInformation, currentItem, setItem, setTargetCell, setDropCell, isCellDragged, handleMouseDown, handleContextMenu, setShowModal, setSource }) => {
    const renderQuality = useMemo(() => {
        switch (itemInformation?.quality) {
            case 0:
                return "#B7C2F8";
            case 1:
                return "#8A9EFF";
            case 2:
                return "#C970FF";
            case 3:
                return "#FF8888";
            case 4:
                return "#FFD139";
            default:
                return "#FFFFFF";
        }
    }, [itemInformation?.quality]);

    const getRenderImage = useCallback(() => {
        try {
            return require(`assets/images/hud/inventory/items/${itemInformation?.image}`);
        } catch (err) {
            return errorIcon;
        }
    }, [itemInformation?.image]);

    return (
        <div className={style.main}>
            <div className={style.title}>
                INVENTORY
                <div className={cn(style.weight, (store.currentWeight * 100) / store.maxInventoryWeight > 90 && style.red)}>
                    {store.currentWeight}/<span>{store.maxInventoryWeight}kg.</span>
                </div>
            </div>
            {itemInformation && (
                <div className={style.iteminfo} style={itemInformation.image ? { opacity: 1 } : { opacity: 0 }}>
                    <img
                        className={style.image}
                        src={itemInformation.render !== null && itemInformation.render !== "" ? `${getRenderImage()} ` : `${setSource(`${itemInformation.image}`)} `}
                        alt="#"
                        style={{ filter: `drop-shadow( 0 0 1.3888888888888888vh ${renderQuality} )` }}
                    />
                    <div className={style.info}>
                        <div className={style.name}>{itemInformation.name}</div>
                        {itemInformation.quality && (
                            <div className={style.level} style={{ textShadow: `0 0 0.4629629629629629vh ${renderQuality} ` }}>
                                level {itemInformation.quality + 1}
                            </div>
                        )}
                        <div className={style.description}>{itemInformation.description}</div>
                    </div>
                </div>
            )}

            <Pockets
                store={store}
                currentItem={currentItem}
                setItem={setItem}
                setTargetCell={setTargetCell}
                setDropCell={setDropCell}
                isCellDragged={isCellDragged}
                handleMouseDown={handleMouseDown}
                handleContextMenu={handleContextMenu}
                setShowModal={setShowModal}
                setSource={setSource}
            />

            <FastSlots
                store={store}
                currentItem={currentItem}
                setItem={setItem}
                setTargetCell={setTargetCell}
                setDropCell={setDropCell}
                isCellDragged={isCellDragged}
                handleMouseDown={handleMouseDown}
                handleContextMenu={handleContextMenu}
                setSource={setSource}
            />
            <DeleteItem setDropCell={setDropCell} isCellDragged={isCellDragged} />
        </div>
    );
};

export default observer(Main);
