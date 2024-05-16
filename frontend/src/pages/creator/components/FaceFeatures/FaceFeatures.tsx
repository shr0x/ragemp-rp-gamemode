import { FC, useCallback, useEffect, useMemo, useState } from "react";
import cn from "classnames";

import CreatorStore from "store/CharCreator.store";
import EventManager from "utils/EventManager.util";

import colors from "configs/colors";
import { observer } from "mobx-react-lite";
import style from "./facefeatures.module.scss";

const eyebrowsList = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30",
    "31",
    "32",
    "33",
    "34"
];
const CreatorPlayerFace: FC<{ store: CreatorStore }> = ({ store }) => {
    const [faceFeature, setFaceFeature] = useState("nose");

    const pages = useMemo(() => {
        return ["nose", "eyebrows", "cheekbones", "cheeks", "chin", "eyes"];
    }, []);

    const sendChangedData = useCallback((whichData: string) => {
        switch (whichData) {
            case "noseWidth":
                return EventManager.emitClient("creator", "preview", "face", 0, store.data.face.noseWidth);
            case "nosePeakHeight":
                return EventManager.emitClient("creator", "preview", "face", 1, store.data.face.nosePeakHeight);
            case "nosePeakLength":
                return EventManager.emitClient("creator", "preview", "face", 2, store.data.face.nosePeakLength);
            case "noseBoneHeight":
                return EventManager.emitClient("creator", "preview", "face", 3, store.data.face.noseBoneHeight);
            case "nosePeakLowering":
                return EventManager.emitClient("creator", "preview", "face", 4, store.data.face.nosePeakLowering);
            case "noseBoneTwist":
                return EventManager.emitClient("creator", "preview", "face", 5, store.data.face.noseBoneTwist);
            case "eyebrows":
                return EventManager.emitClient("creator", "preview", "hair", 1, store.data.hair.eyebrows);
            case "eyebrowHeight":
                return EventManager.emitClient("creator", "preview", "face", 6, store.data.face.eyebrowHeight);
            case "eyebrowForward":
                return EventManager.emitClient("creator", "preview", "face", 7, store.data.face.eyebrowForward);
            case "cheekboneHeight":
                return EventManager.emitClient("creator", "preview", "face", 8, store.data.face.cheekboneHeight);
            case "cheekboneWidth":
                return EventManager.emitClient("creator", "preview", "face", 9, store.data.face.cheekboneWidth);
            case "cheekWidth":
                return EventManager.emitClient("creator", "preview", "face", 10, store.data.face.cheekWidth);
            case "ChimpBoneLowering":
                return EventManager.emitClient("creator", "preview", "face", 15, store.data.face.ChimpBoneLowering);
            case "ChimpBoneLength":
                return EventManager.emitClient("creator", "preview", "face", 16, store.data.face.ChimpBoneLength);
            case "ChimpBoneWidth":
                return EventManager.emitClient("creator", "preview", "face", 17, store.data.face.ChimpBoneWidth);
            case "ChimpHole":
                return EventManager.emitClient("creator", "preview", "face", 18, store.data.face.ChimpHole);
            case "eyesWidth":
                return EventManager.emitClient("creator", "preview", "face", 11, store.data.face.eyesWidth);
            case "lips":
                return EventManager.emitClient("creator", "preview", "face", 12, store.data.face.lips);
            case "jawBoneWidth":
                return EventManager.emitClient("creator", "preview", "face", 13, store.data.face.jawBoneWidth);
            case "jawBoneBackLength":
                return EventManager.emitClient("creator", "preview", "face", 14, store.data.face.jawBoneBackLength);
            case "neckWidth":
                return EventManager.emitClient("creator", "preview", "face", 19, store.data.face.neckWidth);
            default:
                return;
        }
    }, []);

    const sendColorChangedData = useCallback((eyebrows: boolean) => {
        if (eyebrows) EventManager.emitClient("creator", "preview", "color", 1, store.data.color.eyebrows);
        else EventManager.emitClient("creator", "preview", "color", 2, colors.eyes[store.data.color.eyes].id);
    }, []);

    return (
        <div className={style.appearance}>
            <div className={style.navigation}>
                {pages.map((x, i) => {
                    return (
                        <div key={i}>
                            <div key={i} className={cn(style.element, faceFeature === x ? style.active : undefined)} onClick={() => setFaceFeature(x)}>
                                <img key={i} className={style.img} src={`${require(`../../../../assets/images/creator/icons/${x}.svg`)}`} alt="#"></img>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className={style.options}>
                <div className={style.title}>
                    <span>select {faceFeature} options</span>
                </div>
                <div className={style.list}>
                    {faceFeature === "nose" ? (
                        <div className="test">
                            <div key="k_noseWidth" className={style.element}>
                                <div className={style.range_element}>
                                    <span>width</span>
                                    <div className={style.slider}>
                                        <input
                                            type="range"
                                            max={100}
                                            min={-100}
                                            value={store.data.face.noseWidth}
                                            onChange={(value) => {
                                                store.data.face.noseWidth = Number(value.target.value);
                                                sendChangedData("noseWidth");
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div key="k_noseLength" className={style.element}>
                                <div className={style.range_element}>
                                    <span>height</span>
                                    <div className={style.slider}>
                                        <input
                                            type="range"
                                            max={100}
                                            min={-100}
                                            value={store.data.face.nosePeakHeight}
                                            onChange={(value) => {
                                                store.data.face.nosePeakHeight = Number(value.target.value);
                                                sendChangedData("nosePeakHeight");
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div key="k_noseHeight" className={style.element}>
                                <div className={style.range_element}>
                                    <span>length</span>
                                    <div className={style.slider}>
                                        <input
                                            type="range"
                                            max={100}
                                            min={-100}
                                            value={store.data.face.nosePeakLength}
                                            onChange={(value) => {
                                                store.data.face.nosePeakLength = Number(value.target.value);
                                                sendChangedData("nosePeakLength");
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div key="k_noseTip" className={style.element}>
                                <div className={style.range_element}>
                                    <span>nose tip</span>
                                    <div className={style.slider}>
                                        <input
                                            type="range"
                                            max={100}
                                            min={-100}
                                            value={store.data.face.noseBoneHeight}
                                            onChange={(value) => {
                                                store.data.face.noseBoneHeight = Number(value.target.value);
                                                sendChangedData("noseBoneHeight");
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div key="k_noseBridge" className={style.element}>
                                <div className={style.range_element}>
                                    <span>tip length</span>
                                    <div className={style.slider}>
                                        <input
                                            type="range"
                                            max={100}
                                            min={-100}
                                            value={store.data.face.nosePeakLowering}
                                            onChange={(value) => {
                                                store.data.face.nosePeakLowering = Number(value.target.value);
                                                sendChangedData("nosePeakLowering");
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div key="k_noseBridgeShaft" className={style.element}>
                                <div className={style.range_element}>
                                    <span>nose shaft</span>
                                    <div className={style.slider}>
                                        <input
                                            type="range"
                                            max={100}
                                            min={-100}
                                            value={store.data.face.noseBoneTwist}
                                            onChange={(value) => {
                                                store.data.face.noseBoneTwist = Number(value.target.value);
                                                sendChangedData("noseBoneTwist");
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : faceFeature === "eyebrows" ? (
                        <div className="test">
                            <div key="k_eyebrowsType" className={style.element}>
                                <div className={style.range_element}>
                                    <span>type</span>
                                    <div className={style.slider}>
                                        <input
                                            type="range"
                                            max={eyebrowsList.length - 1}
                                            min={0}
                                            step={1}
                                            value={store.data.hair.eyebrows}
                                            onChange={(value) => {
                                                store.data.hair.eyebrows = Number(value.target.value);
                                                sendChangedData("eyebrows");
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div key="k_eyebrowsHeight" className={style.element}>
                                <div className={style.range_element}>
                                    <span>height</span>
                                    <div className={style.slider}>
                                        <input
                                            type="range"
                                            max={100}
                                            min={-100}
                                            value={store.data.face.eyebrowHeight}
                                            onChange={(value) => {
                                                store.data.face.eyebrowHeight = Number(value.target.value);
                                                sendChangedData("eyebrowHeight");
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div key="k_eyebrowsDeep" className={style.element}>
                                <div className={style.range_element}>
                                    <span>depth</span>
                                    <div className={style.slider}>
                                        <input
                                            type="range"
                                            max={100}
                                            min={-100}
                                            value={store.data.face.eyebrowForward}
                                            onChange={(value) => {
                                                store.data.face.eyebrowForward = Number(value.target.value);
                                                sendChangedData("eyebrowForward");
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div key="k_eyebrowsColor" className={style.element}>
                                <div className={style.colorList}>
                                    <div className={style.element}>
                                        <span>eyebrow color</span>
                                        <div className={style.input}>
                                            {colors.hair.map((el, key) => {
                                                if (key < 19)
                                                    return (
                                                        <div
                                                            key={key}
                                                            className={cn(style.box, store.data.color.eyebrows === key && style.active)}
                                                            style={{ backgroundColor: `${el.color}` }}
                                                            onClick={() => {
                                                                store.data.color.eyebrows = key;
                                                                sendColorChangedData(true);
                                                            }}
                                                        />
                                                    );
                                                else return null;
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : faceFeature === "cheekbones" ? (
                        <div className="test">
                            <div key="k_cheekbonesHeight" className={style.element}>
                                <div className={style.range_element}>
                                    <span>height</span>
                                    <div className={style.slider}>
                                        <input
                                            type="range"
                                            max={100}
                                            min={-100}
                                            value={store.data.face.cheekboneHeight}
                                            onChange={(value) => {
                                                store.data.face.cheekboneHeight = Number(value.target.value);
                                                sendChangedData("cheekboneHeight");
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div key="k_cheekbonesWidth" className={style.element}>
                                <div className={style.range_element}>
                                    <span>width</span>
                                    <div className={style.slider}>
                                        <input
                                            type="range"
                                            max={100}
                                            min={-100}
                                            value={store.data.face.cheekboneWidth}
                                            onChange={(value) => {
                                                store.data.face.cheekboneWidth = Number(value.target.value);
                                                sendChangedData("cheekboneWidth");
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : faceFeature === "cheeks" ? (
                        <div className="test">
                            <div key="k_cheeksDeep" className={style.element}>
                                <div className={style.range_element}>
                                    <span>depth</span>
                                    <div className={style.slider}>
                                        <input
                                            type="range"
                                            max={100}
                                            min={-100}
                                            value={store.data.face.cheekWidth}
                                            onChange={(value) => {
                                                store.data.face.cheekWidth = Number(value.target.value);
                                                sendChangedData("cheekWidth");
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : faceFeature === "chin" ? (
                        <div className="test">
                            <div key="k_chinHeight" className={style.element}>
                                <div className={style.range_element}>
                                    <span>height</span>
                                    <div className={style.slider}>
                                        <input
                                            type="range"
                                            max={100}
                                            min={-100}
                                            value={store.data.face.ChimpBoneLowering}
                                            onChange={(value) => {
                                                store.data.face.ChimpBoneLowering = Number(value.target.value);
                                                sendChangedData("ChimpBoneLowering");
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div key="k_chinDeep" className={style.element}>
                                <div className={style.range_element}>
                                    <span>depth</span>
                                    <div className={style.slider}>
                                        <input
                                            type="range"
                                            max={100}
                                            min={-100}
                                            value={store.data.face.ChimpBoneLength}
                                            onChange={(value) => {
                                                store.data.face.ChimpBoneLength = Number(value.target.value);
                                                sendChangedData("ChimpBoneLength");
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div key="k_chinWidth" className={style.element}>
                                <div className={style.range_element}>
                                    <span>width</span>
                                    <div className={style.slider}>
                                        <input
                                            type="range"
                                            max={100}
                                            min={-100}
                                            value={store.data.face.ChimpBoneWidth}
                                            onChange={(value) => {
                                                store.data.face.ChimpBoneWidth = Number(value.target.value);
                                                sendChangedData("ChimpBoneWidth");
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div key="k_chinIndent" className={style.element}>
                                <div className={style.range_element}>
                                    <span>indentation</span>
                                    <div className={style.slider}>
                                        <input
                                            type="range"
                                            max={100}
                                            min={-100}
                                            value={store.data.face.ChimpHole}
                                            onChange={(value) => {
                                                store.data.face.ChimpHole = Number(value.target.value);
                                                sendChangedData("ChimpHole");
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : faceFeature === "eyes" ? (
                        <div className="test">
                            <div key="k_eyesWidth" className={style.element}>
                                <div className={style.range_element}>
                                    <span>width</span>
                                    <div className={style.slider}>
                                        <input
                                            type="range"
                                            max={100}
                                            min={-100}
                                            value={store.data.face.eyesWidth}
                                            onChange={(value) => {
                                                store.data.face.eyesWidth = Number(value.target.value);
                                                sendChangedData("eyesWidth");
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div key="k_eyesColor" className={style.element}>
                                <div className={style.colorList}>
                                    <div className={style.element}>
                                        <span>eye color</span>
                                        <div className={style.input}>
                                            {colors.eyes.map((el, key) => {
                                                if (![9, 10, 11].includes(el.id))
                                                    return (
                                                        <div
                                                            key={key}
                                                            className={cn(style.box, store.data.color.eyes === key && style.active)}
                                                            style={{ backgroundColor: `${el.color}` }}
                                                            onClick={() => {
                                                                store.data.color.eyes = key;
                                                                sendColorChangedData(false);
                                                            }}
                                                        />
                                                    );
                                                else return null;
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="test">
                            <div key="k_lips" className={style.element}>
                                <div className={style.range_element}>
                                    <span>lip thickness</span>
                                    <div className={style.slider}>
                                        <input
                                            type="range"
                                            max={100}
                                            min={-100}
                                            value={store.data.face.lips}
                                            onChange={(value) => {
                                                store.data.face.lips = Number(value.target.value);
                                                sendChangedData("lips");
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div key="k_chinWidth" className={style.element}>
                                <div className={style.range_element}>
                                    <span>jaw width</span>
                                    <div className={style.slider}>
                                        <input
                                            type="range"
                                            max={100}
                                            min={-100}
                                            value={store.data.face.jawBoneWidth}
                                            onChange={(value) => {
                                                store.data.face.jawBoneWidth = Number(value.target.value);
                                                sendChangedData("jawBoneWidth");
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div key="k_chinHeight" className={style.element}>
                                <div className={style.range_element}>
                                    <span>jaw size</span>
                                    <div className={style.slider}>
                                        <input
                                            type="range"
                                            max={100}
                                            min={-100}
                                            value={store.data.face.jawBoneBackLength}
                                            onChange={(value) => {
                                                store.data.face.jawBoneBackLength = Number(value.target.value);
                                                sendChangedData("jawBoneBackLength");
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div key="k_neckWidth" className={style.element}>
                                <div className={style.range_element}>
                                    <span>neck girth</span>
                                    <div className={style.slider}>
                                        <input
                                            type="range"
                                            max={100}
                                            min={-100}
                                            value={store.data.face.neckWidth}
                                            onChange={(value) => {
                                                store.data.face.neckWidth = Number(value.target.value);
                                                sendChangedData("neckWidth");
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default observer(CreatorPlayerFace);
