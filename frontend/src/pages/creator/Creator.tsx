import * as React from "react";
import cn from "classnames";
import { observer } from "mobx-react-lite";

import CreatorPlayerName from "./components/GeneralData/GeneralData";
import CreatorPlayerAppearance from "./components/Appearance/Appearance";
import CreatorPlayerFace from "./components/FaceFeatures/FaceFeatures";
import CreatorPlayerClothes from "./components/Clothing/Clothing";

import { setRandomOptions } from "./utils/Randomizer.module";

import { regExp } from "utils/Helpers.util";

import EventManager from "utils/EventManager.util";
import Notification from "utils/NotifyManager.util";

import infoicon from "assets/images/creator/icons/info.svg";
import hairstyleicon from "assets/images/creator/icons/hairstyle.svg";
import faceicon from "assets/images/creator/icons/face.svg";
import clothesicon from "assets/images/creator/icons/clothes.svg";
import mouseicon from "assets/images/creator/icons/rmb.svg";

import randomicon from "assets/images/creator/icons/random.svg";
import createicon from "assets/images/creator/icons/create.svg";

import style from "./creator.module.scss";
import { creatorStore } from "store/CharCreator.store";
import { createComponent } from "src/hoc/registerComponent";

const Creator: React.FC<{ store: typeof creatorStore }> = observer(({ store }) => {
    const [optionsPage, setOptionsPage] = React.useState("name"),
        [isNicknameValid, setNicknameValid] = React.useState(false);

    const navName = React.useRef<HTMLDivElement>(null),
        navAppearance = React.useRef<HTMLDivElement>(null),
        navFace = React.useRef<HTMLDivElement>(null),
        screen = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        EventManager.emitServer("creator", "navigation", optionsPage);
    }, [optionsPage]);

    React.useEffect(() => {
        const timeout = setTimeout(() => {
            if (screen.current) screen.current.classList.add("creator_active");
        }, 100);

        return () => clearTimeout(timeout);
    }, []);

    const handleSwitch = React.useCallback((page: string) => {
        setOptionsPage(page);
    }, []);

    const handleCreate = React.useCallback(() => {
        if (store.data.name.firstname && store.data.name.lastname) {
            const { firstname, lastname } = store.data.name;
            if (regExp.nickname.test(firstname) || regExp.nickname.test(lastname)) return Notification.error("Character name must contain only latin letters.");
            if (firstname.length < 3 || firstname.length > 12 || lastname.length < 3 || lastname.length > 12) return Notification.error("Character name must be between 4 and 24 characters");

            EventManager.emitServer("creator", "create", {
                sex: store.data.sex,
                name: store.data.name,
                parents: store.data.parents,
                hair: store.data.hair,
                face: store.data.face,
                color: store.data.color
            });
        }
    }, [store.data]); // eslint-disable-line

    return (
        <div ref={screen} className={style.creator}>
            <div className={style.navigation}>
                <div className={cn(style.element, optionsPage === "name" ? style.active : undefined)} ref={navName} onClick={() => handleSwitch("name")}>
                    <img src={infoicon} alt="" />
                </div>
                <div className={cn(style.element, optionsPage === "appearance" ? style.active : undefined)} ref={navAppearance} onClick={() => handleSwitch("appearance")}>
                    <img src={hairstyleicon} alt="" />
                </div>
                <div className={cn(style.element, optionsPage === "face" ? style.active : undefined)} ref={navFace} onClick={() => handleSwitch("face")}>
                    <img src={faceicon} alt="" />
                </div>{" "}
                <div className={cn(style.element, optionsPage === "clothes" ? style.active : undefined)} ref={navFace} onClick={() => handleSwitch("clothes")}>
                    <img src={clothesicon} alt="" />
                </div>
            </div>
            <div className={style.content}>
                <div className={style.title}>
                    <span>
                        {store.data.name.firstname} {store.data.name.lastname}
                    </span>
                </div>
                <div className={style.data}>
                    {optionsPage === "name" && <CreatorPlayerName store={store} {...{ isNicknameValid, setNicknameValid }} />}
                    {optionsPage === "appearance" && <CreatorPlayerAppearance store={store} />}
                    {optionsPage === "face" && <CreatorPlayerFace store={store} />}
                    {optionsPage === "clothes" && <CreatorPlayerClothes store={store} />}
                </div>
                <div className={style.player_name}>
                    <div className={style.create} onClick={handleCreate}>
                        <img src={createicon} alt="randomizer" /> <span>CREATE</span>
                    </div>
                    <div className={style.create} onClick={() => setRandomOptions(store)}>
                        <img src={randomicon} alt="randomizer" /> <span>RANDOMIZE</span>
                    </div>
                </div>

                <div className={style.rotate}>
                    <div className={style.desc}>RMB rotate -</div>
                    <img className={style.icon} src={mouseicon} alt="#" />
                </div>
            </div>
        </div>
    );
});

export default createComponent({
    props: { store: creatorStore },
    component: Creator,
    pageName: "creator"
});
