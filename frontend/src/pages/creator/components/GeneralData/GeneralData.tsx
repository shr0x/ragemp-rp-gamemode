import { FC, useCallback, useEffect, useMemo, useState } from "react";

import cn from "classnames";
import { observer } from "mobx-react-lite";

import successIcon from "assets/images/creator/icons/success.svg";
import wrongIcon from "assets/images/creator/icons/error.svg";

import { badWords, badNames } from "../../utils/Textchecker";

import { regExp } from "utils/Helpers.util";
import CreatorStore from "src/stores/CharCreator.store";
import EventManager from "utils/EventManager.util";

import style from "./generaldata.module.scss";

import maleicon from "assets/images/creator/icons/male.svg";
import femaleicon from "assets/images/creator/icons/female.svg";

const CreatorPlayerName: FC<{ store: CreatorStore; isNicknameValid: boolean; setNicknameValid: (value: boolean) => void }> = ({ store, isNicknameValid, setNicknameValid }) => {
    const [parents, setParents] = useState({ mother: 0, father: 0 });

    const fathersList = useMemo(
            () => [
                { id: 0, image: require("assets/images/creator/male/0.png"), name: "Benjamin" },
                { id: 1, image: require("assets/images/creator/male/1.png"), name: "Daniel" },
                { id: 2, image: require("assets/images/creator/male/2.png"), name: "Joshua" },
                { id: 3, image: require("assets/images/creator/male/3.png"), name: "Noah" },
                { id: 4, image: require("assets/images/creator/male/4.png"), name: "Andrew" },
                { id: 5, image: require("assets/images/creator/male/5.png"), name: "Joan" },
                { id: 6, image: require("assets/images/creator/male/6.png"), name: "Alex" },
                { id: 7, image: require("assets/images/creator/male/7.png"), name: "Isaac" },
                { id: 8, image: require("assets/images/creator/male/8.png"), name: "Evan" },
                { id: 9, image: require("assets/images/creator/male/9.png"), name: "Ethan" },
                { id: 10, image: require("assets/images/creator/male/10.png"), name: "Vincent" },
                { id: 11, image: require("assets/images/creator/male/11.png"), name: "Angel" },
                { id: 12, image: require("assets/images/creator/male/12.png"), name: "Diego" },
                { id: 13, image: require("assets/images/creator/male/13.png"), name: "Adrian" },
                { id: 14, image: require("assets/images/creator/male/14.png"), name: "Gabriel" },
                { id: 15, image: require("assets/images/creator/male/15.png"), name: "Michael" },
                { id: 16, image: require("assets/images/creator/male/16.png"), name: "Santiago" },
                { id: 17, image: require("assets/images/creator/male/17.png"), name: "Kevin" },
                { id: 18, image: require("assets/images/creator/male/18.png"), name: "Louis" },
                { id: 19, image: require("assets/images/creator/male/19.png"), name: "Samuel" },
                { id: 20, image: require("assets/images/creator/male/20.png"), name: "Anthony" },
                { id: 42, image: require("assets/images/creator/male/42.png"), name: "Claude" },
                { id: 43, image: require("assets/images/creator/male/43.png"), name: "Niko" },
                { id: 44, image: require("assets/images/creator/male/44.png"), name: "John" }
            ],
            []
        ),
        mothersList = useMemo(
            () => [
                { id: 21, image: require("assets/images/creator/female/21.png"), name: "Hannah" },
                { id: 22, image: require("assets/images/creator/female/22.png"), name: "Audrey" },
                { id: 23, image: require("assets/images/creator/female/23.png"), name: "Jasmine" },
                { id: 24, image: require("assets/images/creator/female/24.png"), name: "Giselle" },
                { id: 25, image: require("assets/images/creator/female/25.png"), name: "Amelia" },
                { id: 26, image: require("assets/images/creator/female/26.png"), name: "Isabella" },
                { id: 27, image: require("assets/images/creator/female/27.png"), name: "Zoe" },
                { id: 28, image: require("assets/images/creator/female/28.png"), name: "Ava" },
                { id: 29, image: require("assets/images/creator/female/29.png"), name: "Camilla" },
                { id: 30, image: require("assets/images/creator/female/30.png"), name: "Violet" },
                { id: 31, image: require("assets/images/creator/female/31.png"), name: "Sophia" },
                { id: 32, image: require("assets/images/creator/female/32.png"), name: "Eveline" },
                { id: 33, image: require("assets/images/creator/female/33.png"), name: "Nicole" },
                { id: 34, image: require("assets/images/creator/female/34.png"), name: "Ashley" },
                { id: 35, image: require("assets/images/creator/female/35.png"), name: "Grace" },
                { id: 36, image: require("assets/images/creator/female/36.png"), name: "Brianna" },
                { id: 37, image: require("assets/images/creator/female/37.png"), name: "Natalie" },
                { id: 38, image: require("assets/images/creator/female/38.png"), name: "Olivia" },
                { id: 39, image: require("assets/images/creator/female/39.png"), name: "Elizabeth" },
                { id: 40, image: require("assets/images/creator/female/40.png"), name: "Charlotte" },
                { id: 41, image: require("assets/images/creator/female/41.png"), name: "Emma" },
                { id: 45, image: require("assets/images/creator/female/45.png"), name: "Misty" }
            ],
            []
        );

    const changeFather = useCallback(
        (e: number) => {
            store.data.parents.father = e;
            sendParentsData(0);
            setParents({ ...parents, father: e });
        },
        [fathersList, store.data.parents, parents]
    );

    const changeMother = useCallback(
        (e: number) => {
            store.data.parents.mother = e;
            sendParentsData(1);
            setParents({ ...parents, mother: e });
        },
        [mothersList, store.data.parents, parents]
    );

    useEffect(() => {
        let fatherOld = fathersList.findIndex((el) => el.id === store.data.parents.father);
        let motherOld = mothersList.findIndex((el) => el.id === store.data.parents.mother);
        setParents({ mother: motherOld, father: fatherOld });
    }, []);

    const sendParentsData = useCallback((idx: number) => {
        switch (idx) {
            case 0:
                return EventManager.emitClient("creator", "preview", "parents", 0, store.data.parents.father);
            case 1:
                return EventManager.emitClient("creator", "preview", "parents", 1, store.data.parents.mother);
            case 2:
                return EventManager.emitClient("creator", "preview", "parents", 2, store.data.parents.leatherMix);
            case 3:
                return EventManager.emitClient("creator", "preview", "parents", 3, store.data.parents.similarity);
            default:
                return;
        }
    }, []);

    const checkNickname = useCallback(() => {
        setNicknameValid(false);

        const firstname = store.data.name.firstname.toLowerCase(),
            lastname = store.data.name.lastname.toLowerCase();
        if (firstname === "" || lastname === "") return;

        for (let i = 0; i < badNames.length; i++) {
            if (firstname.includes(badNames[i][0]) && lastname.includes(badNames[i][1])) return;
        }

        if (regExp.nickname.test(firstname)) return setNicknameValid(false);
        else if (regExp.nickname.test(lastname)) return setNicknameValid(false);
        else if (badWords.indexOf(firstname) >= 0 || badWords.indexOf(lastname) >= 0) return setNicknameValid(false);
        else if (firstname.length < 3) return setNicknameValid(false);
        else if (lastname.length < 3) return setNicknameValid(false);
        else if (firstname.length > 12) return setNicknameValid(false);
        else if (lastname.length > 12) return setNicknameValid(false);
        else {
            return setNicknameValid(true);
        }
    }, [store.data.name]); // eslint-disable-line

    useEffect(() => {
        checkNickname();
    }, [store.data.name.firstname, store.data.name.lastname]);

    return (
        <div className={style.generaldata}>
            <div className={style.title}>
                <span>SELECT GENDER AND NAME</span>
                <img src={isNicknameValid ? successIcon : wrongIcon} alt="#" />
            </div>
            <div className={style.form}>
                <div className={style.namedata}>
                    <div className={style.nameinput}>
                        <input
                            key="k_firstname"
                            type="text"
                            placeholder="Firstname"
                            maxLength={13}
                            onChange={(e) => (store.data.name.firstname = e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1).toLowerCase())}
                            value={store.data.name.firstname}
                        />
                    </div>
                    <div className={style.nameinput}>
                        <input
                            key="k_lastname"
                            type="text"
                            placeholder="Lastname"
                            maxLength={13}
                            onChange={(e) => (store.data.name.lastname = e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1).toLowerCase())}
                            value={store.data.name.lastname}
                        />
                    </div>
                </div>

                <div className={style.gender}>
                    <div
                        className={cn(style.female, store.data.sex === 1 ? style.active : undefined)}
                        onClick={() => {
                            store.data.sex = 0;
                            EventManager.emitClient("creator", "preview", "sex", 0);
                        }}
                    >
                        <img src={maleicon} alt="" /> male
                    </div>
                    <div
                        className={cn(style.male, store.data.sex === 0 ? style.active : undefined)}
                        onClick={() => {
                            store.data.sex = 1;
                            EventManager.emitClient("creator", "preview", "sex", 1);
                        }}
                    >
                        <img src={femaleicon} alt="" /> female
                    </div>
                </div>
            </div>

            <div className={style.title}>
                <span>SELECT PARENTS</span>
            </div>
            <div className={style.parentsImages}>
                <div className={style.box}>
                    <div className={style.list}>
                        <div key={store.data.parents.mother} className={style.element}>
                            <img className={style.image} src={mothersList[store.data.parents.mother]?.image} alt="#" />
                        </div>
                    </div>
                    <div className={style.name}>{mothersList[store.data.parents.mother].name}</div>
                </div>

                <div className={style.box}>
                    <div className={style.list}>
                        <div key={store.data.parents.father} className={style.element}>
                            <img className={style.image} src={fathersList[store.data.parents.father]?.image} alt="#" />
                        </div>
                    </div>
                    <div className={style.name}>{fathersList[store.data.parents.father].name}</div>
                </div>
            </div>
            <div className={style.options}>
                <div className={style.list}>
                    <div className={style.element}>
                        <div className={style.range_element}>
                            <div className={style.parentsRange}>
                                <div className={style.slider}>
                                    <input
                                        type="range"
                                        max={mothersList.length - 1}
                                        min={0}
                                        step={1}
                                        value={store.data.parents.mother}
                                        onChange={(value) => {
                                            changeMother(parseInt(value.target.value));
                                        }}
                                    />
                                </div>
                                <div className={style.slider}>
                                    <input
                                        type="range"
                                        max={fathersList.length - 1}
                                        min={0}
                                        value={store.data.parents.father}
                                        onChange={(value) => {
                                            changeFather(parseInt(value.target.value));
                                        }}
                                    />
                                </div>
                            </div>
                            <span>similarity</span>
                            <div className={style.slider}>
                                <input
                                    type="range"
                                    max={100}
                                    min={-100}
                                    value={store.data.parents.similarity}
                                    onChange={(value) => {
                                        store.data.parents.similarity = Number(value.target.value);
                                        sendParentsData(3);
                                    }}
                                />
                            </div>
                            <span>skin color</span>
                            <div className={style.slider}>
                                <input
                                    type="range"
                                    max={100}
                                    min={-100}
                                    value={store.data.parents.leatherMix}
                                    onChange={(value) => {
                                        store.data.parents.leatherMix = Number(value.target.value);
                                        sendParentsData(2);
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default observer(CreatorPlayerName);
