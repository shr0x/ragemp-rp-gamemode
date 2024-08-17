import { FC, useState, useCallback, useEffect } from "react";
import { observer } from "mobx-react-lite";
import EventManager from "utils/EventManager.util";
import { nativemenuStore } from "store/Nativemenu.store";

import style from "./listitem.module.scss";
import { RageShared } from "../../../../../../../source/shared";

interface ISwitchProps {
    store: typeof nativemenuStore;
    el: RageShared.Interfaces.INativeMenuItem;
    idx: number;
    currentIndex: number;
}

const Switch: FC<ISwitchProps> = ({ store, el, idx, currentIndex }) => {
    if (!el.data) return null;
    const [currentIndexSwitch, setCurrentIndexSwitch] = useState(0);

    const updateIndex = useCallback(
        (direction: number) => {
            if (!el.data) return;

            const newIndex = (currentIndexSwitch + direction + el.data.length) % el.data.length;
            setCurrentIndexSwitch(newIndex);

            if (el.uid) {
                store.changeValue(el.uid, el.data[newIndex]);
                EventManager.emitServer("nativemenu", "onSwitchChange", el.data[newIndex]);
            }
        },
        [currentIndexSwitch, el.data, el.uid, store]
    );

    const handleKeyPressDown = useCallback(
        (e: KeyboardEvent) => {
            if (currentIndex === idx && (e.key === "ArrowLeft" || e.key === "ArrowRight")) {
                updateIndex(e.key === "ArrowLeft" ? -1 : 1);
            }
        },
        [currentIndex, idx, updateIndex]
    );

    useEffect(() => {
        document.addEventListener("keydown", handleKeyPressDown);
        return () => document.removeEventListener("keydown", handleKeyPressDown);
    }, [handleKeyPressDown]);

    return (
        <div className={style.main}>
            {currentIndex === idx && (
                <svg xmlns="http://www.w3.org/2000/svg" width="11.115" height="18" viewBox="0 0 11.115 18">
                    <path
                        id="Icon_material-keyboard-arrow-left"
                        data-name="Icon material-keyboard-arrow-left"
                        d="M23.115,24.135l-6.87-6.885,6.87-6.885L21,8.25l-9,9,9,9Z"
                        transform="translate(23.115 26.25) rotate(180)"
                        opacity="1"
                        fill="red"
                    ></path>
                </svg>
            )}
            <div className={style.title}>{el.name}</div>
            <div className={style.switch}>
                <div className={style.button_left} onClick={() => updateIndex(-1)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="11.115" height="18" viewBox="0 0 11.115 18">
                        <path
                            id="Icon_material-keyboard-arrow-left"
                            data-name="Icon material-keyboard-arrow-left"
                            d="M23.115,24.135l-6.87-6.885,6.87-6.885L21,8.25l-9,9,9,9Z"
                            transform="translate(23.115 26.25) rotate(180)"
                            opacity="0.8"
                        />
                    </svg>
                </div>
                <div className={style.value}>{el.data[currentIndexSwitch]}</div>
                <div className={style.button_right} onClick={() => updateIndex(1)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="11.115" height="18" viewBox="0 0 11.115 18">
                        <path
                            id="Icon_material-keyboard-arrow-left"
                            data-name="Icon material-keyboard-arrow-left"
                            d="M23.115,24.135l-6.87-6.885,6.87-6.885L21,8.25l-9,9,9,9Z"
                            transform="translate(23.115 26.25) rotate(180)"
                            opacity="0.8"
                        />
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default observer(Switch);
