import { observer } from "mobx-react-lite";
import { FC } from "react";
import style from "./hud.module.scss";
import PlayerStore from "store/Player.store";
import InteractionMenu from "./InteractionMenu/InteractionMenu";
import HudStore from "store/Hud.store";
const HUD: FC<{ store: PlayerStore, hudStore: HudStore }> = ({ store, hudStore}) => {
    return (
        <div className={style.main}>
            <div className={style.top}></div>
            <InteractionMenu store={hudStore} />
        </div>
    );
};

export default observer(HUD);
