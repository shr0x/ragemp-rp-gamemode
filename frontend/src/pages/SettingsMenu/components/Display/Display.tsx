import * as React from "react";
import cn from "classnames";
import { observer } from "mobx-react-lite";

import style from "./display.module.scss";
import EventManager from "utils/EventManager.util";
import { playerStore } from "store/Player.store";
import { useCallback } from "react";

const Display: React.FC<{
    store: typeof playerStore;
}> = ({ store }) => {
    const getPlayerDisplay = React.useMemo(() => {
        return store.settings.display.filter((e) => e.type === "player");
    }, [store.settings.display]);

    const getHudDisplay = React.useMemo(() => {
        return store.settings.display.filter((e) => e.type === "hud");
    }, [store.settings.display]);

    const changeSettingState = (id: number, state: boolean) => {
        store.settings.display[id].action = state;
        EventManager.emitClient("settingsMenu", "changeDisplay", { id: id, action: state });
    };

    return (
        <div className={style.displaysettings}>
            <div className={style.box}>
                <div className={style.title}>Character</div>
                <div className={style.container}>
                    {getPlayerDisplay.map((e, i) => {
                        return (
                            <div key={i} className={style.option}>
                                <div className={style.title}>{e.name}</div>
                                <div className={style.buttons}>
                                    <div className={cn(style.button, !e.action && style.active_white)} onClick={() => changeSettingState(e.id, false)}>
                                        OFF
                                    </div>
                                    <div className={cn(style.button, e.action && style.active_green)} onClick={() => changeSettingState(e.id, true)}>
                                        ON
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className={style.box}>
                <div className={style.title}>HUD Settings</div>
                <div className={style.container}>
                    {getHudDisplay.map((e, i) => {
                        return (
                            <div key={i} className={style.option}>
                                <div className={style.title}>{e.name}</div>
                                <div className={style.buttons}>
                                    <div className={cn(style.button, !e.action && style.active_white)} onClick={() => changeSettingState(e.id, false)}>
                                        OFF
                                    </div>
                                    <div className={cn(style.button, e.action && style.active_green)} onClick={() => changeSettingState(e.id, true)}>
                                        ON
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default observer(Display);
