import { observer } from "mobx-react-lite";
import { FC } from "react";
import style from "./hud.module.scss";
import PlayerStore from "store/Player.store";
import InteractionMenu from "./InteractionMenu/InteractionMenu";
import HudStore from "store/Hud.store";
import MainHud from "./MainHud/MainHud";
const HUD: FC<{ store: PlayerStore; hudStore: HudStore }> = ({ store, hudStore }) => {
    return (
        <div className={style.main}>
            <MainHud store={hudStore} playerStore={store} />
            <InteractionMenu store={hudStore} />
        </div>
    );
};

export default observer(HUD);
