import { FC, useCallback, useState } from "react";

import { observer } from "mobx-react-lite";
import cn from "classnames";
import CreatorStore from "src/stores/CharCreator.store";
import style from "./char.module.scss";
import CreatorName from "./components/CreatorName";

import infoicon from "../../assets/images/creator/info.svg";
import parenticon from "../../assets/images/creator/parent.svg";
import faceicon from "../../assets/images/creator/face.svg";
import hairstyleicon from "../../assets/images/creator/hairstyle.svg";
import makeupicon from "../../assets/images/creator/makeup.svg";
import CreatorParents from "./components/CreatorParents";

const CharacterCreator: FC<{ store: CreatorStore }> = ({ store }) => {
    const [category, setCategory] = useState<string>("info");

    const selectCategory = useCallback((cat: string) => {
        setCategory(cat);
    }, []);

    return (
        <div className={style.creator}>
            <div className={style.header}>
                <span>{"<-"}</span> Character Creation
            </div>
            <div className={style.navigation}>
                <div className={cn(style.item, category === "info" ? style.selected : undefined)} onClick={() => selectCategory("info")}>
                    <img src={infoicon} alt="" />
                </div>
                <div className={cn(style.item, category === "parents" ? style.selected : undefined)} onClick={() => selectCategory("parents")}>
                    <img src={parenticon} alt="" />
                </div>
                <div className={cn(style.item, category === "facefeatures" ? style.selected : undefined)} onClick={() => selectCategory("facefeatures")}>
                    <img src={faceicon} alt="" />
                </div>
                <div className={cn(style.item, category === "hairstyles" ? style.selected : undefined)} onClick={() => selectCategory("hairstyles")}>
                    <img src={hairstyleicon} alt="" />
                </div>
                <div className={cn(style.item, category === "makeup" ? style.selected : undefined)} onClick={() => selectCategory("makeup")}>
                    <img src={makeupicon} alt="" />
                </div>
                <div className={cn(style.item, category === "extra" ? style.selected : undefined)} onClick={() => selectCategory("extra")}>
                    <img src={infoicon} alt="" />
                </div>
                <div className={cn(style.item, category === "randomize" ? style.selected : undefined)} onClick={() => selectCategory("randomize")}>
                    <img src={infoicon} alt="" />
                </div>
            </div>

            {category === "info" ? <CreatorName store={store} /> : null}
            {category === "parents" ? <CreatorParents store={store} /> : null}
        </div>
    );
};

export default observer(CharacterCreator);
