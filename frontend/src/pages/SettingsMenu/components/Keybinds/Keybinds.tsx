import { useState, FC, useMemo, useCallback, useEffect } from "react";
import cn from "classnames";
import { observer } from "mobx-react-lite";

import EventManager from "utils/EventManager.util";
import { playerStore } from "store/Player.store";
import style from "./keybind.module.scss";

const keyMap: Record<number, string> = {
    9: "Tab",
    13: "ENT",
    18: "ALT",
    20: "Сaps",
    189: "-",
    187: "=",
    186: ";",
    222: `'`,
    188: ",",
    219: "[",
    221: "]",
    190: ".",
    191: "/",
    40: "↓",
    38: "↑",
    37: "←",
    39: "→",
    119: "F8",
    116: "F5"
};

const Keybinds: FC<{ store: typeof playerStore }> = ({ store }) => {
    const [currentButton, setCurrentButton] = useState<{ category: string; id: number } | null>(null);

    const buttonsByCategory = useMemo(
        () => ({
            general: store.settings.buttons.general.filter((e) => e.type === "default"),
            vehicle: store.settings.buttons.vehicle.filter((e) => e.type === "default"),
            fastslots: store.settings.buttons.fastslots.filter((e) => e.type === "fast")
        }),
        [store.settings.buttons]
    );

    const handleKeyPress = useCallback(
        (event: any, cat: string, id: number) => {
            if (!currentButton || event.location === 3) return;

            const validKeys = new Set([
                49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 189, 187, 69, 70, 82, 84, 89, 85, 73, 79, 80, 219, 221, 70, 71, 72, 74, 75, 76, 186, 222, 90, 88, 67, 86, 66, 78, 77, 188, 190, 191, 20, 9, 119,
                116, 40, 38, 39, 37
            ]);
            if (!validKeys.has(event.keyCode)) {
                setCurrentButton(null);
                return;
            }

            const existingButton = store.settings.buttons[cat].find((e) => e.keyCode === event.keyCode && e.type !== "default");
            if (existingButton) {
                setCurrentButton(null);
            } else {
                EventManager.emitClient("settings", "changeButton", { category: cat, id: id, keyCode: event.keyCode });
                setCurrentButton(null);
            }
        },
        [currentButton, store.settings.buttons]
    );

    const getButtonName = (keyCode: number) => keyMap[keyCode] || String.fromCharCode(keyCode);

    useEffect(() => {
        const preventTabDefault = (event: KeyboardEvent) => {
            if (event.keyCode === 9) event.preventDefault();
        };
        document.addEventListener("keydown", preventTabDefault);
        return () => document.removeEventListener("keydown", preventTabDefault);
    }, []);

    const renderButtonGroup = (category: string, buttons: any[]) => (
        <div className={style.box}>
            <div className={style.title}>{category}</div>
            <div className={style.container}>
                {buttons.map((e, i) => (
                    <div key={i} className={style.block}>
                        <div
                            className={cn(style.button, currentButton?.category === category && currentButton?.id === e.id && style.error)}
                            onClick={() => setCurrentButton({ category, id: e.id })}
                            onKeyUp={(event) => handleKeyPress(event, category, e.id)}
                            tabIndex={0}
                        >
                            {getButtonName(e.keyCode)}
                        </div>
                        <div className={style.text}>{e.name}</div>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className={style.keybindmanager}>
            {renderButtonGroup("Control keys", buttonsByCategory.general)}
            {renderButtonGroup("Vehicle", buttonsByCategory.vehicle)}
            {renderButtonGroup("Inventory Quick Use", buttonsByCategory.fastslots)}
        </div>
    );
};

export default observer(Keybinds);
