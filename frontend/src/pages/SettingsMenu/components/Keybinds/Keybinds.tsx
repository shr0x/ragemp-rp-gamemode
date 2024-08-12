import * as React from "react";
import cn from "classnames";
import { observer } from "mobx-react-lite";

import EventManager from "utils/EventManager.util";
import { playerStore } from "store/Player.store";
import style from "./keybind.module.scss";

const Keybinds: React.FC<{
    store: typeof playerStore;
}> = ({ store }) => {
    const [currentButton, setCurrentButton] = React.useState<{ category: string; id: number } | null>(null);
    const [buttons, setButtons] = React.useState([]);

    const getDefaultButtons = React.useMemo(() => {
        return store.settings.buttons.general.filter((e) => e.type === "default");
    }, [store.settings.buttons]);

    const getVehicleButtons = React.useMemo(() => {
        return store.settings.buttons.vehicle.filter((e) => e.type === "default");
    }, [store.settings.buttons]);

    const getFastButtons = React.useMemo(() => {
        return store.settings.buttons.fastslots.filter((e) => e.type === "fast");
    }, [store.settings.buttons]);

    const handleKeyPress = React.useCallback(
        (event: any, cat: string, id: number) => {
            if (currentButton === null) return;
            if (
                event.location === 3 ||
                ![
                    49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 189, 187, 69, 70, 82, 84, 89, 85, 73, 79, 80, 219, 221, 70, 71, 72, 74, 75, 76, 186, 222, 90, 88, 67, 86, 66, 78, 77, 188, 190, 191, 20, 9,
                    119, 116, 40, 38, 39, 37
                ].includes(event.keyCode)
            ) {
                setCurrentButton(null);
            }

            const checkButton = store.settings.buttons[cat].filter((e) => e.keyCode === event.keyCode && e.type !== "default");
            if (checkButton.length > 0) {
                if (checkButton[0].id === currentButton.id) {
                    return setCurrentButton(null);
                } else {
                    return setCurrentButton(null);
                }
            }
            EventManager.emitClient("settingsMenu", "changeButton", { category: cat, id: id, keyCode: event.keyCode });
            setCurrentButton(null);
        },
        [currentButton, setButtons, buttons]
    ); // eslint-disable-line

    const getButtonName = (keyCode: number) => {
        switch (keyCode) {
            case 9:
                return "Tab";
            case 13:
                return "ENT";
            case 18:
                return "ALT";
            case 20:
                return "Сaps";
            case 189:
                return "-";
            case 187:
                return "=";
            case 186:
                return ";";
            case 222:
                return `'`;
            case 188:
                return ",";
            case 219:
                return "[";
            case 221:
                return "]";
            case 190:
                return ".";
            case 191:
                return "/";
            case 40:
                return "↓";
            case 38:
                return "↑";
            case 37:
                return "←";
            case 39:
                return "→";
            case 119:
                return "F8";
            case 116:
                return "F5";

            default:
                return String.fromCharCode(keyCode);
        }
    };

    React.useEffect(() => {
        document.addEventListener("keydown", (event) => {
            if (event.keyCode === 9) event.preventDefault();
        });

        return () =>
            document.removeEventListener("keydown", (event) => {
                if (event.keyCode === 9) event.preventDefault();
            });
    }, []);

    return (
        <div className={style.keybindmanager}>
            <div className={style.box}>
                <div className={style.title}>Control keys</div>
                <div className={style.container}>
                    {getDefaultButtons.map((e, i) => {
                        return (
                            <div key={i} className={style.block}>
                                <div
                                    className={cn(style.button, currentButton?.category === "general" && currentButton?.id === e.id && style.error)}
                                    onClick={() => setCurrentButton({ category: "general", id: e.id })}
                                    onKeyUp={(event) => {
                                        handleKeyPress(event, "general", e.id);
                                    }}
                                    tabIndex={0}
                                >
                                    {getButtonName(e.keyCode)}
                                </div>
                                <div className={style.text}>{e.name}</div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className={style.box}>
                <div className={style.center}>
                    <div className={style.title}>Vehicle</div>
                    <div className={style.container}>
                        {getVehicleButtons.map((e, i) => {
                            return (
                                <div key={i} className={style.block}>
                                    <div
                                        className={cn(style.button, currentButton?.category === "vehicle" && currentButton?.id === e.id && style.error)}
                                        onClick={() => setCurrentButton({ category: "vehicle", id: e.id })}
                                        onKeyUp={(event) => {
                                            handleKeyPress(event, "vehicle", e.id);
                                        }}
                                        tabIndex={0}
                                    >
                                        {getButtonName(e.keyCode)}
                                    </div>
                                    <div className={style.text}>{e.name}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className={style.box}>
                <div className={style.right}>
                    <div className={style.title}>Inventory Quick Use</div>
                    <div className={style.container}>
                        {getFastButtons.map((e, i) => {
                            return (
                                <div key={i} className={style.block}>
                                    <div
                                        className={cn(style.button, currentButton?.category === "fastslots" && currentButton?.id === e.id ? style.error : style.blue)}
                                        onClick={() => setCurrentButton({ category: "fastslots", id: e.id })}
                                        onKeyUp={(event) => {
                                            handleKeyPress(event, "fastslots", e.id);
                                        }}
                                        tabIndex={0}
                                    >
                                        {getButtonName(e.keyCode)}
                                    </div>
                                    <div className={style.text}>{e.name}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default observer(Keybinds);
