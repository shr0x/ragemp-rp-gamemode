import * as React from "react";
import { observer } from "mobx-react-lite";
import CreatorStore from "src/stores/CharCreator.store";

import style from "./char.module.scss";
const CharacterCreator: React.FC<{ store: CreatorStore }> = ({ store }) => {
    return <div className={style.creator}>hello world</div>;
};

export default observer(CharacterCreator);
