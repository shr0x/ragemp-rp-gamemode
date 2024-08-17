import { FC, useCallback, useState, useEffect, useRef } from "react";

import Button from "./types/Button";
import CheckBox from "./types/CheckBox";
import Switch from "./types/Switch";

import { nativemenuStore } from "store/Nativemenu.store";
import style from "./container.module.scss";
import { RageShared } from "../../../../../../source/shared";

interface IContainerProps {
    store: typeof nativemenuStore;
    data: RageShared.Interfaces.INativeMenuItem[];
    name?: string;
    depth: number;
}

const Container: FC<IContainerProps> = ({ store, data, name, depth }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const scrollAbleRefs = useRef<(HTMLDivElement | null)[]>([]);

    const handleKeyPressDown = useCallback(
        (e: KeyboardEvent) => {
            const isUpArrow = e.key === "ArrowUp";
            const isDownArrow = e.key === "ArrowDown";

            if (isUpArrow || isDownArrow) {
                const direction = isUpArrow ? -1 : 1;
                const nextIndex = (currentIndex + direction + data.length) % data.length;
                setCurrentIndex(nextIndex);
            }
        },
        [currentIndex, data]
    );

    const handleItemClick = useCallback(
        (itemindex: number) => {
            setCurrentIndex(itemindex);
        },
        [currentIndex, setCurrentIndex]
    );

    useEffect(() => {
        const currentItem = scrollAbleRefs.current[currentIndex];
        if (currentItem) {
            currentItem.scrollIntoView({ behavior: "auto", block: "nearest" });
        }
    }, [currentIndex]);

    useEffect(() => {
        document.addEventListener("keydown", handleKeyPressDown);
        return () => document.removeEventListener("keydown", handleKeyPressDown);
    }, [handleKeyPressDown]);

    useEffect(() => {
        setCurrentIndex(0);
    }, []);

    return (
        <>
            {data.map((el, idx: number) => {
                return (
                    <div key={idx} className={style.main} onClick={() => handleItemClick(idx)} ref={(el) => (scrollAbleRefs.current[idx] = el)}>
                        {el.type === 0 ? (
                            <Button store={store} {...{ el, idx, currentIndex }} />
                        ) : el.type === 1 ? (
                            <CheckBox store={store} {...{ el, idx, currentIndex }} />
                        ) : (
                            <Switch store={store} {...{ el, idx, currentIndex }} />
                        )}
                    </div>
                );
            })}
        </>
    );
};

export default Container;
