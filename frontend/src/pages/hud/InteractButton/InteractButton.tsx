import { FC } from "react";
import { observer } from "mobx-react-lite";

import style from "./interactbutton.module.scss";
import { hudStore } from "store/Hud.store";

const InteractionButton: FC<{ store: typeof hudStore }> = ({ store }) => {
    if (!store.interactButtonData) return null;
    return (
        <div className={style.interactbutton}>
            <div className={style.top}>{store.interactButtonData.button}</div>
            <div className={style.bottom}>
                <span className={style.desc}>{store.interactButtonData.text}</span>
            </div>
        </div>
    );
};

export default observer(InteractionButton);
