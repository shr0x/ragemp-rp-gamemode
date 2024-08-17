import { FC, useState, useMemo, useRef, useEffect, useCallback, CSSProperties } from "react";
import { observer } from "mobx-react-lite";
import cn from "classnames";

import EventManager from "../../../utils/EventManager.util";
import { regExp } from "utils/Helpers.util";
import { hudStore } from "store/Hud.store";

import style from "./interactbutton.module.scss";

const rarityColors: { [key: number]: string } = {
    0: "#B7C2F8",
    1: "#8A9EFF",
    2: "#C970FF",
    3: "#FF8888",
    4: "#FFD139"
};

const InteractButton: FC<{ store: typeof hudStore }> = observer(({ store }) => {
    const [input, setInput] = useState(""),
        [timer, setTimer] = useState(false),
        timeout = useRef<NodeJS.Timeout | null>(null),
        animationRef = useRef<HTMLDivElement>(null);

    const buttonImage = useMemo(() => {
        const image = new URL(`../../../assets/images/hud/inventory/items/${store.interactButton?.image}.svg`, import.meta.url).href;
        return image.includes("undefined") ? new URL("../../../assets/images/hud/icons/interact.svg", import.meta.url).href : image;
    }, [store.interactButton?.image]);

    useEffect(() => {
        if (!store.interactButton) return;
        const animationElement = animationRef.current;
        if (animationElement) {
            animationElement.classList.toggle(style.interaction_active, !!store.interactButton);
        }
        setTimer(store.interactButton.autoStart);
    }, [store.interactButton, store.interactButton?.autoStart]);

    const handleTimerControl = useCallback(
        (action: "start" | "stop") => {
            if (!store.interactButton || store.interactButton.autoStart) return;

            const startAction = action === "start";
            if (timer !== startAction) {
                setTimer(startAction);
                EventManager.emitServer("interactionButton", startAction ? "holdDownE" : "stopHoldingE");
            }
        },
        [store.interactButton, store.interactButton?.autoStart, timer]
    );

    useEffect(() => {
        if (!store.interactButton) return;
        if (timer) {
            timeout.current = setTimeout(() => {
                if (!store.interactButton?.autoStart) {
                    EventManager.emitServer("interactionButton", "progressCompleted");
                }
                store.setInteractButtonData(null);
                setTimer(false);
            }, store.interactButton.time * 1000);
        } else if (timeout.current) {
            clearTimeout(timeout.current);
        }
    }, [timer, store.interactButton?.time, store]);

    useEffect(() => {
        if (!store.interactButton) return;
        if (parseInt(input) > store.interactButton.count) {
            setInput(String(store.interactButton.count));
        }
    }, [input, store.interactButton?.count]);

    const sendCount = useCallback(() => {
        if (input) {
            EventManager.emitServer("interactionButton", "interact", { type: store.interactButton?.image, count: input });
            setInput("");
        }
    }, [input, store.interactButton?.image]);

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.code === "Enter") sendCount();
        if (e.code === "KeyE") handleTimerControl("start");
    };

    const handleKeyUp = (e: KeyboardEvent) => {
        if (e.code === "KeyE") handleTimerControl("stop");
    };
    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("keyup", handleKeyUp);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("keyup", handleKeyUp);
        };
    }, [sendCount, handleTimerControl]);

    if (!store.interactButton) return;

    return (
        <div ref={animationRef} className={style.interactbutton} style={{ "--bg": rarityColors[store.interactButton.rarity] } as CSSProperties}>
            {store.interactButton.count > 0 && (
                <div className={style.input}>
                    <label htmlFor="interactive" className={style.box}>
                        <input type="text" placeholder="Amount" id="interactive" value={input} onChange={(e) => setInput(e.target.value.replace(regExp.number, ""))} />
                        <div className={style.inputbutton} onClick={sendCount}></div>
                    </label>
                    <div
                        className={style.button}
                        onClick={() => {
                            setInput(String(store.interactButton?.count));
                            EventManager.emitServer("interactionButton", "interact", {
                                type: store.interactButton?.image,
                                count: store.interactButton?.count
                            });
                        }}
                    >
                        MAX
                    </div>
                </div>
            )}
            <div className={style.left} style={{ transform: timer && store.interactButton.count <= 0 && !store.interactButton.autoStart && `translate(7.314814814814815vh, 0vh)` } as CSSProperties}>
                {!store.interactButton.autoStart && store.interactButton.count ? <div className={style.count}>x{store.interactButton.count}</div> : undefined}
                <div className={cn(style.timer, { [style.active]: timer })} style={{ "--seconds": `${store.interactButton.time}s` } as CSSProperties}>
                    <span className={style.timertop}></span>
                    <span className={style.timerright}></span>
                    <span className={style.timerbottom}></span>
                    <span className={style.timerleft}></span>
                </div>
                <img
                    src={buttonImage}
                    alt="#"
                    className={style.img}
                    style={{ "--filter": rarityColors[store.interactButton.rarity] ? rarityColors[store.interactButton.rarity] : "#000" } as CSSProperties}
                />
            </div>
            <div className={style.right} style={{ transform: timer && store.interactButton.count <= 0 && !store.interactButton.autoStart ? `translate(7.5vh, 0vh)` : undefined }}>
                <div className={style.background} style={{ "--color": rarityColors[store.interactButton.rarity] } as CSSProperties}></div>
                <div className={style.button}>{store.interactButton.button}</div>
                <div className={style.container}>
                    <div className={style.title}>{store.interactButton.header}</div>
                    <div className={style.desc}>{store.interactButton.description}</div>
                </div>
            </div>
        </div>
    );
});

export default InteractButton;
