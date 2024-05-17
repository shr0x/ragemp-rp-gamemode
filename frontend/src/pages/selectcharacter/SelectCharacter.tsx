import { observer } from "mobx-react-lite";
import { FC, useCallback } from "react";
import PlayerStore from "store/Player.store";
import style from "./selectcharacter.module.scss";
import EventManager from "utils/EventManager.util";

import moneyIcon from "assets/images/selector/icons/money.svg";
import bankIcon from "assets/images/selector/icons/bank.svg";

const CharacterSelector: FC<{ store: PlayerStore }> = ({ store }) => {
    const selectCharacter = useCallback((id: number) => {
        EventManager.emitServer("character", "select", id);
    }, []);

    const createCharacter = useCallback(() => {
        EventManager.emitServer("character", "create");
    }, []);

    return (
        <div className={style.main}>
            <div className={style.header}>
                CHARACTER SELECTION
                <span className={style.desc}>Select or create a character to continue</span>
            </div>

            <div className={style.characters}>
                {store.characters.map((x, i) => {
                    return x.type === 0 ? (
                        <div className={style.create} key={i} onClick={() => createCharacter()}>
                            <span>Create Character</span>
                        </div>
                    ) : (
                        <div className={style.character} key={i} onClick={() => selectCharacter(x.id)}>
                            <div className={style.name}>{x.name}</div>
                            <div className={style.data}>
                                <span className={style.level}>{x.level}</span>
                                <span className={style.money}>
                                    <img src={moneyIcon} alt="money" />${x.money}
                                </span>
                                <span className={style.bank}>
                                    <img src={bankIcon} alt="money" />${x.bank}
                                </span>
                            </div>
                            <span className={style.spawn}>SPAWN CHARACTER</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default observer(CharacterSelector);
