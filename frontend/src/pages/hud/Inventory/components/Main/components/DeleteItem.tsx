import { FC, useState, useEffect } from "react";
import cn from "classnames";
import removeZoneIcon from "assets/images/hud/inventory/icons/removeicon.svg";
import { IDropCell } from "pages/hud/Inventory/Interfaces";

import style from "./deleteitem.module.scss";

const DeleteItem: FC<{ setDropCell: (data: IDropCell) => void; isCellDragged: boolean }> = ({ isCellDragged, setDropCell }) => {
    const [hover, setHover] = useState(false);

    useEffect(() => {
        if (hover && !isCellDragged) setHover(false);
    }, [hover, isCellDragged]);

    return (
        <div
            className={cn(style.deletezone, hover && style.hide)}
            onMouseEnter={() => isCellDragged && (setDropCell({ component: "remove", id: null }), setHover(true))}
            onMouseLeave={() => {
                setHover(false);
                setDropCell({ component: null, id: null });
            }}
        >
            <div className={style.title}>DRAG AN ITEM HERE TO DROP</div>
            <img className={style.icon} src={removeZoneIcon} alt="#" />
        </div>
    );
};

export default DeleteItem;
