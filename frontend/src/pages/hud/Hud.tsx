import { observer } from "mobx-react-lite";
import { FC } from "react";
import style from "./hud.module.scss";
import PlayerStore from "store/Player.store";
const HUD: FC<{ store: PlayerStore }> = ({ store }) => {
    return (
        <div className={style.main}>
            <div className={style.top}></div>
        </div>
    );
};

export default observer(HUD);
