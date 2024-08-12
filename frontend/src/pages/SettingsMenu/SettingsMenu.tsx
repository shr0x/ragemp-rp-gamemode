import { useState, useMemo, FC } from "react";
import cn from "classnames";

import { observer } from "mobx-react-lite";

import Main from "./components/Main/Security";
import Keys from "pages/SettingsMenu/components/Keybinds/Keybinds";
import Display from "./components/Display/Display";

import style from "./settings.module.scss";

import security from "assets/images/settings/security.svg";
import toggle from "assets/images/settings/toggle.svg";
import keyboard from "assets/images/settings/keyboard.svg";

import EventManager from "utils/EventManager.util";
import { playerStore } from "store/Player.store";
import { createComponent } from "../../hoc/registerComponent";

const SettingsMenu: FC<{ store: typeof playerStore }> = observer(({ store }) => {
    const [category, setCategorry] = useState("main");

    const categoryNav = useMemo(
        () => [
            {
                link: "main",
                text: "Security",
                icon: security
            },
            {
                link: "display",
                text: "Display",
                icon: toggle
            },
            {
                link: "keys",
                text: "Keybinding",
                icon: keyboard
            }
        ],
        []
    );

    return (
        <div className={style.settingsmenu}>
            {category !== "main" ? (
                <div className={style.recover} onClick={() => EventManager.emitClient("settingsMenu", "recover", { page: category })}>
                    <span>Reset Default</span>
                    <div className={style.img}></div>
                </div>
            ) : null}
            <div className={style.button}>
                <div className={style.text}>Settings</div>
            </div>
            <div className={style.nav}>
                {categoryNav.map((e, i) => {
                    return (
                        <div key={i} className={cn(style.box, category === e.link && style.active)} onClick={() => setCategorry(e.link)}>
                            <img src={e.icon} alt="" />
                            <span>{e.text}</span>
                        </div>
                    );
                })}
            </div>
            <div className={style.content}>
                <div className={style.info}>
                    {category === "main" && <Main store={store} />}
                    {category === "keys" && <Keys store={store} />}
                    {category === "display" && <Display store={store} />}
                </div>
            </div>
        </div>
    );
});

export default createComponent({
    component: SettingsMenu,
    pageName: "settings",
    props: { store: playerStore }
});
