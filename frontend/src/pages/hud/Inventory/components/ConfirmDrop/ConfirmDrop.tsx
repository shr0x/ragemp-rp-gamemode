import error from "assets/images/error.svg";

import EventManager from "utils/EventManager.util";
import { FC, useCallback, useEffect, useRef } from "react";

import style from "./confirmdrop.module.scss";
import { CenterComponent } from "../../Interfaces";
import { inventoryStore } from "store/Inventory.store";

interface IConfirmItemDropProps {
    store: typeof inventoryStore;
    setMiddleComponent: (page: CenterComponent) => void;
    handleDrop: (isAccepted?: boolean) => void;
    itemInformation: any;
}

const ConfirmItemDrop: FC<IConfirmItemDropProps> = ({ store, setMiddleComponent, handleDrop, itemInformation }) => {
    const screen = useRef<HTMLDivElement>(null);

    const setSource = useCallback((img: string) => {
        try {
            return new URL(`../../../../../assets/images/hud/inventory/items/${img}`, import.meta.url).href;
        } catch (err) {
            return error;
        }
    }, []);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (screen.current) screen.current.style.opacity = "1";
        }, 200);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <div className={style.confirmitemdrop} ref={screen}>
            <div className={style.content}>
                <div className={style.render}>
                    <img
                        className={style.image}
                        src={setSource(`${itemInformation.image}`)}
                        alt="#"
                        style={{ filter: `drop-shadow(0 0 1.3888888888888888vh ${store.getItemQuality(itemInformation)})` }}
                    />
                    <div className={style.name}>{itemInformation.name}</div>
                    <div className={style.quality} style={{ textShadow: `0 0 0.4629629629629629vh ${store.getItemQuality(itemInformation)}` }}>
                        LEVEL {itemInformation.quality + 1}
                    </div>
                </div>
                <div className={style.title}>
                    Are you sure you want to delete <br />
                    this item?
                </div>
                <div className={style.choice}>
                    <div className={style.confirm} onClick={() => handleDrop(true)}>
                        <div className={style.top}>
                            <div className={style.title}>YES</div>
                            <svg className={style.trash} width="71.708" height="22.437" viewBox="0 0 71.708 22.437">
                                <defs>
                                    <filter id="id_trashTopFilter" x="0" y="0" width="71.708" height="22.437" filterUnits="userSpaceOnUse">
                                        {
                                            // @ts-ignore
                                            <feOffset dy="1" input="SourceAlpha" />
                                        }

                                        <feGaussianBlur stdDeviation="1.5" result="blur" />
                                        <feFlood floodOpacity="0.749" />
                                        <feComposite operator="in" in2="blur" />
                                        <feComposite in="SourceGraphic" />
                                    </filter>
                                </defs>
                                <g transform="matrix(1, 0, 0, 1, 0, 0)" filter="url(#id_trashTopFilter)">
                                    <path d="M54.531,8.979,50.052,4.5h-22.4L23.177,8.979H7.5v8.958H70.208V8.979Z" transform="translate(-3 -1)" className={style.trash} fill="#fff" />
                                </g>
                            </svg>
                        </div>
                        <svg className={style.bottom} width="62.75" height="71.708" viewBox="0 0 62.75 71.708">
                            <defs>
                                <filter id="id_trashBottomFilter" x="0" y="0" width="62.75" height="71.708" filterUnits="userSpaceOnUse">
                                    {
                                        // @ts-ignore
                                        <feOffset dy="1" input="SourceAlpha" />
                                    }
                                    <feGaussianBlur stdDeviation="1.5" result="blur" />
                                    <feFlood floodOpacity="0.749" />
                                    <feComposite operator="in" in2="blur" />
                                    <feComposite in="SourceGraphic" />
                                </filter>
                            </defs>
                            <g transform="matrix(1, 0, 0, 1, 0, 0)" filter="url(#id_trashBottomFilter)">
                                <path
                                    d="M9.45,66.048a8.985,8.985,0,0,0,8.958,8.958H54.241A8.985,8.985,0,0,0,63.2,66.048V12.3H9.45ZM20.468,34.156l6.316-6.316,9.541,9.5,9.5-9.5,6.316,6.316-9.5,9.5,9.5,9.5L45.82,59.463l-9.5-9.5-9.5,9.5-6.316-6.316,9.5-9.5Z"
                                    transform="translate(-4.95 -8.8)"
                                    fill="#fff"
                                />
                            </g>
                        </svg>
                    </div>
                    <div
                        className={style.decline}
                        onClick={() => {
                            setMiddleComponent("dropZone");
                            EventManager.emitServer("inventory", "onCancelItemDrop");
                        }}
                    >
                        NO
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmItemDrop;
