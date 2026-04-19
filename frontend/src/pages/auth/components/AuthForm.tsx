import { FC, useCallback, useRef, useState, useEffect } from "react";
import style from "../auth.module.scss";
import EventManager from "utils/EventManager.util";
import Notification from "utils/NotifyManager.util";

import loginIcon from "assets/images/auth/icons/login.svg";

export const AuthForm: FC<{ setForm: (page: string) => void }> = ({ setForm }) => {
    const authForm = useRef<HTMLDivElement>(null);

    const authUsername = useRef<HTMLInputElement>(null),
        authPassword = useRef<HTMLInputElement>(null);

    const [remember, setRemember] = useState(false);

    useEffect(() => {
        const handler = (username: string, password?: string) => {
            if (username && authUsername.current) {
                authUsername.current.value = username;
                setRemember(true);
            }
            if (password && authPassword.current) {
                authPassword.current.value = password;
            }
        };

        EventManager.addHandler("auth", "setCredentials", handler);

        return () => {
            // We shouldn't remove all handlers if others exist, but here it's fine for our specific event.
            // A safer approach is to not do anything, or just let EventManager update if remounted.
        };
    }, []);

    const onSubmit = useCallback((e: React.FormEvent) => {
        e.preventDefault();

        const username = authUsername.current?.value;
        const password = authPassword.current?.value;

        if (!username || !password || !username.length || !password.length) {
            return Notification.error("Fill out the forms!");
        }

        if (remember) {
            EventManager.emitClient("auth", "saveCredentials", username, password);
        } else {
            EventManager.emitClient("auth", "removeCredentials");
        }

        EventManager.emitServer("auth", "loginPlayer", { username, password });

        authUsername.current.value = "";
        authPassword.current.value = "";
    }, [remember]);

    return (
        <div className={style.authform} ref={authForm} onSubmit={(e) => onSubmit(e)}>
            <form autoComplete="off">
                <div className={style.content}>
                    <input className={style.usernameInput} ref={authUsername} type="text" name="auth_username" maxLength={32} placeholder="Username" autoComplete="off" />
                    <input ref={authPassword} type="password" name="auth_password" maxLength={74} placeholder="Password" />

                    <div className={style.rememberMe}>
                        <input 
                            type="checkbox" 
                            id="rememberCredentials" 
                            checked={remember} 
                            onChange={(e) => setRemember(e.target.checked)} 
                        />
                        <label htmlFor="rememberCredentials">Remember credentials</label>
                    </div>

                    <button className={style.submit} type="submit" name="auth_submit">
                        Login <img src={loginIcon} alt="login" />
                    </button>
                </div>
            </form>
            <div className={style.footer}>
                Don't have an account?
                <span onClick={() => setForm("reg")}>Register now!</span>
            </div>
        </div>
    );
};
