import * as React from "react";
import cn from "classnames";

import colors from "configs/colors";
import CreatorStore from "store/CharCreator.store";
import EventManager from "utils/EventManager.util";
import { observer } from "mobx-react-lite";

import style from "./appearance.module.scss";
// const headHairList = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"];

const chestHairList = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17"];
const beardHairList = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29"];

const CreatorPlayerAppearance: React.FC<{ store: CreatorStore }> = ({ store }) => {
    const [hairList, setHairList] = React.useState<number>(0);

    React.useEffect(() => {
        EventManager.emitClient("creator", "preview", "hair", 0, store.data.hair.head);
    }, [store.data.hair.head]);
    React.useEffect(() => {
        EventManager.emitClient("creator", "preview", "hair", 2, store.data.hair.chest);
    }, [store.data.hair.chest]);
    React.useEffect(() => {
        EventManager.emitClient("creator", "preview", "hair", 3, store.data.hair.beard);
    }, [store.data.hair.beard]);

    React.useEffect(() => {
        EventManager.emitClient("creator", "preview", "color", 0, store.data.color.head);
    }, [store.data.color.head]);
    React.useEffect(() => {
        EventManager.emitClient("creator", "preview", "color", 3, store.data.color.chest);
    }, [store.data.color.chest]);
    React.useEffect(() => {
        EventManager.emitClient("creator", "preview", "color", 4, store.data.color.beard);
    }, [store.data.color.beard]);

    React.useEffect(() => {
        setHairList(store.data.sex === 0 ? 82 : 86);
    }, [store.data.sex]);

    return (
        <div className={style.appearance}>
            <div className={style.options}>
                <div className={style.title}>
                    <span>Select your hairstyle</span>
                </div>
                <div className={style.list}>
                    <div className={style.range_element}>
                        <div key="k_hairType" className={style.element}>
                            <span>Hair Type</span>
                            <div className={style.slider}>
                                <input
                                    type="range"
                                    max={hairList}
                                    min={0}
                                    step={1}
                                    value={store.data.hair.head}
                                    onChange={(value) => {
                                        store.data.hair.head = Number(value.target.value);
                                    }}
                                />
                            </div>
                            <div className={style.colorList}>
                                <div className={style.input}>
                                    {colors.hair.map((el, key) => {
                                        if (key < 19)
                                            return (
                                                <div
                                                    key={key}
                                                    className={cn(style.box, store.data.color.head === key && style.active)}
                                                    style={{ backgroundColor: `${el.color}` }}
                                                    onClick={() => {
                                                        store.data.color.head = key;
                                                    }}
                                                />
                                            );
                                        else return null;
                                    })}
                                </div>
                            </div>
                            {store.data.sex === 0 && (
                                <>
                                    <div className={style.element}>
                                        <span>chest hair</span>
                                        <div className={style.slider}>
                                            <input
                                                type="range"
                                                max={chestHairList.length - 1}
                                                min={0}
                                                step={1}
                                                value={store.data.hair.chest}
                                                onChange={(value) => {
                                                    store.data.hair.chest = Number(value.target.value);
                                                }}
                                            />
                                        </div>
                                        <div className={style.colorList}>
                                            <div className={style.input}>
                                                {colors.hair.map((el, key) => {
                                                    if (key < 19)
                                                        return (
                                                            <div
                                                                key={key}
                                                                className={cn(style.box, store.data.color.chest === key && style.active)}
                                                                style={{ backgroundColor: `${el.color}` }}
                                                                onClick={() => {
                                                                    store.data.color.chest = key;
                                                                }}
                                                            />
                                                        );
                                                    else return null;
                                                })}
                                            </div>
                                        </div>
                                        <span>Beard Type</span>
                                        <div className={style.slider}>
                                            <input
                                                type="range"
                                                max={beardHairList.length - 1}
                                                min={0}
                                                step={1}
                                                value={store.data.hair.beard}
                                                onChange={(value) => {
                                                    store.data.hair.beard = Number(value.target.value);
                                                }}
                                            />
                                        </div>
                                        <div className={style.colorList}>
                                            <div className={style.input}>
                                                {colors.hair.map((el, key) => {
                                                    if (key < 19)
                                                        return (
                                                            <div
                                                                key={key}
                                                                className={cn(style.box, store.data.color.beard === key && style.active)}
                                                                style={{ backgroundColor: `${el.color}` }}
                                                                onClick={() => {
                                                                    store.data.color.beard = key;
                                                                }}
                                                            />
                                                        );
                                                    else return null;
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default observer(CreatorPlayerAppearance);
