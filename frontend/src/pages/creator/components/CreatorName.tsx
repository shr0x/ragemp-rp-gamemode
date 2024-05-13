import { FC } from "react";
import maleicon from "../../../assets/images/creator/male.svg";
import femaleicon from "../../../assets/images/creator/female.svg";
import style from "../char.module.scss";
import CreatorStore from "src/stores/CharCreator.store";
const CreatorName: FC<{ store: CreatorStore }> = ({ store }) => {
    return (
        <div className={style.data}>
            <div className={style.name}>
                <div className={style.charname}>
                    <span className={style.desc}>Character Name</span>
                    <input type="text" placeholder="Firstname" maxLength={16} />
                    <input type="text" placeholder="Lastname" maxLength={16} />
                </div>
                <div className={style.gender}>
                    <span className={style.desc}>Character Gender</span>

                    <div className={style.selection}>
                        <button className={style.button}>
                            <img src={maleicon} alt="maleicon" />
                            MALE
                        </button>
                        <button className={style.button}>
                            <img src={femaleicon} alt="femaleicon" />
                            FEMALE
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default CreatorName;
