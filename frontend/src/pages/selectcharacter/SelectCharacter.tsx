import { observer } from "mobx-react-lite";
import { FC, useCallback } from "react";
import PlayerStore from "store/Player.store";
import style from "./selectcharacter.module.scss";
import EventManager from "utils/EventManager.util";
import createIcon from "assets/images/selector/create.svg";
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
                                <span className={style.money}>{x.money}</span>
                                <span className={style.bank}>{x.bank}</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default observer(CharacterSelector);
