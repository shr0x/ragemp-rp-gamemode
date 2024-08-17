import { FC, useMemo, useCallback } from "react";
import cn from "classnames";
import { observer } from "mobx-react-lite";

import style from "./display.module.scss";
import EventManager from "utils/EventManager.util";
import { playerStore } from "store/Player.store";

const Display: FC<{ store: typeof playerStore }> = ({ store }) => {
    const displayCategories = useMemo(
        () => ({
            player: store.settings.display.filter((e) => e.type === "player"),
            hud: store.settings.display.filter((e) => e.type === "hud")
        }),
        [store.settings.display]
    );

    const changeSettingState = useCallback(
        (id: number, state: boolean) => {
            store.settings.display[id].action = state;
            EventManager.emitClient("settingsMenu", "changeDisplay", { id, action: state });
        },
        [store.settings.display]
    );

    const renderDisplayOptions = (title: string, options: any[]) => (
        <div className={style.box}>
            <div className={style.title}>{title}</div>
            <div className={style.container}>
                {options.map((e, i) => (
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
                ))}
            </div>
        </div>
    );

    return (
        <div className={style.displaysettings}>
            {renderDisplayOptions("Character", displayCategories.player)}
            {renderDisplayOptions("HUD Settings", displayCategories.hud)}
        </div>
    );
};

export default observer(Display);
