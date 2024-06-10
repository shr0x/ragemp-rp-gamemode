import { FC, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { playerStore } from "store/Player.store";
import EventManager from "utils/EventManager.util";

import style from "./deathscreen.module.scss";

const DeathScreen: FC<{ store: typeof playerStore }> = observer(({ store }) => {
    const [timeLeft, setTimeLeft] = useState(30);
    const [isActive, setActive] = useState(false);

    useEffect(() => {
        if (!isActive) return;

        if (timeLeft === 0) {
            EventManager.emitClient("player", "canAcceptDeath", true);
            return;
        }
        const timer = setTimeout(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);
        return () => clearTimeout(timer);
    }, [isActive, timeLeft]);

    useEffect(() => {
        setActive(store.data.isDead);
    }, [store.data.isDead]);

    if (!isActive) return null;

    return (
        <div className={style.deathscreen}>
            <div className={style.header}>you are injured right now...</div>
            <div className={style.bottomdata}>{timeLeft === 0 ? "PRESS E TO ACCEPT DEATH" : <span className={style.timer}>{timeLeft}</span>}</div>
        </div>
    );
});
export default DeathScreen;
