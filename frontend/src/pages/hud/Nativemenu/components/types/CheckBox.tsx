import { FC, useCallback, useEffect } from "react";
import { observer } from "mobx-react-lite";
import cn from "classnames";
import EventManager from "utils/EventManager.util";

import { nativemenuStore } from "store/Nativemenu.store";
import style from "./listitem.module.scss";
import { RageShared } from "../../../../../../../source/shared";

interface ICheckBoxProps {
    store: typeof nativemenuStore;
    el: RageShared.Interfaces.INativeMenuItem;
    idx: number;
    currentIndex: number;
}

const CheckBox: FC<ICheckBoxProps> = ({ store, el, idx, currentIndex }) => {
    const handleKeyPressDown = useCallback(
        (e: KeyboardEvent) => {
            if (currentIndex === idx && e.key === "Enter") {
                changeCheckboxValue(el);
            }
        },
        [currentIndex, el.uid, el.value, idx, store]
    );

    const changeCheckboxValue = useCallback((el: RageShared.Interfaces.INativeMenuItem) => {
        EventManager.emitServer("nativemenu", "onCheckboxChange", { id: store.menu.id, name: el.name, value: !el.value });
        if (el.uid) store.changeValue(el.uid, !el.value);
    }, []);

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
            <div className={style.checkbox}>
                <div
                    className={cn(style.box, el.value && style.box_active)}
                    onClick={() => {
                        changeCheckboxValue(el);
                    }}
                ></div>
            </div>
        </div>
    );
};

export default observer(CheckBox);
