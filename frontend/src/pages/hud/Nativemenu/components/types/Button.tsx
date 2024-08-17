import { FC, useCallback, useEffect } from "react";
import EventManager from "utils/EventManager.util";

import style from "./listitem.module.scss";
import { RageShared } from "../../../../../../../source/shared";
import { nativemenuStore } from "store/Nativemenu.store";

interface IButtonProps {
    store: typeof nativemenuStore;
    el: RageShared.Interfaces.INativeMenuItem;
    idx: number;
    currentIndex: number;
}

const Button: FC<IButtonProps> = ({ store, el, idx, currentIndex }) => {
    const handleKeyPressDown = useCallback(
        (e: KeyboardEvent) => {
            if (currentIndex === idx && e.key === "Enter") {
                EventManager.emitServer("nativemenu", "onSelectItem", { id: store.menu.id, listitem: currentIndex, name: el.name, uid: el.uid });
            }
        },
        [currentIndex, el.value, idx]
    );

    useEffect(() => {
        document.addEventListener("keydown", handleKeyPressDown);
        return () => document.removeEventListener("keydown", handleKeyPressDown);
    }, [handleKeyPressDown]);

    return (
        <div className={style.main} onClick={() => EventManager.emitServer("nativemenu", "onSelectItem", { id: store.menu.id, listitem: currentIndex, name: el.name, uid: el.uid })}>
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
        </div>
    );
};

export default Button;
