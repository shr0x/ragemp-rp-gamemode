import { FC, useEffect, useState } from "react";
import cn from "classnames";
import tradeZoneIcon from "assets/images/hud/inventory/icons/giveaway.svg";
import { IDropCell } from "pages/hud/Inventory/Interfaces";
import style from "./giveaway.module.scss";
const TradeZone: FC<{ setDropCell: (data: IDropCell) => void; isCellDragged: boolean }> = ({ setDropCell, isCellDragged }) => {
    const [hover, setHover] = useState(false);

    useEffect(() => {
        if (hover && !isCellDragged) setHover(false);
    }, [hover, isCellDragged]);

    return (
        <div
            className={cn(style.giveaway, hover && style.hide)}
            onMouseEnter={() => isCellDragged && (setDropCell({ component: "trade", id: null }), setHover(true))}
            onMouseLeave={() => {
                setHover(false);
                setDropCell({ component: null, id: null });
            }}
        >
            <img className={style.icon} src={tradeZoneIcon} alt="#" />
            <div className={style.title}>GIVE AWAY</div>
        </div>
    );
};

export default TradeZone;
