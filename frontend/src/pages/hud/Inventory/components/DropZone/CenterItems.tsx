import { FC, useEffect, useRef } from "react";
import TradeZone from "./components/Giveaway";
import PutOnZone from "./components/PutOnZone";

import { ICurrentItem, IDropCell, ITargetCell } from "../../Interfaces";
import Clothes from "../Clothes/Clothes";
import InventoryStore from "store/Inventory.store";
import style from "./centeritems.module.scss";
interface ICenterProps {
    store: InventoryStore;
    currentItem: ICurrentItem;
    setItem: (item: ICurrentItem) => void;
    setTargetCell: (target: ITargetCell) => void;
    setDropCell: (dropcell: IDropCell) => void;
    isCellDragged: boolean;
    handleMouseDown: (targetCell: IDropCell) => void;
    handleContextMenu: (_targetCell: IDropCell, e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const CenterItems: FC<ICenterProps> = ({ store, currentItem, setItem, setTargetCell, setDropCell, isCellDragged, handleMouseDown, handleContextMenu }) => {
    const screen = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const timeout = setTimeout(() => {
            if (screen.current) screen.current.style.opacity = "1";
        }, 200);
        return () => clearTimeout(timeout);
    }, []);

    return (
        <div className={style.centerzone} ref={screen}>
            <Clothes
                store={store}
                currentItem={currentItem}
                setItem={setItem}
                setTargetCell={setTargetCell}
                setDropCell={setDropCell}
                isCellDragged={isCellDragged}
                handleMouseDown={handleMouseDown}
                handleContextMenu={handleContextMenu}
            />

            {isCellDragged && <TradeZone setDropCell={setDropCell} isCellDragged={isCellDragged} />}
            {isCellDragged && <PutOnZone setDropCell={setDropCell} isCellDragged={isCellDragged} />}
        </div>
    );
};

export default CenterItems;
