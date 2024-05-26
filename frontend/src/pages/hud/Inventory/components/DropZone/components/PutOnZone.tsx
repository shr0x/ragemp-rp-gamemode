import { FC, useEffect, useState } from "react";
import cn from "classnames";

import putOnZoneIcon from "assets/images/hud/inventory/icons/draghere.svg";

import style from "./puton.module.scss";

const PutOnZone: FC<{ setDropCell: any; isCellDragged: boolean }> = ({ setDropCell, isCellDragged }) => {
    const [hover, setHover] = useState(false);

    useEffect(() => {
        if (hover && !isCellDragged) setHover(false);
    }, [hover, isCellDragged]);

    return (
        <div
            className={cn(style.puton, hover && style.hover)}
            onMouseEnter={() => isCellDragged && (setHover(true), setDropCell({ component: "putOn", id: null }))}
            onMouseLeave={() => {
                setHover(false);
                setDropCell({ component: null, id: null });
            }}
        >
            <img className={style.icon} src={putOnZoneIcon} alt="#" />
            <div className={style.title}>
                Drag and drop an item here
                <br />
                to put it on
            </div>
        </div>
    );
};

export default PutOnZone;
