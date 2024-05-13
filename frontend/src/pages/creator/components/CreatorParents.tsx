import { FC } from "react";

import maleicon from "../../../assets/images/creator/male.svg";
import femaleicon from "../../../assets/images/creator/female.svg";
import style from "../char.module.scss";
import CreatorStore from "src/stores/CharCreator.store";

const CreatorParents: FC<{ store: CreatorStore }> = ({ store }) => {
    return <div className={style.data}></div>;
};
export default CreatorParents;
