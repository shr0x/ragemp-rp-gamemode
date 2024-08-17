import { useRef, FC, useCallback, useState } from "react";
import cn from "classnames";
import { observer } from "mobx-react-lite";
import EventManager from "utils/EventManager.util";
import Notification from "utils/NotifyManager.util";

import { playerStore } from "store/Player.store";

import style from "./security.module.scss";
const Security: FC<{ store: typeof playerStore }> = ({ store }) => {
    const [show, setShow] = useState({
        old: false,
        new: false,
        repeat: false,
        mail: false
    });

    const oldPassword = useRef<HTMLInputElement>(null),
        newPassword = useRef<HTMLInputElement>(null),
        repeatNewPassword = useRef<HTMLInputElement>(null);

    const changePassword = useCallback(() => {
        if (oldPassword.current && oldPassword.current.value === "") {
            return Notification.error("Insert the current password.");
        }
        if (newPassword.current && newPassword.current.value === "") {
            return Notification.error("Insert the new password.");
        }
        if (newPassword.current && repeatNewPassword.current && newPassword.current.value !== repeatNewPassword.current.value) {
            return Notification.error("New password mismatch");
        }

        if (newPassword.current && newPassword.current.value.length <= 5) {
            return Notification.error("Password must be at least 5 characters long.");
        }

        if (oldPassword.current && newPassword.current) {
            EventManager.emitServer("settingsMenu", "changePassword", {
                old: oldPassword.current.value,
                new: newPassword.current.value
            });
        }
    }, []); // eslint-disable-line

    return (
        <div className={style.security}>
            <div className={style.row}>
                <div className={style.header}>Account Security</div>

                <div className={style.box}>
                    <div className={style.title}>E-mail</div>
                    <div className={style.password}>
                        <input type={show.mail ? "text" : "password"} readOnly value={store.settings.email} />
                        <div className={cn(style.img, show.mail && style.active)} onClick={() => setShow({ ...show, mail: !show.mail })}></div>
                    </div>
                </div>
                <div className={style.box}>
                    <div className={style.title}>Change Password</div>
                    <div className={style.input}>
                        <input type={show.old ? "text" : "password"} ref={oldPassword} placeholder="Current Password" />
                        <div className={cn(style.img, show.old && style.active)} onClick={() => setShow({ ...show, old: !show.old })}></div>
                    </div>
                </div>
                <div className={style.box}>
                    <div className={style.input}>
                        <input type={show.new ? "text" : "password"} ref={newPassword} placeholder="New password" />
                        <div className={cn(style.img, show.new && style.active)} onClick={() => setShow({ ...show, new: !show.new })}></div>
                    </div>
                </div>
                <div className={style.box}>
                    <div className={style.input}>
                        <input type={show.repeat ? "text" : "password"} ref={repeatNewPassword} placeholder="Confirm Password" />
                        <div className={cn(style.img, show.repeat && style.active)} onClick={() => setShow({ ...show, repeat: !show.repeat })}></div>
                    </div>
                </div>
                <div className={style.saveButton} onClick={() => changePassword()}>
                    Change
                </div>
            </div>
        </div>
    );
};

export default observer(Security);
