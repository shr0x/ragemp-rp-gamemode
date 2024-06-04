import { FC } from "react";
import { observer } from "mobx-react-lite";

import HUDStore from "store/Hud.store";
import style from "./interactbutton.module.scss";

const InteractionButton: FC<{ store: HUDStore }> = ({ store }) => {
    if (!store.interactButtonData) return null;
    return (
        <div className={style.interactbutton}>
            <div className={style.top}>{store.interactButtonData.button}</div>
            <div className={style.bottom}>
                <span className={style.header}>{store.interactButtonData.title}</span>
                <span className={style.desc}>{store.interactButtonData.text}</span>
            </div>
        </div>
    );
};

export default observer(InteractionButton);
