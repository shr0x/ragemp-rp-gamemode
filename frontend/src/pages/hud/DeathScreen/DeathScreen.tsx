import { FC, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { playerStore } from "store/Player.store";
import EventManager from "utils/EventManager.util";

import style from "./deathscreen.module.scss";

const DeathScreen: FC<{ store: typeof playerStore }> = observer(({ store }) => {
    const [isActive, setActive] = useState(false);

    useEffect(() => {
        if (!isActive) return;

        if (store.data.deathTime === 0) {
            EventManager.emitClient("player", "canAcceptDeath", true);
            return;
        }
        const timer = setTimeout(() => {
            store.setData("deathTime", store.data.deathTime - 1);
        }, 1000);
        return () => clearTimeout(timer);
    }, [isActive, store.data.deathTime]);

    useEffect(() => {
        setActive(store.data.isDead);
    }, [store.data.isDead]);

    if (!isActive) return null;

    return (
        <div className={style.deathscreen}>
            <div className={style.heartrate}>
                <svg x="0px" y="0px" viewBox="0 0 298 53.9">
                    <path
                        className="st0"
                        d="M297.5,41.2h-76.6c-0.5,0-0.9,0.4-1,0.8l-1.6,11.3l-3.1-32c0-0.5-0.4-0.9-0.9-0.9c-0.5,0-0.9,0.3-1,0.8
                       l-5.3,25.5l-2.3-10.9c-0.1-0.4-0.4-0.7-0.9-0.8c-0.4,0-0.8,0.2-1,0.6l-2.3,4.8h-107c0,0,0,0,0,0H82c-1.6,0-2.2,1.1-2.2,1.6
                       l-1.6,11.3l-3.1-52c0-0.5-0.4-0.9-0.9-0.9c-0.5,0-0.9,0.3-1,0.8l-9.3,45.5l-2.3-10.9c-0.1-0.4-0.4-0.7-0.9-0.8c-0.4,0-0.8,0.2-1,0.6
                       l-2.3,4.8H0.5"
                    />
                </svg>
                <div className={style.fadein}></div>
                <div className={style.fadeout}></div>
            </div>
            <div className={style.header}>you are injured right now...</div>
            <div className={style.desc}>You are injured. Please wait for doctors to arrive.</div>
            <div className={style.bottomdata}>
                {store.data.deathTime === 0 ? (
                    "PRESS E TO ACCEPT DEATH"
                ) : (
                    <div className={style.timer}>
                        <span className={style.text}>00</span>
                        <span className={style.text}>{store.data.deathTime}</span>
                    </div>
                )}
            </div>
        </div>
    );
});
export default DeathScreen;
